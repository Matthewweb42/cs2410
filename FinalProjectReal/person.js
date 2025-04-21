
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


menuIcon.addEventListener("click", () => {
    navMenu.classList.toggle("show");
});


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


personCombinedCredits(personId)
    .then(credits => {
        populateCreditHistory(credits.cast);
    })
    .catch(error => console.error("Error fetching combined credits:", error));


function populateCredits(cast) {
    const limitedCast = cast.slice(0, 20); 

    limitedCast.forEach(role => {
        const creditDiv = document.createElement("div");
        creditDiv.classList.add("credit-item");

        const title = document.createElement("h3");
        title.textContent = role.title || role.name; 

        const character = document.createElement("p");
        character.textContent = `Character: ${role.character || "N/A"}`;

        creditDiv.appendChild(title);
        creditDiv.appendChild(character);
        creditsList.appendChild(creditDiv);
    });
}



function populateCreditHistory(credits) {
    const creditHistoryList = document.getElementById("credit-history-list");


    const filteredCredits = credits.filter(
        credit => credit.media_type === "movie" || credit.media_type === "tv"
    );

    filteredCredits.forEach(credit => {
        const creditDiv = document.createElement("div");
        creditDiv.classList.add("credit-item");

        const posterImg = document.createElement("img");
        posterImg.src = credit.poster_path
            ? `${imgUrl}w200${credit.poster_path}`
            : "https://via.placeholder.com/200"; 
        posterImg.alt = credit.title || credit.name;

        const title = document.createElement("h3");
        title.textContent = credit.title || credit.name;

        const releaseDate = document.createElement("p");
        releaseDate.textContent = `Release Date: ${
            credit.release_date || credit.first_air_date || "N/A"
        }`;

        const character = document.createElement("p");
        character.textContent = `Character: ${credit.character || "N/A"}`;


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