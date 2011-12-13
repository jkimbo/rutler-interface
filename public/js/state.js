var states = {
    'looking': {
        init: function() {
            console.log('initialise looking');
            $('#container').scrollTo($('#talkingBox'), 600);
        },
        to: ['approached'],
        from: ['approached']
    },
    'approached': {
        init: function() {
            console.log('initialise approached');
            $('#container').scrollTo($('#prompt'), 600);
        },
        to: ['confirmLocation', 'promptOptions'],
        from: ['looking']
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
    goTo: function(state) {
        if($.inArray(this.current, states[state].from) == -1) {
            console.log("Hmmm you don't seem to be coming from the right place");
        } else if($.inArray(state, states[this.current].to) == -1) { // not found
            console.log("Hmmm you don't seem to be going to the right place");
        } else {
            this.current = state;
            states[state].init();
        }
    }
}
