var playerOne;
var playerTwo;

function setup() {
    createCanvas(innerWidth, innerHeight);
    court = new Court(innerHeight*0.6, 5, 0, 0, "#ffffff");
    
    playerOne = new Player(250, 20, (innerWidth*0.10), innerHeight/2, "#ffffff", 87, 83, 10);
    playerTwo = new Player(250, 20, innerWidth-(innerWidth*0.10), innerHeight/2, "#ffffff", 38, 40, 10);
}


function draw() {
    background(color("#0A1119"));
    court.show();

    playerOne.show();
    playerOne.update();

    playerTwo.show();
    playerTwo.update();
}