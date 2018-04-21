const express = require('express');
const socketIO = require('socket.io');
const path = require('path');
const http = require('http');

const publicPath = path.join(__dirname, '../public');
const port = process.env.PORT || 3000
const app = express();
let server = http.createServer(app);
let io = socketIO(server);

app.use(express.static(publicPath));

io.on('connection',(socket)=>{
  console.log('New user connected');

  socket.on('createMessage',(message)=>{
    console.log('createMessage',message);
  })
  socket.emit('newMessage', {
    from: 'neal@example.com',
    text: 'hey whats up',
    createdAt: 2323123
  });

  socket.on('disconnect',()=>{
    console.log('User was disconnected');
  })

});

server.listen(port,()=>{
  console.log(`Server is up on ${port}`);
})
