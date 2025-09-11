/* ------------------------------------------------------ */
/* include */
/* ------------------------------------------------------ */
function header(){
    $.ajax({
        url: "/n/finance/sougyou/inc/header.html",
        cache: false,
        async: false,
        dataType: 'html',
        success: function(html){
            document.write(html);
        }
    });
}
function footer(){
    $.ajax({
        url: "/n/finance/sougyou/inc/footer.html",
        cache: false,
        async: false,
        dataType: 'html',
        success: function(html){
            document.write(html);
        }
    });
}

/* ------------------------------------------------------ */
/* header */
/* ------------------------------------------------------ */
$(function(){
    $("#header-menu").on("click",function(){
        if(window.innerWidth > 767){
            $(this).toggleClass("active");
            $("#header-menu-pc").fadeToggle(300);
            $("#header-menu-sp").removeAttr("style");
        }else{
            $(this).toggleClass("active");
            $("#header-menu-sp").fadeToggle(300);
            $("#header-menu-pc").removeAttr("style");
        }
    });

    $("#header-menu-pc .header-menu-inner a").on("click",function(){
        $("#header-menu").removeClass("active");
        $("#header-menu-pc").fadeOut(300);
    });

    $("#header-menu-sp .header-menu-box > button").on("click",function(){
        $(this).toggleClass("active");
        $(this).next(".header-menu-link").stop().slideToggle(300);
    });

    $("#header-menu-sp .header-menu-box > a").on("click",function(){
        $("#header-menu").removeClass("active");
        $("#header-menu-sp").fadeOut(300);
    });
});

/* ------------------------------------------------------ */
/* リサイズ後の処理 */
/* ------------------------------------------------------ */
var timer = false;
var prewidth = $(window).width();

$(window).resize(function() {
  if (timer !== false) {
    clearTimeout(timer);
  }
  timer = setTimeout(function() {
    var nowWidth = $(window).width()
    if(prewidth !== nowWidth){
        $("#header-menu").removeClass("active");
        $("#header-menu-pc").fadeOut(0);
        $("#header-menu-sp").fadeOut(0);
        $("#header-menu-sp").removeAttr("style");
        $("#header-menu-pc").removeAttr("style");
    }
    prewidth = nowWidth;
  }, 10);
});

/* ------------------------------------------------------ */
/* parts-floating */
/* ------------------------------------------------------ */
$(function(){
    $(".parts-floating .floating-ttl").on("click",function(){
        $(this).closest(".parts-floating").toggleClass("active");
        $(this).closest(".parts-floating").find(".floating-contents").stop().slideToggle(300);
    });
});

/* ------------------------------------------------------ */
/* 電話番号のリンク */
/* ------------------------------------------------------ */
$(function(){
    var ua = navigator.userAgent.toLowerCase();
    var isMobile = /iphone/.test(ua)||/android(.+)?mobile/.test(ua);
  
    if (!isMobile) {
      $('a[href^="tel:"]').on('click', function(e){
        e.preventDefault();
      });
    }
  });

/* ------------------------------------------------------ */
/* matchHeight */
/* ------------------------------------------------------ */
$(function(){
    $(".matchheight").matchHeight();
});

/* ------------------------------------------------------ */
/* アコーディオン */
/* ------------------------------------------------------ */
$(function(){
    const accordion = $('.js-accordion');
    if (accordion.length > 0) {
        $('.accordion_content').hide();
        $('.accordion_title').on('click', function() {
            $(this).next('.accordion_content').slideToggle('fast');
            $(this).toggleClass('open');
        });
    }
});

/* ------------------------------------------------------ */
/* スムーススクロール */
/* ------------------------------------------------------ */
$(function(){
    var headerHeight = $('#header-sougyou').outerHeight();
    var urlHash = location.hash;
    if(urlHash) {
        $('body,html').stop().scrollTop(0);
        setTimeout(function(){
            var target = $(urlHash);
            var position = target.offset().top - headerHeight;
        $('body,html').stop().animate({scrollTop:position}, 500);
        }, 100);
    }
    $('a[href^="#"]').click(function(){
        var href= $(this).attr("href");
        var target = $(href);
        var position = target.offset().top - headerHeight;
        $('body,html').stop().animate({scrollTop:position}, 500);
        return false;
    });
    $('a[href*="#"]').on('click', function() {
        const scrollSpeed = 400;
        const scrollToTarget = $(this.hash === '#' || '' ? 'html' : this.hash)
        if (!scrollToTarget.length) return;
        const scrollPosition = scrollToTarget.offset().top - headerHeight - 30;
        $('html, body').animate({
            scrollTop: scrollPosition
        }, scrollSpeed, 'swing');
        return false;
    });
    
});