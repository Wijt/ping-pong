class WelcomeScene extends Scene {
    constructor(){
        super();
    }

    start(){
        super.start();

        let urlParams = new URLSearchParams(window.location.search);

        if(urlParams.has("roomid")){
            let roomid = urlParams.get("roomid");
            this.joinRoom(roomid);
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
            console.log("join room");
        }
    }

    createRoom(){
        socket.emit("create-room");
        socket.on("room-created", (roomid) => {
            window.history.pushState("", "", `?roomid=${roomid}`);

            this.sceneManager.ctx["room-id"] = roomid;
            this.sceneManager.ctx["founder"] = true;

            this.sceneManager.openScene(1);
        });
    }

    joinRoom(roomid){
        socket.emit("join-room", roomid);
        socket.on("room-joined", (roomid) => {
            window.history.pushState("", "", `?roomid=${roomid}`);
            console.log("room joined " + roomid);
            this.sceneManager.ctx["room-id"] = roomid;
            this.sceneManager.ctx["founder"] = false;

            this.sceneManager.openScene(2);
        });
    }
    
    exit(){
        super.exit();
    }
}
