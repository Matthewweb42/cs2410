class Order {
    constructor(sandwich, drink = null, side = null) {
        this.sandwich = sandwich;
        this.drink = drink;
        this.side = side;
        this.createdTime = new Date();
        this.status = "Pending"; // Status: Pending → In Progress → Completed
    }

}