/* ------------------------------------------------------ */
/* ヘッダー */
/* ------------------------------------------------------ */
$(function(){

	/* メニュー アコーディオン */
	var w = $(window).width();
	/* サブメニュー */
	$('.nav-main .has-submenu > a').each(function(){
		var $now_li = $(this).parent('li');
		$(this).on('click',function(){
		
		if($(this).parent('.has-submenu').hasClass('sub-open')){
			$(this).parent('.has-submenu').removeClass('sub-open');
			$(this).next('.submenu').slideUp();
		}else{
			$('.nav-main').find('.has-submenu.sub-open').not($now_li).children('.submenu').slideUp(); /* ほかメニュー閉じる */
			$('.nav-main').find('.has-submenu.sub-open').removeClass('sub-open'); /* ほかメニューopenけす */
			$now_li.toggleClass('sub-open');	/* openつけはずし */
			$(this).next('.submenu').slideToggle();	/* さわったやつスライド */
			return false;
		}
				
		});
	});
	/* ガイド */
	$('.nav-main .guide_nav > a').on('click',function(){
		$(this).parent().toggleClass('guide-open');
		$(this).next('.submenu').slideToggle();
		return false;
	});

	/* spメニュー */
	$(".header-nav .navbar-toggle").on('click',function(){
		$(".header-nav .nav-wrap").stop().slideToggle(300);
		$(this).toggleClass("active");
	});

	/* ページトップ表示　/ フッター手前で固定解除 */
	$(window).scroll(function(){
		if($(window).scrollTop() > 500){
			$(".pagetop02").fadeIn(500);
		}else{
			$(".pagetop02").fadeOut(300);
		}

		if(window.matchMedia("(min-width:1001px)").matches){
			var scrollHeight = $(document).height();
			var scrollPosition = $(window).height() + $(window).scrollTop();
			var footHeight = $("footer").innerHeight() + 80;
			if ( scrollHeight - scrollPosition  <= footHeight ) {
				$(".header-nav").css({
					"position":"fixed",
					"top":"auto",
					"bottom":footHeight,
				});
			} else {
				$(".header-nav").css({
					"position":"fixed",
					"top":"0",
				});
			}
		}
	});
	

	/* リサイズしたらリセット */
	var timer = false;
	var prewidth = $(window).width();
	$(window).resize(function() {
			if (timer !== false) {
					clearTimeout(timer);
			}
			timer = setTimeout(function() {
					var nowWidth = $(window).width();
					if(prewidth !== nowWidth){
						$('.header-nav').removeAttr("style");
						$('.header-nav .nav-wrap').removeAttr("style");
					}
					prewidth = nowWidth;
			}, 200);
	});

});