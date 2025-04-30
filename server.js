const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Serve static frontend from "public"
app.use(express.static('public'));

io.on('connection', (socket) => {
  console.log('🟢 User connected');

  socket.on('create-box', (data) => {
    socket.broadcast.emit('create-box', { ...data, remote: true });
  });

  socket.on('update-box', (data) => {
    socket.broadcast.emit('update-box', data);
  });

  socket.on('disconnect', () => {
    console.log('🔴 User disconnected');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});



