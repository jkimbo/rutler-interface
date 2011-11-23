var socket = io.connect("http://localhost");

socket.on('connect', function() {
    console.log('Connected');
});

socket.on('message', function(data) {
    //var something = $.parseJSON(data.message.replace('\n',''));
    //console.log(something);
    $('#messagelist').append($('<li>').text(data.message));
});

$(document).ready(function() {
    $('#login').submit(function() {
        var username = $('#login').find('#username').val();
        var password = $('#login').find('#password').val();
        $.ajax({
            type: "POST",
            url: "https://dougal.union.ic.ac.uk/media/felix/preview/logincheck.php",
            crossDomain: true,
            data: {
                username: username,
                password: password
            },
            xhrFields: {
                withCredentials: true
            },
            error: function(jqXHR, textStatus, errorThrown) {
                console.log(jqXHR, textStatus, errorThrown);
            },
            success: function(data) {
                console.log(data);
            }
        });
        return false;
    });

});
