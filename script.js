const API_URL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1";
const IMG_PATH = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query=';
const API_DeTAILS = 'https://api.themoviedb.org/3/genre/movie/list?api_key=3fd2be6f0c70a2a598f084ddfb75487c';

const main = document.getElementById("main");
const search = document.getElementById("search"); 
// Create an empty array to store genres
let genresList = [];
async function getGenres() {
  const res = await fetch(API_DeTAILS );
  const data = await res.json();
  genresList = data.genres; // Store genres in the array
  console.log(genresList); // Log genres to verify
}
getGenres().then(() => {
  getMovies(API_URL);
});
async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();
  console.log(data);
console.log(res);
  showMovies(data.results);
}

function getGenreNames(ids) {
  return ids
    .map(id => {
      const genre = genresList.find(g => g.id === id);
      return genre ? `<span class="genre">${genre.name}</span>` : "";
    })
    .join("");
}


function showMovies(movies) {
  main.innerHTML = "";


  movies.forEach((movie) => {
    const { title, poster_path, vote_average, overview, release_date, genre_ids } = movie;

    const movieEl = document.createElement("div");
    movieEl.classList.add("movie");

    movieEl.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="${title}"   >
            <div class="movie-info">
          <h3>${title}  </h3>
        <div class="genres">
             ${getGenreNames(genre_ids)}
              </div>
          <h3>${release_date.split("-")[0]}</h3>
          <span class="${getClassByRate(vote_average)}">${vote_average.toFixed(1)}</span>
            </div>
            <div class="overview">
          <h3>Overview</h3>
          ${overview}
        </div>
        `;

    main.appendChild(movieEl);
  });
}


// function getClassByRate uses a switch statement to determine the class name based on the vote average. 

function getClassByRate(vote) {
  switch (true) {    case vote >= 8:
      return "green";
    case vote >= 5:
      return "orange";
    default:
      return "red";
  }
}

search.addEventListener("input", (e) => {
  const searchTerm = search.value;

  if (searchTerm) {
    getMovies(SEARCH_API + searchTerm);
  } else {
    window.location.reload();
  }
});
