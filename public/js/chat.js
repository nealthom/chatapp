var socket = io();

function scrollToBottom(){
  //selectors
  const messages = jQuery('#messages');
  const newMessage = messages.children('li:last-child');
  //heights
  let clientHeight = messages.prop('clientHeight');
  let scrollTop = messages.prop('scrollTop');
  let scrollHeight = messages.prop('scrollHeight');
  let newMessageHeight = newMessage.innerHeight();
  let lastMessageHeight = newMessage.prev().innerHeight();

  if( clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight){
    messages.scrollTop(scrollHeight);
  }
}

socket.on('connect', function () {
  const params = jQuery.deparam(window.location.search);
  socket.emit('join',params, function(err){
    if(err){
      alert(err);
      window.location.href = '/';
    } else{
      console.log('No error');
    }
  });
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('updateUserList', function(users){
  let ol = jQuery('<ol></ol>');

  users.forEach(function(user){
    ol.append(jQuery('<li></li>').text(user));
  });

  jQuery('#users').html(ol);
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
  scrollToBottom();
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
  scrollToBottom();
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
