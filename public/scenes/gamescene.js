class GameScene extends Scene {
    constructor(){
        super();

        this.playerOne;
        this.playerTwo;
        this.court;
        this.ball;

        this.isPlayerOneReady = false;
        this.isPlayerTwoReady = false;

        this.gamePaused = false;

        this.collisionList = [];
    }

    start(){
        var size = this.sceneManager.ctx["room-size"];

        this.court = new Court(size.w * 0.5, size.h * 0.5, size.w*0.01, size.h*0.8, "#ffffff");

        this.ball = new Ball(size.w * 0.5, size.h * 0.5, 20, 20, "#B3F2F2");

        this.playerOne = new Player(
            size.h * 0.20,
            20,
            size.w * 0.1,
            size.h * 0.5,
            "#ffffff",
            87,
            83,
            10
        );
        console.log(this.playerOne);
        this.playerTwo = new Player(
            size.h * 0.2,
            20,
            size.w * 0.9,
            size.h * 0.5,
            "#ffffff",
            38,
            40,
            10
        );
        console.log(this.playerTwo);
        socket.on("sync", (room) => {
            this.sync(room);
        });
    }

    sync(r) {
        this.isPlayerOneReady = Object.values(r.players)[0].ready;
        this.isPlayerTwoReady = Object.values(r.players)[1].ready;

        //this guard clause guarantees that server initialized all the gameobjects for this room                                                                                                                    "1"
        if (!r.started) return;

        this.ball.pos = r.ball.pos;
        this.ball.vel = r.ball.vel;

        //server works with CORNER mode so we need to convert it to CENTER mode

        //player one position
        this.playerOne.pos = Object.values(r.players)[0].pos;
        this.playerOne.pos.x += this.playerOne.width / 2;
        this.playerOne.pos.y += this.playerOne.height / 2;
        //player two position
        this.playerTwo.pos = Object.values(r.players)[1].pos;
        this.playerTwo.pos.x += this.playerTwo.width / 2;
        this.playerTwo.pos.y += this.playerTwo.height / 2;
        //players score
        this.playerTwo.score = Object.values(r.players)[1].score;
        this.playerOne.score = Object.values(r.players)[0].score;
    
        this.gamePaused = r.gamePaused;
        this.collisionList = r.collisionList;

    }

    draw(){
        background(color("#0A1119"));
        noStroke();

        let size = this.sceneManager.ctx["room-size"];
        //this makes the game room centered
        //in the server, there is no center point only common point is the 0,0
        translate(center.x - size.w / 2, center.y - size.h / 2);

        push();
            fill(color("#111E2C"));
            rect(0, 0, size.w, size.h);
        pop();

        this.court.show();
        this.ball.show();
        this.playerOne.show();
        this.playerTwo.show();
        
        push();
            fill(color("white"));
            textSize(100);
            textAlign(CENTER, CENTER);
            text(this.playerOne.score, size.w * 0.25, size.h * 0.2);
            text(this.playerTwo.score, size.w * 0.75, size.h * 0.2);
        pop();

        push();
            fill(color("white"));
            textSize(20);
            textAlign(CENTER, CENTER);
            text("press P to pause/play", size.w * 0.5, size.h * 0.95);
        pop();


        if (!this.isPlayerOneReady) {
            push();
            rectMode(CENTER);
            fill(0, 0, 0, 200);
            rect(size.w * 0.25, size.h / 2, size.w / 2, size.h);
            textAlign(CENTER, CENTER);
            textSize(45);
            fill(color("white"));
            text("press\nR\nto be ready",  size.w * 0.25, size.h / 2);
            pop();
        }

        if (!this.isPlayerTwoReady) {
            push();
            rectMode(CENTER);
            fill(0, 0, 0, 200);
            rect(size.w * 0.75, size.h / 2, size.w / 2, size.h);
            textAlign(CENTER, CENTER);
            textSize(45);
            fill(color("white"));
            text("press\nR\nto be ready", size.w * 0.75, size.h / 2);
            pop();
        }

        if (this.gamePaused) {
            push();
                rectMode(CORNER);
                fill(0, 0, 0, 200);
                rect(0, 0, size.w, size.h);
                rectMode(CENTER);
                fill(color("white"));
                rect(size.w / 2, size.h / 2, 200, 200, 20);
                fill(color("black"));
                rect(size.w / 2 - 25, size.h / 2, 25, 75);
                fill(color("black"));
                rect(size.w / 2 + 25, size.h / 2, 25, 75);
            pop();
        }
    
        if (this.gamePaused) return;
    
        if (keyIsDown(38)) {
            socket.emit("upkey");
        }
        if (keyIsDown(40)) {
            socket.emit("downkey");
        }
    
        if (debug) {
            for (let i = 0; i < this.collisionList.length; i++) {
                //Show Collider
                let a = this.collisionList[i];
                    push();
                    fill(color("red"));
                    noStroke();
                    rect(a.pos.x, a.pos.y, a.width, a.height);
                pop();
            }
        }
    }

    keyPressed(key){
        if (key == "p") socket.emit("pause");
        if (key == "r") socket.emit("ready");
    }
}