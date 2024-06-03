import { Hotkey, HotkeyLayer, HotkeyProfile } from "./HotkeyProfile";
import { KEYMAP } from "./keymap";

export const TERRAN = 1;
export const PROTOSS = 2;
export const ZERG = 3;
export type Race = typeof TERRAN | typeof PROTOSS | typeof ZERG;

const UNUSED = [
  "hive.jpg",
  "interceptor.jpg",
  "Selectbuilder.png",
  "warpgate.jpg",
  "Envision.png", // maybe signifies a detector
]

export const makeHotkeyProfile = (bindings: Array<[Hotkey, keyof typeof KEYMAP]>): HotkeyProfile => {
  // TODO
  // - unit common
  // - worker common
  // - terran building common
  const addBinding = (layer: HotkeyLayer, hotkey: Hotkey) => {
    bindings.filter(b => b[0] === hotkey).forEach(b => {
      if (layer.keys[b[1]] != null) {
        throw new Error(`overlapping bind for key ${b[1]} in hotkey layer`);
      }
      layer.keys[b[1]] = hotkey;
    });
  };

  return {
    layers: {
      default: (() => {
        const layer = {
          keys: {},
        };
        for (let i = 1; i < CONTROL_GROUPS.length; i++) {
          addBinding(layer, CONTROL_GROUPS[i].get);
          addBinding(layer, CONTROL_GROUPS[i].add);
          addBinding(layer, CONTROL_GROUPS[i].addSteal);
          addBinding(layer, CONTROL_GROUPS[i].create);
          addBinding(layer, CONTROL_GROUPS[i].createSteal);
        }
        for (let i = 1; i < LOCATIONS.length; i++) {
          addBinding(layer, LOCATIONS[i].get);
          addBinding(layer, LOCATIONS[i].set);
        }
        addBinding(layer, ABILITIES.cancel);
        return layer;
      })(),

      unit: (() => {
        const layer = {
          keys: {},
          parent: "default",
        };
        addBinding(layer, ABILITIES.attack);
        addBinding(layer, ABILITIES.holdPosition);
        addBinding(layer, ABILITIES.patrol);
        addBinding(layer, ABILITIES.stop);
        return layer;
      })(),

      worker: (() => {
        const layer = {
          keys: {},
          parent: "unit",
        };
        addBinding(layer, ABILITIES.build);
        addBinding(layer, ABILITIES.buildAdvanced);
        addBinding(layer, ABILITIES.gather);
        addBinding(layer, ABILITIES.returnCargo);
        addBinding(layer, ABILITIES.spray);
        return layer;
      })(),

      productionBuilding: (() => {
        const layer = {
          keys: {},
          parent: "default",
        };
        addBinding(layer, ABILITIES.setRallyPoint);
        return layer;
      })(),

      commandCenterBase: (() => {
        const layer = {
          keys: {},
          parent: "productionBuilding",
        };
        addBinding(layer, UNITS.scv);
        return layer;
      })(),

      hallucination: (() => {
        const layer = {
          keys: {},
          parent: "default",
        };
        return layer;
      })(),

      // Building layers
      ...Object.fromEntries(Object.entries(BUILDINGS).map(entry => {
        const building: {
          icon: string;
          abilities?: Record<string, { icon: string }>;
          parent?: string;
        } = entry[1];
        const layer: HotkeyLayer = {
          keys: {},
          parent: "default"
        };
        if (building.parent != null) {
          layer.parent = building.parent;
        }
        let hasProduction = false;
        for (const unit of Object.values(UNITS).filter(u => (u as { building?: string }).building === entry[0])) {
          addBinding(layer, unit);
          hasProduction = true;
        }
        if (hasProduction && layer.parent === "default") {
          layer.parent = "productionBuilding";
        }
        for (const upgrade of Object.values(UPGRADES).filter(u => u.building === entry[0])) {
          addBinding(layer, upgrade);
        }
        for (const ability of Object.values(building.abilities ?? {})) {
          addBinding(layer, ability);
        }
        return [`b/${entry[0]}`, layer];
      })),

      // Unit layers
      ...Object.fromEntries(Object.entries(UNITS).map(entry => {
        const unit: {
          icon: string;
          abilities?: Record<string, { icon: string }>;
          parent?: string;
        } = entry[1];
        const layer: HotkeyLayer = {
          keys: {},
          parent: "unit",
        };
        if (unit.parent != null) {
          layer.parent = unit.parent;
        }
        for (const ability of Object.values(unit.abilities ?? {})) {
          addBinding(layer, ability);
        }
        return [`u/${entry[0]}`, layer];
      })),

      // Build layers
      ...Object.fromEntries([
        ...[
          [TERRAN, "basic"],
          [TERRAN, "advanced"],
          [PROTOSS, "basic"],
          [PROTOSS, "advanced"],
          [ZERG, "basic"],
          [ZERG, "advanced"],
        ].map(entry => {
          const layer: HotkeyLayer = {
            keys: {},
            parent: "default",
          };
          for (const building of Object.values(BUILDINGS).filter(u => (u as { race?: Race }).race === entry[0] && (u as { build?: string }).build === entry[1])) {
            addBinding(layer, building);
          }
          return [`${entry[1]}/${entry[0]}`, layer];
        }),
        (() => {
          const layer: HotkeyLayer = {
            keys: {},
            parent: "default",
          };
          addBinding(layer, ABILITIES.cancel);
          for (const unit of Object.values(UNITS).filter(u => (u as { building?: string }).building === "larva")) {
            addBinding(layer, unit);
          }
          return ["larva", layer];
        })(),
      ]),
    },
  };
};

const buildAddons = {
  buildReactor: {
    icon: "Build_Reactor.gif",
    name: "Build Reactor",
  },
  buildTechLab: {
    icon: "Build_Tech_Lab.gif",
    name: "Build Tech Lab",
  },
};

const liftoff = {
  liftOff: {
    icon: "Lift.png",
    name: "Lift Off",
  },
  land: {
    // TODO also png
    icon: "Land.jpg",
    name: "Land",
  },
}

