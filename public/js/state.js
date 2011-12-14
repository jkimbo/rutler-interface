var states = {
    'looking': {
        init: function() {
            console.log('looking');
            $('#container').scrollTo($('#talkingBox'), 600);
            commands['look'].apply();
        },
        to: ['approached'],
        from: ['approached']
    },
    'approached': {
        init: function() {
            commands['approach'].apply();
        },
        to: ['confirmLocation', 'promptOptions'],
        from: ['looking']
    },
    'promptOptions': {
        init: function() {
            $('#container').scrollTo($('#prompt'), 600);
        },
        to: [],
        from: ['approached']
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
