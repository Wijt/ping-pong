class GameCreating extends Scene {
    constructor(){
        super();
    }

    start(){
        super.start();

        socket.emit("my-size", {w: innerWidth, h: innerHeight});
        socket.on("start-game", (roomSize) => {
            this.sceneManager.ctx["room-size"] = roomSize;
            this.sceneManager.openScene(SCENE_GAME);
        });
    }

    update(){
        super.update();
    }
    
    draw(){
        background(0);
        fill(255);
        text("Creating game", center.x, center.y);
    }
}