/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('loop.init');
 * mod.thing == 'a thing'; // true
 */

var loopInit = function () {
    console.log("========")
    console.log(Date())
    for (var name in Memory.creeps) {
        if (!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    printCreepsNum()

    console.log("--------")
    console.log("Loop Starts")
}

module.exports = loopInit

var printCreepsNum = function () {

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    var repairers = _.filter(Game.creeps, (creep) => creep.memory.role == "repairer");
    var healers = _.filter(Game.creeps, (creep) => creep.memory.role == "healer");

    const strArray = ["harvesters", "upgraders", "builders", "repairers", "healers"]
    const numArray = [harvesters.length, upgraders.length, builders.length, repairers.length, healers.length]
    const num = strArray.length

    var l1 = ""
    var l2 = ""

    for (var i = 0; i < num; i++) {
        l1 = l1 + " |" + strArray[i].padStart(12, " ")
        l2 = l2 + " |" + String(numArray[i]).padStart(12, " ")
    }

    l1 = (l1 + " |").substring(1)
    l2 = (l2 + " |").substring(1)

    console.log("* Creep Numbers: "+l1)
    console.log("                 "+l2)
}