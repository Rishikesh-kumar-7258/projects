// calling block form the html
const block = document.querySelector(".block");

// defining number of span blocks inside the element
const INNER_BLOCK = 900;

//Making the span-blocks inside the main block
for (let i = 0; i < INNER_BLOCK; i++)
{
    block.innerHTML += `<span class="box${i+1} inner"></span>`;
}

// adding click eventlistner to out main block
block.addEventListener('click', () => {

    //selecting all the span-boxes
    let boxes = document.querySelectorAll(".block .inner");

    // working with the loops for the snap feeling
    let i = 0, j = 0, n = Math.sqrt(INNER_BLOCK);
    let temp, count = 1, add = 0;

    // making our blocks move in certain intervals to feel like animation
    let animate = setInterval(()=>{

        if(i >= INNER_BLOCK) clearInterval(animate);

        if (i < n && j > i) 
        {
            i++;
            j=0;
            
        }
        if (i < n) temp = n-i+(j*(n+1));

        if (i == n)
        {
            j = 0;
            i++;
        }


        if (i > n && j >= n-count)
        {
            i += n;
            j = 0;
            count++;
        }

        if (i > n) temp = i + (j*(n+1));

        boxes[temp-1].classList.add('move-away');

        j++;

    }, 0.05)
})

// reloading the page with click on the button
document.querySelector("button").addEventListener("click", () => {
    location.reload();
})
