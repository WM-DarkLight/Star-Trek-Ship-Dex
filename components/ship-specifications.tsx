"use client"

import type { Starship } from "@/types/starship"
import { Shield, Zap, Gauge, Users, Ruler, Cpu, Rocket } from "lucide-react"
import { motion } from "framer-motion"

interface ShipSpecificationsProps {
  ship: Starship
}

export function ShipSpecifications({ ship }: ShipSpecificationsProps) {
  const { stats } = ship

  const statIcons = {
    hull: Shield,
    shields: Shield,
    weapons: Zap,
    speed: Gauge,
    maneuver: Gauge,
    crew: Users,
    length_m: Ruler,
    computer: Cpu,
    propulsion: Rocket,
  }

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Object.entries(stats).map(([key, value], index) => {
          const Icon = statIcons[key as keyof typeof statIcons] || Shield
          const formattedKey = key
            .replace("_m", " (m)")
            .replace(/_/g, " ")
            .replace(/\b\w/g, (l) => l.toUpperCase())
          const isBarStat = typeof value === "number" && key !== "length_m" && key !== "speed" && key !== "crew"

          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-black/40 border-l-4 border-lcars-accent3 p-4 rounded-r-md"
            >
              <div className="flex items-center mb-2">
                <Icon className="h-4 w-4 mr-2 text-lcars-accent3" />
                <div className="text-lcars-accent3 font-medium">{formattedKey}</div>
              </div>

              {isBarStat ? (
                <div className="space-y-2">
                  <div className="h-2 bg-black/60 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-lcars-accent3 to-lcars-accent2"
                      initial={{ width: 0 }}
                      animate={{ width: `${Math.min(100, Math.max(0, Number(value) * 10))}%` }}
                      transition={{ duration: 1, delay: 0.2 }}
                    />
                  </div>
                  <div className="text-right text-lcars-text font-bold">{value}/10</div>
                </div>
              ) : (
                <div className="text-lcars-text text-lg font-bold">
                  {key === "speed" && typeof value === "number" && value > 9 ? `Warp ${value}` : value}
                </div>
              )}
            </motion.div>
          )
        })}
      </div>

      <div className="bg-black/40 border-l-4 border-lcars-accent2 p-4 rounded-r-md">
        <h3 className="text-lcars-accent2 font-medium mb-2">Technical Profile</h3>
        <p className="text-lcars-text leading-relaxed">
          {ship.info || "No technical profile available for this vessel."}
        </p>
      </div>

      {/* Additional technical specifications */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-black/40 border-l-4 border-lcars-accent1 p-4 rounded-r-md">
          <h3 className="text-lcars-accent1 font-medium mb-2 flex items-center">
            <Cpu className="h-4 w-4 mr-2" />
            Computer Systems
          </h3>
          <p className="text-lcars-text">
            {ship.era === "TNG" || ship.era === "DS9" || ship.era === "VOY" || ship.era === "TNG Films"
              ? "Bio-neural gel packs with isolinear processing"
              : ship.era === "TOS" || ship.era === "TMP"
                ? "Duotronic computer systems"
                : ship.era === "ENT"
                  ? "Positronic computer core"
                  : "Standard computer configuration"}
          </p>
        </div>

        <div className="bg-black/40 border-l-4 border-lcars-accent3 p-4 rounded-r-md">
          <h3 className="text-lcars-accent3 font-medium mb-2 flex items-center">
            <Rocket className="h-4 w-4 mr-2" />
            Propulsion
          </h3>
          <p className="text-lcars-text">
            {ship.era === "TNG" || ship.era === "DS9" || ship.era === "VOY" || ship.era === "TNG Films"
              ? "Matter/Antimatter Warp Drive with Dilithium Crystal Regulation"
              : ship.era === "TOS" || ship.era === "TMP"
                ? "Standard Warp Drive"
                : ship.era === "ENT"
                  ? "Warp 5 Engine"
                  : "Warp Drive"}
          </p>
        </div>
      </div>
    </div>
  )
}
