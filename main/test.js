const test = () => {

    // basic

    const time = Game.time

    // room

    const roomName = "E1S39"
    const room = Game.rooms[roomName]

    return {
        time: time,
        roomName: roomName,
        room: room
    }

}

module.exports = test