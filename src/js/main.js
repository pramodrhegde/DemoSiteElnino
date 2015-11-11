$(document).ready(function(){
	$('.menu-button').on('click',function(){
		$('.navigation-mobile').show();
	});
	$('.navigation-mobile').on('click',function(){
		$(this).hide();
	});

	$('a.video-play-button').on('click',function(){
		$(this).hide();
		$(this).siblings('.media').show().find('video')[0].play();
	});
});