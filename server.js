const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIO(server);

// Serve frontend files from the 'public' folder
app.use(express.static('public'));

// WebSocket logic
io.on('connection', (socket) => {
  console.log('🟢 User connected');

  socket.on('text-update', (data) => {
    // Broadcast full text box info to all other clients
    socket.broadcast.emit('text-update', data);
  });

  socket.on('disconnect', () => {
    console.log('🔴 User disconnected');
  });
});

// IMPORTANT: use dynamic port for Render or default to 3000
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});



