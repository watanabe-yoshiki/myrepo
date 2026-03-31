$(function() {
	$(".ac_contents").hide();
	$(".ac_ttl").on("click", function () {
		$(this).next(".ac_contents").slideToggle(300);
		$(this).toggleClass("open", 300);
	});
});