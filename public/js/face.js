/*
 * Face database
 *
 * Eyebrows
 * Eyes
 * Mouth
 */

/* 
 * Commands
 */
var commands = {
    reset: function() { // sets face to default
        mouth.default();
        eye.default();
        eyebrow.default();
    },
    look: function() {
        mouth.look();
    },
    query: function() {
        mouth.small();
        eyebrow['tilt-left'].apply(eyebrow.left);
        eyebrow['up'].apply(eyebrow.left);
    },
    acknowledge: function() {
        mouth.smileopen();    
        eyebrow['tilt-left'].call(eyebrow.left, 13);
        eyebrow['tilt-right'].call(eyebrow.right, 13);
    },
    approach: function() {
        mouth.smileopen();    
        eyebrow['tilt-left'].call(eyebrow.left, 13);
        eyebrow['tilt-right'].call(eyebrow.right, 13);
    },
    happy: function() {
        mouth.smile();   
        eyebrow['tilt-left'].apply(eyebrow.left);
        eyebrow['tilt-right'].apply(eyebrow.right);
    },
    sad: function() {
        mouth.sad();   
    },
    open: function() {
        mouth.open();   
    },
    wink: function() {
        mouth.smile();
        eye['close'].apply(eye.right); // apply close function to right eye
        eyebrow['tilt-left'].call(eyebrow.right, 5);
        eyebrow['tilt-right'].call(eyebrow.left, 5);
    },
    "laughing": function() {
        mouth.smileopen();
        eye['close'].apply(eye.left); 
        eye['close'].apply(eye.right);
        eyebrow['tilt-left'].apply(eyebrow.left);
        eyebrow['tilt-right'].apply(eyebrow.right);
    }
}

/* 
 * Methods:
 */
var eyebrow = {
    default: function() {
        $('.eyeBrow').each(function(index) {
            $(this).removeClass().addClass('eyeBrow').css({
                '-webkit-transform': 'rotate(0deg)'
            });
        });
    },
    up: function() {
        $(this).addClass('up');
    },
    'tilt-left': function(deg) {
        if(deg == undefined) deg = 17;
        $(this).css({
            '-webkit-transform': 'rotate(-'+deg+'deg)'
        });
    },
    'tilt-right': function(deg) {
        if(deg == undefined) deg = 17;
        $(this).css({
            '-webkit-transform': 'rotate('+deg+'deg)'
        });
    },
    down: ''
}

var eye = {
    default: function() {
        $('.eyeContainer').each(function(index) {
            $(this).removeClass().addClass('eyeContainer');
        });
        $('.eyeBall').each(function(index) {
            $(this).removeClass().addClass('eyeBall').show();
        });
    },
    close: function() {
        $(this).addClass('close');
        $('#eyeBall_'+$(this).attr('rel')).hide();
    },
    crazy: ''
}

var mouth = {
    default: function() {
        // set defualts
        $(this.element).removeClass();
    },
    look: function() {
        $(this.element).addClass('look');    
    },
    small: function() {
        $(this.element).addClass('small');    
    },
    smile: function() {
        $(this.element).addClass('smile');    
    },
    open: function() {
        $(this.element).addClass('open');    
    },
    smileopen: function() {
        $(this.element).addClass('smileopen');    
    },
    sad: function() {
        $(this.element).addClass('sad');    
    },
    dizzy: function() {

    }
}
