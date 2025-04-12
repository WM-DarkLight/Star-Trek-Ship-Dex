"use client"

import type { Starship } from "@/types/starship"
import { Crosshair, Shield, Target } from "lucide-react"
import { motion } from "framer-motion"

interface ShipArmamentsProps {
  ship: Starship
}

export function ShipArmaments({ ship }: ShipArmamentsProps) {
  const armaments = ship.armaments || "No armament data available for this vessel."

  // Parse armaments string into array for better display
  const armamentsList = armaments.split(/,\s*/).filter((item) => item.trim().length > 0)

  return (
    <div className="space-y-6">
      <div className="bg-black/40 border-l-4 border-lcars-accent3 p-4 rounded-r-md">
        <h3 className="text-lcars-accent3 font-medium mb-4 flex items-center">
          <Crosshair className="h-4 w-4 mr-2" />
          Weapons Systems
        </h3>

        {armamentsList.length > 0 ? (
          <ul className="space-y-3">
            {armamentsList.map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="flex items-center"
              >
                <div className="h-2 w-2 bg-lcars-accent1 rounded-full mr-3"></div>
                <span className="text-lcars-text">{item}</span>
              </motion.li>
            ))}
          </ul>
        ) : (
          <p className="text-lcars-text/70 italic">No weapons data available</p>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-black/40 border-l-4 border-lcars-accent2 p-4 rounded-r-md">
          <h3 className="text-lcars-accent2 font-medium mb-2 flex items-center">
            <Shield className="h-4 w-4 mr-2" />
            Defensive Systems
          </h3>
          <p className="text-lcars-text">
            {armaments.toLowerCase().includes("shield")
              ? "This vessel is equipped with deflector shield technology."
              : "No specific shield data available for this vessel."}
          </p>

          {/* Shield diagram */}
          <div className="mt-4 h-32 relative">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-24 h-12 bg-black/80 border border-lcars-accent2/30 rounded-full"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-32 h-16 border border-lcars-accent2/50 rounded-full animate-pulse"></div>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-40 h-20 border border-lcars-accent2/30 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-black/40 border-l-4 border-lcars-accent1 p-4 rounded-r-md">
          <h3 className="text-lcars-accent1 font-medium mb-2 flex items-center">
            <Target className="h-4 w-4 mr-2" />
            Tactical Systems
          </h3>
          <p className="text-lcars-text mb-3">
            {ship.era === "TNG" || ship.era === "DS9" || ship.era === "VOY" || ship.era === "TNG Films"
              ? "Advanced targeting systems with multi-vector assault capabilities."
              : ship.era === "TOS" || ship.era === "TMP"
                ? "Standard targeting computer with manual override capabilities."
                : "Basic targeting systems."}
          </p>

          {/* Tactical display */}
          <div className="h-24 border border-lcars-accent1/30 rounded bg-black/30 p-2">
            <div className="h-full w-full flex items-center justify-center">
              <div className="relative h-16 w-16">
                <div className="absolute inset-0 border-2 border-lcars-accent1/30 rounded-full"></div>
                <div className="absolute inset-2 border border-lcars-accent1/50 rounded-full"></div>
                <div className="absolute inset-4 border border-lcars-accent1/70 rounded-full"></div>
                <div className="absolute inset-6 bg-lcars-accent1/20 rounded-full"></div>
                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-lcars-accent1/50"></div>
                <div className="absolute top-0 left-1/2 w-[1px] h-full bg-lcars-accent1/50"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
