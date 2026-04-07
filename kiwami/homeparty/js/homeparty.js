/* ------------------------------------------------------ */
/* ページ内リンク */
/* ------------------------------------------------------ */
$(function () {
	$('a.anchorlink[href^="#"]').on('click', function() {
		const speed = 500;
		const href = $(this).attr("href");
		const target = $(href == "#" || href == "" ? "html" : href);
		const position = target.offset().top - height;
	
	$("html, body").animate({ scrollTop: position }, speed, "swing");
		return false;
	});
});

/* ------------------------------------------------------ */
/* 作り方を見る */
/* ------------------------------------------------------ */
$(function () {
	$(".recipe_ttl").on("click", function () {
		$(this).next(".recipe_detail").slideToggle(300);
		$(this).toggleClass("open", 300);
	});
});