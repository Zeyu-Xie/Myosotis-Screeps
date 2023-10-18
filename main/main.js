const init = require("init")
const initPrint = require("initPrint")
const endPrint = require("endPrint")

var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
const spawn = require("spawn");

module.exports.loop = function () {

    initPrint()

    const initData = init()
    const builders = initData.builderList
    const harvesters = initData.harvesterList
    const upgraders = initData.upgraderList
    const repairers = initData.repairerList

    // var tower = Game.getObjectById('72fafe22ddeabc5c2d903b96');
    // if(tower) {
    //     var closestDamagedStructure = tower.pos.findClosestByRange(FIND_STRUCTURES, {
    //         filter: (structure) => structure.hits < structure.hitsMax
    //     });
    //     if(closestDamagedStructure) {
    //         tower.repair(closestDamagedStructure);
    //     }

    //     var closestHostile = tower.pos.findClosestByRange(FIND_HOSTILE_CREEPS);
    //     if(closestHostile) {
    //         tower.attack(closestHostile);
    //     }
    // }

    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    spawn()

    // if(harvesters.length < 4) {
    //     var newName = 'Harvester' + Game.time;
    //     console.log('Spawning new harvester: ' + newName);
    //     Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName, 
    //         {memory: {role: 'harvester'}});
    // }

    // else if(builders.length < 4) {
    //     var newName = 'Builder' + Game.time;
    //     console.log('Spawning new builder: ' + newName);
    //     Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName, 
    //         {memory: {role: 'builder'}});
    // }
    
    // else if(upgraders.length < 4) {
    //     var newName = 'Upgrader' + Game.time;
    //     console.log('Spawning new upgrader: ' + newName);
    //     Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName, 
    //         {memory: {role: 'upgrader'}});
    // }

    // else if(repairers.length < 4) {
    //     var newName = 'Repairer' + Game.time;
    //     console.log('Spawning new repairer: ' + newName);
    //     Game.spawns['Spawn1'].spawnCreep([WORK,CARRY,MOVE], newName, 
    //         {memory: {role: 'repairer'}});
    // }
    
    // if(Game.spawns['Spawn1'].spawning) { 
    //     var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
    //     Game.spawns['Spawn1'].room.visual.text(
    //         '🛠️' + spawningCreep.memory.role,
    //         Game.spawns['Spawn1'].pos.x + 1, 
    //         Game.spawns['Spawn1'].pos.y, 
    //         {align: 'left', opacity: 0.8});
    // }

    for(var name in Game.creeps) {
        var creep = Game.creeps[name];
        if(creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if(creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if(creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
    }

    endPrint()
}