function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER);
}

function draw() {
  background(255);
  fill(0);

  // Go back to corners
  rectMode(CORNER);
  
  // Draw ellipse
  ellipse(mouseX, mouseY, 50, 50);
  
}