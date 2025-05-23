document.addEventListener("DOMContentLoaded", function () {
    let order = new Order();

    //Click for sides and toppings
    document.querySelectorAll(".multiple button").forEach(button => {
        button.addEventListener("click", function (event) {
            event.preventDefault(); 
            button.classList.toggle("active");
            if (button.name == "sides") {
                order.addSide(button.innerHTML)
            }else if (button.name == "toppings") {
                order.addTopping(button.innerHTML)
            }
            order.updateOrderPreview();
        });
    });
    //Click for Size, Bread, Meat, Cheese, and Drink
    document.querySelectorAll(".single").forEach(group => {
        const buttons = group.querySelectorAll("button");

        buttons.forEach(button => {
            button.addEventListener("click", function (event) {
                event.preventDefault(); 
                buttons.forEach(btn => btn.classList.remove("active"));
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
                        order.drink.type = button.innerHTML;
                    }          
                }
                order.updateOrderPreview();
            });
        });
    });
    //Click for Submit Order
    const orderForm = document.getElementById("order-form");
    orderForm.addEventListener("submit", (event)=>{
        event.preventDefault();


        //Error Handling
        const errorMessage = document.getElementById("error-message");
        if (!order.sandwich.size || !order.sandwich.bread || !order.sandwich.meat || !order.sandwich.cheese || !order.drink){
            errorMessage.innerHTML = "Please select a size, bread, meat, and one kind of cheese.";
            errorMessage.style.display = "block";
            return;
        }else{
            errorMessage.style.display = "none";
        }

        //Table Stuff, New Orders to htlmElements
        const newOrdersSection = document.querySelector(".New-Orders tbody");
        const orderElement = order.toHTMLElement();
        const orderRow = document.createElement("tr");
        const orderCell = document.createElement("td");
        orderCell.appendChild(orderElement);
        orderRow.appendChild(orderCell);
        newOrdersSection.appendChild(orderRow);

        //timer stuff
        setTimeout(() => {
            document.querySelector(".Waiting tbody").appendChild(orderRow);
        }, 60000);

        setTimeout(() => {
            document.querySelector(".Hurry-Up tbody").appendChild(orderRow);
        }, 90000);

        //Reset Form
        orderForm.reset();
        order = new Order();
        document.querySelectorAll(".single button, .multiple button").forEach(button => button.classList.remove("active"));
        order.updateOrderPreview();
    });

    
 });


