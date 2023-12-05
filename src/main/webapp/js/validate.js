// Функция, получающая значения X, Y, R из формы на index.jsp
function getFormValues() {
    let xValue = document.getElementById("xValue").value;
    xValue = xValue.replace(',', '.');
    let yValue = document.getElementById("y").value;
    yValue = yValue.replace(',', '.');
    let rValue = document.getElementById("rValue").value;
    rValue = rValue.replace(',', '.');

    return { x: xValue, y: yValue, r: rValue };
}

// Функция для валидации значений X, Y и R
function validateForm(xValue, yValue, rValue) {
    let errorX = document.getElementById("errorX");
    let errorY = document.getElementById("errorY");
    let errorR = document.getElementById("errorR");

    // Сбрасываем текст ошибок
    errorX.textContent = "";
    errorY.textContent = "";
    errorR.textContent = "";

    if (isNaN(xValue) || xValue < -5 || xValue > 3) {
        errorX.textContent = "Введите корректное значение X (от -5 до 3).";
        return false;
    }

    if (isNaN(yValue) || yValue < -3 || yValue > 5) {
        errorY.textContent = "Введите корректное значение Y (от -3 до 5).";
        return false;
    }

    if (isNaN(rValue) || rValue < 1 || rValue > 5) {
        errorR.textContent = "Введите корректное значение R (от 1 до 5).";
        return false;
    }
    return true;
}

function submitForm(xValue, yValue, rValue, isCanvas) {
    console.log(xValue + " ", yValue + " ", rValue);
    let url;
    // Формируем URL с параметрами
    if (isCanvas) {
        url = "/testweb-1.0-SNAPSHOT/AreaCheckServlet?x=" + xValue + "&y=" + yValue + "&r=" + rValue;
    } else {
        url = "/testweb-1.0-SNAPSHOT/controller?x=" + xValue + "&y=" + yValue + "&r=" + rValue;
        console.log(url);
    }

    // Создаем XMLHttpRequest объект
    let xhr = new XMLHttpRequest();

    xhr.open("POST", url, true);

    xhr.onload = function () {
        if (xhr.status === 200) {
            console.log("исправлено");
            let responseText = xhr.responseText;
            console.log(responseText);
            responseText = responseText.replace(/}{/g, '}\n{');
            console.log(responseText);
            let jsonStrings = responseText.split('\n');
            let results = jsonStrings.map(json => JSON.parse(json));
            updateResultTable(results);
            arraySave(results);
            console.log(results);
            // отправлять results в index.js, для дальнейшей отрисовки координаты
        } else {
            console.error("Ошибка при отправке данных на сервер");
        }
    };

    xhr.send();
}

function updateResultTable(results) {
    let resultTable = document.getElementById("resultTable");
    results.forEach(result => {
        let newRow = resultTable.insertRow(1);
        let xCell = newRow.insertCell(0);
        let yCell = newRow.insertCell(1);
        let rCell = newRow.insertCell(2);
        let resultCell = newRow.insertCell(3);

        xCell.innerHTML = result.x;
        yCell.innerHTML = result.y;
        rCell.innerHTML = result.r;
        resultCell.innerHTML = result.isInside ? "Да" : "Нет";
    });
}

// Добавлены функции для работы с локальным хранилищем

// функция сохраняет все результаты в локальное хранилище
function arraySave(results) {
    results.forEach(function (result) {
        resultsArray.push(result);
    });

    // сохраняем результаты в локальное хранилище
    saveResultsToLocalStorage();

    clearCanvas();
    dotSend();
}

// функция отправляет результаты из resultsArray в функцию dot
function dotSend() {
    resultsArray.forEach(function (result) {
        dot(result);
    });
}

// функция сохраняет результаты в локальное хранилище
function saveResultsToLocalStorage() {
    localStorage.setItem('resultsArray', JSON.stringify(resultsArray));
}

// функция загружает результаты из локального хранилища
function loadResultsFromLocalStorage() {
    const storedResults = localStorage.getItem('resultTable');
    if (storedResults) {
        resultsArray = JSON.parse(storedResults);
    }
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



// Загружаем результаты из localStorage при загрузке страницы
window.onload = function() {
    loadResultsFromLocalStorage();
    clearCanvas();
    dotSend();
};

function processForm() {
    // Вызовите необходимые функции здесь
    let formValues = getFormValues();
    if (validateForm(formValues.x, formValues.y, formValues.r)) {
        submitForm(formValues.x, formValues.y, formValues.r, /* значение isCanvas */);
    }
    return false;  // Предотвращение отправки формы
}

