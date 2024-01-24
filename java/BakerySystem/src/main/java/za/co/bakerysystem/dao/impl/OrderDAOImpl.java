package za.co.bakerysystem.dao.impl;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.sql.Timestamp;
import java.util.ArrayList;
import java.util.List;
import za.co.bakerysystem.dao.OrderDAO;
import za.co.bakerysystem.dbmanager.DbManager;
import za.co.bakerysystem.model.Order;
import za.co.bakerysystem.model.OrderDetails;
import za.co.bakerysystem.model.Payment;
import za.co.bakerysystem.model.Product;

public class OrderDAOImpl implements OrderDAO {

    private Connection connection;
    private static DbManager db;
    private PreparedStatement ps;
    private ResultSet rs;
    private CallableStatement callableStatement;

    @Override
    public boolean createOrder(Order order) {
        db = DbManager.getInstance();
        connection = db.getConnection();

        try {
            ps = connection.prepareStatement(
                    "INSERT INTO `Order` (Customer_ID, DatePlaced, PickupTime, Fulfilled, Comment, Amount, status) VALUES(?,?,?,?,?,?,?)",
                    Statement.RETURN_GENERATED_KEYS);

            // Set parameters
            ps.setInt(1, order.getCustomerID());
            ps.setObject(2, order.getDatePlaced().now());
            ps.setObject(3, order.getPickupTime().now().plusDays(5));
            ps.setInt(4, order.getFulfilled());
            ps.setString(5, order.getComment());
            ps.setDouble(6, order.getAmount());
            ps.setString(7, order.getStatus());

            int affectedRows = ps.executeUpdate();

            // Check if the insertion was successful
            if (affectedRows > 0) {
                ResultSet generatedKeys = ps.getGeneratedKeys();
                return generatedKeys.next(); // Return true if there are generated keys
            }
        } catch (SQLException e) {
            System.out.println("Error: " + e.getMessage());
        } finally {
            try {
                if (ps != null) {
                    ps.close();
                }
                if (connection != null) {
                    connection.close();
                }
            } catch (SQLException e) {
                System.out.println("Error: " + e.getMessage());
            }
        }
        return false;
    }

    @Override
    public boolean updateOrder(Order order) {
        db = DbManager.getInstance();
        connection = db.getConnection();

        try {
            ps = connection.prepareStatement("UPDATE `Order` SET Customer_ID=?, Fulfilled=?, Comment=?, Amount=?, status=? WHERE ID=?");

            // Set parameters 
            ps.setInt(1, order.getCustomerID());
//            ps.setString(2, order.getDatePlaced().toString());
//            ps.setString(3, order.getPickupTime().toString());
            ps.setInt(2, order.getFulfilled());
            ps.setString(3, order.getComment());
            ps.setDouble(4, order.getAmount());
            ps.setString(5, order.getStatus());
            ps.setInt(6, order.getID());

            int affectedRows = ps.executeUpdate();

            // Check if the update was successful
            return affectedRows > 0;
        } catch (SQLException e) {
            System.out.println("Error updating order: " + e.getMessage());
            System.out.println("Error: " + e.getMessage());
        }
        
        return false;
    }

    @Override
    public boolean fulfillOrder(int orderID, boolean fulfilled) {
        db = DbManager.getInstance();
        connection = db.getConnection();

        try {
            ps = connection.prepareStatement("UPDATE `Order` SET Fulfilled=? WHERE ID=?");

            // Set parameters
            ps.setBoolean(1, fulfilled);
            ps.setInt(2, orderID);

            int affectedRows = ps.executeUpdate();

            // Check if the update was successful
            return affectedRows > 0;
        } catch (SQLException e) {
            System.out.println("Error fulfilling order: " + e.getMessage());
            System.out.println("Error: " + e.getMessage());
        } finally {
            try {
                if (ps != null) {
                    ps.close();
                }
                if (connection != null) {
                    connection.close();
                }
            } catch (SQLException e) {
                System.out.println("Error closing resources: " + e.getMessage());
                System.out.println("Error: " + e.getMessage());
            }
        }
        return false;
    }

