"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"

interface ApplicationFormProps {
  apartmentId: number
  onSubmit: (application: any) => void
}

export default function ApplicationForm({ apartmentId, onSubmit }: ApplicationFormProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    income: "",
    message: "",
    documents: null as File | null,
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData((prev) => ({ ...prev, documents: e.target.files![0] }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const applicationData = new FormData()
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) {
        applicationData.append(key, value)
      }
    })
    applicationData.append("apartmentId", apartmentId.toString())

    try {
      const response = await fetch("/api/applications", {
        method: "POST",
        body: applicationData,
      })

      if (response.ok) {
        const result = await response.json()
        onSubmit(result)
        // Reset form
        setFormData({
          name: "",
          email: "",
          phone: "",
          income: "",
          message: "",
          documents: null,
        })
      } else {
        console.error("Failed to submit application")
      }
    } catch (error) {
      console.error("Error submitting application:", error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Full Name</Label>
        <Input id="name" name="name" value={formData.name} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" value={formData.email} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="phone">Phone</Label>
        <Input id="phone" name="phone" type="tel" value={formData.phone} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="income">Annual Income</Label>
        <Input id="income" name="income" type="number" value={formData.income} onChange={handleChange} required />
      </div>
      <div>
        <Label htmlFor="message">Additional Information</Label>
        <Textarea id="message" name="message" value={formData.message} onChange={handleChange} />
      </div>
      <div>
        <Label htmlFor="documents">Upload Documents</Label>
        <Input id="documents" name="documents" type="file" onChange={handleFileChange} accept=".pdf,.doc,.docx" />
      </div>
      <Button type="submit">Submit Application</Button>
    </form>
  )
}

