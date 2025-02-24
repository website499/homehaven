"use client"

import { useEffect, useState } from "react"
import dynamic from "next/dynamic"
import type { Apartment } from "@/types"

const MapComponent = dynamic(
  () => import("./MapComponent").then((mod) => mod.default),
  { ssr: false }, // This will only render the map on the client side
)

interface ApartmentMapProps {
  apartments: Apartment[]
}

export default function ApartmentMap({ apartments }: ApartmentMapProps) {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return <div className="h-[400px] w-full bg-gray-100 animate-pulse" />
  }

  return <MapComponent apartments={apartments} />
}

