import { Hotkey, HotkeyLayer, HotkeyProfile } from "./HotkeyProfile";
import { KEYMAP } from "./keymap";

export const TERRAN = 1;
export const PROTOSS = 2;
export const ZERG = 3;
export type Race = typeof TERRAN | typeof PROTOSS | typeof ZERG;

const UNUSED = [
  "Envision.png",
  "hive.jpg",
  "interceptor.jpg",
  "lair.jpg",
  "Protoss.png",
  "ProtossAirWeapons.png",
  "Root.png",
  "Selectbuilder.png",
  "Terran.png",
  "Uproot.png",
  "warpgate.jpg",
  "Zerg.png",
  "larva.jpg",
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
      unit: (() => {
        const layer = {
          keys: {},
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

      commandCenterBase: (() => {
        const layer = {
          keys: {},
        };
        addBinding(layer, UNITS.scv);
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
        };
        if (building.parent != null) {
          layer.parent = building.parent;
        }
        for (const unit of Object.values(UNITS).filter(u => (u as { building?: string }).building === entry[0])) {
          addBinding(layer, unit);
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
          };
          addBinding(layer, ABILITIES.cancel);
          for (const building of Object.values(BUILDINGS).filter(u => (u as { race?: Race }).race === entry[0] && (u as { build?: string }).build === entry[1])) {
            addBinding(layer, building);
          }
          return [`${entry[1]}/${entry[0]}`, layer];
        }),
        (() => {
          const layer: HotkeyLayer = {
            keys: {},
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
  },
  buildTechLab: {
    icon: "Build_Tech_Lab.gif"
  },
};

const liftoff = {
  liftOff: {
    icon: "Lift.png",
  },
  land: {
    // TODO also png
    icon: "Land.jpg",
  },
}

const stim = {
  stimpack: {
    icon: "Stim.png",
  },
};

const unload = {
  unloadAll: {
    icon: "UnloadAll.jpg",
  },
};

const load = {
  load: {
    // TODO also png
    icon: "Load.gif",
  },
};

const ccLoad = {
  load: {
    icon: "Load.gif",
  },
};

const burrow = {
  burrow: {
    icon: "Burrow.gif",
  },
  unburrow: {
    icon: "Unburrow.gif",
  },
};

const cloak = {
  cloak: {
    icon: "Cloak.png",
  },
  decloak: {
    icon: "Decloack.jpg",
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
  attack: {
    icon: "Attack.png",
  },
  build: {
    icon: "Build.png",
  },
  buildAdvanced: {
    icon: "BuildAdvanced.png",
  },
  cancel: {
    icon: "Cancel.png",
  },
  gather: {
    icon: "Gather.png",
  },
  holdPosition: {
    icon: "HoldPosition.png",
  },
  move: {
    icon: "Move.png",
  },
  patrol: {
    icon: "Patrol.png",
  },
  returnCargo: {
    icon: "ReturnCargo.png",
  },
  setRallyPoint: {
    // TODO Setrallypoint.png
    icon: "Rally.jpg",
  },
  setWorkerRallyPoint: {
    icon: "Setworkerrallypoint.png",
  },
  spray: {
    icon: "color.jpg",
  },
  stop: {
    // TODO Stop.png
    icon: "Halt.png",
  },
};

export const BUILDINGS = {
  armory: {
    race: TERRAN,
    build: "advanced",
    icon: "armory.jpg",
  },
  assimilator: {
    race: PROTOSS,
    build: "basic",
    icon: "assimilator.jpg",
  },
  banelingNest: {
    race: ZERG,
    build: "basic",
    icon: "banelingnest.jpg",
  },
  barracks: {
    race: TERRAN,
    build: "basic",
    icon: "barracks.jpg",
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
    abilities: {
      ...stim,
      ...load,
      ...unload,
      salvage: {
        icon: "Salvage.gif",
      },
    },
  },
  commandCenter: {
    race: TERRAN,
    build: "basic",
    icon: "commandcenter.jpg",
    parent: "commandCenterBase",
    abilities: {
      ...liftoff,
      ...unload,
      ...ccLoad,
      orbitalCommand: {
        icon: "orbitalcommand.jpg",
      },
      planetaryFortress: {
        icon: "planetaryfortress.jpg",
      },
    },
  },
  cyberneticsCore: {
    race: PROTOSS,
    build: "basic",
    icon: "cyberneticscore.jpg",
  },
  darkShrine: {
    race: PROTOSS,
    build: "advanced",
    icon: "darkshrine.jpg",
  },
  engineeringBay: {
    race: TERRAN,
    build: "basic",
    icon: "engineeringbay.jpg",
  },
  evolutionChamber: {
    race: ZERG,
    build: "basic",
    icon: "evolutionchamber.jpg",
  },
  extractor: {
    race: ZERG,
    build: "basic",
    // TODO also png
    icon: "extractor.jpg",
  },
  factory: {
    race: TERRAN,
    build: "advanced",
    icon: "factory.jpg",
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
  },
  forge: {
    race: PROTOSS,
    build: "basic",
    icon: "forge.jpg",
  },
  fusionCore: {
    race: TERRAN,
    build: "advanced",
    icon: "fusioncore.jpg",
  },
  gateway: {
    race: PROTOSS,
    build: "basic",
    icon: "gateway.jpg",
  },
  ghostAcademy: {
    race: TERRAN,
    build: "advanced",
    icon: "ghostacademy.jpg",
  },
  greaterSpire: {
    race: ZERG,
    parent: "b/spire",
    icon: "greaterspire.jpg",
  },
  hatchery: {
    race: ZERG,
    build: "basic",
    icon: "hatchery.jpg",
  },
  hydraliskDen: {
    race: ZERG,
    build: "advanced",
    icon: "hydraliskden.jpg",
  },
  infestationPit: {
    race: ZERG,
    build: "advanced",
    icon: "infestationpit.jpg",
  },
  missileTurret: {
    race: TERRAN,
    build: "basic",
    icon: "missileturret.jpg",
  },
  nexus: {
    race: PROTOSS,
    build: "basic",
    icon: "nexus.jpg",
    abilities: {
      chronoBoost: {
        icon: "ChronoBoost.png",
      },
    },
  },
  nydusNetwork: {
    race: ZERG,
    build: "advanced",
    icon: "nydusnetwork.jpg",
    abilities: {
      nydusWorm: {
        icon: "NydusWorm.jpeg",
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
      },
      scan: {
        icon: "Scan.png",
      },
      supplyDrop: {
        icon: "SupplyDrop.png",
      },
    },
  },
  photonCannon: {
    race: PROTOSS,
    build: "basic",
    icon: "photoncannon.jpg",
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
  },
  refinery: {
    race: TERRAN,
    build: "basic",
    // TODO png
    icon: "refinery.jpg",
  },
  roachWarren: {
    race: ZERG,
    build: "basic",
    icon: "roachwarren.jpg",
  },
  roboticsBay: {
    race: PROTOSS,
    build: "advanced",
    icon: "roboticsbay.jpg",
  },
  roboticsFacility: {
    race: PROTOSS,
    build: "advanced",
    icon: "roboticsfacility.jpg",
  },
  sensorTower: {
    race: TERRAN,
    build: "basic",
    icon: "sensortower.jpg",
  },
  spawningPool: {
    race: ZERG,
    build: "basic",
    icon: "spawningpool.jpg",
  },
  spineCrawler: {
    race: ZERG,
    build: "basic",
    icon: "spinecrawler.jpg",
  },
  spire: {
    race: ZERG,
    build: "advanced",
    icon: "spire.jpg",
  },
  sporeCrawler: {
    race: ZERG,
    build: "basic",
    icon: "sporecrawler.jpg",
  },
  stargate: {
    race: PROTOSS,
    build: "advanced",
    icon: "stargate.jpg",
  },
  starport: {
    race: TERRAN,
    build: "advanced",
    icon: "starport.jpg",
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
    abilities: {
      lower: {
        icon: "Lower.gif",
      },
      raise: {
        icon: "supplydepot.jpg",
      },
    },
  },
  templarArchive: {
    race: PROTOSS,
    build: "advanced",
    icon: "templararchive.jpg",
  },
  twilightCouncil: {
    race: PROTOSS,
    build: "advanced",
    icon: "twilightcouncil.jpg",
  },
  ultraliskCavern: {
    race: ZERG,
    build: "advanced",
    icon: "ultraliskcavern.jpg",
  },
};

export const UNITS = {
  archon: {
    race: PROTOSS,
    icon: "archon.jpg",
  },
  baneling: {
    race: ZERG,
    icon: "baneling.jpg",
    abilities: {
      enableBuildingAttack: {
        icon: "EnableBuildingAttack.png",
      },
      explode: {
        // TODO also png
        icon: "Explode.gif",
      },
    },
  },
  banshee: {
    race: TERRAN,
    building: "starport",
    icon: "banshee.jpg",
    abilities: {
      ...cloak,
    },
  },
  battlecruiser: {
    race: TERRAN,
    building: "starport",
    icon: "battlecruiser.jpg",
    abilities: {
      tacticalJump: {
        icon: "Tactical_Jump.png",
      },
      yamatoCannon: {
        icon: "YamatoCannon.png",
      },
    },
  },
  broodlord: {
    race: ZERG,
    icon: "broodlord.jpg",
  },
  carrier: {
    race: PROTOSS,
    building: "stargate",
    icon: "carrier.jpg",
    abilities: {
      trainInterceptor: {
        icon: "TrainInterceptors.gif",
      },
    },
  },
  colossus: {
    race: PROTOSS,
    building: "roboticsFacility",
    icon: "colossus.jpg",
  },
  corruptor: {
    race: ZERG,
    building: "larva",
    icon: "corruptor.jpg",
    abilities: {
      causticSpray: {
        icon: "CorruptionAbility.png",
      },
    },
  },
  cyclone: {
    race: TERRAN,
    building: "factory",
    icon: "cyclone.png",
    abilities: {
      lockOn: {
        icon: "Lock_On.jpg",
      },
    },
  },
  darkTemplar: {
    race: PROTOSS,
    building: "gateway",
    icon: "darktemplar.jpg",
  },
  drone: {
    race: ZERG,
    building: "larva",
    parent: "worker",
    icon: "drone.jpg",
    abilities: {
      ...burrow,
    },
  },
  ghost: {
    race: TERRAN,
    building: "barracks",
    icon: "ghost.jpg",
    abilities: {
      ...cloak,
      emp: {
        icon: "EMP.png",
      },
      nukeCalldown: {
        icon: "NukeCalldown.png",
      },
      snipe: {
        icon: "Snipe.png",
      },
      holdFire: {
        icon: "btn-ability-terran-holdfire.jpg",
      },
      weaponsFree: {
        // TODO also "btn-ability-terran-weaponsfree.jpg",
        icon: "WeaponsFree.png",
      },
    },
  },
  hellbat: {
    race: TERRAN,
    building: "factory",
    parent: "u/hellion",
    icon: "hellbat.jpg",
  },
  hellion: {
    race: TERRAN,
    building: "factory",
    icon: "hellion.jpg",
    abilities: {
      toHellbat: {
        icon: "hellbat.jpg",
      },
      toHellion: {
        icon: "hellion.jpg",
      },
    },
  },
  highTemplar: {
    race: PROTOSS,
    building: "gateway",
    icon: "hightemplar.jpg",
    abilities: {
      feedback: {
        icon: "Feedback.png",
      },
      hallucination: {
        icon: "Hallucination.png",
      },
      psiStorm: {
        icon: "PsiStorm.png",
      },
      warpArchon: {
        // TODO also png
        icon: "AWrp.gif",
      },
    },
  },
  hydralisk: {
    race: ZERG,
    building: "larva",
    icon: "hydralisk.jpg",
  },
  immortal: {
    race: PROTOSS,
    building: "roboticsFacility",
    icon: "immortal.jpg",
  },
  infestor: {
    race: ZERG,
    building: "larva",
    icon: "infestor.jpg",
    abilities: {
      fungalGrowth: {
        icon: "FungalGrowth.png",
      },
      neuralParasite: {
        icon: "NeuralParasite.png",
      },
    },
  },
  liberator: {
    race: TERRAN,
    building: "starport",
    icon: "liberator.png",
    abilities: {
      defender: {
        icon: "Defender_mode.png",
      },
      fighter: {
        icon: "Fighter_mode_liberator.png",
      },
    },
  },
  marauder: {
    race: TERRAN,
    building: "barracks",
    icon: "marauder.jpg",
    abilities: {
      ...stim,
    },
  },
  marine: {
    race: TERRAN,
    building: "barracks",
    icon: "marine.jpg",
    abilities: {
      ...stim,
    },
  },
  medivac: {
    race: TERRAN,
    building: "starport",
    icon: "medivac.jpg",
    abilities: {
      ...load,
      ...unload,
      afterburners: {
        icon: "MedivacSpeedBoost.png",
      },
      heal: {
        icon: "Heal.png",
      },
    },
  },
  mothership: {
    race: PROTOSS,
    building: "nexus",
    icon: "mothership.jpg",
    abilities: {
      massRecall: {
        icon: "MassRecall.png",
      },
    },
  },
  mutalisk: {
    race: ZERG,
    building: "larva",
    icon: "mutalisk.jpg",
  },
  observer: {
    race: PROTOSS,
    building: "roboticsFacility",
    icon: "observer.jpg",
  },
  oracle: {
    race: PROTOSS,
    building: "stargate",
    icon: "oracle.jpg",
    abilities: {
      activatePulsarBeam: {
        icon: "PulsarBeam.png",
      },
      deactivatePulsarBeam: {
        icon: "PulsarBeamOff.jpg",
      },
      revelation: {
        icon: "OracleRevelation.png",
      },
    },
  },
  overlord: {
    race: ZERG,
    building: "larva",
    icon: "overlord.jpg",
    abilities: {
      generateCreep: {
        icon: "GenerateCreep.png",
      },
      morphToOverseer: {
        icon: "MorphToOverseer.png",
      },
      mutateVentralSacs: {
        icon: "VentralSacs.gif",
      },
      stopGeneratingCreep: {
        icon: "StopGenerateCreep.png",
      },
    },
  },
  overseer: {
    race: ZERG,
    icon: "overseer.jpg",
    abilities: {
      changeling: {
        // TODO SpawnChangeling.gif
        icon: "changeling.jpg",
      },
      contaminate: {
        icon: "Contaminate.png",
      },
    },
  },
  phoenix: {
    race: PROTOSS,
    building: "stargate",
    icon: "phoenix.jpg",
    abilities: {
      gravitonBeam: {
        icon: "GravitonBeam.png",
      },
    },
  },
  probe: {
    race: PROTOSS,
    building: "nexus",
    parent: "worker",
    icon: "probe.jpg",
  },
  queen: {
    race: ZERG,
    building: "hatchery",
    icon: "queen.jpg",
    abilities: {
      creepTumor: {
        // TODO SpawnCreepTumor.gif
        icon: "BuildCreepTumor.png",
      },
      transfusion: {
        icon: "Transfusion.png",
      },
    },
  },
  raven: {
    race: TERRAN,
    building: "starport",
    icon: "raven.jpg",
    abilities: {
      antiArmorMissile: {
        icon: "HunterSeekerMissile.png",
      },
      autoturret: {
        // TODO also autoturret.jpg, BuildAutoTurret.png
        icon: "Build_auto_turret.gif",
      },
      interferenceMatrix: {
        icon: "Interference_Matrix.png",
      },
    },
  },
  reaper: {
    race: TERRAN,
    building: "barracks",
    icon: "reaper.jpg",
    abilities: {
      kd8Charge: {
        icon: "KD8_Charge.jpg",
      },
    },
  },
  roach: {
    race: ZERG,
    building: "larva",
    icon: "roach.jpg",
  },
  scv: {
    race: TERRAN,
    building: "commandCenter",
    parent: "worker",
    icon: "scv.jpg",
    abilities: {
      repair: {
        // TODO png
        icon: "Repair.gif",
      },
    },
  },
  sentry: {
    race: PROTOSS,
    building: "gateway",
    icon: "sentry.jpg",
    abilities: {
      forceField: {
        // TODO also png
        icon: "Force_field.gif",
      },
      guardianShield: {
        icon: "GuardianShield.gif",
      },
    },
  },
  siegeTank: {
    race: TERRAN,
    building: "factory",
    icon: "siegetank.jpg",
    abilities: {
      siegeMode: {
        // TODO png
        icon: "SiegeMode.gif",
      },
      tankMode: {
        icon: "Unsiege.png",
      },
    },
  },
  stalker: {
    race: PROTOSS,
    building: "gateway",
    icon: "stalker.jpg",
    abilities: {
      blink: {
        icon: "Blink.png",
      },
    },
  },
  swarmHost: {
    race: ZERG,
    building: "larva",
    icon: "swarmhost.jpg",
    abilities: {
      spawnLocusts: {
        icon: "SpawnLocusts.png",
      },
    },
  },
  tempest: {
    race: PROTOSS,
    building: "stargate",
    icon: "Tempest.png",
  },
  thor: {
    race: TERRAN,
    building: "factory",
    icon: "thor.jpg",
    abilities: {
      explosivePayload: {
        icon: "ExplosivePayload.png",
        desc: "High single-target anti-air"
      },
      highImpactPayload: {
        icon: "HighImpactPayload.png",
        desc: "Splash and anti-light anti-air",
      },
    },
  },
  ultralisk: {
    race: ZERG,
    building: "larva",
    icon: "ultralisk.jpg",
  },
  viking: {
    race: TERRAN,
    building: "starport",
    icon: "viking.jpg",
    abilities: {
      assaultMode: {
        // TODO also png
        icon: "AssaultMode.gif",
      },
      fighterMode: {
        // TODO also png
        icon: "Fighter_mode.gif",
      },
    },
  },
  viper: {
    race: ZERG,
    building: "larva",
    icon: "viper.jpg",
    abilities: {
      abduct: {
        icon: "ViperAbduct.png",
      },
      blindingCloud: {
        icon: "BlindingCloud.png",
      },
      consume: {
        icon: "ViperConsume.png",
      },
    },
  },
  voidRay: {
    race: PROTOSS,
    building: "stargate",
    icon: "voidray.jpg",
    abilities: {
      prismaticAlignment: {
        // TODO there are 2
        icon: "prismatic_beams.png",
      },
    },
  },
  warpPrism: {
    race: PROTOSS,
    building: "roboticsFacility",
    icon: "warpprism.jpg",
    abilities: {
      phasingMode: {
        // TODO also png
        icon: "Phasing_mode.gif",
      },
      transportMode: {
        // TODO +2 more
        icon: "Transport_mode.gif",
      },
    },
  },
  widowMine: {
    race: TERRAN,
    building: "factory",
    icon: "widowmine.jpg",
    abilities: {
      burrow: {
        icon: "WidowMineBurrow.png",
      },
      unburrow: {
        icon: "WidowMineUnburrow.jpg",
      },
    },
  },
  zealot: {
    race: PROTOSS,
    building: "gateway",
    icon: "zealot.jpg",
  },
  zergling: {
    race: ZERG,
    building: "larva",
    icon: "zergling.jpg",
  },
};

export const UPGRADES = {
  adrenalGlands: {
    race: ZERG,
    building: "spawningPool",
    icon: "AdrenalGlands.gif",
    desc: "Zergling attack speed",
  },
  advancedBallistics: {
    race: TERRAN,
    building: "fusionCore",
    icon: "Advanced_Ballistics.jpg",
    desc: "Liberator range",
  },
  anionPulseCrystals: {
    race: PROTOSS,
    building: "fleetBeacon",
    icon: "AnionPulseCrystals.png",
    desc: "Phoenix range",
  },
  armNuke: {
    race: TERRAN,
    building: "ghostAcademy",
    icon: "NukeCalldown.png",
  },
  caduceusReactor: {
    race: TERRAN,
    building: "fusionCore",
    icon: "CaduceusReactor.gif",
    desc: "Medivac energy regen",
  },
  centrifugalHooks: {
    race: ZERG,
    building: "banelingNest",
    icon: "CentrifugalHooks.gif",
    desc: "Baneling speed",
  },
  charge: {
    race: PROTOSS,
    building: "twilightCouncil",
    icon: "Charge.png",
    desc: "Zealot speed boost"
  },
  chitinousPlating: {
    race: ZERG,
    building: "ultraliskCavern",
    icon: "ChitinousPlating.gif",
    desc: "Ultralisk armor",
  },
  cloakingField: {
    race: TERRAN,
    building: "starport/techLab",
    icon: "Cloak.png",
  },
  combatShield: {
    race: TERRAN,
    building: "barracks/techLab",
    icon: "CombatShield.png",
    desc: "Marine hitpoints",
  },
  concussiveShells: {
    race: TERRAN,
    building: "barracks/techLab",
    icon: "ConcussiveShells.png",
    desc: "Marauder attacks inflict slow",
  },
  drillingClaws: {
    race: TERRAN,
    building: "factory/techLab",
    icon: "DrillingClaws.png",
    desc: "Widow mine invisibility and burrow/unburrow speed"
  },
  extendedThermalLance: {
    race: PROTOSS,
    building: "roboticsBay",
    icon: "ColossusRange.gif",
    desc: "Colossus range",
  },
  flyerAttack: {
    race: ZERG,
    building: "spire",
    icon: "FlyerAttack1.gif",
  },
  flyerCarapace: {
    race: ZERG,
    building: "spire",
    icon: "FlyerCarapace1.gif",
  },
  glialReconstitution: {
    race: ZERG,
    building: "roachWarren",
    icon: "EvolveGlialRegeneration.gif",
    desc: "Roach speed",
  },
  graviticBoosters: {
    race: PROTOSS,
    building: "roboticsBay",
    icon: "ObserverSpeed.gif",
    desc: "Observer speed",
  },
  graviticDrive: {
    race: PROTOSS,
    building: "roboticsBay",
    icon: "WarpPrismSpeed.gif",
    desc: "Warp prism speed",
  },
  groovedSpines: {
    race: ZERG,
    building: "hydraliskDen",
    icon: "GroovedSpines.gif",
    desc: "Hydralisk range",
  },
  groundCarapace: {
    race: ZERG,
    building: "evolutionChamber",
    icon: "ZergGroundCarapace1.gif",
  },
  hisecAutoTracking: {
    race: TERRAN,
    building: "engineeringBay",
    icon: "HisecAutoTracking.gif",
    desc: "Building range",
  },
  hurricaneEngines: {
    race: TERRAN,
    building: "factory/techLab",
    icon: "Hurricane_Engines.png",
    desc: "Cyclone speed",
  },
  hyperflightRotors: {
    race: TERRAN,
    building: "starport/techLab",
    icon: "Hyperflight_Rotors.jpg",
    desc: "Banshee speed",
  },
  infantryArmor: {
    race: TERRAN,
    building: "engineeringBay",
    icon: "InfantryArmor1.gif",
  },
  infantryWeapons: {
    race: TERRAN,
    building: "engineeringBay",
    icon: "InfantryWeapons1.gif",
  },
  infernalPreigniter: {
    race: TERRAN,
    building: "factory/techLab",
    icon: "InfernalPreigniter.png",
    desc: "Hellion/Hellbat damage vs light",
  },
  interferenceMatrix: {
    race: TERRAN,
    building: "starport/techLab",
    icon: "Interference_Matrix.png",
  },
  meleeAttacks: {
    race: ZERG,
    building: "evolutionChamber",
    icon: "ZergMeleeAttacks1.gif",
  },
  metabolicBoost: {
    race: ZERG,
    building: "spawningPool",
    icon: "MetabolicBoost.gif",
    desc: "Zergling speed",
  },
  missileAttacks: {
    race: ZERG,
    building: "evolutionChamebr",
    icon: "ZergMissileAttacks1.gif",
  },
  muscularAugments: {
    race: ZERG,
    building: "hydraliskDen",
    icon: "MuscularAugments.png",
    desc: "Hydralisk speed",
  },
  neosteelArmor: {
    race: TERRAN,
    building: "engineeringBay",
    icon: "BuildingArmor.gif",
    desc: "Building armor and cargo space",
  },
  personalCloaking: {
    race: TERRAN,
    building: "ghostAcademy",
    icon: "Cloak.png",
  },
  pneumatizedCarapace: {
    race: ZERG,
    building: "hatchery",
    icon: "PneumatizedCarapace.gif",
    desc: "Overlord/Overseer speed",
  },
  protossAirArmor: {
    race: PROTOSS,
    building: "cyberneticsCore",
    icon: "ProtossAirArmorLevel1.gif",
  },
  protossAirWeapons: {
    race: PROTOSS,
    building: "cyberneticsCore",
    icon: "ProtossAirWeaponsLevel1.gif",
  },
  protossGroundArmor: {
    race: PROTOSS,
    building: "forge",
    icon: "ProtossGroundArmorLevel1.gif",
  },
  protossGroundWeapons: {
    race: PROTOSS,
    building: "forge",
    icon: "ProtossGroundWeaponsLevel1.gif",
  },
  protossShields: {
    race: PROTOSS,
    building: "forge",
    icon: "ProtossShieldsLevel1.gif",
  },
  shipWeapons: {
    race: TERRAN,
    building: "armory",
    icon: "Ship_weapons_1.gif",
  },
  smartServos: {
    race: TERRAN,
    building: "factory/techLab",
    icon: "Smart_Servos.png",
    desc: "Faster Hellion/Viking/Thor transformation",
  },
  stimpack: {
    race: TERRAN,
    building: "barracks/techLab",
    icon: "Stim.png",
  },
  tunnelingClaws: {
    race: ZERG,
    building: "roachWarren",
    icon: "EvolveTunnelingClaws.gif",
    desc: "Roach move + heal while burrowed",
  },
  vehiclePlating: {
    race: TERRAN,
    building: "armory",
    icon: "VehiclePlating1.gif",
  },
  vehicleWeapons: {
    race: TERRAN,
    building: "armory",
    icon: "VehicleWeapons1.gif",
  },
  warpgate: {
    race: PROTOSS,
    building: "cyberneticsCore",
    icon: "ResearchWarpgate.gif",
  },
  weaponRefit: {
    race: TERRAN,
    building: "fusionCore",
    icon: "YamatoCannon.png",
  },
};