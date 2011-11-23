var socket = io.connect("http://localhost");
var server = io.connect("http://localhost:8000");

server.on('message', function(data) {
    console.log('server', data);
    server.emit('confirmation', { recieved: data.message });
});

socket.on('connect', function() {
    console.log('Connected');
});

socket.on('message', function(data) {
    console.log(data);
});
