class Court {
    constructor(height, width, x, y, color, ctx) {
        this.height = height;
        this.width = width;
        this.color = color;
        this.x = x;
        this.y = y;
        this.ctx = ctx;
    }

    show(){
        push();
            translate(this.ctx["room-size"].w / 2, this.ctx["room-size"].h / 2);
            rectMode(CENTER);
            fill(color(this.color));
            rect(this.x, this.y, this.width, this.height, 20);
        pop();
    }
  }