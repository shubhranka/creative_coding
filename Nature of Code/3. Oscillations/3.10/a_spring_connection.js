class Particle {
    constructor(x,y,angle) {
        this.position = createVector(x, y);
        this.velocity = createVector(0, 0);
        this.acceleration = createVector(0, 0);
        this.angle = angle;
        this.xAngle = angle;
    }
    
    update() {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);

        this.velocity.mult(0.99);
        this.acceleration.mult(0);
    }

    applyForce(force) {
        this.acceleration.add(force);
    }
    
    display() {
        fill(0);
        stroke(0);
        circle(this.position.x, this.position.y, 10);
    }
}

class Spring {
    constructor(anchor, k, restLength){
        this.anchor = anchor;
        this.k = k;
        this.restLength = restLength;
    }

    connect(bob) {
        const force = p5.Vector.sub(bob.position, this.anchor.position);
        const currentLength = force.mag();
        const stretch = currentLength - this.restLength;

        force.setMag(-1 * stretch * this.k);
        bob.applyForce(force);
    }

    show(){
        stroke(0);
        strokeWeight(2);
        line(this.anchor.position.x, this.anchor.position.y, bob.position.x, bob.position.y);
        circle(this.anchor.position.x, this.anchor.position.y, 7);
    }
}

function setup() {
    createCanvas(640, 360);
    bob = new Particle(width / 2 + 50, height / 2 + 100, 0);
    anchor = new Particle(width / 2, height / 2 - 100, 0);
    spring = new Spring(anchor, 0.01, 100);
    gravity = createVector(0, 0.09);
}

function draw() {
    background(255);
    spring.connect(bob);
    
    bob.applyForce(gravity);
    bob.update();
    spring.show();
    bob.display();
}

function mouseClicked() {
    bob.position.x = mouseX;
    bob.position.y = mouseY;
}


