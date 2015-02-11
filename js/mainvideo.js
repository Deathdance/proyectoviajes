document.addEventListener("DOMContentLoaded", function(){
	doFirst();
}, false);
var myMovie;
var playButton;
var bar;
var progressBar;
var updateBar;
var barSize=550;

function doFirst(){
	myMovie = document.getElementById('myMovie');
	playButton = document.getElementById('playButton');
	bar = document.getElementById('defaultBar');
	progressBar = document.getElementById('progressBar');

	playButton.addEventListener('click', playOrPause, false);
	bar.addEventListener('click', clickedBar, false);
}

function playOrPause(){
	if(!myMovie.paused && !myMovie.ended)
	{
		myMovie.pause();
		playButton.innerHTML='Play';
		window.clearInterval(update);
	}else{
		myMovie.play();
		updateBar=setInterval(update,1);
		playButton.innerHTML='Pause';
	}
}
function update(){
	if(!myMovie.ended){
		var size=parseInt(myMovie.currentTime*barSize/myMovie.duration); 
		progressBar.style.width=size+'px';	
	}else{
		progressBar.style.width='0px';
		playButton.innerHtml='Play';
		window.clearInterval(update);
	}

}
function clickedBar(e){
	if(!myMovie.paused && !myMovie.ended)
	{
		var mouseX = e.pageX-bar.offsetLeft;
		var newtime= mouseX*myMovie.duration/barSize;
		myMovie.currentTime=newtime;
		progressBar.style.width=mouseX+'px';
	
	}

}