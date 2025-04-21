
const queryObj = queryStringToJson(window.location.search);
const peopleName = queryObj.query || ""; 
let currentPage = 1;
let totalPages = 1; 

const menuIcon = document.getElementById("menu-icon");
const navMenu = document.getElementById("nav-menu");
const personInfoContent = document.getElementById("person-info-content");
const searchInput = document.getElementById("search-text");
const searchButton = document.getElementById("search-button");
const loadMoreDiv = document.createElement("div"); 
loadMoreDiv.id = "load-more-div";
personInfoContent.after(loadMoreDiv);


searchInput.value = peopleName;


menuIcon.addEventListener("click", () => {
    navMenu.classList.toggle("show");
});


searchButton.addEventListener("click", () => {
    const query = searchInput.value.trim();
    if (!query) {

        currentPage = 1; 
        fetchPopularPeople();
        return;
    }
    window.location.href = `people.html?query=${query}`;
});


function fetchPeople(page = 1, append = false) {
    if (peopleName && peopleName.trim() !== "") {
       
        peopleSearch(peopleName, page)
            .then(result => {
                totalPages = result.total_pages;
                displayPeople(result.results, append);
                updateLoadMoreButton();
            })
            .catch(error => {
                console.error("Error fetching people data:", error);
                personInfoContent.innerHTML = "<p>Failed to load people. Please try again later.</p>";
            });
    } else {
   
        fetchPopularPeople(page, append);
    }
}

function fetchPopularPeople(page = 1, append = false) {
    peoplePopular(page)
        .then(result => {
            totalPages = result.total_pages; 
            displayPeople(result.results, append);
            updateLoadMoreButton();
        })
        .catch(error => {
            console.error("Error fetching popular people:", error);
            personInfoContent.innerHTML = "<p>Failed to load popular people. Please try again later.</p>";
        });
}


function displayPeople(people, append = false) {
    if (!append) {
        personInfoContent.innerHTML = ""; 
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
            img.dataset.personId= person.id; 

            const name = document.createElement("h3");
            name.textContent = person.name;

            personDiv.appendChild(img);
            personDiv.appendChild(name);
            personInfoContent.appendChild(personDiv);
        }
    });
    addProfileClickListeners(); 
}

function addProfileClickListeners() {
    const posters = document.querySelectorAll(".person-profile"); 
    posters.forEach(poster => {
        poster.addEventListener("click", () => {
            const personId = poster.dataset.personId;
            if (personId) {
                window.location.href = `person.html?id=${personId}`; 
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
            fetchPeople(currentPage, true);
        });
        loadMoreDiv.appendChild(loadMoreButton);
    }
}

fetchPeople(currentPage);

