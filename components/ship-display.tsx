"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import type { Starship } from "@/types/starship"
import { Button } from "@/components/ui/button"
import { Star, ExternalLink, Info, CheckSquare, BookOpen } from "lucide-react"
import { ShipModel } from "@/components/ship-model"
import { ShipWiki } from "@/components/ship-wiki"
import { useAudio } from "@/components/audio-provider"

interface ShipDisplayProps {
  ship: Starship
  isFavorite: boolean
  onToggleFavorite: () => void
  isSelected: boolean
  onToggleSelect: () => void
}

export function ShipDisplay({ ship, isFavorite, onToggleFavorite, isSelected, onToggleSelect }: ShipDisplayProps) {
  const [isLoading, setIsLoading] = useState(true)
  const [viewMode, setViewMode] = useState<"standard" | "wiki">("standard")
  const { playSound } = useAudio()

  // Simulate loading state
  useEffect(() => {
    setIsLoading(true)
    const timer = setTimeout(() => {
      setIsLoading(false)
      playSound("success")
    }, 800)

    return () => clearTimeout(timer)
  }, [ship.id, playSound])

  const toggleViewMode = () => {
    playSound("select")
    setViewMode(viewMode === "standard" ? "wiki" : "standard")
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex border-b-2 border-lcars-frame">
        <div className="w-16 h-16 bg-lcars-elbow border-r-2 border-b-2 border-black"></div>
        <div className="flex-1 bg-black/80 h-16 flex items-center px-6 justify-between">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-lcars-accent1">{ship.name}</h1>
            <span className="ml-3 text-lcars-text/70">{ship.registry || "No Registry"}</span>
            <a
              href={`https://memory-alpha.fandom.com/wiki/Special:Search?search=${encodeURIComponent(ship.name + " " + ship.class)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="ml-3 text-lcars-accent2 hover:text-lcars-accent2/80 transition-colors"
              onClick={() => playSound("beep")}
            >
              <ExternalLink className="h-4 w-4" />
            </a>
          </div>

          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={toggleViewMode}
              className="bg-black/60 border-lcars-accent3/50 text-lcars-accent3 hover:bg-black/80 hover:border-lcars-accent3"
            >
              {viewMode === "standard" ? (
                <>
                  <BookOpen className="h-4 w-4 mr-2" />
                  Wiki View
                </>
              ) : (
                <>
                  <Info className="h-4 w-4 mr-2" />
                  Standard View
                </>
              )}
            </Button>

            <Button variant="ghost" size="icon" onClick={onToggleSelect} className="hover:bg-transparent">
              <CheckSquare
                className={`h-5 w-5 ${
                  isSelected ? "text-lcars-accent1 fill-lcars-accent1/30" : "text-lcars-text/50 hover:text-lcars-text"
                }`}
              />
            </Button>

            <Button variant="ghost" size="icon" onClick={onToggleFavorite} className="hover:bg-transparent">
              <Star
                className={`h-6 w-6 ${isFavorite ? "fill-favorite-color text-favorite-color" : "text-lcars-text/50 hover:text-lcars-text"}`}
              />
            </Button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6">
        <div className="max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            {isLoading ? (
              <motion.div
                key="loading"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center justify-center h-64"
              >
                <div className="lcars-loading">
                  <div className="lcars-loading-bar"></div>
                  <div className="lcars-loading-bar"></div>
                  <div className="lcars-loading-bar"></div>
                </div>
                <div className="text-lcars-accent2 mt-4">Accessing Database...</div>
              </motion.div>
            ) : (
              <motion.div
                key="content"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                {/* Ship info header */}
                <div className="bg-black/40 border-l-4 border-lcars-accent1 p-4 mb-6 rounded-r-md">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <div className="text-lcars-accent1 font-medium">Class</div>
                      <div className="text-lcars-text text-lg">{ship.class}</div>
                    </div>
                    <div>
                      <div className="text-lcars-accent1 font-medium">Affiliation</div>
                      <div className="text-lcars-text text-lg">{ship.affiliation}</div>
                    </div>
                    <div>
                      <div className="text-lcars-accent1 font-medium">Era</div>
                      <div className="text-lcars-text text-lg">{ship.era}</div>
                    </div>
                    <div>
                      <div className="text-lcars-accent1 font-medium">Registry</div>
                      <div className="text-lcars-text text-lg">{ship.registry || "Not Available"}</div>
                    </div>
                  </div>
                </div>

                {viewMode === "standard" ? (
                  <>
                    {/* Ship model */}
                    <ShipModel ship={ship} />

                    {/* Wiki content */}
                    <div className="mt-8">
                      <ShipWiki ship={ship} />
                    </div>
                  </>
                ) : (
                  /* Full wiki view */
                  <div className="mt-4">
                    <ShipWiki ship={ship} fullView={true} />
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  )
}
