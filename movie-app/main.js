const apiKey = 'e5f1c226d046e7079f181017e44ca5b8';

async function fetchMovies(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data.results;
}

async function loadDefaultMovies() {
    const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`
    const movies = await fetchMovies(url);
    displayMovies(movies);
}

async function searchMovies() {
    const query = document.getElementById('search').value;
    const searchUrl = query.trim() === ''
        ?`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`
        : `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`;
    const movies = await fetchMovies(searchUrl);
    displayMovies(movies);
}

function displayMovies(movies) {
    const gallery = document.querySelector('.gallery');
    gallery.innerHTML = '';

    movies.slice(0,12).forEach(movie => {
        const movieBlock = document.createElement('div');
        movieBlock.classList.add('movie');
        movieBlock.innerHTML = `
            <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}">
            <div class="movie-data">
                <h3>${movie.title}</h3>
                <div class="rating">
                    <span>&#9733;</span> ${movie.vote_average}
                </div>
            </div>
            <div class="description">
                <h4>Overview</h4>
                <p>${movie.overview}</p>
            </div>
        `;
        gallery.appendChild(movieBlock);
    });
}

document.getElementById('search').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        searchMovies();
    }
});

loadDefaultMovies();