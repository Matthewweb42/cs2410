document.addEventListener('DOMContentLoaded', () => {
    const toGalleryButton = document.getElementById('toGallery');
    const toHomeButton = document.getElementById('toHome');
    const newImageButton = document.getElementById('new-image');
    const favoriteButton = document.getElementById('favorite');
    const unfavoriteButton = document.getElementById('unfavorite');
    const foxButton = document.getElementById('fox-button');
    const catButton = document.getElementById('cat-button');
    const dogButton = document.getElementById('dog-button');

    toGalleryButton.addEventListener('click', () => {
        window.location.href = 'gallery.html';
    });
    toHomeButton.addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    const themeRadios = document.getElementsByClassName('theme-radio');

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.setAttribute('data-theme', savedTheme);
        for (let radio of themeRadios) {
            if (radio.value === savedTheme) {
                radio.checked = true;
            }
        }
    }

    const radioButtons = document.getElementsByClassName("theme-radio");
    for (const i of radioButtons) {
        i.addEventListener("change", e => {
          if (e.target.checked) {
            document.body.dataset.theme = e.target.value;
            localStorage.setItem('theme', e.target.value);
          }
        })
      }

      
    dogButton.addEventListener("click", () => {
        dogButton.classList.toggle("active");
        catButton.classList.remove("active");
        foxButton.classList.remove("active");
    });
    catButton.addEventListener("click", () => {
        dogButton.classList.remove("active");
        catButton.classList.toggle("active");
        foxButton.classList.remove("active");
    });
    foxButton.addEventListener("click", () => {
        dogButton.classList.remove("active");
        catButton.classList.remove("active");
        foxButton.classList.toggle("active");
    });

    newImageButton.addEventListener('click', () => {
        if (dogButton.classList.contains('active')) {
            fetchRandomDog();
        }
        if (catButton.classList.contains('active')) {
            fetchRandomCat();
        }  
        if (foxButton.classList.contains('active')) {
            fetchRandomFox();
        }
    }  );

    favoriteButton.addEventListener('click', () => {
        favoriteButton.classList.toggle('active');
        if (favoriteButton.classList.contains('active')) {
            // Perform actions when the button is active
            console.log('Favorite button is active');
        } else {
            // Perform actions when the button is not active
            console.log('Favorite button is not active');
        }
    });
    unfavoriteButton.addEventListener('click', () => {
        unfavoriteButton.classList.toggle('active');
        if (unfavoriteButton.classList.contains('active')) {
            // Perform actions when the button is active
            console.log('Unfavorite button is active');
        } else {
            // Perform actions when the button is not active
            console.log('Unfavorite button is not active');
        }
    });
});

const imageHolder = document.getElementById("imageBox");
const nextBtn = document.getElementById("new-image");

async function fetchRandomDog() {
    const apiUrl = "https://dog.ceo/api/breeds/image/random";
    const result1 = await fetch(apiUrl);
    const result2 = await result1.json();
    const imageHolder = document.getElementById("imageBox");
    imageHolder.setAttribute("src", result2.message);

    document.getElementById('image-api').textContent = `API Address: ${apiUrl}`;
    document.getElementById('image-url').textContent = `Image URL: ${result2.message}`;
}

async function fetchRandomCat() {
    const apiUrl = "https://cataas.com/cat?json=true";
    const result1 = await fetch(apiUrl);
    const result2 = await result1.json();
    const imageHolder = document.getElementById("imageBox");
    imageHolder.setAttribute("src", result2.url);

    document.getElementById('image-api').textContent = `API Address: ${apiUrl}`;
    document.getElementById('image-url').textContent = `Image URL: ${result2.url}`;
}


async function fetchRandomFox() {
    const apiUrl = "https://randomfox.ca/floof/";
    const result1 = await fetch(apiUrl);
    const result2 = await result1.json();
    console.log("Result one: " + result1);
    console.log("Result two: " + result2);
    const imageHolder = document.getElementById("imageBox");
    imageHolder.setAttribute("src", result2.image);

    document.getElementById('image-api').textContent = `API Address: ${apiUrl}`;
    document.getElementById('image-url').textContent = `Image URL: ${result2.image}`;
}




