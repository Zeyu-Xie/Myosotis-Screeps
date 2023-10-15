const slogan = require("slogan");

var roleBuilder = {

	/** @param {Creep} creep **/
	run: function (creep) {

		// 说废话
		const s = slogan("MOOD", 0.1)
        if(s.length >= 1) creep.say(s)

		// 收集能量
		if (creep.memory.building && creep.store[RESOURCE_ENERGY] == 0) {
			creep.memory.building = false;
			creep.say('🔄 harvest');
		}
		// 使用能量建造
		if (!creep.memory.building && creep.store.getFreeCapacity() == 0) {
			creep.memory.building = true;
			creep.say('🚧 build');
		}
		// 正在建造：显示路径
		if (creep.memory.building) {
			var targets = creep.room.find(FIND_CONSTRUCTION_SITES);
			if (targets.length) {
				if (creep.build(targets[0]) == ERR_NOT_IN_RANGE) {
					creep.moveTo(targets[0], { visualizePathStyle: { stroke: '#ffffff' } });
				}
			}
		}
		// 未在建造：显示路径
		else {
			var sources = creep.room.find(FIND_SOURCES);
			if (creep.harvest(sources[1]) == ERR_NOT_IN_RANGE) {
				creep.moveTo(sources[1], { visualizePathStyle: { stroke: '#ffaa00' } });
			}
		}
	}
};

module.exports = roleBuilder;