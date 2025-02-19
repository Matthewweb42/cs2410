class Drink {
    constructor(type) {
        this.type = type;
    }

    toHTMLElement() {
        const drinkElement = document.createElement("div");
        drinkElement.classList.add("drink");
        drinkElement.innerHTML = `<p><strong>Drink:</strong> ${this.type || "None"}</p>`;
        return drinkElement;
    }
}
