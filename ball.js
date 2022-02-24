class Ball {
    constructor(startX, startY, radius, color) {
        this.radius = radius;
        this.color = color;
        this.pos = createVector(startX, startY);
        this.vel = createVector(5, 5);
    }

    show(){
        push();
            rectMode(CENTER);
            fill(color(this.color));
            circle(this.pos.x, this.pos.y, this.radius);
        pop();
    }

    update(){
    }
}