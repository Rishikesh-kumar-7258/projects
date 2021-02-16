// console.log('This is a project which I am going to complete.')

if (!localStorage.getItem("color"))
    localStorage.setItem('color',"black");
if (!localStorage.getItem('background'))
    localStorage.setItem('background', '#bbb');
if (!localStorage.getItem('background_input'))
    localStorage.setItem('background_input', 'white');
if (!localStorage.getItem('btn_id'))
    localStorage.setItem('btn_id', '');

let toggle_btn = document.getElementsByClassName('toggle_back')[0];

toggle_btn.addEventListener('click', () => {
    // console.log('event is fired');

    if (toggle_btn.id == "")
    {
        toggle_btn.id = "white";
        document.getElementsByTagName('body')[0].style.backgroundColor = "#222";
        document.getElementsByTagName('main')[0].style.color = "#aaa";
        document.getElementsByTagName('input')[0].style.background = "lightgrey";
    }
    else{
        toggle_btn.id = "";
        document.getElementsByTagName('body')[0].style.backgroundColor = "#bbb";
        document.getElementsByTagName('main')[0].style.color = "black";
        document.getElementsByTagName('input')[0].style.background = "white";
    }

    let btn_id = localStorage.getItem('btn_id');
    let background = localStorage.getItem('background');
    let background_input = localStorage.getItem('background_input');
    let color = localStorage.getItem('color');

    if (btn_id == "")
    {
        btn_id = "white";
        background = "#222";
        background_input = "#aaa";
        color = "lightgrey";
    }
    else
    {
        btn_id = "";
        background = "#bbb";
        background_input = "white"
        color = "#000"
    }

    localStorage.setItem('color',color);
    localStorage.setItem('background', background);
    localStorage.setItem('background_input', background_input);
    localStorage.setItem('btn_id', btn_id);

})

toggle_btn.id = localStorage.getItem('btn_id');
document.getElementsByTagName('body')[0].style.backgroundColor = localStorage.getItem('background');
document.getElementsByTagName('main')[0].style.color = localStorage.getItem('color');
document.getElementsByTagName('input')[0].style.background = localStorage.getItem('background_input');


let input = document.getElementById('text');
let text = document.getElementsByClassName('text')[0].innerText;

let PASSAGE_LENGTH =  text.length;
let TIME_START , TIME_END ;

let passage_area = document.getElementsByClassName('text')[0];
passage_area.innerHTML = "";
for (let i = 0; i < PASSAGE_LENGTH; i++)
{
    passage_area.innerHTML += `<span>${text[i]}</span>`;
}

let span = document.getElementsByTagName('span');
let i_span = 0;
input.addEventListener('input', typed = e => {
    if (i_span == 0) TIME_START = Date.now();

    // console.log(typeof(TIME_START));

    if (span[i_span] == '.')
    {
        clearInterval(blink_interval);
        TIME_END = Date.now();
    }
    else
    {
        if (i_span < PASSAGE_LENGTH)
        {
            if (span[i_span].innerText == e.data)
            {
                span[i_span].style.color = "#0f0";
                span[i_span].id = "";
                i_span++;
            }
            else
            {
                span[i_span].style.color = "#f00";
            }
        
        }

        if ( i_span < PASSAGE_LENGTH &&  span[i_span].innerText == " ")
            input.value = "";
    }
});

if (i_span >= PASSAGE_LENGTH) input.removeEventListener('click', typed(e));


let blink_interval = setInterval(() => {

    if (i_span == PASSAGE_LENGTH) 
    {
        clearInterval(blink_interval);
        // console.log(Number(TIME_END) - Number(TIME_START));
    }

    if (i_span < PASSAGE_LENGTH)
        span[i_span].id = "";

    setTimeout(() => {
        if (i_span < PASSAGE_LENGTH)
            span[i_span].id = "blink";
    }, 500);

}, 1000);

let COUNT = 0;

let count_interval = setInterval(() => {
    COUNT += 1;
    
    if (i_span == 0) COUNT = 0;

    if (i_span == PASSAGE_LENGTH) 
    {
        console.log(COUNT);
        clearInterval(count_interval);
        let speed = (PASSAGE_LENGTH / 5 )/ ((COUNT - 1 )/ 60);
        console.log(speed);
    }
}, 1000);

function reset()
{
    location.reload();
}