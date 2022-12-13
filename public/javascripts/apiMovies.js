//Initial Values
const API_KEY = 'd4ab18babcdd1d6b168bf1808f78a08b';

const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

const url = 'http://api.themoviedb.org/3/search/movie?api_key=d4ab18babcdd1d6b168bf1808f78a08b';




//Selecting elements from the DOM
const buttonElement = document.querySelector('#search');
const inputElement = document.querySelector('#inputValue');
const movieSearchable = document.querySelector('#movies-searchable');






function movieSection (movies) {
    return movies.map((movie) => {
        if (movie.poster_path) {
            return `<img 
                src=${IMAGE_URL + movie.poster_path}
                data-movie-id=${movie.id}
            />`;
        }
    })
}



//Creating how to show the movies the user search
function createMovieContainer(movies) {
    const movieElement = document.createElement('div');
    movieElement.setAttribute('class', 'movie');

    //the class='content' is not relevant unless you trying to show the movie when you click on it
    const movieTemplate = `
        <section class="section">
            ${movieSection(movies)}
        </section>
        <div class="content">
            <p id="content-close">X</p>
        </div>
    `;

    movieElement.innerHTML = movieTemplate;
    return movieElement;
}

function renderSearchMovies(data) {
    //data.result[]
    movieSearchable.innerHTML = '';
    const movies = data.results;
    const movieBlock = createMovieContainer(movies);
    movieSearchable.appendChild(movieBlock);
    console.log('Data: ', data);
}

buttonElement.onclick = (event) => {
    event.preventDefault();
    const value = inputElement.value;

    const newUrl = url + '&query=' + value;

    fetch(newUrl)
        .then((res) => res.json())
        .then(renderSearchMovies)
        .catch((e) => {
            console.log('Error: ', e)
        });
        inputElement.value = '';
    console.log('Value: ', value);
}

//Event Delegation
document.onclick = (event) => {
    const target = event.target;
    if (target.tagName.toLowerCase() === 'img') {
        const movieId = target.dataset.movieId;
        console.log('Movie Id: ', movieId);
        console.log('Hello World')
    }
}