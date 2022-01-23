// const message : string = "Om";
var arr;
var ranged_arr;
var Speed;
(function (Speed) {
    Speed[Speed["fast"] = 10] = "fast";
    Speed[Speed["medium"] = 50] = "medium";
    Speed[Speed["slow"] = 100] = "slow";
})(Speed || (Speed = {}));
var speed = Speed.fast;
var size = 10;
var bar_area = document.querySelector("#bar_area");
// Adding bars in area
var AddBars = function (arr) {
    bar_area.innerHTML = "";
    arr.forEach(function (element, index) {
        var bar = document.createElement("div");
        bar.classList.add("bar");
        bar.id = "bar_".concat(index);
        bar.style.height = element + "px";
        bar_area.appendChild(bar);
    });
};
// function to convert array from one range to another maintaining ratio
var convertRange = function (arr, from, to) {
    var oldMin = arr[0], oldMax = arr[0];
    for (var i = 1; i < arr.length; i++) {
        if (arr[i] < oldMin)
            oldMin = arr[i];
        if (arr[i] > oldMax)
            oldMax = arr[i];
    }
    var ans = [];
    for (var i = 0; i < arr.length; i++) {
        ans.push((arr[i] - oldMin) * (to - from) / (oldMax - oldMin) + from);
    }
    return ans;
};
// Function to make a random array
var makeRandom = function (size) {
    var ans = [];
    for (var i = 0; i < size; i++)
        ans.push(i + 1);
    for (var i = 0; i < size; i++) {
        var curr = Math.round(Math.random() * (size - i - 1)) + i;
        var temp = ans[i];
        ans[i] = ans[curr];
        ans[curr] = temp;
    }
    return ans;
};
arr = makeRandom(size);
ranged_arr = convertRange(arr, 10, 400);
AddBars(ranged_arr);
// Fuction for sorting using selection sort
var selectionSort = function (arr, speed) {
    var max_index = 0;
    var curr_bar = document.querySelector("#bar_0");
    var max_bar = document.querySelector("#bar_0");
    var i = 0, j = 0, n = arr.length;
    var interval = setInterval(function () {
        if (i >= n - 1) {
            curr_bar.classList.remove('active');
            max_bar.classList.remove('selected');
            clearInterval(interval);
            return;
        }
        if (j >= n - i) {
            // Swapping the bars
            var temp = arr[n - i - 1];
            arr[n - i - 1] = arr[max_index];
            arr[max_index] = temp;
            AddBars(ranged_arr);
            i++;
            j = 0;
            max_index = 0;
        }
        if (arr[j] > arr[max_index])
            max_index = j;
        if (curr_bar)
            curr_bar.classList.remove('active');
        curr_bar = document.querySelector("#bar_".concat(j));
        curr_bar.classList.add('active');
        if (max_bar)
            max_bar.classList.remove('selected');
        max_bar = document.querySelector("#bar_".concat(max_index));
        max_bar.classList.add('selected');
        j++;
    }, speed);
};
// function for sorting using Bubble sort
var bubbleSort = function (arr, speed) {
    var n = arr.length;
    var i = 0, j = 0, swapped = false;
    var curr_bar = document.querySelector("#bar_0");
    var interval = setInterval(function () {
        if (i >= n - 1 || (i > 0 && swapped === false)) {
            curr_bar.classList.remove('active');
            clearInterval(interval);
            return;
        }
        if (j >= n - i) {
            i++;
            j = 0;
        }
        if (arr[j] > arr[j + 1]) {
            var temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;
            swapped = true;
            AddBars(ranged_arr);
        }
        if (curr_bar)
            curr_bar.classList.remove('active');
        curr_bar = document.querySelector("#bar_".concat(j));
        curr_bar.classList.add('active');
        j++;
    }, speed);
};
// function for sorting using insertion sort
// const insertionSort = (arr : Array<number>, speed : Speed) => {
//     let i : number = 0, j : number = 0, n : number = arr.length;
//     let interval = setInterval(() => {
//         if (i >= n) {
//             clearInterval(interval);
//             return;
//         }
//         if (j >= n - i) {
//             i++;
//             j = 0;
//         }
//         if (arr[j] > arr[j + 1]) {
//             let temp = arr[j];
//             arr[j] = arr[j + 1];
//             arr[j + 1] = temp;
//             AddBars(ranged_arr);
//         }
//         j++;
//     }, speed);
// }
// Activating start Button
var start_btn = document.querySelector("#start_btn");
start_btn.addEventListener('click', function () {
    var sorting_type = document.querySelector("#sorting_type");
    if (sorting_type.value === "Selection sort")
        selectionSort(ranged_arr, speed);
    else if (sorting_type.value === 'Bubble sort')
        bubbleSort(ranged_arr, speed);
    // else if (sorting_type.value === 'Insertion sort') insertionSort(ranged_arr,speed);
});
// Changing speed
var speed_select = document.querySelector("#speed");
speed_select.addEventListener('change', function () {
    var selected_value = speed_select.value.toLowerCase();
    if (selected_value === "fast")
        speed = Speed.fast;
    else if (selected_value === "medium")
        speed = Speed.medium;
    else if (selected_value === "slow")
        speed = Speed.slow;
});
// Taking input from user
var area = document.querySelector("#array_data");
var array_save_btn = document.querySelector("#array_saver");
array_save_btn.addEventListener('click', function () {
    var input_arr = area.value.split(" ");
    arr = [];
    input_arr.forEach(function (element) {
        arr.push(parseFloat(element));
    });
    ranged_arr = convertRange(arr, 10, 400);
    AddBars(ranged_arr);
});
// Changing size of the list
var slider = document.querySelector("#size");
slider.addEventListener('change', function () {
    console.log(slider.value);
    size = parseInt(slider.value);
    arr = makeRandom(size);
    ranged_arr = convertRange(arr, 10, 400);
    AddBars(ranged_arr);
});
