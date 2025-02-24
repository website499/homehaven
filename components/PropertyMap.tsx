"use client"

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import "leaflet-defaulticon-compatibility"
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css"
import Link from "next/link"
import type { Property } from "@/types"

interface PropertyMapProps {
  properties: Property[]
}

export default function PropertyMap({ properties }: PropertyMapProps) {
  // Calculate center based on properties or default to New York
  const center =
    properties.length > 0 && properties[0].latitude && properties[0].longitude
      ? [properties[0].latitude, properties[0].longitude]
      : [40.7128, -74.006] // New York coordinates as default

  return (
    <div className="h-[600px] w-full rounded-lg overflow-hidden">
      <MapContainer
        center={[center[0], center[1]]}
        zoom={13}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {properties.map((property) => {
          if (!property.latitude || !property.longitude) return null

          return (
            <Marker key={property.id} position={[property.latitude, property.longitude]}>
              <Popup>
                <div className="p-2">
                  <h3 className="font-semibold mb-1">{property.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">${property.price}/mo</p>
                  <Link href={`/properties/${property.id}`} className="text-sm text-primary hover:underline">
                    View Details
                  </Link>
                </div>
              </Popup>
            </Marker>
          )
        })}
      </MapContainer>
    </div>
  )
}

