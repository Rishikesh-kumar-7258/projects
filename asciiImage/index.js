const densityString =
  "@QB#NgWM8RDHdOKq9$6khEPXwmeZaoS2yjufF]}{tx1zv7lciL/\\|?*>r^;:_\"~,'.-` ";
const stringLen = densityString.length;

let img;
const scale = 10;

function preload() {
  img = loadImage("itachi.png");
}

function setup() {
  createCanvas(img.width * scale, img.height * scale);
}

function draw() {
  background(0);
  // image(img, 0, 0, width, height);

  let w = width / img.width;
  let h = height / img.height;

  img.loadPixels();
  for (let i = 0; i < img.height; i++) {
    for (let j = 0; j < img.width; j++) {
      const pixelIndex = (i * img.width + j) * 4;
      const r = img.pixels[pixelIndex];
      const g = img.pixels[pixelIndex + 1];
      const b = img.pixels[pixelIndex + 2];
      const gray = (r + g + b) / 3;

      noStroke();
      fill(gray);
      // rect(j * w, i * h, w, h);

      const charIndex = floor(map(gray, 0, 255, 0, stringLen - 1));
      textSize(w);
      text(charIndex, j * w, i * h);

    }
  }
}
