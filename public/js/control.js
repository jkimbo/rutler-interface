$(document).ready(function() {
    if($('#control').length) {
        $('#approach').click(function() {
            socket.emit('approach_trigger', { message: true });
            return false;
        });

        $('#startInput').submit(function() {
            var value = $(this).find('#start').val();
            $(this).find('#start').val('');
            if(!t_on) {
                t_on = true;
                sendStart(value);
            }
            return false;
        });

        $('#goalInput').submit(function() {
            var value = $(this).find('#goal').val();
            stateMachine.goTo('sendLocation', value);
            $(this).find('#goal').val('');
            return false;
        });
    }
});
