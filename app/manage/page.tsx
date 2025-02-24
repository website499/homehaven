"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/context/AuthContext"
import ApartmentManager from "@/components/ApartmentManager"
import Header from "@/components/Header"
import Footer from "@/components/Footer"
import { useNotification } from "@/context/NotificationContext"

export default function ManagePage() {
  const { user } = useAuth()
  const router = useRouter()
  const { addNotification } = useNotification()

  useEffect(() => {
    if (!user) {
      addNotification("Please log in to access this page.", "error")
      router.push("/login")
    } else if (user.role !== "admin") {
      addNotification("You don't have permission to access this page.", "error")
      router.push("/dashboard")
    }
  }, [user, router, addNotification])

  if (!user || user.role !== "admin") {
    return null // or a loading spinner
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-primary/10 to-background flex flex-col">
      <Header />
      <main className="flex-grow">
        <ApartmentManager />
      </main>
      <Footer />
    </div>
  )
}

