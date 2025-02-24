import { NextResponse } from "next/server"
import type { Apartment } from "@/types"

// This should be replaced with actual data fetching logic in a real application
const apartments: Apartment[] = [
  {
    id: 1,
    title: "Cozy 1-Bedroom Apartment",
    description: "A charming apartment in the heart of the city.",
    address: "123 Main St",
    city: "Cityville",
    state: "State",
    zipCode: "12345",
    bedrooms: 1,
    bathrooms: 1,
    sqft: 750,
    price: 1200,
    images: [],
    isVacant: true,
    isAvailableToLease: true,
    applications: [],
  },
  // Add more mock apartments here
]

export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = Number(params.id)
  const apartment = apartments.find((apt) => apt.id === id)

  if (apartment) {
    return NextResponse.json(apartment)
  } else {
    return NextResponse.json({ error: "Apartment not found" }, { status: 404 })
  }
}