const stim = {
  stimpack: {
    icon: "Stim.png",
    name: "Stimpack",
  },
};

const unload = {
  unloadAll: {
    icon: "UnloadAll.jpg",
    name: "Unload All",
  },
};

const load = {
  load: {
    // TODO also png
    icon: "Load.gif",
    name: "Load",
  },
};

const ccLoad = {
  load: {
    icon: "Load.gif",
    name: "Load",
  },
};

const burrow = {
  burrow: {
    icon: "Burrow.gif",
    name: "Burrow",
  },
  unburrow: {
    icon: "Unburrow.gif",
    name: "Unburrow",
  },
};

const cloak = {
  cloak: {
    icon: "Cloak.png",
    name: "Cloak",
  },
  decloak: {
    icon: "Decloack.jpg",
    name: "Decloak",
  },
};

const mergeArchon = {
  mergeArchon: {
    // TODO also png
    icon: "AWrp.gif",
    name: "Archon Merge",
  },
};

export const ABILITIES = {
  ...buildAddons,
  ...liftoff,
  ...stim,
  ...unload,
  ...load,
  ...burrow,
  ...cloak,
  ...mergeArchon,
  attack: {
    icon: "Attack.png",
    name: "Attack",
  },
  build: {
    icon: "Build.png",
  },
  buildAdvanced: {
    icon: "BuildAdvanced.png",
  },
  cancel: {
    icon: "Cancel.png",
    name: "Cancel",
  },
  gather: {
    icon: "Gather.png",
    name: "Gather",
  },
  holdPosition: {
    icon: "HoldPosition.png",
    name: "Hold Position",
  },
  move: {
    icon: "Move.png",
    name: "Move",
  },
  patrol: {
    icon: "Patrol.png",
    name: "Patrol",
  },
  returnCargo: {
    icon: "ReturnCargo.png",
    name: "Return Cargo",
  },
  setRallyPoint: {
    // TODO Setrallypoint.png
    icon: "Rally.jpg",
    name: "Set Rally Point",
  },
  setWorkerRallyPoint: {
    icon: "Setworkerrallypoint.png",
    name: "Set Worker Rally Point",
  },
  spray: {
    icon: "color.jpg",
    name: "Spray",
  },
  stop: {
    // TODO Stop.png
    icon: "Halt.png",
    name: "Stop",
  },
};

export interface Building extends Hotkey {
  race: Race;
  build?: "basic" | "advanced";
  abilities?: Record<string, Hotkey>;
}

