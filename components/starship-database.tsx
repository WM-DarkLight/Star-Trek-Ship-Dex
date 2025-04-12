"use client"

import { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Sidebar } from "@/components/sidebar"
import { ShipDisplay } from "@/components/ship-display"
import { starships } from "@/data/starships"
import { useLocalStorage } from "@/hooks/use-local-storage"
import { useMediaQuery } from "@/hooks/use-media-query"
import { Button } from "@/components/ui/button"
import { Menu, Maximize2, Minimize2, Database, List } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useAudio } from "@/components/audio-provider"
import { ShipComparison } from "@/components/ship-comparison"
import { VoiceCommands } from "@/components/voice-commands"
import { ShipIndex } from "@/components/ship-index"
import { ImportExportMenu } from "@/components/import-export-menu"
import type { Starship } from "@/types/starship"

export function StarshipDatabase() {
  const [currentShip, setCurrentShip] = useState<Starship | null>(null)
  const [selectedShips, setSelectedShips] = useState<Starship[]>([])
  const [favorites, setFavorites] = useLocalStorage<string[]>("startrekdex_favorites", [])
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false)
  const [currentSort, setCurrentSort] = useState<"name" | "era" | "class" | "affiliation">("name")
  const [searchQuery, setSearchQuery] = useState("")
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [isComparing, setIsComparing] = useState(false)
  const [isFullscreen, setIsFullscreen] = useState(false)
  const [affiliationFilter, setAffiliationFilter] = useState<string | null>(null)
  const [viewMode, setViewMode] = useState<"sidebar" | "index">("sidebar")
  const [shipDatabase, setShipDatabase] = useState<Starship[]>(starships)
  const isDesktop = useMediaQuery("(min-width: 768px)")
  const { toast } = useToast()
  const { playSound } = useAudio()
  const containerRef = useRef<HTMLDivElement>(null)

  // Initialize audio
  useEffect(() => {
    // Auto-close sidebar on mobile
    if (!isDesktop) {
      setSidebarOpen(false)
    } else {
      setSidebarOpen(true)
    }
  }, [isDesktop])

  // Set initial ship
  useEffect(() => {
    if (shipDatabase.length > 0 && !currentShip) {
      setCurrentShip(shipDatabase[0])
    }
  }, [currentShip, shipDatabase])

  const toggleFavorite = (shipId: string) => {
    playSound("select")

    setFavorites((prev) => {
      if (prev.includes(shipId)) {
        toast({
          title: "Removed from favorites",
          description: `${currentShip?.name} has been removed from your favorites`,
          variant: "destructive",
        })
        return prev.filter((id) => id !== shipId)
      } else {
        toast({
          title: "Added to favorites",
          description: `${currentShip?.name} has been added to your favorites`,
        })
        return [...prev, shipId]
      }
    })
  }

  const handleShipSelect = (ship: Starship) => {
    playSound("beep")
    setCurrentShip(ship)
    if (!isDesktop) {
      setSidebarOpen(false)
    }
  }

  const toggleShipSelection = (ship: Starship) => {
    playSound("select")
    setSelectedShips((prev) => {
      if (prev.some((s) => s.id === ship.id)) {
        return prev.filter((s) => s.id !== ship.id)
      } else {
        return [...prev, ship]
      }
    })
  }

  const startComparison = () => {
    if (selectedShips.length < 2) {
      toast({
        title: "Cannot start comparison",
        description: "Please select at least 2 ships to compare",
        variant: "destructive",
      })
      playSound("error")
      return
    }

    playSound("success")
    setIsComparing(true)
  }

  const endComparison = () => {
    playSound("beep")
    setIsComparing(false)
    setSelectedShips([])
  }

  const toggleFullscreen = () => {
    playSound("select")

    if (!document.fullscreenElement) {
      containerRef.current?.requestFullscreen().catch((err) => {
        console.error(`Error attempting to enable fullscreen: ${err.message}`)
      })
      setIsFullscreen(true)
    } else {
      document.exitFullscreen()
      setIsFullscreen(false)
    }
  }

  // Handle fullscreen change events
  useEffect(() => {
    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    document.addEventListener("fullscreenchange", handleFullscreenChange)
    return () => document.removeEventListener("fullscreenchange", handleFullscreenChange)
  }, [])

  const toggleViewMode = () => {
    playSound("select")
    setViewMode(viewMode === "sidebar" ? "index" : "sidebar")
  }

  // Handle importing ships
  const handleImportShips = (importedShips: Starship[]) => {
    // Check for duplicates and add only new ships
    const existingIds = new Set(shipDatabase.map((ship) => ship.id))
    const newShips = importedShips.filter((ship) => !existingIds.has(ship.id))

    if (newShips.length === 0) {
      toast({
        title: "No new ships",
        description: "All imported ships already exist in the database",
        variant: "warning",
      })
      return
    }

    // Add the new ships to the database
    setShipDatabase((prevShips) => [...prevShips, ...newShips])

    toast({
      title: "Ships Imported",
      description: `Added ${newShips.length} new ships to the database`,
    })
  }

  return (
    <div ref={containerRef} className="flex flex-1 overflow-hidden relative">
      {/* Mobile sidebar toggle */}
      {!isDesktop && (
        <div className="fixed top-20 left-4 z-50">
          <Button
            variant="outline"
            size="icon"
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="bg-lcars-elbow text-black hover:bg-lcars-accent1 transition-all"
          >
            <Menu className="h-5 w-5" />
          </Button>
        </div>
      )}

      {/* Import/Export Menu */}
      <div className="fixed top-20 right-28 z-50">
        <ImportExportMenu onImportShips={handleImportShips} />
      </div>

      {/* View mode toggle */}
      <div className="fixed top-20 right-16 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleViewMode}
          className="bg-lcars-accent3 text-black hover:bg-lcars-accent1 transition-all"
        >
          {viewMode === "sidebar" ? <Database className="h-5 w-5" /> : <List className="h-5 w-5" />}
        </Button>
      </div>

      {/* Fullscreen toggle */}
      <div className="fixed top-20 right-4 z-50">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleFullscreen}
          className="bg-lcars-accent2 text-black hover:bg-lcars-accent1 transition-all"
        >
          {isFullscreen ? <Minimize2 className="h-5 w-5" /> : <Maximize2 className="h-5 w-5" />}
        </Button>
      </div>

      {/* Voice command component */}
      <VoiceCommands
        onShipSelect={handleShipSelect}
        setSearchQuery={setSearchQuery}
        setCurrentSort={setCurrentSort}
        setAffiliationFilter={setAffiliationFilter}
        ships={shipDatabase}
      />

      {/* Sidebar with animation */}
      <AnimatePresence>
        {sidebarOpen && viewMode === "sidebar" && (
          <motion.div
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="z-40"
          >
            <Sidebar
              ships={shipDatabase}
              currentShipId={currentShip?.id}
              favorites={favorites}
              showOnlyFavorites={showOnlyFavorites}
              setShowOnlyFavorites={setShowOnlyFavorites}
              currentSort={currentSort}
              setCurrentSort={setCurrentSort}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
              onShipSelect={handleShipSelect}
              selectedShips={selectedShips}
              toggleShipSelection={toggleShipSelection}
              startComparison={startComparison}
              affiliationFilter={affiliationFilter}
              setAffiliationFilter={setAffiliationFilter}
              setSelectedShips={setSelectedShips}
            />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main content */}
      <div className="flex-1 overflow-hidden">
        <AnimatePresence mode="wait">
          {isComparing ? (
            <motion.div
              key="comparison"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full"
            >
              <ShipComparison ships={selectedShips} onClose={endComparison} />
            </motion.div>
          ) : viewMode === "index" ? (
            <motion.div
              key="index"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full"
            >
              <ShipIndex onSelectShip={handleShipSelect} ships={shipDatabase} />
            </motion.div>
          ) : currentShip ? (
            <motion.div
              key={currentShip.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="h-full"
            >
              <ShipDisplay
                ship={currentShip}
                isFavorite={favorites.includes(currentShip.id)}
                onToggleFavorite={() => toggleFavorite(currentShip.id)}
                isSelected={selectedShips.some((s) => s.id === currentShip.id)}
                onToggleSelect={() => toggleShipSelection(currentShip)}
              />
            </motion.div>
          ) : null}
        </AnimatePresence>
      </div>
    </div>
  )
}
