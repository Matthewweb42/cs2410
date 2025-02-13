document.addEventListener("DOMContentLoaded", function () {
    const orderForm = document.getElementById("order-form");
    const orderSoFar = document.querySelector(".Order-so-far");
    const orderSummary = document.createElement("ul");
    orderSoFar.appendChild(orderSummary);

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
        const orderPreview = document.querySelector(".Order-so-far");
        orderPreview.innerHTML = `
            <h2>Order so far...</h2>
            <p><strong>Size:</strong> ${orderSelections.size || "None"}</p>
            <p><strong>Bread:</strong> ${orderSelections.bread || "None"}</p>
            <p><strong>Meat:</strong> ${orderSelections.meat || "None"}</p>
            <p><strong>Cheese:</strong> ${orderSelections.cheese || "None"}</p>
            <p><strong>Toppings:</strong> ${orderSelections.toppings.length ? orderSelections.toppings.join(", ") : "None"}</p>
            <p><strong>Drink:</strong> ${orderSelections.drink || "None"}</p>
            <p><strong>Side:</strong> ${orderSelections.side || "None"}</p>
        `;
    }


    // Toppings and Sides
    document.querySelectorAll(".multiple button").forEach(button => {
        button.addEventListener("click", function(event) {
            event.preventDefault(); // Prevent form submission on button clicks
            button.classList.toggle("active");

            updateOrderPreview();
        });
    });
    // Size, Bread, Meat, Cheese
    document.querySelectorAll(".single").forEach(group => {
        const buttons = group.querySelectorAll("button");
        buttons.forEach(button => {
            button.addEventListener("click", function(event) {
                event.preventDefault(); // Prevent form submission on button clicks
                buttons.forEach(btn => btn.classList.remove("active"));
                // Add active class to the clicked button
                this.classList.add("active");
                if (group.id === "size") {
                    order.size = this.textContent;
                    size = this.textContent
                } else if (group.id === "bread") {
                    order.bread = this.textContent;
                } else if (group.id === "meat") {
                    order.meat = this.textContent;
                } else if (group.id === "cheese") {
                    order.cheese = this.textContent;
                }
                updateOrderPreview();
            });
        });
        });
    });

    
