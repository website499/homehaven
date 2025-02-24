import type { Apartment } from "@/types"

export async function getApartments(): Promise<Apartment[]> {
  // Simulating an API call
  await new Promise((resolve) => setTimeout(resolve, 1000))

  return [
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
    },
    {
      id: 2,
      title: "Spacious 2-Bedroom Apartment",
      description: "A modern apartment with great amenities.",
      address: "456 Oak Ave",
      city: "Townsburg",
      state: "State",
      zipCode: "67890",
      bedrooms: 2,
      bathrooms: 2,
      sqft: 1000,
      price: 1800,
      images: ["/placeholder.svg"],
      isVacant: true,
      isAvailableToLease: true,
      applications: [],
    },
    {
      id: 3,
      title: "Luxury 3-Bedroom Penthouse",
      description: "An exclusive penthouse with stunning city views.",
      address: "789 Skyline Blvd",
      city: "Metropolis",
      state: "State",
      zipCode: "13579",
      bedrooms: 3,
      bathrooms: 3,
      sqft: 2000,
      price: 3500,
      images: ["/placeholder.svg"],
      isVacant: false,
      isAvailableToLease: false,
      applications: [],
    },
  ]
}

