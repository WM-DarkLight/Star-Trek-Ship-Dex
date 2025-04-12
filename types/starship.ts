/**
 * Starship interface defining the structure of starship data
 * This can be extended with additional properties as needed
 */
export interface Starship {
  id: string // Unique identifier for the ship
  name: string // Ship name
  registry?: string // Registry number (e.g., NCC-1701)
  class: string // Ship class (e.g., Constitution, Galaxy)
  affiliation: string // Political entity the ship belongs to
  era: string // Star Trek era (TOS, TNG, DS9, VOY, ENT, etc.)
  launched?: string // Year the ship was launched
  status?: string // Current status (Active, Destroyed, Decommissioned)

  // Technical specifications
  stats: {
    hull: number // Hull strength (1-10 scale)
    shields: number // Shield strength (1-10 scale)
    weapons: number // Weapons power (1-10 scale)
    speed: number // Maximum warp speed
    maneuver: number // Maneuverability (1-10 scale)
    crew: string | number // Crew complement
    length_m: string | number // Length in meters
    width_m?: string | number // Width in meters
    height_m?: string | number // Height in meters
    decks?: number // Number of decks
    max_speed?: string // Maximum speed (formatted)
    [key: string]: any // Allow for additional stats
  }

  // Weapons and defensive systems
  armaments: string
  defenses?: string // Additional defensive systems

  // Historical and technical information
  info: string // General information
  history?: string // Historical background
  notable_features?: string[] // List of notable features
  notable_missions?: string[] // List of notable missions
  captains?: string[] // List of captains who commanded the ship

  // Wiki-like expanded lore sections
  technical_specs?: {
    propulsion?: string
    computer_systems?: string
    sensors?: string
    communications?: string
    tactical_systems?: string
    auxiliary_craft?: string
    transporters?: string
    medical_facilities?: string
    [key: string]: string | undefined
  }

  service_history?: {
    construction?: string
    commissioning?: string
    five_year_missions?: string[]
    major_refits?: { year: string; description: string }[]
    major_battles?: { year: string; name: string; outcome: string }[]
    decommissioning?: string
    legacy?: string
  }

  design_notes?: string
  cultural_significance?: string

  // Crew information beyond captains
  senior_officers?: {
    name: string
    rank: string
    position: string
    species: string
    years_served: string
    notable_achievements?: string
  }[]

  // Media appearances
  appearances?: {
    series?: string[]
    films?: string[]
    episodes?: string[]
    books?: string[]
    games?: string[]
  }

  // References to other ships or related content
  related_ships?: string[]
  see_also?: string[]

  // Visual representation
  placeholder_style?: string
  imageUrl?: string
  gallery?: { url: string; caption: string }[]
}

/**
 * Ship eras in Star Trek chronology
 */
export enum StarTrekEra {
  ENT = "ENT", // Enterprise (2150s)
  TOS = "TOS", // The Original Series (2260s)
  TMP = "TMP", // The Motion Picture era (2270s-2290s)
  TNG = "TNG", // The Next Generation (2360s-2370s)
  DS9 = "DS9", // Deep Space Nine (2370s)
  VOY = "VOY", // Voyager (2370s)
  TNG_FILMS = "TNG Films", // TNG Films (2370s-2380s)
  LD = "LD", // Lower Decks (2380s)
  PIC = "PIC", // Picard (2390s-2400s)
  DIS = "DIS", // Discovery (2250s/3190s)
  SNW = "SNW", // Strange New Worlds (2250s)
}

/**
 * Major political entities in Star Trek
 */
export enum Affiliation {
  FEDERATION = "Federation Starfleet",
  KLINGON = "Klingon Empire",
  ROMULAN = "Romulan Star Empire",
  CARDASSIAN = "Cardassian Union",
  DOMINION = "Dominion",
  BORG = "Borg Collective",
  VULCAN = "Vulcan High Command",
  EARTH = "United Earth Starfleet",
  BAJORAN = "Bajoran Republic",
  FERENGI = "Ferengi Alliance",
}
