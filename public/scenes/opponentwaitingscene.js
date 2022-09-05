class OpponentWaiting extends Scene {
    constructor(){
        super();
    }

    start(){
        super.start();

        socket.on("opponent-connected", () => {
            this.sceneManager.openScene(2);
        });
    }

    update(){
        super.update();
    }
    
    draw(){
        background(0);
        fill(255);
        text("Waiting for opponent", center.x, center.y);
        text("Share your room id (" + this.sceneManager.ctx["room-id"] + ") with your friends!", center.x, center.y - 50);
    }
}