'use strict';
const canvas = document.getElementById('jsCanvas');
const ctx = canvas.getContext('2d');
const colors = document.querySelectorAll('.jsColor');
const colorPalette = document.getElementById('jsColorPalette');
const widthControl = document.getElementById('jsWidth');
const fillBtn = document.getElementById('jsMode');
const saveBtn = document.getElementById('jsSave');
const pen = document.getElementById('jsPen');
const eraser = document.getElementById('jsEraser');
const brush = document.getElementById('jsBrush');

// console.log(canvas);
// console.log(colors);

const INITIAL_COLOR = 'black';
const CANVAS_SIZE = 500;

pen.classList.add('checked');

let backgroundColor = 'transparent';
let newColor = INITIAL_COLOR;
ctx.lineWidth = 5.0;

let isPressed = false;
let isDrawing = true;
let isPainting = false;
let isErasing = false;

function activated() {
  isPressed = true;
  // console.log(isDrawing);
}
function deActivated() {
  isPressed = false;
  // console.log(isDrawing);
}

function pointerMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;

  if (!isPressed) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    if (isDrawing) {
      ctx.strokeStyle = newColor;
      ctx.lineTo(x, y);
      ctx.stroke();
    } else {
      ctx.strokeStyle = backgroundColor;
      ctx.lineTo(x, y);
      ctx.stroke();
    }
  }
}

function widthControlFn(e) {
  ctx.lineWidth = e.target.value;
  console.log(e);
}

function painting() {
  if (isPainting) {
    ctx.fillStyle = newColor;
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
    backgroundColor = newColor;
  }
}

canvas.addEventListener('mousemove', pointerMove);
canvas.addEventListener('mousedown', activated);
canvas.addEventListener('click', painting);
canvas.addEventListener('mouseup', deActivated);
canvas.addEventListener('mouseleave', deActivated);
widthControl.addEventListener('input', widthControlFn);

function removeColor() {
  colorPalette.classList.remove('checked');
  colors.forEach((color) => {
    color.classList.remove('checked');
  });
}

function removeType() {
  pen.classList.remove('checked');
  brush.classList.remove('checked');
  eraser.classList.remove('checked');
  isPainting = false;
  isErasing = false;
  isDrawing = false;
}

colors.forEach((color) => {
  color.addEventListener('click', (e) => {
    removeColor();
    newColor = e.target.style.backgroundColor;
    // backgroundColor = newColor;
    color.classList.add('checked');
    // console.log(e);
  });
});

colorPalette.addEventListener('change', (e) => {
  removeColor();
  newColor = e.target.value;
  colorPalette.classList.add('checked');
});

pen.addEventListener('click', () => {
  removeType();
  isDrawing = true;
  ctx.strokeStyle = newColor;
  pen.classList.add('checked');
});

brush.addEventListener('click', () => {
  removeType();
  brush.classList.add('checked');
  isPainting = true;
});

eraser.addEventListener('click', () => {
  removeType();
  eraser.classList.add('checked');
  isErasing = true;
  ctx.strokeStyle = backgroundColor;
});

saveBtn.addEventListener('click', () => {
  const image = canvas.toDataURL('image/png');
  const link = document.createElement('a');
  link.href = image;
  link.download = 'draw';
  link.click();
});
