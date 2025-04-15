// Get the query string into a JSON object
const queryObj = queryStringToJson(window.location.search);
const movieId = queryObj.id;

const menuIcon = document.getElementById("menu-icon");
const navMenu = document.getElementById("nav-menu");

const moviePoster = document.getElementById("movie-poster");
const movieTitle = document.getElementById("movie-title");
const movieReleaseDate = document.getElementById("movie-release-date");
const movieRuntime = document.getElementById("movie-runtime");
const movieVoteAverage = document.getElementById("movie-vote-average");
const movieOverview = document.getElementById("movie-overview");
const imageGallery = document.getElementById("image-gallery");
const creditsList = document.getElementById("credits-list");

// Toggle navigation menu
menuIcon.addEventListener("click", () => {
    navMenu.classList.toggle("show");
});

// Fetch and display movie details
movieDetails(movieId)
    .then(movie => {
        moviePoster.src = `${imgUrl}w500${movie.poster_path}`;
        moviePoster.alt = movie.title;
        movieTitle.textContent = movie.title;
        movieReleaseDate.textContent = `Release Date: ${movie.release_date}`;
        movieRuntime.textContent = `Runtime: ${movie.runtime} minutes`;
        movieVoteAverage.textContent = `Vote Average: ${movie.vote_average}`;
        movieOverview.textContent = `Overview: ${movie.overview}`;
    })
    .catch(error => console.error("Error fetching movie details:", error));

// Fetch and display movie images for the gallery
movieImages(movieId)
    .then(result => {
        populateImageGallery(result.posters);
    })
    .catch(error => console.error("Error fetching movie images:", error));

// Fetch and display movie credits
movieCredits(movieId)
    .then(credits => {
        populateCredits(credits.cast);
    })
    .catch(error => console.error("Error fetching movie credits:", error));

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
        img.alt = "Movie Poster";
        imageGallery.appendChild(img);
    });
}

// Function to populate the credits section
function populateCredits(cast) {

    const limitedCast = cast.slice(0,20);

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
