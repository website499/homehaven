"use client"

import { useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Slider } from "@/components/ui/slider"
import { Card } from "@/components/ui/card"
import { useToast } from "@/components/ui/use-toast"

export default function SearchFilters() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const { toast } = useToast()

  const [filters, setFilters] = useState({
    location: searchParams.get("location") || "",
    minPrice: Number(searchParams.get("minPrice")) || 0,
    maxPrice: Number(searchParams.get("maxPrice")) || 10000,
    beds: searchParams.get("beds") || "any",
    propertyType: searchParams.get("type") || "any",
    amenities: [] as string[],
  })

  const handleSearch = () => {
    try {
      const params = new URLSearchParams()
      Object.entries(filters).forEach(([key, value]) => {
        if (value && value !== "any" && (key !== "amenities" || (value as string[]).length > 0)) {
          if (key === "amenities") {
            params.append(key, (value as string[]).join(","))
          } else {
            params.append(key, value.toString())
          }
        }
      })
      router.push(`/search?${params.toString()}`)
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to apply filters. Please try again.",
        variant: "destructive",
      })
    }
  }

  const propertyTypes = [
    { value: "any", label: "Any" },
    { value: "apartment", label: "Apartment" },
    { value: "house", label: "House" },
    { value: "condo", label: "Condo" },
    { value: "townhouse", label: "Townhouse" },
  ]

  const bedOptions = [
    { value: "any", label: "Any" },
    { value: "studio", label: "Studio" },
    { value: "1", label: "1 Bedroom" },
    { value: "2", label: "2 Bedrooms" },
    { value: "3", label: "3 Bedrooms" },
    { value: "4", label: "4+ Bedrooms" },
  ]

  const amenities = ["Parking", "Pool", "Gym", "Pet Friendly", "Dishwasher", "Air Conditioning", "Laundry", "Balcony"]

  return (
    <Card className="p-6 space-y-6">
      <div>
        <Label htmlFor="location">Location</Label>
        <Input
          id="location"
          placeholder="Enter city, zip, or neighborhood"
          value={filters.location}
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
          className="mt-1"
        />
      </div>

      <Accordion type="single" collapsible defaultValue="price">
        <AccordionItem value="price">
          <AccordionTrigger>Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 pt-2">
              <div className="flex justify-between text-sm">
                <span>${filters.minPrice}</span>
                <span>${filters.maxPrice}</span>
              </div>
              <Slider
                min={0}
                max={10000}
                step={100}
                value={[filters.minPrice, filters.maxPrice]}
                onValueChange={([min, max]) => setFilters({ ...filters, minPrice: min, maxPrice: max })}
              />
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="beds">
          <AccordionTrigger>Bedrooms</AccordionTrigger>
          <AccordionContent>
            <Select value={filters.beds} onValueChange={(value) => setFilters({ ...filters, beds: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select bedrooms" />
              </SelectTrigger>
              <SelectContent>
                {bedOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="propertyType">
          <AccordionTrigger>Property Type</AccordionTrigger>
          <AccordionContent>
            <Select
              value={filters.propertyType}
              onValueChange={(value) => setFilters({ ...filters, propertyType: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select property type" />
              </SelectTrigger>
              <SelectContent>
                {propertyTypes.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="amenities">
          <AccordionTrigger>Amenities</AccordionTrigger>
          <AccordionContent>
            <div className="grid grid-cols-2 gap-2">
              {amenities.map((amenity) => (
                <label key={amenity} className="flex items-center space-x-2 text-sm">
                  <input
                    type="checkbox"
                    checked={filters.amenities.includes(amenity)}
                    onChange={(e) => {
                      if (e.target.checked) {
                        setFilters({
                          ...filters,
                          amenities: [...filters.amenities, amenity],
                        })
                      } else {
                        setFilters({
                          ...filters,
                          amenities: filters.amenities.filter((a) => a !== amenity),
                        })
                      }
                    }}
                    className="rounded border-gray-300 text-primary focus:ring-primary"
                  />
                  <span>{amenity}</span>
                </label>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Button onClick={handleSearch} className="w-full">
        Apply Filters
      </Button>
    </Card>
  )
}

