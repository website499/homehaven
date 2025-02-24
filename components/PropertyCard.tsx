"use client"

import Image from "next/image"
import Link from "next/link"
import { Heart, Share2, MapPin, Bed, Bath, Square } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { useAuth } from "@/context/AuthContext"
import { useToast } from "@/hooks/use-toast"
import type { Property } from "@/types"

interface PropertyCardProps {
  property: Property
}

export default function PropertyCard({ property }: PropertyCardProps) {
  const { user } = useAuth()
  const { toast } = useToast()

  // Add null check for property
  if (!property) {
    return null
  }

  const handleFavorite = () => {
    if (!user) {
      toast({
        title: "Authentication required",
        description: "Please log in to save properties to your favorites.",
        variant: "destructive",
      })
      return
    }

    toast({
      title: "Success",
      description: "Property added to favorites.",
    })
  }

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: property.title || "Property Listing",
          text: property.description || "Check out this property",
          url: window.location.href,
        })
      } else {
        await navigator.clipboard.writeText(window.location.href)
        toast({
          title: "Link copied",
          description: "Property link copied to clipboard.",
        })
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to share property.",
        variant: "destructive",
      })
    }
  }

  // Ensure images array exists and has items
  const imageUrl =
    property.images && property.images.length > 0 ? property.images[0] : "/placeholder.svg?height=400&width=600"

  return (
    <Card className="overflow-hidden">
      <div className="relative aspect-video">
        <Image
          src={imageUrl || "/placeholder.svg"}
          alt={property.title || "Property image"}
          fill
          className="object-cover"
          priority
        />
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 bg-white/80 hover:bg-white"
          onClick={handleFavorite}
        >
          <Heart className="h-5 w-5" />
        </Button>
      </div>
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="text-xl">{property.title || "Untitled Property"}</span>
          <span className="text-xl font-bold">${property.price || 0}/mo</span>
        </CardTitle>
        <div className="flex items-center text-muted-foreground">
          <MapPin className="h-4 w-4 mr-1" />
          {property.location || "Location not specified"}
        </div>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-3 gap-4">
          <div className="flex items-center">
            <Bed className="h-4 w-4 mr-2" />
            <span>{property.bedrooms || 0} Beds</span>
          </div>
          <div className="flex items-center">
            <Bath className="h-4 w-4 mr-2" />
            <span>{property.bathrooms || 0} Baths</span>
          </div>
          <div className="flex items-center">
            <Square className="h-4 w-4 mr-2" />
            <span>{property.sqft || 0} sqft</span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="grid grid-cols-2 gap-2">
        <Button asChild>
          <Link href={`/properties/${property.id}`}>View Details</Link>
        </Button>
        <Button variant="outline" onClick={handleShare}>
          <Share2 className="h-4 w-4 mr-2" />
          Share
        </Button>
      </CardFooter>
    </Card>
  )
}

