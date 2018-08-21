$(document).ready(function() {

    $('#search-form').on('submit', function (e) {
        e.preventDefault();
        $('#result-search-modal').modal('show');
    });
});