// Open and connect socket
let socket = io();
let connected=0;

// Listen for when the socket connects
socket.on("connect", function () {
  // Log a success message
  connected = 1;
});

function setup() {
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER);
}

function mouseClicked() {
  socket.emit("data",{x: mouseX, y: mouseY});
}

function draw() {
  background(255);
  
  if (connected) {
    fill(100,100,255);
  } else {
    fill(0);
  }

  // Go back to corners
  rectMode(CORNER);
  
  // Draw ellipse
  ellipse(mouseX, mouseY, 50, 50);
}