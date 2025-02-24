"use client"

import { useState } from "react"
import { Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/context/AuthContext"
import { useNotification } from "@/context/NotificationContext"

interface FavoriteButtonProps {
  apartmentId: number
}

export default function FavoriteButton({ apartmentId }: FavoriteButtonProps) {
  const { user, addFavorite, removeFavorite } = useAuth()
  const { addNotification } = useNotification()
  const [isFavorite, setIsFavorite] = useState(user?.favorites.includes(apartmentId) || false)

  const handleToggleFavorite = () => {
    if (!user) {
      addNotification("Please log in to add favorites", "error")
      return
    }

    if (isFavorite) {
      removeFavorite(apartmentId)
      setIsFavorite(false)
      addNotification("Removed from favorites", "info")
    } else {
      addFavorite(apartmentId)
      setIsFavorite(true)
      addNotification("Added to favorites", "success")
    }
  }

  return (
    <Button variant="outline" onClick={handleToggleFavorite}>
      <Heart className={`mr-2 ${isFavorite ? "fill-red-500" : ""}`} />
      {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
    </Button>
  )
}

