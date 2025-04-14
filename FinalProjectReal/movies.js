// Get the query string into a JSON object
const queryObj = queryStringToJson(window.location.search);
const movieName = queryObj.query || ""; // Default to an empty string if no query is provided
let currentPage = 1; // Track the current page
let totalPages = 1; // Track the total number of pages

const menuIcon = document.getElementById("menu-icon");
const navMenu = document.getElementById("nav-menu");
const movieInfoContent = document.getElementById("movie-info-content");
const searchInput = document.getElementById("search-text");
const searchButton = document.getElementById("search-button");
const loadMoreDiv = document.createElement("div"); // Container for the "Load More" button
loadMoreDiv.id = "load-more-div";
movieInfoContent.after(loadMoreDiv);

// Set the search input value based on the query string
searchInput.value = movieName;

// Toggle navigation menu
menuIcon.addEventListener("click", () => {
    navMenu.classList.toggle("show");
});

// Handle search button click
searchButton.addEventListener("click", () => {
    const query = searchInput.value.trim();
    if (!query) {
        // If the search bar is empty, fetch popular movies instead
        currentPage = 1; // Reset to the first page
        fetchPopularMovies();
        return;
    }
    window.location.href = `movies.html?query=${query}`;
});

// Fetch and display movies based on the current page and query
function fetchMovies(page = 1, append = false) {
    if (movieName && movieName.trim() !== "") {
        // If a search query is provided, fetch search results
        movieSearch(movieName, page)
            .then(result => {
                totalPages = result.total_pages; // Update total pages
                displayMovies(result.results, append);
                updateLoadMoreButton();
            })
            .catch(error => {
                console.error("Error fetching movie data:", error);
                movieInfoContent.innerHTML = "<p>Failed to load movies. Please try again later.</p>";
            });
    } else {
        // If no search query is provided, fetch popular movies
        fetchPopularMovies(page, append);
    }
}

// Fetch popular movies
function fetchPopularMovies(page = 1, append = false) {
    moviePopular(page)
        .then(result => {
            totalPages = result.total_pages; // Update total pages
            displayMovies(result.results, append);
            updateLoadMoreButton();
        })
        .catch(error => {
            console.error("Error fetching popular movies:", error);
            movieInfoContent.innerHTML = "<p>Failed to load popular movies. Please try again later.</p>";
        });
}

// Function to display movies
function displayMovies(movies, append = false) {
    if (!append) {
        movieInfoContent.innerHTML = ""; // Clear existing content if not appending
    }
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

// Function to update the "Load More" button
function updateLoadMoreButton() {
    loadMoreDiv.innerHTML = ""; // Clear existing button

    if (currentPage < totalPages) {
        const loadMoreButton = document.createElement("button");
        loadMoreButton.textContent = "Load More";
        loadMoreButton.classList.add("load-more-button");
        loadMoreButton.addEventListener("click", () => {
            currentPage++;
            fetchMovies(currentPage, true); // Fetch the next page and append results
        });
        loadMoreDiv.appendChild(loadMoreButton);
    }
}

// Initial fetch
fetchMovies(currentPage);