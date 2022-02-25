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
            fill(color(this.color));
            rect(this.pos.x, this.pos.y, this.width, this.height, 20);
        pop();
    }

    update(){
        var playerTop = this.pos.y;
        var topY = 0;

        var playerBottom = this.pos.y + this.height;
        var bottomY = innerHeight;
        
        if(playerTop > topY){
            if(keyIsDown(this.upKey)){
                this.pos.y -= this.speed;
            }
        }
        if(playerBottom < bottomY){
            if(keyIsDown(this.downKey)){
                this.pos.y += this.speed;
            }
        }
    }
  }