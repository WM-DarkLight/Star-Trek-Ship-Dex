"use client"

import { useState } from "react"
import type { Starship } from "@/types/starship"
import { Info, FileText, Calendar } from "lucide-react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"

interface ShipHistoryProps {
  ship: Starship
}

export function ShipHistory({ ship }: ShipHistoryProps) {
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null)

  // Generate some placeholder history based on ship data
  const getHistoryContent = () => {
    const eraMap: Record<string, string> = {
      ENT: "2150s",
      TOS: "2260s",
      TMP: "2270s-2290s",
      TNG: "2360s-2370s",
      DS9: "2370s",
      VOY: "2370s",
      "TNG Films": "2370s-2380s",
    }

    const eraTime = eraMap[ship.era] || "Unknown time period"

    return `The ${ship.class} class starship was in service during the ${eraTime}. ${ship.info || ""}`
  }

  // Generate historical events based on ship data
  const getHistoricalEvents = () => {
    const events = []

    // Add commissioning event
    const commissionYear =
      ship.era === "TOS"
        ? "2245"
        : ship.era === "TMP"
          ? "2273"
          : ship.era === "TNG"
            ? "2363"
            : ship.era === "DS9"
              ? "2371"
              : ship.era === "VOY"
                ? "2371"
                : ship.era === "ENT"
                  ? "2151"
                  : ship.era === "TNG Films"
                    ? "2372"
                    : "Unknown"

    events.push({
      year: commissionYear,
      title: `${ship.name} Commissioned`,
      description: `The ${ship.class} class starship ${ship.name} was commissioned into service.`,
    })

    // Add notable mission event if it's a famous ship
    if (ship.name.includes("Enterprise") || ship.name.includes("Voyager") || ship.name.includes("Defiant")) {
      events.push({
        year: String(Number(commissionYear) + 2),
        title: "Notable Mission",
        description: `${ship.name} completed a significant mission that established its reputation in Starfleet.`,
      })
    }

    // Add refit event for older ships
    if (ship.era === "TOS" || ship.era === "TMP") {
      events.push({
        year: String(Number(commissionYear) + 5),
        title: "Major Refit",
        description: `${ship.name} underwent a major refit to upgrade its systems and capabilities.`,
      })
    }

    // Add decommissioning event
    events.push({
      year: String(Number(commissionYear) + 20),
      title: `${ship.name} Decommissioned`,
      description: `After years of service, the ${ship.name} was decommissioned.`,
    })

    return events
  }

  const historicalEvents = getHistoricalEvents()

  return (
    <div className="space-y-6">
      <div className="bg-black/40 border-l-4 border-lcars-accent1 p-4 rounded-r-md">
        <h3 className="text-lcars-accent1 font-medium mb-2 flex items-center">
          <Info className="h-4 w-4 mr-2" />
          Historical Overview
        </h3>
        <p className="text-lcars-text leading-relaxed">{getHistoryContent()}</p>
      </div>

      <div className="bg-black/40 border-l-4 border-lcars-accent2 p-4 rounded-r-md">
        <h3 className="text-lcars-accent2 font-medium mb-4 flex items-center">
          <Calendar className="h-4 w-4 mr-2" />
          Timeline
        </h3>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-lcars-accent2/30"></div>

          {/* Timeline events */}
          <div className="space-y-6 ml-12 relative">
            {historicalEvents.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.2 }}
                className={`relative ${selectedEvent === index ? "bg-lcars-accent2/20" : ""} p-3 rounded-md cursor-pointer transition-colors`}
                onClick={() => setSelectedEvent(selectedEvent === index ? null : index)}
              >
                {/* Timeline dot */}
                <div className="absolute left-[-36px] top-3 w-4 h-4 rounded-full bg-lcars-accent2 border-2 border-black"></div>

                {/* Year badge */}
                <Badge className="bg-lcars-accent2 text-black mb-2">Stardate {event.year}</Badge>

                <h4 className="text-lcars-text font-medium mb-1">{event.title}</h4>

                {selectedEvent === index && (
                  <motion.p
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="text-lcars-text/80 text-sm"
                  >
                    {event.description}
                  </motion.p>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-black/40 border-l-4 border-lcars-frame p-4 rounded-r-md">
        <h3 className="text-lcars-frame font-medium mb-2 flex items-center">
          <FileText className="h-4 w-4 mr-2" />
          Service Record
        </h3>
        <p className="text-lcars-text leading-relaxed">
          {ship.name.includes("Enterprise")
            ? "This vessel has participated in numerous historic missions and first contacts."
            : ship.name.includes("Voyager")
              ? "This vessel was stranded in the Delta Quadrant and made a historic journey back to Federation space."
              : ship.name.includes("Defiant")
                ? "This vessel served as a key defensive asset during the Dominion War."
                : "Standard service record for this vessel class."}
        </p>
      </div>
    </div>
  )
}
