class SpaceShip {
    constructor(x, y) {
        this.position = createVector(x, y);
        this.velocity = createVector(0, 0);
        this.acceleration = createVector(0, 0);
        this.r = 6;
        this.heading = 0;
        this.rotation = 0;
        this.isBoosting = false;
    }
    
    applyForce(force) {
        this.acceleration.add(force);
    }
    
    boosting(b) {
        this.isBoosting = b;
    }
    
    turn(angle) {
        this.rotation += angle;
    }
    
    edges() {
        if (this.position.x > width + this.r) {
        this.position.x = -this.r;
        } else if (this.position.x < -this.r) {
        this.position.x = width + this.r;
        }
    
        if (this.position.y > height + this.r) {
        this.position.y = -this.r;
        } else if (this.position.y < -this.r) {
        this.position.y = height + this.r;
        }
    }

    checkKeys() {
        if (keyIsDown(LEFT_ARROW)) {
        this.turn(-0.1);
        }
        if (keyIsDown(RIGHT_ARROW)) {
        this.turn(0.1);
        }
        if (keyIsDown(UP_ARROW)) {
        this.boosting(true);
        } else {
        this.boosting(false);
        }
    }
    
    render() {
        push();
        translate(this.position.x, this.position.y);
        rotate(this.rotation + PI / 2);
    
        fill(0);
        stroke(255);
        strokeWeight(1);
        triangle(-this.r, this.r, this.r, this.r, 0, -this.r);
        pop();
    }
    
    update() {
        if (this.isBoosting) {
        let force = p5.Vector.fromAngle(this.rotation);
        force.mult(0.1);
        this.applyForce(force);
        }
    
        this.position.add(this.velocity);
        this.velocity.add(this.acceleration);
        this.velocity.mult(0.99);
        this.acceleration.mult(0);
        this.edges();
    }
}

let ship;

function setup() {
    createCanvas(640, 480);
    ship = new SpaceShip(width / 2, height / 2);
}

function draw() {
    background(51);
    ship.checkKeys();
    ship.render();
    ship.update();
}