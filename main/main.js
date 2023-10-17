// var loopInit = require("loopInit")
// var loopEnd = require("loopEnd");
// var spawn = require("spawn")
// var work = require("work")
const init = require("init")
const initPrint = require("initPrint")
const clearMemory = require("clearMemory")
const endPrint = require("endPrint")

module.exports.loop = function () {
    const initData = init()

    

    initPrint()
    // spawn()
    // work()

    clearMemory()

    endPrint()
}