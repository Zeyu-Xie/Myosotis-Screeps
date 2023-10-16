var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require("role.repairer")
var roleHealer = require("role.healer")

var loopInit = require("loop.init")
var loopEnd = require("loop.end");
const slogan = require('slogan');

// 初始化
const roleMap = new Map()
const roleList = ["harvester", "builder", "upgrader", "repairer", "healer"]
const numList = [7, 7, 2, 3, 0]
const bodyPartList = [
    [
        [WORK, CARRY, MOVE],
        [WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE]
    ],
    [
        [WORK, CARRY, MOVE],
        [WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE]
    ],
    [
        [WORK, CARRY, MOVE],
        [WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE]
    ],
    [
        [WORK, CARRY, MOVE],
        [WORK, WORK, WORK, WORK, CARRY, MOVE, MOVE]
    ],
    [
        [HEAL, CARRY, MOVE],
        [HEAL, HEAL, HEAL, HEAL, CARRY, MOVE, MOVE]
    ]
]
roleMap.set("harvester", 0)
roleMap.set("builder", 1)
roleMap.set("upgrader", 2)
roleMap.set("repairer", 3)
roleMap.set("healer", 4)

var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == "repairer");
var healers = _.filter(Game.creeps, (creep) => creep.memory.role == "healer");
const roles = [harvesters, builders, upgraders, repairers, healers]

var energyAvailable = Game.spawns["Spawn1"].room.energyAvailable
var energyCapacityAvailable = Game.spawns["Spawn1"].room.energyCapacityAvailable


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

    // 判断是否已在 Spawning
    if (Game.spawns["Spawn1"].spawning) {
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1,
            Game.spawns['Spawn1'].pos.y,
            { align: 'left', opacity: 0.8 });
        return
    }
    
    for (let i = 0; i < roleList.length; i++) {

        // 判断数量是否足够
        if (Game.spawns["Spawn1"].room.find(FIND_MY_CREEPS, {
            filter: (creep) => {
                return creep.memory.role == roleList[i]
            }
        }).length >= numList[i]) {
            continue
        }

        // 命名
        var name = roleList[i][0].toUpperCase() + roleList[i].substring(1) + Game.time

        // 判断生产“体型”
        if (energyAvailable < 550) {
            Game.spawns['Spawn1'].spawnCreep(bodyPartList[i][0], name,
                { memory: { role: roleList[i] } });
        }
        else {
            Game.spawns['Spawn1'].spawnCreep(bodyPartList[i][1], name,
                { memory: { role: roleList[i] } });
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