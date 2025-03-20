document.addEventListener('DOMContentLoaded', () => {
    const toGalleryButton = document.getElementById('toGallery');
    const toHomeButton = document.getElementById('toHome');

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
});

async function fetchRandomBacon(){
    const result = await fetch("https://baconmockup.com/300/200");
    const data = await result.json();

    document.getElementById("imageBox").innerHTML = `<img src="${data.message}" alt="Random Bacon Image" />`;
}

// function fetchRandomBacon() {
//     const width = 300;
//     const height = 300;
//     const imageUrl = `https://baconmockup.com/${width}/${height}`;
    
//     const imgElement = document.createElement('img');
//     imgElement.src = imageUrl;
//     imgElement.alt = 'Random Bacon Image';
//     imgElement.style.width = `${width}px`;
//     imgElement.style.height = `${height}px`;

//     const colorBox = document.getElementById('colorBox');
//     colorBox.innerHTML = ''; // Clear any existing content
//     colorBox.appendChild(imgElement);
// }