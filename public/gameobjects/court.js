class Court {
    constructor(x, y, width, height, color) {
        this.height = height;
        this.width = width;
        this.color = color;
        this.x = x;
        this.y = y;
    }

    show(){
        push();
            rectMode(CENTER);
            fill(color(this.color));
            rect(this.x, this.y, this.width, this.height, 20);
        pop();
    }
  }