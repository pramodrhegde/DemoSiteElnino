$(document).ready(function(){
	// Side bar hide funtionality
	$('.menu-button').on('click',function(){
		$('.navigation-mobile').show();
	});
	$('.navigation-mobile').on('click',function(){
		$(this).hide();
	});

	//Scroll Functionality
	$('.scroll-button').on('click',function(){
		$('html,body').animate({scrollTop:$('.banner').height()},500,"swing");
	});
	//Video player functionality
	canCheckBuffer = false;
	videosPlaying = [];
	//var bufferCheckInterval;

	//Play video on click of play button
	$('a.video-play-button').on('click',function(){
		var $this = $(this);
		$this.hide();
		var video_object = $this.siblings('.media').show().find('video').get(0);
		video_object.play();
		videosPlaying.push(video_object);

		if(!canCheckBuffer){
			setTimeout(buffer_status,500);
			canCheckBuffer = true;
		}
		/*$(video_object).on('loadeddata',function(){
			videosPlaying.push(video_object);
			video_object.play();
			if(!canCheckBuffer){
				setTimeout(buffer_status,500);
				canCheckBuffer = true;
			}
		}).*/
		$(video_object).on('timeupdate',function(){
			var currentPos = video_object.currentTime;
			var maxDuration = video_object.duration;
			var percentage_width = 100 * (currentPos/maxDuration);
			$this.siblings('.media').find('div.progresbar').css({'width':percentage_width+'%'});
		})
		.on('ended',function(){
			$this.siblings('.media').find('.play-button').find('i:visible').toggleClass('hidden');
			$this.siblings('.media').find('.play-button').find('i.fa-repeat').toggleClass('hidden');
		});
		return false;
	});

	//Play Pause functionality
	$('.play-button').on('click',function(){
		var $this = $(this);
		var video_object = $this.parents('.video-controls').siblings().get(0);
		play_pasue(video_object,$this);
	});

	//Mute functionality
	$('.mute-button').on('click',function(){
		$this = $(this);
		var video_object = $this.parents('.video-controls').siblings().get(0);
		mute_unmute(video_object,$this);
	});

	//Volume functionality
	var opacity = 1;
	$('.volume-up-button,.volume-down-button').on('click',function(){
		var $this = $(this);
		var direction = $this.data('direction');
		var video_object = $this.parents('.video-controls').siblings().get(0);
		volume_updown(video_object,direction,$this);
		if(direction==="up"){
			opacity+=opacity==1?0:0.03;
			$this.css({'opacity':opacity});
		}else{
			opacity-=opacity<=0.75?0:0.03;
			$this.parent().find('.volume-up-button').css({'opacity':opacity});
		}
	});
});

function play_pasue(video,button){
	if(video.paused){
		video.play();
		button.find('i:visible').toggleClass('hidden');
		button.find('i.fa-pause').toggleClass('hidden');
	}else if(video.ended){

		reset_player(video);
		button.siblings('.progresbar').css({'width':0+'%'});
		video.play();
		button.find('i:visible').toggleClass('hidden');
		button.find('i.fa-pause').toggleClass('hidden');
	}
	else{
		video.pause();
		button.find('i:visible').toggleClass('hidden');
		button.find('i.fa-play').toggleClass('hidden');
	}
}

function mute_unmute(video,button){
	if(video.muted){
		video.muted= !video.muted;
		button.css({'opacity':1});
	}else{
		video.muted= !video.muted;
		button.css({'opacity':0.75});
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
	for(var i = 0 ;i<videosPlaying.length;i++){
		currentPlaying=videosPlaying[i];
		var maxDuration = currentPlaying.duration;
		var bufferedData =(currentPlaying.buffered && currentPlaying.buffered.length) ? currentPlaying.buffered.end(0) : 0 ;
		var percentageBuffer = 100*(bufferedData/maxDuration);

		$(currentPlaying).parent('.media').find('.bufferbar').css({'width':percentageBuffer+'%'});
		if(maxDuration == bufferedData){
			//alert('buffer-colpete');
			videosPlaying.splice(i,1);
		}
	}
	if(videosPlaying.length !== 0){
		setTimeout(buffer_status,500);
		canCheckBuffer = false;
	}
}