const cover = document.getElementById("capa");
const songName = document.getElementById("nome-musica");
const bandName = document.getElementById("nome-banda");
const song = document.getElementById("musica");
const playPause = document.getElementById("playPause");
const previous = document.getElementById("previous");
const next = document.getElementById("next");
const likeButton = document.getElementById("like");
const currentProgress = document.getElementById("progresso-atual");
const progressContainer = document.getElementById("progress-container");
const shuffleButton = document.getElementById("shuffle");
const repeatButton = document.getElementById("repeat");
const songTime = document.getElementById("song-time");
const totalTime = document.getElementById("total-time");

playPause.addEventListener("click", playSong);
previous.addEventListener("click", previousSong);
next.addEventListener("click", nextSong);
song.addEventListener("timeupdate", updateProgress);
progressContainer.addEventListener("click", jumpTo);
shuffleButton.addEventListener("click", shuffleButtonClicked);
repeatButton.addEventListener("click", repeatButtonClicked);
song.addEventListener("ended", nextOrRepeat);
song.addEventListener("loadedmetadata", updateTotalTime);
likeButton.addEventListener("click", likeButtonClicked);

let isShuffled = false;
let repeatOn = false;

const ruMine = {
  songName: "R U Mine",
  artist: "Arctic Monkeys",
  file: "r_u_mine",
  liked: false,
};

const Arabella = {
  songName: "Arabella",
  artist: "Arctic Monkeys",
  file: "arabella",
  liked: false,
};

const WannaKnow = {
  songName: "Do I Wanna Know",
  artist: "Arctic Monkeys",
  file: "DoIwannaKnow",
  liked: false,
};

const originalPlaylist = JSON.parse(localStorage.getItem("playlist")) ?? [
  ruMine,
  Arabella,
  WannaKnow,
];
let sortedPlaylist = [...originalPlaylist];
let index = 0;

function playSong() {
  if (song.paused) {
    song.play();
    playPause.querySelector(".bi").classList.remove("bi-play-circle-fill");
    playPause.querySelector(".bi").classList.add("bi-pause-circle-fill");
  } else {
    song.pause();
    playPause.querySelector(".bi").classList.remove("bi-pause-circle-fill");
    playPause.querySelector(".bi").classList.add("bi-play-circle-fill");
  }
}

function likeButtonRender() {
  if (sortedPlaylist[index].liked === true) {
    likeButton.querySelector(".bi").classList.remove("bi-heart");
    likeButton.querySelector(".bi").classList.add("bi-heart-fill");
    likeButton.classList.add("button-active");
  } else {
    likeButton.querySelector(".bi").classList.add("bi-heart");
    likeButton.querySelector(".bi").classList.remove("bi-heart-fill");
    likeButton.classList.remove("button-active");
  }
}

function initializeSong() {
  cover.src = `imagens/${sortedPlaylist[index].file}.jpg`;
  song.src = `musicas/${sortedPlaylist[index].file}.mp3`;
  songName.innerText = sortedPlaylist[index].songName;
  bandName.innerText = sortedPlaylist[index].artist;
  likeButtonRender();
}

function previousSong() {
  if (index === 0) {
    index = sortedPlaylist.length - 1;
  } else {
    index -= 1;
  }
  initializeSong();
  playSong();
}

function nextSong() {
  if (index === sortedPlaylist.length - 1) {
    index = 0;
  } else {
    index += 1;
  }
  initializeSong();
  playSong();
}

function updateProgress() {
  const barWidth = (song.currentTime / song.duration) * 100;
  currentProgress.style.setProperty("--progress", `${barWidth}%`);
  songTime.innerText = toHHMMSS(song.currentTime);
}

function jumpTo(event) {
  const width = progressContainer.clientWidth;
  const clickPosition = event.offsetX;
  const jumpToTime = (clickPosition / width) * song.duration;
  song.currentTime = jumpToTime;
}

function shuffleArray(preShuffleArray) {
  let size = sortedPlaylist.length;
  let currentIndex = size - 1;

  while (currentIndex > 0) {
    let randomIndex = Math.floor(Math.random() * size);
    let aux = preShuffleArray[currentIndex];
    preShuffleArray[currentIndex] = preShuffleArray[randomIndex];
    preShuffleArray[randomIndex] = aux;
    currentIndex -= 1;
  }
}

function shuffleButtonClicked() {
  if (isShuffled === false) {
    isShuffled = true;
    shuffleArray(sortedPlaylist);
    shuffleButton.classList.add("button-active");
  } else {
    isShuffled = false;
    sortedPlaylist = [...originalPlaylist];
    shuffleButton.classList.remove("button-active");
  }
}

function repeatButtonClicked() {
  if (repeatOn === false) {
    repeatOn = true;
    repeatButton.classList.add("button-active");
  } else {
    repeatOn = false;
    repeatButton.classList.remove("button-active");
  }
}

function nextOrRepeat() {
  if (repeatOn === false) {
    nextSong();
  } else {
    playSong();
  }
}

function toHHMMSS(originalNumber) {
  let hours = Math.floor(originalNumber / 3600);
  let min = Math.floor((originalNumber - hours * 3600) / 60);
  let secs = Math.floor(originalNumber - hours * 3600 - min * 60);

  return `${hours.toString().padStart(2, "0")}:${min
    .toString()
    .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
}

function updateTotalTime() {
  totalTime.innerText = toHHMMSS(song.duration);
}

function likeButtonClicked() {
  if (sortedPlaylist[index].liked === false) {
    sortedPlaylist[index].liked = true;
  } else {
    sortedPlaylist[index].liked = false;
  }
  likeButtonRender();
  localStorage.setItem("playlist", JSON.stringify(originalPlaylist));
}

initializeSong();
