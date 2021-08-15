// Getting different elements from DOM
const playButton = document.getElementById("playButton");
const pauseButton = document.getElementById("pauseButton");
const stopButton = document.getElementById("stopButton");
let text = document.getElementById("text");
let speed = document.getElementById("speed").value;

// Adding click functionality to play the text sound
playButton.addEventListener('click', () => {
    playText(text.value);
});

// function pauseText to stop the playing sound
const pauseText = () => {
    if (speechSynthesis.speaking) speechSynthesis.pause();
}

// Adding click functinality as an argument to pause the text
pauseButton.addEventListener('click', pauseText);

// function playText takes text as an argument and plays that text
const playText = text => {
    let utter = new SpeechSynthesisUtterance();
    // if (speechSynthesis.paused) return speechSynthesis.speak(utter);
    utter.lang = "en";
    utter.text = text;
    utter.rate = speed || 1;
    window.speechSynthesis.speak(utter);
}