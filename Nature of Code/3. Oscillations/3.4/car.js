class Car {
    constructor() {
        this.position = createVector(width / 2, height / 2);
        this.velocity = createVector(0, 0);
        this.acceleration = createVector(0, 0);
        this.r = 6;
        this.maxspeed = 4;
        this.maxforce = 0.1;
    }
    
    applyForce(force) {
        this.acceleration.add(force);
    }
    
    checkKeys() {
        if (keyIsDown(LEFT_ARROW)) this.applyForce(createVector(-0.1, 0));
        if (keyIsDown(RIGHT_ARROW)) this.applyForce(createVector(0.1, 0));
        if (keyIsDown(UP_ARROW)) this.applyForce(createVector(0, -0.1));
        if (keyIsDown(DOWN_ARROW)) this.applyForce(createVector(0, 0.1));
    }
    
    update() {
        this.velocity.add(this.acceleration);
        this.velocity.limit(this.maxspeed);
        this.position.add(this.velocity);
        this.acceleration.mult(0);
    }
    
    display() {
        let theta = this.velocity.heading() + PI / 2;
        fill(127);
        stroke(0);
        strokeWeight(1);
        push();
        translate(this.position.x, this.position.y);
        rotate(theta);
        beginShape();
        vertex(0, -this.r * 2);
        vertex(-this.r, this.r * 2);
        vertex(this.r, this.r * 2);
        endShape(CLOSE);
        pop();
    }
    
    borders() {
        if (this.position.x < -this.r) this.position.x = width + this.r;
        if (this.position.y < -this.r) this.position.y = height + this.r;
        if (this.position.x > width + this.r) this.position.x = -this.r;
        if (this.position.y > height + this.r) this.position.y = -this.r;
    }
}

let car;



function setup() {
    createCanvas(640, 360);
    car = new Car();
}

function draw() {
    background(255);
    car.checkKeys();
    car.update();
    car.borders();
    car.display();
}