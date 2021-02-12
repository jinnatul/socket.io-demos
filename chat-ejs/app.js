import express from 'express';
import http from 'http';
import socketIO from 'socket.io';

const app = express();
const server = http.Server(app);
const io = socketIO(server);

app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
  res.render('index');
})

io.on('connection', (socket) => {
  socket.on('chat message', (msg) => {
    console.log(msg);
  });
})

export default server;