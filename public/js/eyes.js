var windowX = -1;
var windowY = -1;
$(document).ready(function() {
	var canvas = $("debugCanvas");
	canvas.width = document.width;
	canvas.height = document.height;
	$(document).mousemove(function(e) {
		var mousePosition = {
			'x' : e.pageX,
			'y' : e.pageY
		};
		$(".eyeContainer").each(function(i, i2) {
			var eyeContainerPosition = $(this).offset();
			var eyePosition = {
				'x' : eyeContainerPosition.left + $(this).width() / 2 +1,
				'y' : eyeContainerPosition.top + $(this).height() / 2 +1
			}
			var slope = getSlope(eyePosition, mousePosition);
			var toCenterdistance = getDistance(eyePosition, mousePosition);
			var targetDistance = toCenterdistance - ($(this).width() / 2);
			if(toCenterdistance > ($(this).width() / 2)) {
				var x = Math.cos(Math.atan(slope)) * targetDistance;
				if(eyePosition.x > mousePosition.x) {
					x += mousePosition.x;
				} else if(eyePosition.x < mousePosition.x) {
					x = -x + mousePosition.x;
				}
				var y = Math.sin(Math.atan(slope)) * targetDistance;
				if(eyePosition.x > mousePosition.x) {
					y += mousePosition.y;
				} else if(eyePosition.x < mousePosition.x) {
					y = -y + mousePosition.y;
				}
				x -= $(this).height() / 2;
				y -= $(this).height() / 2;
			} else {
				x = mousePosition.x - ($(this).width() / 2);
				y = mousePosition.y - ($(this).width() / 2);
			}
			var element=$("#eyeBall_" + $(this).attr("rel"));
			element.css({
				'left' : x + 'px',
				'top' : y + 'px',
			});
		});
	})
});
function getSlope(loc1, loc2) {
	return (loc1.y - loc2.y) / (loc1.x - loc2.x);
}
function getDistance(loc1, loc2) {
	return Math.sqrt(Math.pow((loc1.x - loc2.x), 2) + Math.pow((loc1.y - loc2.y), 2));
}
