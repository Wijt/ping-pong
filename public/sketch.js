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
