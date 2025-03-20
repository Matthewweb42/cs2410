document.addEventListener('DOMContentLoaded', () => {
    const toGalleryButton = document.getElementById('toGallery');
    const toHomeButton = document.getElementById('toHome');
    const newImageButton = document.getElementById('new-image');
    const favoriteButton = document.getElementById('favorite');
    const unfavoriteButton = document.getElementById('unfavorite');
    const baconButton = document.getElementById('bacon-button');
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
        fetchRandomDog();
        dogButton.classList.toggle("active");
        catButton.classList.remove("active");
        baconButton.classList.remove("active");
    });
    catButton.addEventListener("click", () => {
        fetchRandomCat();
        dogButton.classList.remove("active");
        catButton.classList.toggle("active");
        baconButton.classList.remove("active");
    });
    baconButton.addEventListener("click", () => {
        fetchRandomBacon();
        dogButton.classList.remove("active");
        catButton.classList.remove("active");
        baconButton.classList.toggle("active");
    });

    newImageButton.addEventListener('click', () => {
        if (dogButton.classList.contains('active')) {
            fetchRandomDog();
        }
        if (catButton.classList.contains('active')) {
            fetchRandomCat();
        }  
        if (baconButton.classList.contains('active')) {
            fetchRandomBacon();
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

// async function fetchRandomDog(){
//     const result = await fetch("https://dog.ceo/api/breeds/image/random");
//     const data = await result.json();

//     document.getElementById("imageBox").innerHTML = `<img src="${data.message}" alt="Random Bacon Image" />`;
// }

const imageHolder = document.getElementById("imageBox");
const nextBtn = document.getElementById("new-image");

async function fetchRandomDog() {
    const result1 = await fetch("https://dog.ceo/api/breeds/image/random");
    const result2 = await result1.json();
    console.log(result2);
    imageHolder.setAttribute("src", result2.message);
}

async function fetchRandomCat(){
    const imageUrl = "https://cataas.com/cat";
    const imageHolder = document.getElementById("imageBox");
    imageHolder.setAttribute("src", imageUrl);
}





