// Add an interaction to the spinning baton. How can you control the acceleration with the mouse? Can you introduce the idea of drag, decreasing the angular velocity over time so the baton eventually comes to rest?


let angle = 0;
let aVelocity = 0;
let aAcceleration = 0.001;

function setup() {
    createCanvas(640, 360);
}

function draw() {
    background(255);

    let mouse = createVector(mouseX, mouseY);
    let center = createVector(width / 2, height / 2);
    let dir = mouse.sub(center);
    let theta = dir.heading();

    push();
    translate(width / 2, height / 2);
    rotate(theta);
    stroke(0);
    strokeWeight(2);
    fill(175);
    rectMode(CENTER);
    rect(0, 0, 64, 8);
    pop();
}