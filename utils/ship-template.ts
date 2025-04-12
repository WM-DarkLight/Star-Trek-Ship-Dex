import type { Starship } from "@/types/starship"

/**
 * Creates a template for a new starship entry with default values
 * This makes it easier to add new ships to the database with consistent structure
 *
 * @param id Unique identifier for the ship
 * @param name Ship name
 * @param shipClass Ship class (e.g., "Constitution", "Galaxy")
 * @param affiliation Political entity the ship belongs to (e.g., "Federation Starfleet")
 * @param era Star Trek era (e.g., "TOS", "TNG", "DS9")
 * @returns A Starship object with default values that can be customized
 */
export function createShipTemplate(
  id: string,
  name: string,
  shipClass: string,
  affiliation: string,
  era: string,
): Starship {
  return {
    id,
    name,
    registry: "", // Add registry if applicable (e.g., "NCC-1701")
    class: shipClass,
    affiliation,
    era,
    launched: "", // Add launch year if known
    status: "Active", // Default status, change as needed
    stats: {
      hull: 5, // Default values on a scale of 1-10
      shields: 5,
      weapons: 5,
      speed: 5,
      maneuver: 5,
      crew: 0, // Update with actual crew complement
      length_m: 0, // Update with actual length in meters
      width_m: 0, // Optional
      height_m: 0, // Optional
      decks: 0, // Optional
      max_speed: "", // Optional (e.g., "Warp 9.6")
    },
    armaments: "", // Add weapons systems
    defenses: "", // Add defensive systems
    info: "", // Add general information about the ship
    history: "", // Add historical background
    notable_features: [], // Add list of notable features
    notable_missions: [], // Add list of notable missions
    captains: [], // Add list of captains
    placeholder_style: "", // Add placeholder style if needed
    imageUrl: "", // Add image URL if available
    technical_specs: {
      propulsion: "",
      computer_systems: "",
      sensors: "",
      communications: "",
      tactical_systems: "",
      auxiliary_craft: "",
      transporters: "",
      medical_facilities: "",
    },
    cultural_significance: "", // Add cultural significance
    related_ships: [], // Add related ships
    design_notes: "", // Add design notes

    // Optional fields for expanded lore
    service_history: {
      construction: "",
      commissioning: "",
      five_year_missions: [],
      major_refits: [],
      major_battles: [],
      decommissioning: "",
      legacy: "",
    },

    // Optional gallery for ship images
    gallery: [],

    // Optional fields for appearances in media
    appearances: {
      series: [],
      films: [],
      episodes: [],
      books: [],
      games: [],
    },

    // Optional senior officers information
    senior_officers: [],
  }
}

/**
 * Helper function to create a Federation ship template with era-specific defaults
 */
