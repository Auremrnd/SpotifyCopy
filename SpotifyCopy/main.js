const cover = document.getElementById("capa");
const songName = document.getElementById("nome-musica");
const bandName = document.getElementById("nome-banda");
const song = document.getElementById("musica");
const playPause = document.getElementById("playPause");
const previous = document.getElementById("previous");
const next = document.getElementById("next");
const currentProgress = document.getElementById("progresso-atual");
const progressContainer = document.getElementById("progress-container");

playPause.addEventListener("click", playSong);
previous.addEventListener("click", previousSong);
next.addEventListener("click", nextSong);
song.addEventListener("timeupdate", updateProgressBar);
progressContainer.addEventListener("click", jumpTo);

const ruMine = {
  songName: "R U Mine",
  artist: "Arctic Monkeys",
  file: "r_u_mine",
};

const Arabella = {
  songName: "Arabella",
  artist: "Arctic Monkeys",
  file: "arabella",
};

const WannaKnow = {
  songName: "Do I Wanna Know",
  artist: "Arctic Monkeys",
  file: "DoIwannaKnow",
};

const playlist = [ruMine, Arabella, WannaKnow];
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

function initializeSong() {
  cover.src = `imagens/${playlist[index].file}.jpg`;
  song.src = `musicas/${playlist[index].file}.mp3`;
  songName.innerText = playlist[index].songName;
  bandName.innerText = playlist[index].artist;
}

function previousSong() {
  if (index === 0) {
    index = playlist.length - 1;
  } else {
    index -= 1;
  }
  initializeSong();
  playSong();
}

function nextSong() {
  if (index === playlist.length - 1) {
    index = 0;
  } else {
    index += 1;
  }
  initializeSong();
  playSong();
}

function updateProgressBar() {
  const barWidth = (song.currentTime / song.duration) * 100;
  currentProgress.style.setProperty("--progress", `${barWidth}%`);
}

function jumpTo(event) {
  const width = progressContainer.clientWidth;
  const clickPosition = event.offsetX;
  const jumpToTime = (clickPosition / width) * song.duration;
  song.currentTime = jumpToTime;
}

initializeSong();
