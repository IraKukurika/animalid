$(document).ready(function() {
    $(".navbar-nav").on("click","a", function (event) {
        event.preventDefault();
        let id  = $(this).attr('href'),
            top = $(id).offset().top;

        if ($(window).width() < 992) {
            $('body,html').animate({scrollTop: top - 130}, 1500);
        } else {
            $('body,html').animate({scrollTop: top - 147}, 1500);
        }

        if ($('.navbar-collapse').hasClass('show')) {
            $('.navbar-collapse').removeClass('show');
            $(".navbar-toggler").addClass('collapsed');
        }
    });
});