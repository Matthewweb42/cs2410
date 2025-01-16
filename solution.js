

/*
  @data: an array of any arbitrary data
  @predicate: a function that takes a single datapoint as an argument. Returns either true or false.
  @return: a new array that contains all of the values in data
           for which the predicate function returns true
*/

//filter: returns a subset of the input data that contains only the items for which the predicate returns true
function filter(data,predicate){
    return data.filter(predicate);
    
    
    // const subset = [];
    // for (const stuff of data){
    //     if (predicate(stuff)){
    //         subset.push(stuff);
    //     }
    // }
    // return subset;
}
//findLast: finds the last value in an array that meets the condition specified in the predicate
function findLast(data, predicate){
    const lastValue = [];
    for (const stuff of data){
        if (predicate(stuff))
            if (lastValue.length >0){
                lastValue.pop;
                lastValue.push(stuff);
            }else{
                lastValue.push(stuff);
            }
    }
    return lastValue;
}

//map: creates a new array based on the input array where the value at each 
//position in the array is the result of the callback function.
function map(){

}

function pairIf(){

}

function reduce(){

}

