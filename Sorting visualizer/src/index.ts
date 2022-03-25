// const message : string = "Om";

let arr: Array<number>;
let ranged_arr: Array<number>;
enum Speed { fast = 10, medium = 50, slow = 100 }
let speed: Speed = Speed.fast;
let size: number = 10;


const bar_area = document.querySelector("#bar_area");

// Adding bars in area
const AddBars = (arr: Array<number>) => {
    bar_area.innerHTML = "";
    arr.forEach((element, index) => {
        const bar = document.createElement("div");
        bar.classList.add("bar");
        bar.id = `bar_${index}`;
        bar.style.height = element + "px";
        bar_area.appendChild(bar);
    })
}

// function to convert array from one range to another maintaining ratio
const convertRange = (arr: Array<number>, from: number, to: number) => {

    let oldMin: number = arr[0], oldMax: number = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < oldMin) oldMin = arr[i];
        if (arr[i] > oldMax) oldMax = arr[i];
    }

    let ans: Array<number> = [];
    for (let i = 0; i < arr.length; i++) {
        ans.push((arr[i] - oldMin) * (to - from) / (oldMax - oldMin) + from);
    }

    return ans;
}

// Function to make a random array
const makeRandom = (size: number) => {
    let ans: Array<number> = [];

    for (let i = 0; i < size; i++) ans.push(i + 1);

    for (let i = 0; i < size; i++) {
        let curr: number = Math.round(Math.random() * (size - i - 1)) + i;

        let temp = ans[i];
        ans[i] = ans[curr];
        ans[curr] = temp;
    }

    return ans;
}

arr = makeRandom(size);
ranged_arr = convertRange(arr, 10, 400);
AddBars(ranged_arr);

// Fuction for sorting using selection sort
const selectionSort = (arr: Array<number>, speed: Speed) => {
    let min_index = 0;
    let curr_bar = document.querySelector("#bar_0");
    let min_bar = document.querySelector("#bar_0");

    let i = 0, j = 0, n = arr.length;
    let interval = setInterval(() => {

        if (i >= n - 1) {
            curr_bar.classList.remove('active');
            min_bar.classList.remove('selected');
            clearInterval(interval);
            return;
        }

        if (j >= n) {

            // Swapping the bars
            let temp = arr[i];
            arr[i] = arr[min_index];
            arr[min_index] = temp;

            AddBars(ranged_arr);

            i++;
            j = i;
            min_index = j;
        }

        if (arr[j] < arr[min_index]) min_index = j;

        if (curr_bar) curr_bar.classList.remove('active');
        curr_bar = document.querySelector(`#bar_${j}`);
        curr_bar.classList.add('active');

        if (min_bar) min_bar.classList.remove('selected');
        min_bar = document.querySelector(`#bar_${min_index}`);
        min_bar.classList.add('selected');

        j++;
    }, speed);

}

// function for sorting using Bubble sort
const bubbleSort = (arr: Array<number>, speed: Speed) => {
    let n: number = arr.length;
    let i: number = 0, j: number = 0, swapped: boolean = false;
    let curr_bar = document.querySelector("#bar_0");

    let interval = setInterval(() => {

        if (i >= n - 1 || (i > 0 && swapped === false)) {
            curr_bar.classList.remove('active');
            clearInterval(interval);
            return;
        }

        if (j >= n - i - 1) {
            i++;
            j = 0;
        }

        if (arr[j] > arr[j + 1]) {
            let temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;

            swapped = true;

            AddBars(ranged_arr);
        }

        if (curr_bar) curr_bar.classList.remove('active');
        curr_bar = document.querySelector(`#bar_${j}`);
        curr_bar.classList.add('active');

        j++;

    }, speed);
}

// function for sorting using insertion sort
const insertionSort = (arr: Array<number>, speed: Speed) => {
    let i: number = 0, j: number = 1, n: number = arr.length;
    let interval = setInterval(() => {

        if (i >= n) {
            clearInterval(interval);
            return;
        }

        if (j <= 0 || arr[j] > arr[j - 1]) {
            i++;
            j = i + 1;
        }

        if (arr[j] < arr[j - 1]) {
            let temp = arr[j];
            arr[j] = arr[j - 1];
            arr[j - 1] = temp;

            AddBars(ranged_arr);
        }

        j--;

    }, speed);
}

// Quick sort algorithm
const quickSort = (arr: Array<number>, l: number, h: number, speed: number) => {

    let st: Array<number> = [];
    let top: number = -1;

    let currBar = document.querySelector("#bar_0");
    let pivotBar = document.querySelector("#bar_" + h);
    let currI: HTMLDivElement;

    st[++top] = l;
    st[++top] = h;

    let i: number = -1, j: number = 0, pivot: number = arr[h];
    let interval = setInterval(() => {

        if (top < 0) {
            AddBars(arr);
            clearInterval(interval);
            return;
        }

        if (j > h) {
            let temp = arr[i + 1];
            arr[i + 1] = arr[h];
            arr[h] = temp;


            if (i > l) {
                st[++top] = l;
                st[++top] = i;
            }

            if (i + 2 < h) {
                st[++top] = i + 2;
                st[++top] = h;
            }

            h = st[top--];
            l = st[top--];

            AddBars(arr);
            // console.log(arr);

            pivot = arr[h];
            j = l;
            i = j - 1;

        }
        else {
            if (arr[j] < pivot) {
                i++;
                let temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;

                AddBars(arr);
            }

            j++;
        }

        if (currBar) currBar.classList.remove('active');
        currBar = document.querySelector(`#bar_${j}`);
        currBar.classList.add('active');

        if (pivotBar) pivotBar.classList.remove('selected');
        pivotBar = document.querySelector(`#bar_${h}`);
        pivotBar.classList.add('selected');

        if (currI) currI.classList.remove('curr_i');
        if (i >= 0) {
            currI = document.querySelector(`#bar_${i}`);
            currI.classList.add('curr_i');
        }

    }, speed)

}

