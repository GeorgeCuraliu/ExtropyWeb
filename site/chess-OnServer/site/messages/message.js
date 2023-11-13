import axios from "https://cdn.skypack.dev/axios";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const toolButtons = document.querySelectorAll(`.tool`);
const fillColor = document.querySelector(`#fill-color`);
const slider = document.querySelector(`#slider`);
const colorPicker = document.querySelector(`#color-picker`);
const colorButtons = document.querySelectorAll(`.colors .option`);

let selectedColor = `#1b1c1e`;
let isDrawing = false;
let brushWidth = 5;
let selectedTool = `brush`;
let preMouseX;
let preMouseY;
let snapShot;



function setCanvasBg(){
    ctx.fillStyle = `#fffffe`;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = selectedColor;
}

window.addEventListener(`load`, ()=>{
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;
    setCanvasBg();
});

const drawRect = (e) => {
    if(!fillColor.checked) {
        return ctx.strokeRect(e.offsetX, e.offsetY, preMouseX - e.offsetX, preMouseY- e.offsetY);
    }
    ctx.fillRect(e.offsetX, e.offsetY, preMouseX - e.offsetX, preMouseY- e.offsetY);
};


const drawCirc = (e) => {
    ctx.beginPath();
    let radius = Math.sqrt(
        Math.pow(preMouseX - e.offsetX, 2) + Math.pow(preMouseY - e.offsetY, 2)
    );
    ctx.arc(preMouseX, preMouseY, radius, 0, 2 * Math.PI);
    fillColor.checked? ctx.fill() : ctx.stroke();
}

const drawTri = (e) => {
    ctx.beginPath();
    ctx.moveTo(preMouseX, preMouseY);
    ctx.lineTo(e.offsetX, e.offsetY);
    ctx.lineTo(preMouseX * 2 - e.offsetX, e.offsetY);
    ctx.closePath();
    fillColor.checked? ctx.fill() : ctx.stroke();
}





function startDraw(e){
    isDrawing = true;
    preMouseX = e.offsetX;
    preMouseY = e.offsetY;
    ctx.beginPath();
    ctx.lineWidth = brushWidth;
    ctx.strokeStyle =selectedColor;
    ctx.fillStyle = selectedColor;
    snapShot = ctx.getImageData(0, 0, canvas.width, canvas.height);
}

function drawing(e){
    if(!isDrawing) return;
    ctx.putImageData(snapShot, 0, 0);

    if(selectedTool === "brush" || selectedTool === "eraser"){
        ctx.strokeStyle = selectedTool === "eraser" ? "#fffffe" :selectedColor;
        ctx.lineTo(e.offsetX, e.offsetY);
        ctx.stroke();
    }else if(selectedTool === "rectangle"){
        drawRect(e);
    }else if(selectedTool === "circle"){
        drawCirc(e);
    }else if(selectedTool === "triangle"){
        drawTri(e);
    }
}

function deleteCanv(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}
function downlaod(){
    let canvasUrl = canvas.toDataURL();
    const createEl = document.createElement("a");
    createEl.href = canvasUrl;
    createEl.download = "doawd";
    createEl.click();
    createEl.remove();
}
function send() {
    let canvasUrl = canvas.toDataURL();
    console.log(canvasUrl)
    axios.post("http://localhost:5432/addMessage",{message: canvasUrl});
  }

toolButtons.forEach(button =>{
    button.addEventListener(`click`, ()=>{
        document.querySelector(`.options .active`).classList.remove(`active`);
        button.classList.add(`active`);
        selectedTool = button.id;
        console.log(selectedTool);
    })
})

colorButtons.forEach(button => {
    button.addEventListener(`click`, () =>{
        document.querySelector(".options .selected").classList.remove(`selected`);
        button.classList.add(`selected`);
        selectedColor = window.getComputedStyle(button).getPropertyValue("background-color");
    })
});


canvas.addEventListener(`mousedown`, startDraw);
canvas.addEventListener(`mousemove`, drawing);
canvas.addEventListener(`mouseup`, () => {isDrawing = false});
slider.addEventListener(`change`, () => {
    colorPicker.parentElement.style.backgroundColor = colorPicker.value;
    colorPicker.parentElement.click();
});
document.querySelector(`.clear`).addEventListener(`click`, deleteCanv);
document.querySelector(`.save`).addEventListener(`click`, downlaod);
document.querySelector(`.send`).addEventListener(`click`, send);