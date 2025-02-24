"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import type { RentalApplication } from "@/types"

interface RentalApplicationProps {
  apartmentId: number
  onSubmit: (application: RentalApplication) => void
}

export default function RentalApplication({ apartmentId, onSubmit }: RentalApplicationProps) {
  const [application, setApplication] = useState<RentalApplication>({
    name: "",
    email: "",
    phone: "",
    income: 0,
    message: "",
  })

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setApplication((prev) => ({
      ...prev,
      [name]: name === "income" ? Number(value) : value,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(application)
    setApplication({
      name: "",
      email: "",
      phone: "",
      income: 0,
      message: "",
    })
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="name">Full Name</Label>
        <Input id="name" name="name" value={application.name} onChange={handleInputChange} required />
      </div>
      <div>
        <Label htmlFor="email">Email</Label>
        <Input id="email" name="email" type="email" value={application.email} onChange={handleInputChange} required />
      </div>
      <div>
        <Label htmlFor="phone">Phone</Label>
        <Input id="phone" name="phone" type="tel" value={application.phone} onChange={handleInputChange} required />
      </div>
      <div>
        <Label htmlFor="income">Annual Income</Label>
        <Input
          id="income"
          name="income"
          type="number"
          value={application.income}
          onChange={handleInputChange}
          required
        />
      </div>
      <div>
        <Label htmlFor="message">Additional Information</Label>
        <Textarea
          id="message"
          name="message"
          value={application.message}
          onChange={handleInputChange}
          className="h-32"
        />
      </div>
      <Button type="submit">Submit Application</Button>
    </form>
  )
}

