import express from 'express';
import http from 'http';
import socketIO from 'socket.io';

const app = express();
const server = http.Server(app);
const io = socketIO(server, { cors: {
  origin: "http://localhost:3000",
  methods: ["GET", "POST"],
  credentials: true
}});

io.on('connection', (socket) => {
  socket.on('chat message', ({ name, message }) => {
    io.emit('chat message', { name, message });
  });
});

export default server;