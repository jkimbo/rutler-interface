var socket = io.connect();
var face = io.connect("/face");

socket.on('connect', function() {
    console.log('Connected');
});

socket.on('message', function(data) {
    console.log(data);
});

socket.on('narrate', function(data) {
    console.log(data);
});

face.on('face', function(data) {
    console.log(JSON.stringify(data));
    if(data.command) {
        commands['reset'].apply();
        commands[data.command].apply();
    }
});

$(document).ready(function() {
    // initialisation 
    mouth.element = $('.mouth');
    eye.left = $('.eyeContainer#left');
    eye.right = $('.eyeContainer#right');
    eyebrow.left = $('.eyeBrow#left');
    eyebrow.right = $('.eyeBrow#right');
    commands['reset'].apply();

    // Create command list 
    $.each(commands, function(index) {
        console.log(index);
        var command = $('<li>').append($('<a>').attr({'data-command': index, 'href': '#'}).text(index));
        $('#faces ul').append(command);
    });

    $('#faces a').on('click', function() {
        var command = $(this).data('command'); 
        commands['reset'].call();
        commands[command].call();
        return false;
    });

    // debug page
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
        socket.on('narrate', function(data) {
            list.append(
                $('<li>')
                .addClass('narrate')
                .text(JSON.stringify(data))
                .prepend(
                    $('<span>')
                    .text('[narrate] ')
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
