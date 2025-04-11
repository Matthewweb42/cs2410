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
//test 
// Toggle navigation menu
menuIcon.addEventListener("click", () => {
    navMenu.classList.toggle("show");
});

// Add event listener to the search mode dropdown
searchMode.addEventListener("change", () => {
    const mode = searchMode.value;
    filterContentByMode(mode);
});

// Function to filter content based on the selected mode
function filterContentByMode(mode) {
    // Hide all sections initially
    movieInfoContent.parentElement.style.display = "none";
    tvInfoContent.parentElement.style.display = "none";
    personInfoContent.parentElement.style.display = "none";

    // Show the relevant section based on the selected mode
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

// Add event listener to the search button
searchButton.addEventListener("change", () => {
    const query = searchInput.value.trim(); // Get the search term
    const mode = searchMode.value; // Get the selected mode

    // Perform the search based on the selected mode
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

// Add event listener to the search mode dropdown
searchMode.addEventListener("change", () => {
    const mode = searchMode.value;

    // Navigate to the respective page based on the selected mode
    if (mode === "movie") {
        window.location.href = "movies.html";
    } else if (mode === "tv") {
        window.location.href = "tv.html";
    } else if (mode === "person") {
        window.location.href = "people.html";
    } else if (mode === "all") {
        window.location.href = "index.html"; // Redirect to the home page for "All"
    }
});

// Add event listener to the search button
searchButton.addEventListener("click", () => {
    const query = searchInput.value.trim(); // Get the search term
    const mode = searchMode.value; // Get the selected mode

    if (!query) {
        alert("Please enter a search term.");
        return;
    }

    // Perform the search based on the selected mode
    if (mode === "movie") {
        window.location.href = `movies.html?query=${query}`;
    } else if (mode === "tv") {
        window.location.href = `tv.html?query=${query}`;
    } else if (mode === "person") {
        window.location.href = `people.html?query=${query}`;
    } else if (mode === "all") {
        window.location.href = `search.html?query=${query}`;
    }
});


// Navigate with a query string
function searchEventListeners(element) {
    element.addEventListener("click", e => {
        console.log(searchInput.value);
        e.preventDefault();
        window.location.href = `${element.href}?query=${searchInput.value}`;
    });
}

// Add the listener to each anchor button
searchEventListeners(movieButton);
searchEventListeners(tvButton);
searchEventListeners(personButton);

// Fetch and display popular movies
moviePopular()
    .then(result => {
        displayMovies(result.results);
    })
    .catch(error => console.log(error));

// Fetch and display popular TV shows
tvPopular()
    .then(result => {
        displayTVShows(result.results);
    })
    .catch(error => console.log(error));

// Fetch and display popular people
peoplePopular()
    .then(result => {
        displayPeople(result.results);
    })
    .catch(error => console.log(error));

// Function to display popular movies
function displayMovies(movies) {
    movieInfoContent.innerHTML = ""; // Clear existing content
    movies.forEach(movie => {
        const posterPath = movie.poster_path;
        if (posterPath) {
            const movieDiv = document.createElement("div");
            movieDiv.classList.add("movie-item");

            const img = document.createElement("img");
            img.src = `${imgUrl}w200${posterPath}`;
            img.alt = movie.title;
            img.classList.add("movie-poster");

            const title = document.createElement("h3");
            title.textContent = movie.title;

            movieDiv.appendChild(img);
            movieDiv.appendChild(title);
            movieInfoContent.appendChild(movieDiv);
        }
    });
}

// Function to display popular TV shows
function displayTVShows(tvShows) {
    tvInfoContent.innerHTML = ""; // Clear existing content
    tvShows.forEach(tvShow => {
        const posterPath = tvShow.poster_path;
        if (posterPath) {
            const tvDiv = document.createElement("div");
            tvDiv.classList.add("tv-item");

            const img = document.createElement("img");
            img.src = `${imgUrl}w200${posterPath}`;
            img.alt = tvShow.name;
            img.classList.add("tv-poster");

            const title = document.createElement("h3");
            title.textContent = tvShow.name;

            tvDiv.appendChild(img);
            tvDiv.appendChild(title);
            tvInfoContent.appendChild(tvDiv);
        }
    });
}

// Function to display popular people
function displayPeople(people) {
    personInfoContent.innerHTML = ""; // Clear existing content
    people.forEach(person => {
        const profilePath = person.profile_path;
        if (profilePath) {
            const personDiv = document.createElement("div");
            personDiv.classList.add("person-item");

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