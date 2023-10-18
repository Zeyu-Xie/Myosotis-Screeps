const roleMap = new Map()
const roleList = ["harvester", "builder", "upgrader", "repairer", "healer"]
const numList = [8, 6, 2, 3, 0]
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

var init = {
    roleMap,
    roleList,
    roles,
    numList,
    bodyPartList,
    harvesters,
    builders,
    upgraders,
    repairers,
    healers,
    energyAvailable,
    energyCapacityAvailable
}

module.exports = init