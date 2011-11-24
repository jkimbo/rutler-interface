
var windowX = -1;
var windowY = -1;

$(document).ready(function() {
	var canvas = $("debugCanvas"); // not sure this is needed
	canvas.width = document.width;
	canvas.height = document.height;
    var eyeDistanceApart;
    var leftEyeCenter;
    var rightEyeCenter;
    var leftEye = $('#eyeBall_1');
    var rightEye = $('#eyeBall_2');

	$(document).mousemove(function(e) { // on mousemove
		var mousePosition = {
			'x' : e.pageX,
			'y' : e.pageY
		};

		$(".eyeContainer").each(function(i, i2) { // for each eyecontainer
			var eyeContainerPosition = $(this).offset(); // position relative to document
			var eye = $("#eyeBall_" + $(this).attr("rel"));
            var centerEyeContainerX = eyeContainerPosition.left + ($(this).width()/2) - (eye.width()/2) +1;
            var centerEyeContainerY = eyeContainerPosition.top + ($(this).height()/2) - (eye.height()/2);
			var eyePosition = {
				'x' : centerEyeContainerX, // initial eye position
				'y' : centerEyeContainerY 			
            }
            var slope = getSlope(eyePosition, mousePosition);
            var distanceX = eyePosition.x - mousePosition.x + (eye.width()/2);
            var distanceY = eyePosition.y - mousePosition.y + (eye.height()/2);
            var toCenterdistance = Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2));
            var targetDistance = toCenterdistance - ($(this).width() / 2); // target distance over eye width
            if(toCenterdistance > ($(this).width() / 2)) {
                var x = Math.cos(Math.atan(slope)) * targetDistance;
                if(eyePosition.x > mousePosition.x) {
                    x += mousePosition.x;
                } else if(eyePosition.x < mousePosition.x) {
                    x = -x + mousePosition.x;
                }
                x -= eye.width()/2 +1;

                var y = Math.sin(Math.atan(slope)) * targetDistance;
                if(eyePosition.x > mousePosition.x) {
                    y += mousePosition.y;
                } else if(eyePosition.x < mousePosition.x) {
                    y = -y + mousePosition.y;
                }
                y -= eye.height()/2 +1;
            } else {
                x = mousePosition.x - (eye.width()/2); 
                y = mousePosition.y - (eye.height()/2);
            }

            if($(this).attr("rel") == 1) { // left eye
                leftEyeCenter = centerEyeContainerX;
                //var rightEyeContainer = $(this).next();
                //var rightEyeContainerX = rightEyeContainer.offset().left + (rightEyeContainer.width()/2) - ($('#eyeBall_2').width()/2) +1;
                //var eyeDistance = rightEyeContainerX - centerEyeContainerX;
                //if(x > centerEyeContainerX && targetDistance+$(this).width()/2 < eyeDistance) {
                    //x = centerEyeContainerX;
                //}
            } else if ($(this).attr("rel") == 2) { // right eye
                rightEyeCenter = centerEyeContainerX;
                //var leftEyeContainer = $(this).prev();
                //var leftEyeContainerX = leftEyeContainer.offset().left + (leftEyeContainer.width()/2) - ($('#eyeBall_1').width()/2) +1;
                //var eyeDistance = leftEyeContainerX - centerEyeContainerX;
                //console.log(targetDistance+$(this).width()/2, Math.abs(eyeDistance));
                //if(x < centerEyeContainerX && targetDistance+$(this).width()/2 < Math.abs(eyeDistance)) {
                    //x = centerEyeContainerX;
                //}
            }

			eye.css({
				'left' : x + 'px',
				'top' : y + 'px',
			}).show();
		});

        eyeDistanceApart = rightEyeCenter - leftEyeCenter -2;
        $('.eyeContainer').each(function(i, i) {
            if(mousePosition.x > rightEyeCenter) { // if current mouse location is to the right
                if(rightEye.offset().left - leftEye.offset().left < eyeDistanceApart) {
                    leftEye.css('left', rightEye.offset().left - eyeDistanceApart);
                }
                leftEye.css('top', rightEye.css('top'));
            } else if(mousePosition.x < rightEyeCenter && mousePosition.x > leftEyeCenter) { // in between eyes
                leftEye.css('left', leftEyeCenter);
                rightEye.css('left', rightEyeCenter);
                if(mousePosition.y < $(this).offset().top-leftEye.height()/2) {
                    leftEye.css('top', $(this).offset().top-leftEye.height()/2);
                    rightEye.css('top', $(this).offset().top-rightEye.height()/2);
                } else if(mousePosition.y > $(this).offset().top && mousePosition.y < $(this).offset().top + $(this).height()) {
                    leftEye.css('top', mousePosition.y);
                    rightEye.css('top', mousePosition.y);
                } else if(mousePosition.y > $(this).offset().top + $(this).height()) {
                    leftEye.css('top', $(this).offset().top + $(this).height() - leftEye.height()/2);
                    rightEye.css('top', $(this).offset().top + $(this).height() - rightEye.height()/2);
                } else {
                    leftEye.css('top', mousePosition.y);
                    rightEye.css('top', mousePosition.y);
                }
            } else if(mousePosition.x < leftEyeCenter) { // to the left
                if(rightEye.offset().left - leftEye.offset().left < eyeDistanceApart) {
                    rightEye.css('left', leftEye.offset().left + eyeDistanceApart);
                }
                rightEye.css('top', leftEye.css('top'));
            }
        });
	})
});

function getSlope(loc1, loc2) {
	return (loc1.y - loc2.y) / (loc1.x - loc2.x);
}

function getDistance(loc1, loc2) {
	return Math.sqrt(Math.pow((loc1.x - loc2.x), 2) + Math.pow((loc1.y - loc2.y), 2));
}
