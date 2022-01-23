// const message : string = "Om";
var arr = [5, 3, 2, 4, 1, 9, 7, 8, 6];
var ranged_arr;
var Speed;
(function (Speed) {
    Speed[Speed["fast"] = 100] = "fast";
    Speed[Speed["medium"] = 500] = "medium";
    Speed[Speed["slow"] = 1000] = "slow";
})(Speed || (Speed = {}));
var speed = Speed.fast;
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
ranged_arr = convertRange(arr, 10, 400);
AddBars(ranged_arr);
// Fuction for sorting using selection sort
var BubbleSort = function (arr, speed) {
    var max_index = 0;
    var curr_bar = document.querySelector("#bar_0");
    var max_bar = document.querySelector("#bar_0");
    var swap_cnt = 0;
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
// Activating start Button
var start_btn = document.querySelector("#start_btn");
start_btn.addEventListener('click', function () {
    BubbleSort(ranged_arr, speed);
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
    var input_arr_num = [];
    input_arr.forEach(function (element) {
        input_arr_num.push(parseFloat(element));
    });
    ranged_arr = convertRange(input_arr_num, 10, 400);
    AddBars(ranged_arr);
});
