document.addEventListener("DOMContentLoaded", function () {
    // const orderForm = document.getElementById("order-form");
    // const orderSoFar = document.querySelector(".Order-so-far");
    // const orderSummary = document.createElement("ul");
    // orderSoFar.appendChild(orderSummary);

    // Object to store selected items


    // Link it to objects, change to order.sandwich etc or order.sides toka



    // let order = {
    //     size: null,
    //     bread: null,
    //     meat: null,
    //     cheese: null,
    //     toppings: [],
    //     drink: null,
    //     sides: [],
    // };


    let order = new Order();


    // Toppings and Sides
    const sides = [];
    const toppings = [];
    document.querySelectorAll(".multiple button").forEach(button => {
        button.addEventListener("click", function (event) {
            event.preventDefault(); // Prevent form submission on button clicks
            button.classList.toggle("active");
            if (button.name == "sides") {
                order.addSide(button.innerHTML)
            }
            else if (button.name == "toppings") {
                order.addTopping(button.innerHTML)
            }
            order.updateOrderPreview();
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

                order.updateOrderPreview();
            });
        });
    });
});


