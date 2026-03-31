$(function() {
  $('body').not('#top').fadeIn(1000);

  //matchHeight
  $('.match').matchHeight();

  //pagetop
  $('a[href^="#"]').not('.noscroll').click(function(){
    var speed = 500;
    var href= $(this).attr("href");
    var target = $(href === "#" || href === "" ? 'html' : href);
//    if(navigator.userAgent.match(/(iPhone|iPod|Android)/)){
//      var position = target.offset().top - 90;
//    } else {
//      var position = target.offset().top;
//    }
    if (window.matchMedia('(max-width: 1000px)').matches) {
      var position = target.offset().top - 90;
    } else {
      var position = target.offset().top - 40;
    }
    $("html, body").animate({scrollTop:position}, speed, "swing");
    return false;
  });

  
	// スムーススクロール
	var headerHeight = $('.header-nav .logo').outerHeight();
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

});