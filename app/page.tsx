import type { Metadata } from "next"
import HomeClient from "./home-client"

export const metadata: Metadata = {
  title: "HomeHaven - Find Your Perfect Home",
  description: "Search apartments, houses, and condos for rent. Find your next home with HomeHaven.",
}

export default function HomePage() {
  return <HomeClient />
}

