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
    var min_index = 0;
    var curr_bar = document.querySelector("#bar_0");
    var min_bar = document.querySelector("#bar_0");
    var i = 0, j = 0, n = arr.length;
    var interval = setInterval(function () {
        if (i >= n - 1) {
            curr_bar.classList.remove('active');
            min_bar.classList.remove('selected');
            clearInterval(interval);
            return;
        }
        if (j >= n) {
            // Swapping the bars
            var temp = arr[i];
            arr[i] = arr[min_index];
            arr[min_index] = temp;
            AddBars(ranged_arr);
            i++;
            j = i;
            min_index = j;
        }
        if (arr[j] < arr[min_index])
            min_index = j;
        if (curr_bar)
            curr_bar.classList.remove('active');
        curr_bar = document.querySelector("#bar_".concat(j));
        curr_bar.classList.add('active');
        if (min_bar)
            min_bar.classList.remove('selected');
        min_bar = document.querySelector("#bar_".concat(min_index));
        min_bar.classList.add('selected');
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
        if (j >= n - i - 1) {
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
var insertionSort = function (arr, speed) {
    var i = 0, j = 1, n = arr.length;
    var interval = setInterval(function () {
        if (i >= n) {
            clearInterval(interval);
            return;
        }
        if (j <= 0 || arr[j] > arr[j - 1]) {
            i++;
            j = i + 1;
        }
        if (arr[j] < arr[j - 1]) {
            var temp = arr[j];
            arr[j] = arr[j - 1];
            arr[j - 1] = temp;
            AddBars(ranged_arr);
        }
        j--;
    }, speed);
};
// Quick sort algorithm
var quickSort = function (arr, l, h, speed) {
    var st = [];
    var top = -1;
    st[++top] = l;
    st[++top] = h;
    var i = -1, j = 0, pivot = arr[h];
    var interval = setInterval(function () {
        if (top < 0) {
            AddBars(arr);
            clearInterval(interval);
            return;
        }
        if (j > h) {
            var temp = arr[i + 1];
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
            console.log(arr);
            pivot = arr[h];
            j = l;
            i = j - 1;
        }
        else {
            if (arr[j] < pivot) {
                i++;
                var temp = arr[i];
                arr[i] = arr[j];
                arr[j] = temp;
                AddBars(arr);
            }
            j++;
        }
    }, speed);
};
// Activating start Button
var start_btn = document.querySelector("#start_btn");
start_btn.addEventListener('click', function () {
    var sorting_type = document.querySelector("#sorting_type");
    if (sorting_type.value === "Selection")
        selectionSort(ranged_arr, speed);
    else if (sorting_type.value === 'Bubble')
        bubbleSort(ranged_arr, speed / 2);
    else if (sorting_type.value === 'Insertion')
        insertionSort(ranged_arr, speed);
    else if (sorting_type.value === "Quick")
        quickSort(ranged_arr, 0, ranged_arr.length - 1, speed);
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
