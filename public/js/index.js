let socket = io();

socket.on('connect',function (){
  console.log('Connected to server');

  socket.emit('createMessage',{
    from: 't@example.com',
    text: 'hey whats up man'
  });
});

socket.on('newMessage', function(message){
  console.log('new message', message);
})
