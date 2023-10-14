/*
 * Module code goes here. Use 'module.exports' to export things:
 * module.exports.thing = 'a thing';
 *
 * You can import it from another modules like this:
 * var mod = require('loop.init');
 * mod.thing == 'a thing'; // true
 */

var init1 = function () {
    for(var name in Memory.creeps) {
        if(!Game.creeps[name]) {
            delete Memory.creeps[name];
            console.log('Clearing non-existing creep memory:', name);
        }
    }

    var harvesters = _.filter(Game.creeps, (creep) => creep.memory.role == 'harvester');
    var upgraders = _.filter(Game.creeps, (creep) => creep.memory.role == 'upgrader');
    var builders = _.filter(Game.creeps, (creep) => creep.memory.role == 'builder');
    console.log('Harvesters: ' + harvesters.length);
    console.log('Upgraders: ' + upgraders.length);
    console.log('Builders: ' + builders.length);
}

var loopInit = function () {
    console.log("========")
    console.log(Date())
    init1()
    console.log("--------")
    console.log("Loop Starts")
}

module.exports = loopInit