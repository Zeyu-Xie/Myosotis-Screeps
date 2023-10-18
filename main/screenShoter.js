const init = require("init")
let map = Array.from({ length: 50 }, () => Array(50).fill(0));

const screenShoter = function () {
    const initData = init()
    for (var i = 0; i < 50; i++) {
        for (var j = 0; j < 50; j++) {
            const game = initData.room.lookAt(i, j)
            map[i][j] = simplify(game[0])

        }
    }
    printMap()
}

const printMap = () => {
    for(let i=0;i<50;i++) {
        let str = ""
        for(let j=0;j<50;j++) {
            str += map[j][i]
        }
        console.log(`${i}`.padStart(2, " "), str)
    }
}

const printMapTranspose = () => {
    for(let i=0;i<50;i++) {
        let str = ""
        for(let j=0;j<50;j++) {
            str += map[i][j]
        }
        console.log(`${i}`.padStart(2, " "), str)
    }
}

const simplify = function (point) {
    if(point.type == "structure") {
        switch(point.structure.structureType) {
            case "spawn": {
                return "Sp"
            }
            case "controller": {
                return "Co"
            }
            default: {
                return " ?"
            }
        }
    }
    else if (point.type == "creep") {
        return " o"
    }
    else if (point.type == "source") {
        return " $"
    }
    else if(point.type == "terrain") {
        switch (point.terrain) {
            case "plain": {
                return " ."
            }
            case "wall": {
                return "[]"
            }
            case "swamp": {
                return "__"
            }
            default: {
                return " ."
            }
        }
    }
    else {
        // console.log(point.type)
        return "PP"
    }
}

module.exports = screenShoter