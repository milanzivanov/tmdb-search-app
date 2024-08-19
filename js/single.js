const moveDetailsElement = document.querySelector("#single-movie-details");
const alertElement = document.querySelector(".alert-message");
const favoriteElement = document.querySelector(".favorite-text");

const apiKey = "43b2ff9473e0da512ad345158a789833";

let currentMovie = {};

window.addEventListener("load", () => {
  getSingleMovie();
});

const getSingleMovie = () => {
  let movieId = sessionStorage.getItem("movieId");

  fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`)
    .then((response) => response.json())
    .then((response) => {
      currentMovie = response;
      populateSingleMovie(response);
    })
    .catch((err) => console.error(err));
};

const populateSingleMovie = (movie) => {
  moveDetailsElement.innerHTML = ``;

  moveDetailsElement.innerHTML += `

        <div class="row g-0">
          <div class="col-md-5">
            <a href="single.html">
              <img src="http://image.tmdb.org/t/p/original/${
                movie.poster_path
              }" alt="" class="img-fluid" />
            </a>
          </div>
          <div class="col-md-7 bg-light">
            <div class="card-body">
              <h3 class=" card-title">Movie name: ${movie.title}</h3>
              <hr />
              <h4 class="card-title mb-3">Relase date: ${
                movie.release_date
              }</h4>
              <h5 class="card-title mb-3">Movie average rating: ${Math.round(
                movie.vote_average
              )}</h5>
              <p class="card-text mb-5">
                  ${movie.overview}
              </p>
              <p class="card-text mb-5"><span class="fw-bold">Genre:</span> ${movie.genres
                .map((genre) => genre.name)
                .join(", ")}</p>
                <hr />

                <div class="d-flex">
                  <button class="btn btn-danger" onClick="addFavoriteMovie(currentMovie)">Add to favorite</button>
                </div>
            </div>
          </div>
        </div>
  `;
};

const addFavoriteMovie = (newMovie) => {
  if (!sessionStorage.getItem("favoriteMovies")) {
    sessionStorage.setItem("favoriteMovies", "[]");
  }

  let favoriteMovies = JSON.parse(sessionStorage.getItem("favoriteMovies"));

  // Check if the movie is already in the list
  const existingMovie = favoriteMovies.find(
    (movie) => movie.id === newMovie.id
  );

  console.log(existingMovie);
  if (existingMovie) {
    alertElement.innerHTML = `<h2 class="text-danger">${newMovie.title} is already in the cart!!!</h2>`;
    return;
  }

  favoriteMovies.push(newMovie);
  sessionStorage.setItem("favoriteMovies", JSON.stringify(favoriteMovies));

  window.location = "movies.html";
};
