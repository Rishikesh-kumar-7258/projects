let natural = "0123456789";
let small = "abcdefghijklmnopqrstuvwxyz";
let cap = small.toUpperCase()
let special = "~!@#$%^&*()_+}{[]|";

let string = natural + special + small + cap;
let len = 12;


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

    while (password.length < len)
    {
        a = Math.random() * (string.length - 1);

        let c = string.charAt(a);
        let c_upper, c_lower;
        if (/[^a-z]/.test(c)) 
        {
            c_upper = c.toUpperCase();
            c_lower = c;
        }
        else if (/[A-Z]/.test(c))
        {
            c_upper = c;
            c_lower = c.toLowerCase();
        }
        if (password.includes(c_upper) || password.includes(c_lower) || password.includes(c)) continue;

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

    return password;
}

let passlen = document.querySelector(".passlen");
passlen.addEventListener("input", function() {
    if (this.value < 8)
    {
        this.classList.remove("is-valid");
        this.classList.add("is-invalid");
    } 
    else {
        this.classList.remove("is-invalid");
        this.classList.add("is-valid");
    }
    len = this.value;
})

let passholder = document.querySelector(".passholder p");
passholder.innerText = make_random(len)

let generatebtn = document.querySelector(".generate-btn");

generatebtn.addEventListener("click", function(){
    
    len = len < 8 ? 8 : len;
    len = len > 25 ? 25 : len;
    passholder.innerText = make_random(len);
})

let copybtn = document.querySelector(".fa-clipboard");
copybtn.addEventListener("click", function(){
    navigator.clipboard.writeText(passholder.innerText);

    this.classList.remove("fa-clipboard");
    this.innerText = "Copied";

    setTimeout(() => {
        this.classList.add("fa-clipboard");
        this.innerText = "";
    }, 1000);
})