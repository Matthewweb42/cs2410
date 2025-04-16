// Get the query string into a JSON object
const queryObj = queryStringToJson(window.location.search);
const tvName = queryObj.query || ""; // Default to an empty string if no query is provided
let currentPage = 1; // Track the current page
let totalPages = 1; // Track the total number of pages

const menuIcon = document.getElementById("menu-icon");
const navMenu = document.getElementById("nav-menu");
const tvInfoContent = document.getElementById("tv-info-content");
const searchInput = document.getElementById("search-text");
const searchButton = document.getElementById("search-button");
const loadMoreDiv = document.createElement("div"); // Container for the "Load More" button
loadMoreDiv.id = "load-more-div";
tvInfoContent.after(loadMoreDiv);

// Set the search input value based on the query string
searchInput.value = tvName;

// Toggle navigation menu
menuIcon.addEventListener("click", () => {
    navMenu.classList.toggle("show");
});

// Handle search button click
searchButton.addEventListener("click", () => {
    const query = searchInput.value.trim();
    if (!query) {
        // If the search bar is empty, fetch popular TV shows instead
        currentPage = 1; // Reset to the first page
        fetchPopularTVShows();
        return;
    }
    window.location.href = `tv.html?query=${query}`;
});

// Fetch and display TV shows based on the current page and query
function fetchTVShows(page = 1, append = false) {
    if (tvName && tvName.trim() !== "") {
        // If a search query is provided, fetch search results
        tvSearch(tvName, page)
            .then(result => {
                totalPages = result.total_pages; // Update total pages
                displayTVShows(result.results, append);
                updateLoadMoreButton();
            })
            .catch(error => {
                console.error("Error fetching TV data:", error);
                tvInfoContent.innerHTML = "<p>Failed to load TV shows. Please try again later.</p>";
            });
    } else {
        // If no search query is provided, fetch popular TV shows
        fetchPopularTVShows(page, append);
    }
}

// Fetch popular TV shows
function fetchPopularTVShows(page = 1, append = false) {
    tvPopular(page)
        .then(result => {
            totalPages = result.total_pages; // Update total pages
            displayTVShows(result.results, append);
            updateLoadMoreButton();
        })
        .catch(error => {
            console.error("Error fetching popular TV shows:", error);
            tvInfoContent.innerHTML = "<p>Failed to load popular TV shows. Please try again later.</p>";
        });
}

// Function to display TV shows
function displayTVShows(tvShows, append = false) {
    if (!append) {
        tvInfoContent.innerHTML = ""; // Clear existing content if not appending
    }
    tvShows.forEach(tvShow => {
        const posterPath = tvShow.poster_path;
        if (posterPath) {
            const tvDiv = document.createElement("div");
            tvDiv.classList.add("tv-item");

            const img = document.createElement("img");
            img.src = `${imgUrl}w200${posterPath}`;
            img.alt = tvShow.name;
            img.classList.add("tv-poster");
            img.dataset.tvId = tvShow.id; // Add the TV show ID as a data attribute

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
    addPosterClickListeners();
}

function addPosterClickListeners() {
    const posters = document.querySelectorAll(".tv-poster"); // Select all TV posters
    posters.forEach(poster => {
        poster.addEventListener("click", () => {
            const tvId = poster.dataset.tvId; // Get the TV ID from the data attribute
            if (tvId) {
                window.location.href = `series.html?id=${tvId}`; // Redirect to the TV details page
            }
        });
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
            fetchTVShows(currentPage, true); // Fetch the next page and append results
        });
        loadMoreDiv.appendChild(loadMoreButton);
    }
}

// Initial fetch
fetchTVShows(currentPage);