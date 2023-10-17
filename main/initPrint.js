const init = require("init")


const initPrint = function () {
    const initData = init()

    console.log("========")
    console.log("* Clock: " + initData.time)
    console.log("* Tick: " + initData.tick)
    
    printResourceInfo()
    printStorageInfo()
    printRclInfo()
    printCreepsInfo()
    printConstructionSitesInfo()

    console.log("--------")
    console.log("Loop Starts")
}

module.exports = initPrint

var printResourceInfo = function () {
    const initData = init()
    var targets = initData.room.find(FIND_SOURCES)
    var res = 0
    var all = 0
    for (let i = 0; i < targets.length; i++) {
        res += targets[i].energy
        all += targets[i].energyCapacity
    }
    console.log("* Resource: Energy: ", res + "/" + all)
}

var printStorageInfo = function () {
    const initData = init()
    console.log("* Storage: Energy: ", initData.room.energyAvailable + "/" + initData.room.energyCapacityAvailable)
}

var printRclInfo = function () {
    const initData = init()
    console.log("* RCL: Lv: " + initData.rclLevel + ", Progress: " + initData.rclProgress + "/" + initData.rclProgressTotal)
}

var printCreepsInfo = function () {

    const initData = init()
    const harvesterList = initData.harvesterList
    const upgraderList = initData.upgraderList
    const builderList = initData.builderList
    const repairerList = initData.repairerList
    const healerList = initData.healerList

    const roleList = initData.roleList
    const numArray = [harvesterList.length, builderList.length, upgraderList.length, repairerList.length, healerList.length]
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

var printConstructionSitesInfo = function () {
    const initData = init()
    console.log("* Construction Sites: Num: " + initData.room.find(FIND_MY_CONSTRUCTION_SITES).length)
}