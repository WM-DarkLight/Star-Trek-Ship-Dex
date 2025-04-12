"use client"

import { useState } from "react"
import type { Starship } from "@/types/starship"
import { Button } from "@/components/ui/button"
import { X, ChevronLeft, ChevronRight, Shield, Zap, Gauge } from "lucide-react"
import { motion } from "framer-motion"
import { useAudio } from "@/components/audio-provider"

interface ShipComparisonProps {
  ships: Starship[]
  onClose: () => void
}

export function ShipComparison({ ships, onClose }: ShipComparisonProps) {
  const [currentPage, setCurrentPage] = useState(0)
  const { playSound } = useAudio()

  // Define comparison categories
  const categories = [
    { name: "General Specifications", fields: ["class", "affiliation", "era", "registry"] },
    {
      name: "Technical Specifications",
      fields: ["stats.hull", "stats.shields", "stats.weapons", "stats.speed", "stats.maneuver"],
    },
    { name: "Physical Specifications", fields: ["stats.crew", "stats.length_m"] },
  ]

  const currentCategory = categories[currentPage]

  const handlePrevPage = () => {
    playSound("beep")
    setCurrentPage((prev) => (prev > 0 ? prev - 1 : categories.length - 1))
  }

  const handleNextPage = () => {
    playSound("beep")
    setCurrentPage((prev) => (prev < categories.length - 1 ? prev + 1 : 0))
  }

  // Helper function to get nested properties
  const getNestedProperty = (obj: any, path: string) => {
    return path.split(".").reduce((prev, curr) => (prev ? prev[curr] : null), obj)
  }

  // Helper function to format field names
  const formatFieldName = (field: string) => {
    return field
      .split(".")
      .pop()
      ?.replace(/_/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase())
      .replace("M", " (m)")
  }

  // Helper function to get icon for a field
  const getFieldIcon = (field: string) => {
    if (field.includes("hull") || field.includes("shields")) return Shield
    if (field.includes("weapons")) return Zap
    if (field.includes("speed") || field.includes("maneuver")) return Gauge
    return null
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex border-b-2 border-lcars-frame">
        <div className="w-16 h-16 bg-lcars-elbow border-r-2 border-b-2 border-black"></div>
        <div className="flex-1 bg-black/80 h-16 flex items-center px-6 justify-between">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-lcars-accent1">Ship Comparison</h1>
            <span className="ml-3 text-lcars-text/70">{ships.length} vessels</span>
          </div>

          <Button variant="ghost" size="icon" onClick={onClose} className="hover:bg-transparent">
            <X className="h-6 w-6 text-lcars-text/70 hover:text-lcars-text" />
          </Button>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="max-w-6xl mx-auto">
          {/* Category navigation */}
          <div className="flex items-center justify-between mb-6">
            <Button
              variant="outline"
              size="icon"
              onClick={handlePrevPage}
              className="bg-black/60 border-lcars-accent2/50 text-lcars-accent2 hover:bg-black/80 hover:border-lcars-accent2"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            <h2 className="text-xl font-bold text-lcars-accent2">{currentCategory.name}</h2>

            <Button
              variant="outline"
              size="icon"
              onClick={handleNextPage}
              className="bg-black/60 border-lcars-accent2/50 text-lcars-accent2 hover:bg-black/80 hover:border-lcars-accent2"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>

          {/* Ship images */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 mb-8">
            {ships.map((ship, index) => (
              <motion.div
                key={ship.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-black/40 border border-lcars-frame/30 rounded-md overflow-hidden"
              >
                <div className="h-32 bg-black/60 flex items-center justify-center">
                  {ship.imageUrl ? (
                    <img src={ship.imageUrl || "/placeholder.svg"} alt={ship.name} className="h-full object-contain" />
                  ) : (
                    <div
                      className={`w-full h-full flex items-center justify-center ${ship.placeholder_style || "placeholder-default"}`}
                    >
                      <div className="text-lcars-text/50">{ship.class} Class</div>
                    </div>
                  )}
                </div>
                <div className="p-3 border-t border-lcars-frame/30">
                  <h3 className="text-lcars-accent1 font-medium">{ship.name}</h3>
                  <div className="text-lcars-text/70 text-sm">{ship.registry || "No Registry"}</div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Comparison table */}
          <div className="bg-black/40 border border-lcars-frame/30 rounded-md overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-lcars-accent2/20">
                  <th className="text-left p-3 text-lcars-accent2 font-medium">Specification</th>
                  {ships.map((ship) => (
                    <th key={ship.id} className="text-left p-3 text-lcars-accent2 font-medium">
                      {ship.name}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {currentCategory.fields.map((field, index) => {
                  const Icon = getFieldIcon(field)

                  return (
                    <tr key={field} className={index % 2 === 0 ? "bg-black/20" : "bg-black/40"}>
                      <td className="p-3 text-lcars-text flex items-center">
                        {Icon && <Icon className="h-4 w-4 mr-2 text-lcars-accent3" />}
                        {formatFieldName(field)}
                      </td>

                      {ships.map((ship) => {
                        const value = getNestedProperty(ship, field)
                        const isNumeric = typeof value === "number"

                        // Determine if this ship has the highest value for this numeric field
                        const isHighest = isNumeric && ships.every((s) => getNestedProperty(s, field) <= value)

                        return (
                          <td
                            key={`${ship.id}-${field}`}
                            className={`p-3 ${isHighest ? "text-lcars-accent1 font-medium" : "text-lcars-text"}`}
                          >
                            {field === "stats.speed" && typeof value === "number" && value > 9
                              ? `Warp ${value}`
                              : value?.toString() || "N/A"}

                            {isNumeric &&
                              field.includes("stats.") &&
                              !field.includes("length") &&
                              !field.includes("crew") && (
                                <div className="w-full h-1 bg-black/60 rounded-full mt-1 overflow-hidden">
                                  <motion.div
                                    initial={{ width: 0 }}
                                    animate={{ width: `${Math.min(100, Math.max(0, Number(value) * 10))}%` }}
                                    transition={{ duration: 1 }}
                                    className={`h-full ${isHighest ? "bg-lcars-accent1" : "bg-lcars-accent3/70"}`}
                                  />
                                </div>
                              )}
                          </td>
                        )
                      })}
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}
