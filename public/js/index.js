var socket = io();

socket.on('connect', function () {
  console.log('Connected to server');
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
  const formattedTime = moment(message.createdAt).format('h:mm a');
  const template = jQuery('#message-template').html();
  const html = Mustache.render(template,{
    text: message.text,
    from: message.from,
    createdAt: formattedTime
  });

  jQuery('#messages').append(html);
});

socket.on('newLocationMessage',function(message){
  const formattedTime = moment(message.createdAt).format('h:mm a');
  const template = jQuery('#location-message-template').html();
  const html = Mustache.render(template,{
    from: message.from,
    url: message.url,
    createdAt: formattedTime
  });


  jQuery('#messages').append(html);
})

jQuery('#message-form').on('submit', function (e) {
  e.preventDefault();

  let messageTextbox = jQuery('[name=message]');
  socket.emit('createMessage', {
    from: 'User',
    text: messageTextbox.val()
  }, function () {
      messageTextbox.val('');
  });
});



const locationButton = jQuery('#send-location');
locationButton.on('click', () => {

 if (!navigator.geolocation) {
   return alert('Geo location not supported by your browser');
 }

 locationButton.attr('disabled','disabled').text('Sending location...');

 navigator.geolocation.getCurrentPosition(function () {}, function () {}, {});
 navigator.geolocation.getCurrentPosition((position) => {
   locationButton.removeAttr('disabled').text('Send location');
   socket.emit('createLocationMessage',{
     latitude: position.coords.latitude,
     longitude: position.coords.longitude
   });
 }, (err) => {
   locationButton.removeAttr('disabled').text('Send location');
   alert('Unable to fetch location');
 });
});
