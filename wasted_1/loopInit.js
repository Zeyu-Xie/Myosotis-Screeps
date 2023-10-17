var init = require("init")

var loopInit = function () {

    console.log("========")
    console.log("* Clock: " + Date())
    console.log("* Tick: " + Game.time)
    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }
    printResourceInfo()
    printStorageInfo()
    printRclInfo()
    printCreepsInfo()
    printConstructionSitesInfo()

    console.log("--------")
    console.log("Loop Starts")
}

module.exports = loopInit

var printCreepsInfo = function () {

    var harvesters = init.harvesters
    var upgraders = init.upgraders
    var builders = init.builders
    var repairers = init.repairers
    var healers = init.healers

    var roleList = init.roleList

    const numArray = [harvesters.length, builders.length, upgraders.length, repairers.length, healers.length]
    const num = roleList.length

    var l1 = ""
    var l2 = ""

    for (var i = 0; i < num; i++) {
        l1 = l1 + " |" + roleList[i].padStart(12, " ")
        l2 = l2 + " |" + String(numArray[i]).padStart(12, " ")
    }

    l1 = (l1 + " |").substring(1)
    l2 = (l2 + " |").substring(1)

    console.log("* Creep: Numbers: " + l1)
    console.log("                  " + l2)
}

var printResourceInfo = function () {
    var targets = Game.spawns["Spawn1"].room.find(FIND_SOURCES)
    var res = 0
    var all = 0
    for (let i = 0; i < targets.length; i++) {
        res += targets[i].energy
        all += targets[i].energyCapacity
    }
    console.log("* Resource: Energy: ", res + "/" + all)
}

var printStorageInfo = function () {
    console.log("* Storage: Energy: ", Game.spawns["Spawn1"].room.energyAvailable + "/" + Game.spawns["Spawn1"].room.energyCapacityAvailable)
}

var printRclInfo = function () {
    console.log("* RCL: Lv: " + Game.spawns["Spawn1"].room.controller.level + ", Progress: " + Game.spawns["Spawn1"].room.controller.progress + "/" + Game.spawns["Spawn1"].room.controller.progressTotal)
}

var printConstructionSitesInfo = function () {
    console.log("* Construction Sites: Num: " + Game.spawns["Spawn1"].room.find(FIND_MY_CONSTRUCTION_SITES).length)
}