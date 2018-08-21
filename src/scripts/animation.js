$(document).ready(function() {

    $(window).scroll( function(){

        $('.goal-item').each( function(){

            let bottom_of_object = getPosition(this).y + $(this).outerHeight();
            let bottom_of_window = $(window).scrollTop() + $(window).height() + 300;

            if( bottom_of_window >= bottom_of_object ){
                $(this).addClass('animated fadeInUp');
            }

        });
    });

    function getPosition(element) {
        let xPosition = 0;
        let yPosition = 0;

        while(element) {
            xPosition += (element.offsetLeft - element.scrollLeft + element.clientLeft);
            yPosition += (element.offsetTop - element.scrollTop + element.clientTop);
            element = element.offsetParent;
        }
        return { x: xPosition, y: yPosition };
    }
});