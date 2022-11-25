const densityString =
  "@QB#NgWM8RDHdOKq9$6khEPXwmeZaoS2yjufF]}{tx1zv7lciL/\\|?*>r^;:_\"~,'.-` ";
const stringLen = densityString.length;

const canvas = document.querySelector('#output');
canvas.width = 500;
const ctx = canvas.getContext('2d');

const asciiCanvas = document.querySelector('#ascii');
asciiCanvas.width = 500;
const ctx2 = asciiCanvas.getContext('2d');

const btn = document.querySelector('#showBtn');

const image = new Image();
var imageData;
image.addEventListener('load', () => {
  canvas.height = (image.height * canvas.width) / image.width;
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
  imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
})

const inputImage = document.querySelector('input');
inputImage.addEventListener('change', function(e) {
  openFile(e);
})


var openFile = function(file) {
  var input = file.target;
  var reader = new FileReader();
  reader.onload = function() {
    var dataURL = reader.result;
    image.src = dataURL;
  }
  reader.readAsDataURL(input.files[0]);
}


function createASCII(imageData) {
  const imgdata = imageData.data;

  // converting image into grayscale image
  for (let i = 0; i < imgdata.length; i += 4) {
    var lightness = (imgdata[i] + imgdata[i+1] + imgdata[i+2]) / 3;
    imgdata[i] = lightness;
    imgdata[i+1] = lightness;
    imgdata[i+2] = lightness;
  }

  asciiCanvas.height = (canvas.height * asciiCanvas.width) / canvas.width;
  ctx2.font = '10px Comic Sans';
  for (let i = 0; i < imageData.height; i += 4){
    for (let j = 0; j < imageData.width; j += 4) {
      var pixel = imgdata[i * imageData.width + j * 4] + imgdata[(i+1) * imageData.width + j * 4] + imgdata[i * imageData.width + (j+1) * 4] + imgdata[(i+1) * imageData.width + (j+1) * 4];
      pixel /= 4;
      ctx2.fillText(getDenseChar(pixel), i*4, j*4);
    }
  }
  
}

// function to get the density character
function getDenseChar(val) {
  var index = Math.floor((val / 255) * stringLen);
  return densityString[index];
}

btn.addEventListener('click', () => {
  createASCII(imageData);
})