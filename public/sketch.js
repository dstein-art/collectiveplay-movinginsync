//this variable will hold our shader object
let simpleShader;
let count;

let mouse1X=0;
let mouse1Y=0;
let mouse2X=0;
let mouse2Y=0;

// Open and connect socket
let socket = io();
let connected=0;

// Listen for when the socket connects
socket.on("connect", function () {
  // Log a success message
  connected = 1;
});


function preload(){
  // a shader is composed of two parts, a vertex shader, and a fragment shader
  // the vertex shader prepares the vertices and geometry to be drawn
  // the fragment shader renders the actual pixel colors
  // loadShader() is asynchronous so it needs to be in preload
  // loadShader() first takes the filename of a vertex shader, and then a frag shader
  // these file types are usually .vert and .frag, but you can actually use anything. .glsl is another common one
  simpleShader = loadShader('texture.vert', 'texture.frag');
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
    mouse2X=data.x;
    mouse2Y=data.y;
  });  
}

function mouseMoved() {
  socket.emit("data",{x: mouseX, y: mouseY});
  mouse1X=mouseX;
  mouse1Y=mouseY;
}


function draw() {  
  cnt++;
  let mx1 = map(mouse1X, 0, width, 0.0, 1.0);
  let my1 = map(mouse1Y, 0, height, 0.0, 1.0);
  
  let mx2 = map(mouse2X, 0, width, 0.0, 1.0);
  let my2 = map(mouse2Y, 0, height, 0.0, 1.0);  
  
  // shader() sets the active shader with our shader
  shader(simpleShader);

  simpleShader.setUniform('mouse1', [mx1, my1]);
  simpleShader.setUniform('mouse2', [mx2, my2]);

  //simpleShader.setUniform('mouse2', [0.5+0.1*cos(cnt/600), 0.5+0.1*sin(cnt/570)]);

  simpleShader.setUniform('resolution', [width,height]);

  simpleShader.setUniform('point1', [0.0,0.0]);
  simpleShader.setUniform('point2', [0.35,0.35]);
  simpleShader.setUniform('point3', [-0.25,0.5]);

  /*
  simpleShader.setUniform('point1', [sin(2+cnt/1000)+1.0,cos(3+cnt/1000)+1.0]);
  simpleShader.setUniform('point2', [cos(4+cnt/1333)+1.0,sin(5+cnt/843)+1.0]);
  simpleShader.setUniform('point3', [sin(6+cnt/897)+1.0,cos(7+cnt/993)+1.0]);
  */

  
  // rect gives us some geometry on the screen
  rect(0,0,width, height);


}

function windowResized(){
  resizeCanvas(windowWidth, windowHeight);
}