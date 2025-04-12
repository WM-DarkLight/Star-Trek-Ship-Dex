"use client"

import { useState } from "react"
import type { Starship } from "@/types/starship"
import { Users, User, Award, Briefcase } from "lucide-react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"

interface ShipCrewProps {
  ship: Starship
}

export function ShipCrew({ ship }: ShipCrewProps) {
  const [selectedOfficer, setSelectedOfficer] = useState<number | null>(null)

  // Generate crew members based on ship data
  const getCrewMembers = () => {
    // Famous ships get their canonical crew
    if (ship.id === "ncc-1701") {
      return [
        {
          name: "James T. Kirk",
          rank: "Captain",
          position: "Commanding Officer",
          species: "Human",
          image: "/images/crew/kirk.jpg",
        },
        {
          name: "Spock",
          rank: "Commander",
          position: "First Officer/Science Officer",
          species: "Vulcan/Human",
          image: "/images/crew/spock.jpg",
        },
        {
          name: "Leonard McCoy",
          rank: "Lieutenant Commander",
          position: "Chief Medical Officer",
          species: "Human",
          image: "/images/crew/mccoy.jpg",
        },
        {
          name: "Montgomery Scott",
          rank: "Lieutenant Commander",
          position: "Chief Engineer",
          species: "Human",
          image: "/images/crew/scott.jpg",
        },
      ]
    } else if (ship.id === "ncc-1701-d") {
      return [
        {
          name: "Jean-Luc Picard",
          rank: "Captain",
          position: "Commanding Officer",
          species: "Human",
          image: "/images/crew/picard.jpg",
        },
        {
          name: "William Riker",
          rank: "Commander",
          position: "First Officer",
          species: "Human",
          image: "/images/crew/riker.jpg",
        },
        {
          name: "Data",
          rank: "Lieutenant Commander",
          position: "Second Officer/Operations",
          species: "Android",
          image: "/images/crew/data.jpg",
        },
        {
          name: "Deanna Troi",
          rank: "Commander",
          position: "Ship's Counselor",
          species: "Betazoid/Human",
          image: "/images/crew/troi.jpg",
        },
      ]
    } else if (ship.id === "nx-74205") {
      return [
        {
          name: "Benjamin Sisko",
          rank: "Captain",
          position: "Commanding Officer",
          species: "Human",
          image: "/images/crew/sisko.jpg",
        },
        {
          name: "Worf",
          rank: "Lieutenant Commander",
          position: "Strategic Operations Officer",
          species: "Klingon",
          image: "/images/crew/worf.jpg",
        },
        {
          name: "Jadzia Dax",
          rank: "Lieutenant",
          position: "Science Officer",
          species: "Trill",
          image: "/images/crew/dax.jpg",
        },
        {
          name: "Julian Bashir",
          rank: "Lieutenant",
          position: "Chief Medical Officer",
          species: "Human",
          image: "/images/crew/bashir.jpg",
        },
      ]
    }

    // Generic crew for other ships
    const firstNames = [
      "John",
      "Sarah",
      "Michael",
      "T'Pol",
      "Vorik",
      "Elizabeth",
      "David",
      "Tuvok",
      "Kathryn",
      "Charles",
    ]
    const lastNames = [
      "Smith",
      "Jones",
      "Taylor",
      "Williams",
      "Brown",
      "Davies",
      "Evans",
      "Wilson",
      "Thomas",
      "Roberts",
    ]
    const ranks = ["Captain", "Commander", "Lieutenant Commander", "Lieutenant", "Ensign"]
    const positions = [
      "Commanding Officer",
      "First Officer",
      "Chief Engineer",
      "Chief Medical Officer",
      "Science Officer",
      "Tactical Officer",
      "Helm Officer",
    ]
    const species = ["Human", "Vulcan", "Andorian", "Tellarite", "Betazoid", "Trill"]

    const crew = []

    // Always add a captain
    crew.push({
      name: `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`,
      rank: "Captain",
      position: "Commanding Officer",
      species: species[Math.floor(Math.random() * species.length)],
      image: null,
    })

    // Add 3 more random officers
    for (let i = 0; i < 3; i++) {
      crew.push({
        name: `${firstNames[Math.floor(Math.random() * firstNames.length)]} ${lastNames[Math.floor(Math.random() * lastNames.length)]}`,
        rank: ranks[Math.floor(Math.random() * (ranks.length - 1)) + 1], // Skip captain
        position: positions[Math.floor(Math.random() * (positions.length - 1)) + 1], // Skip commanding officer
        species: species[Math.floor(Math.random() * species.length)],
        image: null,
      })
    }

    return crew
  }

  const crewMembers = getCrewMembers()

  return (
    <div className="space-y-6">
      <div className="bg-black/40 border-l-4 border-lcars-accent1 p-4 rounded-r-md">
        <h3 className="text-lcars-accent1 font-medium mb-2 flex items-center">
          <Users className="h-4 w-4 mr-2" />
          Crew Complement
        </h3>
        <p className="text-lcars-text leading-relaxed">
          {typeof ship.stats.crew === "number"
            ? `This vessel has a standard crew complement of ${ship.stats.crew} personnel.`
            : `This vessel has a crew complement of ${ship.stats.crew}.`}
        </p>
      </div>

      <div className="bg-black/40 border-l-4 border-lcars-accent2 p-4 rounded-r-md">
        <h3 className="text-lcars-accent2 font-medium mb-4 flex items-center">
          <Award className="h-4 w-4 mr-2" />
          Senior Officers
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {crewMembers.map((officer, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className={`bg-black/30 border border-lcars-frame/20 rounded-md overflow-hidden cursor-pointer transition-all ${
                selectedOfficer === index ? "ring-2 ring-lcars-accent1" : ""
              }`}
              onClick={() => setSelectedOfficer(selectedOfficer === index ? null : index)}
            >
              <div className="flex p-3">
                <div className="w-16 h-16 bg-lcars-accent2/20 rounded-md flex items-center justify-center mr-3">
                  {officer.image ? (
                    <img
                      src={officer.image || "/placeholder.svg"}
                      alt={officer.name}
                      className="w-full h-full object-cover rounded-md"
                    />
                  ) : (
                    <User className="w-8 h-8 text-lcars-accent2/60" />
                  )}
                </div>
                <div>
                  <h4 className="text-lcars-text font-medium">{officer.name}</h4>
                  <div className="flex items-center mt-1">
                    <Badge variant="outline" className="mr-2 border-lcars-accent2/50 text-lcars-accent2 text-xs">
                      {officer.rank}
                    </Badge>
                    <span className="text-lcars-text/70 text-xs">{officer.species}</span>
                  </div>
                  <div className="text-lcars-text/80 text-xs mt-1 flex items-center">
                    <Briefcase className="w-3 h-3 mr-1" />
                    {officer.position}
                  </div>
                </div>
              </div>

              {selectedOfficer === index && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  className="px-3 pb-3 text-lcars-text/80 text-sm"
                >
                  <div className="pt-2 border-t border-lcars-frame/20 mt-2">
                    <p>
                      {officer.rank} {officer.name} serves as {officer.position} aboard the {ship.name}.
                      {officer.rank === "Captain"
                        ? " As the commanding officer, they are responsible for all ship operations and personnel."
                        : officer.position.includes("Engineer")
                          ? " They oversee all engineering systems and ensure the ship operates at peak efficiency."
                          : officer.position.includes("Medical")
                            ? " They are responsible for the health and well-being of all crew members."
                            : officer.position.includes("Science")
                              ? " They lead all scientific research and analysis conducted aboard the ship."
                              : " They are a key member of the senior staff."}
                    </p>
                  </div>
                </motion.div>
              )}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="bg-black/40 border-l-4 border-lcars-accent3 p-4 rounded-r-md">
        <h3 className="text-lcars-accent3 font-medium mb-2 flex items-center">
          <Users className="h-4 w-4 mr-2" />
          Department Distribution
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-4">
          {[
            { name: "Command", percentage: 15, color: "bg-lcars-accent1" },
            { name: "Operations", percentage: 30, color: "bg-lcars-accent2" },
            { name: "Science", percentage: 25, color: "bg-lcars-accent3" },
            { name: "Medical", percentage: 15, color: "bg-lcars-frame" },
          ].map((dept, index) => (
            <div key={index} className="flex flex-col items-center">
              <div className="w-full h-24 bg-black/30 rounded-md relative overflow-hidden">
                <motion.div
                  initial={{ height: 0 }}
                  animate={{ height: `${dept.percentage}%` }}
                  transition={{ duration: 1, delay: index * 0.2 }}
                  className={`absolute bottom-0 left-0 right-0 ${dept.color}`}
                ></motion.div>
                <div className="absolute inset-0 flex items-center justify-center flex-col">
                  <span className="text-lcars-text font-bold text-lg">{dept.percentage}%</span>
                </div>
              </div>
              <span className="text-lcars-text/80 text-sm mt-2">{dept.name}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
