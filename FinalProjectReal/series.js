    // Get the query string into a JSON object
const queryObj = queryStringToJson(window.location.search);
const seriesId = queryObj.id;

const menuIcon = document.getElementById("menu-icon");
const navMenu = document.getElementById("nav-menu");

const seriesPoster = document.getElementById("series-poster");
const seriesTitle = document.getElementById("series-title");
const seriesYearsRunning = document.getElementById("series-years-running");
const numberOfSeasons = document.getElementById("number-of-seasons");
const numberOfEpisodes = document.getElementById("number-of-episodes");
const voteAverage = document.getElementById("vote-average");
const seriesOverview = document.getElementById("series-overview");
const imageGallery = document.getElementById("image-gallery");
const creditsList = document.getElementById("credits-list");

// Toggle navigation menu
menuIcon.addEventListener("click", () => {
    navMenu.classList.toggle("show");
});

// Fetch and display series details
tvDetails(seriesId)
    .then(series => {
        seriesPoster.src = `${imgUrl}w500${series.poster_path}`;
        seriesPoster.alt = series.name;
        seriesTitle.textContent = series.name;
        seriesYearsRunning.textContent = `Years Running: ${series.first_air_date} - ${series.last_air_date || "Present"}`;
        numberOfSeasons.textContent = `Number of Seasons: ${series.number_of_seasons}`;
        numberOfEpisodes.textContent = `Number of Episodes: ${series.number_of_episodes}`;
        voteAverage.textContent = `Vote Average: ${series.vote_average}`;
        seriesOverview.textContent = `Overview: ${series.overview}`;
    })
    .catch(error => console.error("Error fetching series details:", error));

// Fetch and display series images for the gallery
tvImages(seriesId)
    .then(result => {
        populateImageGallery(result.posters);
    })
    .catch(error => console.error("Error fetching series images:", error));

// Fetch and display series credits
tvCredits(seriesId)
    .then(credits => {
        populateCredits(credits.cast);
    })
    .catch(error => console.error("Error fetching series credits:", error));

// Function to populate the image gallery
function populateImageGallery(images) {
    const galleryWidth = imageGallery.parentElement.offsetWidth;
    const imageWidth = 200; // Width of a single image
    const minImagesToFill = Math.ceil(galleryWidth / imageWidth) * 3;

    // Duplicate images to fill the gallery
    let allImages = images.map(img => `${imgUrl}w200${img.file_path}`);
    while (allImages.length < minImagesToFill) {
        allImages = allImages.concat(allImages.slice(0, images.length));
    }

    // Add images to the gallery
    allImages.forEach(src => {
        const img = document.createElement("img");
        img.src = src;
        img.alt = "Series Poster";
        imageGallery.appendChild(img);
    });
}

// Function to populate the credits section
function populateCredits(cast) {
    const limitedCast = cast.slice(0, 20); // Limit to 20 cast members

    limitedCast.forEach(person => {
        const creditDiv = document.createElement("div");
        creditDiv.classList.add("credit-item");

        const profileImg = document.createElement("img");
        profileImg.src = person.profile_path
            ? `${imgUrl}w200${person.profile_path}`
            : "https://via.placeholder.com/200"; // Placeholder if no image
        profileImg.alt = person.name;

        const name = document.createElement("h3");
        name.textContent = person.name;

        const character = document.createElement("p");
        character.textContent = `Character: ${person.character}`;

        // Link to the person's page
        const link = document.createElement("a");
        link.href = `person.html?id=${person.id}`;
        link.appendChild(profileImg);
        link.appendChild(name);

        creditDiv.appendChild(link);
        creditDiv.appendChild(character);
        creditsList.appendChild(creditDiv);
    });
}


// Function to dynamically render series tiles
function displaySeries(seriesList) {
    const seriesContainer = document.getElementById("series-container"); // Ensure this container exists in your HTML
    seriesContainer.innerHTML = ""; // Clear existing content

    seriesList.forEach(series => {
        const seriesDiv = document.createElement("div");
        seriesDiv.classList.add("tv-item");
        seriesDiv.dataset.tvId = series.id; // Add the series ID as a data attribute

        const img = document.createElement("img");
        img.src = `${imgUrl}w200${series.poster_path}`;
        img.alt = series.name;
        img.classList.add("tv-poster");

        const title = document.createElement("h3");
        title.textContent = series.name;

        seriesDiv.appendChild(img);
        seriesDiv.appendChild(title);
        seriesContainer.appendChild(seriesDiv);
    });
}
