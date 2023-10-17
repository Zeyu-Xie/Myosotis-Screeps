var harvest = (creep) => {

    // harvester：从 resource 中获取能量，优先运送至 spawn 和 extension，盈余储藏到 container
    if (creep.memory.role == "harvester") {
        var sources = creep.room.find(FIND_SOURCES);
        if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } });
            return
        }
    }

    // role 不为 harvester：从 container 中获取能量，若所有的 container 里面均无能量，则从 resource 中获取能量
    else {
        var containerSources = creep.room.find(FIND_STRUCTURES, {
            filter: { structureType: STRUCTURE_CONTAINER }
        })
        var sources = creep.room.find(FIND_SOURCES);
        if (creep.withdraw(containerSources[0], RESOURCE_ENERGY) == ERR_NOT_IN_RANGE) {
            creep.moveTo(containerSources[0], { visualizePathStyle: { stroke: '#ffaa00' } });
            return
        }
        if (creep.harvest(sources[0]) == ERR_NOT_IN_RANGE) {
            creep.moveTo(sources[0], { visualizePathStyle: { stroke: '#ffaa00' } });
            return
        }

    }
}

module.exports = harvest