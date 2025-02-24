"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { Button } from "@/components/ui/button"

export default function DashboardPage() {
  const { user } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [user, router])

  if (!user) {
    return null // or a loading spinner
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-100 to-white flex flex-col">
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6 fancy-text">Welcome, {user.username}!</h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-xl font-semibold mb-4">Your Dashboard</h2>
          {user.role === "admin" && (
            <div>
              <p className="mb-4">As an admin, you have access to all features:</p>
              <Button onClick={() => router.push("/manage")}>Manage Listings</Button>
            </div>
          )}
          {user.role === "landlord" && (
            <div>
              <p className="mb-4">As a landlord, you can manage your properties:</p>
              <Button onClick={() => router.push("/my-properties")}>My Properties</Button>
            </div>
          )}
          {user.role === "tenant" && (
            <div>
              <p className="mb-4">As a tenant, you can view your applications and favorite listings:</p>
              <Button onClick={() => router.push("/my-applications")} className="mr-4">
                My Applications
              </Button>
              <Button onClick={() => router.push("/favorites")}>My Favorites</Button>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  )
}

