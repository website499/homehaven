"use client"

import { Scale } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useComparison } from "@/context/ComparisonContext"
import type { Apartment } from "@/types"

interface CompareButtonProps {
  apartment: Apartment
}

export default function CompareButton({ apartment }: CompareButtonProps) {
  const { comparisonList, addToComparison, removeFromComparison } = useComparison()
  const isInComparison = comparisonList.some((a) => a.id === apartment.id)

  const handleClick = () => {
    if (isInComparison) {
      removeFromComparison(apartment.id)
    } else {
      addToComparison(apartment)
    }
  }

  return (
    <Button variant={isInComparison ? "default" : "outline"} size="sm" onClick={handleClick} className="w-full mt-2">
      <Scale className="mr-2 h-4 w-4" />
      {isInComparison ? "Remove from Compare" : "Add to Compare"}
    </Button>
  )
}

