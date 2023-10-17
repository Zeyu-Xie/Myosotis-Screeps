var loopInit = require("loopInit")
var loopEnd = require("loopEnd");
var spawn = require("spawn")
var work = require("work")

module.exports.loop = function () {

    loopInit()
    spawn()
    work()
    loopEnd()
}