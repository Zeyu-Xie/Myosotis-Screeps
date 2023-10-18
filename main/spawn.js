var init = require("init")



var spawn = function () {

    const initData = init()

    const roleList = initData.roleList
    const numList = initData.numList
    const bodyPartList = initData.bodyPartList

    // 判断是否已在 Spawning
    if (initData.isSpawning) {
        var spawningCreep = Game.creeps[initData.spawn.spawning.name];
        initData.room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            initData.spawn.pos.x + 1,
            initData.spawn.pos.y,
            { align: 'left', opacity: 0.8 });
        return
    }

    for (let i = 0; i < roleList.length; i++) {

        // 判断数量是否足够
        if (Game.spawns["Spawn1"].room.find(FIND_MY_CREEPS, {
            filter: (creep) => {
                return creep.memory.role == roleList[i]
            }
        }).length >= numList[i]) {
            continue
        }

        // 命名
        var name = roleList[i][0].toUpperCase() + roleList[i].substring(1) + Game.time

        // 判断生产“体型”
        if (initData.energyCapacityAvailable < 550) {
            initData.spawn.spawnCreep(bodyPartList[i][0], name,
                { memory: { role: roleList[i] } });
            return
        }
        else {
            Game.spawns['Spawn1'].spawnCreep(bodyPartList[i][1], name,
                { memory: { role: roleList[i] } });
            return
        }
    }
}

module.exports = spawn