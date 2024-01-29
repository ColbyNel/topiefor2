package za.co.bakerysystem.dao.impl;

import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.sql.*;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import za.co.bakerysystem.dao.CustomerDAO;
import za.co.bakerysystem.dbmanager.DbManager;
import za.co.bakerysystem.model.Customer;
import za.co.bakerysystem.model.Order;
import za.co.bakerysystem.model.Product;

public class CustomerDAOImpl implements CustomerDAO {

    private Connection connection;
    private static DbManager db;
    private PreparedStatement ps;
    private ResultSet rs;

    public CustomerDAOImpl(Connection connection) {
        this.connection = connection;
    }

    public CustomerDAOImpl() {
        db = DbManager.getInstance();
        this.connection = db.getConnection();

    }

    @Override
    public boolean createCustomer(Customer customer) {
        db = DbManager.getInstance();
        connection = db.getConnection();

        try {
            ps = connection.prepareStatement("INSERT INTO Customer (CustomerName, customerIDNo, phoneNumber, joinDate, addressOne, addressTwo, city, zip, comment,email, password) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)",
                    Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, customer.getCustomerName());
            ps.setString(2, customer.getCustomerIDNo());
            ps.setString(3, customer.getPhoneNumber());
            ps.setObject(4, customer.getJoinDate().now());
            ps.setString(5, customer.getAddressOne());
            ps.setString(6, customer.getAddressTwo());
            ps.setString(7, customer.getCity());
            ps.setString(8, customer.getZip());
            ps.setString(9, customer.getComment());
            ps.setString(10, customer.getEmail());

            // Encrypt the password using SHA-256
            String hashedPassword = hashPasswordSHA256(customer.getPassword());

            // Set the encrypted password back to the customer object
            customer.setPassword(hashedPassword);

            ps.setString(11, hashedPassword);

            int affectedRows = ps.executeUpdate();

            if (affectedRows == 0) {
                throw new SQLException("Creating customer failed, no rows affected.");
            }

            try (ResultSet generatedKeys = ps.getGeneratedKeys()) {
                if (generatedKeys.next()) {
                    int generatedID = generatedKeys.getInt(1);
                    customer.setID(generatedID);
                    return true; // Return true if the customer creation was successful
                } else {
                    throw new SQLException("Creating customer failed, no ID obtained.");
                }
            }

        } catch (SQLException ex) {
            System.out.println("Error: " + ex.getMessage());
            return false; // Return false if an exception occurs during customer creation
        }
    }

