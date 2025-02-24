export interface Apartment {
  id: number
  title: string
  description: string
  address: string
  city: string
  state: string
  zipCode: string
  bedrooms: number
  bathrooms: number
  sqft: number
  price: number
  images: string[]
  isVacant: boolean
  isAvailableToLease: boolean
  applications: RentalApplication[]
  reviews: Review[]
  amenities: string[]
  petFriendly: boolean
  parkingAvailable: boolean
  latitude: number
  longitude: number
}

export interface RentalApplication {
  id: number
  apartmentId: number
  name: string
  email: string
  phone: string
  income: number
  message: string
  status: "pending" | "approved" | "rejected"
}

export interface Review {
  id: number
  apartmentId: number
  userId: string
  rating: number
  comment: string
  createdAt: string
}

export interface SearchFilters {
  searchTerm: string
  minPrice: number
  maxPrice: number
  bedrooms: number
  amenities: string[]
  petFriendly: boolean
  parkingAvailable: boolean
}

export interface User {
  id: string
  username: string
  email: string
  role: "admin" | "tenant" | "landlord"
  favorites: number[]
}

export interface Notification {
  id: number
  userId: string
  message: string
  type: "info" | "success" | "warning" | "error"
  read: boolean
  createdAt: string
}

export interface MaintenanceRequest {
  id: number
  apartmentId: number
  userId: string
  title: string
  description: string
  status: "pending" | "in-progress" | "completed"
  createdAt: string
  updatedAt: string
}

export interface Payment {
  id: number
  userId: string
  apartmentId: number
  amount: number
  date: string
  status: "pending" | "completed" | "failed"
}

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
}