// Merge sort algorithm
const mergeSort = (arr: Array<number>, low: number, high: number, speed: number) => {
    let size: number = 1, left: number = 0, mid: number, right: number;
    let isMerging: boolean = false;
    let larr: Array<number> = [], rarr: Array<number> = [];
    let left_index: number, right_index: number, main_index: number;

    let interval = setInterval(() => {

        if (size > high) {
            clearInterval(interval);
            return;
        }

        if (isMerging) {
            if (main_index > right) {
                left += size * 2;
                larr.length = rarr.length = 0;

                isMerging = false;
            }
            if (left_index < larr.length && right_index < rarr.length) {
                if (larr[left_index] < rarr[right_index]) {
                    arr[main_index] = larr[left_index];
                    left_index++;
                    main_index++;
                }
                else {
                    arr[main_index] = rarr[right_index];
                    right_index++;
                    main_index++;
                }

            }
            else {

                if (left_index < larr.length) {
                    arr[main_index] = larr[left_index];
                    left_index++;
                    main_index++;
                }

                if (right_index < rarr.length) {
                    arr[main_index] = rarr[right_index];
                    right_index++;
                    main_index++;
                }
            }


        }
        else {
            if (left > high) {
                left = 0;
                size *= 2;
            }
            else {
                mid = Math.min(left + size - 1, high);
                right = Math.min(left + size * 2 - 1, high);

                isMerging = true;

                for (let i = left; i <= mid; i++) larr.push(arr[i]);
                for (let i = mid + 1; i <= right; i++) rarr.push(arr[i]);

                left_index = right_index = 0;
                main_index = left;
            }
        }

        AddBars(arr);

    }, speed)
}

// Count sort algorithm
const countSort = (arr: Array<number>, speed: number) => {

    arr.forEach((element, index) => {
        arr[index] = Math.round(element);
    })

    console.log(arr);
    
    
    let isCounting : Boolean = true;
    let currentIndex : number = 0;
    let countArray : Array<number> = [], sortedArray : Array<number> = [];
    let maxNumber : number = Math.max(...arr) + 1;
    let mainArraySize : number = arr.length;

    for (let i = 0; i <= maxNumber; i++) countArray.push(0);
    for (let i = 0; i < mainArraySize; i++) sortedArray.push(0);

    let interval = setInterval(() => {
        if (isCounting)
        {
            if (currentIndex >= mainArraySize) 
            {

                for (let i = 1; i < maxNumber; i++) countArray[i] += countArray[i - 1];
                for (let i = maxNumber-1; i>=0 ; i--) countArray[i] = countArray[i-1];
                countArray[0] = 0;

                isCounting = false;
                currentIndex = 0;

                // console.log(arr);
                // console.log(countArray);
                
            }

            countArray[arr[currentIndex]]++;
            currentIndex++;
        }
        else
        {
            if (currentIndex >= mainArraySize)
            {
                for (let i = 0; i < mainArraySize; i++) arr[i] = sortedArray[i];
                console.log(arr, sortedArray, countArray);

                AddBars(arr);
                clearInterval(interval);
                return;
            }

            sortedArray[countArray[arr[currentIndex]]] = arr[currentIndex];
            countArray[arr[currentIndex]]++;

            currentIndex++;
        }
    }, speed)
}


// Activating start Button
const start_btn = document.querySelector("#start_btn");
start_btn.addEventListener('click', () => {

    const sorting_type = document.querySelector("#sorting_type") as HTMLSelectElement;

    switch (sorting_type.value) {
        case "Selection":
            selectionSort(ranged_arr, speed);
            break;
        case "Bubble":
            bubbleSort(ranged_arr, speed);
            break;
        case "Insertion":
            insertionSort(ranged_arr, speed);
            break;
        case "Quick":
            quickSort(ranged_arr, 0, ranged_arr.length - 1, speed);
            break;
        case "Merge":
            mergeSort(ranged_arr, 0, ranged_arr.length - 1, speed);
            break;
        case "Count":
            countSort(ranged_arr, speed);
            break;
        default:
            break;
    }

})

// Changing speed
const speed_select = document.querySelector("#speed") as HTMLSelectElement;
speed_select.addEventListener('change', () => {
    let selected_value = speed_select.value.toLowerCase();

    if (selected_value === "fast") speed = Speed.fast;
    else if (selected_value === "medium") speed = Speed.medium;
    else if (selected_value === "slow") speed = Speed.slow;

    arr = makeRandom(size);
    ranged_arr = convertRange(arr, 10, 400);
    AddBars(ranged_arr);
})

// Taking input from user
const area = document.querySelector("#array_data") as HTMLTextAreaElement;
const array_save_btn = document.querySelector("#array_saver") as HTMLButtonElement;
array_save_btn.addEventListener('click', () => {

    let input_arr = area.value.split(" ");

    arr = [];
    input_arr.forEach((element) => {
        arr.push(parseFloat(element));
    })

    ranged_arr = convertRange(arr, 10, 400);
    AddBars(ranged_arr);
})

// Changing size of the list
const slider = document.querySelector("#size") as HTMLInputElement;
slider.addEventListener('change', () => {
    // console.log(slider.value);
    size = parseInt(slider.value);
    arr = makeRandom(size);
    ranged_arr = convertRange(arr, 10, 400);
    AddBars(ranged_arr);
})