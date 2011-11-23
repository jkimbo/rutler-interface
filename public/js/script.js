var socket = io.connect();

socket.on('connect', function() {
    console.log('Connected');
});

socket.on('message', function(data) {
    //var something = $.parseJSON(data.message.replace('\n',''));
    //console.log(something);
    $('#messagelist').append($('<li>').text(data.message));
});

socket.on('narrate', function(data) {
	var words = data.message.replace(/ /g, " </span><span>");
	$("#port").html('<span>'+words+'</span>');
	
	var alerts = $("#port span").animate({ opacity: 0 }, 0);

	var currentAlert = 0;
   	function nextAlert() {
      	alerts.eq(currentAlert).animate({ opacity: 1, fontSize: "200%" }, 400, nextAlert); 
      	++currentAlert;
   	}
   	nextAlert();/**/
});

$(document).ready(function() {
    /*
     * Wolfram Alpha
     */
    $('#wolfram').click(function() {
        var id = '3H76V5-8VKAX7RHXE'; 
        $.ajax({
            type: "GET",
            url: "http://api.wolframalpha.com/v2/query",
            data: {
                input:"h2o",
                format:"html",
                appid:id
            },
            success: function(data) {
                var xmlDoc = $.parseXML(data);
                var pod = $(xmlDoc).find("pod");
                pod.each(function(index) {
                    console.log(index+': '+$(this));
                });
            }
        });
        return false;
    });
});
