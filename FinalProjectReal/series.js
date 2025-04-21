
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


menuIcon.addEventListener("click", () => {
    navMenu.classList.toggle("show");
});


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


tvImages(seriesId)
    .then(result => {
        populateImageGallery(result.posters);
    })
    .catch(error => console.error("Error fetching series images:", error));


tvCredits(seriesId)
    .then(credits => {
        populateCredits(credits.cast);
    })
    .catch(error => console.error("Error fetching series credits:", error));


function populateImageGallery(images) {
    let currentIndex = 0;


    const prevButton = document.createElement("button");
    prevButton.textContent = "Previous";
    prevButton.disabled = true; 
    prevButton.classList.add("gallery-button");

    const nextButton = document.createElement("button");
    nextButton.textContent = "Next";
    nextButton.classList.add("gallery-button");

    const imageElement = document.createElement("img");
    imageElement.src = `${imgUrl}w500${images[currentIndex].file_path}`;
    imageElement.alt = "Series Poster";
    imageElement.classList.add("gallery-image");


    prevButton.addEventListener("click", () => {
        if (currentIndex > 0) {
            currentIndex--;
            updateGallery();
        }
    });

    nextButton.addEventListener("click", () => {
        if (currentIndex < images.length - 1) {
            currentIndex++;
            updateGallery();
        }
    });

    function updateGallery() {
        imageElement.src = `${imgUrl}w500${images[currentIndex].file_path}`;
        prevButton.disabled = currentIndex === 0;
        nextButton.disabled = currentIndex === images.length - 1;
    }


    imageGallery.innerHTML = ""; 
    imageGallery.appendChild(prevButton);
    imageGallery.appendChild(imageElement);
    imageGallery.appendChild(nextButton);
}

function populateCredits(cast) {
    const limitedCast = cast.slice(0, 20); 

    limitedCast.forEach(person => {
        const creditDiv = document.createElement("div");
        creditDiv.classList.add("credit-item");

        const profileImg = document.createElement("img");
        profileImg.src = person.profile_path
            ? `${imgUrl}w200${person.profile_path}`
            : "https://via.placeholder.com/200"; 
        profileImg.alt = person.name;

        const name = document.createElement("h3");
        name.textContent = person.name;

        const character = document.createElement("p");
        character.textContent = `Character: ${person.character}`;


        const link = document.createElement("a");
        link.href = `person.html?id=${person.id}`;
        link.appendChild(profileImg);
        link.appendChild(name);

        creditDiv.appendChild(link);
        creditDiv.appendChild(character);
        creditsList.appendChild(creditDiv);
    });
}


function displaySeries(seriesList) {
    const seriesContainer = document.getElementById("series-container"); 
    seriesContainer.innerHTML = ""; 

    seriesList.forEach(series => {
        const seriesDiv = document.createElement("div");
        seriesDiv.classList.add("tv-item");
        seriesDiv.dataset.tvId = series.id; 

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
