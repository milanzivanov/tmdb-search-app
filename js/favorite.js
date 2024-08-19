const favoriteMoviesElement = document.querySelector("#favorite-movies");

window.addEventListener("load", () => {
  populateFavoriteMovies();
});

const populateFavoriteMovies = () => {
  if (!sessionStorage.getItem("favoriteMovies")) {
    sessionStorage.setItem("favoriteMovies", "[]");
  }

  let favoriteMovies = JSON.parse(sessionStorage.getItem("favoriteMovies"));

  favoriteMoviesElement.innerHTML = "";

  favoriteMovies.forEach((movie, index) => {
    favoriteMoviesElement.innerHTML += `
          <div class=" col mb-3">
            <a href="#" class="d-block mb-3">
              <img src="http://image.tmdb.org/t/p/original/${movie.poster_path}" alt="${movie.title}" class="img-fluid rounded-3 overflow-hidden shadow-lg" />
            </a>
            <button class="btn btn-danger mt-1" onClick="removeFavoriteMovie(${index})">Remove</button>    
          </div>
    `;
  });
};

const removeFavoriteMovie = (movieId) => {
  let favoriteMovies = JSON.parse(sessionStorage.getItem("favoriteMovies"));

  favoriteMovies.splice(movieId, 1);

  sessionStorage.setItem("favoriteMovies", JSON.stringify(favoriteMovies));

  populateFavoriteMovies();
};
