class Order {
    constructor() {
        this.sandwich = new Sandwich();
        this.drink = new Drink();
        this.sides = [];
        this.createTime = new Date();
        // this.createdTime = new Date();
        // this.status = "Pending"; // Status: Pending → In Progress → Completed
    }

    addSide(side) {
        const index = this.sides.findIndex(s => s.type === side);
        if (index === -1) {
            this.sides.push(new Sides(side))
        }else{
            this.sides.splice(index, 1);
        };
    }

    addTopping(topping) {
        const index = this.sandwich.toppings.findIndex(t => t === topping);
        if (index === -1) {
            this.sandwich.toppings.push(topping);
        } else {
            this.sandwich.toppings.splice(index, 1);
        }
    }


    updateOrderPreview() {
        const orderPreview = document.getElementById("preview");
        console.log("Order Test");
        orderPreview.innerHTML = `
            <h2>Order so far: </h2>
            <p>
                <strong>Size:</strong> ${this.sandwich.size || "None"} | 
                <strong>Bread:</strong> ${this.sandwich.bread || "None"} | 
                <strong>Meat:</strong> ${this.sandwich.meat || "None"} | 
                <strong>Cheese:</strong> ${this.sandwich.cheese || "None"} | 
                <strong>Toppings:</strong> ${this.sandwich.toppings.join(", ") || "None"} | 
                <strong>Drink:</strong> ${this.drink || "None"} | 
                <strong>Side:</strong> ${this.sides.map(side => side.type).join(", ") || "None"}
            </p>
        `;
    }

    toHTMLElement() {
        const orderElement = document.createElement("div");
        orderElement.classList.add("order-item");
        orderElement.innerHTML = `
            <h3>Order Details:</h3>
            <p><strong>Size:</strong> ${this.sandwich.size || "None"}</p>
            <p><strong>Bread:</strong> ${this.sandwich.bread || "None"}</p>
            <p><strong>Meat:</strong> ${this.sandwich.meat || "None"}</p>
            <p><strong>Cheese:</strong> ${this.sandwich.cheese || "None"}</p>
            <p><strong>Toppings:</strong> ${this.sandwich.toppings.join(", ") || "None"}</p>
            <p><strong>Drink:</strong> ${this.drink.type || "None"}</p>
            <p><strong>Sides:</strong> ${this.sides.map(side => side.type).join(", ") || "None"}</p>
        `;
        return orderElement;
    }

}