    @Override
    public boolean createOrderDetail(OrderDetails orderDetails) {
        db = DbManager.getInstance();
        connection = db.getConnection();

        try {
            ps = connection.prepareStatement(
                    "INSERT INTO Order_Details (order_id, product_id, PriceAtSale, FoodCostAtSale, Quantity, Comment) VALUES(?,?,?,?,?,?)");

            ps.setInt(1, orderDetails.getOrderID());
            ps.setInt(2, orderDetails.getProductID());
            ps.setDouble(3, orderDetails.getPriceAtSale());
            ps.setDouble(4, orderDetails.getFoodCostAtSale());
            ps.setInt(5, orderDetails.getQuantity());
            ps.setString(6, orderDetails.getComment());

            ps.executeUpdate();

            // Assuming the insertion was successful if no exception occurred
            return true;
        } catch (SQLException e) {
            System.out.println("Error creating order detail: " + e.getMessage());
            System.out.println("Error: " + e.getMessage());
            return false;
        } finally {
            try {
                if (ps != null) {
                    ps.close();
                }
                if (connection != null) {
                    connection.close();
                }
            } catch (SQLException e) {
                System.out.println("Error closing resources: " + e.getMessage());
                System.out.println("Error: " + e.getMessage());
            }
        }
    }

    @Override
    public List<Order> getOrders() {
        List<Order> orders = new ArrayList<>();
        db = DbManager.getInstance();
        connection = db.getConnection();

        try {
            ps = connection.prepareStatement("SELECT * FROM `Order`");
            rs = ps.executeQuery();

            while (rs.next()) {
                Order order = new Order();
                order.setID(rs.getInt("ID"));
                order.setCustomerID(rs.getInt("Customer_ID"));

                Timestamp timestamp = rs.getTimestamp("DatePlaced");
                if (timestamp != null) {
                    order.setDatePlaced(timestamp.toLocalDateTime());
                }
                Timestamp pickupTimeTimestamp = rs.getTimestamp("PickupTime");
                if (pickupTimeTimestamp != null) {
                    order.setPickupTime(pickupTimeTimestamp.toLocalDateTime());
                }
                order.setFulfilled(rs.getInt("Fulfilled"));
                order.setComment(rs.getString("Comment"));
                order.setAmount(rs.getDouble("Amount"));
                order.setStatus(rs.getString("status"));

                orders.add(order);
            }
        } catch (SQLException e) {
            System.out.println("Error getting orders: " + e.getMessage());

            e.printStackTrace();
        } finally {
            try {
                if (rs != null) {
                    rs.close();
                }
                if (ps != null) {
                    ps.close();
                }
                if (connection != null) {
                    connection.close();
                }
            } catch (SQLException e) {
                System.out.println("Error closing resources: " + e.getMessage());
                System.out.println("Error: " + e.getMessage());
            }
        }
        return orders;
    }

    @Override
    public List<Order> getLastedOrders() {
        List<Order> lastedOrders = new ArrayList<>();
        db = DbManager.getInstance();
        connection = db.getConnection();

        try {
            String sql = "SELECT o.ID, DatePlaced, c.ID as CustomerID, PickupTime, Fulfilled, o.Comment, CustomerName "
                    + "FROM `Order` o JOIN Customer c ON c.ID = Customer_ID WHERE Fulfilled=0";
            ps = connection.prepareStatement(sql);
            rs = ps.executeQuery();

            while (rs.next()) {
                Order order = new Order();
                order.setID(rs.getInt("ID"));
                order.setCustomerID(rs.getInt("CustomerID"));
                Timestamp timestamp = rs.getTimestamp("DatePlaced");
                if (timestamp != null) {
                    order.setDatePlaced(timestamp.toLocalDateTime());
                }
                Timestamp pickupTimeTimestamp = rs.getTimestamp("PickupTime");
                if (pickupTimeTimestamp != null) {
                    order.setPickupTime(pickupTimeTimestamp.toLocalDateTime());
                }

                order.setFulfilled(rs.getInt("Fulfilled"));
                order.setComment(rs.getString("Comment"));
                lastedOrders.add(order);
            }
        } catch (SQLException e) {
            System.out.println("Error getting lasted orders: " + e.getMessage());
            System.out.println("Error: " + e.getMessage());
        } finally {
            try {
                if (rs != null) {
                    rs.close();
                }
                if (ps != null) {
                    ps.close();
                }
                if (connection != null) {
                    connection.close();
                }
            } catch (SQLException e) {
                System.out.println("Error closing resources: " + e.getMessage());
                System.out.println("Error: " + e.getMessage());
            }
        }
        return lastedOrders;
    }

