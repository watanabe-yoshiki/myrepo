/* ------------------------------------------------------ */
/* menu */
/* ------------------------------------------------------ */
$(function(){
    $("#block-menu .menu-list-ttl").on("click",function(){
        $(this).closest(".menu-list-item").toggleClass("active");
        $(this).closest(".menu-list-item").find(".menu-list-contents").stop().slideToggle(300);
    });
});

/* ------------------------------------------------------ */
/*  アコーディオン */
/* ------------------------------------------------------ */
$(function(){
    $(".ac-contents").hide();
    $(".ac-ttl").on("click",function(){
        $(this).toggleClass("active");
        $(this).next(".ac-contents").stop().slideToggle(300);
    });
});