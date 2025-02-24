"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import type { Property } from "@/types"
import dynamic from "next/dynamic"
import PropertyCard from "./PropertyCard"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Skeleton } from "@/components/ui/skeleton"

// Import map component dynamically to avoid SSR issues
const PropertyMap = dynamic(() => import("./PropertyMap"), {
  ssr: false,
  loading: () => (
    <div className="h-[600px] w-full bg-muted animate-pulse rounded-lg flex items-center justify-center">
      <p className="text-muted-foreground">Loading map...</p>
    </div>
  ),
})

interface FeaturedListingsProps {
  initialListings: Property[]
  isLoading?: boolean
  error?: string | null
}

export default function FeaturedListings({
  initialListings = [],
  isLoading = false,
  error = null,
}: FeaturedListingsProps) {
  const [viewMode, setViewMode] = useState<"list" | "map">("list")

  if (error) {
    return (
      <Alert variant="destructive" className="max-w-lg mx-auto my-8">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    )
  }

  if (isLoading) {
    return (
      <section className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[1, 2, 3].map((i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="h-[200px] w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>
          ))}
        </div>
      </section>
    )
  }

  if (!initialListings.length) {
    return (
      <section className="container mx-auto px-4 py-12">
        <div className="text-center">
          <h2 className="text-2xl font-semibold mb-4">No Properties Found</h2>
          <p className="text-muted-foreground">Try adjusting your search criteria to find more properties.</p>
        </div>
      </section>
    )
  }

  return (
    <section className="container mx-auto px-4 py-12">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-semibold">Featured Listings</h2>
        <div>
          <Button
            variant={viewMode === "list" ? "default" : "outline"}
            onClick={() => setViewMode("list")}
            className="mr-2"
          >
            List View
          </Button>
          <Button variant={viewMode === "map" ? "default" : "outline"} onClick={() => setViewMode("map")}>
            Map View
          </Button>
        </div>
      </div>

      {viewMode === "list" ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {initialListings.map((property) => (
            <PropertyCard key={property.id} property={property} />
          ))}
        </div>
      ) : (
        <PropertyMap properties={initialListings} />
      )}
    </section>
  )
}

