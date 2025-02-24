import type { Apartment } from "@/types"

export const mockApartments: Apartment[] = [
  {
    id: 1,
    title: "Cozy 1-Bedroom Apartment",
    description:
      "Modern amenities in a quiet neighborhood. This charming apartment features hardwood floors, updated kitchen appliances, and a spacious living area perfect for relaxing or entertaining.",
    location: "Downtown, Cityville",
    bedrooms: 1,
    bathrooms: 1,
    sqft: 750,
    price: 1500,
    image: "/placeholder.svg?height=400&width=800",
  },
  {
    id: 2,
    title: "Spacious 2-Bedroom Apartment",
    description:
      "Luxurious living with city views. This apartment boasts floor-to-ceiling windows, a gourmet kitchen, and a private balcony overlooking the bustling city center.",
    location: "Midtown, Metropolis",
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1100,
    price: 2200,
    image: "/placeholder.svg?height=400&width=800",
  },
  {
    id: 3,
    title: "Modern 3-Bedroom Apartment",
    description:
      "Family-friendly with nearby parks. This spacious apartment features an open-concept living area, updated bathrooms, and a dedicated home office space. Perfect for families or those who need extra room.",
    location: "Suburbia, Greenville",
    bedrooms: 3,
    bathrooms: 2,
    sqft: 1400,
    price: 2800,
    image: "/placeholder.svg?height=400&width=800",
  },
]

