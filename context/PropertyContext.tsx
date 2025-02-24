"use client"

import type React from "react"

import { createContext, useContext, useState, useCallback } from "react"
import type { Property, SearchFilters } from "@/types"
import { fetchProperties } from "@/lib/api"
import { useToast } from "@/components/ui/use-toast"

interface PropertyContextType {
  properties: Property[]
  loading: boolean
  error: string | null
  fetchPropertyData: (filters?: SearchFilters) => Promise<void>
  recentlyViewed: Property[]
  addToRecentlyViewed: (property: Property) => void
}

const PropertyContext = createContext<PropertyContextType | undefined>(undefined)

export function PropertyProvider({ children }: { children: React.ReactNode }) {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [recentlyViewed, setRecentlyViewed] = useState<Property[]>([])
  const { toast } = useToast()

  const fetchPropertyData = useCallback(
    async (filters?: SearchFilters) => {
      try {
        setLoading(true)
        setError(null)
        const data = await fetchProperties(filters || {})
        setProperties(data)
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to fetch properties"
        setError(errorMessage)
        toast({
          title: "Error",
          description: errorMessage,
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    },
    [toast],
  )

  const addToRecentlyViewed = useCallback((property: Property) => {
    setRecentlyViewed((prev) => {
      const filtered = prev.filter((p) => p.id !== property.id)
      return [property, ...filtered].slice(0, 5)
    })
  }, [])

  return (
    <PropertyContext.Provider
      value={{
        properties,
        loading,
        error,
        fetchPropertyData,
        recentlyViewed,
        addToRecentlyViewed,
      }}
    >
      {children}
    </PropertyContext.Provider>
  )
}

export function useProperty() {
  const context = useContext(PropertyContext)
  if (context === undefined) {
    throw new Error("useProperty must be used within a PropertyProvider")
  }
  return context
}

