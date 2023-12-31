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
    function setRValue(r) {
        document.getElementById("rValue").value = r;
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
                                <label>Введите значение X:</label>
                                <button type="button" name="x" class="xButton" data-x="-5" onclick="setXValue('-5')">-5</button>
                                <button type="button" name="x" class="xButton" data-x="-4" onclick="setXValue('-4')">-4</button>
                                <button type="button" name="x" class="xButton" data-x="-3" onclick="setXValue('-3')">-3</button>
                                <button type="button" name="x" class="xButton" data-x="-2" onclick="setXValue('-2')">-2</button>
                                <button type="button" name="x" class="xButton" data-x="-1" onclick="setXValue('-1')">-1</button>
                                <button type="button" name="x" class="xButton" data-x="0" onclick="setXValue('0')">0</button>
                                <button type="button" name="x" class="xButton" data-x="1" onclick="setXValue('1')">1</button>
                                <button type="button" name="x" class="xButton" data-x="2" onclick="setXValue('2')">2</button>
                                <button type="button" name="x" class="xButton" data-x="3" onclick="setXValue('3')">3</button>
                                <input type="hidden" name="x" id="xValue" value="">
                            </div>
                            <div id="errorX" class="error"></div>
                            <div>
                                <label for="y">Введите значение Y (от -3 до 5):</label>
                                <input type="text" name="y" id="y" required>
                            </div>
                            <div id="errorY" class="error"></div>

                                <div>
                                    <label>Введите значение R:</label>
                                    <button type="button" name="r" class="rButton" data-r="1" onclick="setRValue('1');Initilze()">1</button>
                                    <button type="button" name="r" class="rButton" data-r="2" onclick="setRValue('2');Initilze()">2</button>
                                    <button type="button" name="r" class="rButton" data-r="3" onclick="setRValue('3');Initilze()">3</button>
                                    <button type="button" name="r" class="rButton" data-r="4" onclick="setRValue('4');Initilze()">4</button>
                                    <button type="button" name="r" class="rButton" data-r="5" onclick="setRValue('5'); Initilze()">5</button>
                                    <input type="hidden" name="r" id="rValue" value="">
                                </div>
                                <div id="errorR" class="error"></div>
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
