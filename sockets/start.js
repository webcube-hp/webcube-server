module.exports = function(io) {
  io.on('connection', function(socket) {
    var room;
    var rooms = io.nsps["/"].adapter.rooms;
    var len = 0;

    socket.on('join room', function(data) {
      room = 'room-' + data.code;
      rooms = io.nsps["/"].adapter.rooms;
      if (rooms.hasOwnProperty(room)) len = Object.keys(rooms[room]).length;
      if (len === 0) {
        socket.emit('set viewer', {});
      }
      if (len < 5) {
        socket.join(room);
        if (len === 4) io.to(room).emit('full room');
      } else {
        socket.emit('join failed', {});
      }
    })

    socket.on('start game', function(data) {
      io.to(room).emit('start game', {});
    })
  })
}