"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Slider } from "@/components/ui/slider"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { SlidersHorizontal } from "lucide-react"

interface AdvancedFiltersProps {
  onApplyFilters: (filters: any) => void
}

export default function AdvancedFilters({ onApplyFilters }: AdvancedFiltersProps) {
  const [filters, setFilters] = useState({
    priceRange: [0, 10000],
    squareFootage: [0, 5000],
    yearBuilt: [1900, new Date().getFullYear()],
    petFriendly: false,
    parking: false,
    furnished: false,
    utilities: false,
    amenities: {
      pool: false,
      gym: false,
      elevator: false,
      security: false,
      laundry: false,
      balcony: false,
    },
  })

  const handleApply = () => {
    onApplyFilters(filters)
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="sm">
          <SlidersHorizontal className="h-4 w-4 mr-2" />
          Advanced Filters
        </Button>
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-md overflow-y-auto">
        <SheetHeader>
          <SheetTitle>Advanced Filters</SheetTitle>
          <SheetDescription>Refine your search with additional filters</SheetDescription>
        </SheetHeader>
        <div className="mt-6 space-y-6">
          <div className="space-y-2">
            <Label>Price Range</Label>
            <div className="px-2">
              <Slider
                defaultValue={filters.priceRange}
                max={10000}
                step={100}
                onValueChange={(value) => setFilters({ ...filters, priceRange: value })}
              />
              <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                <span>${filters.priceRange[0]}</span>
                <span>${filters.priceRange[1]}</span>
              </div>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Square Footage</Label>
            <div className="px-2">
              <Slider
                defaultValue={filters.squareFootage}
                max={5000}
                step={100}
                onValueChange={(value) => setFilters({ ...filters, squareFootage: value })}
              />
              <div className="flex justify-between mt-2 text-sm text-muted-foreground">
                <span>{filters.squareFootage[0]} sq ft</span>
                <span>{filters.squareFootage[1]} sq ft</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Label>Property Features</Label>
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="pet-friendly">Pet Friendly</Label>
                <Switch
                  id="pet-friendly"
                  checked={filters.petFriendly}
                  onCheckedChange={(checked) => setFilters({ ...filters, petFriendly: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="parking">Parking Available</Label>
                <Switch
                  id="parking"
                  checked={filters.parking}
                  onCheckedChange={(checked) => setFilters({ ...filters, parking: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="furnished">Furnished</Label>
                <Switch
                  id="furnished"
                  checked={filters.furnished}
                  onCheckedChange={(checked) => setFilters({ ...filters, furnished: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="utilities">Utilities Included</Label>
                <Switch
                  id="utilities"
                  checked={filters.utilities}
                  onCheckedChange={(checked) => setFilters({ ...filters, utilities: checked })}
                />
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <Label>Amenities</Label>
            <div className="grid grid-cols-2 gap-4">
              {Object.entries(filters.amenities).map(([key, value]) => (
                <div key={key} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={key}
                    checked={value}
                    onChange={(e) =>
                      setFilters({
                        ...filters,
                        amenities: {
                          ...filters.amenities,
                          [key]: e.target.checked,
                        },
                      })
                    }
                    className="rounded border-gray-300"
                  />
                  <Label htmlFor={key}>{key.charAt(0).toUpperCase() + key.slice(1)}</Label>
                </div>
              ))}
            </div>
          </div>

          <Button onClick={handleApply} className="w-full">
            Apply Filters
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  )
}

