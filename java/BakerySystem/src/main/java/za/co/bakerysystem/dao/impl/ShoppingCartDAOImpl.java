package za.co.bakerysystem.dao.impl;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import za.co.bakerysystem.dao.ShoppingCartDAO;
import za.co.bakerysystem.dbmanager.DbManager;
import za.co.bakerysystem.model.Product;
import za.co.bakerysystem.model.ShoppingCart;

public class ShoppingCartDAOImpl implements ShoppingCartDAO {

    public Connection connection;
    public static DbManager db;
    private PreparedStatement ps;
    private ResultSet rs;

    public ShoppingCartDAOImpl(Connection connection) {
        this.connection = connection;
    }

    public ShoppingCartDAOImpl() {
        db = DbManager.getInstance();
        this.connection = db.getConnection();
    }

    // SQL queries
    public static final String SELECT_CART_BY_ID = "SELECT * FROM ShoppingCart WHERE cartID = ?";
    public static final String ADD_ITEM_TO_CART = "INSERT INTO shoppingcartproduct (cartID, productID, quantity) VALUES (?, ?, ?)";
    public static final String REMOVE_ITEM_FROM_CART = "DELETE FROM ShoppingCartProduct WHERE cartID = ? AND productID = ?";
    public static final String UPDATE_CART_TOTAL = "UPDATE ShoppingCart SET totalAmount = ? WHERE cartID = ?";

    @Override
    public ShoppingCart getShoppingCartById(int cartID) {
        db = DbManager.getInstance();

        try {
            connection = db.getConnection();
            ps = connection.prepareStatement(SELECT_CART_BY_ID);
            ps.setInt(1, cartID);
            rs = ps.executeQuery();

            if (rs.next()) {
                return extractShoppingCartFromResultSet(rs);
            }
        } catch (SQLException e) {
            System.out.println("Error :" + e.getMessage());
        } finally {
            try {
                if (rs != null) {
                    rs.close();
                }
                if (ps != null) {
                    ps.close();
                }
            } catch (SQLException e) {
                System.out.println("Error :" + e.getMessage());
            }
        }
        return null;
    }

    @Override
    public boolean addProductToCart(int cartID, Product product, int quantity) {

        db = DbManager.getInstance();

        try {
            connection = db.getConnection();

            // Check if the cartID exists in the shoppingcart table
            if (!isCartExists(cartID)) {
                // If cartID doesn't exist, create a new shopping cart entry
                createShoppingCart(cartID);
            }

            ps = connection.prepareStatement(ADD_ITEM_TO_CART);
            ps.setInt(1, cartID);
            ps.setInt(2, product.getID());
            ps.setInt(3, quantity);
            int rowsAffected = ps.executeUpdate();

            // If the product was successfully added to the cart, update the total amount
            if (rowsAffected > 0) {
                updateCartTotal(cartID);
                return true;
            } else {
                return false;
            }
        } catch (SQLException e) {
            System.out.println("Error :" + e.getMessage());
            System.err.println("SQL Exception: " + e.getMessage());
            return false;  // Operation failed
        }
    }

// Helper method to check if the cartID exists in the shoppingcart table
    private boolean isCartExists(int cartID) throws SQLException {

        try {
            connection = db.getConnection();
            ps = connection.prepareStatement(SELECT_CART_BY_ID);
            ps.setInt(1, cartID);
            rs = ps.executeQuery();
            return rs.next();  // Return true if there is a result (cartID exists), false otherwise
        } finally {
            if (rs != null) {
                rs.close();
            }
            if (ps != null) {
                ps.close();
            }
        }
    }

// Helper method to create a new shopping cart entry
    private boolean createShoppingCart(int cartID) {
        try {
            connection = db.getConnection();
            String createCartQuery = "INSERT INTO ShoppingCart (cartID, totalAmount) VALUES (?, 0)";
            ps = connection.prepareStatement(createCartQuery);
            ps.setInt(1, cartID);
            int rowsAffected = ps.executeUpdate();

            // Return true if at least one row was affected (success), false otherwise
            return rowsAffected > 0;
        } catch (SQLException e) {
            System.out.println("Error :" + e.getMessage());
            System.err.println("SQL Exception: " + e.getMessage());
            return false;  // Operation failed
        }
    }

