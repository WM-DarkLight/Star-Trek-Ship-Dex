"use client"

import type React from "react"

import { useState, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { ArrowUpDown, Search, X, Filter, Star, Info } from "lucide-react"
import { useAudio } from "@/components/audio-provider"
import { useToast } from "@/hooks/use-toast"
import { useLocalStorage } from "@/hooks/use-local-storage"
import type { Starship } from "@/types/starship"

interface ShipIndexProps {
  onSelectShip: (ship: Starship) => void
  ships: Starship[]
}

type SortField =
  | "name"
  | "registry"
  | "class"
  | "affiliation"
  | "era"
  | "launched"
  | "status"
  | "length"
  | "crew"
  | "speed"
type SortDirection = "asc" | "desc"

export function ShipIndex({ onSelectShip, ships }: ShipIndexProps) {
  const [searchQuery, setSearchQuery] = useState("")
  const [sortField, setSortField] = useState<SortField>("name")
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc")
  const [affiliationFilter, setAffiliationFilter] = useState<string | null>(null)
  const [eraFilter, setEraFilter] = useState<string | null>(null)
  const [favorites, setFavorites] = useLocalStorage<string[]>("startrekdex_favorites", [])
  const [showOnlyFavorites, setShowOnlyFavorites] = useState(false)

  const { playSound } = useAudio()
  const { toast } = useToast()

  // Get unique affiliations and eras for filters
  const uniqueAffiliations = useMemo(() => {
    return Array.from(new Set(ships.map((ship) => ship.affiliation))).sort()
  }, [ships])

  const uniqueEras = useMemo(() => {
    return Array.from(new Set(ships.map((ship) => ship.era))).sort()
  }, [ships])

  // Filter and sort ships
  const filteredShips = useMemo(() => {
    let result = [...ships]

    // Filter by favorites if needed
    if (showOnlyFavorites) {
      result = result.filter((ship) => favorites.includes(ship.id))
    }

    // Filter by affiliation if selected
    if (affiliationFilter) {
      result = result.filter((ship) => ship.affiliation === affiliationFilter)
    }

    // Filter by era if selected
    if (eraFilter) {
      result = result.filter((ship) => ship.era === eraFilter)
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
      let valA: any, valB: any

      switch (sortField) {
        case "registry":
          valA = a.registry || ""
          valB = b.registry || ""
          break
        case "class":
          valA = a.class
          valB = b.class
          break
        case "affiliation":
          valA = a.affiliation
          valB = b.affiliation
          break
        case "era":
          valA = a.era
          valB = b.era
          break
        case "launched":
          valA = a.launched || ""
          valB = b.launched || ""
          break
        case "status":
          valA = a.status || ""
          valB = b.status || ""
          break
        case "length":
          valA = Number(a.stats.length_m) || 0
          valB = Number(b.stats.length_m) || 0
          break
        case "crew":
          valA = typeof a.stats.crew === "number" ? a.stats.crew : 0
          valB = typeof b.stats.crew === "number" ? b.stats.crew : 0
          break
        case "speed":
          valA = a.stats.speed || 0
          valB = b.stats.speed || 0
          break
        case "name":
        default:
          valA = a.name
          valB = b.name
          break
      }

      const comparison = typeof valA === "string" && typeof valB === "string" ? valA.localeCompare(valB) : valA - valB

      return sortDirection === "asc" ? comparison : -comparison
    })

    return result
  }, [ships, favorites, showOnlyFavorites, affiliationFilter, eraFilter, searchQuery, sortField, sortDirection])

  const toggleSort = (field: SortField) => {
    playSound("beep")
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }
  }

  const toggleFavorite = (shipId: string, event: React.MouseEvent) => {
    event.stopPropagation()
    playSound("select")

    setFavorites((prev) => {
      if (prev.includes(shipId)) {
        toast({
          title: "Removed from favorites",
          description: `Ship has been removed from your favorites`,
          variant: "destructive",
        })
        return prev.filter((id) => id !== shipId)
      } else {
        toast({
          title: "Added to favorites",
          description: `Ship has been added to your favorites`,
        })
        return [...prev, shipId]
      }
    })
  }

  const handleShipSelect = (ship: Starship) => {
    playSound("beep")
    onSelectShip(ship)
  }

  const clearFilters = () => {
    playSound("beep")
    setSearchQuery("")
    setAffiliationFilter(null)
    setEraFilter(null)
    setShowOnlyFavorites(false)
  }

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex border-b-2 border-lcars-frame">
        <div className="w-16 h-16 bg-lcars-elbow border-r-2 border-b-2 border-black"></div>
        <div className="flex-1 bg-black/80 h-16 flex items-center px-6 justify-between">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-lcars-accent1">Ship Index</h1>
            <span className="ml-3 text-lcars-text/70">
              {filteredShips.length} {filteredShips.length === 1 ? "vessel" : "vessels"}
            </span>
          </div>
        </div>
      </div>

      {/* Search and filters */}
      <div className="p-4 bg-black/80 border-b border-lcars-frame/30">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
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

          <div className="flex gap-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant={affiliationFilter ? "default" : "outline"}
                  className={`${
                    affiliationFilter
                      ? "bg-lcars-accent2 text-black hover:bg-lcars-accent2/90"
                      : "bg-transparent border-lcars-accent2/50 text-lcars-accent2 hover:bg-lcars-accent2/20"
                  }`}
                  onClick={() => playSound("beep")}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  {affiliationFilter || "Affiliation"}
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

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant={eraFilter ? "default" : "outline"}
                  className={`${
                    eraFilter
                      ? "bg-lcars-accent3 text-black hover:bg-lcars-accent3/90"
                      : "bg-transparent border-lcars-accent3/50 text-lcars-accent3 hover:bg-lcars-accent3/20"
                  }`}
                  onClick={() => playSound("beep")}
                >
                  <Filter className="h-4 w-4 mr-2" />
                  {eraFilter || "Era"}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-black border-lcars-frame">
                <DropdownMenuItem
                  className="text-lcars-text hover:bg-lcars-accent3/20 hover:text-lcars-accent3"
                  onClick={() => {
                    setEraFilter(null)
                    playSound("select")
                  }}
                >
                  All Eras
                </DropdownMenuItem>
                {uniqueEras.map((era) => (
                  <DropdownMenuItem
                    key={era}
                    className={`${
                      eraFilter === era ? "bg-lcars-accent3/20 text-lcars-accent3" : "text-lcars-text"
                    } hover:bg-lcars-accent3/20 hover:text-lcars-accent3`}
                    onClick={() => {
                      setEraFilter(era)
                      playSound("select")
                    }}
                  >
                    {era}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            <Button
              variant={showOnlyFavorites ? "default" : "outline"}
              onClick={() => {
                setShowOnlyFavorites(!showOnlyFavorites)
                playSound("beep")
              }}
              className={`${
                showOnlyFavorites
                  ? "bg-lcars-accent1 text-black hover:bg-lcars-accent1/90"
                  : "bg-transparent border-lcars-accent1/50 text-lcars-accent1 hover:bg-lcars-accent1/20"
              }`}
            >
              <Star className={`h-4 w-4 mr-2 ${showOnlyFavorites ? "fill-black" : ""}`} />
              {showOnlyFavorites ? "All Ships" : "Favorites"}
            </Button>

            {(searchQuery || affiliationFilter || eraFilter || showOnlyFavorites) && (
              <Button
                variant="outline"
                onClick={clearFilters}
                className="bg-transparent border-lcars-frame/50 text-lcars-frame hover:bg-lcars-frame/20"
              >
                <X className="h-4 w-4 mr-2" />
                Clear
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Ship table */}
      <div className="flex-1 overflow-auto">
        <Table>
          <TableHeader className="sticky top-0 bg-black/90 z-10">
            <TableRow className="border-lcars-frame/30 hover:bg-transparent">
              <TableHead className="w-[50px]"></TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => toggleSort("name")}
                  className="hover:bg-lcars-accent1/20 px-2 h-8 text-lcars-accent1"
                >
                  Name
                  <ArrowUpDown className={`ml-2 h-4 w-4 ${sortField === "name" ? "opacity-100" : "opacity-40"}`} />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => toggleSort("registry")}
                  className="hover:bg-lcars-accent1/20 px-2 h-8 text-lcars-accent1"
                >
                  Registry
                  <ArrowUpDown className={`ml-2 h-4 w-4 ${sortField === "registry" ? "opacity-100" : "opacity-40"}`} />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => toggleSort("class")}
                  className="hover:bg-lcars-accent1/20 px-2 h-8 text-lcars-accent1"
                >
                  Class
                  <ArrowUpDown className={`ml-2 h-4 w-4 ${sortField === "class" ? "opacity-100" : "opacity-40"}`} />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => toggleSort("affiliation")}
                  className="hover:bg-lcars-accent1/20 px-2 h-8 text-lcars-accent1"
                >
                  Affiliation
                  <ArrowUpDown
                    className={`ml-2 h-4 w-4 ${sortField === "affiliation" ? "opacity-100" : "opacity-40"}`}
                  />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => toggleSort("era")}
                  className="hover:bg-lcars-accent1/20 px-2 h-8 text-lcars-accent1"
                >
                  Era
                  <ArrowUpDown className={`ml-2 h-4 w-4 ${sortField === "era" ? "opacity-100" : "opacity-40"}`} />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => toggleSort("length")}
                  className="hover:bg-lcars-accent1/20 px-2 h-8 text-lcars-accent1"
                >
                  Length
                  <ArrowUpDown className={`ml-2 h-4 w-4 ${sortField === "length" ? "opacity-100" : "opacity-40"}`} />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => toggleSort("crew")}
                  className="hover:bg-lcars-accent1/20 px-2 h-8 text-lcars-accent1"
                >
                  Crew
                  <ArrowUpDown className={`ml-2 h-4 w-4 ${sortField === "crew" ? "opacity-100" : "opacity-40"}`} />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => toggleSort("speed")}
                  className="hover:bg-lcars-accent1/20 px-2 h-8 text-lcars-accent1"
                >
                  Max Speed
                  <ArrowUpDown className={`ml-2 h-4 w-4 ${sortField === "speed" ? "opacity-100" : "opacity-40"}`} />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  onClick={() => toggleSort("status")}
                  className="hover:bg-lcars-accent1/20 px-2 h-8 text-lcars-accent1"
                >
                  Status
                  <ArrowUpDown className={`ml-2 h-4 w-4 ${sortField === "status" ? "opacity-100" : "opacity-40"}`} />
                </Button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredShips.length === 0 ? (
              <TableRow>
                <TableCell colSpan={9} className="h-24 text-center">
                  <div className="flex flex-col items-center justify-center text-lcars-text/50">
                    <Info className="h-8 w-8 mb-2" />
                    <p>No ships found matching your criteria</p>
                    <Button variant="link" onClick={clearFilters} className="text-lcars-accent2 mt-2">
                      Clear filters
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredShips.map((ship) => (
                <TableRow
                  key={ship.id}
                  className="border-lcars-frame/20 cursor-pointer hover:bg-lcars-accent2/10"
                  onClick={() => handleShipSelect(ship)}
                >
                  <TableCell className="p-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 p-0"
                      onClick={(e) => toggleFavorite(ship.id, e)}
                    >
                      <Star
                        className={`h-5 w-5 ${
                          favorites.includes(ship.id)
                            ? "fill-favorite-color text-favorite-color"
                            : "text-lcars-text/30 hover:text-lcars-text/60"
                        }`}
                      />
                    </Button>
                  </TableCell>
                  <TableCell className="font-medium text-lcars-accent2">{ship.name}</TableCell>
                  <TableCell className="text-lcars-text/80">{ship.registry || "—"}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className="border-lcars-accent3/50 text-lcars-accent3">
                      {ship.class}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-lcars-text/80">{ship.affiliation}</TableCell>
                  <TableCell className="text-lcars-text/80">{ship.era}</TableCell>
                  <TableCell className="text-lcars-text/80">{ship.stats.length_m} m</TableCell>
                  <TableCell className="text-lcars-text/80">{ship.stats.crew}</TableCell>
                  <TableCell className="text-lcars-text/80">
                    {typeof ship.stats.speed === "number" && ship.stats.speed > 9
                      ? `Warp ${ship.stats.speed}`
                      : ship.stats.max_speed || `Warp ${ship.stats.speed}`}
                  </TableCell>
                  <TableCell>
                    {ship.status ? (
                      <span
                        className={`text-sm ${
                          ship.status.toLowerCase().includes("destroyed")
                            ? "text-red-400"
                            : ship.status.toLowerCase().includes("active")
                              ? "text-green-400"
                              : "text-lcars-text/80"
                        }`}
                      >
                        {ship.status}
                      </span>
                    ) : (
                      <span className="text-lcars-text/50">Unknown</span>
                    )}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
