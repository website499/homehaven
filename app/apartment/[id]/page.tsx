"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Image from "next/image"
import Link from "next/link"
import { MapPin, Building, ArrowLeft } from "lucide-react"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import FavoriteButton from "@/components/FavoriteButton"
import type { Apartment } from "@/types"
import { useAuth } from "@/context/AuthContext"
import { useNotification } from "@/context/NotificationContext"
import { Button } from "@/components/ui/button"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"
import { ErrorBoundary } from "@/components/ErrorBoundary"
import ApartmentDetailsSkeleton from "@/components/ApartmentDetailsSkeleton"

export default function ApartmentDetails() {
  const { id } = useParams()
  const [apartment, setApartment] = useState<Apartment | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [showApplicationForm, setShowApplicationForm] = useState(false)
  const [showReviewForm, setShowReviewForm] = useState(false)
  const [showMaintenanceForm, setShowMaintenanceForm] = useState(false)
  const { user } = useAuth()
  const { addNotification } = useNotification()
  const router = useRouter()

  useEffect(() => {
    const fetchApartment = async () => {
      try {
        setIsLoading(true)
        const response = await fetch(`/api/apartments/${id}`)
        if (!response.ok) {
          throw new Error(response.status === 404 ? "Apartment not found" : "Failed to load apartment details")
        }
        const data = await response.json()
        setApartment(data)
        setError(null)
      } catch (error) {
        console.error("Error fetching apartment:", error)
        setError(error instanceof Error ? error.message : "An unexpected error occurred")
        addNotification("Failed to load apartment details", "error")
      } finally {
        setIsLoading(false)
      }
    }

    if (id) {
      fetchApartment()
    }
  }, [id, addNotification])

  const handleApplicationSubmit = async (application: any) => {
    try {
      const response = await fetch("/api/applications", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...application, apartmentId: id }),
      })

      if (!response.ok) {
        throw new Error("Failed to submit application")
      }

      addNotification("Application submitted successfully", "success")
      setShowApplicationForm(false)
    } catch (error) {
      addNotification("Failed to submit application", "error")
    }
  }

  const handleReviewSubmit = async (review: { rating: number; comment: string }) => {
    try {
      const response = await fetch(`/api/apartments/${id}/reviews`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...review, userId: user?.id }),
      })

      if (!response.ok) {
        throw new Error("Failed to submit review")
      }

      addNotification("Review submitted successfully", "success")
      setShowReviewForm(false)
      // Refresh apartment data to show new review
      router.refresh()
    } catch (error) {
      addNotification("Failed to submit review", "error")
    }
  }

  const handleMaintenanceRequestSubmit = async (request: { title: string; description: string }) => {
    try {
      const response = await fetch("/api/maintenance-requests", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...request, apartmentId: id, userId: user?.id }),
      })

      if (!response.ok) {
        throw new Error("Failed to submit maintenance request")
      }

      addNotification("Maintenance request submitted successfully", "success")
      setShowMaintenanceForm(false)
    } catch (error) {
      addNotification("Failed to submit maintenance request", "error")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 to-white flex flex-col">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center text-sky-600 hover:underline mb-6">
          <ArrowLeft className="mr-2" size={20} />
          Back to listings
        </Link>

        <ErrorBoundary>
          {isLoading ? (
            <ApartmentDetailsSkeleton />
          ) : error ? (
            <div className="text-center py-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">{error}</h2>
              <Button onClick={() => router.push("/")}>Return to Home</Button>
            </div>
          ) : apartment ? (
            <div className="bg-white rounded-lg shadow-md overflow-hidden">
              <Carousel className="w-full max-w-4xl mx-auto">
                <CarouselContent>
                  {apartment.images.map((image, index) => (
                    <CarouselItem key={index}>
                      <div className="relative aspect-video">
                        <Image
                          src={image || "/placeholder.svg"}
                          alt={`${apartment.title} - Image ${index + 1}`}
                          fill
                          className="object-cover"
                          priority={index === 0}
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>

              <div className="p-6">
                <div className="flex justify-between items-center mb-4">
                  <h1 className="text-3xl font-bold fancy-text">{apartment.title}</h1>
                  <FavoriteButton apartmentId={apartment.id} />
                </div>
                <p className="text-xl text-sky-600 font-semibold mb-4">${apartment.price}/mo</p>
                <div className="flex items-center text-gray-500 mb-4">
                  <MapPin className="mr-2" size={20} />
                  <span>
                    {apartment.address}, {apartment.city}, {apartment.state} {apartment.zipCode}
                  </span>
                </div>
                <div className="flex items-center text-gray-500 mb-6">
                  <Building className="mr-2" size={20} />
                  <span>
                    {apartment.bedrooms} bed • {apartment.bathrooms} bath • {apartment.sqft} sqft
                  </span>
                </div>
                <p className="text-gray-700 mb-6 visible-text">{apartment.description}</p>
                <div className="flex items-center text-gray-500 mb-2">
                  <span className="mr-2">Vacant:</span>
                  {apartment.isVacant ? (
                    <span className="text-green-500">Yes</span>
                  ) : (
                    <span className="text-red-500">No</span>
                  )}
                </div>
                <div className="flex items-center text-gray-500 mb-4">
                  <span className="mr-2">Available to Lease:</span>
                  {apartment.isAvailableToLease ? (
                    <span className="text-green-500">Yes</span>
                  ) : (
                    <span className="text-red-500">No</span>
                  )}
                </div>
                <div className="mb-4">
                  <h3 className="text-lg font-semibold mb-2">Amenities</h3>
                  <ul className="list-disc list-inside">
                    {apartment.amenities.map((amenity, index) => (
                      <li key={index}>{amenity}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ) : null}
        </ErrorBoundary>
      </main>

      <Footer />
    </div>
  )
}

