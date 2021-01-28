//1. Load the http server module
//2. Get the port for my environment
//3. Create a server
//4. Hook the server up to listen to the correct port
//5. Load the express module
//6. Make an express server app
//7. Hook up the server to the express app
//8. Tell the express app where to look to serve up content

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

