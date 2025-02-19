class Sandwich {
    constructor(size = null, bread= null, meat= null, cheese= null, toppings = []) {
        this.size = size;
        this.bread = bread;
        this.meat = meat;
        this.cheese = cheese;
        this.toppings = toppings;
    }

    toHTMLElement() {
        const sandwichElement = document.createElement("div");
        sandwichElement.classList.add("sandwich");
        sandwichElement.innerHTML = `
            <p><strong>Size:</strong> ${this.size || "None"}</p>
            <p><strong>Bread:</strong> ${this.bread || "None"}</p>
            <p><strong>Meat:</strong> ${this.meat || "None"}</p>
            <p><strong>Cheese:</strong> ${this.cheese || "None"}</p>
            <p><strong>Toppings:</strong> ${this.toppings.join(", ") || "None"}</p>
        `;
        return sandwichElement;
    }
}
