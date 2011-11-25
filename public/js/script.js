var socket = io.connect();
var face = io.connect("/face");

socket.on('connect', function() {
    console.log('Connected');
});

socket.on('message', function(data) {
    //var something = $.parseJSON(data.message.replace('\n',''));
    //console.log(something);
    add_message(data.message);
});

socket.on('narrate', function(data) {
    console.log(data);
});

face.on('mouth', function(data) {
    if(data.mouth == 'smile') {
        $('.mouth').height(80);
    } else if(data.mouth == 'look') {
        $('.mouth').height(0);
    }
});

function add_message(message) {
    $('#messagelist').append($('<li>').text(data.message));
}

function add_error_message(message) {
    $('#messagelist').append($('<li>').text(data.message).addClas('error'));
}

$(document).ready(function() {
    if($('.debugMessage').length) {
        var list = $('.debugMessage ul');
        socket.on('connect', function() {
            list.append(
                $('<li>')
                .text('Connected')
                .addClass('info')
            );
            toBottom();
        });
        face.on('mouth', function(data) {
            list.append(
                $('<li>')
                .addClass('faceMessage')
                .text(JSON.stringify(data))
                .prepend(
                    $('<span>')
                    .text('[mouth] ')
                )
            );
            toBottom();
        });
        socket.on('message', function(data) {
            list.append(
                $('<li>')
                .addClass('message')
                .text(JSON.stringify(data))
                .prepend(
                    $('<span>')
                    .text('[message] ')
                )
            );
            toBottom();
        });
    }
});

// implement JSON.stringify serialization
JSON.stringify = JSON.stringify || function (obj) {
    var t = typeof (obj);
    if (t != "object" || obj === null) {
        // simple data type
        if (t == "string") obj = '"'+obj+'"';
        return String(obj);
    }
    else {
        // recurse array or object
        var n, v, json = [], arr = (obj && obj.constructor == Array);
        for (n in obj) {
            v = obj[n]; t = typeof(v);
            if (t == "string") v = '"'+v+'"';
            else if (t == "object" && v !== null) v = JSON.stringify(v);
            json.push((arr ? "" : '"' + n + '":') + String(v));
        }
        return (arr ? "[" : "{") + String(json) + (arr ? "]" : "}");
    }
};

function toBottom() {
    window.scroll(0,document.height);
}
