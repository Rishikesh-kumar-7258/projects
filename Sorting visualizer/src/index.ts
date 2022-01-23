// const message : string = "Om";

const arr: Array<number> = [5, 3, 2, 4, 1, 9, 7, 8, 6];
let ranged_arr : Array<number>;
enum Speed {fast=100, medium=500, slow=1000}
let speed : Speed = Speed.fast;


const bar_area = document.querySelector("#bar_area");

// Adding bars in area
const AddBars = (arr : Array<number>) => {
    bar_area.innerHTML = "";
    arr.forEach((element, index) => {
        const bar = document.createElement("div");
        bar.classList.add("bar");
        bar.id = `bar_${index}`;
        bar.style.height = element+ "px";
        bar_area.appendChild(bar);
    })
}

// function to convert array from one range to another maintaining ratio
const convertRange  = (arr : Array<number>, from : number, to : number) => {
    
    let oldMin : number = arr[0], oldMax : number = arr[0];
    for (let i = 1; i < arr.length; i++) {
        if (arr[i] < oldMin) oldMin = arr[i];
        if (arr[i] > oldMax) oldMax = arr[i];
    }

    let ans : Array<number> = [];
    for (let i = 0; i < arr.length; i++)
    {
        ans.push((arr[i] - oldMin) * (to - from) / (oldMax - oldMin) + from);
    }

    return ans;
}

ranged_arr = convertRange(arr, 10, 400);
AddBars(ranged_arr);

// Fuction for sorting using selection sort
const BubbleSort = (arr : Array<number>,speed : Speed) => {
    let max_index = 0;
    let curr_bar = document.querySelector("#bar_0");
    let max_bar = document.querySelector("#bar_0");
    let swap_cnt: number = 0;

    let i = 0, j = 0, n = arr.length;
    let interval = setInterval(() => {

        if (i >= n - 1) {
            curr_bar.classList.remove('active');
            max_bar.classList.remove('selected');
            clearInterval(interval);
            return;
        }

        if (j >= n - i) {

            // Swapping the bars
            let temp = arr[n - i - 1];
            arr[n - i - 1] = arr[max_index];
            arr[max_index] = temp;

            AddBars(ranged_arr);

            i++;
            j = 0;
            max_index = 0;
        }

        if (arr[j] > arr[max_index]) max_index = j;

        if (curr_bar) curr_bar.classList.remove('active');
        curr_bar = document.querySelector(`#bar_${j}`);
        curr_bar.classList.add('active');

        if (max_bar) max_bar.classList.remove('selected');
        max_bar = document.querySelector(`#bar_${max_index}`);
        max_bar.classList.add('selected');

        j++;
    }, speed);

}


// Activating start Button
const start_btn = document.querySelector("#start_btn");
start_btn.addEventListener('click', () => {
    BubbleSort(ranged_arr,speed);
})

// Changing speed
const speed_select = document.querySelector("#speed") as HTMLSelectElement;
speed_select.addEventListener('change', () => {
    let selected_value = speed_select.value.toLowerCase();
    
    if (selected_value === "fast") speed = Speed.fast;
    else if (selected_value === "medium") speed = Speed.medium;
    else if (selected_value === "slow") speed = Speed.slow;
})

// Taking input from user
const area = document.querySelector("#array_data") as HTMLTextAreaElement;
const array_save_btn = document.querySelector("#array_saver") as HTMLButtonElement;
array_save_btn.addEventListener('click', () => {

    let input_arr = area.value.split(" ");

    let input_arr_num : Array<number> = [];
    input_arr.forEach((element) => {
        input_arr_num.push(parseFloat(element));
    })

    ranged_arr = convertRange(input_arr_num, 10, 400);
    AddBars(ranged_arr);
})