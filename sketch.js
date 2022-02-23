function setup() {
    createCanvas(innerWidth, innerHeight);
    court = new Court(innerHeight*0.6, 5, 0, 0, "#ffffff");
}


function draw() {
    background(color("#0A1119"));
    court.show();
}