export function createFederationShipTemplate(
  id: string,
  name: string,
  shipClass: string,
  era: string,
  registry?: string,
): Starship {
  const ship = createShipTemplate(id, name, shipClass, "Federation Starfleet", era)

  if (registry) {
    ship.registry = registry
  }

  // Set era-specific defaults
  switch (era) {
    case "ENT":
      ship.stats = {
        ...ship.stats,
        hull: 4,
        shields: 0, // No shields, only polarized hull plating
        weapons: 4,
        speed: 5.2,
        maneuver: 7,
      }
      ship.defenses = "Polarized Hull Plating (no shields)"
      ship.armaments = "3 Phase Cannons, 6 Plasma Torpedo Launchers, Grappling Hook"
      ship.technical_specs = {
        propulsion:
          "Experimental Warp 5 engine with limited antimatter containment. Maximum sustainable speed of Warp 5.2.",
        computer_systems: "Early computer systems with limited voice recognition. Data storage via memory modules.",
        sensors: "Basic sensor arrays with limited range. Polarized hull plating instead of shields.",
        communications: "Subspace communications with limited range. Universal translator in early development stages.",
        tactical_systems:
          "Phase cannons and spatial torpedoes. Manual targeting systems with limited computer assistance.",
        auxiliary_craft: "Limited shuttlepod complement with minimal warp capability.",
        transporters:
          "Experimental transporter technology primarily used for cargo. Limited biological transport capabilities with significant safety concerns.",
        medical_facilities:
          "Basic sickbay with limited diagnostic equipment. Early versions of medical scanners and surgical tools.",
      }
      break

    case "TOS":
      ship.stats = {
        ...ship.stats,
        hull: 6,
        shields: 6,
        weapons: 6,
        speed: 8,
        maneuver: 6,
      }
      ship.defenses = "Deflector Shields"
      ship.armaments = "6 Phaser Banks, 2 Photon Torpedo Launchers"
      ship.technical_specs = {
        propulsion:
          "Matter/antimatter warp drive with dilithium crystal regulation. Maximum sustainable speed of Warp 8.",
        computer_systems:
          "Duotronic computer systems with voice interface capability. Data storage via isolinear tapes and memory banks.",
        sensors: "Standard long-range and short-range sensor arrays with limited subspace capabilities.",
        communications: "Subspace radio with limited range. Visual communication capabilities via viewscreen.",
        tactical_systems:
          "Phaser banks with manual targeting systems. Photon torpedo launchers with limited automated loading.",
        auxiliary_craft: "Standard shuttlecraft complement including Class F shuttles.",
        transporters: "Transporter systems with limited range and safety protocols. Six-person capacity.",
        medical_facilities: "Sickbay equipped with surgical beds, medical scanners, and basic emergency equipment.",
      }
      break

    case "TMP":
      ship.stats = {
        ...ship.stats,
        hull: 7,
        shields: 7,
        weapons: 7,
        speed: 8,
        maneuver: 6,
      }
      ship.defenses = "Enhanced Deflector Shields"
      ship.armaments = "18 Phaser Banks, 2 Photon Torpedo Launchers"
      ship.technical_specs = {
        propulsion:
          "Upgraded matter/antimatter warp drive with improved dilithium crystal regulation. Maximum sustainable speed of Warp 8, emergency speed of Warp 9.",
        computer_systems:
          "Advanced duotronic computer systems with enhanced voice recognition and processing capabilities.",
        sensors: "Upgraded long-range and short-range sensor arrays with improved subspace detection capabilities.",
        communications: "Enhanced subspace communications array with increased range and clarity.",
        tactical_systems:
          "Improved phaser banks with computer-assisted targeting. Enhanced photon torpedo launchers with automated loading systems.",
        auxiliary_craft:
          "Expanded shuttlecraft complement including travel pods and work bees for external operations.",
        transporters:
          "Enhanced transporter systems with improved safety protocols and biofilter technology. Six-person capacity.",
        medical_facilities:
          "Expanded sickbay with advanced diagnostic equipment, surgical suites, and intensive care units.",
      }
      break

    case "TNG":
    case "DS9":
    case "VOY":
      ship.stats = {
        ...ship.stats,
        hull: 8,
        shields: 8,
        weapons: 8,
        speed: 9.6,
        maneuver: 6,
      }
      ship.defenses = "Regenerative Shields"
      ship.armaments = "12 Type-10 Phaser Arrays, 3 Photon Torpedo Launchers (250+ torpedoes)"
      ship.technical_specs = {
        propulsion:
          "Advanced matter/antimatter warp drive with dilithium crystal articulation. Maximum sustainable speed of Warp 9.6, emergency speed of Warp 9.9.",
        computer_systems:
          "Bio-neural gel pack computer systems with isolinear processing and advanced voice recognition. Holographic interface capabilities.",
        sensors:
          "Multi-phasic sensor arrays with long-range subspace detection capabilities. Enhanced astrometric sensors.",
        communications:
          "Advanced subspace communications array with Federation-wide range capabilities. Secure channels and encryption protocols.",
        tactical_systems:
          "Type-X phaser arrays with automated targeting and firing solutions. Quantum and photon torpedo capabilities with rapid-fire launchers.",
        auxiliary_craft:
          "Multiple shuttlecraft types including Type-6, Type-8, and Type-9 shuttles. Captain's yacht on larger vessels.",
        transporters:
          "Enhanced transporter systems with pattern buffers, site-to-site transport capabilities, and emergency transport protocols. Eight-person capacity.",
        medical_facilities:
          "Advanced sickbay with EMH (Emergency Medical Hologram), surgical biobeds, and comprehensive medical database.",
      }
      break

    case "TNG Films":
      ship.stats = {
        ...ship.stats,
        hull: 9,
        shields: 9,
        weapons: 9,
        speed: 9.985,
        maneuver: 7,
      }
      ship.defenses = "Enhanced Regenerative Shields, Ablative Armor (later refits)"
      ship.armaments = "16 Type-XII Phaser Arrays, 10 Torpedo Launchers (Quantum and Photon), Quantum Torpedoes"
      ship.technical_specs = {
        propulsion:
          "State-of-the-art matter/antimatter warp drive with enhanced dilithium matrix. Maximum sustainable speed of Warp 9.985.",
        computer_systems:
          "Advanced bio-neural gel pack systems with quantum processing capabilities. Enhanced holographic interfaces.",
        sensors: "Multi-spectral sensor arrays with trans-phasic capabilities. Long-range subspace detection grid.",
        communications:
          "Quantum subspace communications array with enhanced security protocols and Federation-wide range.",
        tactical_systems:
          "Type-XII phaser arrays with automated targeting and adaptive firing patterns. Quantum torpedo launchers with rapid-fire capabilities.",
        auxiliary_craft:
          "Advanced shuttlecraft complement including Type-11 shuttles with enhanced defensive capabilities.",
        transporters:
          "Advanced transporter systems with enhanced pattern buffers, multi-person site-to-site capabilities, and emergency transport protocols. Ten-person capacity.",
        medical_facilities:
          "State-of-the-art medical facilities with EMH Mark IV, regenerative biobeds, and comprehensive xenobiology database.",
      }
      break
  }

  return ship
}

