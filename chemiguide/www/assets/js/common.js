/*============================================================
 * body要素に、ユーザーのOS・デバイスとブラウザを判定してクラスとして付与する
 * OS・デバイス: iphone, ipad, android, androidphone, androidtablet, windows, mac
 * ブラウザ: edge, chrome, firefox, safari
 * @function
 * @name addDeviceBrowserClasses
 * @returns {void}
 ============================================================*/
document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const ua = window.navigator.userAgent.toLowerCase(),
        isIOS = /iphone|ipad|ipod/.test(ua),
        isMac = /macintosh|mac os x/.test(ua),
        isAndroid = /android/.test(ua),
        isWindows = /windows/.test(ua),
        isEdge = /edg/.test(ua),
        isChrome = /chrome|crios/.test(ua),
        isFirefox = /firefox/.test(ua),
        isSafari = /safari/.test(ua);

    let classArr = [];

    // プラットフォーム判定
    if (isIOS) {
        if (/iphone/.test(ua)) {
            classArr.push('iphone');
        } else if (/ipad/.test(ua)) {
            classArr.push('ipad');
        }
    } else if (isMac && 'ontouchend' in document) {
        classArr.push('ipad');
    } else if (isAndroid) {
        classArr.push('android');

        if (/mobile/.test(ua)) {
            classArr.push('androidphone');
        } else if (/tablet/.test(ua)) {
            classArr.push('androidtablet');
        }
    } else if (isWindows) {
        classArr.push('windows');
    } else if (isMac) {
        classArr.push('mac');
    }

    // ブラウザ判定
    if (isEdge) {
        classArr.push('edge');
    } else if (isChrome) {
        classArr.push('chrome');
    } else if (isFirefox) {
        classArr.push('firefox');
    } else if (isSafari) {
        classArr.push('safari');
    }

    document.body.classList.add(...classArr);
});

/*============================================================
 * スムーススクロールを初期化し、指定されたトリガー要素がクリックされたときにスクロールを実行します。
 * @function
 * @name initSmoothScroll
 * @returns {void}
 ============================================================*/
document.addEventListener('DOMContentLoaded', function () {
    'use strict';

    const trigger = document.querySelectorAll('a[href^="#"]'); //トリガー要素

    for (let i = 0; i < trigger.length; i++) {
        trigger[i].addEventListener('click', function (e) {
            e.preventDefault();

            const href = this.getAttribute('href'); // href値
            let scrollPos; //スムーススクロールする位置

            if (href === '#') {
                scrollPos = 0;
            } else {
                const target = document.getElementById(href.replace('#', '')); // ターゲット要素
                if (target == null) return;
                const targetY = target.getBoundingClientRect().top, // ターゲット要素の垂直位置
                    currentY = window.pageYOffset, // スクロール量
                    gap =
                        document.getElementsByTagName('header')[0].offsetHeight; // 固定ヘッダーの高さ

                scrollPos = targetY + currentY - gap;
            }

            window.scrollTo({
                top: scrollPos,
                behavior: 'smooth'
            });
        });
    }
});

/*============================================================
 * PageTop
 ============================================================*/
document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const pageTop = document.querySelector('.js-pagetop'); //ページトップボタン
    const showClass = 'is-show'; //閾値を超えたタイミングで付与するクラス

    if (!pageTop) return;

    //発火の閾値を調整するための要素を追加
    document.body.insertAdjacentHTML(
        'afterbegin',
        '<div class="js-pagetop-threshold"></div>'
    );

    // Intersection Observerのインスタンス生成
    const observer = new IntersectionObserver(callback);

    // callback
    function callback(entries) {
        if (entries[0].isIntersecting) {
            pageTop.classList.remove(showClass);
        } else {
            pageTop.classList.add(showClass);
        }
    }

    // 対象を監視
    const thresholdElm = document.querySelector('.js-pagetop-threshold');
    observer.observe(thresholdElm);
});


/*============================================================
click_R
============================================================*/
$(function () {
    $('.click_R').on('click', function (e) {
        var linkmode = true;
        var classnames = e.target.className;
        var classcount = classnames.search(/stop/);

        if (classcount == -1) {
            e.stopPropagation();
            var target = e.target;
            $target = $(target);

            if ($(target).parent('.stopClick').length > 0) {
                return false;
            }

            if ($(target).parent('.stopc').length > 0) {
                linkmode = false;
            }

            var t2 = $target.attr('href');
            var t2_linktarget = $target.attr('target');

            var t1 = $target
                .parents('.click_R')
                .find('.click_R_link')
                .attr('href');
            var t1_linktarget = $target
                .parents('.click_R')
                .find('.click_R_link')
                .attr('target');

            if (typeof t1 === 'undefined') {
                var t1 = $target.find('a').attr('href');
                var t1_linktarget = $target.find('a').attr('target');
            }

            if (t2) {
                t1 = t2;
                if (t2_linktarget) {
                    linktarget = t2_linktarget;
                } else {
                    linktarget = '_self';
                }
            } else {
                if (t1_linktarget) {
                    linktarget = t1_linktarget;
                } else {
                    linktarget = '_self';
                }
            }

            if (!$.support.noCloneChecked) {
                var body = document.getElementsByTagName('body')[0];
                var dummyLink = document.createElement('a');
                dummyLink.href = t1;
                body.appendChild(dummyLink);
                dummyLink.target = linktarget;
                dummyLink.click();
                body.removeChild(dummyLink);
            } else {
                window.open(t1, linktarget, '');
            }
        }
    });
});


