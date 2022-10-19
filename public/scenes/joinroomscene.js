class JoinRoomScene extends Scene {
    constructor(){
        super();
        this.button;
        this.input;

        this.roomid;
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

        
        if (this.roomid){
            this.wantToJoin(this.roomid);
            return;
        } 

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
            this.wantToJoin(roomid);
        });

        this.returnButton = createButton("Return to Menu");
        this.returnButton.position(center.x-75, center.y + 100);
        this.returnButton.size(150, 40);
        this.returnButton.mousePressed(() => {
            this.sceneManager.openScene(SCENE_WELCOME);
        });

    }

    wantToJoin(roomid){
        var roomid = trim(roomid);
        if (roomid.length != 5) return;

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

        [this.button, this.input, this.returnButton].forEach(
            e => {
                if (e) e.remove();
            }
        );
    }
}