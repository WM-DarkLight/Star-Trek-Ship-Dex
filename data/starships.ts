import type { Starship } from "@/types/starship"

/**
 * Comprehensive starship database with detailed technical specifications
 * and historical information for each vessel.
 *
 * This data structure is designed to be easily extendable:
 * - Add new ships by following the existing pattern
 * - Add new properties to the Starship interface and update ships as needed
 * - Group ships by era, affiliation, or class for easier management
 */
export const starships: Starship[] = [
  // ==================== FEDERATION SHIPS - TOS ERA ====================
  {
    id: "ncc-1701",
    name: "USS Enterprise",
    registry: "NCC-1701",
    class: "Constitution",
    affiliation: "Federation Starfleet",
    era: "TOS",
    launched: "2245",
    status: "Destroyed (self-destruct, 2285)",
    stats: {
      hull: 6,
      shields: 6,
      weapons: 6,
      speed: 8,
      maneuver: 6,
      crew: 430,
      length_m: 289,
      width_m: 132,
      height_m: 73,
      decks: 23,
      max_speed: "Warp 8",
    },
    armaments: "6 Phaser Banks, 2 Photon Torpedo Launchers",
    defenses: "Deflector Shields",
    info: "The USS Enterprise (NCC-1701) was a Constitution-class starship operated by Starfleet in the 23rd century. It was commanded by Captain James T. Kirk during its historic five-year mission from 2265 to 2270, and became one of the most celebrated vessels in the fleet.",
    history:
      "Under Captain Kirk's command, the Enterprise completed an unprecedented five-year mission of deep space exploration, making first contact with numerous species and expanding Federation knowledge of the galaxy. The ship was eventually destroyed in 2285 to prevent its capture by Klingon forces.",
    notable_features: [
      "Original Constitution-class design",
      "Underwent significant refit in 2270s",
      "First Federation starship to visit numerous regions of space",
    ],
    notable_missions: [
      "First contact with the First Federation (2266)",
      "Time travel to Earth, 1968 (Operation: Retrieval)",
      "Discovery of Omicron Ceti III colony (2267)",
      "Encounter with Khan Noonien Singh (2267)",
    ],
    captains: ["Robert April (2245-2250)", "Christopher Pike (2250-2265)", "James T. Kirk (2265-2270, 2273-2285)"],
    placeholder_style: "placeholder-constitution",
    imageUrl:
      "https://static.wikia.nocookie.net/memoryalpha/images/a/a8/USS_Enterprise_quarter.jpg/revision/latest?cb=20070414201142&path-prefix=en",
    technical_specs: {
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
    },
    cultural_significance:
      "The USS Enterprise NCC-1701 is perhaps the most famous starship in Federation history, representing humanity's drive for exploration and peaceful contact with new civilizations. Its five-year mission under Captain James T. Kirk has become legendary, with the ship's exploits taught at Starfleet Academy and its design serving as the template for generations of exploration vessels that followed.",
    related_ships: [
      "USS Enterprise (NCC-1701-A) - Constitution-class refit",
      "USS Enterprise (NCC-1701-B) - Excelsior-class",
      "USS Enterprise (NCC-1701-C) - Ambassador-class",
      "USS Enterprise (NCC-1701-D) - Galaxy-class",
      "USS Constellation (NCC-1017) - Constitution-class",
    ],
    design_notes:
      "The Constitution-class represented the pinnacle of Federation technology in the mid-23rd century. Designed primarily for deep space exploration, these vessels were also equipped for diplomatic missions, scientific research, and defensive combat operations. The distinctive saucer and dual nacelle configuration established the standard for Starfleet vessel design for over a century.",
  },
  {
    id: "ncc-1701-a",
    name: "USS Enterprise-A",
    registry: "NCC-1701-A",
    class: "Constitution-II (Refit)",
    affiliation: "Federation Starfleet",
    era: "TMP",
    launched: "2286",
    status: "Decommissioned (2293)",
    stats: {
      hull: 7,
      shields: 7,
      weapons: 7,
      speed: 8,
      maneuver: 6,
      crew: 430,
      length_m: 305,
      width_m: 141,
      height_m: 78,
      decks: 23,
      max_speed: "Warp 8",
    },
    armaments: "18 Phaser Banks, 2 Photon Torpedo Launchers",
    defenses: "Enhanced Deflector Shields",
    info: "The USS Enterprise (NCC-1701-A) was a Constitution-class refit starship that served as the flagship of Starfleet in the late 23rd century. It was the second Federation starship to bear the name Enterprise.",
    history:
      "Commissioned in 2286 following the destruction of the original Enterprise, this vessel served as Captain Kirk's command until its decommissioning in 2293. It played a crucial role in establishing peace with the Klingon Empire at the Khitomer Conference.",
    notable_features: [
      "Advanced Constitution-class refit design",
      "Improved weapons and defensive systems",
      "Enhanced warp drive efficiency",
    ],
    notable_missions: [
      "Voyage to the center of the galaxy (2287)",
      "Rescue of Federation, Klingon, and Romulan diplomats from Nimbus III",
      "Khitomer Peace Conference and conspiracy thwarting (2293)",
    ],
    captains: ["James T. Kirk (2286-2293)"],
    placeholder_style: "placeholder-constitution",
    imageUrl:
      "https://static.wikia.nocookie.net/memoryalpha/images/8/8d/USS_Enterprise-A_quarter.jpg/revision/latest?cb=20070414201142&path-prefix=en",
    technical_specs: {
      propulsion:
        "Upgraded matter/antimatter warp drive with improved dilithium crystal regulation. Maximum sustainable speed of Warp 8, emergency speed of Warp 9.",
      computer_systems:
        "Advanced duotronic computer systems with enhanced voice recognition and processing capabilities.",
      sensors: "Upgraded long-range and short-range sensor arrays with improved subspace detection capabilities.",
      communications: "Enhanced subspace communications array with increased range and clarity.",
      tactical_systems:
        "Improved phaser banks with computer-assisted targeting. Enhanced photon torpedo launchers with automated loading systems.",
      auxiliary_craft: "Expanded shuttlecraft complement including travel pods and work bees for external operations.",
      transporters:
        "Enhanced transporter systems with improved safety protocols and biofilter technology. Six-person capacity.",
      medical_facilities:
        "Expanded sickbay with advanced diagnostic equipment, surgical suites, and intensive care units.",
    },
    cultural_significance:
      "The Enterprise-A symbolized the Federation's commitment to exploration even in times of political tension. As the successor to the legendary original Enterprise, it carried forward the legacy of its predecessor while serving as a vessel of peace during the critical period of Federation-Klingon rapprochement.",
    related_ships: [
      "USS Enterprise (NCC-1701) - Constitution-class",
      "USS Enterprise (NCC-1701-B) - Excelsior-class",
      "USS Excelsior (NCC-2000) - Excelsior-class",
    ],
    design_notes:
      "The Constitution-class refit represented a significant technological upgrade over the original design, with nearly every major system replaced or enhanced. While maintaining the iconic silhouette of the original, the refit featured a more streamlined hull, redesigned warp nacelles with new Bussard collectors, and a completely overhauled interior.",
  },

  // ==================== FEDERATION SHIPS - TNG ERA ====================
  {
    id: "ncc-1701-d",
    name: "USS Enterprise-D",
    registry: "NCC-1701-D",
    class: "Galaxy",
    affiliation: "Federation Starfleet",
    era: "TNG",
    launched: "2363",
    status: "Destroyed (2371)",
    stats: {
      hull: 9,
      shields: 9,
      weapons: 8,
      speed: 9.6,
      maneuver: 4,
      crew: 1014,
      length_m: 642.5,
      width_m: 467.1,
      height_m: 137.5,
      decks: 42,
      max_speed: "Warp 9.6 (sustainable), Warp 9.8 (maximum)",
    },
    armaments: "12 Type-10 Phaser Arrays, 3 Photon Torpedo Launchers (250+ torpedoes)",
    defenses: "High Capacity Shields, Saucer Separation",
    info: "The USS Enterprise (NCC-1701-D) was a Galaxy-class starship and the flagship of Starfleet during the mid-to-late 24th century. Under the command of Captain Jean-Luc Picard, it represented the pinnacle of Starfleet technology and served as a symbol of Federation exploration and diplomacy.",
    history:
      "Launched in 2363, the Enterprise-D served as the Federation flagship for eight years. During this time, it made first contact with over 30 species, including the Borg, and played a crucial role in numerous diplomatic missions. The ship was destroyed in 2371 following an attack by a Klingon Bird-of-Prey that caused a warp core breach, though the saucer section was successfully separated and crash-landed on Veridian III.",
    notable_features: [
      "Saucer separation capability",
      "Families and civilians aboard",
      "Extensive scientific research facilities",
      "Holodeck technology",
    ],
    notable_missions: [
      "First contact with Q entity (2364)",
      "First Federation-Borg encounter (2365)",
      "Klingon Civil War mediation (2367-2368)",
      "Discovery of Dyson Sphere (2369)",
    ],
    captains: [
      "Jean-Luc Picard (2363-2371)",
      "Edward Jellico (temporarily, 2369)",
      "William T. Riker (temporarily, various occasions)",
    ],
    placeholder_style: "placeholder-galaxy",
    imageUrl:
      "https://static.wikia.nocookie.net/memoryalpha/images/8/8c/USS_Enterprise-D%2C_TNG_Season_3-7.jpg/revision/latest?cb=20160203203647&path-prefix=en",
    technical_specs: {
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
    },
    cultural_significance:
      "The Enterprise-D represented a new philosophy in Starfleet vessel design, incorporating families and civilian specialists as part of its permanent crew complement. This reflected the Federation's confidence and optimism during a period of relative peace. The ship became a symbol of diplomacy and scientific discovery, with its missions frequently involving peaceful contact and cultural exchange rather than military engagements.",
    related_ships: [
      "USS Enterprise (NCC-1701-C) - Ambassador-class",
      "USS Enterprise (NCC-1701-E) - Sovereign-class",
      "USS Yamato (NCC-71807) - Galaxy-class",
      "USS Galaxy (NCC-70637) - Galaxy-class",
    ],
    design_notes:
      "The Galaxy-class starship was designed as a multi-purpose vessel capable of extended deep-space exploration missions. With a projected operational lifetime of 100 years, these ships were built for comfort as well as function, featuring spacious crew quarters, extensive recreational facilities, and even areas for families. The distinctive saucer section could separate from the engineering hull during emergency situations, effectively creating two independent spacecraft.",
  },
  {
    id: "nx-74205",
    name: "USS Defiant",
    registry: "NX-74205",
    class: "Defiant",
    affiliation: "Federation Starfleet",
    era: "DS9",
    launched: "2370",
    status: "Destroyed (2375)",
    stats: {
      hull: 7,
      shields: 7,
      weapons: 9,
      speed: 9.5,
      maneuver: 9,
      crew: 50,
      length_m: 170.68,
      width_m: 134.11,
      height_m: 30.1,
      decks: 4,
      max_speed: "Warp 9.5",
    },
    armaments: "4 Pulse Phaser Cannons, 6 Torpedo Launchers (Quantum and Photon), Ablative Armor",
    defenses: "Regenerative Shields, Ablative Armor, Cloaking Device (on loan from Romulan Empire)",
    info: "The USS Defiant (NX-74205) was a Defiant-class starship and the first of its class, originally developed to combat the Borg threat. Compact and heavily armed, it was described as a 'warship' rather than an explorer, representing a departure from traditional Starfleet design philosophy.",
    history:
      "Designed specifically to fight the Borg, the Defiant was assigned to Deep Space 9 in 2371 under Commander Benjamin Sisko. It served as the station's primary defense vessel during the Dominion War, participating in numerous battles. The original Defiant was destroyed by a Breen energy-dampening weapon in 2375 during the Second Battle of Chin'toka.",
    notable_features: [
      "First Starfleet vessel designed purely for combat",
      "Experimental ablative armor",
      "Romulan cloaking device (special dispensation)",
      "Quantum torpedo capability",
    ],
    notable_missions: [
      "First major Jem'Hadar engagement (2371)",
      "Infiltration of Klingon space during civil conflict (2372)",
      "Operation Return to recapture DS9 (2374)",
      "Multiple engagements in the Dominion War (2373-2375)",
    ],
    captains: ["Benjamin Sisko (2371-2375)", "Jadzia Dax (various missions)", "Worf (various missions)"],
    placeholder_style: "placeholder-defiant",
    imageUrl:
      "https://static.wikia.nocookie.net/memoryalpha/images/b/b4/USS_Defiant%2C_2375.jpg/revision/latest?cb=20120317185405&path-prefix=en",
    technical_specs: {
      propulsion: "Compact warp drive system optimized for combat maneuvers. Maximum sustainable speed of Warp 9.5.",
      computer_systems: "Streamlined computer systems with enhanced tactical processing capabilities.",
      sensors: "Advanced sensor arrays with enhanced targeting capabilities and subspace detection grid.",
      communications: "Secure subspace communications array with enhanced encryption protocols.",
      tactical_systems:
        "Pulse phaser cannons with rapid-fire capabilities. Multiple torpedo launchers with quantum torpedo compatibility.",
      auxiliary_craft: "Limited shuttlecraft complement due to space constraints.",
      transporters: "Standard transporter systems with enhanced security protocols. Four-person capacity.",
      medical_facilities:
        "Compact sickbay with limited but efficient medical facilities designed for combat casualties.",
    },
    cultural_significance:
      "The Defiant represented a significant shift in Starfleet philosophy, being the first Federation vessel designed explicitly for warfare rather than exploration. Its development and deployment signaled the Federation's recognition that peace could not always be maintained through diplomacy alone, especially in the face of existential threats like the Borg and later the Dominion.",
    related_ships: [
      "USS Valiant (NCC-74210) - Defiant-class",
      "USS São Paulo/Defiant (NCC-75633) - Defiant-class",
      "USS Sao Paulo (NCC-75633) - Defiant-class (renamed to Defiant after the original's destruction)",
    ],
    design_notes:
      "The Defiant-class represented a radical departure from traditional Starfleet design philosophy. Compact, heavily armed, and built solely for combat, these vessels sacrificed comfort and scientific capabilities for raw firepower and maneuverability. The original prototype suffered from structural integrity issues due to its overpowered engines, a problem that was corrected before the ship was assigned to Deep Space 9.",
  },
  {
    id: "nx-01",
    name: "Enterprise",
    registry: "NX-01",
    class: "NX",
    affiliation: "United Earth Starfleet",
    era: "ENT",
    launched: "2151",
    status: "Decommissioned (2161)",
    stats: {
      hull: 4,
      shields: 0,
      weapons: 4,
      speed: 5.2,
      maneuver: 7,
      crew: 83,
      length_m: 225,
      width_m: 135.8,
      height_m: 33.3,
      decks: 7,
      max_speed: "Warp 5.2",
    },
    armaments: "3 Phase Cannons, 6 Plasma Torpedo Launchers, Grappling Hook",
    defenses: "Polarized Hull Plating (no shields)",
    info: "The Enterprise (NX-01) was Earth's first warp 5 capable starship, launched in 2151 under the command of Captain Jonathan Archer. It represented humanity's first serious deep space exploration vessel and laid the groundwork for the later founding of the United Federation of Planets.",
    history:
      "The NX-01 was the prototype for Starfleet's NX-class of starships. Under Captain Archer, it embarked on a mission of exploration that eventually expanded to include preventing the Xindi from destroying Earth. The ship played a crucial role in the Earth-Romulan War and the formation of the Federation. It was decommissioned in 2161 following the signing of the Federation Charter.",
    notable_features: [
      "First Earth vessel with transporter rated for biological transport",
      "Polarized hull plating instead of shields",
      "Early phase cannons and torpedoes",
      "Experimental warp 5 engine",
    ],
    notable_missions: [
      "First contact with the Klingon Empire (2151)",
      "Discovery of the Temporal Cold War (2151-2154)",
      "Xindi crisis and prevention of Earth's destruction (2153-2154)",
      "Romulan drone ship incident (2154)",
    ],
    captains: ["Jonathan Archer (2151-2161)"],
    placeholder_style: "placeholder-nx",
    imageUrl:
      "https://static.wikia.nocookie.net/memoryalpha/images/4/41/Enterprise_NX-01%2C_ENT_Season_1-2.jpg/revision/latest?cb=20190323210856&path-prefix=en",
    technical_specs: {
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
    },
    cultural_significance:
      "The NX-01 Enterprise represents humanity's first bold steps into deep space exploration. As Earth's first true starship capable of extended interstellar travel, it symbolized mankind's determination to explore beyond our solar system and establish peaceful contact with alien civilizations. The ship's mission and crew laid the groundwork for what would eventually become the United Federation of Planets.",
    related_ships: [
      "Columbia (NX-02) - NX-class",
      "USS Franklin (NX-326) - Franklin-type",
      "USS Enterprise (NCC-1701) - Constitution-class (spiritual successor)",
    ],
    design_notes:
      "The NX-class represented the pinnacle of 22nd century human engineering, incorporating both Earth-developed technologies and those adapted from Vulcan designs. The ship featured a more utilitarian, submarine-like interior compared to later Starfleet vessels, reflecting its status as a pioneering vessel. Many of its design elements, including the saucer section and twin nacelle configuration, would influence Starfleet ship design for centuries to come.",
  },
  {
    id: "ncc-1701-e",
    name: "USS Enterprise-E",
    registry: "NCC-1701-E",
    class: "Sovereign",
    affiliation: "Federation Starfleet",
    era: "TNG Films",
    launched: "2372",
    status: "Active (as of 2379)",
    stats: {
      hull: 9,
      shields: 9,
      weapons: 9,
      speed: 9.985,
      maneuver: 7,
      crew: 855,
      length_m: 685.7,
      width_m: 250.6,
      height_m: 88.1,
      decks: 24,
      max_speed: "Warp 9.985",
    },
    armaments: "16 Type-XII Phaser Arrays, 10 Torpedo Launchers (Quantum and Photon), Quantum Torpedoes",
    defenses: "Enhanced Regenerative Shields, Ablative Armor (later refits)",
    info: "The USS Enterprise (NCC-1701-E) was a Sovereign-class starship launched in 2372 under the command of Captain Jean-Luc Picard. It was the sixth Federation starship to bear the name Enterprise and was built to replace the destroyed Enterprise-D.",
    history:
      "Commissioned in 2372, the Enterprise-E was initially kept away from the Borg invasion of 2373 due to concerns about Captain Picard's previous assimilation. However, it eventually joined the battle and pursued a Borg sphere back in time to 2063 to prevent the assimilation of Earth. The ship later confronted the Reman Praetor Shinzon in 2379, suffering heavy damage but ultimately prevailing.",
    notable_features: [
      "Advanced bioneural gel pack computer systems",
      "Quantum torpedo capability",
      "Emergency Medical Hologram",
      "Enhanced propulsion systems",
    ],
    notable_missions: [
      "Battle of Sector 001 and temporal incursion to 2063 (First Contact)",
      "Ba'ku relocation opposition (2375)",
      "Diplomatic mission to Romulus and battle with Shinzon (2379)",
    ],
    captains: ["Jean-Luc Picard (2372-2385)", "William T. Riker (temporarily, 2379)"],
    placeholder_style: "placeholder-galaxy",
    imageUrl:
      "https://static.wikia.nocookie.net/memoryalpha/images/5/52/USS_Enterprise-E%2C_Nemesis.jpg/revision/latest?cb=20200615171356&path-prefix=en",
    technical_specs: {
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
    },
    cultural_significance:
      "The Enterprise-E represented the Federation's resilience and technological advancement following the destruction of the Enterprise-D. Designed during a period of increasing threats from the Borg and other powers, it balanced the traditional exploration mission of Starfleet with enhanced defensive capabilities, symbolizing the Federation's determination to maintain its values even in challenging times.",
    related_ships: [
      "USS Enterprise (NCC-1701-D) - Galaxy-class",
      "USS Sovereign (NX-73811) - Sovereign-class",
      "USS Prometheus (NX-59650) - Prometheus-class",
    ],
    design_notes:
      "The Sovereign-class was designed as a replacement for the Galaxy-class as Starfleet's premier exploration vessel. More streamlined than its predecessor, with a darker hull coloration and less separation between the saucer and engineering sections, the Sovereign-class reflected a more pragmatic approach to starship design. While still primarily an exploration vessel, it incorporated significant tactical improvements developed in response to threats like the Borg.",
  },
  {
    id: "voyager",
    name: "USS Voyager",
    registry: "NCC-74656",
    class: "Intrepid",
    affiliation: "Federation Starfleet",
    era: "VOY",
    launched: "2371",
    status: "Active (returned to Alpha Quadrant in 2378)",
    stats: {
      hull: 7,
      shields: 8,
      weapons: 7,
      speed: 9.975,
      maneuver: 8,
      crew: 141,
      length_m: 344.5,
      width_m: 130.8,
      height_m: 63.1,
      decks: 15,
      max_speed: "Warp 9.975 (sustainable), Warp 9.985 (maximum)",
    },
    armaments: "13 Type-10 Phaser Arrays, 5 Torpedo Launchers, Photon and Quantum Torpedoes, Tricobalt Devices",
    defenses: "Regenerative Shields, Ablative Armor (added in 2378)",
    info: "The USS Voyager (NCC-74656) was an Intrepid-class starship launched in 2371. Under the command of Captain Kathryn Janeway, it was thrown 70,000 light-years into the Delta Quadrant by an entity known as the Caretaker and spent seven years journeying back to Federation space.",
    history:
      "Originally assigned to track down a Maquis vessel in the Badlands, Voyager was pulled into the Delta Quadrant by the Caretaker. With both Starfleet and Maquis crews combined, the ship began its 70,000 light-year journey home. During its seven-year voyage, Voyager made first contact with numerous species, including the Kazon, Vidiians, Hirogen, and Species 8472. The ship finally returned to Earth in 2378 using a Borg transwarp conduit.",
    notable_features: [
      "Bio-neural gel packs for computer systems",
      "Variable geometry warp nacelles",
      "Emergency Medical Hologram (serving as chief medical officer)",
      "Delta Flyer shuttle (constructed in 2375)",
      "Borg-enhanced technology (added during journey)",
    ],
    notable_missions: [
      "Stranding in the Delta Quadrant (2371)",
      "Multiple encounters with the Borg Collective",
      "First Federation contact with Species 8472",
      "Return to Alpha Quadrant via Borg transwarp network (2378)",
    ],
    captains: ["Kathryn Janeway (2371-2378)"],
    placeholder_style: "placeholder-intrepid",
    imageUrl:
      "https://static.wikia.nocookie.net/memoryalpha/images/5/50/USS_Voyager%2C_Endgame.jpg/revision/latest?cb=20190315151359&path-prefix=en",
    technical_specs: {
      propulsion: "Advanced warp drive with variable geometry nacelles. Maximum sustainable speed of Warp 9.975.",
      computer_systems: "Bio-neural gel pack computer systems with enhanced processing capabilities.",
      sensors: "Long-range sensor arrays with enhanced astrometric capabilities.",
      communications: "Advanced subspace communications array with limited range in Delta Quadrant.",
      tactical_systems:
        "Type-10 phaser arrays with automated targeting. Multiple torpedo launchers with limited torpedo complement.",
      auxiliary_craft: "Standard shuttlecraft complement plus custom-built Delta Flyer.",
      transporters:
        "Enhanced transporter systems with pattern buffers and site-to-site capabilities. Eight-person capacity.",
      medical_facilities: "Advanced sickbay with Emergency Medical Hologram serving as chief medical officer.",
    },
    cultural_significance:
      "Voyager's unprecedented journey through the unexplored Delta Quadrant represents one of Starfleet's greatest odysseys. The ship's successful return despite overwhelming odds became a testament to Starfleet ingenuity and determination. As the first Federation vessel to extensively explore the Delta Quadrant, Voyager significantly expanded the Federation's knowledge of that region and established first contact with numerous previously unknown species.",
    related_ships: [
      "USS Intrepid (NCC-74600) - Intrepid-class",
      "USS Bellerophon (NCC-74705) - Intrepid-class",
      "USS Equinox (NCC-72381) - Nova-class",
    ],
    design_notes:
      "The Intrepid-class was designed as a long-range science vessel with enhanced maneuverability. Its variable geometry warp nacelles were designed to prevent damage to subspace, reflecting Starfleet's increasing environmental consciousness. The ship incorporated numerous technological innovations, including bio-neural circuitry to speed up computer response time and the Emergency Medical Hologram, which would later become standard on Starfleet vessels.",
  },
  {
    id: "excelsior",
    name: "USS Excelsior",
    registry: "NCC-2000",
    class: "Excelsior",
    affiliation: "Federation Starfleet",
    era: "TMP / TNG",
    launched: "2285",
    status: "Active (at least until 2370s)",
    stats: {
      hull: 7,
      shields: 7,
      weapons: 7,
      speed: 9,
      maneuver: 5,
      crew: 750,
      length_m: 467,
      width_m: 186,
      height_m: 78,
      decks: 34,
      max_speed: "Transwarp (experimental), Warp 9 (after refit)",
    },
    armaments: "8 Phaser Banks, 3 Photon Torpedo Launchers",
    defenses: "Standard Deflector Shields",
    info: "The USS Excelsior (NCC-2000) was a Excelsior-class prototype starship first launched in 2285. Initially fitted with an experimental transwarp drive that ultimately failed, the ship went on to become one of the most successful starship designs in Starfleet history, with the class remaining in service for nearly a century.",
    history:
      "Originally conceived as the 'Great Experiment' to test the transwarp drive, the Excelsior was initially commanded by Captain Styles. After the failure of the transwarp experiment, the ship was refitted with a standard warp drive. Under Captain Hikaru Sulu, it participated in the Khitomer Peace Conference and played a key role in preventing the assassination of the Federation President. The Excelsior-class design became one of Starfleet's most successful, with many ships of this class serving well into the 24th century.",
    notable_features: [
      "Originally equipped with experimental transwarp drive",
      "Served as testbed for numerous Starfleet technologies",
      "One of the longest-serving starship designs",
    ],
    notable_missions: [
      "Transwarp development project (2285)",
      "Three-year cataloging mission in Beta Quadrant (2290-2293)",
      "Khitomer Peace Conference (2293)",
      "Rescue of Captain Kirk and Dr. McCoy from Klingon territory (2293)",
    ],
    captains: ["Lawrence Styles (2285)", "Hikaru Sulu (2290-2300s)"],
    placeholder_style: "placeholder-excelsior",
    imageUrl:
      "https://static.wikia.nocookie.net/memoryalpha/images/8/84/USS_Excelsior.jpg/revision/latest?cb=20100201041600&path-prefix=en",
    technical_specs: {
      propulsion:
        "Initially experimental transwarp drive, later refitted with standard warp drive. Maximum sustainable speed of Warp 9.",
      computer_systems: "Advanced duotronic computer systems with enhanced processing capabilities.",
      sensors: "Long-range sensor arrays with enhanced subspace detection capabilities.",
      communications: "Standard subspace communications array with Federation-wide range.",
      tactical_systems:
        "Multiple phaser banks with computer-assisted targeting. Photon torpedo launchers with automated loading systems.",
      auxiliary_craft: "Standard shuttlecraft complement.",
      transporters: "Standard transporter systems with enhanced safety protocols. Six-person capacity.",
      medical_facilities: "Well-equipped sickbay with standard medical facilities for a ship of its size.",
    },
    cultural_significance:
      "The Excelsior represented Starfleet's ambitious push toward new propulsion technologies in the late 23rd century. Though its transwarp experiment failed, the ship's design proved so successful that it became one of the most ubiquitous and long-lived classes in Starfleet history. Under Captain Sulu's command, the Excelsior also symbolized the changing of the guard from Kirk's era to a new generation of explorers.",
    related_ships: [
      "USS Enterprise-B (NCC-1701-B) - Excelsior-class (refit)",
      "USS Hood (NCC-42296) - Excelsior-class",
      "USS Melbourne (NCC-62043) - Excelsior-class",
    ],
    design_notes:
      "The Excelsior-class was initially designed to showcase Starfleet's technological superiority with its experimental transwarp drive. After the failure of this system, the class was refitted with conventional warp drive and became the backbone of Starfleet for decades. Its distinctive elongated saucer section and streamlined nacelle pylons represented a significant aesthetic departure from the Constitution-class, setting the design language for future Starfleet vessels.",
  },

  // ==================== NON-FEDERATION SHIPS ====================
  {
    id: "klingon-bop",
    name: "IKS Rotarran",
    registry: "N/A",
    class: "B'rel / K'vort",
    affiliation: "Klingon Empire",
    era: "DS9",
    launched: "Unknown",
    status: "Active (as of 2375)",
    stats: {
      hull: 5,
      shields: 5,
      weapons: 7,
      speed: 9,
      maneuver: 9,
      crew: 36,
      length_m: 157,
      width_m: 181,
      height_m: 98,
      decks: 4,
      max_speed: "Warp 9.6",
    },
    armaments: "Disruptor Cannons (wing-mounted), Photon Torpedo Launcher",
    defenses: "Standard Shields, Cloaking Device",
    info: "The IKS Rotarran was a Klingon Bird-of-Prey that served during the Dominion War under the command of General Martok. It became one of the most distinguished Klingon vessels during the conflict, participating in numerous successful raids against Dominion targets.",
    history:
      "Before being assigned to General Martok, the Rotarran had suffered a string of defeats, and its crew was considered dishonorable. Under Martok's leadership, with Worf serving as first officer, the ship regained its honor through successful combat missions against the Dominion. The Rotarran participated in Operation Return to retake Deep Space 9 and numerous other battles throughout the Dominion War.",
    notable_features: [
      "Versatile Bird-of-Prey design",
      "Enhanced cloaking device",
      "Capable of atmospheric flight and planetary landing",
      "Highly maneuverable for a ship of its size",
    ],
    notable_missions: [
      "Rescue of Klingon troops from Dominion prison camp (2373)",
      "Operation Return (2374)",
      "Multiple raids behind Dominion lines (2374-2375)",
      "Battle of Cardassia (2375)",
    ],
    captains: ["General Martok (2373-2375)", "Worf (temporarily, various occasions)"],
    placeholder_style: "placeholder-bird-of-prey",
    imageUrl:
      "https://static.wikia.nocookie.net/memoryalpha/images/9/9b/Rotarran.jpg/revision/latest?cb=20061010010727&path-prefix=en",
    technical_specs: {
      propulsion: "Standard Klingon warp drive with enhanced maneuverability. Maximum sustainable speed of Warp 9.6.",
      computer_systems: "Klingon military computer systems with tactical focus.",
      sensors: "Advanced sensor arrays with enhanced targeting capabilities.",
      communications: "Secure subspace communications array with encryption protocols.",
      tactical_systems:
        "Wing-mounted disruptor cannons with rapid-fire capabilities. Torpedo launcher with photon torpedo compatibility.",
      auxiliary_craft: "Limited shuttle complement.",
      transporters: "Standard Klingon transporter systems. Four-person capacity.",
      medical_facilities: "Basic medical facilities focused on combat trauma treatment.",
    },
    cultural_significance:
      "The Rotarran became a symbol of Klingon resilience and honor during the Dominion War. Under General Martok's command, it transformed from a ship of dishonor to one of the most respected vessels in the Klingon fleet. Its crew's journey from shame to glory embodied the Klingon warrior ethos of redemption through combat and victory.",
    related_ships: [
      "IKS Hegh'ta - B'rel-class Bird-of-Prey",
      "IKS Ning'tao - B'rel-class Bird-of-Prey",
      "IKS Ch'Tang - K'vort-class Bird-of-Prey",
    ],
    design_notes:
      "The Bird-of-Prey design has been a mainstay of the Klingon fleet for over a century, with various sizes and configurations. Known for its distinctive 'wings' that can adjust position for different flight modes, the Bird-of-Prey balances firepower, maneuverability, and stealth capabilities. Despite its relatively small size, it has proven effective against much larger vessels when used with tactical skill.",
  },
  {
    id: "romulan-warbird",
    name: "IRW Khazara",
    registry: "N/A",
    class: "D'deridex",
    affiliation: "Romulan Star Empire",
    era: "TNG / DS9",
    launched: "circa 2360",
    status: "Active (as of 2370s)",
    stats: {
      hull: 9,
      shields: 9,
      weapons: 8,
      speed: 9.6,
      maneuver: 3,
      crew: 1500,
      length_m: 1353,
      width_m: 748,
      height_m: 355,
      decks: 64,
      max_speed: "Warp 9.6",
    },
    armaments: "Multiple Disruptor Arrays, Plasma Torpedo Launchers",
    defenses: "High-Capacity Shields, Cloaking Device",
    info: "The IRW Khazara was a D'deridex-class Romulan warbird that served the Romulan Star Empire during the late 24th century. Like all D'deridex-class vessels, it was powered by an artificial quantum singularity (black hole) rather than a matter/antimatter reactor.",
    history:
      "The Khazara was commanded by Commander Toreth in 2369 when it was infiltrated by Deanna Troi, who was posing as a Tal Shiar operative. The ship was involved in an operation to transport a high-ranking defector across the Neutral Zone. The D'deridex-class represented the main capital ship of the Romulan fleet during this era and was designed to intimidate with its massive size and distinctive appearance.",
    notable_features: [
      "Artificial quantum singularity power core",
      "Advanced cloaking technology",
      "Massive size (larger than Galaxy-class)",
      "Distinctive 'double hull' design with empty space between sections",
    ],
    notable_missions: [
      "Tal Shiar operations along the Neutral Zone (2369)",
      "Transport of defector Subcommander N'Vek (2369)",
      "Patrolling the Romulan Neutral Zone (various)",
    ],
    captains: ["Commander Toreth (as of 2369)"],
    placeholder_style: "placeholder-dderidex",
    imageUrl:
      "https://static.wikia.nocookie.net/memoryalpha/images/c/c0/Khazara.jpg/revision/latest?cb=20140323224006&path-prefix=en",
    technical_specs: {
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
    },
    cultural_significance:
      "The D'deridex-class warbird represented the might of the Romulan Star Empire during the mid-to-late 24th century. Its imposing size and distinctive appearance were designed to project Romulan power and technological sophistication. The use of artificial quantum singularity technology instead of matter/antimatter reactors highlighted the Romulans' willingness to pursue alternative technological paths from the Federation.",
    related_ships: [
      "IRW Terix - D'deridex-class",
      "IRW Decius - D'deridex-class",
      "IRW Valdore - Valdore-type warbird (successor design)",
    ],
    design_notes:
      "The D'deridex-class warbird featured a distinctive 'double hull' design with a large gap between the upper and lower sections, connected by a neck that housed the artificial quantum singularity power core. This unusual configuration, combined with its green hull coloration and massive size, made it instantly recognizable and intimidating. Despite its size, the D'deridex-class was relatively understaffed compared to Federation vessels of similar dimensions, reflecting Romulan emphasis on automation and efficiency.",
  },
]

