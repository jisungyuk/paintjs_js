const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColors");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");
const INITIAL_COLOR = "#2c2c2c";

canvas.width = 500;
canvas.height = 500;

ctx.fillStyle = "white";
ctx.fillRect(0,0, canvas.width, canvas.height);
ctx.strokeStyle = "INITIAL_COLOR";
ctx.fillStyle = "INITIAL_COLOR";
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
    if (!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        ctx.lineTo(x - 7, y - 7);
        ctx.stroke();
    }
}

function stopPainting() {
    painting = false;
}

function startPainting() {
    if (!painting) {
        painting = true;
    } else {
        painting = false;
    }
}

function changeColor(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleRangeChange(event){
    const range = event.target.value;
    ctx.lineWidth = range;
}

function handleModeClick(){
    if(filling === true){
        filling = false;
        mode.innerText = "Fill"
    } else {
        filling = true;
        mode.innerText = "Paint"
    }
}
function stopsaving(event){
    event.preventDefault();
}
function handleCanvasClick(event){
    if(filling){
        ctx.fillRect(0,0, canvas.width, canvas.height);
    }
}

function imageSave(){
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "paint";
    link.click();
}


if(canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", stopsaving);
}


Array.from(colors).forEach(color => color.addEventListener("click", changeColor));

if(range){
range.addEventListener("input", handleRangeChange);
}

if(mode){
mode.addEventListener("click", handleModeClick);
}

if(save){
save.addEventListener("click", imageSave);
}
