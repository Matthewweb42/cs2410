

/*
  @data: an array of any arbitrary data
  @predicate: a function that takes a single datapoint as an argument. Returns either true or false.
  @return: a new array that contains all of the values in data
           for which the predicate function returns true
*/



//filter: returns a subset of the input data that contains only the items for which the predicate returns true
function filter(data,predicate){
    const subset = [];
    for (const stuff of data){
        if (!predicate(stuff)){
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

/*
  pairIf: creates a new array based on the input arrays where the value at each position is an 
          array that contains the 2 values that pair according to the predicate function.
  @data1: an array of any arbitrary data
  @data2: an array of any arbitrary data
  @predicate: a function that takes a single datapoint from each input array as an argument. Returns true or false
  @return: the newly created array of pairs
*/
function pairIf(data1, data2, predicate){
    const pairs = [];
    for (const stuff1 of data1){
        for (const stuff2 of data2){
            if (predicate(stuff1, stuff2))
                pairs.push([stuff1,stuff2]);
        }
    }
    return pairs;
}

/*
  reduce: creates an accumulated result based on the reducer function. The value returned is returned
          is the return value of the reducer function for the final iteration.
  @data: an array of any arbitrary data
  @reducer: a function that takes a single datapoint from each input array as an
            argument and the result of the reducer function from the previous iteration.
            Returns the result to be passed to the next iteration
  @initialValue: the starting point for the reduction.
  @return: the value from the final call to the reducer function.
*/
function reduce(data1, reducer, initialValue){
    let previousValue = initialValue;
    for (const stuff of data1) {
        previousValue = reducer(stuff,previousValue)
    }
    return previousValue;

}

//invalid transations: filter
    //amount = 0 || null || undefined
    //product != FIG_JAM, FIG_JELLY, SPICY_FIG_JAM, ORANGE_FIG_JELLY
    // single number output
const invalidTransations = filter(transactions, (it)=>{ //it = I nvalid T ransations
    if (it.amount === 0 || it.amount === null || it.amount === undefined){
        return false;
    }
    if (it.product === "FIG_JAM"||it.product === "FIG_JELLY"||
        it.product === "SPICY_FIG_JAM"|| it.product ==="ORANGE_FIG_JELLY"){
        return true;
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
    if (transaction.amount < 25){
        result.small ++;
    }else if (transaction.amount <= 75){
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
    4- For this one you are allowed to use the Array.includes method, for example `accumulatedResult.includes(customer)`. It returns a true or false.
    5- Map over the reduced list to get the names of the customers 
    */

const sortingCustomersWithHighTransactions = (transactions, customers) =>
    map(
        reduce(
            pairIf(
                filter()
            )
        )
    )

console.log("Number of invalid Transactions: "+ invalidTransations.length);
console.log("Number of duplicate customers: " +duplicateCustomer.length);
console.log("Most recent transaction over $200: $" + recentTransationsOverTwoHundred.amount);
console.log("Number of small transactions: " +transactionSizes.small);
console.log("Number of medium transactions: " +transactionSizes.medium);
console.log("Number of large transactions: " +transactionSizes.large);




//customertransactionspaired
//uniquecustomers
//namesofcustomers

 /*
 Most recent transaction over $200: $225.57
Number of small transactions: 1150
Number of medium transactions: 2322
Number of large transactions: 8315
Customers with transactions over $200: (1417)
[...]
Names of customers with transactions over $200: (1417) 
[...] 
 */
