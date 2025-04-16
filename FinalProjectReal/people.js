// Get the query string into a JSON object
const queryObj = queryStringToJson(window.location.search);
const peopleName = queryObj.query || ""; // Default to an empty string if no query is provided
let currentPage = 1; // Track the current page
let totalPages = 1; // Track the total number of pages

const menuIcon = document.getElementById("menu-icon");
const navMenu = document.getElementById("nav-menu");
const personInfoContent = document.getElementById("person-info-content");
const searchInput = document.getElementById("search-text");
const searchButton = document.getElementById("search-button");
const loadMoreDiv = document.createElement("div"); // Container for the "Load More" button
loadMoreDiv.id = "load-more-div";
personInfoContent.after(loadMoreDiv);

// Set the search input value based on the query string
searchInput.value = peopleName;

// Toggle navigation menu
menuIcon.addEventListener("click", () => {
    navMenu.classList.toggle("show");
});

// Handle search button click
searchButton.addEventListener("click", () => {
    const query = searchInput.value.trim();
    if (!query) {
        // If the search bar is empty, fetch popular people instead
        currentPage = 1; // Reset to the first page
        fetchPopularPeople();
        return;
    }
    window.location.href = `people.html?query=${query}`;
});

// Fetch and display people based on the current page and query
function fetchPeople(page = 1, append = false) {
    if (peopleName && peopleName.trim() !== "") {
        // If a search query is provided, fetch search results
        peopleSearch(peopleName, page)
            .then(result => {
                totalPages = result.total_pages; // Update total pages
                displayPeople(result.results, append);
                updateLoadMoreButton();
            })
            .catch(error => {
                console.error("Error fetching people data:", error);
                personInfoContent.innerHTML = "<p>Failed to load people. Please try again later.</p>";
            });
    } else {
        // If no search query is provided, fetch popular people
        fetchPopularPeople(page, append);
    }
}

// Fetch popular people
function fetchPopularPeople(page = 1, append = false) {
    peoplePopular(page)
        .then(result => {
            totalPages = result.total_pages; // Update total pages
            displayPeople(result.results, append);
            updateLoadMoreButton();
        })
        .catch(error => {
            console.error("Error fetching popular people:", error);
            personInfoContent.innerHTML = "<p>Failed to load popular people. Please try again later.</p>";
        });
}

// Function to display people
function displayPeople(people, append = false) {
    if (!append) {
        personInfoContent.innerHTML = ""; // Clear existing content if not appending
    }
    people.forEach(person => {
        const profilePath = person.profile_path;
        if (profilePath) {
            const personDiv = document.createElement("div");
            personDiv.classList.add("person-item");

            const img = document.createElement("img");
            img.src = `${imgUrl}w200${profilePath}`;
            img.alt = person.name;
            img.classList.add("person-profile");
            img.dataset.personId= person.id; // Add the person ID as a data attribute

            const name = document.createElement("h3");
            name.textContent = person.name;

            personDiv.appendChild(img);
            personDiv.appendChild(name);
            personInfoContent.appendChild(personDiv);
        }
    });
    addProfileClickListeners(); // Add click listeners to the new profiles
}

function addProfileClickListeners() {
    const posters = document.querySelectorAll(".person-profile"); // Select all person profile images
    posters.forEach(poster => {
        poster.addEventListener("click", () => {
            const personId = poster.dataset.personId; // Get the person ID from the data attribute
            if (personId) {
                window.location.href = `person.html?id=${personId}`; // Redirect to the person details page
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
            fetchPeople(currentPage, true); // Fetch the next page and append results
        });
        loadMoreDiv.appendChild(loadMoreButton);
    }
}

// Initial fetch
fetchPeople(currentPage);

