import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"
import { AuthProvider } from "@/context/AuthContext"
import { NotificationProvider } from "@/context/NotificationContext"
import { ComparisonProvider } from "@/context/ComparisonContext"
import { Toaster } from "@/components/ui/toaster"
import { PropertyProvider } from "@/context/PropertyContext"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: {
    default: "HomeHaven - Find Your Perfect Home",
    template: "%s | HomeHaven",
  },
  description: "Find and rent your perfect home with HomeHaven.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <NotificationProvider>
            <AuthProvider>
              <PropertyProvider>
                <ComparisonProvider>
                  {children}
                  <Toaster />
                </ComparisonProvider>
              </PropertyProvider>
            </AuthProvider>
          </NotificationProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'