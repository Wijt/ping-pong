var socket;

var debug = false;

var sceneManager;
var center;

const SCENE_WELCOME = 0;
const SCENE_OPPONENT_WAITING = 1;
const SCENE_JOIN_ROOM = 2;
const SCENE_GAME_CREATING = 3;
const SCENE_GAME = 4;


function preload() {
    //setup socket io
    //setup all scenes
    socket = io();

    sceneManager = new SceneManager();
    sceneManager.addScene(new WelcomeScene());
    sceneManager.addScene(new OpponentWaiting());
    sceneManager.addScene(new JoinRoomScene());
    sceneManager.addScene(new GameCreating());
    sceneManager.addScene(new GameScene());
}

function setup() {
    createCanvas(innerWidth, innerHeight);
    sceneManager.start();
    center = {x: width / 2, y: height / 2};
}

function draw() {
    sceneManager.update();
    sceneManager.draw();
}

function keyPressed() {
    sceneManager.keyPressed(key);
}
