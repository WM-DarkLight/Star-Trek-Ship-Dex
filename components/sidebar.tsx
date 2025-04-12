"use client"

import { useState, useEffect } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Star, Search, X, Filter, CheckSquare, Layers } from "lucide-react"
import type { Starship } from "@/types/starship"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { useAudio } from "@/components/audio-provider"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface SidebarProps {
  ships: Starship[]
  currentShipId: string | undefined
  favorites: string[]
  showOnlyFavorites: boolean
  setShowOnlyFavorites: (value: boolean) => void
  currentSort: "name" | "era" | "class" | "affiliation"
  setCurrentSort: (sort: "name" | "era" | "class" | "affiliation") => void
  searchQuery: string
  setSearchQuery: (query: string) => void
  onShipSelect: (ship: Starship) => void
  selectedShips: Starship[]
  toggleShipSelection: (ship: Starship) => void
  startComparison: () => void
  affiliationFilter: string | null
  setAffiliationFilter: (affiliation: string | null) => void
  setSelectedShips: (ships: Starship[]) => void // Added setSelectedShips to props
}

export function Sidebar({
  ships,
  currentShipId,
  favorites,
  showOnlyFavorites,
  setShowOnlyFavorites,
  currentSort,
  setCurrentSort,
  searchQuery,
  setSearchQuery,
  onShipSelect,
  selectedShips,
  toggleShipSelection,
  startComparison,
  affiliationFilter,
  setAffiliationFilter,
  setSelectedShips, // Added setSelectedShips to destructured props
}: SidebarProps) {
  const [filteredShips, setFilteredShips] = useState<Starship[]>([])
  const [uniqueAffiliations, setUniqueAffiliations] = useState<string[]>([])
  const { playSound } = useAudio()

  // Extract unique affiliations for filtering
  useEffect(() => {
    const affiliations = Array.from(new Set(ships.map((ship) => ship.affiliation)))
    setUniqueAffiliations(affiliations.sort())
  }, [ships])

  // Filter and sort ships
  useEffect(() => {
    let result = [...ships]

    // Filter by favorites if needed
    if (showOnlyFavorites) {
      result = result.filter((ship) => favorites.includes(ship.id))
    }

    // Filter by affiliation if selected
    if (affiliationFilter) {
      result = result.filter((ship) => ship.affiliation === affiliationFilter)
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (ship) =>
          ship.name.toLowerCase().includes(query) ||
          (ship.registry && ship.registry.toLowerCase().includes(query)) ||
          ship.class.toLowerCase().includes(query) ||
          ship.affiliation.toLowerCase().includes(query) ||
          ship.era.toLowerCase().includes(query),
      )
    }

    // Sort ships
    result.sort((a, b) => {
      let valA, valB

      switch (currentSort) {
        case "era":
          valA = a.era.toUpperCase()
          valB = b.era.toUpperCase()
          break
        case "class":
          valA = a.class.toUpperCase()
          valB = b.class.toUpperCase()
          break
        case "affiliation":
          valA = a.affiliation.toUpperCase()
          valB = b.affiliation.toUpperCase()
          break
        case "name":
        default:
          valA = a.name.toUpperCase()
          valB = b.name.toUpperCase()
          break
      }

      if (valA < valB) return -1
      if (valA > valB) return 1

      // Secondary sort by name if primary keys are equal
      if (currentSort !== "name") {
        valA = a.name.toUpperCase()
        valB = b.name.toUpperCase()
        if (valA < valB) return -1
        if (valA > valB) return 1
      }

      return 0
    })

    setFilteredShips(result)
  }, [ships, favorites, showOnlyFavorites, currentSort, searchQuery, affiliationFilter])

  return (
    <div className="w-[320px] h-full bg-black border-r-2 border-lcars-frame flex flex-col">
      {/* Header */}
      <div className="bg-lcars-elbow text-black font-bold text-right p-4 text-xl h-16 flex items-center justify-end relative">
        <div className="absolute -right-5 top-0 w-5 h-5 bg-black rounded-bl-lg border-b-2 border-l-2 border-lcars-frame"></div>
        SHIP INDEX
      </div>

      {/* Search */}
      <div className="p-4 bg-black/80 border-b border-lcars-frame/30">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-lcars-accent2" />
          <Input
            type="text"
            placeholder="Search ships..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value)
              playSound("beep")
            }}
            className="pl-9 bg-black/60 border-lcars-accent2/50 text-lcars-text placeholder:text-lcars-text/50 focus-visible:ring-lcars-accent1"
          />
          {searchQuery && (
            <button
              onClick={() => {
                setSearchQuery("")
                playSound("beep")
              }}
              className="absolute right-2.5 top-2.5 text-lcars-accent2 hover:text-lcars-accent1"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Controls */}
        <div className="mt-3 flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-lcars-text/70">SORT BY:</span>
            <div className="flex gap-1">
              {(["name", "era", "class", "affiliation"] as const).map((sort) => (
                <Button
                  key={sort}
                  size="sm"
                  variant={currentSort === sort ? "default" : "outline"}
                  onClick={() => {
                    setCurrentSort(sort)
                    playSound("beep")
                  }}
                  className={`text-xs py-0 h-7 ${
                    currentSort === sort
                      ? "bg-lcars-accent3 text-white hover:bg-lcars-accent3/90"
                      : "bg-transparent border-lcars-accent2/50 text-lcars-accent2 hover:bg-lcars-accent2/20"
                  }`}
                >
                  {sort.charAt(0).toUpperCase() + sort.slice(1)}
                </Button>
              ))}
            </div>
          </div>

          <div className="flex gap-2">
            <Button
              size="sm"
              variant={showOnlyFavorites ? "default" : "outline"}
              onClick={() => {
                setShowOnlyFavorites(!showOnlyFavorites)
                playSound("beep")
              }}
              className={`flex-1 ${
                showOnlyFavorites
                  ? "bg-lcars-accent1 text-black hover:bg-lcars-accent1/90"
                  : "bg-transparent border-lcars-accent1/50 text-lcars-accent1 hover:bg-lcars-accent1/20"
              }`}
            >
              <Star className={`h-4 w-4 mr-2 ${showOnlyFavorites ? "fill-black" : ""}`} />
              {showOnlyFavorites ? "All Ships" : "Favorites"}
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  size="sm"
                  variant={affiliationFilter ? "default" : "outline"}
                  className={`${
                    affiliationFilter
                      ? "bg-lcars-accent2 text-black hover:bg-lcars-accent2/90"
                      : "bg-transparent border-lcars-accent2/50 text-lcars-accent2 hover:bg-lcars-accent2/20"
                  }`}
                  onClick={() => playSound("beep")}
                >
                  <Filter className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-black border-lcars-frame">
                <DropdownMenuItem
                  className="text-lcars-text hover:bg-lcars-accent2/20 hover:text-lcars-accent2"
                  onClick={() => {
                    setAffiliationFilter(null)
                    playSound("select")
                  }}
                >
                  All Affiliations
                </DropdownMenuItem>
                {uniqueAffiliations.map((affiliation) => (
                  <DropdownMenuItem
                    key={affiliation}
                    className={`${
                      affiliationFilter === affiliation ? "bg-lcars-accent2/20 text-lcars-accent2" : "text-lcars-text"
                    } hover:bg-lcars-accent2/20 hover:text-lcars-accent2`}
                    onClick={() => {
                      setAffiliationFilter(affiliation)
                      playSound("select")
                    }}
                  >
                    {affiliation}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Comparison controls */}
          {selectedShips.length > 0 && (
            <div className="mt-2 flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs text-lcars-text/70">
                <span>SHIPS SELECTED: {selectedShips.length}</span>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setSelectedShips([])
                    playSound("beep")
                  }}
                  className="h-6 py-0 text-xs bg-transparent border-lcars-accent3/50 text-lcars-accent3 hover:bg-lcars-accent3/20"
                >
                  Clear
                </Button>
              </div>
              <Button
                size="sm"
                variant="default"
                onClick={startComparison}
                className="bg-lcars-accent2 text-black hover:bg-lcars-accent2/90"
              >
                <Layers className="h-4 w-4 mr-2" />
                Compare Ships ({selectedShips.length})
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Ship list */}
      <div className="flex-1 overflow-y-auto p-2 scrollbar-thin scrollbar-thumb-lcars-accent2/30 scrollbar-track-transparent hover:scrollbar-thumb-lcars-accent2/50">
        {filteredShips.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-lcars-text/50 p-4 text-center">
            <span className="text-lg mb-2">No ships found</span>
            <span className="text-sm">Try adjusting your search or filters</span>
          </div>
        ) : (
          <ul className="space-y-1.5">
            {filteredShips.map((ship) => (
              <motion.li
                key={ship.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.2 }}
                onClick={() => onShipSelect(ship)}
                className={`
                  group cursor-pointer rounded-r-md pl-2 pr-3 py-2.5
                  border-l-4 transition-all duration-200
                  ${
                    currentShipId === ship.id
                      ? "bg-lcars-selected-bg border-l-lcars-selected-text"
                      : "bg-black/60 border-l-lcars-accent3 hover:bg-black/80 hover:border-l-lcars-accent1"
                  }
                `}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    {favorites.includes(ship.id) && (
                      <Star className="h-3.5 w-3.5 mr-1.5 fill-favorite-color text-favorite-color flex-shrink-0" />
                    )}
                    <div>
                      <div
                        className={`font-medium ${currentShipId === ship.id ? "text-lcars-selected-text" : "text-lcars-accent2 group-hover:text-lcars-accent1"}`}
                      >
                        {ship.name}
                      </div>
                      <div className="flex items-center gap-2 mt-0.5">
                        <span
                          className={`text-xs ${currentShipId === ship.id ? "text-lcars-selected-text/80" : "text-lcars-text/60"}`}
                        >
                          {ship.registry || "No Registry"}
                        </span>
                        <Badge
                          variant="outline"
                          className={`text-[10px] px-1 py-0 h-4 ${
                            currentShipId === ship.id
                              ? "border-lcars-selected-text/50 text-lcars-selected-text/90"
                              : "border-lcars-accent3/50 text-lcars-accent3/90"
                          }`}
                        >
                          {ship.class}
                        </Badge>
                      </div>
                    </div>
                  </div>

                  {/* Selection checkbox */}
                  <div
                    onClick={(e) => {
                      e.stopPropagation()
                      toggleShipSelection(ship)
                    }}
                    className="flex items-center justify-center"
                  >
                    <CheckSquare
                      className={`h-4 w-4 transition-all ${
                        selectedShips.some((s) => s.id === ship.id)
                          ? "text-lcars-accent1 fill-lcars-accent1/30"
                          : "text-lcars-text/30 hover:text-lcars-text/60"
                      }`}
                    />
                  </div>
                </div>
              </motion.li>
            ))}
          </ul>
        )}
      </div>

      {/* Footer */}
      <div className="p-3 border-t border-lcars-frame/30 bg-black/80">
        <div className="text-xs text-lcars-text/60 flex justify-between">
          <span>
            Ships: {filteredShips.length}/{ships.length}
          </span>
          <span>Favorites: {favorites.length}</span>
        </div>
      </div>
    </div>
  )
}
