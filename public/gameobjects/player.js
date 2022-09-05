class Player {
    constructor(height, width, x, y, color, upKey, downKey, speed) {
        this.height = height;

        this.width = width;
        this.color = color;
        this.pos = createVector(x, y);

        this.upKey = upKey;
        this.downKey = downKey;
        this.speed = speed;

        this.score = 0;
    }

    show(){
        push();
            rectMode(CENTER);
            fill(color(this.color));
            rect(this.pos.x, this.pos.y, this.width, this.height, 20);
        pop();
    }

    update(){
        //No need for a update function, since the player update works on server
    }
  }