/**
 * Helper function to create a Klingon ship template with typical Klingon defaults
 */
export function createKlingonShipTemplate(id: string, name: string, shipClass: string, era: string): Starship {
  const ship = createShipTemplate(id, name, shipClass, "Klingon Empire", era)

  // Set typical Klingon ship defaults
  ship.stats.weapons = 8 // Klingons prioritize weapons
  ship.stats.maneuver = 9 // Generally good maneuverability
  ship.stats.hull = 5 // Sturdy construction
  ship.stats.shields = 5 // Decent shields
  ship.stats.speed = 9 // Good speed

  // Add typical Klingon systems
  ship.defenses = "Standard Shields, Cloaking Device"
  ship.armaments = "Disruptor Cannons (wing-mounted), Photon Torpedo Launcher"

  // Add typical Klingon technical specs
  ship.technical_specs = {
    propulsion: "Standard Klingon warp drive with enhanced maneuverability. Maximum sustainable speed of Warp 9.6.",
    computer_systems: "Klingon military computer systems with tactical focus.",
    sensors: "Advanced sensor arrays with enhanced targeting capabilities.",
    communications: "Secure subspace communications array with encryption protocols.",
    tactical_systems:
      "Wing-mounted disruptor cannons with rapid-fire capabilities. Torpedo launcher with photon torpedo compatibility.",
    auxiliary_craft: "Limited shuttle complement.",
    transporters: "Standard Klingon transporter systems. Four-person capacity.",
    medical_facilities: "Basic medical facilities focused on combat trauma treatment.",
  }

  return ship
}

/**
 * Helper function to create a Romulan ship template with typical Romulan defaults
 */
