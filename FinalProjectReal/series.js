// Get the query string into a JSON object
const queryObj = queryStringToJson(window.location.search);
const seriesId = queryObj.id;

const idInput = document.getElementById("url-text");
const findButton = document.getElementById("image-button");

const menuIcon = document.getElementById("menu-icon");
const navMenu = document.getElementById("nav-menu");

menuIcon.addEventListener("click", () => {
    navMenu.classList.toggle("show");
});

// Show the images based on the id
findButton.addEventListener("click", e => {
    document.getElementById("image-div").innerHTML =
        `<img src=${imgUrl}w780/${idInput.value}></img>`
});

// Make the call to get the info based on the id
tvDetails(seriesId)
    .then(result => console.log(result))
    .catch(error => console.log(error));

// Make the call to get the info based on the id
tvImages(seriesId)
    .then(result => console.log(result))
    .catch(error => console.log(error));