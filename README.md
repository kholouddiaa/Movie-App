# 🎬 Movie App

A simple movie web application built using **Vanilla JavaScript** and **TMDB API**.
The app displays popular movies, allows searching, and shows movie details like rating, release year, and genres.

---

## Features

*  Display most popular movies
* 🔎 Search for movies
* 🎭 Show movie genres
* ⭐ Display rating with dynamic color styling
* 📅 Show release year only
* 🖼 Movie posters from TMDB

---

## 🛠 Technologies Used

* HTML5
* CSS3
* JavaScript (ES6)
* TMDB API

---

## 📡 API Used

* Discover Movies
* Search Movies
* Movie Genres List

TMDB API Documentation:
[https://developer.themoviedb.org/](https://developer.themoviedb.org/)

---

## 📂 Project Structure

```
movie-app/
│
├── index.html
├── style.css
├── script.js
└── README.md
```

---

## ⚙️ How It Works

1. Fetch genres from TMDB API.
2. Fetch popular movies.
3. Map `genre_ids` to genre names.
4. Dynamically render movies in the DOM.
5. Apply color styling based on rating.

---
## 📦 Installation

1. Clone the repository:

```bash
git clone https://github.com/your-username/movie-app.git
```

2. Open `index.html` in your browser.

---

## 🔑 API Key Notice

This project uses a TMDB API key.
For production projects, it is recommended to:

* Store API keys in environment variables
* Use a backend server to protect your keys
