"use client"

import type React from "react"

import { useState } from "react"
import { useAuth } from "@/context/AuthContext"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { StarIcon } from "lucide-react"
import { useNotification } from "@/components/ui/use-notification"

interface ReviewFormProps {
  apartmentId: number
  onSubmit: (review: { rating: number; comment: string }) => void
}

export default function ReviewForm({ apartmentId, onSubmit }: ReviewFormProps) {
  const [rating, setRating] = useState(0)
  const [comment, setComment] = useState("")
  const { user } = useAuth()
  const { addNotification } = useNotification()

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (rating === 0) {
      addNotification("Please select a rating", "error")
      return
    }
    onSubmit({ rating, comment })
    setRating(0)
    setComment("")
    addNotification("Review submitted successfully", "success")
  }

  if (!user) {
    return <p>Please log in to leave a review.</p>
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700">Rating</label>
        <div className="flex items-center">
          {[1, 2, 3, 4, 5].map((star) => (
            <StarIcon
              key={star}
              className={`h-6 w-6 cursor-pointer ${star <= rating ? "text-yellow-400" : "text-gray-300"}`}
              onClick={() => setRating(star)}
            />
          ))}
        </div>
      </div>
      <div>
        <label htmlFor="comment" className="block text-sm font-medium text-gray-700">
          Comment
        </label>
        <Textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          rows={4}
          placeholder="Share your experience..."
          required
        />
      </div>
      <Button type="submit">Submit Review</Button>
    </form>
  )
}

