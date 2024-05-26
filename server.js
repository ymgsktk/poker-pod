const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let count = 0;

app.use(express.static('public')); // 'public' フォルダーの静的ファイルを提供

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.emit('updateCount', count);
  
  socket.on('increment', (incrementValue) => {
    count += incrementValue;
    io.emit('updateCount', count);
  });
  socket.on('reset', () => { // リセット処理
    count = 0;
    io.emit('updateCount', count);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
