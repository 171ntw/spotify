document.addEventListener('DOMContentLoaded', () => {
    const searchBar = document.getElementById('search-bar');
    const searchResults = document.getElementById('search-results');
    const audioPlayer = document.createElement('audio');
    const playPauseButton = document.getElementById('play-pause');
    const prevButton = document.getElementById('prev');
    const nextButton = document.getElementById('next');
    const volumeControl = document.getElementById('volume');
    const songTitle = document.getElementById('song-title');
    const songArtist = document.getElementById('song-artist');
    const currentTimeElement = document.getElementById('current-time');
    const totalTimeElement = document.getElementById('total-time');

    const songs = [
        { title: 'TERMINEI COM A EX - Mc Rick', artist: 'MC Rick', src: 'music/terminei.mp3' },
        { title: 'SÓ FÉ', artist: 'É O Grelo', src: 'music/sofe.mp3' },
        { title: 'Arrasta Pra Cima', artist: 'DDP Diretoria', src: 'music/arrasta.mp3' }
    ];

    let currentSongIndex = -1;

    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
    }

    function updateCurrentTime() {
        const currentTime = audioPlayer.currentTime;
        currentTimeElement.textContent = formatTime(currentTime);
    }

    function updateTotalTime() {
        const duration = audioPlayer.duration;
        totalTimeElement.textContent = formatTime(duration);
    }

    function playSong(index) {
        const song = songs[index];
        audioPlayer.src = song.src;
        audioPlayer.play();
        songTitle.textContent = song.title;
        songArtist.textContent = song.artist;
        playPauseButton.innerHTML = `<i class='bx bx-pause'></i>`;

        audioPlayer.addEventListener('timeupdate', updateCurrentTime);
        audioPlayer.addEventListener('loadedmetadata', updateTotalTime);

        currentSongIndex = index;
    }

    function updateResults(query) {
        searchResults.innerHTML = '';
        const results = songs.filter(song =>
            song.title.toLowerCase().includes(query.toLowerCase())
        );

        if (results.length === 0) {
            searchResults.innerHTML = '<p>No results found</p>';
            return;
        }

        results.forEach(song => {
            const resultItem = document.createElement('div');
            resultItem.classList.add('result-item');
            resultItem.dataset.src = song.src;

            resultItem.innerHTML = `
                <div>
                    <h3>${song.title}</h3>
                    <p>${song.artist}</p>
                </div>
            `;

            resultItem.addEventListener('click', () => {
                const selectedSongIndex = songs.findIndex(s => s.src === song.src);
                playSong(selectedSongIndex);
            });

            searchResults.appendChild(resultItem);
        });
    }

    searchBar.addEventListener('input', (e) => {
        updateResults(e.target.value);
    });

    playPauseButton.addEventListener('click', () => {
        if (audioPlayer.paused && currentSongIndex !== -1) {
            audioPlayer.play();
            playPauseButton.innerHTML = `<i class='bx bx-pause'></i>`;
        } else {
            audioPlayer.pause();
            playPauseButton.innerHTML = `<i class='bx bx-play'></i>`;
        }
    });

    prevButton.addEventListener('click', () => {
        if (currentSongIndex > 0) {
            playSong(currentSongIndex - 1);
        }
    });

    nextButton.addEventListener('click', () => {
        if (currentSongIndex < songs.length - 1) {
            playSong(currentSongIndex + 1);
        }
    });

    volumeControl.addEventListener('input', (e) => {
        audioPlayer.volume = e.target.value / 100;
    });
});
