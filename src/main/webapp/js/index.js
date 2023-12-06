const canvasPlot = document.getElementById('canvas_plot');
const ctx = canvasPlot.getContext('2d');

const canvasPlotWidth = canvasPlot.clientWidth;
const canvasPlotHeight = canvasPlot.clientHeight;

const lineWidth = 8;
const lineHeight = 2;

const xAxis = canvasPlotWidth / 2;
const yAxis = canvasPlotHeight / 2;

const radius = 200;




function checkPoint(event) {
    const x = event.offsetX - xAxis;
    const y = -(event.offsetY - yAxis);
    let rValue = document.getElementById("rValue").value; // Теперь у нас есть одна переменная для R

    console.log(rValue);
    let errorR = document.getElementById("errorR");

    if (rValue === "") {
        //console.log("pusto")
        errorR.textContent = "Введите корректное значение R (от 1 до 5)."; // доработать ошибку
    } else {
        errorR.textContent = ""; // доработать ошибку

    }



    // rInitializetion(); // Убедитесь, что rValue обновляется перед использованием
    const rSplit = 200;

    let xValue = x / rSplit;
    let yValue = y / rSplit;

    submitForm(xValue * rValue, yValue * rValue, rValue, true);
}


function rInitializetion() {

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
function Initilze(){
    clearCanvas();
    dotSend();

}
// функция отрисовывает координаты
function dot(result) {
    const rSplit = 200; // один r это 200 px на полотне
    let x = result.x;
    let y = result.y;
    rInitializetion();
    if (rValue !== "") {
        let xValue = x / rValue * rSplit + xAxis - 2;
        let yValue = -(y / rValue * rSplit - yAxis + 2);

        ctx.beginPath();
        ctx.fillStyle = "red";
        ctx.fillRect(xValue, yValue, 5, 5);
        ctx.closePath();
    }
}

// // Загружаем результаты из localStorage при загрузке страницы
// window.onload = function () {
//     loadResultsFromLocalStorage();
//     clearCanvas();
//     dotSend();
// };
//
// // функция загружает результаты из локального хранилища
// function loadResultsFromLocalStorage() {
//     const storedResults = localStorage.getItem('resultsArray');
//     if (storedResults) {
//         resultsArray = JSON.parse(storedResults);
//     }
// }

// функция сохраняет результаты в локальное хранилище
function saveResultsToLocalStorage() {
    localStorage.setItem('resultsArray', JSON.stringify(resultsArray));
}

// Добавлены функции для работы с локальным хранилищем
function arraySave(results) {
    results.forEach(function (result) {
        resultsArray.push(result);
    });

    // сохраняем результаты в локальное хранилище
    saveResultsToLocalStorage();
    loadResultsFromLocalStorage();
    clearCanvas();
    dotSend();
    updateResultTable();
    submitForm();
    getFormValues();
    validateForm();
    clearCanvas();
    dotSend();
}