    @Override
    public int getOrdersCurrent() {
        int quantity = 0;
        db = DbManager.getInstance();
        connection = db.getConnection();

        try {
            String sql = "SELECT COUNT(ID) as quantity FROM `Order` WHERE Fulfilled=0";
            ps = connection.prepareStatement(sql);
            rs = ps.executeQuery();

            if (rs.next()) {
                quantity = rs.getInt("quantity");
            }
        } catch (SQLException e) {
            System.out.println("Error getting current orders quantity: " + e.getMessage());
            System.out.println("Error: " + e.getMessage());
        } finally {
            try {
                if (rs != null) {
                    rs.close();
                }
                if (ps != null) {
                    ps.close();
                }
                if (connection != null) {
                    connection.close();
                }
            } catch (SQLException e) {
                System.out.println("Error closing resources: " + e.getMessage());
                System.out.println("Error: " + e.getMessage());
            }
        }
        return quantity;
    }

    @Override
    public int getTotalOrdersQuantity() {
        int ordersQuantity = 0;
        db = DbManager.getInstance();
        connection = db.getConnection();

        try {
            String sql = "SELECT SUM(Quantity) as ordersQuantity FROM Order_Details";
            ps = connection.prepareStatement(sql);
            rs = ps.executeQuery();

            if (rs.next()) {
                ordersQuantity = rs.getInt("ordersQuantity");
            }
        } catch (SQLException e) {
            System.out.println("Error getting total orders quantity: " + e.getMessage());
            System.out.println("Error: " + e.getMessage());
        } finally {
            try {
                if (rs != null) {
                    rs.close();
                }
                if (ps != null) {
                    ps.close();
                }
                if (connection != null) {
                    connection.close();
                }
            } catch (SQLException e) {
                System.out.println("Error closing resources: " + e.getMessage());
                System.out.println("Error: " + e.getMessage());
            }
        }
        return ordersQuantity;
    }

    @Override
    public List<Order> getOrdersByRange(String startDate, String endDate, String keyWord) {
        List<Order> ordersInRange = new ArrayList<>();
        db = DbManager.getInstance();
        connection = db.getConnection();

        try {
            String sql = "{CALL fetch_orders_in_range(?,?,?)}";
            ps = connection.prepareCall(sql);
            ps.setString(1, startDate);
            ps.setString(2, endDate);
            ps.setString(3, keyWord);

            rs = ps.executeQuery();

            while (rs.next()) {
                Order order = new Order();
                order.setID(rs.getInt("order_id"));
                order.setCustomerID(rs.getInt("Customer_ID"));
                Timestamp timestamp = rs.getTimestamp("DatePlaced");
                if (timestamp != null) {
                    order.setDatePlaced(timestamp.toLocalDateTime());
                }
                Timestamp pickupTimeTimestamp = rs.getTimestamp("PickupTime");
                if (pickupTimeTimestamp != null) {
                    order.setPickupTime(pickupTimeTimestamp.toLocalDateTime());
                }
                order.setFulfilled(rs.getInt("Fulfilled"));
                order.setComment(rs.getString("Comment"));
                order.setAmount(rs.getDouble("Amount"));
                ordersInRange.add(order);
            }
        } catch (SQLException e) {
            System.out.println("Error getting orders by range: " + e.getMessage());
            System.out.println("Error: " + e.getMessage());
        } finally {
            try {
                if (rs != null) {
                    rs.close();
                }
                if (callableStatement != null) {
                    callableStatement.close();
                }
                if (connection != null) {
                    connection.close();
                }
            } catch (SQLException e) {
                System.out.println("Error closing resources: " + e.getMessage());
                System.out.println("Error: " + e.getMessage());
            }
        }
        return ordersInRange;
    }

