const image = document.querySelector('img');
const title = document.getElementById('title');
const artist = document.getElementById('artist');
const music = document.querySelector('audio');
const progressContainer = document.getElementById('progress-container');
const progress = document.getElementById('progress');
const currentTimeEL = document.getElementById('current-time');
const durationEL = document.getElementById('duration');
const previousButton = document.getElementById('prev');
const playButton = document.getElementById('play');
const nextButton = document.getElementById('next');

// Music
const songs = [
    {
        name: 'jacinto-1',
        displayName: 'Electric Chill Machine',
        artist: 'Jacinto Design'
    },
    {
        name: 'jacinto-2',
        displayName: 'Seven Nation Army (Remix)',
        artist: 'Jacinto Design'
    },
    {
        name: 'jacinto-3',
        displayName: 'Goodnight, Disco Queen',
        artist: 'Jacinto Design'
    },
    {
        name: 'metric-1',
        displayName: 'Front Row (Remix)',
        artist: 'Metric/Jacinto Design'
    }
];

// Check if Playing
let isPlaying = false;

// Play Function
function playSong() {
    isPlaying=true;
    music.play();
    playButton.classList.replace('fa-play', 'fa-pause');
    playButton.setAttribute('title', 'Pause');
    
}

// Pause Function
function pauseSong() {
    isPlaying=false;
    music.pause();
    playButton.classList.replace('fa-pause', 'fa-play');
    playButton.setAttribute('title', 'Play');
}

// Event Listener for Play and Pause
playButton.addEventListener('click', () => (isPlaying ? pauseSong() : playSong()));

// Update DOM
function loadSong(song) {
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    music.src = `music/${song.name}.mp3`;
    image.src = `img/${song.name}.jpg`;
}

// Current Song
let songIndex = 0;

// Next Song Function
function nextSong() {
    songIndex++;
    if (songIndex <= 3) {
        loadSong(songs[songIndex]);
        playSong();
    } else {
        songIndex = 0;
        loadSong(songs[songIndex]);
        playSong();
    }
}

// Previous Song Function
function prevSong() {
    songIndex--;
    if (songIndex < 0 ) {
        songIndex = songs.length -1;
    }
    loadSong(songs[songIndex]);
    playSong();
}

// Update Progress Bar and Time, e is event
function updateProgressBar(e) {
    if (isPlaying) {
        const {duration, currentTime} = e.srcElement;
        // Update progress bar width
        const progressPercent = (currentTime / duration) * 100;
        progress.style.width = `${progressPercent}%`;

        // Calculate display of duration
        const durationMinutes = Math.floor(duration / 60); // to get minute without decimal
        let durationSeconds = Math.floor(duration % 60);

        if (durationSeconds < 10) {
            durationSeconds = `0${durationSeconds}`;  // Turn into string and add as 0
        }
         //Delay swithcing the duratio nelement to avoid NaN (Not a Number)
         if (durationSeconds) {
            durationEL.textContent = `${durationMinutes}:${durationSeconds}`;
        }
        // Calculate display of current time 
        const currentMinutes = Math.floor(currentTime / 60); // to get minute without decimal
        let currentSeconds = Math.floor(currentTime % 60);

        if (currentSeconds < 10) {
            currentSeconds = `0${currentSeconds}`;  // Turn into string and add as 0
        }
        currentTimeEL.textContent = `${currentMinutes}:${currentSeconds}`;

    }
}

//Set Progress Bar
function setProgressBar(e) {
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const {duration} = music;

    music.currentTime = (clickX / width) * duration ;
}
// Events Listeners
previousButton.addEventListener('click', prevSong);
nextButton.addEventListener('click', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
music.addEventListener('ended', nextSong);
progressContainer.addEventListener('click', setProgressBar);
