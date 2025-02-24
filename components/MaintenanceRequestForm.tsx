"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/context/AuthContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useNotification } from "@/context/NotificationContext"

interface MaintenanceRequestFormProps {
  apartmentId: number
  onSubmit: (request: { title: string; description: string }) => void
}

export default function MaintenanceRequestForm({ apartmentId, onSubmit }: MaintenanceRequestFormProps) {
  const [title, setTitle] = useState("")
  const [description, setDescription] = useState("")
  const { user } = useAuth()
  const { addNotification } = useNotification()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) {
      addNotification("Please log in to submit a maintenance request", "error")
      return
    }
    onSubmit({ title, description })
    setTitle("")
    setDescription("")
    addNotification("Maintenance request submitted successfully", "success")
  }

  if (!user) {
    return <p>Please log in to submit a maintenance request.</p>
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">
          Title
        </label>
        <Input
          id="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Brief description of the issue"
          required
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">
          Description
        </label>
        <Textarea
          id="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={4}
          placeholder="Provide details about the maintenance issue"
          required
        />
      </div>
      <Button type="submit">Submit Request</Button>
    </form>
  )
}

