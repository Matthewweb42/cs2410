document.addEventListener('DOMContentLoaded', () => {
    const toGalleryButton = document.getElementById('toGallery');
    const toHomeButton = document.getElementById('toHome');
    const newImageButton = document.getElementById('new-image');
    const favoriteButton = document.getElementById('favorite');
    const unfavoriteButton = document.getElementById('unfavorite');
    const imageBox = document.getElementById('imageBox');
    let favorites = [];
    const foxButton = document.getElementById('fox-button');
    const catButton = document.getElementById('cat-button');
    const dogButton = document.getElementById('dog-button');


    const input = document.getElementById("input-text");
    const submitBtn = document.getElementById("submit-btn");
    const updateBtn = document.getElementById("update-btn");
    const outputDiv = document.getElementById("output");

    const url = "http://localhost:8000/";
    const filename = "favs.txt";

    submitBtn.addEventListener("click", () => {
        const data = {
            message: input.value,
        }
        
        fetch(url + "api/update-favs", {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        });
    });

    updateBtn.addEventListener("click", () => {
        fetch(url + filename)
        .then(res => res.json())
        .then(res => {
            outputDiv.innerText = res.message;
        });
    });

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


    fetch('favs.txt')
        .then(response => response.text())
        .then(data => {
            if (data.trim()) {
                favorites = JSON.parse(data);
                checkIfFavorite();
            }
        });

    function checkIfFavorite() {
        const currentImageUrl = imageBox.getAttribute('src');
        if (favorites.some(fav => fav.url === currentImageUrl)) {
            favoriteButton.classList.add('active');
        } else {
            favoriteButton.classList.remove('active');
        }
    }

    function saveFavorites() {
        const data = JSON.stringify(favorites, null, 2);
        // Save updated favorites to favs.txt (this requires server-side handling)
        // For demonstration purposes, we'll log the data to the console
        console.log(data);
    }

    favoriteButton.addEventListener('click', () => {
        const currentImageUrl = imageBox.getAttribute('src');
        if (!currentImageUrl) return;

        if (favoriteButton.classList.contains('active')) {
            // Unfavorite the image
            favorites = favorites.filter(fav => fav.url !== currentImageUrl);
            favoriteButton.classList.remove('active');
        } else {
            // Favorite the image
            const newFavorite = {
                url: currentImageUrl,
                category: getCurrentCategory(),
                date: new Date().toISOString()
            };
            favorites.push(newFavorite);
            favoriteButton.classList.add('active');
        }
        saveFavorites();
    });

    function getCurrentCategory() {
        if (dogButton.classList.contains('active')) return 'dog';
        if (catButton.classList.contains('active')) return 'cat';
        if (foxButton.classList.contains('active')) return 'fox';
        return 'unknown';
    }


//     favoriteButton.addEventListener('click', () => {
//         favoriteButton.classList.toggle('active');
//         if (favoriteButton.classList.contains('active')) {
//             // Perform actions when the button is active
//             console.log('Favorite button is active');
//         } else {
//             // Perform actions when the button is not active
//             console.log('Favorite button is not active');
//         }
//     });
//     unfavoriteButton.addEventListener('click', () => {
//         unfavoriteButton.classList.toggle('active');
//         if (unfavoriteButton.classList.contains('active')) {
//             // Perform actions when the button is active
//             console.log('Unfavorite button is active');
//         } else {
//             // Perform actions when the button is not active
//             console.log('Unfavorite button is not active');
//         }
//     });
// });
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




