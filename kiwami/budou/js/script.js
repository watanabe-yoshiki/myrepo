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

if (window.matchMedia( "(max-width: 767px)" ).matches) {
  /* review */
  $(function(){
    $('.review ul').slick({
      arrows: true,
      infinite: false,
      slidesToShow: 1,
     dots: true,
    });
  });
}