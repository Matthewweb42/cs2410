class Sides {
    constructor(type) {
        this.type = type;
    }

    toHTMLElement() {
        const div = document.createElement("div");
        div.classList.add("sides-card");
        div.innerHTML = `<strong>Side:</strong> ${this.type}`;
        return div;
    }
}
