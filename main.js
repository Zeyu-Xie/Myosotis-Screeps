var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require("role.repairer")
var roleHealer = require("role.healer")

var loopInit = require("loop.init")
var loopEnd = require("loop.end");
const slogan = require('slogan');

module.exports.loop = function () {

    loopInit()

    spawn()
    work()

    loopEnd()

}

var work = function () {
    for (var name in Game.creeps) {
        var creep = Game.creeps[name];
        if (creep.memory.role == 'upgrader') {
            roleUpgrader.run(creep);
        }
        if (creep.memory.role == 'builder') {
            roleBuilder.run(creep);
        }
        if (creep.memory.role == 'harvester') {
            roleHarvester.run(creep);
        }
        if (creep.memory.role == 'repairer') {
            roleRepairer.run(creep);
        }
        if (creep.memory.role == 'healer') {
            roleHealer.run(creep);
        }
    }
}

var spawn = function () {

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == "repairer");
    var healers = _.filter(Game.creeps, (creep) => creep.memory.role == "healer");

    if (harvesters.length < 2) {
        var newName = 'Harvester' + Game.time;
        console.log('Spawning new harvester: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE, WORK, WORK, WORK, WORK], newName,
            { memory: { role: 'harvester' } });
    }
    if (upgraders.length < 1) {
        var newName = 'Upgrader' + Game.time;
        console.log('Spawning new upgrader: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], newName,
            { memory: { role: 'upgrader' } });
    }
    if (builders.length < 2) {
        var newName = 'Builder' + Game.time;
        console.log('Spawning new builder: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], newName,
            { memory: { role: 'builder' } });
    }
    if (repairers.length < 1) {
        var newName = 'Repairer' + Game.time;
        console.log('Spawning new repairer: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], newName,
            { memory: { role: 'repairer' } });
    }
    if (healers.length < 0) {
        var newName = 'Healer' + Game.time;
        console.log('Spawning new healer: ' + newName);
        Game.spawns['Spawn1'].spawnCreep([HEAL, CARRY, MOVE], newName,
            { memory: { role: 'healer' } });
    }

    if (Game.spawns['Spawn1'].spawning) {
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1,
            Game.spawns['Spawn1'].pos.y,
            { align: 'left', opacity: 0.8 });
    }

    if (!Game.spawns["Spawn1"].spawning) {
        const s = slogan("POLITICS", 0.5)
        if (s.length >= 1) {
            Game.spawns['Spawn1'].room.visual.text(
                s,
                Game.spawns['Spawn1'].pos.x + 1,
                Game.spawns['Spawn1'].pos.y,
                { align: 'left', opacity: 0.8 });
        }
    }
}