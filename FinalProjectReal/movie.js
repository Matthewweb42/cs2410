
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


menuIcon.addEventListener("click", () => {
    navMenu.classList.toggle("show");
});


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


movieImages(movieId)
    .then(result => {
        populateImageGallery(result.posters);
    })
    .catch(error => console.error("Error fetching movie images:", error));


movieCredits(movieId)
    .then(credits => {
        populateCredits(credits.cast);
    })
    .catch(error => console.error("Error fetching movie credits:", error));


function populateImageGallery(images) {
    const galleryWidth = imageGallery.parentElement.offsetWidth;
    const imageWidth = 200; 
    const minImagesToFill = Math.ceil(galleryWidth / imageWidth) * 3;

    let allImages = images.map(img => `${imgUrl}w200${img.file_path}`);
    while (allImages.length < minImagesToFill) {
        allImages = allImages.concat(allImages.slice(0, images.length));
    }


    allImages.forEach(src => {
        const img = document.createElement("img");
        img.src = src;
        img.alt = "Movie Poster";
        imageGallery.appendChild(img);
    });
}


function populateCredits(cast) {

    const limitedCast = cast.slice(0,20);

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
