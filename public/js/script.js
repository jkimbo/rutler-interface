var socket = io.connect();
var face = io.connect("/face");

socket.on('connect', function() {
    console.log('Connected');
});

socket.on('message', function(data) {
    //var something = $.parseJSON(data.message.replace('\n',''));
    //console.log(something);
    $('#messagelist').append($('<li>').text(data.message));
});

socket.on('narrate', function(data) {
    console.log(data);
});

face.on('mouth', function(data) {
    if(data.mouth == 'smile') {
        $('.mouth').height(20);
    } else if(data.mouth == 'look') {
        $('.mouth').height(0);
    }
});

$(document).ready(function() {
});
