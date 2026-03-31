/* ------------------------------------------------------ */
/* ページ内リンク */
/* ------------------------------------------------------ */
$(function () {
	const pos = $('#pagenav').offset().top;
	const height = $('#pagenav').outerHeight(true);

	$(window).scroll(function () {
		if ($(this).scrollTop() > pos) {
		$('#pagenav').addClass('fixed');
		$( 'body' ).css( 'padding-top', height);
		} else {
		$('#pagenav').removeClass('fixed');
		$( 'body' ).css( 'padding-top', 0);
		}
	});

	$('a.anchorlink[href^="#"]').on('click', function() {
		const speed = 500;
		const href = $(this).attr("href");
		const target = $(href == "#" || href == "" ? "html" : href);
		const position = target.offset().top - height;
	
	$("html, body").animate({ scrollTop: position }, speed, "swing");
		return false;
	});
});