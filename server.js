const express = require('express');
const http = require('http');
const socket = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socket(server);

//serve static files from the public directory
app.use(express.static('public'));

//handle websocket connections
io.on('connection', socket => {
  console.log('🟢 A user connected');

  // real-time character broadcasting
  socket.on('char', char => {
    socket.broadcast.emit('char', char);
  });

  socket.on('disconnect', () => {
    console.log('🔴 A user disconnected');
  });
});

// start server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});