/**
 * Helper functions for working with starship data
 */

/**
 * Get ships by era
 * @param era The Star Trek era to filter by
 * @returns Array of ships from that era
 */
export function getShipsByEra(era: string): Starship[] {
  return starships.filter((ship) => ship.era === era)
}

/**
 * Get ships by affiliation
 * @param affiliation The political entity to filter by
 * @returns Array of ships from that affiliation
 */
export function getShipsByAffiliation(affiliation: string): Starship[] {
  return starships.filter((ship) => ship.affiliation === affiliation)
}

/**
 * Get ships by class
 * @param shipClass The ship class to filter by
 * @returns Array of ships of that class
 */
export function getShipsByClass(shipClass: string): Starship[] {
  return starships.filter((ship) => ship.class.includes(shipClass))
}

/**
 * Search ships by name or registry
 * @param query The search query string
 * @returns Array of ships matching the search query
 */
export function searchShips(query: string): Starship[] {
  const searchTerm = query.toLowerCase()
  return starships.filter(
    (ship) =>
      ship.name.toLowerCase().includes(searchTerm) ||
      (ship.registry && ship.registry.toLowerCase().includes(searchTerm)) ||
      ship.class.toLowerCase().includes(searchTerm),
  )
}

/**
 * Get a ship by its ID
 * @param id The unique ship identifier
 * @returns The ship object or undefined if not found
 */
export function getShipById(id: string): Starship | undefined {
  return starships.find((ship) => ship.id === id)
}
