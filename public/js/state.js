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
            $('#popup').fadeOut(200);
            commands['apply'].call(this, 'approach');
        },
        to: ['confirmLocation', 'promptOptions', 'speechRecog'],
        from: ['looking']
    },
    'speechRecog': {
        init: function(content) {
            console.log(content);
            var left = $(window).width()/2 - 150;
            var top = $(window).height()/2 - 100;
            $('#popup').css({
                left: left,
                top: top
            }).html('I heard: '+content+' Was that correct?').fadeIn(300);  
        },
        to: ['moving', 'approached'],
        from: ['approached', 'speechRecog']
    },
    'promptOptions': {
        init: function() {
            $('#container').scrollTo($('#prompt'), 600);
        },
        to: ['displayLocationInput', 'displayNews'],
        from: ['approached']
    },
    'displayLocationInput': {
        init: function() {
            console.log('displayLocationInput');
            box.show('locationInput'); 
        },
        to: ['moving', 'promptOptions'],
        from: ['promptOptions', 'approached']
    },
    'moving': {
        init: function() {
            console.log('moving');
            box.hide();
            commands['apply'].call(this, 'happy');
        },
        to: ['lift', 'finish'],
        from: ['displayLocationInput', 'confirmLocation']
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
