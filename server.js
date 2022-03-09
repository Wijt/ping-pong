const express = require("express");
const path = require("path");
const { createServer } = require("http");
const { Server } = require("socket.io");
const { instrument } = require("@socket.io/admin-ui");

const { Room, Player } = require("./handlers.js");

const app = express();
const httpServer = createServer(app);
const io = new Server(httpServer, {
    cors: {
        origin: ["https://admin.socket.io"],
        credentials: true,
    },
});

app.use(express.static(path.join(__dirname, "public")));

httpServer.listen(3000, () => {
    console.log("listening on *:3000");
});

instrument(io, {
    auth: false,
});

const { makeid } = require("./useful.js");

var rooms = {};

setInterval(() => {
    for (k in rooms) {
        rooms[k].update();
        io.to(rooms[k].id).emit("sync", rooms[k]);
        try {
            console.log(Object.values(rooms[k].players)[0].score);
        } catch (error) {

        }
    }
}, 10);

io.on("connection", (socket) => {
    console.log("a user connected " + socket.id);

    socket.on("create-room", () => {
        io.to(socket.id).emit("set-id", makeid(5));
    });

    socket.on("join-room", (roomid) => {
        if (!(roomid in rooms)) {
            var room = new Room(roomid);
            rooms[roomid] = room;
        }
        var result = rooms[roomid].addPlayer(
            new Player(
                socket.id,
                250,
                20,
                rooms[roomid].size.w * 0.1,
                rooms[roomid].size.h / 2 - 250 / 2,
                10,
                rooms[roomid].size
            )
        );
        if (result) {
            socket.join(roomid);
            socket.roomid = roomid;
            console.log("joined to the room " + roomid);
            return true;
        } else {
            console.warn(
                "there is already two players inside this room: " + roomid
            );
            return false;
        }
    });

    socket.on("upkey", () => {
        if(rooms[socket.roomid].players[socket.id]!=null){
            rooms[socket.roomid].players[socket.id].up();
        }
    });

    socket.on("pause", () => {
        if(rooms[socket.roomid] != null){
            rooms[socket.roomid].gamePaused = !rooms[socket.roomid].gamePaused;
        }
    });

    socket.on("downkey", () => {
        if(rooms[socket.roomid].players[socket.id]!=null){
            rooms[socket.roomid].players[socket.id].down();
        }
    });
});
