let songsData = []; // To hold all song data
let displayedSongs = []; // To keep track of displayed songs
const songsPerPage = 5; // Number of songs to display per page
let currentSongIndex = 0; // Track the current index of displayed songs

// Load the song data from the JSON file
fetch('songs.json')
    .then(response => response.json())
    .then(data => {
        songsData = data;
        loadMoreSongs(); // Load the initial songs
    })
    .catch(error => console.error('Error fetching songs:', error));

// Function to load more songs
function loadMoreSongs() {
    const songList = document.getElementById('songs');
    
    // Load the next set of songs
    for (let i = currentSongIndex; i < currentSongIndex + songsPerPage && i < songsData.length; i++) {
        const song = songsData[i];
        const li = document.createElement('li');
        li.textContent = song.title;
        li.onclick = () => showSongDetails(song);
        songList.appendChild(li);
        displayedSongs.push(song.title);
    }
    
    currentSongIndex += songsPerPage;

    // Hide Load More button if all songs are displayed
    if (currentSongIndex >= songsData.length) {
        document.getElementById('loadMore').style.display = 'none';
    }
}

// Function to display selected song details and scroll smoothly to the lyrics section
function showSongDetails(song) {
    document.getElementById('songTitle').textContent = song.title;
    document.getElementById('songMovie').textContent = song.movie;
    document.getElementById('songReleaseDate').textContent = song.releaseDate;
    document.getElementById('songSingers').textContent = song.singers.join(', ');
    document.getElementById('songComposer').textContent = song.composer;
    document.getElementById('lyricsText').textContent = song.lyrics;

    // Show song details section
    document.getElementById('songDetails').style.display = 'block';

    // Smoothly scroll to the lyrics section
    document.getElementById('songDetails').scrollIntoView({
        behavior: 'smooth',
        block: 'start' // aligns the top of the element with the top of the viewport
    });
}

// Function to search songs
function searchSongs() {
    const query = document.getElementById('searchBar').value.toLowerCase();
    const songList = document.getElementById('songs');
    songList.innerHTML = ''; // Clear the song list
    currentSongIndex = 0; // Reset the index for loading songs

    // Filter songs based on the search query
    const filteredSongs = songsData.filter(song => song.title.toLowerCase().includes(query));

    if (filteredSongs.length > 0) {
        filteredSongs.forEach(song => {
            const li = document.createElement('li');
            li.textContent = song.title;
            li.onclick = () => showSongDetails(song);
            songList.appendChild(li);
        });
    } else {
        // Show random 10 songs if no match is found
        const randomSongs = [];
        while (randomSongs.length < 10 && randomSongs.length < songsData.length) {
            const randomIndex = Math.floor(Math.random() * songsData.length);
            if (!randomSongs.includes(songsData[randomIndex])) {
                randomSongs.push(songsData[randomIndex]);
            }
        }
        randomSongs.forEach(song => {
            const li = document.createElement('li');
            li.textContent = song.title;
            li.onclick = () => showSongDetails(song);
            songList.appendChild(li);
        });
        const noMatchMessage = document.createElement('h2');
        noMatchMessage.textContent = 'No matches found. Try Searching for other keywords.';
        songList.appendChild(noMatchMessage);
    }
}
