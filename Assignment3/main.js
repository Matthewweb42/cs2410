document.addEventListener("DOMContentLoaded", function () {
    let order = new Order();


    // Toppings and Sides
    // const sides = [];
    // const toppings = [];
    console.log(document.querySelectorAll(".multiple button"))
    document.querySelectorAll(".multiple button").forEach(button => {
        button.addEventListener("click", function (event) {
            event.preventDefault(); 
            button.classList.toggle("active");
            console.log("Active TEST"); 
            if (button.name == "sides") {
                order.addSide(button.innerHTML)
            }else if (button.name == "toppings") {
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
                event.preventDefault(); 
                buttons.forEach(btn => btn.classList.remove("active"));
                // Add active class to the clicked button
                console.log("Active TEST2222");
                this.classList.add("active");
                if (button.classList.contains("active")){
                    if (button.name == "meat"){
                        order.sandwich.meat = button.innerHTML;
                    }else if (button.name == "cheese"){
                        order.sandwich.cheese = button.innerHTML;
                    }else if (button.name == "bread"){
                        order.sandwich.bread = button.innerHTML;
                    }else if (button.name == "size"){
                        order.sandwich.size = button.innerHTML;
                    }else if (button.name == "drink"){
                        order.drink = button.innerHTML;
                    }          
                }
                order.updateOrderPreview();
            });
        });
    });
    const orderForm = document.getElementById("order-form");
    orderForm.addEventListener("submit", (event)=>{
        event.preventDefault();
        
        const newOrdersSection = document.querySelector(".New-Orders tbody");
        const orderElement = order.toHTMLElement();
        const orderRow = document.createElement("tr");
        const orderCell = document.createElement("td");
        orderCell.appendChild(orderElement);
        orderRow.appendChild(orderCell);
        newOrdersSection.appendChild(orderRow);

        //time stuff

        orderForm.reset();
        order52 = new Order();
        document.querySelectorAll(".single button, .multiple button").forEach(button => button.classList.remove("active"));
        order52.updateOrderPreview();
        console.log('ORDER FORM SUBMIT EVENT LISTENER')
    });

    
 });


