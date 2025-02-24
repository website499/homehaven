"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bed, Bath, Square, MapPin } from "lucide-react"

const properties = [
  {
    id: 1,
    title: "Luxury Downtown Apartment",
    location: "123 Main St, Downtown",
    price: 2500,
    bedrooms: 2,
    bathrooms: 2,
    sqft: 1200,
    image: "/apartment-1.jpg",
    tags: ["Luxury", "Pet Friendly"],
  },
  {
    id: 2,
    title: "Modern Studio Loft",
    location: "456 Park Ave, Midtown",
    price: 1800,
    bedrooms: 1,
    bathrooms: 1,
    sqft: 800,
    image: "/apartment-2.jpg",
    tags: ["Studio", "Modern"],
  },
  {
    id: 3,
    title: "Spacious Family Home",
    location: "789 Oak St, Suburbs",
    price: 3200,
    bedrooms: 3,
    bathrooms: 2.5,
    sqft: 1800,
    image: "/apartment-3.jpg",
    tags: ["Family", "Garden"],
  },
]

export default function FeaturedProperties() {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="container mx-auto">
        <motion.h2
          className="text-3xl md:text-4xl font-bold text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          Featured Properties
        </motion.h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {properties.map((property, index) => (
            <motion.div
              key={property.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
            >
              <Card className="overflow-hidden">
                <div className="relative h-48 w-full">
                  <Image
                    src={property.image || "/placeholder.svg"}
                    alt={property.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <CardHeader>
                  <CardTitle>{property.title}</CardTitle>
                  <div className="flex items-center text-muted-foreground">
                    <MapPin className="h-4 w-4 mr-1" />
                    {property.location}
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between mb-4">
                    <div className="flex items-center">
                      <Bed className="h-4 w-4 mr-1" />
                      {property.bedrooms} beds
                    </div>
                    <div className="flex items-center">
                      <Bath className="h-4 w-4 mr-1" />
                      {property.bathrooms} baths
                    </div>
                    <div className="flex items-center">
                      <Square className="h-4 w-4 mr-1" />
                      {property.sqft} sqft
                    </div>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {property.tags.map((tag) => (
                      <Badge key={tag} variant="secondary">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <div className="text-2xl font-bold">${property.price}</div>
                  <Button asChild>
                    <Link href={`/properties/${property.id}`}>View Details</Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

