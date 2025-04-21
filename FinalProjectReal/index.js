const searchInput = document.getElementById("search-text");
const movieButton = document.getElementById("movie-button");
const tvButton = document.getElementById("tv-button");
const personButton = document.getElementById("person-button");

const menuIcon = document.getElementById("menu-icon");
const navMenu = document.getElementById("nav-menu");

const movieInfoContent = document.getElementById("movie-info-content");
const tvInfoContent = document.getElementById("tv-info-content");
const personInfoContent = document.getElementById("person-info-content");

const searchMode = document.getElementById("search-mode");
const searchButton = document.getElementById("search-button");
 
menuIcon.addEventListener("click", () => {
    navMenu.classList.toggle("show");
});

searchMode.addEventListener("change", () => {
    const mode = searchMode.value;
    filterContentByMode(mode);
});


function filterContentByMode(mode) {

    movieInfoContent.parentElement.style.display = "none";
    tvInfoContent.parentElement.style.display = "none";
    personInfoContent.parentElement.style.display = "none";

 
    if (mode === "movie") {
        movieInfoContent.parentElement.style.display = "block";
    } else if (mode === "tv") {
        tvInfoContent.parentElement.style.display = "block";
    } else if (mode === "person") {
        personInfoContent.parentElement.style.display = "block";
    } else if (mode === "all") {
        movieInfoContent.parentElement.style.display = "block";
        tvInfoContent.parentElement.style.display = "block";
        personInfoContent.parentElement.style.display = "block";
    }
}

searchButton.addEventListener("change", () => {
    const query = searchInput.value.trim(); 
    const mode = searchMode.value;

   
    if (mode === "movie") {
        window.location.href="movies.html";
    } else if (mode === "tv") {
        window.location.href="tv.html";
    } else if (mode === "person") {
        window.location.href="people.html";
    } else if (mode === "all") {
        window.location.href="index.html";
    }
});


searchMode.addEventListener("change", () => {
    const mode = searchMode.value;


    if (mode === "movie") {
        window.location.href = "movies.html";
    } else if (mode === "tv") {
        window.location.href = "tv.html";
    } else if (mode === "person") {
        window.location.href = "people.html";
    } else if (mode === "all") {
        window.location.href = "index.html";
    }
});


searchButton.addEventListener("click", () => {
    const query = searchInput.value.trim(); 
    const mode = searchMode.value; 

    
    if (mode === "movie") {
        window.location.href = `movies.html?query=${query}`;
    } else if (mode === "tv") {
        window.location.href = `tv.html?query=${query}`;
    } else if (mode === "person") {
        window.location.href = `people.html?query=${query}`;
    } else if (mode === "all") {
     s
 
        movieInfoContent.innerHTML = "";
        tvInfoContent.innerHTML = "";
        personInfoContent.innerHTML = "";


        movieSearch(query, 1)
            .then(result => {
                displayMovies(result.results);
                addTileClickListeners(); 

            })
            .catch(error => console.error("Error fetching movies:", error));

 
        tvSearch(query, 1)
            .then(result => {
                displayTVShows(result.results);
                addTileClickListeners(); 
            })
            .catch(error => console.error("Error fetching TV shows:", error));

 
        peopleSearch(query, 1)
            .then(result => {
                displayPeople(result.results);
                addTileClickListeners(); 
            })
            .catch(error => console.error("Error fetching people:", error));
    }
});

function searchEventListeners(element) {
    element.addEventListener("click", e => {
        console.log(searchInput.value);
        e.preventDefault();
        window.location.href = `${element.href}?query=${searchInput.value}`;
    });
}

searchEventListeners(movieButton);
searchEventListeners(tvButton);
searchEventListeners(personButton);


