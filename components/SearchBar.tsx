"use client"

import type React from "react"

import { useState } from "react"
import { Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import type { SearchFilters } from "@/types"

export default function SearchBar({ onSearch }: { onSearch: (filters: SearchFilters) => void }) {
  const [filters, setFilters] = useState<SearchFilters>({
    searchTerm: "",
    minPrice: 0,
    maxPrice: 10000,
    bedrooms: 0,
  })

  const handleSearch = () => {
    onSearch(filters)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFilters((prev) => ({ ...prev, [name]: name === "searchTerm" ? value : Number(value) }))
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex mb-4">
        <Input
          type="text"
          placeholder="Enter address, city, neighborhood, or ZIP"
          className="flex-grow"
          name="searchTerm"
          value={filters.searchTerm}
          onChange={handleChange}
        />
        <Button className="ml-2" onClick={handleSearch}>
          <Search className="mr-2" />
          Search
        </Button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <Label htmlFor="minPrice">Min Price</Label>
          <Input type="number" id="minPrice" name="minPrice" value={filters.minPrice} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="maxPrice">Max Price</Label>
          <Input type="number" id="maxPrice" name="maxPrice" value={filters.maxPrice} onChange={handleChange} />
        </div>
        <div>
          <Label htmlFor="bedrooms">Bedrooms</Label>
          <Input type="number" id="bedrooms" name="bedrooms" value={filters.bedrooms} onChange={handleChange} />
        </div>
      </div>
    </div>
  )
}

