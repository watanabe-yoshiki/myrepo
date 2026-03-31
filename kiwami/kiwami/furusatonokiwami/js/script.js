/* ------------------------------------------------------ */
/* スムーススクロール */
/* ------------------------------------------------------ */
$('a[href^="#"]').click(function () {
  const speed = 600;
  let href = $(this).attr("href");
  let target = $(href == "#" || href == "" ? "html" : href);
  let position = target.offset().top;
  $("body,html").animate({ scrollTop: position }, speed, "swing");
  return false;
});

/* ------------------------------------------------------ */
/* スライダー */
/* ------------------------------------------------------ */

/* SPのみ */
if (window.matchMedia( "(max-width: 767px)" ).matches) {
  /* ranking */
  $(function(){
    $('.ranking_list').slick({
      arrows: true,
      dots: false,
      infinite: false,
      slidesToShow: 2,
    });
  });
}

/* package */
$(function(){
  $('.package_list').slick({
    autoplay: true,
    autoplaySpeed: 0,
    speed: 5000,
    cssEase: "linear",
    slidesToShow: 6,
    swipe: false,
    arrows: false,
    pauseOnFocus: false,
    pauseOnHover: false,
    responsive: [
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 5,
        }
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 2,
        }
      }
    ]
  });
});


/* accordion */

$(function(){
  $('.accordion01').on('click', function(){
    $(this).next('.ac_content01').slideToggle();
    $(this).toggleClass("open");
  });
  // 閉じるボタンをクリックした場合
  $('.ac_content01 .close').on('click', function() {
    $('.accordion01').toggleClass("close").removeClass("open");
    $(this).parents('.ac_content01').slideUp();
  });
});

$(function(){
  $('.accordion02').on('click', function(){
    $(this).next('.ac_content02').slideToggle();
    $(this).toggleClass("open");
  });
  // 閉じるボタンをクリックした場合
  $('.ac_content02 .close').on('click', function() {
    $('.accordion02').toggleClass("close").removeClass("open");
    $(this).parents('.ac_content02').slideUp();
  });
});

$(function(){
  $('.accordion03').on('click', function(){
    $(this).next('.ac_content03').slideToggle();
    $(this).toggleClass("open");
  });
  // 閉じるボタンをクリックした場合
  $('.ac_content03 .close').on('click', function() {
    $('.accordion03').toggleClass("close").removeClass("open");
    $(this).parents('.ac_content03').slideUp();
  });
});

if (window.matchMedia( "(max-width: 600px)" ).matches) {
$(function(){
	$('label').on('click',function() {
		$(this).toggleClass('selected');
		$(this).next().slideToggle();
		$('label').not($(this)).next().slideUp();
		$('label').not($(this)).removeClass('selected');
	});
});
}

/*
$(function(){
var timer = false;
var prewidth = $(window).width();
$(window).resize(function() {
if (timer !== false) {
clearTimeout(timer);
}
timer = setTimeout(function() {
var nowWidth = $(window).width();
if(prewidth !== nowWidth){
// リロード
location.reload();
}
prewidth = nowWidth;
}, 200);
});
});
*/

/* matchHeight */
$(function() {
  $('.js-matchHeight').matchHeight();
});