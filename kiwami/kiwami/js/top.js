//UserAgent
var ua;
var isViewSP = false;
var isAndroid = false;
var SP_BREAK_POINT = 599; // スマホブレイクポイント
var Y;
$(document).ready(function(){
  /**
   * Detect os and browser
   **/
  if ( Detect.sp() ) {
    ua = "SP";
    isViewSP = true;
    $("body").addClass("sp");

    if ( Detect.os() == "ipod" || Detect.os() == "iphone" ) {
      $("body").addClass("iphone");
    } else if ( Detect.os() == "android mobile" ) {
      isAndroid = true;
      $("body").addClass("android");
    }

    if ( Detect.ios() ) {
      $("body").addClass("ios");
    }
  } else if ( Detect.tablet() ) {
    ua = "TABLET";
    $("body").addClass("tablet");
  } else {
    if( window.innerWidth <= SP_BREAK_POINT ){
      isViewSP = true;
    } else {
      isViewSP = false;
    }
    $("body").addClass( Detect.os() ).addClass( Detect.browser() );
  }
});

/* ----------------------------------------
 * intro
 * ------------------------------------- */
//$(function() {
//	$('#top-mv .slider').slick({ autoplay:true, speed:1000, fade:true, arrows:false, });
//});
//

/* ------------------------------------------------------ */
/* matchHeight */
/* ------------------------------------------------------ */
$(window).on("load", function () {
  $('.js-matchHeight').matchHeight();
});

/* ------------------------------------------------------ */
/* NEWSスライダー */
/* ------------------------------------------------------ */
$(function(){
  $('.news-slider').slick({
    autoplay: true,
    autoplaySpeed: 3500,
    arrows: true,
    prevArrow: '',
    nextArrow: '<button type="button" class="slick-next">next ></button>',
  });
});

/* ----------------------------------------
 * リサイズしたらリロード
 * ------------------------------------- */

$(function(){
    var timer = false;
    var prewidth = $(window).width()
    $(window).resize(function() {
        if (timer !== false) {
            clearTimeout(timer);
        };
        timer = setTimeout(function() {
            var nowWidth = $(window).width()
            if(prewidth !== nowWidth){
                location.reload();
            };
            prewidth = nowWidth;
        }, 200);
    });
});

/* ------------------------------------------------------ */
/* アニメーション禁止 */
/* ------------------------------------------------------ */
$(window).on('load', function() {
  $("body").removeClass("preload");
});


/* ------------------------------------------------------ */
/* 表示用アニメーション */
/* ------------------------------------------------------ */
$(function() {
	$('.animation,.fadeup').on('inview', function(event, isInView) {
			if(isInView) {$(this).addClass('animated');}
  });
});


if (window.matchMedia( "(max-width: 768px)" ).matches) {
  /* review */
  $(function(){
    $('.comments ul').slick({
      arrows: true,
      infinite: false,
      slidesToShow: 1,
     dots: true,
    });
  });
}