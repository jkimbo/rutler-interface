var io = require('socket.io').listen(8000);

var message = process.argv[2];

io.sockets.on('connection', function(socket) {
    socket.emit('message', { message: message });
    socket.on('confirmation', function(data) {
        if(data.recieved == message){
            process.exit();
        }
    });
});

