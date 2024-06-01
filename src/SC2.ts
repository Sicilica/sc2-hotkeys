import { Hotkey, HotkeyLayer, HotkeyProfile } from "./HotkeyProfile";
import { KEYMAP } from "./keymap";

const UNUSED = [
  "btn-ability-terran-holdfire.jpg",
  "btn-ability-terran-weaponsfree.jpg",
  "color.jpg",
  "Envision.png",
  "hive.jpg",
  "interceptor.jpg",
  "lair.jpg",
  "larva.jpg",
  "mule.jpg",
  "Protoss.png",
  "ProtossAirWeapons.png",
  "reactor.jpg",
  "Root.png",
  "Selectbuilder.png",
  "techlab.jpg",
  "Terran.png",
  "Uproot.png",
  "warpgate.jpg",
  "WeaponsFree.png",
  "Zerg.png",
  "starporttechlab.jpg",
]

export const makeHotkeyProfile = (bindings: Array<[Hotkey, keyof typeof KEYMAP]>): HotkeyProfile => {
  return {
    layers: {
      // Building layers

      // Unit layers
      ...Object.fromEntries(Object.entries(UNITS).map(entry => {
        const unit: {
          icon: string;
          abilities?: Record<string, { icon: string }>;
        } = entry[1];
        const layer: HotkeyLayer = {
          keys: {},
        };
        for (const ability of Object.values(unit.abilities ?? {})) {
          const binding = bindings.find(b => b[0] === ability);
          if (binding == null) {
            continue;
          }
          layer.keys[binding[1]] = ability;
        }
        return [`unit::${entry[0]}`, layer];
      })),
    },
  };
};

