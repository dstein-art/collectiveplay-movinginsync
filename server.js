// Make a basic web server
// HyperText Transfer Protocol
let http = require('http');
let port = process.env.PORT; // 3032

// Ask http to make me a server
http.createServer(respondToRequest).listen(port);

// 1. return
// 2. callback function

// What to do when server gets a request
function respondToRequest(req, res){
  console.log(req);
  
  // Hey I'm okay
  res.writeHead(200);
  res.end("Hey there", req);
  
}