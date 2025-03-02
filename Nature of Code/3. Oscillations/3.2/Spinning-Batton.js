// Add an interaction to the spinning baton. How can you control the acceleration with the mouse? Can you introduce the idea of drag, decreasing the angular velocity over time so the baton eventually comes to rest?


let angle = 0;
let aVelocity = 0;
let aAcceleration = 0.000;
let friction = 0.99;

function setup() {
    createCanvas(640, 360);
}

function draw() {
    background(255);

    translate(width / 2, height / 2);
    rotate(angle);

    fill(175);
    strokeWeight(2);
    stroke(0);
    line(-50, 0, 50, 0);
    ellipse(50, 0, 8, 8);
    ellipse(-50, 0, 8, 8);

    angle += aVelocity;
    aVelocity += aAcceleration;
    aVelocity *= friction;

    if (mouseIsPressed) {
        aAcceleration += 0.0001;
    }
    else {
        aAcceleration = 0;
    }
}