class Court {
    constructor(height, width, x, y, color) {
        this.height = height;
        this.width = width;
        this.color = color;
        this.x = x;
        this.y = y;
    }

    show(){
        push();
            translate(sceneSize.w / 2, sceneSize.h / 2);
            rectMode(CENTER);
            fill(color(this.color));
            rect(this.x, this.y, this.width, this.height, 20);
        pop();
    }
  }