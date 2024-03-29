class WelcomeScene extends Scene {
    constructor(){
        super();
    }

    start(){
        super.start();

        let urlParams = new URLSearchParams(window.location.search);

        if(urlParams.has("roomid")){
            let roomid = urlParams.get("roomid");
            
            this.sceneManager.scenes[SCENE_JOIN_ROOM].roomid = roomid;
            this.sceneManager.openScene(SCENE_JOIN_ROOM);
        }
    }

    draw(){
        background(0);
        fill(255);
        textAlign(CENTER, CENTER);
        textSize(45);
        text("Welcome to Ping-Pong\n (C) create game\n(J) join game", center.x, center.y);
    }

    keyPressed(key){
        super.keyPressed(key);

        key = key.toLowerCase();
        
        if(key == "c"){
            console.log("create room");
            this.createRoom();
        }
        else if(key == "j"){
            this.openJoinRoom();
        }
    }

    createRoom(){
        socket.emit("create-room");
        socket.on("room-created", (roomid) => {
            window.history.pushState("", "", `?roomid=${roomid}`);

            this.sceneManager.ctx["room-id"] = roomid;
            this.sceneManager.ctx["founder"] = true;

            this.sceneManager.openScene(SCENE_OPPONENT_WAITING);
        });
    }

    openJoinRoom(){
        this.sceneManager.openScene(SCENE_JOIN_ROOM);
    }
    
    exit(){
        super.exit();
    }
}
