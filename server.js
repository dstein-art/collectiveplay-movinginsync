// Make a basic web server
// HyperText Transfer Protocol
let http = require('http');
let port = process.env.PORT; // 3032

// Load the express functionality
let express = require('express');

// Make my express app
let app = express();

// Ask http to make me a server
// Let my server app handle all request
http.createServer(app).listen(port);

// Tell my server app where to look for content to serve up in response to requests
app.use(express.static('publics'));


// 1. return
// 2. callback function

