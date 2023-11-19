const canvasPlot = document.getElementById('canvas_plot');
const ctx = canvasPlot.getContext('2d');

const canvasPlotWidth = canvasPlot.clientWidth;
const canvasPlotHeight = canvasPlot.clientHeight;

const lineWidth = 8;
const lineHeight = 2;

const xAxis = canvasPlotWidth / 2;
const yAxis = canvasPlotHeight / 2;

const radius = 200;

let rValue; // Теперь у нас есть одна переменная для R


function checkPoint(event) {
    const x = event.offsetX - xAxis;
    const y = -(event.offsetY - yAxis);

    rInitialize();
    const rSplit = 200;

    let xValue = x / rSplit;
    let yValue = y / rSplit;


    submitForm(xValue * rValue, yValue * rValue, rValue * rValue, true);
}


function rInitialize() {
    const rawRValue = document.getElementById("rValue").value;
    rValue = parseFloat(rawRValue); // преобразуем строку в число
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvasPlotWidth, canvasPlotHeight);
    axis();
    zone();
    r();
}

function axis() {
    ctx.beginPath();
    ctx.moveTo(xAxis, 0);
    ctx.lineTo(xAxis, canvasPlotHeight);
    ctx.moveTo(0, yAxis);
    ctx.lineTo(canvasPlotWidth, yAxis);
    ctx.stroke();
    ctx.closePath();
}

function circle() {
    ctx.beginPath();
    ctx.arc(xAxis, yAxis, radius / 2, 0, Math.PI / 2);
    ctx.lineTo(xAxis, yAxis);
    ctx.fillStyle = "rgba(11,85,246,0.5)";
    ctx.fill();
    ctx.closePath();
}

function triangle() {
    ctx.beginPath();
    let x1 = xAxis;
    let y1 = yAxis;
    let x2 = xAxis;
    let y2 = yAxis - radius / 2;
    let x3 = xAxis - radius;
    let y3 = yAxis;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.fillStyle = "rgba(11,85,246,0.5)";
    ctx.fill();
    ctx.closePath();
}

function square() {
    ctx.beginPath();
    let x1 = xAxis - radius;
    let y1 = yAxis;
    let x2 = xAxis - radius;
    let y2 = yAxis + radius;
    let x3 = xAxis;
    let y3 = yAxis + radius;
    let x4 = xAxis;
    let y4 = yAxis;
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.lineTo(x3, y3);
    ctx.lineTo(x4, y4);
    ctx.fillStyle = "rgba(11,85,246,0.5)";
    ctx.fill();
    ctx.closePath();
}

function zone() {
    circle();
    triangle();
    square();
}

function r() {
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.font = '10px Arial';
    ctx.fillText("X", canvasPlotWidth - 10, yAxis);
    ctx.fillText("Y", xAxis, +10);
    ctx.font = '15px Arial';
    for (let i = radius; i >= -(radius); i -= radius / 2) {
        let litR = " -R"
        let litR2 = " -R/2"
        if (i < radius) {
            litR = " R"
            litR2 = " R/2"
        }
        if (i === radius / 2 || i === -radius / 2) {
            ctx.fillText(litR2, xAxis - i, yAxis);
            ctx.fillText(litR2, xAxis, yAxis + i);
        } else if (i === radius || i === -(radius)) {
            ctx.fillText(litR, xAxis - i, yAxis);
            ctx.fillText(litR, xAxis, yAxis + i);
        } else {
            continue;
        }
        ctx.fillRect(xAxis - i, yAxis - 5, lineHeight, lineWidth);
        ctx.fillRect(xAxis - 5, yAxis - i, lineWidth, lineHeight);
    }
    ctx.closePath();
}

// Добавлена функция arraySave
let resultsArray = [];
// функция сохраняет все результаты в массив и отрисовывает точки по результатам которые есть
function arraySave(results) {
    results.forEach(function (result) {
        resultsArray.push(result);



    });
    clearCanvas();

    dotSend();
}
// функция отправляет результаты из resultsArray в функцию dot
function dotSend() {
    resultsArray.forEach(function (result) {
        dot(result);
    });
}

// функция отрисовывает координаты
function dot(result) {
    const rSplit = 200; // один r это 200 px на полотне
    let x = result.x;
    let y = result.y;

    if (rValue !== "") {
        let xValue = x / rValue * rSplit + xAxis - 2;
        let yValue = -(y / rValue * rSplit - yAxis + 2);

        ctx.beginPath();
        ctx.fillStyle = "red";
        ctx.fillRect(xValue, yValue, 5, 5);
        ctx.closePath();
    }
}