//2階層ナビ用
$(".sp-globalNavList a.more").click(function(e) {
  $(this).toggleClass("open");
  $(this).next("ul").slideToggle();
  return false;
});