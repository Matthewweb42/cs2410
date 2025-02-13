document.addEventListener("DOMContentLoaded", function () {
    // const orderForm = document.getElementById("order-form");
    // const orderSoFar = document.querySelector(".Order-so-far");
    // const orderSummary = document.createElement("ul");
    // orderSoFar.appendChild(orderSummary);

    // Object to store selected items
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
            <h2>Order so far...</h2>
            <p><strong>Size:</strong> ${order.size || "None"}</p>
            <p><strong>Bread:</strong> ${order.bread || "None"}</p>
            <p><strong>Meat:</strong> ${order.meat || "None"}</p>
            <p><strong>Cheese:</strong> ${order.cheese || "None"}</p>
            <p><strong>Toppings:</strong> ${order.toppings || "None"}</p>
            <p><strong>Drink:</strong> ${order.drink || "None"}</p>
            <p><strong>Side:</strong> ${order.sides || "None"}</p>
        `;
    }


    // Toppings and Sides
    const sides = [];
    const toppings = [];
    document.querySelectorAll(".multiple button").forEach(button => {
        button.addEventListener("click", function(event) {
            event.preventDefault(); // Prevent form submission on button clicks
            button.classList.toggle("active");

            if (button.name == "side"){
                console.log("SIDE LOOP")
                sides.push(button.innerHTML);
                order.sides = sides}
            else if (button.name == "topping"){
                console.log("TOPPING LOOP")
                toppings.push(button.innerHTML);
                order.toppings = toppings;}
            updateOrderPreview();
        });
    });
    // Size, Bread, Meat, Cheese, and Drink
    document.querySelectorAll(".single").forEach(group => {
        const buttons = group.querySelectorAll("button");

        buttons.forEach(button => {
            button.addEventListener("click", function(event) {
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

    
