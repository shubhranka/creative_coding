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
        this.acceleration.mult(0);
    }
    
    display() {
        fill(0);
        stroke(0);
        circle(this.position.x, this.position.y, 10);
    }
}

let particles = [];
let angle = 0;
let r = 2;
let xr = 4;
let globalAngle = 0;

function angleToRadians(angle) {
    return angle * PI / 180;
}

function setup() {
    createCanvas(740, 740);
    let gap = 0;
    let angle = 0;
    Array.from({length: 20}, () => {
        gap += 5;
        particles.push(new Particle(0, gap,angleToRadians(angle)));
        angle += 20;
    });
    background(255);
}

function draw() {
    background(255);
    translate(width / 2, height / 2);
    particles.forEach(particle => {
        particle.position.y += r * sin(particle.angle);
        particle.position.x += xr * sin(particle.xAngle);
        // particle.update();
        particle.display();
        particle.angle += 0.09;
        particle.xAngle += 0.20;
    });
}