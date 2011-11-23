var socket = io.connect("http://localhost");

socket.on('connect', function() {
    console.log('Connected');
});

socket.on('message', function(data) {
    var something = $.parseJSON(data.message.replace('\n',''));
    console.log(something);
    $('#messagelist').append($('<li>').text(data.message));
});
