import {
  createShipTemplate,
  createFederationShipTemplate,
  createKlingonShipTemplate,
  createRomulanShipTemplate,
} from "./ship-template"
import type { Starship } from "@/types/starship"

/**
 * Example of adding a new Federation ship using the basic template
 */
export function createExampleFederationShip(): Starship {
  // Create a basic template for a new ship
  const newShip = createShipTemplate("ncc-1764", "USS Defiant", "Constitution", "Federation Starfleet", "TOS")

  // Customize the template with specific details
  newShip.registry = "NCC-1764"
  newShip.launched = "2268"
  newShip.status = "Destroyed (2268)"
  newShip.stats.crew = 430
  newShip.stats.length_m = 289
  newShip.info =
    "The USS Defiant (NCC-1764) was a Constitution-class starship that disappeared in 2268 while investigating spatial interphase in the Tholian sector."
  newShip.history =
    "The Defiant was lost in a spatial interphase between our universe and another dimension. The crew went insane and killed each other, and the ship was later encountered by the USS Enterprise."
  newShip.notable_features = ["First Federation ship to encounter spatial interphase", "Lost with all hands in 2268"]
  newShip.notable_missions = ["Investigation of spatial interphase in Tholian space (2268)"]
  newShip.captains = ["Unknown"]

  return newShip
}

/**
 * Example of adding a new Federation ship using the Federation-specific template
 */
export function createExampleFederationShipWithTemplate(): Starship {
  // Create a Federation ship template with era-specific defaults
  const newShip = createFederationShipTemplate("ncc-80102", "USS Titan", "Luna", "TNG Films", "NCC-80102")

  // Customize only what's needed - other fields already have sensible defaults
  newShip.launched = "2379"
  newShip.stats.crew = 350
  newShip.stats.length_m = 450
  newShip.info =
    "The USS Titan (NCC-80102) was a Luna-class starship commanded by Captain William T. Riker following his promotion from the USS Enterprise-E."
  newShip.history =
    "The Titan was launched in 2379 under the command of Captain William T. Riker, with a focus on deep-space exploration beyond Federation territory."
  newShip.notable_features = [
    "Advanced sensor arrays for deep space exploration",
    "Enhanced diplomatic facilities",
    "Multi-species crew with one of the most diverse crew complements in Starfleet",
  ]
  newShip.captains = ["William T. Riker (2379-)"]

  return newShip
}

/**
 * Example of adding a new Klingon ship using the Klingon-specific template
 */
export function createExampleKlingonShip(): Starship {
  // Create a Klingon ship template with Klingon-specific defaults
  const newShip = createKlingonShipTemplate("vor-cha-1", "IKS Bortas", "Vor'cha", "TNG")

  // Customize only what's needed - other fields already have sensible defaults
  newShip.launched = "2367"
  ;(newShip.stats.crew = 1), 900
  newShip.stats.length_m = 481
  newShip.info =
    "The IKS Bortas was a Vor'cha-class attack cruiser that served as Chancellor Gowron's flagship during the Klingon Civil War."
  newShip.history =
    "The Bortas served as Chancellor Gowron's flagship during the Klingon Civil War against the forces of the Duras family. It later participated in several key battles during the Dominion War."
  newShip.notable_features = [
    "Advanced cloaking device",
    "Enhanced disruptor arrays",
    "Flagship of the Klingon Chancellor",
  ]
  newShip.captains = ["Chancellor Gowron (2367-2375)"]

  return newShip
}

/**
 * Example of adding a new Romulan ship using the Romulan-specific template
 */
export function createExampleRomulanShip(): Starship {
  // Create a Romulan ship template with Romulan-specific defaults
  const newShip = createRomulanShipTemplate("valdore-1", "IRW Valdore", "Valdore-type", "TNG Films")

  // Customize only what's needed - other fields already have sensible defaults
  newShip.launched = "2379"
  newShip.stats.crew = 875
  newShip.stats.length_m = 603
  newShip.info =
    "The IRW Valdore was a Valdore-type warbird that participated in the battle against Shinzon's Scimitar in 2379."
  newShip.history =
    "The Valdore was commanded by Commander Donatra, who chose to ally with the USS Enterprise-E against Shinzon during his attempted coup of the Romulan Star Empire."
  newShip.notable_features = [
    "Advanced cloaking technology",
    "Enhanced plasma torpedo launchers",
    "More streamlined design compared to D'deridex-class",
  ]
  newShip.captains = ["Commander Donatra (as of 2379)"]

  return newShip
}

/**
 * How to add a new ship to the starships array:
 *
 * import { starships } from "@/data/starships";
 * import { createExampleFederationShip } from "@/utils/ship-examples";
 *
 * // Create a new ship
 * const newShip = createExampleFederationShip();
 *
 * // Add it to the starships array
 * starships.push(newShip);
 */
