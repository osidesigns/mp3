
//MP3 Player Script




//Owner Branding Label
$('#owner').text('Steven Andrews');

$(document).ready(function(){

	//Hide Pause Btn from the start of the app
	$('#pause-btn').hide();

	//Create your audio variable
	var audio;

	//Set current track to first track
	var currentTrack = 0;

	var i = 0; //Theme Incrementer Init

	//Init orange theme on progress bar, songTitle, and volume level
	$('#timeline div.progress-bar .progress').addClass('orange');
	$('#songTitle').addClass('orange');
	$('#volume-level').addClass('orange'); 

	//MP3 Theme Options
	var themes = [
		'orange',
		'blue',
		'pink',
		'purple',
		'red'
	];


	//Create an array of objects for your song tracks
	//that contain the artist name, the url to the track locations
	//and the url to the album cover.
	var tracks = [
		{
			artist: 'Anthony Hamilton',
			song: 'Charlene',
			url: 'charlene.mp3',
			cover: 'imgs/ahamilton.jpg'
		},
		{
			artist: 'Vanessa Carlton',
			song: '1000 Miles',
			url: '1000miles.mp3',
			cover: 'imgs/vcarlton.jpg'
		},
		{
			artist: 'Nickelback',
			song: 'Far Away',
			url: 'far_away.mp3',
			cover: 'imgs/nickelback.jpg'
		}
	];


	//Call InitAudio
	initAudio();




	//Create initAudio Function
	function initAudio(){

		audio =  new Audio('playlist/' + tracks[currentTrack].url);
		
		$('#songTitle').text(tracks[currentTrack].song);
		$('#artistName').text(tracks[currentTrack].artist);
		$('.album-display img').attr('src', tracks[currentTrack].cover);
		$('#volume-level').text(Math.round(audio.volume * 10));
		showDuration();

	}


	//Play Button
	$('#play-btn').click(function(){
		
		audio.play();
		$('#play-btn').hide();
		$('#pause-btn').show();

	});

	//Pause Button
	$('#pause-btn').click(function(){

		audio.pause();
		$('#pause-btn').hide();
		$('#play-btn').show();
	});

	//Previous Button
	$('#prev-btn').click(function(){

		if(currentTrack == 0){
			currentTrack = tracks.length -1;
		}else{
			currentTrack--;
		}

		audio.pause();
		initAudio();
		audio.play();
		$('#play-btn').hide();
		$('#pause-btn').show();
		
	});

	//Next Button
	$('#next-btn').click(function(){

		currentTrack++;

		if(tracks.length == currentTrack){
			currentTrack = 0;
		}

		audio.pause();
		initAudio();
		audio.play();
		$('#play-btn').hide();
		$('#pause-btn').show();
		
	});


	//Volume Up
	$('#volumeIncrease').click(function(){

		audio.volume = audio.volume + .1;
		$('#volume-level').text(Math.round(audio.volume * 10));
		$('#volumeDecrease').prop('disabled', false);

		if(audio.volume > .9){
			
			audio.volume = 1;
			$('#volume-level').text(audio.volume + '0');
			$('#volumeIncrease').prop('disabled', true);
		}

	});

	//Volume Down
	$('#volumeDecrease').click(function(){

		audio.volume = audio.volume - .1;
		$('#volume-level').text(Math.round(audio.volume * 10));
		$('#volumeIncrease').prop('disabled', false);

		if(audio.volume < .1){
			
			audio.volume = 0;
			$('#volume-level').text(audio.volume);
			$('#volumeDecrease').prop('disabled', true);
		}
			
		
	});


	//Allow functionality with the Branding area
	//Click the Brand to control the theme color
	$('#branding').click(function(){

		i++;
		prevTheme = themes[i-1];
		theme = themes[i];
		themeList = themes.length - 1; //number of themes in array minus 1

		if(i > themeList){
			i = 0;
			theme = themes[i]
		}

		//Buttons
		$('#prev-btn img').attr('src', 'imgs/' + theme + '-prev.png');
		$('#play-btn img').attr('src', 'imgs/' + theme + '-play.png');
		$('#pause-btn img').attr('src', 'imgs/' + theme + '-pause.png');
		$('#next-btn img').attr('src', 'imgs/' + theme + '-next.png');

		//Progress Bars
		$('#timeline div.progress-bar .progress').removeClass('orange'); //removes initial orange theme
		$('#timeline div.progress-bar .progress').removeClass(prevTheme);
		$('#timeline div.progress-bar .progress').addClass(theme);

		//Song Title
		$('#songTitle').removeClass('orange'); //removes initial orange theme
		$('#songTitle').removeClass(prevTheme);
		$('#songTitle').addClass(theme);

		//Volume Level
		$('#volume-level').removeClass('orange'); //removes initial orange theme
		$('#volume-level').removeClass(prevTheme);
		$('#volume-level').addClass(theme);

	});

	//Create a function to handle the current time and duration of the current song
	function showDuration(){

		$(audio).bind('timeupdate', function(){
			
			var seconds = parseInt(audio.currentTime % 60);
			var minutes = parseInt((audio.currentTime) / 60) % 60;
			var durationSec = parseInt(audio.duration % 60);
			var durationMin = parseInt((audio.duration) / 60) % 60;

			if(seconds < 10){
				seconds = '0' + seconds;
			}

			$('#currentTime').html(minutes + ':' + seconds);
			$('#duration').html(durationMin + ':' + durationSec);

			var value = 0;

			if(audio.currentTime > 0){
				value = Math.floor((100 / audio.duration) * audio.currentTime);
			}

			$('.progress').css('width', value +"%");

		});
	}
});



