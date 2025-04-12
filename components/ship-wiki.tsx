"use client"

import { useState, useEffect } from "react"
import type { Starship } from "@/types/starship"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAudio } from "@/components/audio-provider"
import { motion } from "framer-motion"
import { Info, FileText, Shield, Users, Crosshair, Clock, Cpu, BookOpen, Film, ExternalLink } from "lucide-react"
import { ShipSpecifications } from "@/components/ship-specifications"
import { ShipHistory } from "@/components/ship-history"
import { ShipArmaments } from "@/components/ship-armaments"
import { ShipCrew } from "@/components/ship-crew"
import { ShipTechnicalSpecs } from "@/components/ship-technical-specs"
import { ShipServiceHistory } from "@/components/ship-service-history"
import { ShipAppearances } from "@/components/ship-appearances"
import { ShipGallery } from "@/components/ship-gallery"

interface ShipWikiProps {
  ship: Starship
  fullView?: boolean
}

export function ShipWiki({ ship, fullView }: ShipWikiProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const { playSound } = useAudio()

  // Use more tabs and detailed content in full view mode
  useEffect(() => {
    if (fullView) {
      // Start with overview tab in full view mode
      setActiveTab("overview")
    }
  }, [fullView])

  const handleTabChange = (value: string) => {
    playSound("select")
    setActiveTab(value)
  }

  return (
    <div className={`w-full ${fullView ? "space-y-6" : ""}`}>
      {/* Wiki header with ship name and class */}
      <div className={`${fullView ? "mb-8" : "mb-6"}`}>
        <h1 className={`${fullView ? "text-4xl" : "text-3xl"} font-bold text-lcars-accent1 mb-2`}>{ship.name}</h1>
        <div className="flex flex-wrap items-center gap-3 text-lcars-text/70">
          <span>{ship.registry || "No Registry"}</span>
          <span>•</span>
          <span>{ship.class} class</span>
          <span>•</span>
          <span>{ship.affiliation}</span>
          {ship.status && (
            <>
              <span>•</span>
              <span>{ship.status}</span>
            </>
          )}
        </div>

        {/* External links */}
        <div className="mt-4">
          <a
            href={`https://memory-alpha.fandom.com/wiki/Special:Search?search=${encodeURIComponent(ship.name + " " + ship.class)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-lcars-accent2 hover:text-lcars-accent2/80 transition-colors mr-4"
            onClick={() => playSound("beep")}
          >
            <ExternalLink className="h-4 w-4 mr-1" />
            Memory Alpha
          </a>
          <a
            href={`https://memory-beta.fandom.com/wiki/Special:Search?search=${encodeURIComponent(ship.name)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center text-lcars-accent2 hover:text-lcars-accent2/80 transition-colors"
            onClick={() => playSound("beep")}
          >
            <ExternalLink className="h-4 w-4 mr-1" />
            Memory Beta
          </a>
        </div>
      </div>

      {/* Wiki navigation tabs */}
      <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
        <TabsList
          className={`bg-black/40 border border-lcars-frame/30 p-1 w-full flex flex-wrap h-auto ${fullView ? "sticky top-0 z-10 bg-black/90" : ""}`}
        >
          <TabsTrigger value="overview" className="data-[state=active]:bg-lcars-accent1 data-[state=active]:text-black">
            <Info className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="specifications"
            className="data-[state=active]:bg-lcars-accent2 data-[state=active]:text-black"
          >
            <Shield className="h-4 w-4 mr-2" />
            Specifications
          </TabsTrigger>
          <TabsTrigger
            value="technical"
            className="data-[state=active]:bg-lcars-accent3 data-[state=active]:text-black"
          >
            <Cpu className="h-4 w-4 mr-2" />
            Technical
          </TabsTrigger>
          <TabsTrigger value="armaments" className="data-[state=active]:bg-lcars-frame data-[state=active]:text-black">
            <Crosshair className="h-4 w-4 mr-2" />
            Armaments
          </TabsTrigger>
          <TabsTrigger value="crew" className="data-[state=active]:bg-lcars-accent1 data-[state=active]:text-black">
            <Users className="h-4 w-4 mr-2" />
            Crew
          </TabsTrigger>
          <TabsTrigger value="history" className="data-[state=active]:bg-lcars-accent2 data-[state=active]:text-black">
            <Clock className="h-4 w-4 mr-2" />
            History
          </TabsTrigger>
          <TabsTrigger value="service" className="data-[state=active]:bg-lcars-accent3 data-[state=active]:text-black">
            <FileText className="h-4 w-4 mr-2" />
            Service Record
          </TabsTrigger>
          <TabsTrigger
            value="appearances"
            className="data-[state=active]:bg-lcars-frame data-[state=active]:text-black"
          >
            <Film className="h-4 w-4 mr-2" />
            Appearances
          </TabsTrigger>
          <TabsTrigger value="gallery" className="data-[state=active]:bg-lcars-accent1 data-[state=active]:text-black">
            <BookOpen className="h-4 w-4 mr-2" />
            Gallery
          </TabsTrigger>
        </TabsList>

        {/* Tab content */}
        <TabsContent value="overview" className="mt-6">
          <ShipOverview ship={ship} />
        </TabsContent>

        <TabsContent value="specifications" className="mt-6">
          <ShipSpecifications ship={ship} />
        </TabsContent>

        <TabsContent value="technical" className="mt-6">
          <ShipTechnicalSpecs ship={ship} />
        </TabsContent>

        <TabsContent value="armaments" className="mt-6">
          <ShipArmaments ship={ship} />
        </TabsContent>

        <TabsContent value="crew" className="mt-6">
          <ShipCrew ship={ship} />
        </TabsContent>

        <TabsContent value="history" className="mt-6">
          <ShipHistory ship={ship} />
        </TabsContent>

        <TabsContent value="service" className="mt-6">
          <ShipServiceHistory ship={ship} />
        </TabsContent>

        <TabsContent value="appearances" className="mt-6">
          <ShipAppearances ship={ship} />
        </TabsContent>

        <TabsContent value="gallery" className="mt-6">
          <ShipGallery ship={ship} />
        </TabsContent>
      </Tabs>
    </div>
  )
}

interface ShipOverviewProps {
  ship: Starship
}

function ShipOverview({ ship }: ShipOverviewProps) {
  return (
    <div className="space-y-6">
      {/* Main info section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <div className="bg-black/40 border-l-4 border-lcars-accent1 p-4 rounded-r-md">
            <h2 className="text-lcars-accent1 text-xl font-medium mb-3">Overview</h2>
            <div className="text-lcars-text space-y-4">
              <p>{ship.info}</p>
              {ship.history && <p>{ship.history}</p>}
              {ship.design_notes && <p>{ship.design_notes}</p>}
            </div>
          </div>
        </div>

        <div>
          <div className="bg-black/40 border-l-4 border-lcars-accent2 p-4 rounded-r-md">
            <h2 className="text-lcars-accent2 text-xl font-medium mb-3">Quick Facts</h2>
            <dl className="space-y-2">
              <div>
                <dt className="text-lcars-text/70">Class:</dt>
                <dd className="text-lcars-text font-medium">{ship.class}</dd>
              </div>
              <div>
                <dt className="text-lcars-text/70">Registry:</dt>
                <dd className="text-lcars-text font-medium">{ship.registry || "None"}</dd>
              </div>
              <div>
                <dt className="text-lcars-text/70">Affiliation:</dt>
                <dd className="text-lcars-text font-medium">{ship.affiliation}</dd>
              </div>
              <div>
                <dt className="text-lcars-text/70">Era:</dt>
                <dd className="text-lcars-text font-medium">{ship.era}</dd>
              </div>
              <div>
                <dt className="text-lcars-text/70">Launched:</dt>
                <dd className="text-lcars-text font-medium">{ship.launched || "Unknown"}</dd>
              </div>
              <div>
                <dt className="text-lcars-text/70">Status:</dt>
                <dd className="text-lcars-text font-medium">{ship.status || "Unknown"}</dd>
              </div>
              <div>
                <dt className="text-lcars-text/70">Length:</dt>
                <dd className="text-lcars-text font-medium">{ship.stats.length_m} meters</dd>
              </div>
              <div>
                <dt className="text-lcars-text/70">Crew:</dt>
                <dd className="text-lcars-text font-medium">{ship.stats.crew}</dd>
              </div>
              <div>
                <dt className="text-lcars-text/70">Max Speed:</dt>
                <dd className="text-lcars-text font-medium">{ship.stats.max_speed || `Warp ${ship.stats.speed}`}</dd>
              </div>
            </dl>
          </div>
        </div>
      </div>

      {/* Notable features */}
      {ship.notable_features && ship.notable_features.length > 0 && (
        <div className="bg-black/40 border-l-4 border-lcars-accent3 p-4 rounded-r-md">
          <h2 className="text-lcars-accent3 text-xl font-medium mb-3">Notable Features</h2>
          <ul className="list-disc pl-5 space-y-1 text-lcars-text">
            {ship.notable_features.map((feature, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                {feature}
              </motion.li>
            ))}
          </ul>
        </div>
      )}

      {/* Notable missions */}
      {ship.notable_missions && ship.notable_missions.length > 0 && (
        <div className="bg-black/40 border-l-4 border-lcars-frame p-4 rounded-r-md">
          <h2 className="text-lcars-frame text-xl font-medium mb-3">Notable Missions</h2>
          <ul className="list-disc pl-5 space-y-1 text-lcars-text">
            {ship.notable_missions.map((mission, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                {mission}
              </motion.li>
            ))}
          </ul>
        </div>
      )}

      {/* Captains */}
      {ship.captains && ship.captains.length > 0 && (
        <div className="bg-black/40 border-l-4 border-lcars-accent1 p-4 rounded-r-md">
          <h2 className="text-lcars-accent1 text-xl font-medium mb-3">Commanding Officers</h2>
          <ul className="list-disc pl-5 space-y-1 text-lcars-text">
            {ship.captains.map((captain, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                {captain}
              </motion.li>
            ))}
          </ul>
        </div>
      )}

      {/* Related ships */}
      {ship.related_ships && ship.related_ships.length > 0 && (
        <div className="bg-black/40 border-l-4 border-lcars-accent2 p-4 rounded-r-md">
          <h2 className="text-lcars-accent2 text-xl font-medium mb-3">Related Ships</h2>
          <ul className="list-disc pl-5 space-y-1 text-lcars-text">
            {ship.related_ships.map((relatedShip, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                {relatedShip}
              </motion.li>
            ))}
          </ul>
        </div>
      )}

      {/* Cultural significance */}
      {ship.cultural_significance && (
        <div className="bg-black/40 border-l-4 border-lcars-accent3 p-4 rounded-r-md">
          <h2 className="text-lcars-accent3 text-xl font-medium mb-3">Cultural Significance</h2>
          <div className="text-lcars-text">
            <p>{ship.cultural_significance}</p>
          </div>
        </div>
      )}
    </div>
  )
}
