"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"

export default function SearchSection() {
  const router = useRouter()
  const [filters, setFilters] = useState({
    location: "",
    priceRange: [0, 5000],
    beds: "any",
    propertyType: "any",
  })

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams({
      location: filters.location,
      minPrice: filters.priceRange[0].toString(),
      maxPrice: filters.priceRange[1].toString(),
      beds: filters.beds,
      type: filters.propertyType,
    })
    router.push(`/search?${params.toString()}`)
  }

  return (
    <section className="py-12 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Find Your Next Home</h2>
        <form onSubmit={handleSearch} className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <label className="block text-sm font-medium mb-2">Location</label>
            <Input
              placeholder="City, neighborhood, or ZIP"
              value={filters.location}
              onChange={(e) => setFilters({ ...filters, location: e.target.value })}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Price Range</label>
            <div className="px-3">
              <Slider
                defaultValue={[0, 5000]}
                max={10000}
                step={100}
                onValueChange={(value) => setFilters({ ...filters, priceRange: value })}
              />
              <div className="mt-2 text-sm text-gray-600">
                ${filters.priceRange[0]} - ${filters.priceRange[1]}
              </div>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Beds</label>
            <Select value={filters.beds} onValueChange={(value) => setFilters({ ...filters, beds: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="studio">Studio</SelectItem>
                <SelectItem value="1">1 Bed</SelectItem>
                <SelectItem value="2">2 Beds</SelectItem>
                <SelectItem value="3">3 Beds</SelectItem>
                <SelectItem value="4">4+ Beds</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Property Type</label>
            <Select
              value={filters.propertyType}
              onValueChange={(value) => setFilters({ ...filters, propertyType: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Any" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any</SelectItem>
                <SelectItem value="apartment">Apartment</SelectItem>
                <SelectItem value="house">House</SelectItem>
                <SelectItem value="condo">Condo</SelectItem>
                <SelectItem value="townhouse">Townhouse</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="md:col-span-2 lg:col-span-4">
            <Button type="submit" className="w-full md:w-auto">
              Search Properties
            </Button>
          </div>
        </form>
      </div>
    </section>
  )
}

