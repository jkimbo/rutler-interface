var states = {
    'looking': {
        init: function() {
            console.log('looking');
            $('#container').scrollTo($('#talkingBox'), 600);
            commands['apply'].call(this, 'look');
        },
        to: ['approached'],
        from: ['approached']
    },
    'approached': {
        init: function() {
            commands['apply'].call(this, 'approach');
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
            $('#popup').find('#content').text(content);
            $('#popup').css({
                left: left,
                top: top
            }).fadeIn(300);  
        },
        leaveState: function() {
            $('#popup').fadeOut(200);
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
        to: ['moving', 'promptOptions'],
        from: ['promptOptions', 'approached']
    },
    'moving': {
        init: function() {
            states['speechRecog'].tries = 0;
            box.hide();
            commands['apply'].call(this, 'happy');
        },
        to: ['lift', 'finish'],
        from: ['displayLocationInput', 'confirmLocation', 'speechRecog']
    },
    'lift': {
        init: function() {
            // lift music!
        },
        to: ['moving'],
        from: ['moving']
    },
    'finish': {
        init: function() {
            // fanfare
            commands['apply'].call(this, 'happy');
        },
        to: ['moving'],
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
    }
}

/*
 * Display box
 */
var box = {
    element: $('#box'),
    show: function(view) {
        console.log(view);
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
    hide: function() {
        $('#prompt').fadeOut(1000, function() {
            $('#container').css({
                position: 'relative',
                height: '400px'
            });
            $('#container').scrollTo($('#talkingBox'), 600);
        });
    },
    locationInput: function() {
        $('#display .locationSubmit').fadeIn(300);
    },
    imperialNews: function() {

    }
}
