var playerOne;
var playerTwo;
var court;
var ball;


collisionList=[];

function setup() {
    createCanvas(innerWidth, innerHeight);
    court = new Court(innerHeight*0.6, 5, 0, 0, "#ffffff");

    ball = new Ball(innerWidth/2, innerHeight/2, 20, 20, "#B3F2F2");

    playerOne = new Player(250, 20, (innerWidth*0.10), innerHeight/2-250/2, "#ffffff", 87, 83, 10);
    playerTwo = new Player(250, 20, innerWidth-(innerWidth*0.10), innerHeight/2-250/2, "#ffffff", 38, 40, 10);

    shootBall(Math.random() < 0.5 ? -1 : 1);

    collisionList.push(
        {
            pos: playerOne.pos,
            width: playerOne.width,
            height: playerOne.height,
            hitEffect: (ball)=>{
                let diff = ball.pos.y - playerOne.pos.y;
                let rad = radians(45);
                let angle = map(diff, 0, playerOne.height, -rad, rad);
                ball.vel = createVector(ball.speed * cos(angle), ball.speed * sin(angle));
                ball.pos.x = playerOne.pos.x + playerOne.width + ball.radius;
            }
        }
    );
    collisionList.push(
        {
            pos: playerTwo.pos,
            width: playerTwo.width,
            height: playerTwo.height,
            hitEffect: (ball)=>{
                let diff = ball.pos.y - playerTwo.pos.y;
                let angle = map(diff, 0, playerTwo.height, radians(225), radians(135));
                ball.vel = createVector(ball.speed * cos(angle), ball.speed * sin(angle));
                ball.pos.x = playerTwo.pos.x - ball.radius;
            }
        }
    );
    collisionList.push(
        {
            pos: createVector(0, 0),
            width: 10,
            height: innerHeight,
            hitEffect: (ball)=>{playerTwo.score+=1; shootBall(1); restart();}
        }
    ); //Left Wall;
    collisionList.push(
        {
            pos: createVector(0, 0),
            width: innerWidth,
            height: 10,
            hitEffect: (ball)=>{ball.vel.mult(createVector(1, -1));}
        }
    ); //Top Wall;
    collisionList.push(
        {
            pos: createVector(innerWidth, 0),
            width: -10,
            height: innerHeight,
            hitEffect: (ball)=>{playerOne.score+=1; shootBall(-1); restart();}
        }
    ); //Right Wall;
    collisionList.push(
        {
            pos: createVector(0, innerHeight),
            width: innerWidth,
            height: -10,
            hitEffect: (ball)=>{ball.vel.mult(createVector(1, -1));}
        }
    ); //Bottom Wall;
}


function draw() {
    background(color("#0A1119"));
    court.show();
    ball.show();
    ball.update(collisionList);

    playerOne.show();
    playerOne.update();

    playerTwo.show();
    playerTwo.update();

    fill(color("white"));
    textSize(100);
    textAlign(CENTER, CENTER)
    text(playerOne.score, innerWidth/2-200, innerHeight*0.15);
    text(playerTwo.score, innerWidth/2+200, innerHeight*0.15);
    
    /*for (let i = 0; i < collisionList.length; i++) { //Show Collider
        a = collisionList[i];
        push();
            fill(color("red"));
            noStroke();
            rect(a.pos.x, a.pos.y, a.width, a.height);
        pop();
    }*/
}

function shootBall(direction){
    ball.waitFor = direction == -1 ? playerOne : playerTwo;
    ball.pos = createVector(innerWidth/2 + (direction * 300), innerHeight/2);
    ball.vel = createVector(ball.speed * direction, 0);
}

function restart(){
    playerOne.pos.set(innerWidth*0.10, innerHeight/2-250/2);
    playerTwo.pos.set(innerWidth-(innerWidth*0.10), innerHeight/2-250/2);
}