const songs = [
  { title: "Ava", artist: "Famy", src: "music/FAMY - Ava.mp3", cover: "covers/ava.jpeg" },
  { title: "Pink + White", artist: "Frank Ocean", src: "music/Frank Ocean - Pink & White.mp3", cover: "covers/pink.jpeg" },
  { title: "Wicked Game", artist: "Chris Isaak", src: "music/Chris Isaak - Wicked Game (Remastered).mp3", cover: "covers/wicked.jpeg" },
  { title: "City of Stars", artist: "Ryan Gosling & Emma Stone", src: "music/Ryan Gosling & Emma Stone - City of Stars (OST La La Land).mp3", cover: "covers/city.jpeg" },
  { title: "Садагам", artist: "Каныкей", src: "music/Каныкей - Садагам (.org).mp3", cover: "covers/садагам.jpg" },
  { title: "Сердце", artist: "passmurny", src: "music/passmurny - Сердце.mp3", cover: "covers/сердце.jpg" },
  { 
  title: "Reserved seat (musmore.org)", 
  artist: "Hyukoh", 
  src: "music/Hyukoh_-_Reserved_seat__(musmore.org).mp3", 
  cover: "covers/reserved.jpg" 
},
  { title: "Стыцамэн", artist: "Иван Дорн", src: "music/Иван Дорн - Стыцамэн.mp3", cover: "covers/иван.jpg" },
  { title: "NBA", artist: "Rsac", src: "music/Rsac - NBA.mp3", cover: "covers/nba.jpg" },
   { title: "Tous Les Memes", artist: "Stromae", src: "music/Stromae - Tous Les Memes.mp3", cover: "covers/stromae.jpg" },
  { title: "Born to Die", artist: "Lana Del Rey", src: "music/Lana Del Rey - Born to Die.mp3", cover: "covers/borntodie.jpg" },
  { title: "Sea Lion", artist: "Sage Francis", src: "music/Sage Francis - Sea Lion.mp3", cover: "covers/sealion.jpg" },
  { title: "The Usual", artist: "Shannon Jae Prior", src: "music/Shannon Jae Prior - The Usual (OST Мажор 3).mp3", cover: "covers/theusual.jpg" },
  { title: "Bonnie and Clyde", artist: "Brigitte Bardot", src: "music/Brigitte Bardot - Bonnie and Clyde.mp3", cover: "covers/bonnieandclyde.jpg" },
  { title: "Sweet Dreams", artist: "Eurythmics", src: "music/Eurythmics - Sweet Dreams.mp3", cover: "covers/sweetdreams.jpg" },
  { title: "Love", artist: "Lana Del Rey", src: "music/Lana Del Rey - Love (1).mp3", cover: "covers/love.jpg" },
  { title: "Ma Meilleure Ennemie", artist: "Stromae & Pomme", src: "music/Stromae & Pomme - Ma Meilleure Ennemie.mp3", cover: "covers/ennemie.jpg" },
  { title: "Its ok", artist: "Tom Rosenthal", src: "music/Tom Rosenthal - Its ok.mp3", cover: "covers/itsok.jpg" },
  { title: "505", artist: "Arctic Monkeys", src: "music/Arctic Monkeys - 505.mp3", cover: "covers/505.jpg" },
  { title: "She's My Collar", artist: "Gorillaz", src: "music/Gorillaz - She's My Collar.mp3", cover: "covers/gorillaz.jpg" },
  { title: "Vermissen", artist: "Juju ft. Henning May", src: "music/Juju ft. Henning May - Vermissen.mp3", cover: "covers/vermissen.jpg" },
  { title: "The Last Day", artist: "Moby feat. Skylar Grey & Darlingside", src: "music/Moby feat. Skylar Grey & Darlingside - The Last Day.mp3", cover: "covers/day.jpg" },
  { title: "California Dreaming", artist: "The Mamas & The Papas", src: "music/The Mamas & The Papas - California Dreaming.mp3", cover: "covers/california.jpg" },
  { title: "We Don't Talk Anymore", artist: "Charlie Puth feat Selena Gomez", src: "music/Charlie Puth feat Selena Gomez - We Don't Talk Anymore.mp3", cover: "covers/wedont.jpg" }
];

let currentSong = Number(localStorage.getItem('currentSongIndex')) || 0;

const audio = document.getElementById("audio");
const title = document.getElementById("title");
const artist = document.getElementById("artist");
const cover = document.getElementById("cover");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const progress = document.getElementById("progress");

const repeatBtn = document.getElementById("repeat");
const shuffleBtn = document.getElementById("shuffle");
const muteBtn = document.getElementById("mute");
const volume = document.getElementById("volume");

let repeatMode = 0;

function loadSong(index) {
  const song = songs[index];
  title.textContent = song.title;
  artist.textContent = song.artist;
  cover.src = song.cover;
  audio.src = song.src;
}

