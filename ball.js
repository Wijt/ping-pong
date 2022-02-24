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

    update(collisionList){
        this.collide(collisionList);
        this.pos.add(this.vel);	
    }

    collide(others) {
        for (let i = 0; i < others.length; i++) {
            let o = others[i];
            if (circRect(this.pos.x,this.pos.y,this.radius,o.pos.x,o.pos.y,o.width,o.height)) {
                this.vel = o.hitEffect(this);
            }
        }
    }
}

function circRect(cx, cy, rad, rx, ry, rw, rh) {
    let testX = cx;
    let testY = cy;
    
    if (cx < rx)         testX = rx;      // test left edge
    else if (cx > rx+rw) testX = rx+rw;   // right edge
    if (cy < ry)         testY = ry;      // top edge
    else if (cy > ry+rh) testY = ry+rh;   // bottom edge
    
    let d = dist(cx, cy, testX, testY);
    //circle(testX,testY,10)
    if (d < rad) {
        return true;
    }
    return false;
}