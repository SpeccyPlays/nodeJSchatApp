const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
const auth = require('./private/auth/auth')

app.use(express.static(__dirname));
app.use(auth);
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/private/chat.html');
});
io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('chat message', (msg) => {
        socket.broadcast.emit('chat message', msg);
    })
    socket.on('disconnect', () => {
        console.log('user disconnected');
      });
  });
server.listen(3000, () => {
  console.log('listening on *:3000');
});