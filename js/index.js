const popularMovesElement = document.querySelector("#popular-movies");
const modalElement = document.getElementById("modal-container");

const apiKey = "43b2ff9473e0da512ad345158a789833";

window.addEventListener("load", () => {
  getFavoriteMovies();
});

const getFavoriteMovies = () => {
  fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`)
    .then((response) => response.json())
    .then((response) => {
      console.log(response);

      popularMovesElement.innerHTML = "";

      // if you want to see just 10 movies on the main page I decided to use default 20
      // const popularMovies = response.results.slice(0, 10);

      response.results.forEach((movie) => {
        const modalId = `movieModal-${movie.id}`;

        popularMovesElement.innerHTML += `
        <div class="col mb-3" data-bs-target="#${modalId}" onclick="getSingleMovie(${movie.id})">
          <img src="http://image.tmdb.org/t/p/original/${movie.poster_path}" alt="${movie.title}" class="img-fluid cursor-pointer rounded-3 overflow-hidden shadow-lg" />
        </div>
        `;
      });
    })
    .catch((err) => console.error(err));
};

const getSingleMovie = (movieId) => {
  fetch(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}`)
    .then((response) => response.json())
    .then((response) => {
      const modalId = `movieModal-${movieId}`;
      populateSingleMovie(response, modalId);

      // Initialize and show the modal
      const modal = new bootstrap.Modal(document.getElementById(modalId), {});
      modal.show();
    })
    .catch((err) => console.error(err));
};

const populateSingleMovie = (movie, modalId) => {
  modalElement.innerHTML = ``;

  modalElement.innerHTML += `
    <div class="modal fade" id="${modalId}" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="d-flex flex-column justify-content-start p-3">
            <h1 class="modal-title fs-4" id="exampleModalLabel">${movie.title}</h1>
            <p class="card-text">${movie.release_date}</p>
          </div>
          <div class="modal-body p-0 px-3">
            <img class="img-fluid rounded-2 class="img-fluid cursor-pointer rounded-3 overflow-hidden"" src="http://image.tmdb.org/t/p/original/${movie.poster_path}" alt="${movie.title}" />
          </div>
          <div class="d-flex flex-row justify-content-end p-3">
            <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
  `;
};
