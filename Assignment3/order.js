class Order {
    constructor() {
        this.sandwich = new Sandwich();
        this.drink = new Drink();
        this.sides = [];
        this.createTime = new Date();

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
                <strong>Drink:</strong> ${this.drink.type || "None"} | 
                <strong>Side:</strong> ${this.sides.map(side => side.type).join(", ") || "None"}
            </p>
        `;
    }

    toHTMLElement() {
        let startTime = Date.now();
        const orderElement = document.createElement("div");
        orderElement.classList.add("order-card");
        const orderNumber = Math.floor(Math.random() * 1000);
        const orderTime = this.createTime.toLocaleTimeString();
        orderElement.innerHTML = `
            <h3>Order ${orderNumber} | ${orderTime} | </h3> <h4> | Sandwich ${this.drink.type || ""} ${this.sides.map(side => side.type).join(", ") || ""} | </h4>
             `;
        orderElement.addEventListener("dblclick", () => {
            let endTime = Date.now();
            const duration = Math.round((endTime - startTime) / 1000);
            orderElement.innerHTML += `<h4>| Completed in: ${duration} seconds</h4>`;
            const completedOrders = document.querySelector(".completed");
            completedOrders.prepend(orderElement);
        });
        return orderElement;

}
}