"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ScrollArea } from "@/components/ui/scroll-area"
import type { Property } from "@/types"

export default function RecentlyViewed() {
  const [recentProperties, setRecentProperties] = useState<Property[]>([])

  useEffect(() => {
    const stored = localStorage.getItem("recentlyViewed")
    if (stored) {
      setRecentProperties(JSON.parse(stored))
    }
  }, [])

  if (recentProperties.length === 0) {
    return null
  }

  return (
    <div className="border rounded-lg p-4">
      <h3 className="text-lg font-semibold mb-4">Recently Viewed</h3>
      <ScrollArea className="h-[200px]">
        <div className="space-y-4">
          {recentProperties.map((property) => (
            <Link
              key={property.id}
              href={`/properties/${property.id}`}
              className="flex items-center gap-4 p-2 hover:bg-muted rounded-lg"
            >
              <div className="relative w-16 h-16">
                <Image
                  src={property.images[0] || "/placeholder.svg"}
                  alt={property.title}
                  fill
                  className="object-cover rounded"
                />
              </div>
              <div>
                <h4 className="font-medium line-clamp-1">{property.title}</h4>
                <p className="text-sm text-muted-foreground">${property.price}/mo</p>
              </div>
            </Link>
          ))}
        </div>
      </ScrollArea>
    </div>
  )
}