export function createRomulanShipTemplate(id: string, name: string, shipClass: string, era: string): Starship {
  const ship = createShipTemplate(id, name, shipClass, "Romulan Star Empire", era)

  // Set typical Romulan ship defaults
  ship.stats.shields = 9 // Strong shields
  ship.stats.weapons = 8 // Good weapons
  ship.stats.hull = 9 // Solid construction
  ship.stats.maneuver = 3 // Less maneuverable
  ship.stats.speed = 9.6 // Good speed

  // Add typical Romulan systems
  ship.defenses = "High-Capacity Shields, Cloaking Device"
  ship.armaments = "Multiple Disruptor Arrays, Plasma Torpedo Launchers"

  // Add typical Romulan technical specs
  ship.technical_specs = {
    propulsion:
      "Artificial quantum singularity power core with standard warp drive. Maximum sustainable speed of Warp 9.6.",
    computer_systems: "Advanced Romulan computer systems with enhanced security protocols.",
    sensors: "Long-range sensor arrays with enhanced subspace detection capabilities.",
    communications: "Secure subspace communications array with advanced encryption protocols.",
    tactical_systems:
      "Multiple disruptor arrays with automated targeting. Plasma torpedo launchers with enhanced yield capabilities.",
    auxiliary_craft: "Standard Romulan shuttle complement.",
    transporters: "Advanced transporter systems with enhanced security protocols. Six-person capacity.",
    medical_facilities: "Well-equipped medical facilities with advanced medical technology.",
  }

  return ship
}

/**
 * Example of how to create a complete ship entry using the template
 *
 * // Create a new Federation ship
 * const enterprise = createFederationShipTemplate(
 *   "ncc-1701",
 *   "USS Enterprise",
 *   "Constitution",
 *   "TOS",
 *   "NCC-1701"
 * );
 *
 * // Add specific details
 * enterprise.launched = "2245";
 * enterprise.status = "Destroyed (self-destruct, 2285)";
 * enterprise.stats.crew = 430;
 * enterprise.stats.length_m = 289;
 * enterprise.stats.width_m = 132;
 * enterprise.stats.height_m = 73;
 * enterprise.stats.decks = 23;
 * enterprise.stats.max_speed = "Warp 8";
 *
 * // Add detailed information
 * enterprise.info = "The USS Enterprise (NCC-1701) was a Constitution-class starship operated by Starfleet in the 23rd century...";
 * enterprise.history = "Under Captain Kirk's command, the Enterprise completed an unprecedented five-year mission...";
 *
 * // Add notable features and missions
 * enterprise.notable_features = [
 *   "Original Constitution-class design",
 *   "Underwent significant refit in 2270s",
 *   "First Federation starship to visit numerous regions of space",
 * ];
 * enterprise.notable_missions = [
 *   "First contact with the First Federation (2266)",
 *   "Time travel to Earth, 1968 (Operation: Retrieval)",
 *   "Discovery of Omicron Ceti III colony (2267)",
 *   "Encounter with Khan Noonien Singh (2267)",
 * ];
 *
 * // Add captains
 * enterprise.captains = [
 *   "Robert April (2245-2250)",
 *   "Christopher Pike (2250-2265)",
 *   "James T. Kirk (2265-2270, 2273-2285)",
 * ];
 *
 * // Add visual information
 * enterprise.placeholder_style = "placeholder-constitution";
 * enterprise.imageUrl = "https://static.wikia.nocookie.net/memoryalpha/images/a/a8/USS_Enterprise_quarter.jpg/revision/latest?cb=20070414201142&path-prefix=en";
 *
 * // Add cultural significance and related ships
 * enterprise.cultural_significance = "The USS Enterprise NCC-1701 is perhaps the most famous starship in Federation history...";
 * enterprise.related_ships = [
 *   "USS Enterprise (NCC-1701-A) - Constitution-class refit",
 *   "USS Enterprise (NCC-1701-B) - Excelsior-class",
 *   "USS Enterprise (NCC-1701-C) - Ambassador-class",
 *   "USS Enterprise (NCC-1701-D) - Galaxy-class",
 *   "USS Constellation (NCC-1017) - Constitution-class",
 * ];
 *
 * // Add design notes
 * enterprise.design_notes = "The Constitution-class represented the pinnacle of Federation technology in the mid-23rd century...";
 */
