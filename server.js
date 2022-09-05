const express = require("express");
const path = require("path");
const { createServer } = require("http");
const { Server } = require("socket.io");
const { instrument } = require("@socket.io/admin-ui");

const { Room, Player } = require("./game.js");

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
const { Console } = require("console");

var rooms = {};

setInterval(() => {
    for (k in rooms) {
        if(!rooms[k].canStart) continue;

        rooms[k].update();
        io.to(rooms[k].id).emit("sync", rooms[k]);
    }
}, 10);

io.on("connection", (socket) => {
    //console.log("a user connected " + socket.id);

    socket.on("create-room", () => {

        var roomid = makeid(5);
       
        rooms[roomid] = new Room(roomid);
        rooms[roomid].addPlayer(new Player(socket.id));
        
        socket.roomid = roomid;
        
        socket.join(roomid);
        io.to(socket.id).emit("room-created", roomid);

        //console.log("created and joined to the room " + roomid);

    });

    socket.on("join-room", (roomid) => {
        if(rooms[roomid]){
            //TODO: Check if the room is full and if full make that person spectate
            rooms[roomid].addPlayer(new Player(socket.id));
            socket.roomid = roomid;
            socket.join(roomid);
            
            var founderId = Object.keys(rooms[roomid].players)[0];
            io.to(founderId).emit("opponent-connected");
            //console.log("joined to the room " + roomid);
            socket.emit("room-joined", roomid);
        }
    });
    
    function calcBestSceneSize(roomid){
        var w = 9999;
        var h = 9999;
        for(k in rooms[roomid].playerSizes){
            k = rooms[roomid].playerSizes[k];
            console.log("k", k);
            if(k.w < w) w = k.w;
            if(k.h < h) h = k.h;
        }
        return {w: w, h: h};
    }

    socket.on("my-size", (size) => {
        rooms[socket.roomid].playerSizes[socket.id] = size;

        if(Object.keys(rooms[socket.roomid].playerSizes).length >= 2){
            var bestSize = calcBestSceneSize(socket.roomid);
            io.to(socket.roomid).emit("start-game", bestSize);
            rooms[socket.roomid].size = bestSize;
            rooms[socket.roomid].canStart = true;
        }

    });

    socket.on("upkey", () => {
        try {
            rooms[socket.roomid].players[socket.id].up();
        }catch(error){};
    });

    socket.on("pause", () => {
        try {
            rooms[socket.roomid].gamePaused = !rooms[socket.roomid].gamePaused;
        }catch(error){};
    });

    socket.on("downkey", () => {
        try {
            rooms[socket.roomid].players[socket.id].down();
        }catch(error){};
    });

    socket.on("ready", () => {
        try {
            rooms[socket.roomid].players[socket.id].ready = true;
        }catch(error){};
    });
});
