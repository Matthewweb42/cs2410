document.addEventListener('DOMContentLoaded', () => {
    const toGalleryButton = document.getElementById('toGallery');
    const toHomeButton = document.getElementById('toHome');

    toGalleryButton.addEventListener('click', () => {
        window.location.href = 'gallery.html';
    });
    toHomeButton.addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    const heroModeCheckbox = document.getElementById("hero-mode");
    const royalModeCheckbox = document.getElementById("royal-mode");
    const shadowModeCheckbox = document.getElementById("shadow-mode");

    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.body.classList.add(savedTheme);
        if (savedTheme === 'hero-mode') heroModeCheckbox.checked = true;
        if (savedTheme === 'royal-mode') royalModeCheckbox.checked = true;
        if (savedTheme === 'shadow-mode') shadowModeCheckbox.checked = true;
    }

    const radioButtons = document.getElementsByClassName("theme-radio");
    for (const i of radioButtons) {
        i.addEventListener("change", (e) => {
            if (e.target.checked) {
                document.body.dataset.theme = e.target.value;
                localStorage.setItem('theme', e.target.value);
            }
        })
    };
    
    // heroModeCheckbox.addEventListener("change", (e) => {
    //     if (e.target.checked) {
    //         document.body.classList.add("hero-mode");
    //         localStorage.setItem('theme', 'hero-mode');
    //     } else {
    //         document.body.classList.remove("hero-mode");
    //         localStorage.setItem('theme');
    //     }
    // });
    // royalModeCheckbox.addEventListener("change", (e) => {
    //     if (e.target.checked) {
    //         document.body.classList.add("royal-mode");
    //         localStorage.setItem('theme', 'royal-mode');
    //     } else {
    //         document.body.classList.remove("royal-mode");
    //         localStorage.setItem('theme');
    //     }
    // });
    // shadowModeCheckbox.addEventListener("change", (e) => {
    //     if (e.target.checked) {
    //         document.body.classList.add("shadow-mode");
    //         localStorage.setItem('theme', 'shadow-mode');
    //     } else {
    //         document.body.classList.remove("shadow-mode");
    //         localStorage.setItem('theme');
    //     }
    // });
    
});


async function fetchRandomColor() {
    try {
        const response = await fetch('https://www.colourlovers.com/api/colors/random?format=json');
        const data = await response.json();

        if (data.length > 0) {
            const colorHex = `#${data[0].hex}`; // Extract the hex color

            // Apply the color to the div
            document.getElementById('colorBox').style.backgroundColor = colorHex;
        }
    } catch (error) {
        console.error("Error fetching color:", error);
    }
}