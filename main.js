// 角色
var roleHarvester = require('role.harvester');
var roleUpgrader = require('role.upgrader');
var roleBuilder = require('role.builder');
var roleRepairer = require("role.repairer")
var roleHealer = require("role.healer")

// 周期函数
var loopInit = require("loop.init")
var loopEnd = require("loop.end");

// 函数
var init = require("init")
var spawn = require("spawn")

const roleList = init.roleList
const numList = init.numList
const bodyPartList = init.bodyPartList

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