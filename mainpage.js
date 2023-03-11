$(function() {
    $('#lang-sel-ch').click(function() {
        $('#lang-sel').text('中文');
        $('span.lang-ch').show();
        $('span.lang-en').hide();
    });

    $('#lang-sel-en').click(function() {
        $('#lang-sel').text('English');
        $('span.lang-en').show();
        $('span.lang-ch').hide();
    });

    $('span.lang-en').show();
    $('span.lang-ch').hide();
});