export const BUILDINGS = {
  armory: {
    race: TERRAN,
    build: "advanced",
    icon: "armory.jpg",
    name: "Armory",
  },
  assimilator: {
    race: PROTOSS,
    build: "basic",
    icon: "assimilator.jpg",
    name: "Assimilator",
  },
  banelingNest: {
    race: ZERG,
    build: "basic",
    icon: "banelingnest.jpg",
    name: "Baneling Nest",
  },
  barracks: {
    race: TERRAN,
    build: "basic",
    icon: "barracks.jpg",
    name: "Barracks",
    abilities: {
      ...buildAddons,
      ...liftoff,
    },
  },
  "barracks/techLab": {
    race: TERRAN,
    icon: "barrackstechlab.jpg",
  },
  bunker: {
    race: TERRAN,
    build: "basic",
    icon: "bunker.jpg",
    name: "Bunker",
    abilities: {
      ...stim,
      ...load,
      ...unload,
      salvage: {
        icon: "Salvage.gif",
        name: "Salvage",
      },
    },
  },
  commandCenter: {
    race: TERRAN,
    build: "basic",
    icon: "commandcenter.jpg",
    parent: "commandCenterBase",
    name: "Command Center",
    abilities: {
      ...liftoff,
      ...unload,
      ...ccLoad,
      orbitalCommand: {
        icon: "orbitalcommand.jpg",
        name: "Upgrade to Orbital Command",
      },
      planetaryFortress: {
        icon: "planetaryfortress.jpg",
        name: "Upgrade to Planetary Fortress",
      },
    },
  },
  cyberneticsCore: {
    race: PROTOSS,
    build: "basic",
    icon: "cyberneticscore.jpg",
    name: "Cybernetics Core",
  },
  darkShrine: {
    race: PROTOSS,
    build: "advanced",
    icon: "darkshrine.jpg",
    name: "Dark Shrine",
  },
  engineeringBay: {
    race: TERRAN,
    build: "basic",
    icon: "engineeringbay.jpg",
    name: "Engineering Bay",
  },
  evolutionChamber: {
    race: ZERG,
    build: "basic",
    icon: "evolutionchamber.jpg",
    name: "Evolution Chamber",
  },
  extractor: {
    race: ZERG,
    build: "basic",
    // TODO also png
    icon: "extractor.jpg",
    name: "Extractor",
  },
  factory: {
    race: TERRAN,
    build: "advanced",
    icon: "factory.jpg",
    name: "Factory",
    abilities: {
      ...buildAddons,
      ...liftoff,
    },
  },
  "factory/techLab": {
    race: TERRAN,
    icon: "factorytechlab.jpg",
  },
  fleetBeacon: {
    race: PROTOSS,
    build: "advanced",
    icon: "fleetbeacon.jpg",
    name: "Fleet Beacon",
  },
  forge: {
    race: PROTOSS,
    build: "basic",
    icon: "forge.jpg",
    name: "Forge",
  },
  fusionCore: {
    race: TERRAN,
    build: "advanced",
    icon: "fusioncore.jpg",
    name: "Fusion Core",
  },
  gateway: {
    race: PROTOSS,
    build: "basic",
    icon: "gateway.jpg",
    name: "Gateway",
  },
  ghostAcademy: {
    race: TERRAN,
    build: "advanced",
    icon: "ghostacademy.jpg",
    name: "Ghost Academy",
  },
  hatchery: {
    race: ZERG,
    build: "basic",
    icon: "hatchery.jpg",
    name: "Hatchery",
    abilities: {
      morphLairHive: {
        icon: "lair.jpg",
        name: "Morph into Lair/Hive",
      },
      selectLarva: {
        icon: "larva.jpg",
        name: "Select Larva",
      },
    }
  },
  hydraliskDen: {
    race: ZERG,
    build: "advanced",
    icon: "hydraliskden.jpg",
    name: "Hydralisk Den",
  },
  infestationPit: {
    race: ZERG,
    build: "advanced",
    icon: "infestationpit.jpg",
    name: "Infestation Pit",
  },
  lurkerDen: {
    race: ZERG,
    build: "advanced",
    icon: "lurkerden.png",
    name: "Lurker Den",
  },
  missileTurret: {
    race: TERRAN,
    build: "basic",
    icon: "missileturret.jpg",
    name: "Missile Turret",
  },
  nexus: {
    race: PROTOSS,
    build: "basic",
    icon: "nexus.jpg",
    name: "Nexus",
    abilities: {
      batteryOvercharge: {
        icon: "Battery_Overcharge.png",
        name: "Battery Overcharge",
      },
      chronoBoost: {
        icon: "ChronoBoost.png",
        name: "Chrono Boost",
      },
      strategicRecall: {
        icon: "MassRecall.png",
        name: "Strategic Recall",
      },
    },
  },
  nydusNetwork: {
    race: ZERG,
    build: "advanced",
    icon: "nydusnetwork.jpg",
    name: "Nydus Network",
    abilities: {
      ...unload,
      nydusWorm: {
        icon: "NydusWorm.jpeg",
        name: "Summon Nydus Worm",
      },
    },
  },
  orbitalCommand: {
    race: TERRAN,
    // TODO surveillancestation.jpg
    icon: "orbitalcommand.jpg",
    parent: "commandCenterBase",
    abilities: {
      ...liftoff,
      calldownMule: {
        // TODO also png
        icon: "CalldownMULE.gif",
        name: "Calldown MULE",
      },
      scan: {
        icon: "Scan.png",
        name: "Scan",
      },
      supplyDrop: {
        icon: "SupplyDrop.png",
        name: "Supply Drop",
      },
    },
  },
  photonCannon: {
    race: PROTOSS,
    build: "basic",
    icon: "photoncannon.jpg",
    name: "Photon Cannon",
  },
  planetaryFortress: {
    race: TERRAN,
    icon: "planetaryfortress.jpg",
    parent: "commandCenterBase",
    abilities: {
      ...unload,
      ...ccLoad,
    },
  },
  pylon: {
    race: PROTOSS,
    build: "basic",
    icon: "pylon.jpg",
    name: "Pylon",
  },
  refinery: {
    race: TERRAN,
    build: "basic",
    // TODO png
    icon: "refinery.jpg",
    name: "Refinery",
  },
  roachWarren: {
    race: ZERG,
    build: "basic",
    icon: "roachwarren.jpg",
    name: "Roach Warren",
  },
  roboticsBay: {
    race: PROTOSS,
    build: "advanced",
    icon: "roboticsbay.jpg",
    name: "Robotics Bay",
  },
  roboticsFacility: {
    race: PROTOSS,
    build: "advanced",
    icon: "roboticsfacility.jpg",
    name: "Robotics Facility",
  },
  sensorTower: {
    race: TERRAN,
    build: "basic",
    icon: "sensortower.jpg",
    name: "Sensor Tower",
  },
  shieldBattery: {
    race: PROTOSS,
    build: "basic",
    icon: "Shield_Battery.jpg",
    name: "Shield Battery",
  },
  spawningPool: {
    race: ZERG,
    build: "basic",
    icon: "spawningpool.jpg",
    name: "Spawning Pool",
  },
  spineCrawler: {
    race: ZERG,
    build: "basic",
    icon: "spinecrawler.jpg",
    name: "Spine Crawler",
    abilities: {
      root: {
        icon: "Root.png",
        name: "Root",
      },
      uproot: {
        icon: "Uproot.png",
        name: "Uproot",
      },
    },
  },
  spire: {
    race: ZERG,
    build: "advanced",
    icon: "spire.jpg",
    name: "Spire",
    abilities: {
      morphGreaterSpire: {
        icon: "greaterspire.jpg",
        name: "Mutate into Greater Spire",
      },
    },
  },
  sporeCrawler: {
    race: ZERG,
    build: "basic",
    parent: "b/spineCrawler",
    icon: "sporecrawler.jpg",
    name: "Spore Crawler",
  },
  stargate: {
    race: PROTOSS,
    build: "advanced",
    icon: "stargate.jpg",
    name: "Stargate",
  },
  starport: {
    race: TERRAN,
    build: "advanced",
    icon: "starport.jpg",
    name: "Starport",
    abilities: {
      ...buildAddons,
      ...liftoff,
    },
  },
  "starport/techLab": {
    race: TERRAN,
    icon: "starporttechlab.jpg",
  },
  supplyDepot: {
    race: TERRAN,
    build: "basic",
    icon: "supplydepot.jpg",
    name: "Supply Depot",
    abilities: {
      lower: {
        icon: "Lower.gif",
        name: "Lower",
      },
      raise: {
        icon: "supplydepot.jpg",
        name: "Raise",
      },
    },
  },
  templarArchives: {
    race: PROTOSS,
    build: "advanced",
    icon: "templararchives.jpg",
    name: "Templar Archives",
  },
  twilightCouncil: {
    race: PROTOSS,
    build: "advanced",
    icon: "twilightcouncil.jpg",
    name: "Twilight Council",
  },
  ultraliskCavern: {
    race: ZERG,
    build: "advanced",
    icon: "ultraliskcavern.jpg",
    name: "Ultralisk Cavern",
  },
};

export interface Unit extends Hotkey {
  race: Race;
  building?: string;
  abilities?: Record<string, Hotkey>;
}

