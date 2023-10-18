const init = () => {

    // basic

    const time = Date()
    const tick = Game.time

    // room

    const roomName = "sim"
    const room = Game.rooms[roomName]

    // rcl

    const rcl = room.controller
    const rclLevel = rcl.level
    const rclProgress = rcl.progress
    const rclProgressTotal = rcl.progressTotal
    const rclProgressLack = rclProgressTotal - rclProgress

    // spawn

    const spawnName = "Spawn1"
    const spawn = Game.spawns[spawnName]
    const spawning = spawn.spawning
    const isSpawning = spawning ? true : false
    const spawnEnergy = spawn.energy
    const spawnEnergyCapacity = spawn.energyCapacity
    const spawnEnergyLack = spawnEnergyCapacity - spawnEnergy

    // creep

    const creeps = Game.creeps

    const creepList = _.filter(creeps)
    const creepNum = creepList.length

    var harvesterList = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var upgraderList = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var builderList = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var repairerList = _.filter(Game.creeps, (creep) => creep.memory.role == "repairer");
    var healerList = _.filter(Game.creeps, (creep) => creep.memory.role == "healer");

    var harvesterNum = harvesterList.length
    var upgraderNum = upgraderList.length
    var builderNum = builderList.length
    var repairerNum = repairerList.length
    var healerNum = healerList.length

    // role
    let roleMap = new Map()
    roleMap.set("harvester", 0)
    roleMap.set("builder", 1)
    roleMap.set("upgrader", 2)
    roleMap.set("repairer", 3)
    roleMap.set("healer", 4)
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

    return {
        time: time,
        tick: tick,

        roomName: roomName,
        room: room,

        rcl: rcl,
        rclLevel: rclLevel,
        rclProgress: rclProgress,
        rclProgressTotal: rclProgressTotal,
        rclProgressLack: rclProgressLack,

        spawnName: spawnName,
        spawn: spawn,
        spawning: spawning,
        isSpawning: isSpawning,
        spawnEnergy: spawnEnergy,
        spawnEnergyCapacity: spawnEnergyCapacity,
        spawnEnergyLack: spawnEnergyLack,

        creeps: creeps,
        creepList: creepList,
        creepNum: creepNum,
        harvesterList: harvesterList,
        builderList: builderList,
        upgraderList: upgraderList,
        repairerList: repairerList,
        healerList: healerList,
        harvesterNum: harvesterNum,
        builderNum: builderNum,
        upgraderNum: upgraderNum,
        repairerNum: repairerNum,
        healerNum: healerNum,

        roleMap: roleMap,
        roleList: roleList,
        numList: numList,
        bodyPartList: bodyPartList
    }

}

module.exports = init