export const COMMON_ACTIONS = {
  attack: {
    icon: "Attack.png",
  },
  build: {
    icon: "Build.png",
  },
  buildAdvanced: {
    icon: "BuildAdvanced.png",
  },
  burrow: {
    icon: "Burrow.gif",
  },
  cancel: {
    icon: "Cancel.png",
  },
  cloak: {
    icon: "Cloak.png",
  },
  decloak: {
    icon: "Decloack.jpg",
  },
  gather: {
    icon: "Gather.png",
  },
  holdPosition: {
    icon: "HoldPosition.png",
  },
  land: {
    // TODO also png
    icon: "Land.jpg",
  },
  load: {
    // TODO also png
    icon: "Load.gif",
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
  stop: {
    // TODO Stop.png
    icon: "Halt.png",
  },
  unburrow: {
    icon: "Unburrow.gif",
  },
  unloadAll: {
    icon: "UnloadAll.jpg",
  },
};

export const BUILDINGS = {
  armory: {
    icon: "armory.jpg",
  },
  assimilator: {
    icon: "assimilator.jpg",
  },
  banelingNest: {
    icon: "banelingnest.jpg",
  },
  barracks: {
    icon: "barracks.jpg",
  },
  bunker: {
    icon: "bunker.jpg",
    abilities: {
      salvage: {
        icon: "Salvage.gif",
      },
    },
  },
  commandCenter: {
    abilities: {
      orbitalCommand: {
        icon: "orbitalcommand.jpg",
      },
    },
  },
  cyberneticsCore: {
    icon: "cyberneticscore.jpg",
  },
  darkShrine: {
    icon: "darkshrine.jpg",
  },
  engineeringBay: {
    icon: "engineeringbay.jpg",
  },
  evolutionChamber: {
    icon: "evolutionchamber.jpg",
  },
  extractor: {
    // TODO also png
    icon: "extractor.jpg",
  },
  factory: {
    icon: "factory.jpg",
  },
  fleetBeacon: {
    icon: "fleetbeacon.jpg",
  },
  forge: {
    icon: "forge.jpg",
  },
  fusionCore: {
    icon: "fusioncore.jpg",
  },
  gateway: {
    icon: "gateway.jpg",
  },
  ghostAcademy: {
    icon: "ghostacademy.jpg",
  },
  greaterSpire: {
    icon: "greaterspire.jpg",
  },
  hatchery: {
    icon: "hatchery.jpg",
  },
  hydraliskDen: {
    icon: "hydraliskden.jpg",
  },
  infestationPit: {
    icon: "infestationpit.jpg",
  },
  missileTurret: {
    icon: "missileturret.jpg",
  },
  nexus: {
    icon: "nexus.jpg",
    abilities: {
      chronoBoost: {
        icon: "ChronoBoost.png",
      },
    },
  },
  nydusNetwork: {
    icon: "nydusnetwork.jpg",
    abilities: {
      nydusWorm: {
        icon: "NydusWorm.jpeg",
      },
    },
  },
  orbitalCommand: {
    // TODO surveillancestation.jpg
    icon: "orbitalcommand.jpg",
    abilities: {
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
    icon: "photoncannon.jpg",
  },
  planetaryFortress: {
    icon: "planetaryfortress.jpg",
  },
  pylon: {
    icon: "pylon.jpg",
  },
  refinery: {
    // TODO png
    icon: "refinery.jpg",
  },
  roachWarren: {
    icon: "roachwarren.jpg",
  },
  roboticsBay: {
    icon: "roboticsbay.jpg",
  },
  roboticsFacility: {
    icon: "roboticsfacility.jpg",
  },
  sensorTower: {
    icon: "sensortower.jpg",
  },
  spawningPool: {
    abilities: {
      icon: "spawningpool.jpg",
    },
  },
  spineCrawler: {
    icon: "spinecrawler.jpg",
  },
  spire: {
    icon: "spire.jpg",
  },
  sporeCrawler: {
    icon: "sporecrawler.jpg",
  },
  stargate: {
    icon: "stargate.jpg",
  },
  starport: {
    icon: "starport.jpg",
  },
  supplyDepot: {
    icon: "supplydepot.jpg",
    abilities: {
      lower: {
        icon: "Lower.gif",
      },
    },
  },
  templarArchive: {
    icon: "templararchive.jpg",
  },
  twilightCouncil: {
    icon: "twilightcouncil.jpg",
  },
  ultraliskCavern: {
    icon: "ultraliskcavern.jpg",
  },
};

export const UNITS = {
  archon: {
    icon: "archon.jpg",
  },
  baneling: {
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
    icon: "banshee.jpg",
  },
  battlecruiser: {
    icon: "battlecruiser.jpg",
    abilities: {
      yamatoCannon: {
        icon: "YamatoCannon.png",
      },
    },
  },
  broodlord: {
    icon: "broodlord.jpg",
  },
  carrier: {
    icon: "carrier.jpg",
    abilities: {
      trainInterceptor: {
        icon: "TrainInterceptors.gif",
      },
    },
  },
  colossus: {
    icon: "colossus.jpg",
  },
  corruptor: {
    icon: "corruptor.jpg",
    abilities: {
      causticSpray: {
        icon: "CorruptionAbility.png",
      },
    },
  },
  commandCenter: {
    icon: "commandcenter.jpg",
  },
  darkTemplar: {
    icon: "darktemplar.jpg",
  },
  drone: {
    icon: "drone.jpg",
  },
  ghost: {
    icon: "ghost.jpg",
    abilities: {
      emp: {
        icon: "EMP.png",
      },
      nukeCalldown: {
        icon: "NukeCalldown.png",
      },
      snipe: {
        icon: "Snipe.png",
      },
    },
  },
  hellbat: {
    icon: "hellbat.jpg",
  },
  hellion: {
    icon: "hellion.jpg",
  },
  highTemplar: {
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
    icon: "hydralisk.jpg",
  },
  immortal: {
    icon: "immortal.jpg",
  },
  infestor: {
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
  marauder: {
    icon: "marauder.jpg",
  },
  marine: {
    icon: "marine.jpg",
    abilities: {
      stimpack: {
        icon: "Stim.png",
      },
    },
  },
  medivac: {
    icon: "medivac.jpg",
    abilities: {
      boost: {
        icon: "MedivacSpeedBoost.png",
      },
      heal: {
        icon: "Heal.png",
      },
    },
  },
  mothership: {
    icon: "mothership.jpg",
    abilities: {
      massRecall: {
        icon: "MassRecall.png",
      },
    },
  },
  mutalisk: {
    icon: "mutalisk.jpg",
  },
  observer: {
    icon: "observer.jpg",
  },
  oracle: {
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
    icon: "phoenix.jpg",
    abilities: {
      gravitonBeam: {
        icon: "GravitonBeam.png",
      },
    },
  },
  probe: {
    icon: "probe.jpg",
  },
  queen: {
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
    icon: "raven.jpg",
    abilities: {
      antiArmorMissile: {
        icon: "HunterSeekerMissile.png",
      },
      autoturret: {
        // TODO also autoturret.jpg, BuildAutoTurret.png
        icon: "Build_auto_turret.gif",
      },
    },
  },
  reaper: {
    icon: "reaper.jpg",
  },
  roach: {
    icon: "roach.jpg",
  },
  scv: {
    icon: "scv.jpg",
    abilities: {
      repair: {
        // TODO png
        icon: "Repair.gif",
      },
    },
  },
  sentry: {
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
    icon: "stalker.jpg",
    abilities: {
      blink: {
        icon: "Blink.png",
      },
    },
  },
  swarmHost: {
    icon: "swarmhost.jpg",
    abilities: {
      spawnLocusts: {
        icon: "SpawnLocusts.png",
      },
    },
  },
  tempest: {
    icon: "Tempest.png",
  },
  thor: {
    icon: "thor.jpg",
    abilities: {
      explosivePayload: {
        icon: "ExplosivePayload.png",
      },
      highImpactPayload: {
        icon: "HighImpactPayload.png",
      },
    },
  },
  ultralisk: {
    icon: "ultralisk.jpg",
  },
  viking: {
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
    icon: "voidray.jpg",
    abilities: {
      prismaticAlignment: {
        // TODO there are 2
        icon: "prismatic_beams.png",
      },
    },
  },
  warpPrism: {
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
    icon: "zealot.jpg",
  },
  zergling: {
    icon: "zergling.jpg",
  },
};

export const UPGRADES = {
  adrenalGlands: {
    building: "spawningPool",
    icon: "AdrenalGlands.gif",
    desc: "Zergling attack speed",
  },
  anionPulseCrystals: {
    building: "fleetBeacon",
    icon: "AnionPulseCrystals.png",
    desc: "Phoenix range",
  },
  caduceusReactor: {
    building: "fusionCore",
    icon: "CaduceusReactor.gif",
    desc: "Medivac energy regen",
  },
  centrifugalHooks: {
    building: "banelingNest",
    icon: "CentrifugalHooks.gif",
    desc: "Baneling speed",
  },
  charge: {
    building: "twilightCouncil",
    icon: "Charge.png",
    desc: "Zealot speed boost"
  },
  chitinousPlating: {
    building: "ultraliskCavern",
    icon: "ChitinousPlating.gif",
    desc: "Ultralisk armor",
  },
  combatShield: {
    // TODO this would be a reason for different tech lab icons
    // barrackstechlab.jpg
    building: "barracks_techLab",
    icon: "CombatShield.png",
    desc: "Marine hitpoints",
  },
  concussiveShells: {
    building: "barracks_techLab",
    icon: "ConcussiveShells.png",
    desc: "Marauder attacks inflict slow",
  },
  drillingClaws: {
    // factorytechlab.jpg
    building: "factory_techLab",
    icon: "DrillingClaws.png",
    desc: "Widow mine invisibility and burrow/unburrow speed"
  },
  extendedThermalLance: {
    building: "roboticsBay",
    icon: "ColossusRange.gif",
    desc: "Colossus range",
  },
  flyerAttack: {
    building: "spire",
    icon: "FlyerAttack1.gif",
  },
  flyerCarapace: {
    building: "spire",
    icon: "FlyerCarapace1.gif",
  },
  glialReconstitution: {
    building: "roachWarren",
    icon: "EvolveGlialRegeneration.gif",
    desc: "Roach speed",
  },
  graviticBoosters: {
    building: "roboticsBay",
    icon: "ObserverSpeed.gif",
    desc: "Observer speed",
  },
  graviticDrive: {
    building: "roboticsBay",
    icon: "WarpPrismSpeed.gif",
    desc: "Warp prism speed",
  },
  groovedSpines: {
    building: "hydraliskDen",
    icon: "GroovedSpines.gif",
    desc: "Hydralisk range",
  },
  groundCarapace: {
    building: "evolutionChamber",
    icon: "ZergGroundCarapace1.gif",
  },
  hisecAutoTracking: {
    building: "engineeringBay",
    icon: "HisecAutoTracking.gif",
    desc: "Building range",
  },
  infantryArmor: {
    building: "engineeringBay",
    icon: "InfantryArmor1.gif",
  },
  infantryWeapons: {
    building: "engineeringBay",
    icon: "InfantryWeapons1.gif",
  },
  infernalPreigniter: {
    building: "factory_techLab",
    icon: "InfernalPreigniter.png",
    desc: "Hellion/Hellbat damage vs light",
  },
  meleeAttacks: {
    building: "evolutionChamber",
    icon: "ZergMeleeAttacks1.gif",
  },
  metabolicBoost: {
    building: "spawningPool",
    icon: "MetabolicBoost.gif",
    desc: "Zergling speed",
  },
  missileAttacks: {
    building: "evolutionChamebr",
    icon: "ZergMissileAttacks1.gif",
  },
  muscularAugments: {
    building: "hydraliskDen",
    icon: "MuscularAugments.png",
    desc: "Hydralisk speed",
  },
  neosteelArmor: {
    building: "engineeringBay",
    icon: "BuildingArmor.gif",
    desc: "Building armor and cargo space",
  },
  pneumatizedCarapace: {
    building: "hatchery",
    icon: "PneumatizedCarapace.gif",
    desc: "Overlord/Overseer speed",
  },
  protossAirArmor: {
    building: "cyberneticsCore",
    icon: "ProtossAirArmorLevel1.gif",
  },
  protossAirWeapons: {
    building: "cyberneticsCore",
    icon: "ProtossAirWeaponsLevel1.gif",
  },
  protossGroundArmor: {
    building: "forge",
    icon: "ProtossGroundArmorLevel1.gif",
  },
  protossGroundWeapons: {
    building: "forge",
    icon: "ProtossGroundWeaponsLevel1.gif",
  },
  protossShields: {
    building: "forge",
    icon: "ProtossShieldsLevel1.gif",
  },
  stimpack: {
    building: "barracks_techLab",
    icon: "Stim.png",
  },
  tunnelingClaws: {
    building: "roachWarren",
    icon: "EvolveTunnelingClaws.gif",
    desc: "Roach move + heal while burrowed",
  },
  vehiclePlating: {
    building: "armory",
    icon: "VehiclePlating1.gif",
  },
  vehicleWeapons: {
    building: "armory",
    icon: "VehicleWeapons1.gif",
  },
  warpgate: {
    building: "cyberneticsCore",
    icon: "ResearchWarpgate.gif",
  },
};