"use client"

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet"
import "leaflet/dist/leaflet.css"
import type { Apartment } from "@/types"
import Link from "next/link"

interface MapComponentProps {
  apartments: Apartment[]
}

export default function MapComponent({ apartments }: MapComponentProps) {
  return (
    <MapContainer center={[40.7128, -74.006]} zoom={13} style={{ height: "400px", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {apartments.map((apartment) => (
        <Marker key={apartment.id} position={[apartment.latitude, apartment.longitude]}>
          <Popup>
            <Link href={`/apartment/${apartment.id}`}>
              <h3 className="font-semibold">{apartment.title}</h3>
            </Link>
            <p className="text-sm">${apartment.price}/mo</p>
            <p className="text-sm">
              {apartment.bedrooms} bed, {apartment.bathrooms} bath
            </p>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  )
}

