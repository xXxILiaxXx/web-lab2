package testweb;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.math.BigDecimal;

@WebServlet("/controller")
public class ControllerServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String x = request.getParameter("x");
        String y = request.getParameter("y");
        String[] rArray = request.getParameterValues("r");

        boolean isValid = false;
        for (String r : rArray) {
            // проверка, переданы ли значения
            if (x != null && y != null && checkX(x) && checkY(y) && checkR(r)) {
                isValid = true;
            } else {
                break;
            }
        }

        if (isValid) {
            // если да, то перенаправляется на /AreaCheckServlet
            request.getRequestDispatcher("/AreaCheckServlet").forward(request, response);
        } else {
            // если нет, то перенаправляется обратно
            response.sendRedirect(request.getContextPath() + "/index.jsp");
        }
    }

    // Проверка значения X
    public boolean checkX(String x) {
        try {
            BigDecimal xValue = new BigDecimal(x);
            return xValue.compareTo(BigDecimal.valueOf(-5)) >= 0 && xValue.compareTo(BigDecimal.valueOf(3)) <= 0;
        } catch (NumberFormatException e) {
            return false;
        }
    }

    // Проверка значения Y
    public boolean checkY(String y) {
        try {
            BigDecimal yValue = new BigDecimal(y);
            return yValue.compareTo(BigDecimal.valueOf(-3)) >= 0 && yValue.compareTo(BigDecimal.valueOf(5)) <= 0;
        } catch (NumberFormatException e) {
            return false;
        }
    }

    // Проверка значения R
    public boolean checkR(String r) {
        try {
            BigDecimal rValue = new BigDecimal(r);
            return rValue.compareTo(BigDecimal.valueOf(1)) >= 0 && rValue.compareTo(BigDecimal.valueOf(5)) <= 0;
        } catch (NumberFormatException e) {
            return false;
        }
    }
}
