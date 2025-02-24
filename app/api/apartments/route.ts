import { NextResponse } from "next/server"
import { writeFile } from "fs/promises"
import path from "path"
import { v4 as uuidv4 } from "uuid"
import type { Apartment } from "@/types"

export async function POST(request: Request) {
  const formData = await request.formData()
  const apartment: Partial<Apartment> = {
    id: Date.now(),
    title: formData.get("title") as string,
    description: formData.get("description") as string,
    address: formData.get("address") as string,
    city: formData.get("city") as string,
    state: formData.get("state") as string,
    zipCode: formData.get("zipCode") as string,
    bedrooms: Number(formData.get("bedrooms")),
    bathrooms: Number(formData.get("bathrooms")),
    sqft: Number(formData.get("sqft")),
    price: Number(formData.get("price")),
    isVacant: formData.get("isVacant") === "true",
    isAvailableToLease: formData.get("isAvailableToLease") === "true",
    images: [],
    applications: [],
    reviews: [],
  }

  const images: string[] = []
  for (const [key, value] of formData.entries()) {
    if (key.startsWith("image") && value instanceof Blob) {
      const buffer = Buffer.from(await value.arrayBuffer())
      const filename = `${uuidv4()}.${value.type.split("/")[1]}`
      const filepath = path.join(process.cwd(), "public", "uploads", filename)
      await writeFile(filepath, buffer)
      images.push(`/uploads/${filename}`)
    }
  }
  apartment.images = images

  // In a real app, you'd save this to a database
  // For now, we'll just return the created apartment
  return NextResponse.json(apartment, { status: 201 })
}

export async function GET() {
  // In a real app, you'd fetch this from a database
  // For now, we'll just return a mock list of apartments
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
      images: ["/placeholder.svg"],
      isVacant: true,
      isAvailableToLease: true,
      applications: [],
      reviews: [],
    },
    // Add more mock apartments here
  ]

  return NextResponse.json(apartments)
}

export async function DELETE(request: Request) {
  const { id } = await request.json()
  // In a real app, you'd delete the apartment from the database
  // For now, we'll just return a success message
  return NextResponse.json({ message: `Apartment ${id} deleted successfully` })
}

