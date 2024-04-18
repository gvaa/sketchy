"use strict";


// generating pixel grid
const pixelContainer = document.querySelector('#pixels');
const newPixel = document.createElement("div");
newPixel.setAttribute("class", "pixel");

for (let x = 0; x < 16; x++) {
    for (let y = 0; y < 16; y++) {
        pixelContainer.appendChild(newPixel.cloneNode(true));
    }
}

pixelContainer.oncontextmenu = function ()
{
    return false;
}

// drawing with mouse
let mouseDown;
let mouseButton;

document.body.addEventListener("mousedown", function() { 
  mouseDown = 1;
});
document.body.addEventListener("mouseup", function() {
  mouseDown = 0;
});

let pixels = document.getElementsByClassName("pixel");
Array.from(pixels).forEach(pixel => {
  let currentPixel;
  
  pixel.addEventListener("mouseenter", function(e) {
    currentPixel = pixel.getAttribute("class");
    if (mouseDown == 1 && currentPixel == "pixel" && mouseButton == 0) {
      pixel.setAttribute("class", "painted");
    } 
    if (mouseDown == 1 && currentPixel == "painted" && mouseButton == 2) {
      pixel.setAttribute("class", "pixel");
    }
    });

  pixel.addEventListener("mousedown", function(e) { 
    currentPixel = pixel.getAttribute("class");
    mouseButton = e.button;
    if (currentPixel == "pixel" && mouseButton == 0) {
      pixel.setAttribute("class", "painted now");
    } else if (currentPixel == "painted" && mouseButton == 2) {
      pixel.setAttribute("class", "pixel now");
    }
    });
});

// drawing on touchscreen devices
let currentElement;
let currentClass;

let startTouch = function (e) {

  currentElement = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY);
  currentClass = currentElement.getAttribute("class");
  
  if (currentClass == "pixel") {
    currentElement.setAttribute("class", "painted now");
  } else if (currentClass == "painted") {
    currentElement.setAttribute("class", "pixel now");
  }
}

let drawTouch = function (e) {
  currentElement = document.elementFromPoint(e.touches[0].clientX, e.touches[0].clientY);
  currentClass = currentElement.getAttribute("class");
  if (currentClass == "pixel") {
    currentElement.setAttribute("class", "painted now");
  } else if (currentClass == "painted") {
    currentElement.setAttribute("class", "pixel now");
  }
}

let endTouch = function (e) {
  e.preventDefault();
  let changedNow = document.getElementsByClassName("now");
  Array.from(changedNow).forEach(changedPix => {
    changedPix.className = changedPix.className.replace(" now", "");
  });
}
pixelContainer.addEventListener("touchstart", startTouch);
pixelContainer.addEventListener("touchmove", drawTouch);
pixelContainer.addEventListener("touchend", endTouch);

