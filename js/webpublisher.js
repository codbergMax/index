$(window).load(function(){

	// 왼쪽메뉴열기_모바일
	$("body").on("click ", ".menuBtn", function(){
		winH = $(window).height();
		$(".menu").addClass('visible');
		$( ".menu" ).animate({height: '100%'},500);
		$("body").addClass("noScroll");
	});


	// 왼쪽메뉴닫기_모바일
	$("body").on("click ", ".close", function(){
		$(".menu").removeClass('visible');
		$( ".menu" ).animate({height: '0'},500);
		$("body").removeClass("noScroll");
	});

});