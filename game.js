class Player {
    constructor(id, height, width, x, y, speed, roomsize) {
        this.id = id;
        this.height = height;
        this.width = width;

        this.pos = { x: x, y: y };
        this.speed = speed;

        this.score = 0;

        this.roomsize = roomsize;
        this.ready = false;
    }

    up() {
        var playerTop = this.pos.y;
        var topY = 0;

        if (playerTop > topY) {
            this.pos.y -= this.speed;
        }
    }

    down() {
        var playerBottom = this.pos.y + this.height;
        var bottomY = this.roomsize.h;

        if (playerBottom < bottomY) {
            this.pos.y += this.speed;
        }
    }
}

class Ball {
    constructor(startX, startY, radius, speed, color) {
        this.radius = radius;
        this.color = color;
        this.pos = { x: startX, y: startY };
        this.speed = speed;
        this.vel = { x: speed, y: 0 };

        this.waitFor = null;
    }

    update(collisionList) {
        /*if(this.waitFor) {
            if(keyIsDown(this.waitFor.upKey)||keyIsDown(this.waitFor.downKey)) {
                this.waitFor = null;
            }
            return;
        }*/
        this.collide(collisionList);
        this.pos = { x: this.pos.x + this.vel.x, y: this.pos.y + this.vel.y };
    }

    collide(others) {
        for (let i = 0; i < others.length; i++) {
            let o = others[i];
            if (
                circRect(
                    this.pos.x,
                    this.pos.y,
                    this.radius,
                    o.pos.x,
                    o.pos.y,
                    o.width,
                    o.height
                )
            ) {
                o.hitEffect(this);
            }
        }
    }
}

function circRect(cx, cy, rad, rx, ry, rw, rh) {
    let testX = cx;
    let testY = cy;

    if (cx < rx) testX = rx;
    // test left edge
    else if (cx > rx + rw) testX = rx + rw; // right edge
    if (cy < ry) testY = ry;
    // top edge
    else if (cy > ry + rh) testY = ry + rh; // bottom edge

    let d = Math.sqrt(
        Math.pow(Math.abs(testX - cx), 2) + Math.pow(Math.abs(testY - cy), 2)
    );
    //circle(testX,testY,10)
    if (d < rad) {
        return true;
    }
    return false;
}

const map = (value, x1, y1, x2, y2) =>
    ((value - x1) * (y2 - x2)) / (y1 - x1) + x2;

class Room {
    constructor(id) {
        this.id = id;
        this.players = {};
        this.size = { w: 1000, h: 700 };

        this.ball = new Ball(
            this.size.w / 2,
            this.size.h / 2,
            20,
            10,
            "#B3F2F2"
        );

        this.gameState = "not started";
        this.gamePaused = false;

        this.collisionList = [];
    }

    //add player if there is a room for it
    addPlayer(player) {
        if (Object.keys(this.players).length == 1) {
            //second player must be on the right side
            player.pos.x = player.roomsize.w - player.pos.x;
        }
        if (Object.keys(this.players).length < 2) {
            this.players[player.id] = player;
            return true;
        }
        return false;
    }

    start() {
        this.collisionList = [
            {
                pos: Object.values(this.players)[0].pos,
                width: Object.values(this.players)[0].width,
                height: Object.values(this.players)[0].height,
                hitEffect: (ball) => {
                    let diff =
                        ball.pos.y - Object.values(this.players)[0].pos.y;
                    let rad = 45 * (Math.PI / 180);
                    let angle = map(
                        diff,
                        0,
                        Object.values(this.players)[0].height,
                        -rad,
                        rad
                    );
                    ball.vel = {
                        x: ball.speed * Math.cos(angle),
                        y: ball.speed * Math.sin(angle),
                    };
                    ball.pos.x =
                        Object.values(this.players)[0].pos.x +
                        Object.values(this.players)[0].width +
                        ball.radius;
                },
            },
            {
                pos: Object.values(this.players)[1].pos,
                width: Object.values(this.players)[1].width,
                height: Object.values(this.players)[1].height,
                hitEffect: (ball) => {
                    let diff =
                        ball.pos.y - Object.values(this.players)[1].pos.y;
                    let angle = map(
                        diff,
                        0,
                        Object.values(this.players)[1].height,
                        225 * (Math.PI / 180),
                        135 * (Math.PI / 180)
                    );
                    ball.vel = {
                        x: ball.speed * Math.cos(angle),
                        y: ball.speed * Math.sin(angle),
                    };
                    ball.pos.x =
                        Object.values(this.players)[1].pos.x - ball.radius;
                },
            },
            {
                pos: { x: 0, y: 0 },
                width: 10,
                height: this.size.h,
                hitEffect: (ball) => {
                    Object.values(this.players)[1].score += 1;
                    this.shootBall(-1);
                    this.restart();
                },
            },
            {
                pos: { x: 0, y: 0 },
                width: this.size.w,
                height: 10,
                hitEffect: (ball) => {
                    ball.vel.y *= -1;
                },
            },
            {
                pos: { x: this.size.w, y: 0 },
                width: -10,
                height: this.size.h,
                hitEffect: (ball) => {
                    Object.values(this.players)[0].score += 1;
                    this.shootBall(1);
                    this.restart();
                },
            },
            {
                pos: { x: 0, y: this.size.h },
                width: this.size.w,
                height: -10,
                hitEffect: (ball) => {
                    ball.vel.y *= -1;
                },
            },
        ];
        this.shootBall(Math.random() < 0.5 ? -1 : 1);
        this.gameState = "started";
    }

    update() {
        if (this.gameState == "not started") {
            if (Object.keys(this.players).length == 2) {
                if (
                    Object.values(this.players)[0].ready &&
                    Object.values(this.players)[1].ready
                ) {
                    this.start();
                }
            }
            return;
        }

        if (this.gamePaused) return;
        this.ball.update(this.collisionList);
    }

    shootBall(direction) {
        /*this.ball.waitFor =
            direction == -1
                ? Object.values(this.players)[0]
                : Object.values(this.players)[1];
        */
        this.ball.pos = {
            x: this.size.w / 2 + direction * 300,
            y: this.size.h / 2,
        };
        this.ball.vel = { x: this.ball.speed * direction, y: 0 };
    }

    restart() {
        Object.values(this.players)[0].pos.x = this.size.w * 0.1;
        Object.values(this.players)[0].pos.y = this.size.h / 2 - 250 / 2;

        Object.values(this.players)[1].pos.x = this.size.w - this.size.w * 0.1;
        Object.values(this.players)[1].pos.y = this.size.h / 2 - 250 / 2;
    }
}

module.exports = { Room, Player };
