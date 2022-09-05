class GameCreating extends Scene {
    constructor(){
        super();
    }

    start(){
        super.start();

        socket.emit("my-size", {w: innerWidth, h: innerHeight});
        console.log("my size sent", {w: innerWidth, h: innerHeight});

        socket.on("start-game", (roomSize) => {
            console.log("gelen bu abi: ", roomSize);
            this.sceneManager.ctx["room-size"] = roomSize;
            console.log("room size", roomSize);
            this.sceneManager.openScene(3);
        });

    }

    update(){
        super.update();
    }
    
    draw(){
        background(0);
        fill(255);
        text("Creating game", innerWidth/2, innerHeight/2);
    }
}