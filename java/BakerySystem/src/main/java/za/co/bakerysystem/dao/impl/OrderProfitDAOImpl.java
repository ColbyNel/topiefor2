package za.co.bakerysystem.dao.impl;

import za.co.bakerysystem.dao.OrderProfitDAO;
import java.sql.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import za.co.bakerysystem.dbmanager.DbManager;

public class OrderProfitDAOImpl implements OrderProfitDAO {

    private Connection connection;
    private static final DbManager db = DbManager.getInstance();
    private PreparedStatement ps;
    private ResultSet rs;

    @Override
    public List<Map<String, Object>> fetchOrderProfit() {
        return executeQuery("CALL fetch_order_profit()");
    }

    @Override
    public List<Map<String, Object>> fetchOrderProfitLastMonth() {
        return executeQuery("CALL fetch_order_profit_lastMonth()");
    }

    @Override
    public List<Map<String, Object>> fetchSaleProfit() {
        return executeQuery("CALL fetch_sale_profit()");
    }

    @Override
    public List<Map<String, Object>> fetchSaleProfitLastMonth() {
        return executeQuery("CALL fetch_sale_profit_lastMonth()");
    }

    @Override
    public List<Map<String, Object>> fetchOrderProfitInRange(LocalDate startDate, LocalDate endDate) {
        return executeQuery("CALL fetch_order_profit_in_range(?, ?)", startDate, endDate);
    }

    @Override
    public List<Map<String, Object>> fetchSaleProfitInRange(LocalDate startDate, LocalDate endDate) {
        return executeQuery("CALL fetch_sale_profit_in_range(?, ?)", startDate, endDate);
    }

    private List<Map<String, Object>> executeQuery(String query, Object... params) {
        List<Map<String, Object>> resultList = new ArrayList<>();

//        try (Connection connection = DriverManager.getConnection(JDBC_URL, USERNAME, PASSWORD);
//                PreparedStatement statement = connection.prepareStatement(query)) {
//
//            setParameters(statement, params);
//
//            try (ResultSet resultSet = statement.executeQuery()) {
//                ResultSetMetaData metaData = resultSet.getMetaData();
//                int columnCount = metaData.getColumnCount();
//
//                while (resultSet.next()) {
//                    Map<String, Object> row = new HashMap<>();
//                    for (int i = 1; i <= columnCount; i++) {
//                        String columnName = metaData.getColumnName(i);
//                        Object value = resultSet.getObject(i);
//                        row.put(columnName, value);
//                    }
//                    resultList.add(row);
//                }
//            }
//        } catch (SQLException e) {
//            e.printStackTrace();
//        }
        try {
            connection = db.getConnection();
            ps = connection.prepareStatement(query);
            setParameters(ps, params);
            rs = ps.executeQuery();

            ResultSetMetaData metaData = rs.getMetaData();
            int columnCount = metaData.getColumnCount();

            while (rs.next()) {
                Map<String, Object> row = new HashMap<>();
                for (int i = 1; i <= columnCount; i++) {
                    String columnName = metaData.getColumnName(i);
                    Object value = rs.getObject(i);
                    row.put(columnName, value);
                }
                resultList.add(row);
            }

        } catch (SQLException e) {
            handleSQLException(e);
        } finally {
            closeResultSet(rs);
            closePreparedStatement(ps);
            closeConnection(connection);
        }

        return resultList;
    }

    private void closePreparedStatement(PreparedStatement ps) {
        try {
            if (ps != null && !ps.isClosed()) {
                ps.close();
            }
        } catch (SQLException e) {
            handleSQLException(e);
        }
    }

    private void closeResultSet(ResultSet rs) {
        try {
            if (rs != null && !rs.isClosed()) {
                rs.close();
            }
        } catch (SQLException e) {
            handleSQLException(e);
        }
    }

    private void setParameters(PreparedStatement ps, Object... params) throws SQLException {
        for (int i = 0; i < params.length; i++) {
            ps.setObject(i + 1, params[i]);
        }
    }

    private void handleSQLException(SQLException e) {
        e.printStackTrace();
    }

    private void closeConnection(Connection connection) {
        try {
            if (connection != null && !connection.isClosed()) {
                connection.close();
            }
        } catch (SQLException e) {
            handleSQLException(e);
        }
    }

}
