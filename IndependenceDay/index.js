// Taking elements from the DOM
let chakra = document.querySelector(".chakra");
let flower_count = 20;

// Making spikes in our chakra
for (let i = 0; i < 12; i++) {
    let rect = document.createElement("div");
    rect.classList.add("spike");
    rect.style.transform = `translate(-50%) rotate(${i * 15}deg)`;
    chakra.append(rect);
}

// making random flowers

const removeElement = (e) => {
    e.remove();
}

const spawnFlowers = () => {

    for (let i = 0; i < flower_count; i++) {
        areflowers = 1;
        let fl = document.createElement("div");
        fl.classList.add("flower");
        
        // making the speed different 
        let toss = Math.random()*2;
        if (toss >= 1) fl.classList.add("move-down");
        else fl.classList.add("move-down-faster");

        fl.style.transform = `scale(${Math.random()})`;
        fl.style.left = Math.random() * 100 + "%";
        document.querySelector("body").append(fl);
        fl.addEventListener('animationend', function()
        {
            removeElement(this);
        });
    }
}

setInterval(spawnFlowers, 500);
// spawnFlowers();
