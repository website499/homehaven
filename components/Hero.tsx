"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function Hero() {
  const [searchTerm, setSearchTerm] = useState("")
  const router = useRouter()

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    router.push(`/search?q=${encodeURIComponent(searchTerm)}`)
  }

  return (
    <div className="relative h-[600px] flex items-center justify-center">
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/placeholder.svg?height=600&width=1920')",
          filter: "brightness(0.7)",
        }}
      />
      <div className="relative z-10 max-w-4xl w-full px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center text-white mb-8"
        >
          <h1 className="text-4xl md:text-6xl font-bold mb-4">Find Your Perfect Home</h1>
          <p className="text-xl md:text-2xl">Search apartments and homes for rent across the nation</p>
        </motion.div>
        <motion.form
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          onSubmit={handleSearch}
          className="flex gap-2"
        >
          <Input
            type="text"
            placeholder="Enter an address, neighborhood, city, or ZIP code"
            className="h-14 text-lg bg-white/90 backdrop-blur-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <Button type="submit" size="lg" className="h-14 px-8">
            <Search className="mr-2" />
            Search
          </Button>
        </motion.form>
      </div>
    </div>
  )
}

