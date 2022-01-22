// const message : string = "Namastey Duniya";
var arr = [5, 3, 2, 4, 1, 9, 7, 8, 6];
var Speed;
(function (Speed) {
    Speed[Speed["fast"] = 100] = "fast";
    Speed[Speed["medium"] = 500] = "medium";
    Speed[Speed["slow"] = 1000] = "slow";
})(Speed || (Speed = {}));
var speed = Speed.fast;
var bar_area = document.querySelector("#bar_area");
// Adding bars in area
var AddBars = function () {
    bar_area.innerHTML = "";
    arr.forEach(function (element, index) {
        var bar = document.createElement("div");
        bar.classList.add("bar");
        bar.id = "bar_".concat(index);
        bar.style.height = element * 10 + "px";
        bar_area.appendChild(bar);
    });
};
AddBars();
// Fuction for sorting using selection sort
var BubbleSort = function (speed) {
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
            AddBars();
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
    BubbleSort(speed);
});
