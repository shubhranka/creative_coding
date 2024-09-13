let r;
let theta;

function setup() {
  createCanvas(740, 740);
  r = height * 0.01;
  theta = 0;
  background(255);
}

function draw() {``
  translate(width / 2, height / 2);
// Translate the origin point to the center of the screen.

  let x = r * cos(theta);
  let y = r * sin(theta);
// Polar coordinates (r, theta) are converted to Cartesian (x, y) for use in the circle() function.

  fill(0);
  stroke(0);
//   line(0, 0, x, y);
  circle(x, y, 10);
  theta += 0.09;
  r+=0.2;
// Increase the angle over time.

}