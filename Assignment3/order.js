class Order {
    constructor() {
        this.sandwich = new Sandwich();
        this.drink = new Drink();
        this.sides = [];
        // this.createdTime = new Date();
        // this.status = "Pending"; // Status: Pending → In Progress → Completed
    }

    addSide(side) {
        this.sides.push(new Sides(side));
    }

    addTopping(topping) {
        this.sandwich.addTopping(new Toppings(topping));
    }

    updateOrderPreview() {
        const orderPreview = document.getElementById("preview");
        console.log("HIIIIII");
        console.log(order);
        orderPreview.innerHTML = `
            <h2>Order so far: </h2>
            <p>
                <strong>Size:</strong> ${this.sandwich.size || "None"} | 
                <strong>Bread:</strong> ${this.sandwich.bread || "None"} | 
                <strong>Meat:</strong> ${this.sandwich.meat || "None"} | 
                <strong>Cheese:</strong> ${this.sandwich.cheese || "None"} | 
                <strong>Toppings:</strong> ${this.sandwich.toppings || "None"} | 
                <strong>Drink:</strong> ${this.drink.type || "None"} | 
                <strong>Side:</strong> ${this.sides || "None"}
            </p>
        `;
    }

}