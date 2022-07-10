// array to store the changes
var changeArray = [];


// function to sort using bubble sort
const BubbleSort = (arr : Array<number>) => {
    // loop through the array
    for (let i = 0; i < arr.length; i++) {
        // loop through the array again
        for (let j = 0; j < arr.length; j++) {
            // if the current element is greater than the next element
            if (arr[i] > arr[j]) {
                // swap the elements
                let temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
            }

            // add the change to the array
            changeArray.push(arr.slice());
        }
    }
    // return the sorted array
    return arr;
}

// function to create the random number array
const createRandomArray = (size : number) => {
    // create an array
    let arr = [];
    // loop through the size
    for (let i = 0; i < size; i++) {
        // push a random number to the array
        arr.push(Math.floor(Math.random() * size));
    }
    // return the array
    return arr;
}