"use client"

import { useSearchParams } from "next/navigation"
import { useEffect, useState, Suspense } from "react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import SearchFilters from "@/components/SearchFilters"
import PropertyGrid from "@/components/PropertyGrid"
import { Button } from "@/components/ui/button"
import { useToast } from "@/components/ui/use-toast"
import type { Property } from "@/types"
import { fetchProperties } from "@/lib/api"
import { MapPin, Grid, Map } from "lucide-react"
import { ErrorBoundary } from "@/components/ErrorBoundary"

function SearchResults() {
  const searchParams = useSearchParams()
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)
  const [view, setView] = useState<"grid" | "map">("grid")
  const { toast } = useToast()

  useEffect(() => {
    const loadProperties = async () => {
      try {
        setLoading(true)
        setError(null)
        const data = await fetchProperties({
          location: searchParams?.get("location") || "",
          minPrice: Number(searchParams?.get("minPrice")) || undefined,
          maxPrice: Number(searchParams?.get("maxPrice")) || undefined,
          beds: searchParams?.get("beds") || undefined,
          propertyType: searchParams?.get("type") || undefined,
          amenities: searchParams?.get("amenities")?.split(",") || [],
        })
        setProperties(data)
      } catch (error) {
        setError(error instanceof Error ? error : new Error("Failed to load properties"))
        toast({
          title: "Error",
          description: "Failed to load properties. Please try again.",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    if (searchParams) {
      loadProperties()
    }
  }, [searchParams, toast])

  if (error) {
    return (
      <div className="text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Error loading properties</h2>
        <p className="text-gray-600 mb-4">{error.message}</p>
        <Button onClick={() => window.location.reload()}>Try Again</Button>
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <div>
            <h1 className="text-2xl font-bold">Search Results</h1>
            {searchParams?.get("location") && (
              <div className="flex items-center text-muted-foreground mt-1">
                <MapPin className="h-4 w-4 mr-1" />
                <span>{searchParams.get("location")}</span>
              </div>
            )}
          </div>
          <div className="flex gap-2">
            <Button variant={view === "grid" ? "default" : "outline"} size="sm" onClick={() => setView("grid")}>
              <Grid className="h-4 w-4 mr-2" />
              Grid View
            </Button>
            <Button variant={view === "map" ? "default" : "outline"} size="sm" onClick={() => setView("map")}>
              <Map className="h-4 w-4 mr-2" />
              Map View
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <aside className="lg:col-span-1">
            <SearchFilters />
          </aside>
          <div className="lg:col-span-3">
            <PropertyGrid properties={properties} loading={loading} />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

export default function SearchClient() {
  return (
    <ErrorBoundary>
      <Suspense fallback={<div>Loading...</div>}>
        <SearchResults />
      </Suspense>
    </ErrorBoundary>
  )
}

