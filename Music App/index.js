const title = document.getElementById("music-title"),
artist = document.getElementById("music-artist"),
currentTimeEl = document.getElementById("current-time"),
durationEl = document.getElementById("duration"),
progress = document.getElementById("progress"),
playerProgress = document.getElementById("player-progress"),
prevBtn = document.getElementById("prev"),
nextBtn = document.getElementById("next"),
playBtn = document.getElementById("play"),
background = document.getElementById("bg-img");

const music = new Audio();
const songs = [
    {
        path: "songs/Chocolate.mp3",
        displayName: "Chocolate",
        artist: "Chuu",
    },
    {
        path: "songs/Hitchhiker.mp3",
        displayName: "Hitchhiker",
        artist: "Chuu",
    },
    {
        path: "songs/Howl.mp3",
        displayName: "Howl",
        artist: "Chuu",
    },
    {
        path: "songs/My Palace.mp3",
        displayName: "My Palace",
        artist: "Chuu",
    },
    {
        path: "songs/ONE AND A HALF.mp3",
        displayName: "One And A Half",
        artist: "Chuu",
    },
    {
        path: "songs/Underwater.mp3",
        displayName: "Underwater",
        artist: "Chuu",
    },
]

let musicIndex = 0;
let isPlaying = false;

function togglePlay(){
    if(isPlaying){
        pauseMusic();
    }
    else{
        playMusic();
    }
}

function playMusic(){
    isPlaying = true;

    playBtn.classList.replace("fa-play", "fa-pause");
    playBtn.setAttribute("title", "Pause");
    music.play();
}

function pauseMusic(){
    isPlaying = false;
    playBtn.classList.replace("fa-pause", "fa-play");
    playBtn.setAttribute("title", "Play");
    music.pause();
}

function loadMusic(song){
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
}

function changeMusic(direction){
    musicIndex = (musicIndex + direction + songs.length) %
    songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateProgressBar(){
    const {duration, currentTime} = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;
    const formatTime = (time) => String(Math.floor(time)).
    padStart(2, "0");
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;    
}

function setProgressBar(e){
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}

playBtn.addEventListener("click", togglePlay);
prevBtn.addEventListener("click", () => changeMusic(-1));
nextBtn.addEventListener("click", () => changeMusic(1));
music.addEventListener("ended", () => changeMusic(1));
music.addEventListener("timeupdate", updateProgressBar);
playerProgress.addEventListener("click", setProgressBar);
loadMusic(songs[musicIndex]);

