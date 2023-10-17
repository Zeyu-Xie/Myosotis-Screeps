const slogan = require("slogan");
const harvest = require("harvest");

var roleHarvester = {

    /** @param {Creep} creep **/
    run: function(creep) {

        // 说废话
        const s = slogan("MOOD", 0.05)
        if(s.length >= 1) creep.say(s)

        // 去采集能量
	    if(creep.store.getFreeCapacity() > 0) {
            harvest(creep)
        }
        // 去补充能量
        else {
            // 确定目标列表
            var targets = []
            
            var targetsSpawn = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_SPAWN) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            })
            targets = targets + targetsSpawn

            var targetsExtension = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_EXTENSION) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            })
            targets = targets + targetsExtension

            var targetsContainer = creep.room.find(FIND_STRUCTURES, {
                filter: (structure) => {
                    return (structure.structureType == STRUCTURE_CONTAINER) &&
                        structure.store.getFreeCapacity(RESOURCE_ENERGY) > 0;
                }
            })
            targets = targets + targetsContainer

            // 如果有目标
            if(targets.length > 0) {
                if(creep.transfer(targets[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
                    creep.moveTo(targets[0], {visualizePathStyle: {stroke: '#ffffff'}});
                }
            }
        }
	}
};

module.exports = roleHarvester;