function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER);
}

function draw() {
  background(255);
  noStroke();
  fill(0);

  // Go back to corners
  rectMode(CORNER);
  
  // Draw ellipse
  ellipse(x, y, 50, 50);
  
  console.log(x, y);
}