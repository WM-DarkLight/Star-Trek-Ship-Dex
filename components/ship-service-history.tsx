"use client"

import { useState } from "react"
import type { Starship } from "@/types/starship"
import { motion } from "framer-motion"
import { Clock, Award, Flag, PenToolIcon as Tool, Crosshair } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface ShipServiceHistoryProps {
  ship: Starship
}

export function ShipServiceHistory({ ship }: ShipServiceHistoryProps) {
  const [selectedEvent, setSelectedEvent] = useState<number | null>(null)

  // Generate service history if not provided
  const serviceHistory = ship.service_history || generateServiceHistory(ship)

  // Generate timeline events based on service history
  const timelineEvents = generateTimelineEvents(ship, serviceHistory)

  return (
    <div className="space-y-6">
      <div className="bg-black/40 border-l-4 border-lcars-accent1 p-4 rounded-r-md">
        <h2 className="text-lcars-accent1 text-xl font-medium mb-3 flex items-center">
          <Clock className="h-5 w-5 mr-2" />
          Service Record
        </h2>
        <p className="text-lcars-text">
          The complete service history of {ship.name}, from construction to{" "}
          {ship.status?.toLowerCase() || "present day"}.
        </p>
      </div>

      {/* Construction and commissioning */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-black/40 border-l-4 border-lcars-accent2 p-4 rounded-r-md">
          <h3 className="text-lcars-accent2 font-medium mb-2 flex items-center">
            <Tool className="h-4 w-4 mr-2" />
            Construction
          </h3>
          <p className="text-lcars-text">
            {serviceHistory.construction ||
              `Construction details for ${ship.name} are not available in Federation records.`}
          </p>
        </div>

        <div className="bg-black/40 border-l-4 border-lcars-accent3 p-4 rounded-r-md">
          <h3 className="text-lcars-accent3 font-medium mb-2 flex items-center">
            <Flag className="h-4 w-4 mr-2" />
            Commissioning
          </h3>
          <p className="text-lcars-text">
            {serviceHistory.commissioning ||
              `Commissioning details for ${ship.name} are not available in Federation records.`}
          </p>
        </div>
      </div>

      {/* Timeline */}
      <div className="bg-black/40 border-l-4 border-lcars-frame p-4 rounded-r-md">
        <h3 className="text-lcars-frame font-medium mb-4 flex items-center">
          <Clock className="h-4 w-4 mr-2" />
          Timeline
        </h3>

        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-lcars-frame/30"></div>

          {/* Timeline events */}
          <div className="space-y-6 ml-12 relative">
            {timelineEvents.map((event, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.2 }}
                className={`relative ${selectedEvent === index ? "bg-lcars-frame/20" : ""} p-3 rounded-md cursor-pointer transition-colors`}
                onClick={() => setSelectedEvent(selectedEvent === index ? null : index)}
              >
                {/* Timeline dot */}
                <div className="absolute left-[-36px] top-3 w-4 h-4 rounded-full bg-lcars-frame border-2 border-black"></div>

                {/* Year badge */}
                <Badge className="bg-lcars-frame text-black mb-2">Stardate {event.year}</Badge>

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

      {/* Major battles */}
      {serviceHistory.major_battles && serviceHistory.major_battles.length > 0 && (
        <div className="bg-black/40 border-l-4 border-lcars-accent1 p-4 rounded-r-md">
          <h3 className="text-lcars-accent1 font-medium mb-3 flex items-center">
            <Crosshair className="h-4 w-4 mr-2" />
            Major Engagements
          </h3>

          <div className="space-y-4">
            {serviceHistory.major_battles.map((battle, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-black/30 border border-lcars-accent1/30 p-3 rounded-md"
              >
                <div className="flex justify-between items-center mb-1">
                  <h4 className="text-lcars-text font-medium">{battle.name}</h4>
                  <Badge variant="outline" className="border-lcars-accent1/50 text-lcars-accent1">
                    {battle.year}
                  </Badge>
                </div>
                <p className="text-lcars-text/80 text-sm">Outcome: {battle.outcome}</p>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      {/* Legacy */}
      {serviceHistory.legacy && (
        <div className="bg-black/40 border-l-4 border-lcars-accent2 p-4 rounded-r-md">
          <h3 className="text-lcars-accent2 font-medium mb-2 flex items-center">
            <Award className="h-4 w-4 mr-2" />
            Legacy
          </h3>
          <p className="text-lcars-text">{serviceHistory.legacy}</p>
        </div>
      )}
    </div>
  )
}

// Helper function to generate service history based on ship data
function generateServiceHistory(ship: Starship) {
  const serviceHistory: any = {}

  // Construction
  if (ship.launched) {
    const constructionYear = Number.parseInt(ship.launched) - 2
    serviceHistory.construction = `The ${ship.class} class starship ${ship.name} was constructed at ${getShipyard(ship)} starting in ${constructionYear}. Construction took approximately two years to complete.`
  } else {
    serviceHistory.construction = `The ${ship.class} class starship ${ship.name} was constructed at ${getShipyard(ship)}.`
  }

  // Commissioning
  if (ship.launched) {
    serviceHistory.commissioning = `${ship.name} was commissioned on stardate ${getStardateFromYear(ship.launched)} under the command of ${ship.captains ? ship.captains[0].split("(")[0].trim() : "its first captain"}.`
  } else {
    serviceHistory.commissioning = `${ship.name} was commissioned into service under the command of ${ship.captains ? ship.captains[0].split("(")[0].trim() : "its first captain"}.`
  }

  // Five-year missions (for Constitution class ships)
  if (ship.class.includes("Constitution") && ship.era === "TOS") {
    serviceHistory.five_year_missions = [
      `${ship.name} embarked on its historic five-year mission of deep space exploration under the command of Captain ${ship.captains ? ship.captains[ship.captains.length - 1].split("(")[0].trim() : "James T. Kirk"} from 2265 to 2270.`,
    ]
  }

  // Major refits
  serviceHistory.major_refits = []
  if (ship.class.includes("Constitution") && ship.era === "TMP") {
    serviceHistory.major_refits.push({
      year: "2270",
      description: `${ship.name} underwent a major refit, significantly upgrading its systems and redesigning its external appearance.`,
    })
  } else if (ship.era === "TNG" || ship.era === "DS9" || ship.era === "VOY") {
    const refitYear = ship.launched ? (Number.parseInt(ship.launched) + 5).toString() : "Unknown"
    serviceHistory.major_refits.push({
      year: refitYear,
      description: `${ship.name} received scheduled maintenance and systems upgrades at ${getStarbase()}.`,
    })
  }

  // Major battles
  serviceHistory.major_battles = []
  if (ship.notable_missions) {
    ship.notable_missions.forEach((mission) => {
      if (
        mission.toLowerCase().includes("battle") ||
        mission.toLowerCase().includes("conflict") ||
        mission.toLowerCase().includes("engagement")
      ) {
        const year = mission.match(/$$(\d{4})$$/) ? mission.match(/$$(\d{4})$$/)![1] : "Unknown"
        const battleName = mission.split("(")[0].trim()
        serviceHistory.major_battles.push({
          year,
          name: battleName,
          outcome: "Successful mission",
        })
      }
    })
  }

  // If no battles were found but the ship is notable, add some
  if (serviceHistory.major_battles.length === 0) {
    if (ship.name.includes("Enterprise") && ship.era === "TOS") {
      serviceHistory.major_battles = [
        { year: "2267", name: "Battle with USS Constellation against the Planet Killer", outcome: "Victory" },
        { year: "2268", name: "Engagement with Romulan vessels at the Neutral Zone", outcome: "Standoff resolved" },
      ]
    } else if (ship.name.includes("Enterprise-D")) {
      serviceHistory.major_battles = [
        { year: "2366", name: "Battle of Wolf 359 (arrived after battle)", outcome: "Federation defeat" },
        {
          year: "2368",
          name: "Engagement with Romulan Warbirds in the Neutral Zone",
          outcome: "Diplomatic resolution",
        },
        { year: "2370", name: "Multiple engagements with Cardassian vessels", outcome: "Successful defense" },
      ]
    } else if (ship.name.includes("Defiant")) {
      serviceHistory.major_battles = [
        { year: "2373", name: "Second Battle of Deep Space 9", outcome: "Tactical retreat" },
        { year: "2374", name: "Operation Return", outcome: "Federation/Klingon victory" },
        { year: "2375", name: "Battle of Chin'toka", outcome: "Alliance victory" },
        { year: "2375", name: "Second Battle of Chin'toka", outcome: "Ship destroyed" },
      ]
    }
  }

  // Decommissioning
  if (ship.status && ship.status.toLowerCase().includes("decommissioned")) {
    const match = ship.status.match(/$$(\d{4})$$/)
    const year = match ? match[1] : "Unknown"
    serviceHistory.decommissioning = `${ship.name} was decommissioned in ${year} after years of distinguished service to ${ship.affiliation}.`
  } else if (ship.status && ship.status.toLowerCase().includes("destroyed")) {
    const match = ship.status.match(/$$(\d{4})$$/)
    const year = match ? match[1] : "Unknown"
    serviceHistory.decommissioning = `${ship.name} was destroyed in ${year}. ${ship.status.split("(")[0].trim()}`
  }

  // Legacy
  if (ship.name.includes("Enterprise")) {
    serviceHistory.legacy = `${ship.name} is remembered as one of the most distinguished vessels to bear the name Enterprise, with its exploits documented in numerous historical records and taught at Starfleet Academy as examples of exemplary starship operations and command.`
  } else if (ship.name.includes("Defiant")) {
    serviceHistory.legacy = `${ship.name} proved the effectiveness of the Defiant-class design during the Dominion War, leading to additional vessels of this class being commissioned for Starfleet service.`
  } else if (ship.name.includes("Voyager")) {
    serviceHistory.legacy = `${ship.name}'s unprecedented seven-year journey through the Delta Quadrant resulted in a wealth of scientific data on previously unexplored regions of space and first contact with numerous species.`
  } else {
    serviceHistory.legacy = `${ship.name} served with distinction as a ${ship.class} class vessel of the ${ship.affiliation}.`
  }

  return serviceHistory
}

// Helper function to generate timeline events
function generateTimelineEvents(ship: Starship, serviceHistory: any) {
  const events = []

  // Construction
  if (ship.launched) {
    const constructionYear = Number.parseInt(ship.launched) - 2
    events.push({
      year: constructionYear.toString(),
      title: `Construction Begins`,
      description: `Construction of ${ship.name} begins at ${getShipyard(ship)}.`,
    })
  }

  // Launch
  if (ship.launched) {
    events.push({
      year: ship.launched,
      title: `${ship.name} Launched`,
      description: `${ship.name} is launched from ${getShipyard(ship)} and commissioned into service.`,
    })
  }

  // First mission
  const firstMissionYear = ship.launched ? Number.parseInt(ship.launched).toString() : "Unknown"
  events.push({
    year: firstMissionYear,
    title: "First Mission",
    description: `${ship.name} embarks on its first mission under the command of ${ship.captains ? ship.captains[0].split("(")[0].trim() : "its first captain"}.`,
  })

  // Notable missions
  if (ship.notable_missions) {
    ship.notable_missions.forEach((mission, index) => {
      const year = mission.match(/$$(\d{4})$$/)
        ? mission.match(/$$(\d{4})$$/)![1]
        : ship.launched
          ? (Number.parseInt(ship.launched) + index + 1).toString()
          : "Unknown"
      events.push({
        year,
        title: mission.split("(")[0].trim(),
        description: mission,
      })
    })
  }

  // Refits
  if (serviceHistory.major_refits) {
    serviceHistory.major_refits.forEach((refit: any) => {
      events.push({
        year: refit.year,
        title: "Major Refit",
        description: refit.description,
      })
    })
  }

  // Battles
  if (serviceHistory.major_battles) {
    serviceHistory.major_battles.forEach((battle: any) => {
      events.push({
        year: battle.year,
        title: battle.name,
        description: `${ship.name} participated in ${battle.name}. Outcome: ${battle.outcome}.`,
      })
    })
  }

  // Decommissioning or destruction
  if (ship.status) {
    const match = ship.status.match(/$$(\d{4})$$/)
    const year = match ? match[1] : "Unknown"
    events.push({
      year,
      title: ship.status.includes("Destroyed") ? "Destruction" : "Decommissioning",
      description: ship.status,
    })
  }

  // Sort events by year
  events.sort((a, b) => {
    const yearA = Number.parseInt(a.year) || 0
    const yearB = Number.parseInt(b.year) || 0
    return yearA - yearB
  })

  return events
}

// Helper function to get a random shipyard based on ship affiliation
function getShipyard(ship: Starship) {
  if (ship.affiliation.includes("Federation")) {
    const shipyards = [
      "Utopia Planitia Fleet Yards, Mars",
      "San Francisco Fleet Yards, Earth",
      "Beta Antares Ship Yards",
      "Proxima Maintenance Yards",
      "40 Eridani A Starfleet Construction Yards",
    ]
    return shipyards[Math.floor(Math.random() * shipyards.length)]
  } else if (ship.affiliation.includes("Klingon")) {
    return "Imperial Klingon Shipyards, Qo'noS"
  } else if (ship.affiliation.includes("Romulan")) {
    return "Romulan Imperial Fleet Yards"
  } else {
    return "the primary shipyards of " + ship.affiliation
  }
}

// Helper function to get a random starbase
function getStarbase() {
  const starbases = [
    "Starbase 1",
    "Starbase 11",
    "Starbase 12",
    "Starbase 24",
    "Starbase 74",
    "Starbase 84",
    "Starbase 173",
    "Starbase 375",
  ]
  return starbases[Math.floor(Math.random() * starbases.length)]
}

// Helper function to generate a stardate from a year
function getStardateFromYear(year: string) {
  const yearNum = Number.parseInt(year)
  if (yearNum < 2270) {
    // TOS era stardates
    return (1000 + Math.floor(Math.random() * 8000)).toFixed(1)
  } else if (yearNum < 2350) {
    // Movie era stardates
    return (yearNum - 2270 + 7000 + Math.floor(Math.random() * 1000)).toFixed(1)
  } else {
    // TNG era stardates
    return ((yearNum - 2323) * 1000 + Math.floor(Math.random() * 1000)).toFixed(1)
  }
}
