/* ------------------------------------------------------ */
/* include */
/* ------------------------------------------------------ */
$(function() {
  $.ajax({
    url: '/kiwami/float_bnr/index.html',
    dataType: 'html', // htmlのまま
    success: function (data) {
      $('body').prepend(data);
    },
    error: function () {
      alert('float_bnr error!');
    },
  });
});

/* ------------------------------------------------------ */
/* フロートバナー */
/* ------------------------------------------------------ */
$(function () {
  $(document).on('click', '#floatBnr a' , function() {
    var speed = 500;
    var href= $(this).attr("href");
    var target = $(href == "#" || href == "" ? 'html' : href);
    var position = target.offset().top;
    $("html, body").animate({scrollTop:position}, speed, "swing");
    return false;
  });
  $(document).on('click', '#floatBnr .close' , function() {
    $(this).parent().remove();
  });
  $(window).scroll(function (){
    $('#floatBnr').each(function(){
      var position = $('#anchor_recommend').offset().top;
      var scroll = $(window).scrollTop();
      var windowHeight = $(window).height();
      if (scroll > position - windowHeight + 200){
        $(this).fadeOut();
      } else{
        $('#floatBnr').fadeIn();
      }
    });
  });
});  