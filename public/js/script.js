var socket = io.connect();
var face = io.connect("/face");

socket.on('connect', function() {
    console.log('Connected');
});

socket.on('message', function(data) {
    console.log(data);
});

var talking = {
    isTalking: false, // currently talking
    messages: [], // queue of messages to be said
    talk : function(message, callback) {
        $('#bowtie').fadeTo(100, 0.1);
        this.isTalking = true; // set rutler as talking
        var words = message.replace(/ /g, " </span><span>");
        $("#port").html('<span>'+words+'</span>').show();
        var alerts = $("#port span").animate({ opacity: 0 }, 0);
        this.currentWord = 0;
        this.showWords(alerts, function() {
            if(talking.messages.length) {
                var timeout = setTimeout(function() {
                    talking.talk(talking.messages[0]);
                    talking.messages.splice(0,1); // remove element from array
                }, 400);
            } else {
                talking.isTalking = false;
                callback();
            }
        });
    },
    showWords: function(words, callback) {
        if(words.eq(talking.currentWord).length) {
            words.eq(talking.currentWord).animate({
                opacity: 1, 
                fontSize: "200%" 
            }, 200, function() {
                talking.currentWord++;
                talking.showWords(words, callback);
            });
        } else {
            callback();
        }
    }
}

socket.on('narrate', function(data) {
    if(talking.isTalking) { // if rutler is currently talking then queue up the message
        talking.messages.push(data.message);
    } else { // else just say it
        talking.talk(data.message, function() {
            //commands['acknowledge'].call();
            //hand.element.show();
            //$('#prompt .options li a').each(function(index) {
                //if(hand.isMoving) {
                    //hand.points.push(this);
                //} else {
                    //hand.point(this);
                //}
            //});
        });
    }
}); 

socket.on('approached', function(data) {
    //$("#box").show();
	//$("#port").addClass("port_search");
    //commands['acknowledge'].call();
    //hand.element.show();
    //$('#prompt .options li a').each(function(index) {
        //if(hand.isMoving) {
            //hand.points.push(this);
        //} else {
            //hand.point(this);
        //}
    //});
    console.log(data);
    $('#container').scrollTo($('#prompt'), 600);
}); 

var hand = {
    element: $('#hand'),
    isMoving: false,
    points: [],
    currentPoint: 0,
    point: function(to) {
        hand.isMoving = true;
        var offset = $(to).offset();
        hand.element.animate({
            top: offset.top
        }, 600, function() {
            if(hand.points[hand.currentPoint]) {
                hand.point(hand.points[hand.currentPoint]);
                hand.currentPoint++;
            } else {
                hand.isMoving = false;
                return false;
            }
        });
    }
};

var box = {
    element: $('#box'),
    show: function() {
        this.element.show();
    }
}

face.on('face', function(data) {
    console.log(JSON.stringify(data));
    if(data.command) {
        commands['reset'].apply();
        commands[data.command].apply();
    }
});

var deg = -90;
var t;

function increment() {
    eyes.look(deg, deg);
    deg += 3;
    t = setTimeout('increment()', 100);
}

$(document).ready(function() {
    // initialisation 
    mouth.element = $('.mouth');
    eye.left = $('.eyeContainer#left');
    eye.right = $('.eyeContainer#right');
    eyebrow.left = $('.eyeBrow#left');
    eyebrow.right = $('.eyeBrow#right');
    commands['reset'].apply();
    eyes.init();


    increment();

    /*
     * jQuery UI Autocomplete
     */
    $("input#personfinder").autocomplete({
        source: ["c++", "java", "php", "coldfusion", "javascript", "asp", "ruby"]
    });

    //alert($(window).width());
    // Create command list 
    $.each(commands, function(index) {
        var command = $('<li>').append($('<a>').attr({'data-command': index, 'href': '#'}).text(index));
        $('#faces ul').append(command);
    });

    $('#faces a').on('click', function() {
        var command = $(this).data('command'); 
        commands['reset'].call();
        commands[command].call();
        return false;
    });

    // approached
    $('#approached').click(function() {
        socket.emit('approach_trigger', { message: 'true' });
        return false;
    });

    // welcome message
    $('#message').click(function() {
        socket.emit('welcome_trigger', { message: 'true' });
        return false;
    });

    $('#another_message').click(function() {
        socket.emit('another_message', { message: 'true' });
        return false;
    });

    // submit any message
    $('#submitmessage').submit(function() {
        var value = $(this).find('#text').val();
        socket.emit('send_message', {message: value});
        socket.emit('output', {message: value});
        $(this).find('#text').val('');
        return false;
    });

    // options
    $('#prompt .options a').click(function() {
        //box.show();
        /* expand box */
        // hide options
        $(this).parent().parent().fadeOut(200, function() {
            $('#container').css({
                position: 'absolute',
                top: '0px',
                height: '1000px'
            });
            $('#prompt').css({
                position: 'absolute',
                bottom: '60px',
                width: '900px'
            })
            .animate({
                height: '800px'
                //top: '10px'
            }, 1000, function() {
                $('#display').fadeIn(300);
            });
        });
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

window.onload = (function(){

});
