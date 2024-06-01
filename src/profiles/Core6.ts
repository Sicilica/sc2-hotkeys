import * as SC2 from "../SC2";

export const Core6 = SC2.makeHotkeyProfile([
  [SC2.ABILITIES.cancel, "7"],
  [SC2.ABILITIES.attack, ";"],
  [SC2.ABILITIES.holdPosition, "'"],
  [SC2.ABILITIES.stop, "."],
  [SC2.ABILITIES.patrol, "y"],
  [SC2.ABILITIES.build, "k"],
  [SC2.ABILITIES.build, "p"],
  [SC2.ABILITIES.buildAdvanced, "/"],
  [SC2.ABILITIES.load, "."],
  [SC2.ABILITIES.unloadAll, "/"],
  [SC2.ABILITIES.returnCargo, "-"],
  [SC2.ABILITIES.gather, "="],
  [SC2.ABILITIES.spray, "back"],
  // [SC2.ABILITIES.setRallyPoint, ""],

  /*
   * TERRAN
   */
  [SC2.UNITS.scv, "p"],
  [SC2.UNITS.marine, ";"],
  [SC2.UNITS.marauder, "p"],
  [SC2.UNITS.reaper, "/"],
  [SC2.UNITS.ghost, "'"],
  [SC2.UNITS.hellion, ";"],
  [SC2.UNITS.widowMine, "p"],
  [SC2.UNITS.siegeTank, "/"],
  [SC2.UNITS.thor, "'"],
  [SC2.UNITS.cyclone, "."],
  [SC2.UNITS.hellbat, "-"],
  [SC2.UNITS.viking, ";"],
  [SC2.UNITS.liberator, "p"],
  [SC2.UNITS.medivac, "/"],
  [SC2.UNITS.raven, "'"],
  [SC2.UNITS.banshee, "."],
  [SC2.UNITS.battlecruiser, "-"],

  [SC2.BUILDINGS.missileTurret, ";"],
  [SC2.BUILDINGS.supplyDepot, "k"],
  [SC2.BUILDINGS.barracks, "p"],
  [SC2.BUILDINGS.refinery, "/"],
  [SC2.BUILDINGS.bunker, "["],
  [SC2.BUILDINGS.engineeringBay, "'"],
  [SC2.BUILDINGS.sensorTower, "."],
  [SC2.BUILDINGS.commandCenter, "-"],
  [SC2.BUILDINGS.starport, ";"],
  [SC2.BUILDINGS.factory, "k"],
  [SC2.BUILDINGS.ghostAcademy, "p"],
  [SC2.BUILDINGS.armory, "'"],
  [SC2.BUILDINGS.fusionCore, "."],

  [SC2.ABILITIES.buildReactor, "k"],
  [SC2.ABILITIES.buildTechLab, "["],
  [SC2.ABILITIES.liftOff, "]"],
  // [SC2.ABILITIES.land, "]"],
  [SC2.ABILITIES.stimpack, "k"],
  [SC2.ABILITIES.cloak, "["],
  [SC2.ABILITIES.decloak, "]"],

  [SC2.BUILDINGS.bunker.abilities.salvage, "p"],
  [SC2.BUILDINGS.commandCenter.abilities.load, "\\"],
  [SC2.BUILDINGS.commandCenter.abilities.orbitalCommand, ";"],
  [SC2.BUILDINGS.commandCenter.abilities.planetaryFortress, "k"],
  [SC2.BUILDINGS.orbitalCommand.abilities.calldownMule, ";"],
  [SC2.BUILDINGS.orbitalCommand.abilities.scan, "k"],
  [SC2.BUILDINGS.orbitalCommand.abilities.supplyDrop, "/"],
  [SC2.BUILDINGS.supplyDepot.abilities.raise, "k"],
  [SC2.BUILDINGS.supplyDepot.abilities.lower, "p"],

  [SC2.UPGRADES.infantryWeapons, ";"],
  [SC2.UPGRADES.infantryArmor, "k"],
  [SC2.UPGRADES.hisecAutoTracking, "p"],
  [SC2.UPGRADES.neosteelArmor, "["],
  [SC2.UPGRADES.vehicleWeapons, ";"],
  [SC2.UPGRADES.vehiclePlating, "k"],
  [SC2.UPGRADES.shipWeapons, "p"],
  [SC2.UPGRADES.stimpack, ";"],
  [SC2.UPGRADES.concussiveShells, "k"],
  [SC2.UPGRADES.combatShield, "p"],
  [SC2.UPGRADES.infernalPreigniter, ";"],
  [SC2.UPGRADES.drillingClaws, "k"],
  [SC2.UPGRADES.smartServos, "p"],
  [SC2.UPGRADES.hurricaneEngines, "["],
  [SC2.UPGRADES.interferenceMatrix, ";"],
  [SC2.UPGRADES.hyperflightRotors, "k"],
  [SC2.UPGRADES.cloakingField, "["],
  [SC2.UPGRADES.armNuke, ";"],
  [SC2.UPGRADES.personalCloaking, "["],
  [SC2.UPGRADES.advancedBallistics, "k"],
  [SC2.UPGRADES.weaponRefit, "p"],
  [SC2.UPGRADES.caduceusReactor, "/"],

  [SC2.UNITS.scv.abilities.repair, "["],
  [SC2.UNITS.battlecruiser.abilities.tacticalJump, "k"],
  [SC2.UNITS.battlecruiser.abilities.tacticalJump, "["],
  [SC2.UNITS.battlecruiser.abilities.yamatoCannon, "p"],
  [SC2.UNITS.cyclone.abilities.lockOn, "k"],
  [SC2.UNITS.cyclone.abilities.lockOn, "p"],
  [SC2.UNITS.ghost.abilities.emp, "k"],
  [SC2.UNITS.ghost.abilities.holdFire, "/"],
  [SC2.UNITS.ghost.abilities.snipe, "p"],
  [SC2.UNITS.ghost.abilities.weaponsFree, "-"],
  [SC2.UNITS.ghost.abilities.nukeCalldown, "="],
  [SC2.UNITS.hellion.abilities.toHellbat, "k"],
  [SC2.UNITS.hellion.abilities.toHellion, "p"],
  [SC2.UNITS.liberator.abilities.defender, "k"],
  [SC2.UNITS.liberator.abilities.fighter, "p"],
  [SC2.UNITS.liberator.abilities.defender, "["],
  [SC2.UNITS.medivac.abilities.afterburners, "k"],
  [SC2.UNITS.medivac.abilities.heal, "["],
  [SC2.UNITS.raven.abilities.interferenceMatrix, "k"],
  [SC2.UNITS.raven.abilities.autoturret, "p"],
  [SC2.UNITS.raven.abilities.antiArmorMissile, "["],
  [SC2.UNITS.reaper.abilities.kd8Charge, "k"],
  [SC2.UNITS.reaper.abilities.kd8Charge, "p"],
  [SC2.UNITS.siegeTank.abilities.siegeMode, "k"],
  [SC2.UNITS.siegeTank.abilities.tankMode, "p"],
  [SC2.UNITS.thor.abilities.highImpactPayload, "k"],
  [SC2.UNITS.thor.abilities.explosivePayload, "p"],
  [SC2.UNITS.viking.abilities.assaultMode, "k"],
  [SC2.UNITS.viking.abilities.fighterMode, "p"],
  [SC2.UNITS.widowMine.abilities.burrow, "k"],
  [SC2.UNITS.widowMine.abilities.unburrow, "p"],



  /*
   * PROTOSS
   */
  [SC2.UNITS.zealot, ";"],



  /*
   * ZERG
   */
  [SC2.UNITS.zergling, ";"],
  [SC2.UNITS.roach, "k"],
  [SC2.UNITS.drone, "p"],
  [SC2.UNITS.overlord, "/"],
  [SC2.UNITS.hydralisk, "["],
  [SC2.UNITS.queen, "'"],
  [SC2.UNITS.infestor, "'"],
  [SC2.UNITS.mutalisk, "."],
  [SC2.UNITS.corruptor, "-"],
  [SC2.UNITS.swarmHost, "]"],
  [SC2.UNITS.viper, "="],
  [SC2.UNITS.ultralisk, "back"],

  [SC2.BUILDINGS.sporeCrawler, ";"],
  [SC2.BUILDINGS.spawningPool, "k"],
  [SC2.BUILDINGS.roachWarren, "p"],
  [SC2.BUILDINGS.extractor, "/"],
  [SC2.BUILDINGS.spineCrawler, "["],
  [SC2.BUILDINGS.evolutionChamber, "'"],
  [SC2.BUILDINGS.banelingNest, "."],
  [SC2.BUILDINGS.hatchery, "-"],
  [SC2.BUILDINGS.spire, ";"],
  [SC2.BUILDINGS.hydraliskDen, "k"],
  [SC2.BUILDINGS.infestationPit, "p"],
  [SC2.BUILDINGS.lurkerDen, "["],
  [SC2.BUILDINGS.nydusNetwork, "'"],
  [SC2.BUILDINGS.ultraliskCavern, "-"],

  [SC2.ABILITIES.burrow, "["],
  [SC2.ABILITIES.unburrow, "]"],

  [SC2.BUILDINGS.hatchery.abilities.selectLarva, ";"],
  [SC2.BUILDINGS.hatchery.abilities.selectLarva, "k"],
  [SC2.BUILDINGS.hatchery.abilities.selectLarva, "p"],
  [SC2.BUILDINGS.hatchery.abilities.selectLarva, "/"],
  [SC2.BUILDINGS.hatchery.abilities.selectLarva, "["],
  [SC2.BUILDINGS.hatchery.abilities.selectLarva, "."],
  [SC2.BUILDINGS.hatchery.abilities.selectLarva, "-"],
  [SC2.BUILDINGS.hatchery.abilities.selectLarva, "]"],
  [SC2.BUILDINGS.hatchery.abilities.morphLairHive, "back"],
  [SC2.BUILDINGS.spire.abilities.morphGreaterSpire, "p"],
  [SC2.BUILDINGS.nydusNetwork.abilities.nydusWorm, "k"],
  [SC2.BUILDINGS.spineCrawler.abilities.root, "k"],
  [SC2.BUILDINGS.spineCrawler.abilities.uproot, "p"],
  
  [SC2.UPGRADES.burrow, "="],
  [SC2.UPGRADES.pneumatizedCarapace, "\\"],
  [SC2.UPGRADES.meleeAttacks, ";"],
  [SC2.UPGRADES.groundCarapace, "k"],
  [SC2.UPGRADES.missileAttacks, "p"],
  [SC2.UPGRADES.flyerAttack, ";"],
  [SC2.UPGRADES.flyerCarapace, "k"],
  [SC2.UPGRADES.centrifugalHooks, ";"],
  [SC2.UPGRADES.muscularAugments, ";"],
  [SC2.UPGRADES.groovedSpines, "k"],
  [SC2.UPGRADES.neuralParasite, "k"],
  [SC2.UPGRADES.adaptiveTalons, ";"],
  [SC2.UPGRADES.seismicSpines, "k"],
  [SC2.UPGRADES.glialReconstitution, ";"],
  [SC2.UPGRADES.tunnelingClaws, "k"],
  [SC2.UPGRADES.metabolicBoost, ";"],
  [SC2.UPGRADES.adrenalGlands, "k"],
  [SC2.UPGRADES.anabolicSynthesis, ";"],
  [SC2.UPGRADES.chitinousPlating, "k"],

  [SC2.UNITS.baneling.abilities.explode, "k"],
  [SC2.UNITS.baneling.abilities.disableStructureAttack, "/"],
  [SC2.UNITS.baneling.abilities.enableStructureAttack, "-"],
  [SC2.UNITS.corruptor.abilities.causticSpray, "k"],
  [SC2.UNITS.corruptor.abilities.causticSpray, "["],
  [SC2.UNITS.corruptor.abilities.morphBroodLord, "p"],
  [SC2.UNITS.hydralisk.abilities.morphLurker, "p"],
  [SC2.UNITS.infestor.abilities.fungalGrowth, "k"],
  [SC2.UNITS.infestor.abilities.microbialShroud, "p"],
  [SC2.UNITS.infestor.abilities.neuralParasite, "/"],
  [SC2.UNITS.lurker.abilities.burrow, "k"],
  [SC2.UNITS.lurker.abilities.unburrow, "p"],
  [SC2.UNITS.lurker.abilities.holdFire, "/"],
  [SC2.UNITS.lurker.abilities.release, "["],
  [SC2.UNITS.overlord.abilities.mutateVentralSacs, "k"],
  [SC2.UNITS.overlord.abilities.morphToOverseer, "p"],
  [SC2.UNITS.overlord.abilities.load, "["],
  [SC2.UNITS.overlord.abilities.generateCreep, "]"],
  [SC2.UNITS.overlord.abilities.stopGeneratingCreep, "-"],
  [SC2.UNITS.overseer.abilities.oversight, "k"],
  [SC2.UNITS.overseer.abilities.cancelOversight, "p"],
  [SC2.UNITS.overseer.abilities.contaminate, "["],
  [SC2.UNITS.overseer.abilities.changeling, "'"],
  [SC2.UNITS.queen.abilities.transfusion, "k"],
  [SC2.UNITS.queen.abilities.creepTumor, "p"],
  [SC2.UNITS.queen.abilities.injectLarva, "/"],
  [SC2.UNITS.roach.abilities.morphRavager, "p"],
  [SC2.UNITS.ravager.abilities.corrosiveBile, "k"],
  [SC2.UNITS.ravager.abilities.corrosiveBile, "p"],
  [SC2.UNITS.swarmHost.abilities.spawnLocusts, "k"],
  [SC2.UNITS.locust.abilities.swoop, "k"],
  [SC2.UNITS.viper.abilities.blindingCloud, "k"],
  [SC2.UNITS.viper.abilities.parasiticBomb, "p"],
  [SC2.UNITS.viper.abilities.abduct, "["],
  [SC2.UNITS.viper.abilities.consume, "'"],
]);
