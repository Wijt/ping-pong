class OpponentWaiting extends Scene {
    constructor(){
        super();
    }

    start(){
        super.start();

        socket.on("opponent-connected", () => {
            this.sceneManager.openScene(SCENE_GAME_CREATING);
        });
    }
    
    draw(){
        background(0);
        fill(255);
        textAlign(CENTER, CENTER);
        textSize(45);
        text("Waiting for opponent\nShare your link with your friends!", center.x, center.y);
    }
}