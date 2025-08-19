$(document).ready(function() {
  $("#filter").on("click", function() {
      var eventType = $('input[name="event_type"]:checked').val();
      var region = $('input[name="region"]:checked').val();

      $('.event-list__item').each(function() {
          var itemRegion = $(this).attr('data-region');
          var itemType = $(this).attr('data-type').split(' ');

          if ((eventType === "all" || itemType.includes(eventType)) &&
              (region === "all" || itemRegion === region)) {
              $(this).show();
          } else {
              $(this).hide();
          }
      });
  });
});


// ページ内リンク

$(function(){
    $('a[href^="#"]').click(function(){
        let speed = 500;
        let href= $(this).attr("href");
        let target = $(href == "#" || href == "" ? 'html' : href);
        let position = target.offset().top;
        $("html, body").animate({scrollTop:position}, speed, "swing");
        return false;
    });
});


//scroll fadein
$(function () {
  $(window).scroll(function () {
    $('.scroll_fadeIn').each(function () {
      const targetElement = $(this).offset().top;
      const scroll = $(window).scrollTop();
      const windowHeight = $(window).height();
      if (scroll > targetElement - windowHeight) {
        $(this).addClass('view');
      }
    });
  });
});


// drawer
class Drawer {
    constructor(){
        this.bg = document.querySelector('.drawer__bg');
        this.btn = document.querySelector('.drawer__btn');
        this.menu = document.querySelector('.drawer__menu');
        this.body = document.body;
        this.active = 'active';
        this.init();
    }
    
    init(){
        this.bg.addEventListener('click', this, false);
        this.btn.addEventListener('click', this, false);
    }
    
    toggle(){
        if(!this.btn.classList.contains(this.active)){
            this.menu.classList.add(this.active);
            this.bg.classList.add(this.active);
            this.btn.classList.add(this.active);
            this.body.style.overflowY = 'hidden';
            
        } else {
            this.menu.classList.remove(this.active);
            this.bg.classList.remove(this.active);
            this.btn.classList.remove(this.active);
            this.body.style.overflowY = 'auto';
        }
    }
    
    handleEvent(event) {
        this.toggle(event);
    }
}
//Instantiate
const drawer = new Drawer();

$('.drawer__menu a[href*="#"]').on('click', function() {  
    $('.drawer__bg, .drawer__btn, .drawer__menu').removeClass('active');
    $('body').css('overflow-y', 'auto');
});

// スクロールした際の動きを関数でまとめる
function setFadeElement() {
    var windowH = $(window).height();
    var scroll = $(window).scrollTop();
  
    var contentsTop = Math.round($('#event').offset().top);
    var contentsH = $('#event').outerHeight(true);
  
    // 出現範囲内に入ったかどうかをチェック
    if (scroll + windowH >= contentsTop && scroll + windowH <= contentsTop + contentsH) {
      $("#page-top").addClass("UpMove");
      $("#page-top").removeClass("DownMove");
      $(".hide-btn").removeClass("hide-btn");
    } else {
      if (!$(".hide-btn").length) {
        $("#page-top").addClass("DownMove");
        $("#page-top").removeClass("UpMove");
      }
    }
  }
  
  $(window).scroll(function() {
    setFadeElement();
  });
  

$('#page-top').click(function () {
    $('body,html').animate({
        scrollTop: 0
    }, 500);
    return false;
});