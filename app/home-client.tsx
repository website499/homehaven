"use client"

import { useEffect } from "react"
import Hero from "@/components/Hero"
import SearchSection from "@/components/SearchSection"
import FeaturedListings from "@/components/FeaturedListings"
import PopularLocations from "@/components/PopularLocations"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { useProperty } from "@/context/PropertyContext"
import { ErrorBoundary } from "@/components/ErrorBoundary"

export default function HomeClient() {
  const { properties, loading, error, fetchPropertyData } = useProperty()

  useEffect(() => {
    fetchPropertyData()
  }, [fetchPropertyData])

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <ErrorBoundary>
          <Hero />
          <SearchSection />
          <FeaturedListings initialListings={properties} isLoading={loading} error={error} />
          <PopularLocations />
        </ErrorBoundary>
      </main>
      <Footer />
    </div>
  )
}

