// Open and connect socket
let socket = io();
let connected=0;

// Listen for when the socket connects
socket.on("connect", function () {
  // Log a success message
  connected = 1;
});


function setup() {
  background(255);
  createCanvas(windowWidth, windowHeight);
  textAlign(CENTER);
  socket.on('data', function(data){
    rectMode(CORNER);
    fill(255,100,100);
    // Draw ellipse
    ellipse(windowWidth-data.x, windowHeight-data.y, 25, 25);
    
  });
}

function mouseMoved() {
  socket.emit("data",{x: mouseX, y: mouseY});
}

function drawDesign() {
  
}

function draw() {

  
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