    @Override
    public Order getOrder(int orderID) {
        Order order = null;
        db = DbManager.getInstance();
        connection = db.getConnection();

        try {
            String sql = "{CALL fetch_single_order(?)}";
            callableStatement = connection.prepareCall(sql);
            callableStatement.setInt(1, orderID);

            rs = callableStatement.executeQuery();

            if (rs.next()) {
                order = new Order();
                order.setID(rs.getInt("order_id"));
                order.setCustomerID(rs.getInt("Customer_ID"));
                Timestamp timestamp = rs.getTimestamp("DatePlaced");
                if (timestamp != null) {
                    order.setDatePlaced(timestamp.toLocalDateTime());
                }
                Timestamp pickupTimeTimestamp = rs.getTimestamp("PickupTime");
                if (pickupTimeTimestamp != null) {
                    order.setPickupTime(pickupTimeTimestamp.toLocalDateTime());
                }
                order.setFulfilled(rs.getInt("Fulfilled"));
                order.setComment(rs.getString("Comment"));
                order.setAmount(rs.getDouble("Amount"));
                order.setStatus(rs.getString("Status"));
            }
        } catch (SQLException e) {
            System.out.println("Error getting order: " + e.getMessage());
        } 
        return order;
    }

    @Override
    public List<Payment> getOrderPayment(int orderID) {
        List<Payment> payments = new ArrayList<>();
        db = DbManager.getInstance();
        connection = db.getConnection();

        try {
            String sql = "{CALL fetch_single_order_payments(?)}";
            callableStatement = connection.prepareCall(sql);
            callableStatement.setInt(1, orderID);

            rs = callableStatement.executeQuery();

            while (rs.next()) {
                Payment payment = new Payment();
                payment.setPaymentTypeID(rs.getInt("payment_type_id"));
                payment.setOrderID(orderID);
                payment.setAmount(rs.getDouble("Amount"));
                payments.add(payment);
            }
        } catch (SQLException e) {
            System.out.println("Error getting order payments: " + e.getMessage());
        } finally {
            try {
                if (rs != null) {
                    rs.close();
                }
                if (callableStatement != null) {
                    callableStatement.close();
                }
                if (connection != null) {
                    connection.close();
                }
            } catch (SQLException e) {
                System.out.println("Error closing resources: " + e.getMessage());
            }
        }
        return payments;
    }

    @Override
    public List<Product> getOrderProduct(int orderID) {
        List<Product> products = new ArrayList<>();
        db = DbManager.getInstance();
        connection = db.getConnection();

        try {
            String sql = "{CALL fetch_single_order_details(?)}";
            callableStatement = connection.prepareCall(sql);
            callableStatement.setInt(1, orderID);

            rs = callableStatement.executeQuery();

            while (rs.next()) {
                Product product = new Product();
                product.setID(rs.getInt("product_id"));
                product.setName(rs.getString("Name"));
                product.setPrice(rs.getDouble("Price"));
                product.setFoodCost(rs.getDouble("FoodCost"));
                product.setTimeCost(rs.getInt("TimeCost"));
                product.setComment(rs.getString("Comment"));
                product.setDescription(rs.getString("Description"));
                product.setNutrientInformation(rs.getString("NutrientInformation"));
                product.setWarnings(rs.getString("Warnings"));
                product.setCategoryID(rs.getInt("CategoryID"));
                products.add(product);
            }
        } catch (SQLException e) {
            System.out.println("Error getting order products: " + e.getMessage());
        } finally {
            try {
                if (rs != null) {
                    rs.close();
                }
                if (callableStatement != null) {
                    callableStatement.close();
                }
                if (connection != null) {
                    connection.close();
                }
            } catch (SQLException e) {
                System.out.println("Error closing resources: " + e.getMessage());
            }
        }
        return products;
    }

    @Override
    public void deleteOrder(int orderID) {
        db = DbManager.getInstance();
        connection = db.getConnection();

        try {
            String query = "DELETE FROM `Order` WHERE ID = ?";
            ps = connection.prepareStatement(query);
            ps.setInt(1, orderID);
            ps.executeUpdate();
        } catch (SQLException e) {
            System.out.println("Error: " + e.getMessage());
        } finally {
            try {
                if (ps != null) {
                    ps.close();
                }
                if (connection != null) {
                    connection.close();
                }
            } catch (SQLException e) {
                System.out.println("Error: " + e.getMessage());
            }
        }
    }

    @Override
    public void deleteOrderDetail(int orderID) {
        db = DbManager.getInstance();
        connection = db.getConnection();

        try {
            String query = "DELETE FROM Order_Details WHERE order_id = ?";
            ps = connection.prepareStatement(query);
            ps.setInt(1, orderID);
            ps.executeUpdate();
        } catch (SQLException e) {
            System.out.println("Error: " + e.getMessage());
        } finally {
            try {
                if (ps != null) {
                    ps.close();
                }
                if (connection != null) {
                    connection.close();
                }
            } catch (SQLException e) {
                System.out.println("Error: " + e.getMessage());
            }
        }
    }

