import type { Metadata } from "next"
import { Suspense } from "react"
import SearchClient from "./search-client"
import SearchLoading from "./loading"

export const metadata: Metadata = {
  title: "Search Properties - HomeHaven",
  description: "Search for your perfect rental property with HomeHaven.",
}

export default function SearchPage() {
  return (
    <Suspense fallback={<SearchLoading />}>
      <SearchClient />
    </Suspense>
  )
}

