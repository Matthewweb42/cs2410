class Sides {
    constructor(type) {
        this.type = type;
    }

    toHTMLElement() {
        const sideElement = document.createElement("div");
        sideElement.classList.add("side");
        sideElement.innerHTML = `<p><strong>Side:</strong> ${this.type}</p>`;
        return sideElement;
    }
}