function addTileClickListeners() {
 
    const movieTiles = document.querySelectorAll(".movie-item");
    movieTiles.forEach(tile => {
        tile.addEventListener("click", () => {
            const movieId = tile.dataset.movieId; 
            if (movieId) {
                window.location.href = `movie.html?id=${movieId}`; 
            }
        });
    });

  
    const tvTiles = document.querySelectorAll(".tv-item");
    tvTiles.forEach(tile => {
        tile.addEventListener("click", () => {
            const tvId = tile.dataset.tvId; 
            if (tvId) {
                window.location.href = `series.html?id=${tvId}`; 
            }
        });
    });


    const personTiles = document.querySelectorAll(".person-item");
    personTiles.forEach(tile => {
        tile.addEventListener("click", () => {
            const personId = tile.dataset.personId; 
            if (personId) {
                window.location.href = `person.html?id=${personId}`; 
            }
        });
    });
}



moviePopular()
    .then(result => {
        displayMovies(result.results);
        addTileClickListeners(); 
    })
    .catch(error => console.log(error));


tvPopular()
    .then(result => {
        displayTVShows(result.results);
        addTileClickListeners();
    })
    .catch(error => console.log(error));


peoplePopular()
    .then(result => {
        displayPeople(result.results);
        addTileClickListeners(); 
    })
    .catch(error => console.log(error));


function displayMovies(movies) {
    movieInfoContent.innerHTML = "";
    movies.forEach(movie => {
        const posterPath = movie.poster_path;
        if (posterPath) {
            const movieDiv = document.createElement("div");
            movieDiv.classList.add("movie-item");
            movieDiv.dataset.movieId = movie.id; 

            const img = document.createElement("img");
            img.src = `${imgUrl}w200${posterPath}`;
            img.alt = movie.title;
            img.classList.add("movie-poster");

            const title = document.createElement("h3");
            title.textContent = movie.title;

            const releaseYear = document.createElement("p");
            releaseYear.textContent = `Release Year: ${new Date(movie.release_date).getFullYear()}`;
            releaseYear.classList.add("release-year");

            const voteAverage = document.createElement("p");
            voteAverage.textContent = `Rating: ${movie.vote_average}`;
            voteAverage.classList.add("vote-average");

            movieDiv.appendChild(img);
            movieDiv.appendChild(title);
            movieDiv.appendChild(releaseYear);
            movieDiv.appendChild(voteAverage);
            movieInfoContent.appendChild(movieDiv);
        }
    });
}


function displayTVShows(tvShows) {
    tvInfoContent.innerHTML = ""; 
    tvShows.forEach(tvShow => {
        const posterPath = tvShow.poster_path;
        if (posterPath) {
            const tvDiv = document.createElement("div");
            tvDiv.classList.add("tv-item");
            tvDiv.dataset.tvId = tvShow.id; 

            const img = document.createElement("img");
            img.src = `${imgUrl}w200${posterPath}`;
            img.alt = tvShow.name;
            img.classList.add("tv-poster");

            const title = document.createElement("h3");
            title.textContent = tvShow.name;

            const firstAired = document.createElement("p");
            firstAired.textContent = `First Aired: ${new Date(tvShow.first_air_date).toLocaleDateString()}`;
            firstAired.classList.add("first-aired");

            const voteAverage = document.createElement("p");
            voteAverage.textContent = `Rating: ${tvShow.vote_average.toFixed(1)}`;
            voteAverage.classList.add("vote-average");

            tvDiv.appendChild(img);
            tvDiv.appendChild(title);
            tvDiv.appendChild(firstAired);
            tvDiv.appendChild(voteAverage);
            tvInfoContent.appendChild(tvDiv);
        }
    });


}

function displayPeople(people) {
    personInfoContent.innerHTML = ""; 
    people.forEach(person => {
        const profilePath = person.profile_path;
        if (profilePath) {
            const personDiv = document.createElement("div");
            personDiv.classList.add("person-item");
            personDiv.dataset.personId = person.id; 

            const img = document.createElement("img");
            img.src = `${imgUrl}w200${profilePath}`;
            img.alt = person.name;
            img.classList.add("person-profile");

            const name = document.createElement("h3");
            name.textContent = person.name;

            personDiv.appendChild(img);
            personDiv.appendChild(name);
            personInfoContent.appendChild(personDiv);
        }
    });
}