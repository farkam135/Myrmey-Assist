var app = require("express")();
var http = require("http").createServer(app);
var io = require("socket.io")(http);

//initialize app to be a function handler that you can supply to an HTTP
//server

//define a route handler that gets called when we hit website home
app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

io.on("connection", function(socket) {
  console.log("a user connected");
  socket.on("disconnect", function() {
    console.log("user disconnected");
  });
});

//make http server listen to port 30000
http.listen(3000, function() {
  console.log("listening on *:3000");
});
