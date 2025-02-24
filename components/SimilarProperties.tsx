"use client"

import { useEffect, useState } from "react"
import type { Property } from "@/types"
import PropertyCard from "./PropertyCard"
import { fetchProperties } from "@/lib/api"
import { useToast } from "@/components/ui/use-toast"

interface SimilarPropertiesProps {
  currentProperty: Property
}

export default function SimilarProperties({ currentProperty }: SimilarPropertiesProps) {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const loadSimilarProperties = async () => {
      try {
        setLoading(true)
        // In a real app, we would pass criteria to find similar properties
        const data = await fetchProperties({
          minPrice: currentProperty.price * 0.8,
          maxPrice: currentProperty.price * 1.2,
          beds: currentProperty.bedrooms,
          location: currentProperty.location,
        })
        setProperties(data.filter((p) => p.id !== currentProperty.id).slice(0, 3))
      } catch (error) {
        toast({
          title: "Error",
          description: "Failed to load similar properties",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    loadSimilarProperties()
  }, [currentProperty, toast])

  if (loading) {
    return <div>Loading similar properties...</div>
  }

  if (properties.length === 0) {
    return null
  }

  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-semibold">Similar Properties</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {properties.map((property) => (
          <PropertyCard key={property.id} property={property} />
        ))}
      </div>
    </div>
  )
}

