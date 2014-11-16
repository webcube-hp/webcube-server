module.exports = function(io) {
  io.on('connection', function(socket) {
    socket.on('join room', function(data) {
      var room = 'room-' + data.code;
      var rooms = io.nsps["/"].adapter.rooms;
      var len = 1;
      if (rooms.hasOwnProperty(room)) len = Object.keys(rooms[room]).length;
      if (len < 4) {
        socket.join(room);
        if (len === 3) io.to(room).emit('full room');
      } else {
        socket.emit('join failed', {});
      }
    })

    socket.on('start game', function() {
      console.log('test');
    })
  })
}