// Create the audio element for the player
let currentTrack = document.createElement('audio');
let trackIndex = 0;
let updateTimer;

const tracks = [
    {
        audioSrc: 'God Is An Astronaut - Beyond The Dying Light.mp3',
        coverSrc: 'giaa.jpg',
        autor: 'God Is An Astronaut',
        title: 'Beyond The Dying Light',
        duration: '05:41'
    },
    {
        audioSrc: 'jungle.mp3',
        coverSrc: 'jungle.jpg',
        autor: 'Petit Biscuit',
        title: 'Jungle',
        duration: '04:33'
    },
    {
        audioSrc: 'God Is An Astronaut - Forever Lost.mp3',
        coverSrc: 'giaa600.jpg',
        autor: 'God Is An Astronaut',
        title: 'Forever Lost',
        duration: '06:20'
    }
];

const cover = document.querySelector('.cover');
const audioTitle = document.querySelector('.title');
const audioAutor = document.querySelector('.autor');

const playPauseBtn = document.getElementById('play-pause-btn');
const pause = document.getElementById('pause');
const play = document.getElementById('play');

const progressBar = document.getElementById('progress-bar');
const currentTime = document.querySelector('.current-time');
const duration = document.querySelector('.duration-time');
const nowPlaying = document.querySelector('.now-playing');

const volumeBar = document.getElementById('volume-bar');
function setVolume() {
    currentTrack.volume = volumeBar.value / 100;
}

function loadTrack(trackIndex) {
    const track = tracks[trackIndex];
    currentTrack.src = track.audioSrc;
    cover.src = track.coverSrc;
    audioAutor.textContent = track.autor;
    audioTitle.textContent = track.title;
    duration.textContent = track.duration;
    currentTrack.load();

    updateTimer = setInterval(updateProgressBar, 1000);
    currentTrack.addEventListener('canplay', updateProgressBar);
    currentTrack.addEventListener('ended', nextTrack);

    nowPlaying.textContent = (trackIndex + 1) + " / " + tracks.length;
    setVolume();
}

function playPause() {
    if (playPauseBtn.classList.contains("pause")) {
        currentTrack.pause();
        play.classList.remove("d-none");
        pause.classList.add("d-none");
        playPauseBtn.classList.remove("pause");
        
    } else {
        currentTrack.play();
        pause.classList.remove("d-none");
        play.classList.add("d-none");
        playPauseBtn.classList.add("pause");
    }
}

function nextTrack() {
    currentTrack.pause();
    currentTrack.currentTime = 0;

    if (trackIndex < tracks.length - 1) {
        trackIndex += 1;
    } else {
        trackIndex = 0;
    }

    loadTrack(trackIndex);
    progressBar.value = 0;

    if (playPauseBtn.classList.contains("pause")) {
        currentTrack.play();
    };
    setVolume();
}
function prevTrack() {
    currentTrack.pause();
    currentTrack.currentTime = 0;

    if (trackIndex > 0) {
        trackIndex -= 1;
    } else {
        trackIndex = tracks.length - 1;
    }

    loadTrack(trackIndex);
    progressBar.value = 0;

    if (playPauseBtn.classList.contains("pause")) {
        currentTrack.play();
    };
    setVolume();
}

function updateProgressBar() {
    const seekPosition = currentTrack.currentTime * (100 / currentTrack.duration);
    progressBar.value = seekPosition;
    
    let currentMinutes = Math.floor(currentTrack.currentTime / 60);
    let currentSeconds = Math.floor(currentTrack.currentTime - currentMinutes * 60);
    
    if (currentSeconds < 10) {
        currentSeconds = "0" + currentSeconds;
    };
    if (currentMinutes < 10) {
        currentMinutes = "0" + currentMinutes;
    };
    currentTime.textContent = currentMinutes + ":" + currentSeconds;
    //let durationMinutes = Math.floor(currentTrack.duration / 60);
    //let durationSeconds = Math.floor(currentTrack.duration - durationMinutes * 60);
    //if (durationSeconds < 10) { durationSeconds = "0" + durationSeconds; }
    //if (durationMinutes < 10) { durationMinutes = "0" + durationMinutes; }
    //duration.textContent = durationMinutes + ":" + durationSeconds;

    progressBar.style.background = `linear-gradient(to right, #519c81 0%, #519c81 ${seekPosition + 0.1}%, #ffffff ${seekPosition}%, #ffffff 100%)`;
}

progressBar.addEventListener('input', () => {
    const seekto = currentTrack.duration * progressBar.value / 100;
    currentTrack.currentTime = seekto;
    progressBar.style.background = `linear-gradient(to right, #519c81 0%, #519c81 ${progressBar.value + 0.1}%, #ffffff ${progressBar.value}%, #ffffff 100%)`;
});

loadTrack(trackIndex);

console.log('task 60/60');