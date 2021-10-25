// The variables used in the programming

let pointer = 0;
let upper = false;
let caps = false;

let add = (e,c) => {
   let area = document.getElementById("parea");
   if(e == 'backspace'){
      let writen = area.value;
      area.value = writen.substring(0,pointer-1);
      pointer--;
   }
   else if(e == 'shift'){
      upper = true;
   }
   else if(e == 'caps'){
      if(!caps) caps = true;
      else caps = false;
   }
   else{
      if(upper || caps) {
         area.value += c;
         upper = false;
      }
      else area.value += e; 
      pointer++;
   }
}

// setTimeout(() => {
//    alert("you have to add some of the special keys in your keyboard");
// }, 3000);
let btnk = document.getElementById("actkey");
btnk.addEventListener("click",function(){
   let keyboard = document.getElementById("keyboard");

   if(keyboard.style.display == "none"){
      keyboard.style.display = "flex";
   }
   else{
      keyboard.style.display = "none";
   }
})