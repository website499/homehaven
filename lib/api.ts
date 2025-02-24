import type { Property, SearchFilters } from "@/types"

export async function fetchProperties(filters: SearchFilters): Promise<Property[]> {
  try {
    // In a real app, this would be an API call
    // For now, we'll return mock data
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API delay

    const mockProperties: Property[] = [
      {
        id: "1",
        title: "Luxury Downtown Apartment",
        description: "Beautiful apartment in the heart of downtown",
        price: 2500,
        location: "123 Main St, Downtown",
        bedrooms: 2,
        bathrooms: 2,
        sqft: 1200,
        images: ["/placeholder.svg?height=400&width=600"],
        amenities: ["Parking", "Gym", "Pool"],
        available: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
      {
        id: "2",
        title: "Modern Studio Loft",
        description: "Stylish studio in a prime location",
        price: 1800,
        location: "456 Park Ave, Midtown",
        bedrooms: 1,
        bathrooms: 1,
        sqft: 800,
        images: ["/placeholder.svg?height=400&width=600"],
        amenities: ["Laundry", "Security", "Elevator"],
        available: true,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      },
    ]

    // Apply filters if they exist
    return mockProperties.filter((property) => {
      if (!property) return false

      if (filters.location && !property.location.toLowerCase().includes(filters.location.toLowerCase())) {
        return false
      }
      if (filters.minPrice && property.price < filters.minPrice) {
        return false
      }
      if (filters.maxPrice && property.price > filters.maxPrice) {
        return false
      }
      if (filters.beds && property.bedrooms < Number(filters.beds)) {
        return false
      }
      return true
    })
  } catch (error) {
    console.error("Error fetching properties:", error)
    throw new Error("Failed to fetch properties")
  }
}

