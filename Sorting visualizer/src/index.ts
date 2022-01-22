// const message : string = "Namastey Duniya";

let arr: Array<number> = [5, 3, 2, 4, 1, 9, 7, 8, 6];
enum Speed {fast=100, medium=500, slow=1000}
let speed = Speed.fast;

const bar_area = document.querySelector("#bar_area");

// Adding bars in area
const AddBars = () => {
    bar_area.innerHTML = "";
    arr.forEach((element, index) => {
        const bar = document.createElement("div");
        bar.classList.add("bar");
        bar.id = `bar_${index}`;
        bar.style.height = element * 10 + "px";
        bar_area.appendChild(bar);
    })
}

AddBars();

// Fuction for sorting using selection sort
const BubbleSort = (speed) => {
    let max_index = 0;
    let curr_bar = document.querySelector("#bar_0");
    let max_bar = document.querySelector("#bar_0");

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

            AddBars();

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
    BubbleSort(speed);
})