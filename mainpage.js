$(function() {
    // Language initialization
    $('#lang-sel-zh').click(function() {
        $('#lang-sel').text('中文');
        $('title').text("徐际飞的个人主页");
        $('span.lang-zh').show();
        $('span.lang-en').hide();
    });

    $('#lang-sel-en').click(function() {
        $('#lang-sel').text('English');
        $('title').text("Xthoa's homepage");
        $('span.lang-en').show();
        $('span.lang-zh').hide();
    });

    $('span.lang-en').show();
    $('span.lang-zh').hide();

    // Add cards onto the page
    // extract info from json file
    function langspan(lang, text) {
        return '<span class="lang-' + lang + '">' + text + '</span>';
    }

    function makelangspans(langs, texts) {
        let str = '';
        for (let i = 0; i < langs.length; i++) {
            const lang = langs[i];
            const text = typeof(texts) == 'string' ? texts : texts[i];
            str += langspan(lang, text);
        }
        return str;
    }

    function checkElement(parent, id, creation) {
        var ele = document.getElementById(id);
        if (ele == null) {
            $('#' + parent).append(creation(id));
            ele = document.getElementById(id);
        }
        return ele;
    }
    $.getJSON('cards.json', data => {
        let langs = data.lang;
        data.sections.forEach(ele => {
            checkElement('maincol', ele.id, (id) => {
                return '<div id="' + id + '"><h3></h3></div>';
            });
            $('#' + ele.id + ' h3').append(makelangspans(langs, ele.text));

            ele.sub.forEach(sub => {
                let sid = ele.id + '-' + sub.id;
                checkElement(ele.id, sid, (id) => {
                    return '<div id="' + sid + '"><h4></h4></div>';
                });
                $('#' + sid + ' h4').append(makelangspans(langs, sub.text));

                sub.cards.forEach(card => {
                    let cid = sid + '-' + card.id;
                    checkElement(sid, cid, (id) => {
                        let b0 = '<div class="card" id="' + cid + '">\
                        <div class="card-header"></div>\
                        <div class="card-body"><p></p>\
                        <a class="btn border-dark" href="' + card.link + '">';
                        let b2 = '</a>';
                        if (card.style == "project") {
                            b2 = '<span class="lang-en">Go to project page</span>\
                            <span class="lang-zh">跳转到项目页</span>' + b2;
                        } else {
                            let caid = cid + '-art';
                            b2 = '<span class="lang-en">Download</span>\
                            <span class="lang-zh">下载</span>' + b2;
                            /*
                            b2 += '<div class="btn border-dark" data-bs-toggle="collapse" data-bs-target="#' + caid + '">\
                            <span class="lang-en">Show/Hide preview</span>\
                            <span class="lang-zh">显示/隐藏文档预览</span></div><br>\
                            <iframe style="margin-top: 1em;" class="collapse" id="' + caid + '" src="' + card.link + '" width="100%" height="600px" />'
                            */
                        }
                        let b1 = '</div></div>';
                        return b0 + b2 + b1;
                    });
                    $('#' + cid + ' .card-header').append(makelangspans(langs, card.title));
                    $('#' + cid + ' .card-body p').append(makelangspans(langs, card.desc));
                });
            });
        });

        $('span.lang-en').show();
        $('span.lang-zh').hide();

    });
});