document.addEventListener('DOMContentLoaded', () => {
    const toGalleryButton = document.getElementById('toGallery');
    const toHomeButton = document.getElementById('toHome');
    const newImageButton = document.getElementById('new-image');
    const favoriteButton = document.getElementById('favorite');
    const foxButton = document.getElementById('fox-button');
    const catButton = document.getElementById('cat-button');
    const dogButton = document.getElementById('dog-button');

//
    const imageBox = document.getElementById('imageBox');
    let favorites = [];
//
    const url = "http://localhost:8000/";
    const filename = "favs.txt";


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
    if (favoriteButton.classList.contains('active')) {
        favoriteButton.classList.toggle('active');
    }
        
    });
    catButton.addEventListener("click", () => {
        dogButton.classList.remove("active");
        catButton.classList.toggle("active");
        foxButton.classList.remove("active");
    if (favoriteButton.classList.contains('active')) {
        favoriteButton.classList.toggle('active');
    }
    });
    foxButton.addEventListener("click", () => {
        dogButton.classList.remove("active");
        catButton.classList.remove("active");
        foxButton.classList.toggle("active");
    if (favoriteButton.classList.contains('active')) {
        favoriteButton.classList.toggle('active');
    }
    });

    newImageButton.addEventListener('click', () => {
        if (dogButton.classList.contains('active')) {
            fetchRandomDog();
        }
        if (favoriteButton.classList.contains('active')) {
            favoriteButton.classList.toggle('active');
        }
        if (catButton.classList.contains('active')) {
            fetchRandomCat();
        }
        if (favoriteButton.classList.contains('active')) {
            favoriteButton.classList.toggle('active');
        }  
        if (foxButton.classList.contains('active')) {
            fetchRandomFox();
        if (favoriteButton.classList.contains('active')) {
            favoriteButton.classList.toggle('active');
        }
    }
    });


favoriteButton.addEventListener('click', () => {
    favoriteButton.classList.toggle('active');
    const currentImageUrl = imageBox.getAttribute('src');
    console.log(currentImageUrl);
    if (!currentImageUrl) return;

    if (favoriteButton.classList.contains('active')) {
        const newFavorite = {
            url: currentImageUrl,
            category: getCurrentCategory(),
            date: new Date().toISOString()
        };
        favorites.push(newFavorite);
        saveFavorites(newFavorite);
    } else {
        favorites = favorites.filter(fav => fav.url !== currentImageUrl);
        saveFavorites();
    }
});

function getCurrentCategory() {
    if (dogButton.classList.contains('active')) return 'dog';
    if (catButton.classList.contains('active')) return 'cat';
    if (foxButton.classList.contains('active')) return 'fox';
    return 'unknown';
}

function saveFavorites() {
    const data = favorites.map(favorite => JSON.stringify(favorite)).join('\n');
    fetch(url + "api/update-favs", {
        method: "PUT",
        body: data,
        headers: {
            "Content-type": "application/json; charset=UTF-8"
        }
    }).then(response => {
        if (response.ok) {
            console.log('Favorites updated successfully');
        } else {
            console.error('Failed to update favorites');
        }
    });
}
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
    const imageHolder = document.getElementById("imageBox");
    imageHolder.setAttribute("src", result2.image);

    document.getElementById('image-api').textContent = `API Address: ${apiUrl}`;
    document.getElementById('image-url').textContent = `Image URL: ${result2.image}`;
}




