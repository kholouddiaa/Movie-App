const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=";

const IMG_PATH = "https://image.tmdb.org/t/p/w1280";

const SEARCH_API =
  "https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query=";

const API_DETAILS =
  "https://api.themoviedb.org/3/genre/movie/list?api_key=3fd2be6f0c70a2a598f084ddfb75487c";

const TOTAL_PAGES = 500;

const main = document.getElementById("main");
const search = document.getElementById("search");
const pagination = document.getElementById("pagination");

let genresList = [];
let currentBaseUrl = API_URL;

// ================= GET GENRES =================
async function getGenres() {
  const res = await fetch(API_DETAILS);
  const data = await res.json();
  genresList = data.genres;
}

getGenres().then(() => {
  getMovies(API_URL, 1);
});

// ================= GET MOVIES =================
async function getMovies(url, page = 1) {
  currentBaseUrl = url;

  const res = await fetch(url + page);
  const data = await res.json();

  if (data.results && data.results.length > 0) {
    showMovies(data.results);
    pagination.style.display = "block";
    fetchPagination(data.page);
  } else {
    const notFoundDiv = document.createElement("div");
    notFoundDiv.innerHTML = `<h1>There are no movies to display!<h1>`;
    main.appendChild(notFoundDiv);
    pagination.style.display = "none";
  //  remove search results from main
 search.style.display = "none";
  }
}

// ================= SHOW MOVIES =================
function showMovies(movies) {
  main.innerHTML = "";

  movies.forEach((movie) => {
    const {
      title,
      poster_path,
      vote_average,
      overview,
      release_date,
      genre_ids,
    } = movie;

    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");

    movieEl.innerHTML = `
      <img src="${IMG_PATH + poster_path}" alt="${title}">
      <div class="movie-info">
        <h3>${title}</h3>

        <div class="genres">
          ${getGenreNames(genre_ids)}
        </div>

         <h3>${release_date.split("-")[0]}</h3>
        <span class="${getClassByRate(vote_average)}">
          ${vote_average.toFixed(1)}
        </span>
      </div>

      <div class="overview">
        <h3>Overview</h3>
        ${overview}
      </div>
    `;

    main.appendChild(movieEl);
  });
}

// ================= GENRE NAMES =================
function getGenreNames(ids) {
  return ids
    .map((id) => {
      const genre = genresList.find((g) => g.id === id);
      return genre ? `<span class="genre">${genre.name}</span>` : "";
    })
    .join("");
}

// ================= RATING COLOR =================
function getClassByRate(vote) {
  if (vote >= 8) return "green";
  if (vote >= 5) return "orange";
  return "red";
}

// ================= PAGINATION =================
function fetchPagination(currentPage) {
  const paginationList = document.querySelector("#pagination ul");
  paginationList.innerHTML = "";

  let start = Math.max( 1, currentPage - 5) ;
  let end = Math.min(TOTAL_PAGES, currentPage + 5);
  let previousPage = currentPage - 1;
  let nextPage = currentPage + 1;

  if (currentPage - 5 > 1) {
    paginationList.innerHTML += `
      <li class="page-item">
        <a class="page-link" href="#" onclick="getMovies('${currentBaseUrl}', 1)">First</a>
      </li>`;
  } 
  // ===== PREVIOUS =====
  if (currentPage > 1) {
    paginationList.innerHTML += `
      <li class="page-item">
        <a class="page-link" href="#" onclick="getMovies('${currentBaseUrl}', ${previousPage})">Prev</a>
      </li>`;
  }


  for (let i = start; i <= end; i++) {
    paginationList.innerHTML += `
      <li class="page-item ${i == currentPage ? "active" : ""}">
        <a class="page-link" href="#" onclick="getMovies('${currentBaseUrl}', ${i})">${i}</a>
      </li>`;
  }
// ===== NEXT =====
  if (currentPage < TOTAL_PAGES) {
    paginationList.innerHTML += `
      <li class="page-item">
        <a class="page-link" href="#" onclick="getMovies('${currentBaseUrl}', ${nextPage})">Next</a>
      </li>`;
  }

  if (currentPage < TOTAL_PAGES) {
    paginationList.innerHTML += `
      <li class="page-item">
        <a class="page-link" href="#" onclick="getMovies('${currentBaseUrl}', ${TOTAL_PAGES})">Last</a>
      </li>`;
  }
}

// ================= SEARCH =================
search.addEventListener("input", (e) => {
  const searchTerm = search.value;

  if (searchTerm) {
    getMovies(SEARCH_API + searchTerm);
  } else {
    window.location.reload();
  }

});