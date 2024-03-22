const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const path = require('path');
const fs = require('fs');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

app.use(express.static(path.join(__dirname, 'public')));

// 最大接続数
const maxConnections = 2;
// 現在の接続数
let connectedClients = 0;

io.on('connection', (socket) => {
  if (connectedClients >= maxConnections) {
    // 最大接続数に達しているため、接続を拒否
    socket.emit('connectionRejected', 'Too many connections');
    socket.disconnect(true); // 接続を切断
  } else {
    // 新しい接続を許可
    connectedClients++;
    console.log('A user connected');
      io.emit("userCount", connectedClients)
    　io.emit("createTables")
    
    socket.on('disconnect', () => {
      connectedClients--;
      console.log('A user disconnected');
        io.emit("userCount", connectedClients)
    });
  }
});

io.on('connection', function(socket) {
    console.log('A user connected');

    socket.on('changeColor', function(data) {
        console.log(`Received color change request: ${data.newColor} at row ${data.row}, column ${data.col}`);
        // 送信元以外のクライアントに色の変更情報を送信する
        socket.broadcast.emit('updateColor', data);
    });
});

// クライアントが接続したときの処理
io.on('connection', (socket) => {
  socket.on('disconnect', () => {
    // クライアントが切断されたときの処理
    io.emit('clientDisconnected');
  });
});

// クライアントがページを更新したときの処理
app.post('/reload', (req, res) => {
  io.emit('pageReloaded');
  res.status(200).send('OK');
});


server.listen(3000, () => {
    console.log('Server is running on port 3000');
});