"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import type { Property } from "@/types"
import { Check, X } from "lucide-react"

interface PropertyComparisonProps {
  properties: Property[]
}

export default function PropertyComparison({ properties }: PropertyComparisonProps) {
  const [selectedProperties, setSelectedProperties] = useState<Property[]>([])

  const toggleProperty = (property: Property) => {
    if (selectedProperties.find((p) => p.id === property.id)) {
      setSelectedProperties(selectedProperties.filter((p) => p.id !== property.id))
    } else if (selectedProperties.length < 3) {
      setSelectedProperties([...selectedProperties, property])
    }
  }

  const compareFeatures = [
    { label: "Price", key: "price" },
    { label: "Bedrooms", key: "bedrooms" },
    { label: "Bathrooms", key: "bathrooms" },
    { label: "Square Feet", key: "sqft" },
    { label: "Pet Friendly", key: "petFriendly" },
    { label: "Parking", key: "parkingAvailable" },
    { label: "Year Built", key: "yearBuilt" },
  ]

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="w-full">
          Compare Properties ({selectedProperties.length}/3)
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>Compare Properties</DialogTitle>
          <DialogDescription>Select up to 3 properties to compare their features</DialogDescription>
        </DialogHeader>
        <ScrollArea className="h-[600px]">
          <div className="space-y-4">
            <div className="grid grid-cols-3 gap-4">
              {properties.map((property) => (
                <div
                  key={property.id}
                  className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                    selectedProperties.find((p) => p.id === property.id)
                      ? "border-primary bg-primary/5"
                      : "hover:border-primary/50"
                  }`}
                  onClick={() => toggleProperty(property)}
                >
                  <h3 className="font-semibold truncate">{property.title}</h3>
                  <p className="text-sm text-muted-foreground">{property.location}</p>
                </div>
              ))}
            </div>

            {selectedProperties.length > 0 && (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Feature</TableHead>
                    {selectedProperties.map((property) => (
                      <TableHead key={property.id}>{property.title}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {compareFeatures.map((feature) => (
                    <TableRow key={feature.key}>
                      <TableCell className="font-medium">{feature.label}</TableCell>
                      {selectedProperties.map((property) => (
                        <TableCell key={property.id}>
                          {typeof property[feature.key] === "boolean" ? (
                            property[feature.key] ? (
                              <Check className="h-4 w-4 text-green-500" />
                            ) : (
                              <X className="h-4 w-4 text-red-500" />
                            )
                          ) : (
                            property[feature.key]
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </div>
        </ScrollArea>
      </DialogContent>
    </Dialog>
  )
}

