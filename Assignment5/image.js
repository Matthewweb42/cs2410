document.addEventListener('DOMContentLoaded', () => {
    const toGalleryButton = document.getElementById('toGallery');
    const toHomeButton = document.getElementById('toHome');

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

});