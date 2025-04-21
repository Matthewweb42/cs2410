
const queryObj = queryStringToJson(window.location.search);
const tvName = queryObj.query || "";
let currentPage = 1;
let totalPages = 1; 

const menuIcon = document.getElementById("menu-icon");
const navMenu = document.getElementById("nav-menu");
const tvInfoContent = document.getElementById("tv-info-content");
const searchInput = document.getElementById("search-text");
const searchButton = document.getElementById("search-button");
const loadMoreDiv = document.createElement("div"); 
loadMoreDiv.id = "load-more-div";
tvInfoContent.after(loadMoreDiv);


searchInput.value = tvName;


menuIcon.addEventListener("click", () => {
    navMenu.classList.toggle("show");
});


searchButton.addEventListener("click", () => {
    const query = searchInput.value.trim();
    if (!query) {
 
        currentPage = 1; 
        fetchPopularTVShows();
        return;
    }
    window.location.href = `tv.html?query=${query}`;
});


function fetchTVShows(page = 1, append = false) {
    if (tvName && tvName.trim() !== "") {

        tvSearch(tvName, page)
            .then(result => {
                totalPages = result.total_pages; 
                displayTVShows(result.results, append);
                updateLoadMoreButton();
            })
            .catch(error => {
                console.error("Error fetching TV data:", error);
                tvInfoContent.innerHTML = "<p>Failed to load TV shows. Please try again later.</p>";
            });
    } else {
    
        fetchPopularTVShows(page, append);
    }
}


function fetchPopularTVShows(page = 1, append = false) {
    tvPopular(page)
        .then(result => {
            totalPages = result.total_pages;
            displayTVShows(result.results, append);
            updateLoadMoreButton();
        })
        .catch(error => {
            console.error("Error fetching popular TV shows:", error);
            tvInfoContent.innerHTML = "<p>Failed to load popular TV shows. Please try again later.</p>";
        });
}


function displayTVShows(tvShows, append = false) {
    if (!append) {
        tvInfoContent.innerHTML = "";
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
            img.dataset.tvId = tvShow.id;

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
    const posters = document.querySelectorAll(".tv-poster");
    posters.forEach(poster => {
        poster.addEventListener("click", () => {
            const tvId = poster.dataset.tvId; 
            if (tvId) {
                window.location.href = `series.html?id=${tvId}`; 
            }
        });
    });
}


function updateLoadMoreButton() {
    loadMoreDiv.innerHTML = ""; 

    if (currentPage < totalPages) {
        const loadMoreButton = document.createElement("button");
        loadMoreButton.textContent = "Load More";
        loadMoreButton.classList.add("load-more-button");
        loadMoreButton.addEventListener("click", () => {
            currentPage++;
            fetchTVShows(currentPage, true); 
        });
        loadMoreDiv.appendChild(loadMoreButton);
    }
}


fetchTVShows(currentPage);