    private String hashPasswordSHA256(String password) {
        try {
            MessageDigest digest = MessageDigest.getInstance("SHA-256");
            byte[] hashBytes = digest.digest(password.getBytes(StandardCharsets.UTF_8));

            StringBuilder hexString = new StringBuilder();
            for (byte hashByte : hashBytes) {
                String hex = Integer.toHexString(0xff & hashByte);
                if (hex.length() == 1) {
                    hexString.append('0');
                }
                hexString.append(hex);
            }

            return hexString.toString();
        } catch (NoSuchAlgorithmException e) {
            // Handle the exception appropriately (e.g., log, throw a custom exception)
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public Customer login(String email, String password) {
        db = DbManager.getInstance();
        String sql = "SELECT * FROM customer WHERE email = ? AND password = ?";
        try {
            ps = connection.prepareStatement(sql);
            ps.setString(1, email);
            ps.setString(2, password);

            rs = ps.executeQuery();
            if (rs.next()) {
                return extractCustomerFromResultSet(rs);
            }
        } catch (SQLException ex) {
            System.out.println("Error: " + ex.getMessage());
        }
        return null;
    }

    @Override
    public boolean updateCustomer(Customer customer, int customerID) {
        db = DbManager.getInstance();
        connection = db.getConnection();

        try {
            ps = connection.prepareStatement("UPDATE Customer SET customerName=?, customerIDNo=?, phoneNumber=?, addressOne=?, addressTwo=?, city=?, zip=?, comment=? ,email=? ,password=? WHERE ID=?");
            ps.setString(1, customer.getCustomerName());
            ps.setString(2, customer.getCustomerIDNo());
            ps.setString(3, customer.getPhoneNumber());
            ps.setString(4, customer.getAddressOne());
            ps.setString(5, customer.getAddressTwo());
            ps.setString(6, customer.getCity());
            ps.setString(7, customer.getZip());
            ps.setString(8, customer.getComment());
            ps.setString(9, customer.getEmail());
            ps.setString(10, customer.getPassword());
            ps.setInt(11, customerID);

            int affectedRows = ps.executeUpdate();

            if (affectedRows == 0) {
                throw new SQLException("Updating customer failed, no rows affected.");
            }

            return true; // Return true if the customer update was successful

        } catch (SQLException ex) {
            System.out.println("Error: " + ex.getMessage());
            return false; // Return false if an exception occurs during customer update
        }
    }

    @Override
    public List<Customer> getCustomers() {
        db = DbManager.getInstance();
        List<Customer> customers = new ArrayList<>();
        connection = db.getConnection();

        try {
            ps = connection.prepareStatement("SELECT * FROM Customer");
            rs = ps.executeQuery();
            while (rs.next()) {
                Customer customer = extractCustomerFromResultSet(rs);
                customers.add(customer);
            }
        } catch (SQLException ex) {
            System.out.println("Error: " + ex.getMessage());

        }

        return customers;
    }

    @Override
    public int getCustomersQuantity() {
        db = DbManager.getInstance();
        connection = db.getConnection();
        try {
            ps = connection.prepareStatement("SELECT COUNT(ID) AS quantity FROM Customer");
            rs = ps.executeQuery();
            if (rs.next()) {
                return rs.getInt("quantity");
            }
        } catch (SQLException ex) {
            System.out.println("Error: " + ex.getMessage());

        }

        return 0;
    }

    @Override
    public List<Customer> getCustomersByKeyWord(String keyWord) {
        db = DbManager.getInstance();

        List<Customer> customers = new ArrayList<>();
        connection = db.getConnection();
        try {
            ps = connection.prepareCall("CALL fetch_customers_keyword(?)");
            ps.setString(1, keyWord);
            rs = ps.executeQuery();

            while (rs.next()) {
                Customer customer = extractCustomerFromResultSet(rs);
                customers.add(customer);
            }

        } catch (SQLException ex) {
            System.out.println("Error: " + ex.getMessage());

        }

        return customers;
    }

    @Override
    public Customer getCustomer(int customerID) {
        db = DbManager.getInstance();
        connection = db.getConnection();
        try {
            ps = connection.prepareCall("CALL fetch_customer_info(?)");
            ps.setInt(1, customerID);
            rs = ps.executeQuery();
            if (rs.next()) {
                return extractCustomerFromResultSet(rs);
            }
        } catch (SQLException ex) {
            System.out.println("Error: " + ex.getMessage());
        }

        return null;
    }

    @Override
    public List<Product> getFavoriteProducts(int customerID) {
        db = DbManager.getInstance();

        List<Product> favoriteProducts = new ArrayList<>();
        connection = db.getConnection();
        try {
            ps = connection.prepareCall("CALL fetch_customer_favorites(?)");
            ps.setInt(1, customerID);
            rs = ps.executeQuery();
            while (rs.next()) {
                Product product = extractProductFromResultSet(rs);
                favoriteProducts.add(product);
            }

        } catch (SQLException ex) {
            System.out.println("Error: " + ex.getMessage());
        }

        return favoriteProducts;
    }

    @Override
    public int getCustomerPoints(int customerID) {
        db = DbManager.getInstance();
        connection = db.getConnection();
        int total = 0;
        try {
            ps = connection.prepareCall("CALL fetch_customer_points(?)");
            ps.setInt(1, customerID);
            rs = ps.executeQuery();
            if (rs.next()) {
                total = rs.getInt("total");
            } else {
                System.out.println("No points or information");
            }

        } catch (SQLException ex) {
            System.out.println("Error: " + ex.getMessage());

        }

        return total;
    }

    @Override
    public List<Order> getCustomerOrders(int customerID) {
        db = DbManager.getInstance();

        List<Order> customerOrders = new ArrayList<>();
        connection = db.getConnection();
        try {
            ps = connection.prepareCall("CALL fetch_customer_orders(?)");
            ps.setInt(1, customerID);
            rs = ps.executeQuery();
            while (rs.next()) {
                Order order = extractOrderFromResultSet(rs);
                customerOrders.add(order);
            }
        } catch (SQLException ex) {
            System.out.println("Error: " + ex.getMessage());

        }

        return customerOrders;
    }

    @Override
    public int getNumOrders(int customerID) {
        db = DbManager.getInstance();
        connection = db.getConnection();
        try {
            ps = connection.prepareStatement("SELECT COUNT(ID) AS numOrder FROM `Order` o WHERE Customer_ID = ?");
            ps.setInt(1, customerID);
            rs = ps.executeQuery();

            if (rs.next()) {
                return rs.getInt("numOrder");
            }
        } catch (SQLException ex) {
            System.out.println("Error: " + ex.getMessage());

        }

        return 0;
    }

    @Override
    public List<Order> getOrdersByRange(int fulfilled, LocalDate startDate, LocalDate endDate) {
        List<Order> orders = new ArrayList<>();
        connection = DbManager.getInstance().getConnection();
        try {
            ps = connection.prepareCall("CALL fetch_select_orders_in_range(?, ?, ?)");
            ps.setInt(1, fulfilled);
            ps.setDate(2, Date.valueOf(startDate));
            ps.setDate(3, Date.valueOf(endDate));

            rs = ps.executeQuery();
            while (rs.next()) {
                Order order = extractOrderFromResultSet(rs);
                orders.add(order);
            }

        } catch (SQLException ex) {
            System.out.println("Error: " + ex.getMessage());

        }

        return orders;
    }

    @Override
    public boolean deleteCustomer(int customerID) {
        db = DbManager.getInstance();
        connection = db.getConnection();

        try (PreparedStatement ps = connection.prepareStatement("DELETE FROM Customer WHERE ID = ?")) {
            ps.setInt(1, customerID);
            int affectedRows = ps.executeUpdate();
            return affectedRows > 0;
        } catch (SQLException ex) {
            System.out.println("Error: " + ex.getMessage());
            return false;
        }
    }

    @Override
    public Customer getCustomerByEmail(String email) {
        db = DbManager.getInstance();
        connection = db.getConnection();
        try {
            ps = connection.prepareCall("CALL fetch_customer_email(?)");
            ps.setString(1, email);
            rs = ps.executeQuery();
            if (rs.next()) {
                return extractCustomerFromResultSet(rs);
            }
        } catch (SQLException ex) {
            System.out.println("Error: " + ex.getMessage());
        }

        return null;

    }

    private Customer extractCustomerFromResultSet(ResultSet rs) throws SQLException {
        Customer customer = new Customer();
        customer.setID(rs.getInt("ID"));
        customer.setCustomerName(rs.getString("customerName"));
        customer.setCustomerIDNo(rs.getString("customerIDNo"));
        customer.setPhoneNumber(rs.getString("phoneNumber"));
        customer.setJoinDate(rs.getObject("joinDate", LocalDateTime.class));
        customer.setAddressOne(rs.getString("addressOne"));
        customer.setAddressTwo(rs.getString("addressTwo"));
        customer.setCity(rs.getString("city"));
        customer.setZip(rs.getString("zip"));
        customer.setComment(rs.getString("comment"));
        customer.setPassword(rs.getString("password"));
        customer.setEmail(rs.getString("email"));

        return customer;
    }

    private Product extractProductFromResultSet(ResultSet rs) throws SQLException {
        Product product = new Product();
        product.setID(rs.getInt("ID"));
        product.setName(rs.getString("name"));
        product.setPrice(rs.getDouble("total")); //it is the total number of times the price was bought

        return product;
    }

    private Order extractOrderFromResultSet(ResultSet rs) throws SQLException {
        Order order = new Order();
        order.setID(rs.getInt("OrderID"));
        order.setCustomerID(rs.getInt("customer_ID"));
        order.setDatePlaced(rs.getObject("datePlaced", LocalDateTime.class));
        order.setPickupTime(rs.getObject("pickupTime", LocalDateTime.class));
        order.setFulfilled(rs.getInt("fulfilled"));
        order.setComment(rs.getString("comment"));
        order.setAmount(rs.getDouble("amount"));
        order.setStatus(rs.getString("status"));
        return order;
    }

    //----------------------------------------------------------------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------------------------------------------------------------
    //----------------------------------------------------------------------------------------------------------------------------------------
    public static void main(String[] args) {
        //db = DbManager.getInstance();
        CustomerDAO customerDAO = new CustomerDAOImpl();

        // Test createCustomer method
        Customer newCustomer = new Customer();
        newCustomer.setCustomerName("Sphe Doe");
        newCustomer.setCustomerIDNo("123456789");
        newCustomer.setPhoneNumber("555-1234");
        newCustomer.setJoinDate(LocalDateTime.now());
        newCustomer.setAddressOne("123 Main St");
        newCustomer.setCity("Pretoria");
        newCustomer.setZip("12345");
        newCustomer.setComment("A new customer");
        newCustomer.setEmail("john@example.com");
        newCustomer.setPassword("password34");

        //   Adding customer
        System.out.println(customerDAO.createCustomer(newCustomer));;
        //Test for login    
//        System.out.println(customerDAO.login("john@example.com", "password34"));
        //update customer
//        if (customerDAO.updateCustomer(newCustomer,2)) {
//            System.out.println("Success");
//        } else {
//            System.out.println("failed");
//
//        }
        //Delete customer
//        if (customerDAO.deleteCustomer(3)) {
//            System.out.println("Success");
//        } else {
//            System.out.println("failed");
//
//        }
        //System.out.println("New customer created with ID: " + newCustomer.getID());
//        // Test updateCustomer method
//        newCustomer.setCustomerName("John Updated");
//        customerDAO.updateCustomer(newCustomer);
//        System.out.println("Customer updated successfully.");
//
//        // Test getCustomers method
//        List<Customer> customers = customerDAO.getCustomers();
//        System.out.println("All customers: " + customers);
//
//        // Test getCustomersQuantity method
//        int customersQuantity = customerDAO.getCustomersQuantity();
//        System.out.println("Number of customers: " + customersQuantity);
//
//        // Test getCustomersByKeyWord method
//        String keyword = "Pretoria";
//        List<Customer> customersByKeyword = customerDAO.getCustomersByKeyWord(keyword);
//        System.out.println("Customers with keyword '" + keyword + "': " + customersByKeyword);
//
//        // Test getCustomer method
//        int customerIdToRetrieve = 2;
//        Customer retrievedCustomer = customerDAO.getCustomer(customerIdToRetrieve);
//        System.out.println("Retrieved customer by ID " + customerIdToRetrieve + ": " + retrievedCustomer);

        //Test getCustomerByEmail
//        Customer retrievedCustomer = customerDAO.getCustomerByEmail("john@example.com");
//        System.out.println("Retrieved customer by ID " + ": " + retrievedCustomer);
//
        // Test getFavoriteProducts method
//        List<Product> favoriteProducts = customerDAO.getFavoriteProducts(1);
//        System.out.println("Favorite products for customer ID " + 1 + ": " + favoriteProducts);
        // Test getCustomerPoints method
//        int customerPoints = customerDAO.getCustomerPoints(1);
//        System.out.println("Customer points for customer ID " + 1 + ": " + customerPoints);
        // Test getCustomerOrders method
//        List<Order> customerOrders = customerDAO.getCustomerOrders(1);
//        System.out.println("Orders for customer ID " + 4 + ": " + customerOrders);
//        // Test getNumOrders method
//        int numOrders = customerDAO.getNumOrders(1);
//        System.out.println("Number of orders:  " + numOrders);
//
        // Test getOrdersByRange method
//        int fulfilled = 0;
//        LocalDate startDate = LocalDate.now().minusMonths(1);
//        LocalDate endDate = LocalDate.now();
//        List<Order> ordersInRange = customerDAO.getOrdersByRange(fulfilled, startDate, endDate);
//        System.out.println("Orders within the date range: " + ordersInRange);
//        
        // Test deleteCustomers method
//List<String> customerIdsToDelete = new ArrayList<>();
//customerIdsToDelete.add(newCustomer.getID());
//customerDAO.deleteCustomers(customerIdsToDelete);
//System.out.println("Customers deleted successfully.");
    }

}
