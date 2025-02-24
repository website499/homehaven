"use client"

import type React from "react"

import { createContext, useContext, useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"

interface User {
  id: string
  name: string
  email: string
  role: "admin" | "landlord" | "tenant"
}

interface AuthContextType {
  user: User | null
  login: (email: string, password: string) => Promise<void>
  register: (name: string, email: string, password: string, role: string) => Promise<void>
  logout: () => void
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem("user")
    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
    setLoading(false)
  }, [])

  const login = async (email: string, password: string) => {
    // This is a mock implementation. In a real app, you would call your API
    if (email === "admin@example.com" && password === "adminpass") {
      const user = { id: "1", name: "Admin User", email, role: "admin" as const }
      setUser(user)
      localStorage.setItem("user", JSON.stringify(user))
    } else if (email === "landlord@example.com" && password === "landlordpass") {
      const user = { id: "2", name: "Landlord User", email, role: "landlord" as const }
      setUser(user)
      localStorage.setItem("user", JSON.stringify(user))
    } else if (email === "tenant@example.com" && password === "tenantpass") {
      const user = { id: "3", name: "Tenant User", email, role: "tenant" as const }
      setUser(user)
      localStorage.setItem("user", JSON.stringify(user))
    } else {
      throw new Error("Invalid credentials")
    }
  }

  const register = async (name: string, email: string, password: string, role: string) => {
    // This is a mock implementation. In a real app, you would call your API
    const user = {
      id: Date.now().toString(),
      name,
      email,
      role: role as "admin" | "landlord" | "tenant",
    }
    setUser(user)
    localStorage.setItem("user", JSON.stringify(user))
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem("user")
    toast({
      title: "Success",
      description: "Logged out successfully",
    })
    router.push("/")
  }

  return <AuthContext.Provider value={{ user, login, register, logout, loading }}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

