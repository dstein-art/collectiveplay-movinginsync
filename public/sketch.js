// Asking for permision for motion sensors on iOS 13+ devices
if (typeof DeviceOrientationEvent.requestPermission === 'function') {
  document.body.addEventListener('click', function () {
    DeviceOrientationEvent.requestPermission();
    DeviceMotionEvent.requestPermission();
  })
}

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

  // Calcaulate transparency of left-right
  // and up-down halves based on tilt of device
  // RotationXY gives you numbers from -180 to 180.
  let lr = floor(rotationY);
  let tb = floor(rotationX);
  // Ignore flipped over device
  lr = constrain(lr, -90, 90);
  tb = constrain(tb, -90, 90);

  // Map rotation to position
  let x = map(lr, -90, 90, 0, width);
  let y = map(tb, -90, 90, 0, height);
  
  // Draw ellipse
  ellipse(x, y, 50, 50);
  
  console.log(x, y);
}