const movieSearchElement = document.querySelector("#movies-search");
const alertElement = document.querySelector("#alert-text");

const movieTextSearchElement = document.querySelector("#movie-text-search");
const searchBtnElement = document.querySelector("#search-btn");

const apiKey = "43b2ff9473e0da512ad345158a789833";

window.addEventListener("load", () => {
  getMovies();
});

const getMovies = () => {
  fetch(`https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`)
    .then((response) => response.json())
    .then((response) => {
      populateMovies(response.results);
    })
    .catch((err) => console.error(err));
};

const populateMovies = (movies) => {
  movieSearchElement.innerHTML = "";

  movies.forEach((movie) => {
    movieSearchElement.innerHTML += `
        <div class="col mb-3">
          <a onclick="getSingleMovie(${movie.id})">
            <img src="http://image.tmdb.org/t/p/original/${movie.poster_path}" alt="${movie.title}" class="img-fluid cursor-pointer rounded-3 overflow-hidden shadow-lg" />
          </a>
        </div>
    `;
  });
};

const getSingleMovie = (movieId) => {
  sessionStorage.setItem("movieId", movieId);
  window.location = "single.html";
};

searchBtnElement.addEventListener("click", (event) => {
  event.preventDefault();

  let inputMovie = movieTextSearchElement.value;

  if (!inputMovie || inputMovie.trim() === "") {
    alertElement.innerText = "Please enter a movie name!!!";
    return;
  } else {
    alertElement.innerText = "Search for your favorite movies";
  }

  fetch(
    `https://api.themoviedb.org/3/search/movie?query=${inputMovie}&api_key=${apiKey}`
  )
    .then((response) => response.json())
    .then((response) => {
      populateMovies(response.results);
    })
    .catch((err) => console.error(err));
});
