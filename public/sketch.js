var socket;

var debug = false;

var sceneManager;
var center;

function preload() {
    //setup socket io
    //setup all scenes
    socket = io();

    sceneManager = new SceneManager();
    sceneManager.addScene(new WelcomeScene());
    sceneManager.addScene(new OpponentWaiting());
    sceneManager.addScene(new GameCreating());
    sceneManager.addScene(new GameScene());
}

function setup() {
    //create canvas
    //start the scene manager
    //initilize the center variable

    createCanvas(innerWidth, innerHeight);
    
    sceneManager.start();

    center = {x: width / 2, y: height / 2};
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
