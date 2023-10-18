const init = require("init")
let once = true

let map = Array.from({ length: 50 }, () => Array(50).fill(0));

module.exports.loop = function () {
    const initData = init()
    for(var i=0;i<50;i++) {
        for(var j=0;j<50;j++) {
            const targetPosition = new RoomPosition(i,j,initData.roomName)
            const structure = initData.room.lookAt(i,j)
            map[i][j] = structure[0].type
        }
    }
    console.log(map)
}