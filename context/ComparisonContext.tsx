"use client"

import type React from "react"
import { createContext, useContext, useState } from "react"
import type { Apartment } from "@/types"
import { useNotification } from "@/context/NotificationContext"

type ComparisonContextType = {
  comparisonList: Apartment[]
  addToComparison: (apartment: Apartment) => void
  removeFromComparison: (apartmentId: number) => void
  clearComparison: () => void
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined)

export const ComparisonProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [comparisonList, setComparisonList] = useState<Apartment[]>([])
  const { addNotification } = useNotification()

  const addToComparison = (apartment: Apartment) => {
    if (comparisonList.length >= 3) {
      addNotification("You can only compare up to 3 properties at a time", "error")
      return
    }
    if (comparisonList.some((a) => a.id === apartment.id)) {
      addNotification("This property is already in your comparison list", "info")
      return
    }
    setComparisonList([...comparisonList, apartment])
    addNotification("Added to comparison", "success")
  }

  const removeFromComparison = (apartmentId: number) => {
    setComparisonList(comparisonList.filter((a) => a.id !== apartmentId))
    addNotification("Removed from comparison", "info")
  }

  const clearComparison = () => {
    setComparisonList([])
    addNotification("Comparison list cleared", "info")
  }

  return (
    <ComparisonContext.Provider value={{ comparisonList, addToComparison, removeFromComparison, clearComparison }}>
      {children}
    </ComparisonContext.Provider>
  )
}

export const useComparison = () => {
  const context = useContext(ComparisonContext)
  if (context === undefined) {
    throw new Error("useComparison must be used within a ComparisonProvider")
  }
  return context
}

