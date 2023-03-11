$(function() {
    $('#lang-sel-ch').click(function() {
        $('#lang-sel').text('中文');
        $('title').text("徐际飞的个人主页");
        $('span.lang-ch').show();
        $('span.lang-en').hide();
    });

    $('#lang-sel-en').click(function() {
        $('#lang-sel').text('English');
        $('title').text("Xthoa's homepage");
        $('span.lang-en').show();
        $('span.lang-ch').hide();
    });

    $('span.lang-en').show();
    $('span.lang-ch').hide();
});