function playSong() {
  audio.play();
  playBtn.textContent = "⏸";
  cover.classList.add("rotate");
}

function pauseSong() {
  audio.pause();
  playBtn.textContent = "▶";
  cover.classList.remove("rotate");
}

function togglePlay() {
  audio.paused ? playSong() : pauseSong();
}

function prevSong() {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  localStorage.setItem('currentSongIndex', currentSong);
  loadSong(currentSong);
  playSong();
}

function nextSong() {
  if (shuffleBtn.classList.contains("active")) {
    currentSong = Math.floor(Math.random() * songs.length);
  } else {
    currentSong = (currentSong + 1) % songs.length;
  }
  localStorage.setItem('currentSongIndex', currentSong);
  loadSong(currentSong);
  playSong();
}

audio.addEventListener("timeupdate", () => {
  const progressPercent = (audio.currentTime / audio.duration) * 100;
  progress.value = progressPercent || 0;
});

progress.addEventListener("input", () => {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

audio.onended = () => {
  if (repeatMode === 2) {
    audio.currentTime = 0;
    audio.play();
  } else if (repeatMode === 1) {
    nextSong();
  } else {
    nextSong();
  }
};

repeatBtn.onclick = () => {
  repeatMode = (repeatMode + 1) % 3;
  if (repeatMode === 0) repeatBtn.textContent = "🔁";
  if (repeatMode === 1) repeatBtn.textContent = "🔂";
  if (repeatMode === 2) repeatBtn.textContent = "🔂1";
};

shuffleBtn.onclick = () => {
  shuffleBtn.classList.toggle("active");
};

muteBtn.onclick = () => {
  audio.muted = !audio.muted;
  muteBtn.textContent = audio.muted ? "🔈" : "🔇";
};

volume.oninput = () => {
  audio.volume = volume.value;
};

audio.addEventListener("error", () => {
  console.error("Не удалось загрузить файл:", audio.src);
});

playBtn.addEventListener("click", togglePlay);
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);

loadSong(currentSong);

function addToPlaylist(index) {
  let playlist = JSON.parse(localStorage.getItem('myPlaylist')) || [];
  const song = songs[index];
  if (!playlist.find(s => s.src === song.src)) {
    playlist.push(song);
    localStorage.setItem('myPlaylist', JSON.stringify(playlist));
    alert(`${song.title} добавлена в плейлист!`);
  } else {
    alert(`${song.title} уже в плейлисте!`);
  }
}

const addPlaylistBtn = document.createElement('button');
addPlaylistBtn.textContent = "Добавить в плейлист";
addPlaylistBtn.style.marginTop = "10px";
addPlaylistBtn.onclick = () => addToPlaylist(currentSong);
document.querySelector('.player').appendChild(addPlaylistBtn);

// ===================== Добавляем кнопку "Избранное" =====================
const favoriteBtn = document.createElement('button');
favoriteBtn.textContent = "🤍"; // пустое сердечко
favoriteBtn.style.marginTop = "10px";
favoriteBtn.style.fontSize = "1.5em";
favoriteBtn.style.background = "transparent";
favoriteBtn.style.border = "none";
favoriteBtn.style.cursor = "pointer";

favoriteBtn.onclick = () => {
  const track = {
    title: title.textContent,
    artist: artist.textContent,
    cover: cover.src
  };

  let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
  const exists = favorites.some(fav => fav.title === track.title && fav.artist === track.artist);

  if(!exists){
    favorites.push(track);
    localStorage.setItem('favorites', JSON.stringify(favorites));
    favoriteBtn.textContent = '❤️';
    alert('Трек добавлен в избранное!');
  } else {
    alert('Этот трек уже в избранном!');
  }
};

document.querySelector('.player').appendChild(favoriteBtn);


// элементы прогресс-бара
const circle = document.querySelector(".progress-bar");
const length = 2 * Math.PI * 110; // радиус 110 — как в SVG
circle.style.strokeDasharray = length;

// отображение времени
const timeDisplay = document.getElementById("time");

// обновление прогресса
audio.addEventListener("timeupdate", () => {
  if (!audio.duration) return;

  const percent = audio.currentTime / audio.duration;
  const offset = length - percent * length;
  circle.style.strokeDashoffset = offset;

  let cur = formatTime(audio.currentTime);
  let dur = formatTime(audio.duration);
  timeDisplay.textContent = `${cur} / ${dur}`;
});

function formatTime(sec) {
  sec = Math.floor(sec);
  let m = Math.floor(sec / 60);
  let s = sec % 60;
  return `${m.toString().padStart(2,"0")}:${s.toString().padStart(2,"0")}`;
}

// Переход на страницу исполнителей
const goArtists = document.getElementById("go-artists");
if (goArtists) {
  goArtists.onclick = () => {
    window.location.href = "artists.html";
  };
}
