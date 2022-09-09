class JoinRoomScene extends Scene {
    constructor(){
        super();
        this.button;
        this.input;
    }

    start(){
        super.start();

        socket.on("opponent-connected", () => {
            this.sceneManager.openScene(2);
        });

        socket.on("room-joined", (roomid) => {
            window.history.pushState("", "", `?roomid=${roomid}`);
            console.log("room joined " + roomid);
            this.sceneManager.ctx["room-id"] = roomid;
            this.sceneManager.ctx["founder"] = false;

            this.sceneManager.openScene(SCENE_GAME_CREATING);
        });

        //create a button and a text input for the user to enter the room id
        //then if click the button call the joinRoom function with the room id
        //as a parameter
        this.input = createInput();
        this.input.position(center.x-150, center.y);
        this.input.size(200, 35);

        this.button = createButton("Join");
        this.button.position(center.x + 60, center.y);
        this.button.size(50, 40);
        this.button.mousePressed(() => {
            var roomid = trim(this.input.value());
            if (roomid.length != 5) return;

            this.wantToJoin(roomid);
        });
    }

    wantToJoin(roomid){
        socket.emit("join-room", roomid);
    }

    draw(){
        background(0);
        fill(255);
        textAlign(CENTER, CENTER);
        textSize(45);
        text("Join a Game", center.x, center.y - 300);
    }

    exit(){
        super.exit();
        this.button.remove();
        this.input.remove();
    }
}