"use client"

import { useState } from "react"
import SearchBar from "@/components/SearchBar"
import type { SearchFilters, Apartment } from "@/types"
import FeaturedListings from "@/components/FeaturedListings" // Import FeaturedListings

export default function SearchBarWrapper() {
  const [searchResults, setSearchResults] = useState<Apartment[]>([])

  const handleSearch = async (filters: SearchFilters) => {
    // In a real application, you would call an API here
    console.log("Search filters:", filters)
    // For now, we'll just simulate a search
    const response = await fetch("/api/apartments")
    const apartments: Apartment[] = await response.json()
    const filtered = apartments.filter(
      (apt) =>
        apt.price >= filters.minPrice &&
        apt.price <= filters.maxPrice &&
        apt.bedrooms >= filters.bedrooms &&
        (apt.title.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
          apt.address.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
          apt.city.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
          apt.state.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
          apt.zipCode.includes(filters.searchTerm)),
    )
    setSearchResults(filtered)
  }

  return (
    <>
      <SearchBar onSearch={handleSearch} />
      {searchResults.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Search Results</h2>
          <FeaturedListings initialListings={searchResults} />
        </div>
      )}
    </>
  )
}

