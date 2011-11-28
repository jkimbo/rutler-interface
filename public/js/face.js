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
    "reset": function() { // sets face to default
        mouth.default();
        eye.default();
    },
    "look": function() {
        mouth.look();
    },
    "query": function() {
        mouth.small();
    },
    "acknowledge": function() {
        mouth.smileopen();    
    },
    "happy": function() {
        mouth.smile();   
    },
    "sad": function() {
        mouth.sad();   
    },
    "open": function() {
        mouth.open();   
    },
    "wink": function() {
        mouth.smile();
        eye['close'].apply(eye.right); // apply close function to right eye
    },
    "laughing": function() {
        mouth.smileopen();
        eye['close'].apply(eye.left); 
        eye['close'].apply(eye.right);
    }
}

/* 
 * Methods:
 */
var eye = {
    default: function() {
        $('.eyeContainer').each(function(index) {
            $(this).css({
                'border': '1px solid black',
                'width': '200px',
                'height': '200px',
                'border-radius': '200px',
                'float': 'left',
                'margin-top': '16px',
                'margin-left': '130px',
                'background': 'none'
            });
        });
        $('.eyeBall').each(function(index) {
            $(this).css({
                'border': '1px solid black',
                'background': 'black',
                'width': '20px',
                'height': '20px',
                'border-radius': '60px',
                'float': 'left',
                'position': 'absolute'
            }).show();
        });
    },
    close: function() {
        $(this).css({
            'height': '1px',
            'margin-top': '100px',
            'background': 'black'
        });
        $('#eyeBall_'+$(this).attr('rel')).hide();
    },
    crazy: ''
}

var eyebrow = {
    normal: function() {

    },
    up: '',
    'tilt-left': '',
    'tilt-right': '',
    down: ''
}

var mouth = {
    default: function() {
        // set defualts
        $(this.element).css({
            'border': '1px solid #000',
            'height': '0px',
            'width': '200px',
            /*-webkit-border-bottom-right-radius: 500px;*/
            /*-webkit-border-bottom-left-radius: 500px;*/
            /*-moz-border-radius-bottomright: 500px;*/
            /*-moz-border-radius-bottomleft: 500px;*/
            'border-bottom-right-radius': '500px',
            'border-bottom-left-radius': '500px',
            'bottom': '10px',
            'left': '295px'
        });
    },
    look: function() {
        $(this.element).width('200px');    
    },
    small: function() {
        $(this.element).width('80px');    
    },
    smile: function() {
        $(this.element).css({
            'border-top-right-radius': '0px',
            'border-top-left-radius': '0px',
            'border-bottom-right-radius': '500px',
            'border-bottom-left-radius': '500px',
            'border-top': 'none',
            'width': '150px',
            'height': '80px'
        });    
    },
    open: function() {
        $(this.element).css({
            'border-radius': '200px',
            'height': '100px',
            'width': '100px'
        });    
    },
    smileopen: function() {
        $(this.element).css({
            'border-top-right-radius': '0px',
            'border-top-left-radius': '0px',
            'border-bottom-right-radius': '500px',
            'border-bottom-left-radius': '500px',
            'width': '200px',
            'height': '100px'
        });    
    },
    sad: function() {
        
    },
    dizzy: function() {

    }
}