export const UNITS = {
  adept: {
    race: PROTOSS,
    building: "gateway",
    icon: "adept.png",
    name: "Adept",
    abilities: {
      psionicTransfer: {
        icon: "Psionic_Transfer.png",
        name: "Psionic Transfer",
      },
    },
  },
  archon: {
    race: PROTOSS,
    icon: "archon.jpg",
    name: "Archon",
  },
  baneling: {
    race: ZERG,
    icon: "baneling.jpg",
    name: "Baneling",
    abilities: {
      ...burrow,
      enableStructureAttack: {
        icon: "EnableBuildingAttack.png",
        name: "Enable Structure Attack",
      },
      explode: {
        // TODO also png
        icon: "Explode.gif",
        name: "Explode",
      },
      disableStructureAttack: {
        icon: "Explode.gif",
        name: "Disable Structure Attack",
      },
    },
  },
  banshee: {
    race: TERRAN,
    building: "starport",
    icon: "banshee.jpg",
    name: "Banshee",
    abilities: {
      ...cloak,
    },
  },
  battlecruiser: {
    race: TERRAN,
    building: "starport",
    icon: "battlecruiser.jpg",
    name: "Battlecruiser",
    abilities: {
      tacticalJump: {
        icon: "Tactical_Jump.png",
        name: "Tactical Jump",
      },
      yamatoCannon: {
        icon: "YamatoCannon.png",
        name: "Yamato Cannon",
      },
    },
  },
  broodlord: {
    race: ZERG,
    icon: "broodlord.jpg",
    name: "Brood Lord",
  },
  carrier: {
    race: PROTOSS,
    building: "stargate",
    icon: "carrier.jpg",
    name: "Carrier",
    abilities: {
      trainInterceptor: {
        icon: "TrainInterceptors.gif",
        name: "Build Interceptor",
      },
    },
  },
  colossus: {
    race: PROTOSS,
    building: "roboticsFacility",
    icon: "colossus.jpg",
    name: "Colossus",
  },
  corruptor: {
    race: ZERG,
    building: "larva",
    icon: "corruptor.jpg",
    name: "Corruptor",
    abilities: {
      causticSpray: {
        icon: "CorruptionAbility.png",
        name: "Caustic Spray",
      },
      morphBroodLord: {
        icon: "broodlord.jpg",
        name: "Morph to Brood Lord",
      },
    },
  },
  cyclone: {
    race: TERRAN,
    building: "factory",
    icon: "cyclone.png",
    name: "Cyclone",
    abilities: {
      lockOn: {
        icon: "Lock_On.jpg",
        name: "Lock-On",
      },
    },
  },
  darkTemplar: {
    race: PROTOSS,
    building: "gateway",
    icon: "darktemplar.jpg",
    name: "Dark Templar",
    abilities: {
      ...mergeArchon,
      shadowStride: {
        icon: "Shadow_Stride.png",
        name: "Shadow Stride",
      },
    },
  },
  disruptor: {
    race: PROTOSS,
    building: "roboticsFacility",
    icon: "disruptor.png",
    name: "Disruptor",
    abilities: {
      purificationNova: {
        icon: "Purification_Nova.png",
        name: "Purification Nova",
      },
    },
  },
  drone: {
    race: ZERG,
    building: "larva",
    parent: "worker",
    icon: "drone.jpg",
    name: "Drone",
    abilities: {
      ...burrow,
    },
  },
  ghost: {
    race: TERRAN,
    building: "barracks",
    icon: "ghost.jpg",
    name: "Ghost",
    abilities: {
      ...cloak,
      emp: {
        icon: "EMP.png",
        name: "EMP Round",
      },
      nukeCalldown: {
        icon: "NukeCalldown.png",
        name: "Tac Nuke Strike",
      },
      snipe: {
        icon: "Snipe.png",
        name: "Steady Targeting",
      },
      holdFire: {
        icon: "btn-ability-terran-holdfire.jpg",
        name: "Hold Fire",
      },
      weaponsFree: {
        // TODO also "btn-ability-terran-weaponsfree.jpg",
        icon: "WeaponsFree.png",
        name: "Weapons Free",
      },
    },
  },
  hellbat: {
    race: TERRAN,
    building: "factory",
    parent: "u/hellion",
    icon: "hellbat.jpg",
    name: "Hellbat",
  },
  hellion: {
    race: TERRAN,
    building: "factory",
    icon: "hellion.jpg",
    name: "Hellion",
    abilities: {
      toHellbat: {
        icon: "hellbat.jpg",
        name: "Hellbat Mode",
      },
      toHellion: {
        icon: "hellion.jpg",
        name: "Hellion Mode",
      },
    },
  },
  highTemplar: {
    race: PROTOSS,
    building: "gateway",
    icon: "hightemplar.jpg",
    name: "High Templar",
    abilities: {
      ...mergeArchon,
      feedback: {
        icon: "Feedback.png",
        name: "Feedback",
      },
      psiStorm: {
        icon: "PsiStorm.png",
        name: "Psionic Storm",
      },
    },
  },
  hydralisk: {
    race: ZERG,
    building: "larva",
    icon: "hydralisk.jpg",
    name: "Hydralisk",
    abilities: {
      ...burrow,
      morphLurker: {
        icon: "lurker.png",
        name: "Morph to Lurker",
      },
    },
  },
  immortal: {
    race: PROTOSS,
    building: "roboticsFacility",
    icon: "immortal.jpg",
    name: "Immortal",
    abilities: {
      barrier: {
        icon: "Barrier.png",
        name: "Barrier",
      },
    },
  },
  infestor: {
    race: ZERG,
    building: "larva",
    icon: "infestor.jpg",
    name: "Infestor",
    abilities: {
      ...burrow,
      fungalGrowth: {
        icon: "FungalGrowth.png",
        name: "Fungal Growth",
      },
      microbialShroud: {
        icon: "Microbial_Shroud.png",
        name: "Microbial Shroud",
      },
      neuralParasite: {
        icon: "NeuralParasite.png",
        name: "Neural Parasite",
      },
    },
  },
  liberator: {
    race: TERRAN,
    building: "starport",
    icon: "liberator.png",
    name: "Liberator",
    abilities: {
      defender: {
        icon: "Defender_mode.png",
        name: "Defender Mode",
      },
      fighter: {
        icon: "Fighter_mode_liberator.png",
        name: "Fighter Mode",
      },
    },
  },
  locust: {
    race: ZERG,
    icon: "SpawnLocusts.png",
    name: "Locust",
    abilities: {
      swoop: {
        icon: "swoop.png",
        name: "Swoop",
      },
    },
  },
  lurker: {
    race: ZERG,
    icon: "lurker.png",
    name: "Lurker",
    abilities: {
      burrow: {
        icon: "Burrow.gif",
        name: "Burrow",
      },
      unburrow: {
        icon: "Unburrow.gif",
        name: "Unburrow",
      },
      holdFire: {
        icon: "btn-ability-terran-holdfire.jpg",
        name: "Hold Fire",
      },
      release: {
        // TODO also "btn-ability-terran-weaponsfree.jpg",
        icon: "WeaponsFree.png",
        name: "Release",
      },
    },
  },
  marauder: {
    race: TERRAN,
    building: "barracks",
    icon: "marauder.jpg",
    name: "Marauder",
    abilities: {
      ...stim,
    },
  },
  marine: {
    race: TERRAN,
    building: "barracks",
    icon: "marine.jpg",
    name: "Marine",
    abilities: {
      ...stim,
    },
  },
  medivac: {
    race: TERRAN,
    building: "starport",
    icon: "medivac.jpg",
    name: "Medivac",
    abilities: {
      ...load,
      ...unload,
      afterburners: {
        icon: "MedivacSpeedBoost.png",
        name: "Afterburners",
      },
      heal: {
        icon: "Heal.png",
        name: "Heal",
      },
    },
  },
  mothership: {
    race: PROTOSS,
    building: "nexus",
    icon: "mothership.jpg",
    name: "Mothership",
    abilities: {
      cloakingField: {
        icon: "Cloaking_field.png",
        name: "Cloaking Field",
      },
      massRecall: {
        icon: "Mass_Recall.png",
        name: "Mass Recall",
      },
      timeWarp: {
        icon: "Time_warp.jpg",
        name: "Time Warp",
      }
    },
  },
  mutalisk: {
    race: ZERG,
    building: "larva",
    icon: "mutalisk.jpg",
    name: "Mutalisk",
  },
  observer: {
    race: PROTOSS,
    building: "roboticsFacility",
    icon: "observer.jpg",
    name: "Observer",
    abilities: {
      observerMode: {
        icon: "Observer_Mode.png",
        name: "Observer Mode",
      },
      surveillanceMode: {
        icon: "Surveillance_Mode.png",
        name: "Surveillance Mode",
      },
    },
  },
  oracle: {
    race: PROTOSS,
    building: "stargate",
    icon: "oracle.jpg",
    name: "Oracle",
    abilities: {
      activatePulsarBeam: {
        icon: "PulsarBeam.png",
        name: "Activate Pulsar Beam",
      },
      deactivatePulsarBeam: {
        icon: "PulsarBeamOff.jpg",
        name: "Deactive Pulsar Beam",
      },
      revelation: {
        icon: "OracleRevelation.png",
        name: "Revelation",
      },
      stasisWard: {
        icon: "Stasis_Ward.png",
        name: "Stasis Ward",
      },
    },
  },
  overlord: {
    race: ZERG,
    building: "larva",
    icon: "overlord.jpg",
    name: "Overlord",
    abilities: {
      ...unload,
      load: {
        // TODO also png
        icon: "Load.gif",
        name: "Load",
      },
      generateCreep: {
        icon: "GenerateCreep.png",
        name: "Generate Creep",
      },
      morphToOverseer: {
        icon: "MorphToOverseer.png",
        name: "Morph to Overseer",
      },
      mutateVentralSacs: {
        icon: "VentralSacs.gif",
        name: "Mutate Ventral Sacs",
      },
      stopGeneratingCreep: {
        icon: "StopGenerateCreep.png",
        name: "Stop Generate Creep",
      },
    },
  },
  overseer: {
    race: ZERG,
    icon: "overseer.jpg",
    name: "Overseer",
    abilities: {
      changeling: {
        // TODO SpawnChangeling.gif
        icon: "changeling.jpg",
        name: "Spawn Changeling",
      },
      contaminate: {
        icon: "Contaminate.png",
        name: "Contaminate",
      },
      oversight: {
        icon: "Oversight.png",
        name: "Oversight",
      },
      cancelOversight: {
        icon: "Cancel_Oversight.png",
        name: "Cancel Oversight",
      },
    },
  },
  phoenix: {
    race: PROTOSS,
    building: "stargate",
    icon: "phoenix.jpg",
    name: "Phoenix",
    abilities: {
      gravitonBeam: {
        icon: "GravitonBeam.png",
        name: "Graviton Beam",
      },
    },
  },
  probe: {
    race: PROTOSS,
    building: "nexus",
    parent: "worker",
    icon: "probe.jpg",
    name: "Probe",
  },
  queen: {
    race: ZERG,
    building: "hatchery",
    icon: "queen.jpg",
    name: "Queen",
    abilities: {
      ...burrow,
      creepTumor: {
        // TODO SpawnCreepTumor.gif
        icon: "BuildCreepTumor.png",
        name: "Spawn Creep Tumor",
      },
      injectLarva: {
        icon: "Spawn_larva.gif",
        name: "Spawn Larva",
      },
      transfusion: {
        icon: "Transfusion.png",
        name: "Transfusion",
      },
    },
  },
  ravager: {
    race: ZERG,
    icon: "ravager.png",
    name: "Ravager",
    abilities: {
      ...burrow,
      corrosiveBile: {
        icon: "corrosivebile.jpg",
        name: "Corrosive Bile",
      },
    },
  },
  raven: {
    race: TERRAN,
    building: "starport",
    icon: "raven.jpg",
    name: "Raven",
    abilities: {
      antiArmorMissile: {
        icon: "HunterSeekerMissile.png",
        name: "Anti-Armor Missile",
      },
      autoturret: {
        // TODO also autoturret.jpg, BuildAutoTurret.png
        icon: "Build_auto_turret.gif",
        name: "Build Auto-Turret",
      },
      interferenceMatrix: {
        icon: "Interference_Matrix.png",
        name: "Interference Matrix",
      },
    },
  },
  reaper: {
    race: TERRAN,
    building: "barracks",
    icon: "reaper.jpg",
    name: "Reaper",
    abilities: {
      kd8Charge: {
        icon: "KD8_Charge.jpg",
        name: "KD8 Charge",
      },
    },
  },
  roach: {
    race: ZERG,
    building: "larva",
    icon: "roach.jpg",
    name: "Roach",
    abilities: {
      ...burrow,
      morphRavager: {
        icon: "ravager.png",
        name: "Morph to Ravager",
      },
    },
  },
  scv: {
    race: TERRAN,
    building: "commandCenter",
    parent: "worker",
    icon: "scv.jpg",
    name: "SCV",
    abilities: {
      repair: {
        // TODO png
        icon: "Repair.gif",
        name: "Repair",
      },
    },
  },
  sentry: {
    race: PROTOSS,
    building: "gateway",
    icon: "sentry.jpg",
    name: "Sentry",
    abilities: {
      forceField: {
        // TODO also png
        icon: "Force_field.gif",
        name: "Force Field",
      },
      guardianShield: {
        icon: "GuardianShield.gif",
        name: "Guardian Shield",
      },
      hallucination: {
        icon: "Hallucination.png",
        name: "Hallucination",
      },
    },
  },
  siegeTank: {
    race: TERRAN,
    building: "factory",
    icon: "siegetank.jpg",
    name: "Siege Tank",
    abilities: {
      siegeMode: {
        // TODO png
        icon: "SiegeMode.gif",
        name: "Siege Mode",
      },
      tankMode: {
        icon: "Unsiege.png",
        name: "Tank Mode",
      },
    },
  },
  stalker: {
    race: PROTOSS,
    building: "gateway",
    icon: "stalker.jpg",
    name: "Stalker",
    abilities: {
      blink: {
        icon: "Blink.png",
        name: "Blink",
      },
    },
  },
  swarmHost: {
    race: ZERG,
    building: "larva",
    icon: "swarmhost.jpg",
    name: "Swarm Host",
    abilities: {
      ...burrow,
      spawnLocusts: {
        icon: "SpawnLocusts.png",
        name: "Spawn Locusts",
      },
    },
  },
  tempest: {
    race: PROTOSS,
    building: "stargate",
    icon: "Tempest.png",
    name: "Tempest",
  },
  thor: {
    race: TERRAN,
    building: "factory",
    icon: "thor.jpg",
    name: "Thor",
    abilities: {
      explosivePayload: {
        icon: "ExplosivePayload.png",
        desc: "High single-target anti-air",
        name: "Explosive Payload",
      },
      highImpactPayload: {
        icon: "HighImpactPayload.png",
        desc: "Splash and anti-light anti-air",
        name: "High Impact Payload",
      },
    },
  },
  ultralisk: {
    race: ZERG,
    building: "larva",
    icon: "ultralisk.jpg",
    name: "Ultralisk",
  },
  viking: {
    race: TERRAN,
    building: "starport",
    icon: "viking.jpg",
    name: "Viking",
    abilities: {
      assaultMode: {
        // TODO also png
        icon: "AssaultMode.gif",
        name: "Assault Mode",
      },
      fighterMode: {
        // TODO also png
        icon: "Fighter_mode.gif",
        name: "Fighter Mode",
      },
    },
  },
  viper: {
    race: ZERG,
    building: "larva",
    icon: "viper.jpg",
    name: "Viper",
    abilities: {
      abduct: {
        icon: "ViperAbduct.png",
        name: "Abduct",
      },
      blindingCloud: {
        icon: "BlindingCloud.png",
        name: "Blinding Cloud",
      },
      consume: {
        icon: "ViperConsume.png",
        name: "Consume",
      },
      parasiticBomb: {
        icon: "Parasitic_Bomb.jpg",
        name: "Parasitic Bomb",
      },
    },
  },
  voidRay: {
    race: PROTOSS,
    building: "stargate",
    icon: "voidray.jpg",
    name: "Void Ray",
    abilities: {
      prismaticAlignment: {
        // TODO there are 2
        icon: "prismatic_beams.png",
        name: "Prismatic Alignment",
      },
    },
  },
  warpPrism: {
    race: PROTOSS,
    building: "roboticsFacility",
    icon: "warpprism.jpg",
    name: "Warp Prism",
    abilities: {
      ...unload,
      ...load,
      phasingMode: {
        // TODO also png
        icon: "Phasing_mode.gif",
        name: "Phasing Mode",
      },
      transportMode: {
        // TODO +2 more
        icon: "Transport_mode.gif",
        name: "Transport Mode",
      },
    },
  },
  widowMine: {
    race: TERRAN,
    building: "factory",
    icon: "widowmine.jpg",
    name: "Widow Mine",
    abilities: {
      burrow: {
        icon: "WidowMineBurrow.png",
        name: "Activate Mine",
      },
      unburrow: {
        icon: "WidowMineUnburrow.jpg",
        name: "Deactivate Mine",
      },
    },
  },
  zealot: {
    race: PROTOSS,
    building: "gateway",
    icon: "zealot.jpg",
    name: "Zealot",
    abilities: {
      charge: {
        icon: "Charge.png",
        name: "Charge",
      },
    }
  },
  zergling: {
    race: ZERG,
    building: "larva",
    icon: "zergling.jpg",
    name: "Zergling",
    abilities: {
      ...burrow,
      morphBaneling: {
        icon: "baneling.jpg",
        name: "Morph to Baneling",
      },
    },
  },
};

