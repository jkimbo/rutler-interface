/*
 * Face database
 *
 * Eyebrows
 * Eyes
 * Mouth
 */


/* 
 * Methods:
 */
var eye = {
    open: '',
    close: '',
    crazy: ''
}

var eyebrow = {
    normal: '',
    up: '',
    'tilt-left': '',
    'tilt-right': '',
    down: ''
}

var mouth = {
    defualt: function(callback) {
        // set defualts
        $(this).css({
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
        if(typeof(callback) == 'function') {
            callback();
        }
    },
    look: function() {
        $(this).width('200px');    
    },
    small: function() {
        $(this).width('80px');    
    },
    smile: function() {
        $(this).css({
            'border-top-right-radius': '0px',
            'border-top-left-radius': '0px',
            'border-bottom-right-radius': '500px',
            'border-bottom-left-radius': '500px',
            'border-top': 'none',
            'width': '200px',
            'height': '100px'
        });    
    },
    open: function() {
        $(this).css({
            'border-radius': '200px',
            'height': '100px',
            'width': '100px'
        });    
    },
    smileopen: function() {
        $(this).css({
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
