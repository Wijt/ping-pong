class GameScene extends Scene {
    constructor(){
        super();

        this.playerOne;
        this.playerTwo;
        this.court;
        this.ball;

        this.gamePaused = false;
    }

    start(){
        this.court = new Court(this.sceneManager.ctx["room-size"].h * 0.6, 5, 0, 0, "#ffffff", this.sceneManager.ctx);

        this.ball = new Ball(this.sceneManager.ctx["room-size"].w / 2, this.sceneManager.ctx["room-size"].h / 2, 20, 20, "#B3F2F2");

        this.playerOne = new Player(
            this.sceneManager.ctx["room-size"].h * 0.20,
            20,
            this.sceneManager.ctx["room-size"].w * 0.1,
            this.sceneManager.ctx["room-size"].h / 2 - 250 / 2,
            "#ffffff",
            87,
            83,
            10
        );
        this.playerTwo = new Player(
            this.sceneManager.ctx["room-size"].h * 0.20,
            20,
            this.sceneManager.ctx["room-size"].w - this.sceneManager.ctx["room-size"].w * 0.1,
            this.sceneManager.ctx["room-size"].h / 2 - 250 / 2,
            "#ffffff",
            38,
            40,
            10
        );
    }

    update(){
        super.update();
    }

    draw(){
        background(color("#0A1119"));
        this.court.show();
        this.ball.show();
        this.playerOne.show();
        this.playerTwo.show();
    
        fill(color("white"));
        textSize(100);
        textAlign(CENTER, CENTER);
        text(this.playerOne.score, this.sceneManager.ctx["room-size"].w / 2 - 200, this.sceneManager.ctx["room-size"].h * 0.15);
        text(this.playerTwo.score, this.sceneManager.ctx["room-size"].w / 2 + 200, this.sceneManager.ctx["room-size"].h * 0.15);
    
        if (this.gamePaused) {
            push();
            rectMode(CORNER);
            fill(0, 0, 0, 200);
            rect(0, 0, this.sceneManager.ctx["room-size"].w, this.sceneManager.ctx["room-size"].h);
            rectMode(CENTER);
            fill(color("white"));
            rect(this.sceneManager.ctx["room-size"].w / 2, this.sceneManager.ctx["room-size"].h / 2, 200, 200, 20);
            fill(color("black"));
            rect(this.sceneManager.ctx["room-size"].w / 2 - 25, this.sceneManager.ctx["room-size"].h / 2, 25, 75);
            fill(color("black"));
            rect(this.sceneManager.ctx["room-size"].w / 2 + 25, this.sceneManager.ctx["room-size"].h / 2, 25, 75);
            pop();
        }
    
        if (this.gamePaused) return;
    
        if (keyIsDown(38)) {
            socket.emit("upkey");
        }
        if (keyIsDown(40)) {
            socket.emit("downkey");
        }
    
        if (this.debug) {
            for (let i = 0; i < this.collisionList.length; i++) {
                //Show Collider
                a = this.collisionList[i];
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