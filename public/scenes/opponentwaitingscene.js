class OpponentWaiting extends Scene {
    constructor(ctx){
        super();
        this.ctx = ctx;
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
        text("Waiting for opponent", innerWidth/2, innerHeight/2);
        text("Share your room id (" + this.sceneManager.ctx["room-id"] + ") with your friends!", innerWidth/2, (innerHeight/2) - 50);
    }
}