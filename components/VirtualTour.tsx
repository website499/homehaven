"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { useToast } from "@/components/ui/use-toast"
import { VideoIcon as Video360, Calendar } from "lucide-react"

interface VirtualTourProps {
  propertyId: string
  tourUrl?: string
}

export default function VirtualTour({ propertyId, tourUrl }: VirtualTourProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()

  useEffect(() => {
    if (tourUrl) {
      const img = new Image()
      img.src = tourUrl
      img.onload = () => setIsLoading(false)
      img.onerror = () => {
        setError("Failed to load virtual tour")
        setIsLoading(false)
      }
    }
  }, [tourUrl])

  const scheduleInPersonTour = async () => {
    try {
      // In a real app, this would call an API
      toast({
        title: "Success",
        description: "Tour request submitted successfully",
      })
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to schedule tour",
        variant: "destructive",
      })
    }
  }

  if (!tourUrl) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground mb-4">Virtual tour not available for this property</p>
        <Button onClick={scheduleInPersonTour}>
          <Calendar className="h-4 w-4 mr-2" />
          Schedule In-Person Tour
        </Button>
      </div>
    )
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Video360 className="h-4 w-4 mr-2" />
          View Virtual Tour
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Virtual Tour</DialogTitle>
          <DialogDescription>Explore this property in 360 degrees</DialogDescription>
        </DialogHeader>
        <div className="aspect-video relative">
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-muted">Loading tour...</div>
          )}
          {error ? (
            <div className="absolute inset-0 flex items-center justify-center bg-muted">{error}</div>
          ) : (
            <iframe src={tourUrl} className="w-full h-full" allowFullScreen title="Virtual Tour" />
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}

