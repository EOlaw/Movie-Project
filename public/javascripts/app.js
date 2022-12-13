//Initial Values
const API_KEY = 'd4ab18babcdd1d6b168bf1808f78a08b';

const IMAGE_URL = 'https://image.tmdb.org/t/p/w500';

const url = 'http://api.themoviedb.org/3/search/movie?api_key=d4ab18babcdd1d6b168bf1808f78a08b';




//Selecting elements from the DOM
const buttonElement = document.querySelector('#search');
const inputElement = document.querySelector('#inputValue');
const movieSearchable = document.querySelector('#movies-searchable');



function generateUrl(path) {
    const url = `http://api.themoviedb.org/3${path}?api_key=d4ab18babcdd1d6b168bf1808f78a08b`;
    return url;
}


















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
        <div class="content content-display">
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
//Search feature
buttonElement.onclick = (event) => {
    event.preventDefault();
    const value = inputElement.value;
    const path = '/search/movie'
    const newUrl = generateUrl(path) + '&query=' + value;

    fetch(newUrl)
        .then((res) => res.json())
        .then(renderSearchMovies)
        .catch((e) => {
            console.log('Error: ', e)
        });
        inputElement.value = '';
    console.log('Value: ', value);
}


//To create movie videos
function createIframe(video) {
    const iframe = document.createElement('iframe');
    iframe.src = `https://www.youtube.com/embed/${video.key}`;
    iframe.width = 360;
    iframe.height = 315;
    iframe.allowFullscreen = true;

    return iframe;
}


function createVideoTemplate(data, content) {
    //TODO 
                //diplay movie videos
                content.innerHTML = '<p id="content-close">X</p>'
                console.log('Videos: ', data);
                const videos = data.results;
                const length = videos.length > 4 ? 4 : videos.length;
                const iframeContainer = document.createElement('div');

                for (let i = 0; i < length; i++) {
                    const video = videos[i]; //video
                    const iframe = createIframe(video);
                    iframeContainer.appendChild(iframe);
                    content.appendChild(iframeContainer) //where to put the movie
                }
}



//Event Delegation
document.onclick = (event) => {
    const target = event.target;
    if (target.tagName.toLowerCase() === 'img') {
        const movieId = target.dataset.movieId;
        console.log('Movie Id: ', movieId);
        const section = event.target.parentElement; //section
        const content = section.nextElementSibling; //content
        content.classList.add('content-display');
        
        const path = `/movie/${movieId}/videos`;
        const url = generateUrl(path);
        //fetch movie videos
        fetch (url)
            .then((res) => res.json())
            .then((data) => createVideoTemplate(data, content))
            .catch((e) => {
                console.log('Error: ', e)
            });

    }

    if (target.id === 'content-close)') {
        const content = target.parentElement;
        content.classList.remove('content-display');
    }
}