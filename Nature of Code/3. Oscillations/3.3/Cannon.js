function setup() {
  createCanvas(640, 360);
}

const balls = [];

function draw() {
    background(51);
    stroke(255);
    strokeWeight(4);
    line(0, height, mouseX, mouseY);

    if(mouseIsPressed) {
        // var angle = atan2(mouseY - height, mouseX);
        
        // // Fire a ball
        // const ball = {
        //     x: mouseX,
        //     y: mouseY,
        //     angle: angle,
        //     speedX: 7,
        //     speedY: 7,
        //     accX: 0,
        //     accY: -0.2,
        // };
        // balls.push(ball);
    }

    for(let i = balls.length - 1; i >= 0; i--) {
        const ball = balls[i];
        
        push();
        translate(ball.position.x, ball.position.y);
        rotate(ball.angleOfRotation);
        ball.velocity.add(ball.acceleration);
        ball.position.add(ball.velocity);
        ball.angleOfRotation += ball.angularVelocity;

        if(ball.position.y > height) {
            balls.splice(i, 1);
        }

        fill(255);
        ellipse(0,0, 20, 20);
        line(0,0, cos(ball.angleFromGround) * 20, sin(ball.angleFromGround) * 20);

        pop();
    }
}

function mouseClicked() {
    var angle = atan2(mouseY - height, mouseX);

    // Determine the speed using the distance between the mouse and the cannon
    const speed = dist(0, height, mouseX, mouseY) / 10;
        
    // Fire a ball
    const ball = {
        position: createVector(mouseX, mouseY),
        angleFromGround: angle,
        velocity: p5.Vector.fromAngle(angle, speed),
        acceleration: createVector(0, 0.2),
        angleOfRotation: 0,
        angularVelocity: 0.1
    };
    balls.push(ball);
}