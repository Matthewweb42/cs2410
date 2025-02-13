class Drink {
    constructor(type) {
        this.type = type;
    }

    toHTMLElement() {
        const div = document.createElement("div");
        div.classList.add("drink-card");
        div.innerHTML = `<strong>Drink:</strong> ${this.type}`;
        return div;
    }
}
