"use client"

import type { Starship } from "@/types/starship"
import { motion } from "framer-motion"
import { Film, Tv, Book, Gamepad } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface ShipAppearancesProps {
  ship: Starship
}

export function ShipAppearances({ ship }: ShipAppearancesProps) {
  // Generate appearances if not provided
  const appearances = ship.appearances || generateAppearances(ship)

  return (
    <div className="space-y-6">
      <div className="bg-black/40 border-l-4 border-lcars-accent1 p-4 rounded-r-md">
        <h2 className="text-lcars-accent1 text-xl font-medium mb-3">Media Appearances</h2>
        <p className="text-lcars-text">Documented appearances of {ship.name} across Star Trek media.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* TV Series */}
        {appearances.series && appearances.series.length > 0 && (
          <div className="bg-black/40 border-l-4 border-lcars-accent2 p-4 rounded-r-md">
            <h3 className="text-lcars-accent2 font-medium mb-3 flex items-center">
              <Tv className="h-4 w-4 mr-2" />
              Television Series
            </h3>
            <ul className="space-y-2">
              {appearances.series.map((series, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center"
                >
                  <div className="h-2 w-2 bg-lcars-accent2 rounded-full mr-3"></div>
                  <span className="text-lcars-text">{series}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        )}

        {/* Films */}
        {appearances.films && appearances.films.length > 0 && (
          <div className="bg-black/40 border-l-4 border-lcars-accent3 p-4 rounded-r-md">
            <h3 className="text-lcars-accent3 font-medium mb-3 flex items-center">
              <Film className="h-4 w-4 mr-2" />
              Feature Films
            </h3>
            <ul className="space-y-2">
              {appearances.films.map((film, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center"
                >
                  <div className="h-2 w-2 bg-lcars-accent3 rounded-full mr-3"></div>
                  <span className="text-lcars-text">{film}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Episodes */}
      {appearances.episodes && appearances.episodes.length > 0 && (
        <div className="bg-black/40 border-l-4 border-lcars-frame p-4 rounded-r-md">
          <h3 className="text-lcars-frame font-medium mb-3 flex items-center">
            <Tv className="h-4 w-4 mr-2" />
            Notable Episodes
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
            {appearances.episodes.map((episode, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.05 }}
                className="bg-black/30 border border-lcars-frame/30 p-2 rounded-md"
              >
                <div className="flex items-center">
                  <Badge variant="outline" className="border-lcars-frame/50 text-lcars-frame text-xs mr-2">
                    {episode.split('"')[0].trim()}
                  </Badge>
                  <span className="text-lcars-text text-sm">"{episode.split('"')[1]}"</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Books */}
        {appearances.books && appearances.books.length > 0 && (
          <div className="bg-black/40 border-l-4 border-lcars-accent1 p-4 rounded-r-md">
            <h3 className="text-lcars-accent1 font-medium mb-3 flex items-center">
              <Book className="h-4 w-4 mr-2" />
              Books & Novels
            </h3>
            <ul className="space-y-2">
              {appearances.books.map((book, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center"
                >
                  <div className="h-2 w-2 bg-lcars-accent1 rounded-full mr-3"></div>
                  <span className="text-lcars-text">{book}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        )}

        {/* Games */}
        {appearances.games && appearances.games.length > 0 && (
          <div className="bg-black/40 border-l-4 border-lcars-accent2 p-4 rounded-r-md">
            <h3 className="text-lcars-accent2 font-medium mb-3 flex items-center">
              <Gamepad className="h-4 w-4 mr-2" />
              Video Games
            </h3>
            <ul className="space-y-2">
              {appearances.games.map((game, index) => (
                <motion.li
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="flex items-center"
                >
                  <div className="h-2 w-2 bg-lcars-accent2 rounded-full mr-3"></div>
                  <span className="text-lcars-text">{game}</span>
                </motion.li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Behind the scenes */}
      <div className="bg-black/40 border-l-4 border-lcars-accent3 p-4 rounded-r-md">
        <h3 className="text-lcars-accent3 font-medium mb-3">Behind the Scenes</h3>
        <p className="text-lcars-text">{getBehindTheScenes(ship)}</p>
      </div>
    </div>
  )
}

// Helper function to generate appearances based on ship data
function generateAppearances(ship: Starship) {
  const appearances: any = {
    series: [],
    films: [],
    episodes: [],
    books: [],
    games: [],
  }

  // Generate based on ship name and era
  if (ship.name === "USS Enterprise" && ship.registry === "NCC-1701") {
    appearances.series = ["Star Trek: The Original Series", "Star Trek: The Animated Series"]
    appearances.films = [
      "Star Trek: The Motion Picture (1979)",
      "Star Trek II: The Wrath of Khan (1982)",
      "Star Trek III: The Search for Spock (1984)",
    ]
    appearances.episodes = [
      'TOS "Where No Man Has Gone Before"',
      'TOS "The Corbomite Maneuver"',
      'TOS "Balance of Terror"',
      'TOS "Space Seed"',
      'TOS "The City on the Edge of Forever"',
      'TOS "Mirror, Mirror"',
    ]
    appearances.books = [
      "Star Trek: The Motion Picture (novelization)",
      "Star Trek: The Entropy Effect",
      "Star Trek: Vulcan's Glory",
    ]
    appearances.games = [
      "Star Trek: Strategic Operations Simulator",
      "Star Trek: 25th Anniversary",
      "Star Trek: Bridge Commander",
    ]
  } else if (ship.name === "USS Enterprise-A") {
    appearances.series = []
    appearances.films = [
      "Star Trek IV: The Voyage Home (1986)",
      "Star Trek V: The Final Frontier (1989)",
      "Star Trek VI: The Undiscovered Country (1991)",
    ]
    appearances.episodes = []
    appearances.books = [
      "Star Trek: In the Name of Honor",
      "Star Trek: Shadows on the Sun",
      "Star Trek: The Lost Years",
    ]
    appearances.games = ["Star Trek: Starfleet Academy", "Star Trek: Starfleet Command"]
  } else if (ship.name === "USS Enterprise-D") {
    appearances.series = ["Star Trek: The Next Generation"]
    appearances.films = ["Star Trek Generations (1994)"]
    appearances.episodes = [
      'TNG "Encounter at Farpoint"',
      'TNG "The Best of Both Worlds"',
      'TNG "Yesterday\'s Enterprise"',
      'TNG "All Good Things..."',
      'TNG "The Inner Light"',
      'TNG "Chain of Command"',
    ]
    appearances.books = ["Star Trek: Imzadi", "Star Trek: Q-Squared", "Star Trek: All Good Things..."]
    appearances.games = [
      "Star Trek: The Next Generation - A Final Unity",
      "Star Trek: Bridge Commander",
      "Star Trek: Armada",
    ]
  } else if (ship.name === "USS Defiant" && ship.registry === "NX-74205") {
    appearances.series = ["Star Trek: Deep Space Nine"]
    appearances.films = ["Star Trek: First Contact (1996) (cameo)"]
    appearances.episodes = [
      'DS9 "The Search"',
      'DS9 "Defiant"',
      'DS9 "The Way of the Warrior"',
      'DS9 "Paradise Lost"',
      'DS9 "For the Uniform"',
      'DS9 "The Changing Face of Evil"',
    ]
    appearances.books = ["Star Trek: The Fall of Terok Nor", "Star Trek: Hollow Men", "Star Trek: Millennium"]
    appearances.games = ["Star Trek: Deep Space Nine - Dominion Wars", "Star Trek: Legacy", "Star Trek Online"]
  } else if (ship.name === "USS Voyager") {
    appearances.series = ["Star Trek: Voyager"]
    appearances.films = []
    appearances.episodes = [
      'VOY "Caretaker"',
      'VOY "Scorpion"',
      'VOY "Year of Hell"',
      'VOY "Timeless"',
      'VOY "Equinox"',
      'VOY "Endgame"',
    ]
    appearances.books = [
      "Star Trek: Voyager - Homecoming",
      "Star Trek: Voyager - The Farther Shore",
      "Star Trek: String Theory",
    ]
    appearances.games = ["Star Trek: Voyager - Elite Force", "Star Trek: Armada II", "Star Trek Online"]
  } else if (ship.name === "Enterprise" && ship.registry === "NX-01") {
    appearances.series = ["Star Trek: Enterprise"]
    appearances.films = []
    appearances.episodes = [
      'ENT "Broken Bow"',
      'ENT "The Expanse"',
      'ENT "Azati Prime"',
      'ENT "Zero Hour"',
      'ENT "These Are the Voyages..."',
    ]
    appearances.books = [
      "Star Trek: Enterprise - The Good That Men Do",
      "Star Trek: Enterprise - Kobayashi Maru",
      "Star Trek: Enterprise - The Romulan War",
    ]
    appearances.games = ["Star Trek: Legacy", "Star Trek Online"]
  } else {
    // Generic appearances for other ships
    if (ship.era === "TOS") {
      appearances.series = ["Star Trek: The Original Series"]
    } else if (ship.era === "TNG") {
      appearances.series = ["Star Trek: The Next Generation"]
    } else if (ship.era === "DS9") {
      appearances.series = ["Star Trek: Deep Space Nine"]
    } else if (ship.era === "VOY") {
      appearances.series = ["Star Trek: Voyager"]
    } else if (ship.era === "ENT") {
      appearances.series = ["Star Trek: Enterprise"]
    }

    appearances.episodes = ["Various background appearances"]
    appearances.books = ["Referenced in various Star Trek novels"]
    appearances.games = ["Star Trek Online"]
  }

  return appearances
}

// Helper function to get behind the scenes information
function getBehindTheScenes(ship: Starship): string {
  if (ship.name === "USS Enterprise" && ship.registry === "NCC-1701") {
    return "The original USS Enterprise was designed by Matt Jefferies. The ship's iconic silhouette has become one of the most recognizable designs in science fiction. The original filming model was recently restored and is displayed at the Smithsonian National Air and Space Museum."
  } else if (ship.name === "USS Enterprise-D") {
    return "The Enterprise-D was designed by Andrew Probert. The ship's sleek lines and circular saucer section represented a significant departure from previous starship designs. The six-foot filming model was built by Industrial Light & Magic and cost over $75,000 to construct in 1987."
  } else if (ship.name === "USS Defiant" && ship.registry === "NX-74205") {
    return "The USS Defiant was designed by Jim Martin as a compact warship, deliberately breaking from Starfleet's traditional design philosophy. The ship was introduced in the third season of Deep Space Nine to give the station-based show more mobility for storytelling."
  } else if (ship.name === "USS Voyager") {
    return "Voyager was designed by Rick Sternbach and Richard James. Its streamlined design incorporated elements that would allow it to land on a planetary surface. The ship's variable geometry warp nacelles were a distinctive feature that set it apart from previous Starfleet vessels."
  } else if (ship.name === "Enterprise" && ship.registry === "NX-01") {
    return "The NX-01 was designed by Doug Drexler. Its design was meant to bridge the gap between modern NASA spacecraft and the original Enterprise, with a more utilitarian and practical appearance than later Starfleet vessels."
  } else {
    return `The ${ship.class} class design represents the aesthetic and technological philosophy of ${ship.affiliation} shipbuilding during the ${ship.era} era.`
  }
}
