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

    nameStandardize()

    spawn()
    work()

    loopEnd()

}

// 将所有 creep 的名字通过 role 正规化
var nameStandardize = function () {
    for (var creep in Game.creeps) {
        try {
            var _role = Game.creeps[creep].memory.role;
            _role = _role.charAt(0).toUpperCase() + _role.slice(1);
            Game.creeps[creep].name = _role + Game.creeps[creep].name.replace(/[a-zA-Z]/g, '');
        } catch (err) {
            console.log("ERROR", err)
        }
    }
}

var spawn = function () {

    const roleMap = new Map()
    const roleList = ["harvesters", "builders", "upgraders", "repairers", "healers"]
    roleMap.set("harvesters", 0)
    roleMap.set("builders", 1)
    roleMap.set("upgraders", 2)
    roleMap.set("repairers", 3)
    roleMap.set("healers", 4)
    console.log(roleMap[2])
    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == "repairer");
    var healers = _.filter(Game.creeps, (creep) => creep.memory.role == "healer");
    const roles = [harvesters, builders, upgraders, repairers, healers]

    var energyAvailable = Game.spawns["Spawn1"].room.energyAvailable
    var energyCapacityAvailable = Game.spawns["Spawn1"].room.energyCapacityAvailable



    if (harvesters.length < 7) {
        var newName = 'Harvester' + Game.time;
        console.log('Spawning new harvester: ' + newName);
        if (energyCapacityAvailable < 550) {
            Game.spawns['Spawn1'].spawnCreep([MOVE, CARRY, WORK], newName,
                { memory: { role: 'harvester' } });
        }
        else Game.spawns['Spawn1'].spawnCreep([MOVE, CARRY, MOVE, WORK, WORK, WORK, WORK], newName,
            { memory: { role: 'harvester' } });
    }
    else if (upgraders.length < 2) {
        var newName = 'Upgrader' + Game.time;
        console.log('Spawning new upgrader: ' + newName);
        if (energyCapacityAvailable < 550) {
            Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], newName,
                { memory: { role: 'upgrader' } });
        }
        else {
            Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE, WORK, WORK, WORK, MOVE], newName,
                { memory: { role: 'upgrader' } });
        }

    }
    else if (builders.length < 7) {
        var newName = 'Builder' + Game.time;
        console.log('Spawning new builder: ' + newName);
        if (energyCapacityAvailable < 550) {
            Game.spawns['Spawn1'].spawnCreep([MOVE, CARRY, WORK], newName,
                { memory: { role: 'builder' } });
        }
        else {
            Game.spawns['Spawn1'].spawnCreep([MOVE, CARRY, MOVE, WORK, WORK, WORK, WORK], newName,
                { memory: { role: 'builder' } });
        }
    }
    else if (repairers.length < 3) {
        var newName = 'Repairer' + Game.time;
        console.log('Spawning new repairer: ' + newName);
        if (energyCapacityAvailable < 550) {
            Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE], newName,
                { memory: { role: 'repairer' } });
        }
        else {
            Game.spawns['Spawn1'].spawnCreep([WORK, CARRY, MOVE, WORK, WORK, WORK, MOVE], newName,
                { memory: { role: 'repairer' } });
        }
    }
    else if (healers.length < 0) {
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
        const s = slogan("POLITICS", 0.1)
        if (s.length >= 1) {
            Game.spawns['Spawn1'].room.visual.text(
                s,
                Game.spawns['Spawn1'].pos.x + 1,
                Game.spawns['Spawn1'].pos.y,
                { align: 'left', opacity: 0.8 });
        }
    }
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