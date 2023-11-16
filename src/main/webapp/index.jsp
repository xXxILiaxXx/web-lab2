<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<html lang="ru">
<head>
    <meta charset="UTF-8">
    <title>Лабораторная №2</title>
    <link rel="stylesheet" href="styles/styles.css">
</head>
<script>
    function setXValue(x) {
        document.getElementById("xValue").value = x;
    }
    // принимаются и устанавливаются r
    // если r уже стоит то удаляется
    function setRValue(r) {
        let rVar = parseInt(r)
        const rValue2 = document.getElementById("rValue2").value;
        const rValue3 = document.getElementById("rValue3").value;
        const rValue4 = document.getElementById("rValue4").value;
        const rValue5 = document.getElementById("rValue5").value;
        if (rVar === 2) {
            if (rValue2 === "") {
                document.getElementById("rValue2").value = r;
            } else {
                document.getElementById("rValue2").value = "";
            }
        }
        if (rVar === 3) {
            if (rValue3 === "") {
                document.getElementById("rValue3").value = r;
            } else {
                document.getElementById("rValue3").value = "";
            }
        }
        if (rVar === 4) {
            if (rValue4 === "") {
                document.getElementById("rValue4").value = r;
            } else {
                document.getElementById("rValue4").value = "";
            }
        }
        if (rVar === 5) {
            if (rValue5 === "") {
                document.getElementById("rValue5").value = r;
            } else {
                document.getElementById("rValue5").value = "";
            }
        }
    }
</script>
<script src="js/validate.js"></script>

<body>

<table border="1" cellpadding="0" cellspacing="0" width="100%">
    <thead>
    <tr>
        <th colspan=2 class="header">Илиев Илия Ивелинович P3220 Вариант 223322</th>
    </tr>
    </thead>
    <tbody>
    <tr>
        <td>
            <canvas id="canvas_plot" width="500" height="500" onclick="checkPoint(event)"></canvas>
            <script src="js/index.js"></script>
        </td>
    </tr>
    <tr class="header">
        <td>
            <table border="1" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                    <!--ячейка ввода данных-->
                    <td>
                        <form action="javascript:void(0);" onsubmit="processForm();"> <%-- закрепить форму по верху а не по центру --%>

                            <div>
                                <label for="x">Введите значение X (от -3 до 5):</label>
                                <input type="text" name="x" id="x" required>
                            </div>
                            <div id="errorX" class="error"></div>
                            <div>
                                <label for="y">Введите значение Y (от -3 до 5):</label>
                                <input type="text" name="y" id="y" required>
                            </div>
                            <div id="errorY" class="error"></div>
                            <div>
                                <label for="r">Введите значение R (от -3 до 5):</label>
                                <input type="text" name="r" id="r" required>
                            </div>
                            <div id="errorR" class="error"></div>
                            <div>
                                <input type="submit" value="Проверить">



                    <td>
                        Отображение результатов
                        <table border="1" cellpadding="0" cellspacing="0" width="80%" class="result-table" id="resultTable">
                            <tr>
                                <th>X</th>
                                <th>Y</th>
                                <th>R</th>
                                <th>Результат</th>
                            </tr>
                            <c:forEach items="${resultsList}" var="result">
                                <tr>
                                    <td>${result.x}</td>
                                    <td>${result.y}</td>
                                    <td>${result.r}</td>
                                    <td>${result.isInside ? 'Да' : 'Нет'}</td>
                                </tr>
                            </c:forEach>
                        </table>
                    </td>
                </tr>
            </table>
        </td>
    </tr>
    </tbody>
</table>

</body>
</html>

</body>
</html>
