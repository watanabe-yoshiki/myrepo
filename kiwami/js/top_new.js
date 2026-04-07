//スムーススクロール
$(function () {
  const header = $('#header');

  $('a[href^="#"]').on('click', function() {
    const gap = header.outerHeight();
    const speed = 500;
    const href = $(this).attr("href");
    const target = $(href == "#" || href == "" ? "html" : href);
    const position = target.offset().top - gap;
    
    $("html, body").animate({ scrollTop: position }, speed, "swing");
    return false;
  })
});

//ヘッダーをスクロールで表示
$(function () {
  const headNav = $('.js-header');
  $(window).scroll(function () {
    if($(this).scrollTop() > 0 && headNav.hasClass('fixed') == false) {
      headNav.addClass('fixed');
      headNav.animate({top: 0},0);
    }
    else if($(this).scrollTop() < 0 && headNav.hasClass('fixed') == true){
      headNav.removeClass('fixed');
    }
  });
});

//アコーディオン
$(function () {
  $('.js-acContents').hide();
  $('.js-ac').on('click', function () {
    $(this).toggleClass('open');
    $(this).next('.js-acContents').slideToggle();
  });
});

//メガメニュー
$(function () {
  $('.js-megaMenu').on('click', function () {
    $(this).addClass('active');
    $('#header').addClass('open');
    $('#mask').addClass('active');
  });
  $('.nav_list .menu').not(this).on('click', function () {
    $('.nav_list .menu').not(this).removeClass('active');
  });
  $('.nav_list .menu').not('.js-megaMenu').on('click', function () {
    $('#header').removeClass('open');
    $('#mask').removeClass('active');
  });
  $(document).on('click',function(e) {
    if(!$(e.target).closest('#header').length) {
      $('.js-megaMenu').removeClass('active');
      $('#header').removeClass('open');
      $('#mask').removeClass('active');
    } 
  });
  $('.js-megaMenuClose').on('click', function () {
    $('.js-megaMenu').removeClass('active');
    $('#header').removeClass('open');
    $('#mask').removeClass('active');
  });
});

// MVスライダー
$(function(){
  $(".mv_slider").slick({
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    fade:true,
    infinite: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    speed:1000,
    lazyLoad: 'progressive',
  });
});

//おすすめスライダー
$(function(){
  $(".reccomend_slider").slick({
    autoplay: true,
    autoplaySpeed: 4000,
    arrows: true,
    centerMode: true,
    centerPadding: "10%",
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 1,
    speed:1000,
    lazyLoad: 'progressive',
    responsive: [
      {
        breakpoint: 840,
        settings: {
          slidesToShow: 1,
          centerPadding: "24%",
        },
      },
    ],
  });
});

//ランキングスライダー
$(function(){
  $(".ranking_slider .slider").slick({
    autoplay: false,
    arrows: true,
    asNavFor: '.ranking_slider .slider_nav',
//    infinite: false,
    centerMode: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 840,
        settings: {
          centerPadding: "13%",
          variableWidth: false,
        },
      },
    ],
  });
  $('.ranking_slider .slider_nav').slick({
    asNavFor: '.ranking_slider .slider',
    slidesToShow: 6,
    slidesToScroll: 1,
    centerMode: true,
    focusOnSelect: true,
    slide: 'p'
  });
});

//殿堂入りスライダー
$(function(){
  $(".best_slider").slick({
    autoplay: false,
    arrows: true,
//    infinite: false,
    centerMode: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    variableWidth: true,
    responsive: [
      {
        breakpoint: 840,
        settings: {
          centerPadding: "10%",
          variableWidth: false,
        },
      },
    ],
  });
});

$(function(){
   
  // 「.modal_open」をクリックしたらモーダルと黒い背景を表示する
  $('.modal_open').click(function(){
 
    // 黒い背景をbody内に追加
    $('body').append('<div class="modal_bg"></div>');
    $('.modal_bg').fadeIn();
   
   // 背景を固定
   $('body').css('overflow', 'hidden');
 
    // data-targetの内容をIDにしてmodalに代入
    var modal = '#' + $(this).attr('data-target');
 
    // モーダルをウィンドウの中央に配置する
    function modalResize(){
        var w = $(window).width();
        var h = $(window).height();
 
        var x = (w - $(modal).outerWidth(true)) / 2;
        var y = (h - $(modal).outerHeight(true)) / 2;
 
        $(modal).css({'left': x + 'px','top': y + 'px'});
    }
 
    // modalResizeを実行
    modalResize();
 
    // modalをフェードインで表示
    $(modal).fadeIn();
 
    // .modal_closeをクリックしたらモーダルと背景をフェードアウトさせる
    $('.modal_close').off().click(function(){
        $('.modal_box').fadeOut();
        $('.modal_bg').fadeOut('slow',function(){
            $('.modal_bg').remove();
        });
     
     // .modal_closeをクリックで背景固定を解除
     $('html, body').removeAttr('style');
    });
 
    // ウィンドウがリサイズされたらモーダルの位置を再計算する
    $(window).on('resize', function(){
        modalResize();
    });
 
    // .modal_switchを押すとモーダルを切り替える
    $('.modal_switch').click(function(){
 
      // 押された.modal_switchの親要素の.modal_boxをフェードアウトさせる
      $(this).parents('.modal_box').fadeOut();
 
      // 押された.modal_switchのdata-targetの内容をIDにしてmodalに代入
      var modal = '#' + $(this).attr('data-target');
 
      // モーダルをウィンドウの中央に配置する
      function modalResize(){
          var w = $(window).width();
          var h = $(window).height();
 
          var x = (w - $(modal).outerWidth(true)) / 2;
          var y = (h - $(modal).outerHeight(true)) / 2;
 
          $(modal).css({'left': x + 'px','top': y + 'px'});
      }
 
      // modalResizeを実行
      modalResize();
 
      $(modal).fadeIn();
 
      // ウィンドウがリサイズされたらモーダルの位置を再計算する
      $(window).on('resize', function(){
          modalResize();
      });
    });
  });
});

/*
$(function(){
 
$('body').css('overflow', 'hidden');
 
$('.modal_close').off().click(function(){
 $('#pop-up').fadeOut();
 $('html, body').removeAttr('style');
 
});
});
*/