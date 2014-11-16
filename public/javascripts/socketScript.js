$(function() {
  var isViewer = false;
  var socket = io.connect(window.location.host);
  socket.emit('join room', {code: window.webHpCode});
  socket.on('join failed', function() {
    window.location.replace("http://" + window.location.host + '?status=joinFailed');
  })
  socket.on('full room', function() {
    $('.start-game').show();
  })
  socket.on('set viewer', function() {
    isViewer = true;
  })

  $('#start-game').on('click', function() {
    socket.emit("start game", {});
  })
  socket.on('start game', function(data) {
    var ip = data.ip;
    if (isViewer) {
      window.location.replace('http://localhost:8080/?ip=127.0.0.1');
    } else {
      window.location.replace('http://' + $('#ip').val() + "/?code=" + $('#code').val());
    }
  })
})