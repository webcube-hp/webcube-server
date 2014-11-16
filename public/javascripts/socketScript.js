$(function() {
  var socket = io.connect(window.location.host);
  socket.emit('join room', {code: window.webHpCode});
  socket.on('join failed', function() {
    window.location.replace("http://" + window.location.host + '?status=joinFailed');
  })
  socket.on('full room', function() {
    $('.start-game').show();
  })
})