// Get the query string into a JSON object
const queryObj = queryStringToJson(window.location.search);
const personId = queryObj.id;

const idInput = document.getElementById("url-text");
const findButton = document.getElementById("image-button");

const menuIcon = document.getElementById("menu-icon");
const navMenu = document.getElementById("nav-menu");

const profilePicture = document.getElementById("profile-picture");
const actorName = document.getElementById("actor-name");
const actorBirthday = document.getElementById("actor-birthday");
const actorDeathday = document.getElementById("actor-deathday");
const actorBirthplace = document.getElementById("actor-birthplace");
const biography = document.getElementById("biography");
const creditsList = document.getElementById("credits-list");

// Toggle navigation menu
menuIcon.addEventListener("click", () => {
    navMenu.classList.toggle("show");
});

// Fetch and display person details
personDetails(personId)
    .then(person => {
        profilePicture.src = `${imgUrl}w300${person.profile_path}`;
        profilePicture.alt = person.name;
        actorName.textContent = person.name;
        actorBirthday.textContent = `Birthday: ${person.birthday || "N/A"}`;
        actorDeathday.textContent = person.deathday ? `Deathday: ${person.deathday}` : "";
        actorBirthplace.textContent = `Birthplace: ${person.place_of_birth || "N/A"}`;
        biography.textContent = `Biography: ${person.biography || "No biography available."}`;
    })
    .catch(error => console.error("Error fetching person details:", error));

// Fetch and display person images
// personImages(personId)
//     .then(result => {
//         populateImageGallery(result.profiles);
//     })
//     .catch(error => console.error("Error fetching person images:", error));

// Fetch and display person credits
// personCredits(personId)
//     .then(credits => {
//         populateCredits(credits.cast);
//     })
//     .catch(error => console.error("Error fetching person credits:", error));

// Fetch and display combined credits
personCombinedCredits(personId)
    .then(credits => {
        populateCreditHistory(credits.cast);
    })
    .catch(error => console.error("Error fetching combined credits:", error));

// Function to populate the image gallery
// function populateImageGallery(images) {
//     const imageDiv = document.getElementById("image-div");
//     imageDiv.innerHTML = ""; // Clear existing images

//     images.forEach(image => {
//         const img = document.createElement("img");
//         img.src = `${imgUrl}w200${image.file_path}`;
//         img.alt = "Person Image";
//         img.classList.add("person-image");
//         imageDiv.appendChild(img);
//     });
// }

// Function to populate the credits section
function populateCredits(cast) {
    const limitedCast = cast.slice(0, 20); // Limit to 20 credits

    limitedCast.forEach(role => {
        const creditDiv = document.createElement("div");
        creditDiv.classList.add("credit-item");

        const title = document.createElement("h3");
        title.textContent = role.title || role.name; // Use title for movies, name for TV shows

        const character = document.createElement("p");
        character.textContent = `Character: ${role.character || "N/A"}`;

        creditDiv.appendChild(title);
        creditDiv.appendChild(character);
        creditsList.appendChild(creditDiv);
    });
}


// Function to populate the credit history section
function populateCreditHistory(credits) {
    const creditHistoryList = document.getElementById("credit-history-list");

    // Filter out non-movie and non-TV credits
    const filteredCredits = credits.filter(
        credit => credit.media_type === "movie" || credit.media_type === "tv"
    );

    filteredCredits.forEach(credit => {
        const creditDiv = document.createElement("div");
        creditDiv.classList.add("credit-item");

        const posterImg = document.createElement("img");
        posterImg.src = credit.poster_path
            ? `${imgUrl}w200${credit.poster_path}`
            : "https://via.placeholder.com/200"; // Placeholder if no image
        posterImg.alt = credit.title || credit.name;

        const title = document.createElement("h3");
        title.textContent = credit.title || credit.name; // Use title for movies, name for TV shows

        const releaseDate = document.createElement("p");
        releaseDate.textContent = `Release Date: ${
            credit.release_date || credit.first_air_date || "N/A"
        }`;

        const character = document.createElement("p");
        character.textContent = `Character: ${credit.character || "N/A"}`;

        // Link to the movie or TV page
        const link = document.createElement("a");
        link.href =
            credit.media_type === "movie"
                ? `movie.html?id=${credit.id}`
                : `series.html?id=${credit.id}`;
        link.appendChild(posterImg);
        link.appendChild(title);

        creditDiv.appendChild(link);
        creditDiv.appendChild(releaseDate);
        creditDiv.appendChild(character);
        creditHistoryList.appendChild(creditDiv);
    });
}