document.addEventListener("DOMContentLoaded", function () {
    // const orderForm = document.getElementById("order-form");
    // const orderSoFar = document.querySelector(".Order-so-far");
    // const orderSummary = document.createElement("ul");
    // orderSoFar.appendChild(orderSummary);

    // Object to store selected items


    // Link it to objects, change to order.sandwich etc or order.sides toka



    let order = {
        size: null,
        bread: null,
        meat: null,
        cheese: null,
        toppings: [],
        drink: null,
        sides: [],
    };


    function updateOrderPreview() {
        const orderPreview = document.getElementById("preview");
        console.log("HIIIIII");
        console.log(order);
        orderPreview.innerHTML = `
            <h2>Order so far: </h2>
            <p>
                <strong>Size:</strong> ${order.size || "None"} | 
                <strong>Bread:</strong> ${order.bread || "None"} | 
                <strong>Meat:</strong> ${order.meat || "None"} | 
                <strong>Cheese:</strong> ${order.cheese || "None"} | 
                <strong>Toppings:</strong> ${order.toppings || "None"} | 
                <strong>Drink:</strong> ${order.drink || "None"} | 
                <strong>Side:</strong> ${order.sides || "None"}
            </p>
        `;
    }


    // Toppings and Sides
    const sides = [];
    const toppings = [];
    document.querySelectorAll(".multiple button").forEach(button => {
        button.addEventListener("click", function (event) {
            event.preventDefault(); // Prevent form submission on button clicks
            button.classList.toggle("active");
            if (button.name == "sides") {
                console.log("SIDE LOOP")
                sides.push(button.innerHTML);
                order.sides = sides
            }
            else if (button.name == "toppings") {
                console.log("TOPPING LOOP")
                toppings.push(button.innerHTML);
                order.toppings = toppings;
            }
            updateOrderPreview();
        });
    });
    // Size, Bread, Meat, Cheese, and Drink
    document.querySelectorAll(".single").forEach(group => {
        const buttons = group.querySelectorAll("button");

        buttons.forEach(button => {
            button.addEventListener("click", function (event) {
                event.preventDefault(); // Prevent form submission on button clicks
                buttons.forEach(btn => btn.classList.remove("active"));
                // Add active class to the clicked button
                this.classList.add("active");
                if (button.classList.contains("active"))
                    if (button.name == "meat")
                        order.meat = button.innerHTML;
                    else if (button.name == "cheese")
                        order.cheese = button.innerHTML;
                    else if (button.name == "bread")
                        order.bread = button.innerHTML;
                    else if (button.name == "size")
                        order.size = button.innerHTML;
                    else if (button.name == "drink")
                        order.drink = button.innerHTML;

                updateOrderPreview();
            });
        });
    });
});


