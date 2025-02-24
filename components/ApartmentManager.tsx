"use client"

import type React from "react"

import { useState, useEffect } from "react"
import type { Apartment } from "@/types"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import ApplicationList from "@/components/ApplicationList"
import { useNotification } from "@/context/NotificationContext"

export default function ApartmentManager() {
  const [apartments, setApartments] = useState<Apartment[]>([])
  const [newApartment, setNewApartment] = useState<Partial<Apartment>>({
    title: "",
    description: "",
    address: "",
    city: "",
    state: "",
    zipCode: "",
    bedrooms: 0,
    bathrooms: 0,
    sqft: 0,
    price: 0,
    images: [],
    isVacant: true,
    isAvailableToLease: true,
  })

  const { addNotification } = useNotification()

  useEffect(() => {
    fetchApartments()
  }, [])

  const fetchApartments = async () => {
    try {
      const response = await fetch("/api/apartments")
      if (!response.ok) {
        throw new Error("Failed to fetch apartments")
      }
      const data = await response.json()
      setApartments(data)
    } catch (error) {
      console.error("Error fetching apartments:", error)
      addNotification("Failed to load apartments. Please try again.", "error")
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target
    setNewApartment((prev) => ({
      ...prev,
      [name]: type === "number" ? Number(value) : type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
    }))
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setNewApartment((prev) => ({
        ...prev,
        images: Array.from(e.target.files || []),
      }))
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const formData = new FormData()
    Object.entries(newApartment).forEach(([key, value]) => {
      if (key === "images") {
        ;(value as File[]).forEach((file, index) => {
          formData.append(`image${index}`, file)
        })
      } else {
        formData.append(key, String(value))
      }
    })

    try {
      const response = await fetch("/api/apartments", {
        method: "POST",
        body: formData,
      })
      if (!response.ok) {
        throw new Error("Failed to add apartment")
      }
      const addedApartment = await response.json()
      setApartments((prev) => [...prev, addedApartment])
      setNewApartment({
        title: "",
        description: "",
        address: "",
        city: "",
        state: "",
        zipCode: "",
        bedrooms: 0,
        bathrooms: 0,
        sqft: 0,
        price: 0,
        images: [],
        isVacant: true,
        isAvailableToLease: true,
      })
      addNotification("Apartment added successfully!", "success")
    } catch (error) {
      console.error("Error adding apartment:", error)
      addNotification("Failed to add apartment. Please try again.", "error")
    }
  }

  const handleDelete = async (id: number) => {
    try {
      const response = await fetch(`/api/apartments/${id}`, {
        method: "DELETE",
      })
      if (!response.ok) {
        throw new Error("Failed to delete apartment")
      }
      fetchApartments()
      addNotification("Apartment deleted successfully!", "success")
    } catch (error) {
      console.error("Error deleting apartment:", error)
      addNotification("Failed to delete apartment. Please try again.", "error")
    }
  }

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Apartments</h2>
      <Tabs defaultValue="add">
        <TabsList>
          <TabsTrigger value="add">Add New Apartment</TabsTrigger>
          <TabsTrigger value="list">Current Listings</TabsTrigger>
        </TabsList>
        <TabsContent value="add">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <Label htmlFor="title">Title</Label>
              <Input id="title" name="title" value={newApartment.title} onChange={handleInputChange} required />
            </div>
            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                name="description"
                value={newApartment.description}
                onChange={handleInputChange}
                required
              />
            </div>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label htmlFor="address">Address</Label>
                <Input id="address" name="address" value={newApartment.address} onChange={handleInputChange} required />
              </div>
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <Label htmlFor="city">City</Label>
                <Input id="city" name="city" value={newApartment.city} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="state">State</Label>
                <Input id="state" name="state" value={newApartment.state} onChange={handleInputChange} required />
              </div>
              <div>
                <Label htmlFor="zipCode">Zip Code</Label>
                <Input id="zipCode" name="zipCode" value={newApartment.zipCode} onChange={handleInputChange} required />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="bedrooms">Bedrooms</Label>
                <Input
                  type="number"
                  id="bedrooms"
                  name="bedrooms"
                  value={newApartment.bedrooms}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="bathrooms">Bathrooms</Label>
                <Input
                  type="number"
                  id="bathrooms"
                  name="bathrooms"
                  value={newApartment.bathrooms}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="sqft">Square Feet</Label>
                <Input
                  type="number"
                  id="sqft"
                  name="sqft"
                  value={newApartment.sqft}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div>
                <Label htmlFor="price">Price</Label>
                <Input
                  type="number"
                  id="price"
                  name="price"
                  value={newApartment.price}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>
            <div>
              <Label htmlFor="images">Images</Label>
              <Input id="images" name="images" type="file" onChange={handleFileChange} accept="image/*" multiple />
            </div>
            <div className="flex items-center space-x-2">
              <Input
                type="checkbox"
                id="isVacant"
                name="isVacant"
                checked={newApartment.isVacant}
                onChange={handleInputChange}
              />
              <Label htmlFor="isVacant">Is Vacant</Label>
            </div>
            <div className="flex items-center space-x-2">
              <Input
                type="checkbox"
                id="isAvailableToLease"
                name="isAvailableToLease"
                checked={newApartment.isAvailableToLease}
                onChange={handleInputChange}
              />
              <Label htmlFor="isAvailableToLease">Available to Lease</Label>
            </div>
            <Button type="submit">Add Apartment</Button>
          </form>
        </TabsContent>
        <TabsContent value="list">
          <ul className="space-y-4">
            {apartments.map((apartment) => (
              <li key={apartment.id} className="border p-4 rounded-md">
                <h4 className="font-bold">{apartment.title}</h4>
                <p>{apartment.address}</p>
                <p>
                  {apartment.city}, {apartment.state} {apartment.zipCode}
                </p>
                <p>${apartment.price}/month</p>
                <p>{apartment.images.length} image(s)</p>
                <Button variant="destructive" onClick={() => handleDelete(apartment.id)}>
                  Delete
                </Button>
                <ApplicationList applications={apartment.applications} />
              </li>
            ))}
          </ul>
        </TabsContent>
      </Tabs>
    </div>
  )
}

