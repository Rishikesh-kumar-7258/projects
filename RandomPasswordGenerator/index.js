let pdiv = document.querySelector(".pass");
let natural = "0123456789";
let small = "abcdefghijklmnopqrstuvwxyz";
let cap = small.toUpperCase()
let special = "@#$%&";

let string = natural + small + cap + special;
let len = 8;


function make_random(len) {

    let password = "";
    let a = Math.random() * (natural.length - 1);
    password += natural.charAt(a);
    a = Math.random() * (small.length - 1);
    password += small.charAt(a);
    a = Math.random() * (cap.length - 1);
    password += cap.charAt(a);
    a = Math.random() * (special.length - 1);
    password += special.charAt(a);


    for (let i = 0, n = len - password.length; i < n; i++) {
        a = Math.random() * (string.length - 1);
        password += string.charAt(a);
    }

    let parr = [];
    for (let i = 0; i < len; i++) parr.push(password.charAt(i));

    for (let i = 0; i < len; i++) {
        a = parseInt(Math.random() * (len - i - 1))
        let temp = parr[i];
        parr[i] = parr[i + a];
        parr[i + a] = temp;
    }
    password = "";
    for (let i = 0; i < len; i++) password += parr[i];

    pdiv.innerText = password;
}

let button = document.querySelector('.submit-btn');
button.addEventListener('click', function () {
    len = document.querySelector('#len').value || 8;

    len = len < 8 ? 8 : len;
    len = len > 25 ? 25 : len;
    make_random(len)
})
make_random(len)

let btn2 = document.querySelector(".clipboard-btn");
btn2.addEventListener("click", function(){
    navigator.clipboard.writeText(pdiv.innerText)
})