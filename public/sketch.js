var socket;

var debug = true;

var sceneManager;

function preload() {

    /* //get roomid and join it if that is not defined ask id to the server and join it;
    var roomid = getAllUrlParams().roomid;

    if (roomid == null) {
        
    } else {
        socket.emit("join-room", roomid, {w: innerWidth, h: innerHeight});
        ctx["isAdmin"] = false;
    } */

    /*socket.on("sync", (room) => {
        sync(room);
    });*/

    /*socket.on("start-game", (room) => {
        startGame(room);
    });*/


    //setup socket io
    //setup all scenes
    socket = io();

    sceneManager = new SceneManager();
    sceneManager.addScene(new WelcomeScene());
    sceneManager.addScene(new OpponentWaiting());
    sceneManager.addScene(new GameCreating());
    sceneManager.addScene(new GameScene());
}

function centerCanvas(C) {
    let x = (innerWidth - width) / 2;
    let y = (innerHeight - height) / 2;
    C.position(x, y);
}

function setup() {
    //create canvas and center it
    //start the scene manager

    let c = createCanvas(innerWidth, innerHeight);
    centerCanvas(c);
    
    sceneManager.start();
}


//this function sync the game but shouldnt be here
/* function sync(r) {
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
} */

function draw() {
    sceneManager.update();
    sceneManager.draw();
}

function keyPressed() {
    sceneManager.keyPressed(key);
}
