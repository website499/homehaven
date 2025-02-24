import Image from "next/image"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"

const locations = [
  {
    name: "New York",
    image: "/placeholder.svg?height=300&width=400",
    count: 1234,
  },
  {
    name: "Los Angeles",
    image: "/placeholder.svg?height=300&width=400",
    count: 987,
  },
  {
    name: "Chicago",
    image: "/placeholder.svg?height=300&width=400",
    count: 765,
  },
  {
    name: "Houston",
    image: "/placeholder.svg?height=300&width=400",
    count: 543,
  },
]

export default function PopularLocations() {
  return (
    <section className="py-12 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold mb-6">Popular Locations</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {locations.map((location) => (
            <Link key={location.name} href={`/search?location=${location.name}`}>
              <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                <CardContent className="p-0">
                  <div className="relative h-48">
                    <Image
                      src={location.image || "/placeholder.svg"}
                      alt={location.name}
                      fill
                      className="object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                      <h3 className="text-xl font-semibold">{location.name}</h3>
                      <p>{location.count} properties</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  )
}

