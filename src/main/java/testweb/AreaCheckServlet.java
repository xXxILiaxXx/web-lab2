package testweb;

import com.google.gson.JsonObject;
import testweb.java.CheckResult;
import com.google.gson.Gson;

import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

@WebServlet("/AreaCheckServlet")
public class AreaCheckServlet extends HttpServlet {

    @Override
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        String x = request.getParameter("x");
        String y = request.getParameter("y");
        String r = request.getParameter("r");

        BigDecimal xValue = new BigDecimal(x);
        BigDecimal yValue = new BigDecimal(y);
        BigDecimal rValue = new BigDecimal(r);

        ServletContext servletContext = getServletContext();
        List<CheckResult> resultList = (List<CheckResult>) servletContext.getAttribute("resultList");

        if (resultList == null) {
            resultList = new ArrayList<>();
            servletContext.setAttribute("resultList", resultList);
        }

        boolean isInside = checkCircle(xValue, yValue, rValue)
                || checkRectangle(xValue, yValue, rValue)
                || checkTriangle(xValue, yValue, rValue);
        CheckResult result = new CheckResult(xValue, yValue, rValue, isInside);
        resultList.add(result);
        sendJson(result, response);
    }


    private JsonObject writeJson(CheckResult result) {
        JsonObject jsonResponse = new JsonObject();
        jsonResponse.addProperty("x", result.getX().toString());
        jsonResponse.addProperty("y", result.getY().toString());
        jsonResponse.addProperty("r", result.getR().toString());
        jsonResponse.addProperty("isInside", result.isInside());

        return jsonResponse;
    }

    private void sendJson(CheckResult result, HttpServletResponse response) throws IOException {
        String json = new Gson().toJson(writeJson(result));
        response.setContentType("application/json");
        response.getWriter().write(json);
    }



    private boolean checkCircle(BigDecimal x, BigDecimal y, BigDecimal r) { // круг
        BigDecimal scaledRadius = r.divide(BigDecimal.valueOf(2)); // новый радиус, уменьшенный в 2 раза
        return
                // x >= 0
                x.compareTo(BigDecimal.ZERO) >= 0
                        // y <= 0
                        && y.compareTo(BigDecimal.ZERO) <= 0
                        // x * x + y * y <= scaledRadius * scaledRadius
                        && x.pow(2).add(y.pow(2)).compareTo(scaledRadius.pow(2)) <= 0;
    }
    private boolean checkRectangle(BigDecimal x, BigDecimal y, BigDecimal r) { // квадрат
        return
                // x <= 0
                x.compareTo(BigDecimal.ZERO) <= 0
                        // y <= 0
                        && y.compareTo(BigDecimal.ZERO) <= 0
                        // x >= -r
                        && x.compareTo(r.negate()) >= 0
                        // y >= -r
                        && y.compareTo(r.negate()) >= 0;
    }

    private boolean checkTriangle(BigDecimal x, BigDecimal y, BigDecimal r) { ///треугольник
        return
                // x <= 0
                x.compareTo(BigDecimal.ZERO) <= 0
                        // y >= 0
                        && y.compareTo(BigDecimal.ZERO) >= 0
                        // y <= x/2 + r/2
                        && y.compareTo(x.divide(BigDecimal.valueOf(2)).add(r.divide(BigDecimal.valueOf(2)))) <= 0;
    }

}
