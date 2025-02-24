export interface Property {
  id: string
  title: string
  description: string
  price: number
  location: string
  bedrooms: number
  bathrooms: number
  sqft: number
  images: string[]
  amenities: string[]
  available: boolean
  createdAt: string
  updatedAt: string
  petFriendly?: boolean
  parkingAvailable?: boolean
  yearBuilt?: number
  latitude?: number
  longitude?: number
  virtualTourUrl?: string
}

export interface SearchFilters {
  location?: string
  minPrice?: number
  maxPrice?: number
  beds?: string
  propertyType?: string
  amenities?: string[]
  petFriendly?: boolean
  parkingAvailable?: boolean
  yearBuilt?: number[]
}

export interface User {
  id: string
  name: string
  email: string
  role: "admin" | "tenant" | "landlord"
  favorites: string[]
}

export interface SavedSearch {
  id: string
  userId: string
  name: string
  filters: SearchFilters
  createdAt: string
  notificationsEnabled: boolean
}

export interface PropertyComparison {
  properties: Property[]
  features: string[]
}

export interface PropertyAlert {
  id: string
  userId: string
  searchId: string
  frequency: "daily" | "weekly"
  enabled: boolean
}

