//this variable will hold our shader object
let simpleShader;
let count;

let mx1=0;
let my1=0;
let mx2=0;
let my2=0;
let user=1;

function IsSafari() {
  var is_safari = navigator.userAgent.toLowerCase().indexOf('safari/') > -1;
  return is_safari;
}

//let isMobile=true;
//let isMobile = IsSafari(); //window.matchMedia("only screen and (max-width: 760px)").matches;
let isMobile = window.matchMedia("max-width: 860px").matches;
// Open and connect socket
let socket = io();
let connected=0;

// Listen for when the socket connects
socket.on("connect", function () {
  // Log a success message
  connected = 1;
});


if (isMobile) {
  // Asking for permision for motion sensors on iOS 13+ devices
  if (typeof DeviceOrientationEvent.requestPermission === 'function') {
    document.body.addEventListener('click', function () {
      DeviceOrientationEvent.requestPermission();
      DeviceMotionEvent.requestPermission();
    })
  }
}

function preload(){
  // a shader is composed of two parts, a vertex shader, and a fragment shader
  // the vertex shader prepares the vertices and geometry to be drawn
  // the fragment shader renders the actual pixel colors
  // loadShader() is asynchronous so it needs to be in preload
  // loadShader() first takes the filename of a vertex shader, and then a frag shader
  // these file types are usually .vert and .frag, but you can actually use anything. .glsl is another common one
  simpleShader = loadShader('texture.vert', 'texture.frag');
  
  const queryString = window.location.search;
  console.log(queryString);
}

function setup() {
  // shaders require WEBGL mode to work
  createCanvas(windowWidth, windowHeight, WEBGL);
  noStroke();
  cnt=0.0;
  socket.on('data', function(data){
    rectMode(CORNER);
    fill(255,100,100);
    // Draw ellipse
    //ellipse(windowWidth-data.x, windowHeight-data.y, 25, 25);
    if (data.user==0) {
      
    } else if ((data.user==1) && (user!=1)) {
      mx1=data.x;
      mx2=data.y;
    } else if ((data.user==2) && (user!=2)) {
      mx2=data.x;
      my2=data.y;  
    }
  });  
}

/*
function mouseMoved() {
  if (connected) {
    mx1 = map(mouseX, 0, windowWidth, 0.0, 1.0);
    my1 = map(mouseY, 0, windowHeight, 0.0, 1.0);  
    socket.emit("data",{x: mx1, y: my1});
  }
}
*/

let lr=-1;
let tb=-1;

function rotationChanged() {
  return ((floor(rotationY) != lr) || (floor(rotationX) != tb));  
}


function draw() {  
  cnt++;
  
  // Calcaulate transparency of left-right
  // and up-down halves based on tilt of device
  // RotationXY gives you numbers from -180 to 180.



  // Map rotation to position
  
  if (isMobile) {
    console.log('isMobile ', isMobile)
    if (connected && (rotationChanged)) {
      lr = floor(rotationY);
      tb = floor(rotationX-90);

      // Ignore flipped over device
      lr = constrain(lr, -90, 90);
      tb = constrain(tb, -90, 90);

      mx1 = map(lr, -90, 90, 0, 1);
      my1 = map(tb, -90, 90, 0, 1);  
      console.log("emitting data;")
      socket.emit("data",{user: user, x: mx1, y: my1});
    }
  }
  
  
  //let mx1 = map(mouse1X, 0, windowWidth, 0.0, 1.0);
  //let my1 = map(mouse1Y, 0, windowHeight, 0.0, 1.0);
  
  //let mx2 = map(mouse2X, 0, windowWidth, 0.0, 1.0);
  //let my2 = map(mouse2Y, 0, windowHeight, 0.0, 1.0);  
  
  // shader() sets the active shader with our shader
  shader(simpleShader);

  simpleShader.setUniform('mouse1', [mx1, my1]);
  simpleShader.setUniform('mouse2', [mx2, my2]);

  //simpleShader.setUniform('mouse2', [0.5+0.1*cos(cnt/600), 0.5+0.1*sin(cnt/570)]);

  simpleShader.setUniform('resolution', [windowWidth,windowHeight]);

  simpleShader.setUniform('point1', [0.0,0.0]);
  simpleShader.setUniform('point2', [0.35,0.35]);
  simpleShader.setUniform('point3', [-0.25,0.5]);

  // rect gives us some geometry on the screen
  rect(0,0,width, height);

}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}