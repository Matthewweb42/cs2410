document.addEventListener('DOMContentLoaded', () => {
    const toGalleryButton = document.getElementById('toGallery');
    const toHomeButton = document.getElementById('toHome');
    const imageBox = document.getElementById('imageBox');

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

      const urlParams = new URLSearchParams(window.location.search);
      const imageUrl = urlParams.get('url');
  
      fetch('http://localhost:8000/favs.txt')
          .then(response => response.text())
          .then(data => {
              const favorites = data.trim().split('\n').map(line => JSON.parse(line));
              const favorite = favorites.find(fav => fav.url === imageUrl);
  
              if (favorite) {
                  imageBox.setAttribute('src', favorite.url);
  
                  const imageCategory = favorite.category;
                  if (imageCategory) {
                      document.getElementById('category').innerText = `Category: ${imageCategory}`;
                  }
  
                  const imageDate = new Date(favorite.date).toLocaleDateString();
                  if (imageDate) {
                      document.getElementById('image-date').innerText = `Date Added: ${imageDate}`;
                  }
              }
          });
});