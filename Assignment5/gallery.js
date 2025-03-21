document.addEventListener('DOMContentLoaded', () => {
    const toGalleryButton = document.getElementById('toGallery');
    const toHomeButton = document.getElementById('toHome');
    const filterAllButton = document.getElementById('filter-all');
    const filterDogsButton = document.getElementById('filter-dogs');
    const filterCatsButton = document.getElementById('filter-cats');
    const filterFoxesButton = document.getElementById('filter-foxes');
    const gallery = document.getElementById('gallery');

    toGalleryButton.addEventListener('click', () => {
        window.location.href = 'gallery.html';
    })
    toHomeButton.addEventListener('click', () => {
        window.location.href = 'index.html';
    })

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


      // Load favorites from favs.txt
    fetch('favs.txt')
    .then(response => response.text())
    .then(data => {
        const favorites = data.trim().split('\n').map(line => JSON.parse(line));
        displayFavorites(favorites);
    });

function displayFavorites(favorites) {
    gallery.innerHTML = '';
    favorites.forEach(favorite => {
        const card = document.createElement('div');
        card.classList.add('card');
        card.dataset.category = favorite.category;

        const img = document.createElement('img');
        img.src = favorite.url;
        img.alt = favorite.category;
        img.addEventListener('click', () => {
            window.location.href = `image.html?url=${encodeURIComponent(favorite.url)}`;
        });

        const info = document.createElement('div');
        info.classList.add('info');
        info.textContent = `Category: ${favorite.category} | Date: ${favorite.date}`;

        const removeButton = document.createElement('button');
        removeButton.classList.add('remove');
        removeButton.textContent = 'X';
        removeButton.addEventListener('click', () => {
            removeFavorite(favorite.url);
            card.remove();
        });

        card.appendChild(img);
        card.appendChild(info);
        card.appendChild(removeButton);
        gallery.appendChild(card);
    });
}

function removeFavorite(url) {
    fetch('favs.txt')
        .then(response => response.text())
        .then(data => {
            const favorites = data.trim().split('\n').map(line => JSON.parse(line));
            const updatedFavorites = favorites.filter(favorite => favorite.url !== url);
            saveFavorites(updatedFavorites);
        });
}

function saveFavorites(favorites) {
    const data = favorites.map(favorite => JSON.stringify(favorite)).join('\n');
    // Save updated favorites to favs.txt (this requires server-side handling)
    // For demonstration purposes, we'll log the data to the console
    console.log(data);
}

filterAllButton.addEventListener('click', () => {
    filterCards('all');
});

filterDogsButton.addEventListener('click', () => {
    filterCards('dog');
});
filterCatsButton.addEventListener('click', () => {
    filterCards('cat');
});

filterFoxesButton.addEventListener('click', () => {
    filterCards('fox');
});

function filterCards(category) {
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
        if (category === 'all' || card.dataset.category === category) {
            card.style.display = 'flex';
        } else {
            card.style.display = 'none';
        }
    });
}
});

