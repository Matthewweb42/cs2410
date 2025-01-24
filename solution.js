
//filter: returns a subset of the input data that contains only the items for which the predicate returns true
function filter(data,predicate){
    const subset = [];
    for (const stuff of data){
        if (predicate(stuff)){
            subset.push(stuff);
        }
    }
    return subset;
}
//findLast: finds the last value in an array that meets the condition specified in the predicate
function findLast(data, predicate){
    let lastValue = null;
    for (const stuff of data){
        if (predicate(stuff)){
            lastValue = stuff;
            }
    }
    return lastValue;
}

//map: creates a new array based on the input array where the value at each 
//position in the array is the result of the callback function.
function map(data, callback){
    const cbArray = [];
    for (const stuff of data){
        cbArray.push(callback(stuff));
    }
    return cbArray;
}


function pairIf(data1, data2, predicate){

    let pair = [];
    for (const stuff1 of data1){
        // console.log(stuff1)
        for (const stuff2 of data2){
            //console.log(stuff2)
            if (predicate(stuff1, stuff2)) {
                // pair[pair.length] = [stuff1,stuff2]
                let pairList = [];
                pairList.push(stuff1);
                pairList.push(stuff2);
                
                pair.push(pairList);
            }
        }
    }
    return pair;
}


function reduce(data1, reducer, initialValue){
    let previousValue = initialValue;
    for (const stuff of data1) {
        previousValue = reducer(stuff, previousValue)
    }
    return previousValue;

}

//invalid transations: filter
    //amount = 0 || null || undefined
    //product != FIG_JAM, FIG_JELLY, SPICY_FIG_JAM, ORANGE_FIG_JELLY
    // single number output
const invalidTransations = filter(transactions, (it)=>{ //it = I nvalid T ransations
    if (it.amount === 0 || it.amount === null || it.amount === undefined){
        return true;
    }
    if (!["FIG_JAM", "FIG_JELLY", "SPICY_FIG_JAM", "ORANGE_FIG_JELLY"].includes(it.product)) {
        return true;  // Invalid product
    }
    return false;
}
);



//Duplicate customers pairif
    //if (email = email AND Id != Id) (two different people)
    // single number output
const duplicateCustomer = pairIf(customers,customers,(customer1, customer2) => { 
    return(customer1.emailAddress === customer2.emailAddress &&
        customer1.id !== customer2.id);
});

//most recentTransactionover two hunder. findLast
    // if transactin > 200
        //array.push
        //return array[array.length-1]

const recentTransationsOverTwoHundred = findLast(transactions,(transaction)=> {
    return transaction.amount > 200;
})

//transaction sizes. reduce
    // T <25 = small. 25 < T < 75 = medium. T >75 = Large
    // Use reducer to check validity, (2nd parameter) 

const transactionSizes = reduce(transactions, (transaction, result)=> {
    if (transaction.amount === 0 || transaction.amount === null || transaction.amount === undefined){
        return result;
    }
    if (!["FIG_JAM", "FIG_JELLY", "SPICY_FIG_JAM", "ORANGE_FIG_JELLY"].includes(transaction.product)) {
        return result;  // Invalid product
    }

    if (transaction.amount < 25){
        result.small ++;
    }else if (transaction.amount < 75){
        result.medium ++;
    }else {
        result.large ++;
    };
    return result;       
    },{small : 0, medium : 0, large : 0});



//transactions over two hunder. pairIf, reduce, filer, map.
    /*
    1- Filter the list to get only transactions over $200
    2- Pair each transaction with it's customer
    3- Reduce the pairs into a list of unique customers (this result is first required output).
        3.5- For this one you are allowed to use the Array.includes method, for example `accumulatedResult.includes(customer)`. It returns a true or false.
    4- Map over the reduced list to get the names of the customers 
    */


// const overTwoHundred = filter(transactions, (transaction) => transaction["amount"] > 200 &&  
//     (transaction.amount !== 0 || transaction.amount !== null || transaction.amount !== undefined) ||
//     ["FIG_JAM", "FIG_JELLY", "SPICY_FIG_JAM", "ORANGE_FIG_JELLY"].includes(transaction.product));


const overTwoHundred = filter(transactions, data => data["amount"] >200 && (data["product"] === "FIG_JAM" || data["product"] ===  "FIG_JELLY" || data["product"] === "SPICY_FIG_JAM"|| data["product"] === "ORANGE_FIG_JELLY"));
    // Invalid product
// console.log(overTwoHundred);


// const transactionPair = pairIf(overTwoHundred, customers, (customer,transaction) => {
//     return customer["customerId"] === transaction["id"];
// });

const transactionPair = pairIf(overTwoHundred, customers, (customer, customerList) => {return (customer["customerId"] === customerList["id"])})
console.log(overTwoHundred);

console.log(transactionPair);

const uniqueCustomerID = reduce(transactionPair, (accumulatedResult, set) => {
    // The second element of the pair is the customer
    if (!accumulatedResult.includes(set[0])) {
        accumulatedResult.push(set[0]);
   
    }
    return accumulatedResult;
}, []);

const customerNames = map(uniqueCustomerID, (customer) => {
    return ` ${customer.firstName} ${customer.lastName}`;
})

console.log("Number of invalid Transactions: "+ invalidTransations.length);
console.log("Number of duplicate customers: " +(duplicateCustomer.length)/2);
console.log("Most recent transaction over $200: $" + recentTransationsOverTwoHundred.amount);
console.log("Number of small transactions: " +transactionSizes.small);
console.log("Number of medium transactions: " +transactionSizes.medium);
console.log("Number of large transactions: " +transactionSizes.large);

console.log("Customers with transactions over $200: ");
console.log(uniqueCustomerID);

console.log("Names of customers with transactions over $200: ");
console.log(customerNames);


 /*
Number of invalid transactions: 636
Number of duplicate customers: 142
Most recent transaction over $200: $225.57
Number of small transactions: 1150
Number of medium transactions: 2322
Number of large transactions: 8315
Customers with transactions over $200: (1417)
[...]
Names of customers with transactions over $200: (1417) 
[...] 
 */