    @Override
    public boolean removeProductFromCart(int cartID, Product product) {
        db = DbManager.getInstance();

        try {
            connection = db.getConnection();
            ps = connection.prepareStatement(REMOVE_ITEM_FROM_CART);
            ps.setInt(1, cartID);
            ps.setInt(2, product.getID());
            int rowsAffected = ps.executeUpdate();

            // Return true if at least one row was affected (success), false otherwise
            return rowsAffected > 0;
        } catch (SQLException e) {
            System.out.println("Error :" + e.getMessage());
            return false;  // Operation failed
        }
    }

    private ShoppingCart extractShoppingCartFromResultSet(ResultSet rs) throws SQLException {
        int cartID = rs.getInt("cartID");
        double totalAmount = rs.getDouble("totalAmount");
        // Retrieve products for the shopping cart
        List<Product> products = getProductsForShoppingCart(cartID);

        return new ShoppingCart(cartID, products, totalAmount);
    }

    @Override
    public List<Product> getProductsForShoppingCart(int cartID) {
        List<Product> products = new ArrayList<>();

        db = DbManager.getInstance();

        try {
            connection = db.getConnection();
            String query = "SELECT i.* FROM Product i "
                    + "JOIN ShoppingCartProduct sci ON i.productID = sci.productID "
                    + "WHERE sci.cartID = ?";
            ps = connection.prepareStatement(query);
            ps.setInt(1, cartID);
            rs = ps.executeQuery();

            while (rs.next()) {
                Product product = extractProductFromResultSet(rs);
                products.add(product);
            }
        } catch (SQLException e) {
            System.out.println("Error :" + e.getMessage());
        }
        return products;
    }

    // Helper method to update the total amount in the shopping cart
    private void updateCartTotal(int cartID) throws SQLException {
        double totalAmount = calculateTotalAmount(cartID);

        ps = connection.prepareStatement(UPDATE_CART_TOTAL);
        ps.setDouble(1, totalAmount);
        ps.setInt(2, cartID);
        ps.executeUpdate();
    }

    @Override
    public double calculateTotalAmount(int cartID) {
        double totalAmount = 0;

        db = DbManager.getInstance();

        try {
            connection = db.getConnection();
            String query = "SELECT SUM(i.price * sci.quantity) AS totalAmount "
                    + "FROM Product i JOIN ShoppingCartProduct sci ON i.productID = sci.productID "
                    + "WHERE sci.cartID = ?";
            ps = connection.prepareStatement(query);
            ps.setInt(1, cartID);
            rs = ps.executeQuery();

            if (rs.next()) {
                totalAmount = rs.getDouble("totalAmount");
            }
        } catch (SQLException e) {
            System.out.println("Error :" + e.getMessage());
        }
        return totalAmount;
    }

    public Product extractProductFromResultSet(ResultSet rs) throws SQLException {
        int ID = rs.getInt("productID");
        String name = rs.getString("name");
        int categoryID = rs.getInt("categoryID");
        double foodcost = rs.getDouble("foodcost");
        String description = rs.getString("description");
        String warnings = rs.getString("warnings");
        String nutrientInfo = rs.getString("nutrientInfoRMATION");
        int timecost = rs.getInt("timecost");
        String comment = rs.getString("comment");
        double price = rs.getDouble("price");

        return new Product(ID, name, price, foodcost, timecost, comment, description, nutrientInfo, warnings, categoryID);
    }

    public static void main(String[] args) {
        db = DbManager.getInstance();
        testShoppingCartMethods();
    }

    public static void testShoppingCartMethods() {
        ShoppingCartDAOImpl shoppingCartDAO = new ShoppingCartDAOImpl(db.getConnection());
        ProductDAOImpl productDAO = new ProductDAOImpl();

        try {
            Product newProduct = new Product("Freshh", 4.99, 6.7, 2, "GOOD BREAD", "HIGH IN carbo", "fibre", "none", 2);
            productDAO.createProduct(newProduct);

            // Get the newly added product from the database
            Product addedProduct = productDAO.getProductsByKeyWord("Freshh").get(0);

            // Add the product to the shopping cart with the calculated total quantity
            shoppingCartDAO.addProductToCart(2, addedProduct, 3);
            // Display the updated shopping cart
//            ShoppingCart retrievedCart = shoppingCartDAO.getShoppingCartById(1);
//            System.out.println("Shopping Cart after adding product: " + retrievedCart);
            //Display all products after adding to the cart
            // System.out.println("Products after adding to the cart: " + productDAO.getProducts());
        } catch (Exception e) {
            System.out.println("Error :" + e.getMessage());
        }
    }
}
