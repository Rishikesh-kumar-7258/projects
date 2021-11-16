let wish_words = document.querySelector('.wish-words');
let form = document.querySelector('form');

form.addEventListener('submit', function(e){

    e.preventDefault();

    let name = document.querySelector('#name').value;

    wish_words.innerHTML = `Happy Diwali ${name}`;

    form.classList.add('hide');

    console.log("the form is submitted")
})