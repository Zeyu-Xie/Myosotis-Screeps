const init = require("init")
const initPrint = require("initPrint")
const endPrint = require("endPrint")

var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
const spawn = require("spawn");
const screenShoter = require("./screenShoter");

let once = false

module.exports.loop = function () {

    initPrint()

    if(!once) {
        screenShoter()
        once = true
    } 

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