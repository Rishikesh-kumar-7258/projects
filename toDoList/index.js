console.log("Prince is amazing");

if (localStorage.getItem("notearr") == null) {
    let notearr = [];
    localStorage.setItem("notearr", JSON.stringify(notearr));
}

shownotes();

let addbtn = document.getElementById("addbtn");
addbtn.addEventListener("click", function () {
    let notes = document.getElementById("textarea");
    let Title = document.getElementById("title");


    let notearr = JSON.parse(localStorage.getItem("notearr"));
    let newnote = {
        title : Title.value,
        txt : notes.value,
        classN : "btn-warning",
    }
    notearr.push(newnote);
    localStorage.setItem("notearr", JSON.stringify(notearr));
    notes.value = "";
    title.value = "";
    shownotes();


})

function shownotes() {
    let area = document.getElementById("notearea");
    let notearr = JSON.parse(localStorage.getItem("notearr"));
    // let boolarr = JSON.parse(localStorage.getItem("boolarr"));


    if (notearr.length == 0) {
        area.innerHTML = `<h4 class="bg-warning text-light">No notes to show here.</h4>`

    }
    else {
        let html = "";
        notearr.forEach(function (element, index) {
            html += ` <div class="card bg-info mx-2 my-2 text-light ">
            <div class="card-body">
              <h5 class="card-title text-warning">${element.title}</h5>
              <p class="card-text">${element.txt}</p>
              <button type="button" id="${index}" class="btn btn-danger" onclick="del(this.id)">Delete</button>
              <button type="button" id="btn${index}" class="btn ${element.classN} mx-3" onclick="mark(this.id)">Mark</button>    
            </div>
          </div>`


        //   console.log(element.classN);

        })

        area.innerHTML = html;

    }
}

function del(e) {
    // console.log("I am deleting this",e);
    let notearr = JSON.parse(localStorage.getItem("notearr"));
    notearr.splice(e, 1);
    localStorage.setItem("notearr", JSON.stringify(notearr));
    shownotes();
}

// this functionality is not working. I don't know what is the problem.

// let search = document.getElementById('searchIt');
// search.addEventListener("input", function(){

//     let inputVal = search.value.toLowerCase();
//     // console.log('Input event fired!', inputVal);
//     let noteCards = document.getElementsByClassName('card');
//     Array.from(noteCards).forEach(function(element){
//         let cardTxt = element.getElementsByTagName("p")[0].value;
//         if(cardTxt.includes(inputVal)){
//             element.style.display = "block";
//         }
//         else{
//             element.style.display = "none";
//         }
//         // console.log(cardTxt);
//     })
// })


function mark(e){
    // let btn = document.getElementById(e);
    let notearr = JSON.parse(localStorage.getItem("notearr"));

    let index = e.substr(3,1)-'0';
    // console.log(index);
    
    if(notearr[index].classN == "btn-warning"){
        notearr[index].classN = "btn-success";
    }
    else{
        notearr[index].classN = "btn-warning";
    }

    localStorage.setItem("notearr",JSON.stringify(notearr));
    shownotes();
}
