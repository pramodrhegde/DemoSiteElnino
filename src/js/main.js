$(document).ready(function(){
	// Side bar hide funtionality
	$('.menu-button').on('click',function(){
		$('.navigation-mobile').show();
	});
	$('.navigation-mobile').on('click',function(){
		$(this).hide();
	});

	//Video player functionality

	//Play video on click of play button
	$('a.video-play-button').on('click',function(){
		var $this = $(this);
		$this.hide();
		var video_object = $this.siblings('.media').show().find('video').get(0);
		video_object.play();

		$(video_object).on('timeupdate',function(){
			var currentPos = video_object.currentTime;
			var maxDuration = video_object.duration;
			var percentage_width = 100 * (currentPos/maxDuration);
			$this.siblings('.media').find('div.progresbar').css({'width':percentage_width+'%'});
		}).on('ended',function(){
			$this.siblings('.media').find('.play-button').text('Replay');
		});
		setInterval(buffer_status,500);
		return false;
	});

	//Play Pause functionality
	$('.play-button').on('click',function(){
		var $this = $(this);
		var video_object = $this.parent().siblings().get(0);
		play_pasue(video_object,$this);
	});

	//Mute functionality
	$('.mute-button').on('click',function(){
		$this = $(this);
		var video_object = $this.parent().siblings().get(0);
		mute_unmute(video_object,$this);
	});

	//Volume functionality
	$('.volume-up-button,.volume-down-button').on('click',function(){
		var $this = $(this);
		var direction = $this.data('direction');
		var video_object = $this.parent().siblings().get(0);
		volume_updown(video_object,direction);
	});
});

function play_pasue(video,button){
	if(video.paused){
		video.play();
		button.text('Pause');
	}else if(video.ended){

		reset_player(video);
		button.siblings('.progresbar').css({'width':0+'%'});
		video.play();
		button.text('Pause');
	}
	else{
		video.pause();
		button.text('Play');
	}
}

function mute_unmute(video,button){
	if(video.muted){
		video.muted= !video.muted;
		button.text('Mute');
	}else{
		video.muted= !video.muted;
		button.text('Unmute');
	}
}

function volume_updown(video,direction){
	if(direction==="up"){
		video.volume += video.volume == 1? 0:0.1;
	}else{
		video.volume -= video.volume == 0? 0:0.1;
	}
	video.volume = parseFloat(video.volume).toFixed(1);
}

function reset_player(video){
	video.currentTime=0;
	progresbar.css({'width':0+'%'});
}

function buffer_status(){
}
