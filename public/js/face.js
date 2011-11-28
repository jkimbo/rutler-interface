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
    look: function() {
        $(this).height(0).width('200px');    
    },
    small: function() {
        $(this).width('80px');    
    },
    smile: function() {
        $(this).height(80);    
    },
    open: function() {
        $(this).height(100).width(100).css({
            'border-radius': '200px'
        });    
    },
    sad: function() {
        
    },
    dizzy: function() {

    }
}
