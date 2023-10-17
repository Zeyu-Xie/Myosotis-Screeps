const harvest = require("harvest")

var roleUpgrader = {

    /** @param {Creep} creep **/
    run: function(creep) {

        // 采集能量
        if(creep.memory.upgrading && creep.store[RESOURCE_ENERGY] == 0) {
            creep.memory.upgrading = false;
            creep.say('🔄 harvest');
	    }
        // 使用能量进行升级
	    if(!creep.memory.upgrading && creep.store.getFreeCapacity() == 0) {
	        creep.memory.upgrading = true;
	        creep.say('⚡ upgrade');
	    }
        // 升级中：显示路径
	    if(creep.memory.upgrading) {
            if(creep.upgradeController(creep.room.controller) == ERR_NOT_IN_RANGE) {
                creep.moveTo(creep.room.controller, {visualizePathStyle: {stroke: '#ffffff'}});
            }
        }
        // 采集中：显示路径
        else {
            harvest(creep)
        }
	}
};

module.exports = roleUpgrader;