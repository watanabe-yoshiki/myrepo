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


if (window.matchMedia( "(max-width: 600px)" ).matches) {
$(function(){
  $('.ranking ul').slick({
    autoplay: true,
    autoplaySpeed: 0,
    speed: 5000,
    cssEase: "linear",
    slidesToShow: 4,
    swipe: false,
    arrows: false,
    pauseOnFocus: false,
    pauseOnHover: false,
    responsive: [
      {
        breakpoint: 1000,
        settings: {
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2.2,
        }
      }
    ]
  });
});
}

if (window.matchMedia( "(max-width: 600px)" ).matches) {
$(function(){
  $('.category ul').slick({
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
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2.2,
        }
      }
    ]
  });
});
}

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
location.reload();
}
prewidth = nowWidth;
}, 200);
});
});