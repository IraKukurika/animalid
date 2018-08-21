$(document).ready(function () {
    $(document).scroll(function () {
        if (document.body.scrollTop > 200 || document.documentElement.scrollTop > 200) {
            $('#btnUp').css('display', "block");
        } else {
            $('#btnUp').css('display', "none");
        }
    });

    $('#btnUp').on('click', function () {
        $('html,body').animate({ scrollTop: 0 }, 'slow');
    });
});
