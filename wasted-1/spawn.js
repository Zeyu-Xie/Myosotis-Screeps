var init = require("init")

const roleList = init.roleList
const numList = init.numList
const bodyPartList = init.bodyPartList

var spawn = function () {

    // 判断是否已在 Spawning
    if (Game.spawns["Spawn1"].spawning) {
        var spawningCreep = Game.creeps[Game.spawns['Spawn1'].spawning.name];
        Game.spawns['Spawn1'].room.visual.text(
            '🛠️' + spawningCreep.memory.role,
            Game.spawns['Spawn1'].pos.x + 1,
            Game.spawns['Spawn1'].pos.y,
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
        if (init.energyCapacityAvailable < 550) {
            Game.spawns['Spawn1'].spawnCreep(bodyPartList[i][0], name,
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