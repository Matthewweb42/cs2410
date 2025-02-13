class Sandwich {
    constructor(size, bread, meat, cheese, toppings) {
        this.size = size;
        this.bread = bread;
        this.meat = meat;
        this.cheese = cheese;
        this.toppings = toppings;
    }

    // toHTMLElement() {
    //     const div = document.createElement("div");
    //     div.classList.add("sandwich-card");
    //     div.innerHTML = `
    //         <strong>Sandwich:</strong> ${this.size}, ${this.bread}, ${this.meat}, ${this.cheese}, ${this.toppings.join(", ")}
    //     `;
    //     return div;
    // }
}
