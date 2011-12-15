var states = {
    'looking': {
        init: function() {
            console.log('looking');
            $('#container').scrollTo($('#talkingBox'), 600);
            commands['apply'].call(this, 'happy');
        },
        to: ['approached'],
        from: ['approached']
    },
    'approached': {
        init: function() {
            commands['apply'].call(this, 'approach');
            $('#options').fadeIn(400);
            if(states['speechRecog'].tries >= 3) {
                stateMachine.goTo('displayLocationInput');
            }
        },
        to: ['confirmLocation', 'promptOptions', 'speechRecog', 'displayLocationInput'],
        from: ['looking', 'speechRecog']
    },
    'speechRecog': {
        init: function(content) {
            states['speechRecog'].tries += 1; 
            var left = $(window).width()/2 - 475;
            $('#popup').find('.speechRecog #content').text(content);
            $('#popup .speechRecog').show();
            $('#popup').css({
                left: left
            }).fadeIn(300);  
            commands['apply'].call(this, 'query');
        },
        leaveState: function() {
            $('#popup').fadeOut(200);
            $('#popup .speechRecog').hide();
            $('#popup .floorConfirm').hide();
        },
        tries: 0,
        to: ['moving', 'approached', 'promptOptions'],
        from: ['approached', 'speechRecog']
    },
    'promptOptions': {
        init: function() {
            $('#container').scrollTo($('#prompt'), 600);
        },
        to: ['displayLocationInput', 'displayNews'],
        from: ['approached','speechRecog']
    },
    'displayLocationInput': {
        init: function() {
            console.log('displayLocationInput');
            $('#container').scrollTo($('#prompt'), 0);
            box.show('locationInput'); 
        },
        to: ['sendLocation', 'promptOptions'],
        from: ['promptOptions', 'approached']
    },
    'sendLocation': {
        init: function(location) {
            console.log('sending location...');
            socket.emit('moveto', { message: location });
            stateMachine.goal = location;
            stateMachine.goTo('moving');
        },
        to: ['moving'],
        from: ['displayLocationInput', 'speechRecog']
    },
    'moving': {
        init: function() {
            states['speechRecog'].tries = 0;
            box.hide(function() {
                talking.talk('Ok lets go!'); // get rid of this TODO       
            });
            commands['apply'].call(this, 'happy');
        },
        to: ['lift', 'finish'],
        from: ['displayLocationInput', 'sendLocation', 'confirmLocation', 'speechRecog', 'lift']
    },
    'lift': {
        init: function() {
            // lift music!
            talking.talk('<img src="/img/music.png"/><img src="/img/music.png"/><img src="/img/music.png"/><img src="/img/music.png"/><img src="/img/music.png"/><img src="/img/music.png"/><img src="/img/music.png"/><img src="/img/music.png"/>', function() {
                $('#popup').find('.floorConfirm #floor').text(stateMachine.goal);            
                $('#popup .floorConfirm').show();
                var left = $(window).width()/2 - 475;
                $('#popup').css({
                    left: left
                }).fadeIn(300);  
                commands['apply'].call(this, 'query');
            }, true);
        },
        leaveState: function() {
            $('#popup').fadeOut(200);
        },
        to: ['moving'],
        from: ['moving']
    },
    'finish': {
        init: function() {
            // fanfare
            commands['apply'].call(this, 'laughing');
            talking.talk('We are here!'); // get rid of this TODO       
        },
        to: ['moving', 'approach'],
        from: ['moving']
    }
}

var stateMachine = {
    current: '',
    init: function(state) {
        if(!states[state]) {
            console.log('Not recognised state');
        } else {
            this.current = state;
            states[state].init();
        }
    },
    goTo: function(state, data) {
        if($.inArray(this.current, states[state].from) == -1) {
            console.log("Hmmm you don't seem to be coming from the right place");
        } else if($.inArray(state, states[this.current].to) == -1) { // not found
            console.log("Hmmm you don't seem to be going to the right place");
        } else {
            if(states[this.current].leaveState) {
                states[this.current].leaveState();
            }
            this.current = state;
            states[state].init(data);
        }
    },
    goal: ''
}

/*
 * Display box
 */
var box = {
    element: $('#box'),
    show: function(view) {
        $('.options').fadeOut(200, function() {
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
                box[view].apply();
            });
        });
    },
    hide: function(callback) {
        $('#prompt').fadeOut(1000, function() {
            $('#container').css({
                position: 'relative',
                height: '400px'
            });
            $('#container').scrollTo($('#talkingBox'), 600);
            if(typeof(callback) == 'function') {
                callback();
            }
        });
    },
    locationInput: function() {
        $('#display .locationSubmit').fadeIn(300, function() {
            $('#display #submitLocation input').focus(); 
        });
    },
    imperialNews: function() {

    }
}
