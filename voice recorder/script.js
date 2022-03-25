console.log("This is working")

const record_btn = document.getElementById("record_btn");
const click_btn = document.getElementById('click');

// const speechToText = () => {
//     window.SpeechRecognition = window.SpeechRecognition
//         || window.webkitSpeechRecognition;

//     const recognition = new SpeechRecognition();
//     recognition.interimResults = true;
//     const words = document.querySelector('.words');
//     words.appendChild(p);

//     let transcript;

//     recognition.addEventListener('result', e => {
//         let transcript = Array.from(e.results)
//             .map(result => result[0])
//             .map(result => result.transcript)
//             .join('')

//         document.getElementById("p").innerHTML = transcript;
//         console.log(transcript);
//     });

//     recognition.start();
// }

record_btn.addEventListener('click', () => {

    window.SpeechRecognition = window.SpeechRecognition
        || window.webkitSpeechRecognition;

    const recognition = new SpeechRecognition();
    recognition.interimResults = true;
    const words = document.querySelector('.words');
    words.appendChild(p);

    let transcript;

    recognition.addEventListener('result', e => {
        transcript = Array.from(e.results)
            .map(result => result[0])
            .map(result => result.transcript)
            .join('')

        document.getElementById("p").innerHTML = transcript;
        // console.log(transcript);
    });

    recognition.start();

    recognition.addEventListener('end', () => {
        transcript = transcript.toLowerCase();
        console.log(transcript);

        if (transcript.includes('click')) {
            click_btn.click();
        }
    })
})

click_btn.addEventListener('click', () => {
    console.log('I am clicked');
})