    //------------------------------------------------------------------------------------------------
    //------------------------------------------------------------------------------------------------
    //------------------------------------------------------------------------------------------------
    public static void main(String[] args) {
        OrderDAOImpl orderDAO = new OrderDAOImpl();
//
////        // Test createOrder
        Order orderToCreate = new Order();
        orderToCreate.setCustomerID(1);
//        orderToCreate.setDatePlaced(LocalDateTime.now());
//        orderToCreate.setPickupTime(LocalDateTime.now().plusHours(3));
        orderToCreate.setFulfilled(0);
        orderToCreate.setComment("Get Order");
        orderToCreate.setAmount(90.0);
        orderToCreate.setStatus("Delivered");
        orderToCreate.setID(2);
//
////
//        boolean createOrderResult = orderDAO.createOrder(orderToCreate);
//        System.out.println("Create Order Result: " + createOrderResult);
//        boolean createOrderResult = orderDAO.createOrder(orderToCreate);
//        System.out.println("Create Order Result: " + createOrderResult);
        // Test updateOrder
//        Order orderToUpdate = orderDAO.getOrders().get(0); // Assuming there's an order in the database
//        orderToUpdate.setComment("Get Comment");

        boolean updateOrderResult = orderDAO.updateOrder(orderToCreate);
        System.out.println("Update Order Result: " + updateOrderResult);
        // Test fulfillOrder
//        int orderIdToFulfill = orderDAO.getOrders().get(0).getID(); // Assuming there's an order in the database
//        boolean fulfillOrderResult = orderDAO.fulfillOrder(orderIdToFulfill, true);
//        System.out.println("Fulfill Order Result: " + fulfillOrderResult);
        // Test createOrderDetail
//        OrderDetails orderDetails = new OrderDetails();
//        //orderDetails.setOrderID(orderIdToFulfill);
//        orderDetails.setOrderID(1);
//        orderDetails.setProductID(2); // Assuming there's a product in the database
//        orderDetails.setPriceAtSale(20.0);
//        orderDetails.setFoodCostAtSale(15.0);
//        orderDetails.setQuantity(2);
//        orderDetails.setComment("Test Order Detail");
//
//        boolean createOrderDetailResult = orderDAO.createOrderDetail(orderDetails);
//        System.out.println("Create Order Detail Result: " + createOrderDetailResult);
        // Test getOrders
//        List<Order> allOrders = orderDAO.getOrders();
//        System.out.println("All Orders: " + allOrders);
        // Test getLastedOrders
//        List<Order> lastedOrders = orderDAO.getLastedOrders();
//        System.out.println("Lasted Orders: " + lastedOrders);
        // Test getOrdersCurrent
//        int currentOrdersQuantity = orderDAO.getOrdersCurrent();
//        System.out.println("Current Orders Quantity: " + currentOrdersQuantity);
        // Test getTotalOrdersQuantity
//        int totalOrdersQuantity = orderDAO.getTotalOrdersQuantity();
//        System.out.println("Total Orders Quantity: " + totalOrdersQuantity);
//        // Test getOrdersByRange
        // List<Order> ordersInRange = orderDAO.getOrdersByRange("2024-01-01", "2025-12-31", "Sphe");
        // System.out.println("Orders in Range: " + ordersInRange);
        // Test getOrder
//        Order fetchedOrder = orderDAO.getOrder(1);
//        System.out.println("Fetched Order: " + fetchedOrder);
        // Test getOrderPayment
//        List<Payment> orderPayments = orderDAO.getOrderPayment(1);
//        System.out.println("Order Payments: " + orderPayments);
        // Test getOrderProduct
//        List<Product> orderProducts = orderDAO.getOrderProduct(1);
//        System.out.println("Order Products: " + orderProducts);
        // Test deleteOrder
//        orderDAO.deleteOrder(1);
//        System.out.println("Order Deleted");
        // Test deleteOrderDetail
//        orderDAO.deleteOrderDetail(1);
//        System.out.println("Order Detail Deleted");
    }

}
