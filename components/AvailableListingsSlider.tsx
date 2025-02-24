"use client"

import Image from "next/image"
import Link from "next/link"
import type { Apartment } from "@/types"
import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { ErrorBoundary } from "@/components/ErrorBoundary"

interface AvailableListingsSliderProps {
  listings?: Apartment[]
}

export default function AvailableListingsSlider({ listings = [] }: AvailableListingsSliderProps) {
  if (!Array.isArray(listings) || listings.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-muted-foreground">No available listings at the moment.</p>
      </div>
    )
  }

  return (
    <ErrorBoundary>
      <section className="container mx-auto px-4 py-12">
        <h2 className="text-2xl font-semibold mb-6">Available Listings</h2>
        <Carousel className="w-full max-w-xs mx-auto">
          <CarouselContent>
            {listings.map((apartment) => (
              <CarouselItem key={apartment.id}>
                <div className="bg-white rounded-lg shadow-md overflow-hidden">
                  <div className="relative aspect-video">
                    <Image
                      src={apartment.images?.[0] || "/placeholder.svg?height=400&width=600"}
                      alt={apartment.title}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="text-xl font-semibold mb-2">{apartment.title}</h3>
                    <p className="text-gray-600 mb-4">{apartment.description}</p>
                    <div className="flex items-center text-gray-500 mb-2">
                      <span className="text-xl font-bold text-sky-600">${apartment.price}/mo</span>
                    </div>
                    <Link href={`/apartment/${apartment.id}`}>
                      <Button variant="outline" className="w-full">
                        View Details
                      </Button>
                    </Link>
                  </div>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>
    </ErrorBoundary>
  )
}

