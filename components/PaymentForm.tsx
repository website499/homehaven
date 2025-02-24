"use client"

import type React from "react"
import { useState } from "react"
import { useAuth } from "@/context/AuthContext"
import { useNotification } from "@/context/NotificationContext"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useRouter } from "next/navigation"

interface PaymentFormProps {
  apartmentId: number
  rentAmount: number
}

export default function PaymentForm({ apartmentId, rentAmount }: PaymentFormProps) {
  const [cardNumber, setCardNumber] = useState("")
  const [expiryDate, setExpiryDate] = useState("")
  const [cvv, setCvv] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const { user } = useAuth()
  const { addNotification } = useNotification()
  const router = useRouter()

  const handleCancel = () => {
    router.back()
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!user) {
      addNotification("Please log in to make a payment", "error")
      return
    }

    setIsProcessing(true)
    try {
      const response = await fetch("/api/payments", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userId: user.id,
          apartmentId,
          amount: rentAmount,
          cardNumber,
          expiryDate,
          cvv,
        }),
      })

      if (!response.ok) {
        throw new Error("Payment failed")
      }

      await response.json()
      addNotification("Payment successful", "success")
      // Reset form
      setCardNumber("")
      setExpiryDate("")
      setCvv("")
      router.push("/dashboard")
    } catch (error) {
      addNotification("Payment failed. Please try again.", "error")
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Make a Payment</CardTitle>
        <CardDescription>Pay your rent securely online</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="cardNumber">Card Number</Label>
              <Input
                id="cardNumber"
                placeholder="1234 5678 9012 3456"
                value={cardNumber}
                onChange={(e) => setCardNumber(e.target.value)}
                required
                pattern="[0-9\s]{13,19}"
                maxLength={19}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="expiryDate">Expiry Date</Label>
              <Input
                id="expiryDate"
                placeholder="MM/YY"
                value={expiryDate}
                onChange={(e) => setExpiryDate(e.target.value)}
                required
                pattern="(0[1-9]|1[0-2])\/([0-9]{2})"
                maxLength={5}
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="cvv">CVV</Label>
              <Input
                id="cvv"
                placeholder="123"
                value={cvv}
                onChange={(e) => setCvv(e.target.value)}
                required
                pattern="[0-9]{3,4}"
                maxLength={4}
                type="password"
              />
            </div>
          </div>
          <CardFooter className="flex justify-between mt-4">
            <Button type="button" variant="outline" onClick={handleCancel}>
              Cancel
            </Button>
            <Button type="submit" disabled={isProcessing}>
              {isProcessing ? "Processing..." : `Pay $${rentAmount}`}
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  )
}