export interface Upgrade extends Hotkey {
  race: Race;
  building?: string;
}

export const UPGRADES = {
  adaptiveTalons: {
    race: ZERG,
    building: "lurkerDen",
    icon: "Adaptive_Talons.png",
    name: "Adaptive Talons",
    desc: "Lurker burrow speed",
  },
  adrenalGlands: {
    race: ZERG,
    building: "spawningPool",
    icon: "AdrenalGlands.gif",
    name: "Adrenal Glands",
    desc: "Zergling attack speed",
  },
  advancedBallistics: {
    race: TERRAN,
    building: "fusionCore",
    icon: "Advanced_Ballistics.jpg",
    name: "Advanced Ballistics",
    desc: "Liberator range",
  },
  anabolicSynthesis: {
    race: ZERG,
    building: "ultraliskCavern",
    icon: "Anabolic_Synthesis.gif",
    name: "Anabolic Synthesis",
    desc: "Ultralisk speed",
  },
  anionPulseCrystals: {
    race: PROTOSS,
    building: "fleetBeacon",
    icon: "AnionPulseCrystals.png",
    name: "Anion Pulse Crystals",
    desc: "Phoenix range",
  },
  armNuke: {
    race: TERRAN,
    building: "ghostAcademy",
    icon: "NukeCalldown.png",
    name: "Nuke",
  },
  blink: {
    race: PROTOSS,
    building: "twilightCouncil",
    icon: "Blink.png",
    name: "Blink",
  },
  burrow: {
    race: ZERG,
    building: "hatchery",
    icon: "Burrow.gif",
    name: "Burrow",
  },
  caduceusReactor: {
    race: TERRAN,
    building: "fusionCore",
    icon: "CaduceusReactor.gif",
    name: "Caduceus Reactor",
    desc: "Medivac energy regen",
  },
  centrifugalHooks: {
    race: ZERG,
    building: "banelingNest",
    icon: "CentrifugalHooks.gif",
    name: "Centrifugal Hooks",
    desc: "Baneling speed",
  },
  charge: {
    race: PROTOSS,
    building: "twilightCouncil",
    icon: "Charge.png",
    name: "Charge",
    desc: "Zealot speed boost"
  },
  chitinousPlating: {
    race: ZERG,
    building: "ultraliskCavern",
    icon: "ChitinousPlating.gif",
    name: "Chitinous Plating",
    desc: "Ultralisk armor",
  },
  cloakingField: {
    race: TERRAN,
    building: "starport/techLab",
    icon: "Cloak.png",
    name: "Cloaking Field",
  },
  combatShield: {
    race: TERRAN,
    building: "barracks/techLab",
    icon: "CombatShield.png",
    name: "Combat Shield",
    desc: "Marine hitpoints",
  },
  concussiveShells: {
    race: TERRAN,
    building: "barracks/techLab",
    icon: "ConcussiveShells.png",
    name: "Concussive Shells",
    desc: "Marauder attacks inflict slow",
  },
  drillingClaws: {
    race: TERRAN,
    building: "factory/techLab",
    icon: "DrillingClaws.png",
    name: "Drilling Claws",
    desc: "Widow mine invisibility and burrow/unburrow speed"
  },
  extendedThermalLance: {
    race: PROTOSS,
    building: "roboticsBay",
    icon: "ColossusRange.gif",
    name: "Extended Thermal Lance",
    desc: "Colossus range",
  },
  fluxVanes: {
    race: PROTOSS,
    building: "fleetBeacon",
    icon: "Flux_Vanes.png",
    name: "Flux Vanes",
    desc: "Void Ray movement",
  },
  flyerAttack: {
    race: ZERG,
    building: "spire",
    icon: "FlyerAttack1.gif",
    name: "Flyer Attack",
  },
  flyerCarapace: {
    race: ZERG,
    building: "spire",
    icon: "FlyerCarapace1.gif",
    name: "Flyer Carapace",
  },
  glialReconstitution: {
    race: ZERG,
    building: "roachWarren",
    icon: "EvolveGlialRegeneration.gif",
    name: "Glial Reconstitution",
    desc: "Roach speed",
  },
  graviticBoosters: {
    race: PROTOSS,
    building: "roboticsBay",
    icon: "ObserverSpeed.gif",
    name: "Gravitic Boosters",
    desc: "Observer speed",
  },
  graviticDrive: {
    race: PROTOSS,
    building: "roboticsBay",
    icon: "WarpPrismSpeed.gif",
    name: "Gravitic Drive",
    desc: "Warp prism speed",
  },
  groovedSpines: {
    race: ZERG,
    building: "hydraliskDen",
    icon: "GroovedSpines.gif",
    name: "Grooved Spines",
    desc: "Hydralisk range",
  },
  groundCarapace: {
    race: ZERG,
    building: "evolutionChamber",
    icon: "ZergGroundCarapace1.gif",
    name: "Ground Carapace",
  },
  hisecAutoTracking: {
    race: TERRAN,
    building: "engineeringBay",
    icon: "HisecAutoTracking.gif",
    name: "Hi-Sec Auto Tracking",
    desc: "Building range",
  },
  hurricaneEngines: {
    race: TERRAN,
    building: "factory/techLab",
    icon: "Hurricane_Engines.png",
    name: "Hurricane Engines",
    desc: "Cyclone speed",
  },
  hyperflightRotors: {
    race: TERRAN,
    building: "starport/techLab",
    icon: "Hyperflight_Rotors.jpg",
    name: "Hyperflight Rotors",
    desc: "Banshee speed",
  },
  infantryArmor: {
    race: TERRAN,
    building: "engineeringBay",
    icon: "InfantryArmor1.gif",
    name: "Infantry Armor",
  },
  infantryWeapons: {
    race: TERRAN,
    building: "engineeringBay",
    icon: "InfantryWeapons1.gif",
    name: "Infantry Weapons",
  },
  infernalPreigniter: {
    race: TERRAN,
    building: "factory/techLab",
    icon: "InfernalPreigniter.png",
    name: "Infernal Pre-Igniter",
    desc: "Hellion/Hellbat damage vs light",
  },
  interferenceMatrix: {
    race: TERRAN,
    building: "starport/techLab",
    icon: "Interference_Matrix.png",
    name: "Interference Matrix",
  },
  meleeAttacks: {
    race: ZERG,
    building: "evolutionChamber",
    icon: "ZergMeleeAttacks1.gif",
    name: "Melee Attacks",
  },
  metabolicBoost: {
    race: ZERG,
    building: "spawningPool",
    icon: "MetabolicBoost.gif",
    name: "Metabolic Boost",
    desc: "Zergling speed",
  },
  missileAttacks: {
    race: ZERG,
    building: "evolutionChamber",
    icon: "ZergMissileAttacks1.gif",
    name: "Missile Attacks",
  },
  muscularAugments: {
    race: ZERG,
    building: "hydraliskDen",
    icon: "MuscularAugments.png",
    name: "Muscular Augments",
    desc: "Hydralisk speed",
  },
  neosteelArmor: {
    race: TERRAN,
    building: "engineeringBay",
    icon: "BuildingArmor.gif",
    name: "Neosteel Armor",
    desc: "Building armor and cargo space",
  },
  neuralParasite: {
    race: ZERG,
    building: "infestationPit",
    icon: "NeuralParasite.png",
    name: "Neural Parasite",
  },
  personalCloaking: {
    race: TERRAN,
    building: "ghostAcademy",
    icon: "Cloak.png",
    name: "Personal Cloaking",
  },
  pneumatizedCarapace: {
    race: ZERG,
    building: "hatchery",
    icon: "PneumatizedCarapace.gif",
    name: "Pneumatized Carapace",
    desc: "Overlord/Overseer speed",
  },
  protossAirArmor: {
    race: PROTOSS,
    building: "cyberneticsCore",
    icon: "ProtossAirArmorLevel1.gif",
    name: "Air Armor",
  },
  protossAirWeapons: {
    race: PROTOSS,
    building: "cyberneticsCore",
    icon: "ProtossAirWeaponsLevel1.gif",
    name: "Air Weapons",
  },
  protossGroundArmor: {
    race: PROTOSS,
    building: "forge",
    icon: "ProtossGroundArmorLevel1.gif",
    name: "Ground Armor",
  },
  protossGroundWeapons: {
    race: PROTOSS,
    building: "forge",
    icon: "ProtossGroundWeaponsLevel1.gif",
    name: "Ground Weapons",
  },
  protossShields: {
    race: PROTOSS,
    building: "forge",
    icon: "ProtossShieldsLevel1.gif",
    name: "Shields",
  },
  psionicStorm: {
    race: PROTOSS,
    building: "templarArchives",
    icon: "PsiStorm.png",
    name: "Psionic Storm",
  },
  resonatingGlaives: {
    race: PROTOSS,
    building: "twilightCouncil",
    icon: "Resonating_Glaives.jpg",
    name: "Resonating Glaives",
  },
  seismicSpines: {
    race: ZERG,
    building: "lurkerDen",
    icon: "Seismic_Spines.png",
    name: "Seismic Spines",
    desc: "Lurker range",
  },
  shipWeapons: {
    race: TERRAN,
    building: "armory",
    icon: "Ship_weapons_1.gif",
    name: "Ship Weapons",
  },
  smartServos: {
    race: TERRAN,
    building: "factory/techLab",
    icon: "Smart_Servos.png",
    name: "Smart Servos",
    desc: "Faster Hellion/Viking/Thor transformation",
  },
  stimpack: {
    race: TERRAN,
    building: "barracks/techLab",
    icon: "Stim.png",
    name: "Stimpack",
  },
  tectonicDestabilizers: {
    race: PROTOSS,
    building: "fleetBeacon",
    icon: "Tectonic_Destabilizers.png",
    name: "Tectonic Destabilizers",
    desc: "Tempest damage vs structures",
  },
  tunnelingClaws: {
    race: ZERG,
    building: "roachWarren",
    icon: "EvolveTunnelingClaws.gif",
    name: "Tunneling Claws",
    desc: "Roach move + heal while burrowed",
  },
  vehiclePlating: {
    race: TERRAN,
    building: "armory",
    name: "Vehicle Plating",
    icon: "VehiclePlating1.gif",
  },
  vehicleWeapons: {
    race: TERRAN,
    building: "armory",
    name: "Vehicle Weapons",
    icon: "VehicleWeapons1.gif",
  },
  warpgate: {
    race: PROTOSS,
    building: "cyberneticsCore",
    name: "Warp Gate",
    icon: "ResearchWarpgate.gif",
  },
  weaponRefit: {
    race: TERRAN,
    building: "fusionCore",
    name: "Weapon Refit",
    icon: "YamatoCannon.png",
  },
};

export const CONTROL_GROUPS: Array<Record<"get" | "add" | "addSteal" | "create" | "createSteal", Hotkey>> = [
  null as any,
  ...new Array(10).fill(null).map((_, i) => {
    const CG_COLOR = "#ff0";
    i = i + 1;
    return {
      get: {
        name: `CG ${i}`,
        color: CG_COLOR,
      },
      add: {
        name: `Add CG ${i}`,
        color: CG_COLOR,
      },
      addSteal: {
        name: `Add/Steal CG ${i}`,
        color: CG_COLOR,
      },
      create: {
        name: `Create CG ${i}`,
        color: CG_COLOR,
      },
      createSteal: {
        name: `Create/Steal CG ${i}`,
        color: CG_COLOR,
      },
    };
  }),
];

export const LOCATIONS: Array<Record<"get" | "set", Hotkey>> = [
  null as any,
  ...new Array(8).fill(null).map((_, i) => {
    const LOC_COLOR = "#0f0";
    i = i + 1;
    return {
      get: {
        name: `Cam ${i}`,
        color: LOC_COLOR,
      },
      set: {
        name: `Set Cam ${i}`,
        color: LOC_COLOR,
      },
    };
  }),
];