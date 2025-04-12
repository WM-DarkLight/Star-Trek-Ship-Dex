"use client"

import type { Starship } from "@/types/starship"
import { motion } from "framer-motion"
import { Cpu, Radio, Rocket, Database, Scan, Anchor, Truck, Stethoscope } from "lucide-react"

interface ShipTechnicalSpecsProps {
  ship: Starship
}

export function ShipTechnicalSpecs({ ship }: ShipTechnicalSpecsProps) {
  // Default technical specs based on era if not provided
  const defaultTechSpecs = getDefaultTechSpecs(ship)
  const techSpecs = ship.technical_specs || defaultTechSpecs

  // Icons for different technical systems
  const systemIcons = {
    propulsion: Rocket,
    computer_systems: Database,
    sensors: Scan,
    communications: Radio,
    tactical_systems: Cpu,
    auxiliary_craft: Truck,
    transporters: Anchor,
    medical_facilities: Stethoscope,
  }

  return (
    <div className="space-y-6">
      <div className="bg-black/40 border-l-4 border-lcars-accent1 p-4 rounded-r-md">
        <h2 className="text-lcars-accent1 text-xl font-medium mb-3">Technical Specifications</h2>
        <p className="text-lcars-text mb-4">Detailed technical specifications for the {ship.class} class starship.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {Object.entries(techSpecs).map(([key, value], index) => {
          if (!value) return null

          const Icon = systemIcons[key as keyof typeof systemIcons] || Cpu
          const title = key.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())

          return (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-black/40 border-l-4 border-lcars-accent2 p-4 rounded-r-md"
            >
              <h3 className="text-lcars-accent2 font-medium mb-2 flex items-center">
                <Icon className="h-4 w-4 mr-2" />
                {title}
              </h3>
              <p className="text-lcars-text">{value}</p>
            </motion.div>
          )
        })}
      </div>

      {/* Technical diagrams section */}
      <div className="bg-black/40 border-l-4 border-lcars-accent3 p-4 rounded-r-md">
        <h2 className="text-lcars-accent3 text-xl font-medium mb-3">Technical Diagrams</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-black/60 border border-lcars-accent3/30 p-4 rounded-md">
            <h3 className="text-lcars-accent3 text-sm mb-2">Propulsion Systems</h3>
            <div className="h-40 flex items-center justify-center">
              <div className="w-full h-full relative">
                {/* Simplified warp nacelle diagram */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 h-1/2 border border-lcars-accent3/50 rounded-full"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/2 h-1/3 bg-lcars-accent3/20 rounded-full"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/4 h-1/6 bg-lcars-accent3/40 rounded-full animate-pulse"></div>
                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-lcars-accent3/30"></div>
                <div className="absolute top-0 left-1/2 h-full w-[1px] bg-lcars-accent3/30"></div>
              </div>
            </div>
          </div>

          <div className="bg-black/60 border border-lcars-accent3/30 p-4 rounded-md">
            <h3 className="text-lcars-accent3 text-sm mb-2">Sensor Array</h3>
            <div className="h-40 flex items-center justify-center">
              <div className="w-full h-full relative">
                {/* Simplified sensor array diagram */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3/4 h-3/4 border border-lcars-accent3/50 rounded-md"></div>
                <div className="absolute top-1/4 left-1/4 w-1/2 h-1/2 border border-lcars-accent3/30 rounded-md"></div>
                <div className="absolute top-3/8 left-3/8 w-1/4 h-1/4 bg-lcars-accent3/20 rounded-md"></div>
                <div className="absolute top-1/2 left-0 w-full h-[1px] bg-lcars-accent3/30"></div>
                <div className="absolute top-0 left-1/2 h-full w-[1px] bg-lcars-accent3/30"></div>
                {/* Animated scanning effect */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-lcars-accent3/60 animate-[scan_3s_ease-in-out_infinite]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

// Helper function to generate default technical specs based on ship era
function getDefaultTechSpecs(ship: Starship) {
  const era = ship.era

  // Base specs that will be modified based on era
  const specs: Record<string, string> = {
    propulsion: "",
    computer_systems: "",
    sensors: "",
    communications: "",
    tactical_systems: "",
    auxiliary_craft: "",
    transporters: "",
    medical_facilities: "",
  }

  // TOS Era (2260s)
  if (era === "TOS") {
    specs.propulsion =
      "Standard matter/antimatter warp drive with dilithium crystal regulation. Maximum sustainable speed of Warp 8."
    specs.computer_systems =
      "Duotronic computer systems with voice interface capability. Data storage via isolinear tapes and memory banks."
    specs.sensors = "Standard long-range and short-range sensor arrays with limited subspace capabilities."
    specs.communications = "Subspace radio with limited range. Visual communication capabilities via viewscreen."
    specs.tactical_systems =
      "Phaser banks with manual targeting systems. Photon torpedo launchers with limited automated loading."
    specs.auxiliary_craft = "Standard shuttlecraft complement including Class F shuttles."
    specs.transporters = "Transporter systems with limited range and safety protocols. Six-person capacity."
    specs.medical_facilities = "Sickbay equipped with surgical beds, medical scanners, and basic emergency equipment."
  }

  // TMP Era (2270s-2290s)
  else if (era === "TMP") {
    specs.propulsion =
      "Upgraded matter/antimatter warp drive with improved dilithium crystal regulation. Maximum sustainable speed of Warp 8, emergency speed of Warp 9."
    specs.computer_systems =
      "Advanced duotronic computer systems with enhanced voice recognition and processing capabilities."
    specs.sensors = "Upgraded long-range and short-range sensor arrays with improved subspace detection capabilities."
    specs.communications = "Enhanced subspace communications array with increased range and clarity."
    specs.tactical_systems =
      "Improved phaser banks with computer-assisted targeting. Enhanced photon torpedo launchers with automated loading systems."
    specs.auxiliary_craft =
      "Expanded shuttlecraft complement including travel pods and work bees for external operations."
    specs.transporters =
      "Enhanced transporter systems with improved safety protocols and biofilter technology. Six-person capacity."
    specs.medical_facilities =
      "Expanded sickbay with advanced diagnostic equipment, surgical suites, and intensive care units."
  }

  // TNG Era (2360s-2370s)
  else if (era === "TNG" || era === "DS9" || era === "VOY") {
    specs.propulsion =
      "Advanced matter/antimatter warp drive with dilithium crystal articulation. Maximum sustainable speed of Warp 9.6, emergency speed of Warp 9.9."
    specs.computer_systems =
      "Bio-neural gel pack computer systems with isolinear processing and advanced voice recognition. Holographic interface capabilities."
    specs.sensors =
      "Multi-phasic sensor arrays with long-range subspace detection capabilities. Enhanced astrometric sensors."
    specs.communications =
      "Advanced subspace communications array with Federation-wide range capabilities. Secure channels and encryption protocols."
    specs.tactical_systems =
      "Type-X phaser arrays with automated targeting and firing solutions. Quantum and photon torpedo capabilities with rapid-fire launchers."
    specs.auxiliary_craft =
      "Multiple shuttlecraft types including Type-6, Type-8, and Type-9 shuttles. Captain's yacht on larger vessels."
    specs.transporters =
      "Enhanced transporter systems with pattern buffers, site-to-site transport capabilities, and emergency transport protocols. Eight-person capacity."
    specs.medical_facilities =
      "Advanced sickbay with EMH (Emergency Medical Hologram), surgical biobeds, and comprehensive medical database."
  }

  // ENT Era (2150s)
  else if (era === "ENT") {
    specs.propulsion =
      "Experimental Warp 5 engine with limited antimatter containment. Maximum sustainable speed of Warp 5.2."
    specs.computer_systems = "Early computer systems with limited voice recognition. Data storage via memory modules."
    specs.sensors = "Basic sensor arrays with limited range. Polarized hull plating instead of shields."
    specs.communications =
      "Subspace communications with limited range. Universal translator in early development stages."
    specs.tactical_systems =
      "Phase cannons and spatial torpedoes. Manual targeting systems with limited computer assistance."
    specs.auxiliary_craft = "Limited shuttlepod complement with minimal warp capability."
    specs.transporters =
      "Experimental transporter technology primarily used for cargo. Limited biological transport capabilities with significant safety concerns."
    specs.medical_facilities =
      "Basic sickbay with limited diagnostic equipment. Early versions of medical scanners and surgical tools."
  }

  // TNG Films Era (2370s-2380s)
  else if (era === "TNG Films") {
    specs.propulsion =
      "State-of-the-art matter/antimatter warp drive with enhanced dilithium matrix. Maximum sustainable speed of Warp 9.985."
    specs.computer_systems =
      "Advanced bio-neural gel pack systems with quantum processing capabilities. Enhanced holographic interfaces."
    specs.sensors = "Multi-spectral sensor arrays with trans-phasic capabilities. Long-range subspace detection grid."
    specs.communications =
      "Quantum subspace communications array with enhanced security protocols and Federation-wide range."
    specs.tactical_systems =
      "Type-XII phaser arrays with automated targeting and adaptive firing patterns. Quantum torpedo launchers with rapid-fire capabilities."
    specs.auxiliary_craft =
      "Advanced shuttlecraft complement including Type-11 shuttles with enhanced defensive capabilities."
    specs.transporters =
      "Advanced transporter systems with enhanced pattern buffers, multi-person site-to-site capabilities, and emergency transport protocols. Ten-person capacity."
    specs.medical_facilities =
      "State-of-the-art medical facilities with EMH Mark IV, regenerative biobeds, and comprehensive xenobiology database."
  }

  // Default for other eras
  else {
    specs.propulsion = "Standard warp drive appropriate for the vessel's era and class."
    specs.computer_systems = "Computer systems appropriate for the vessel's era and class."
    specs.sensors = "Sensor arrays appropriate for the vessel's era and class."
    specs.communications = "Communications systems appropriate for the vessel's era and class."
    specs.tactical_systems = "Tactical systems appropriate for the vessel's era and class."
    specs.auxiliary_craft = "Auxiliary craft complement appropriate for the vessel's era and class."
    specs.transporters = "Transporter systems appropriate for the vessel's era and class."
    specs.medical_facilities = "Medical facilities appropriate for the vessel's era and class."
  }

  return specs
}
