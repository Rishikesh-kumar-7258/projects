let textarea = document.querySelector("textarea");
let speed = document.querySelector("#speed").value;
let playbtn = document.querySelector(".play");
let stopbtn = document.querySelector(".stop");

let synth = window.SpeechSynthesis;
// console.log(synth.getVoices());

let utter = new SpeechSynthesisUtterance();

playbtn.addEventListener("click", function () {

    // toggling play and pause functionality
    let span = document.querySelector(".play span");

    span.classList.toggle("fa-play");
    span.classList.toggle("fa-pause");

    utter.text = textarea.value;
    synth.speak(utter);

})
stopbtn.addEventListener("click", function () {
    console.log("stopbtn is clicked");
})