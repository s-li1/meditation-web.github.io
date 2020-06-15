const application = () => {
	const song = document.querySelector ('.song');
	const playIcon = document.querySelector(".play");
	const outline = document.querySelector(".moving-outline circle");
	const video = document.querySelector (".vid-container video");

	//Sounds

	const soundsBtn = document.querySelectorAll(".sound-picker button")

	//Time Display

	const timeDisplay = document.querySelector(".time-display");

	const timeSelect = document.querySelectorAll(".time-select button");
	//Get Length of the Outline

	const outlineLength = outline.getTotalLength();
	console.log (outlineLength)

	//Duration
	let duration = 600;

		//overlap the the white circle on top of the blue circle
	const overLap = () => {
		outline.style.strokeDasharray  = outlineLength;
		outline.style.strokeDashoffset = outlineLength;
	}
	overLap();

	
	soundsBtn.forEach(sound => {
		sound.addEventListener("click", function() {
			song.src = this.getAttribute('data-sound');
			video.src = this.getAttribute('data-video');
			checkIfPlaying(song);
		})
	});

	//play sound
	//add listener to click on play Icon
	playIcon.addEventListener("click", ()=> {
		
		checkIfPlaying(song); //invokes function with argument sound
	});

	//Select sound
	//loop through or for each buttons
	timeSelect.forEach(button => {
		button.addEventListener("click", function() {
			duration = this.getAttribute('data-time');
			timeDisplay.textContent = `${Math.floor(duration / 60)}:${Math.floor(duration % 60)+"0"}`;
		});
	});

	const checkIfPlaying = (song) => {
		if (song.paused) {
			song.play();
			video.play();
			playIcon.src = "./svg/pause.svg";
		}
		else {
			song.pause();
			video.pause();
			playIcon.src = "./svg/play.svg";
		}
	};

	//Pick different sounds

	song.ontimeupdate = () => {
		//gets current sound time
		let currentTime = song.currentTime;
		//gets how many seconds/minutes left by minusing duration from recorded time 
		let elapsed = duration - currentTime;

		//when the seconds hits 60 it will go back to zero

		//use Math floor method to make rounding of time simpler/easier. Round down

		let seconds = Math.floor(elapsed % 60);


		let minutes = Math.floor(elapsed / 60);


		//animate circle 

		let progress = outlineLength - (currentTime / duration) * outlineLength;
		outline.style.strokeDashoffset = progress;
		
		//Animate text

		timeDisplay.textContent = `${minutes}:${seconds}`;

		if (currentTime >= duration) {
			song.pause();
			song.currentTime = 0;
			play.src = "./svg/play.svg";
			video.pause;
		}	
	};
};

application();