var socket;

var debug = false;

function preload() {
    socket = io();

    //get roomid and join it if that is not defined ask id to the server and join it;
    var roomid = getAllUrlParams().roomid;

    if (roomid == null) {
        roomid = "";
        socket.emit("create-room");
        socket.on("set-id", (id) => {
            roomid = id;
            socket.emit("join-room", roomid);
            window.history.pushState("", "", `?roomid=${roomid}`);
            console.log("room created " + roomid);
        });
    } else {
        socket.emit("join-room", roomid);
    }

    socket.on("sync", (room) => {
        sync(room);
    });
}

var sceneSize = { w: 1000, h: 700 };

var playerOne;
var playerTwo;
var court;
var ball;

var gamePaused = false;

var isPlayerOneReady = false;
var isPlayerTwoReady = false;

var gameState = "";

function setup() {
    createCanvas(sceneSize.w, sceneSize.h);
    court = new Court(sceneSize.h * 0.6, 5, 0, 0, "#ffffff");

    ball = new Ball(sceneSize.w / 2, sceneSize.h / 2, 20, 20, "#B3F2F2");

    playerOne = new Player(
        250,
        20,
        sceneSize.w * 0.1,
        sceneSize.h / 2 - 250 / 2,
        "#ffffff",
        87,
        83,
        10
    );
    playerTwo = new Player(
        250,
        20,
        sceneSize.w - sceneSize.w * 0.1,
        sceneSize.h / 2 - 250 / 2,
        "#ffffff",
        38,
        40,
        10
    );
}

function sync(r) {
    ball.pos = r.ball.pos;
    ball.vel = r.ball.vel;

    playerOne.pos = Object.values(r.players)[0].pos;
    playerOne.score = Object.values(r.players)[0].score;
    isPlayerOneReady = Object.values(r.players)[0].ready;

    if (Object.values(r.players)[1] != null) {
        playerTwo.pos = Object.values(r.players)[1].pos;
        playerTwo.score = Object.values(r.players)[1].score;
        isPlayerTwoReady = Object.values(r.players)[1].ready;
}

    gamePaused = r.gamePaused;
    collisionList = r.collisionList;
    gameState = r.gameState;
}

function draw() {
    background(color("#0A1119"));
    court.show();
    ball.show();
    playerOne.show();
    playerTwo.show();

    fill(color("white"));
    textSize(100);
    textAlign(CENTER, CENTER);
    text(playerOne.score, sceneSize.w / 2 - 200, sceneSize.h * 0.15);
    text(playerTwo.score, sceneSize.w / 2 + 200, sceneSize.h * 0.15);
    
    if(debug){
        textSize(25);
        text(gameState, sceneSize.w / 2, sceneSize.h * 0.15);
    }
   
    if (!isPlayerOneReady) {
        push();
        rectMode(CORNER);
        fill(0, 0, 0, 200);
        rect(0, 0, sceneSize.w / 2, sceneSize.h);
        textAlign(CENTER, CENTER);
        textSize(45);
        fill(color("white"));
        text("press\nR\nto be ready", sceneSize.w / 4, sceneSize.h / 2);
        pop();
    }
    if (!isPlayerTwoReady) {
        push();
        rectMode(CORNER);
        fill(0, 0, 0, 200);
        rect(sceneSize.w / 2, 0, sceneSize.h, sceneSize.w);
        textAlign(CENTER, CENTER);
        textSize(45);
        fill(color("white"));
        text("press\nR\nto be ready", sceneSize.w / 4*3, sceneSize.h / 2);
        pop();
    }

    if (gamePaused) {
        push();
        rectMode(CORNER);
        fill(0, 0, 0, 200);
        rect(0, 0, sceneSize.w, sceneSize.h);
        rectMode(CENTER);
        fill(color("white"));
        rect(sceneSize.w / 2, sceneSize.h / 2, 200, 200, 20);
        fill(color("black"));
        rect(sceneSize.w / 2 - 25, sceneSize.h / 2, 25, 75);
        fill(color("black"));
        rect(sceneSize.w / 2 + 25, sceneSize.h / 2, 25, 75);
        pop();
    }

    if (gamePaused) return;

    if (keyIsDown(38)) {
        socket.emit("upkey");
    }
    if (keyIsDown(40)) {
        socket.emit("downkey");
    }

    if (debug) {
        for (let i = 0; i < collisionList.length; i++) {
            //Show Collider
            a = collisionList[i];
            push();
            fill(color("red"));
            noStroke();
            rect(a.pos.x, a.pos.y, a.width, a.height);
            pop();
        }
    }
}

function keyPressed() {
    if (key == "p") socket.emit("pause");
    if (key == "r") socket.emit("ready");
}
