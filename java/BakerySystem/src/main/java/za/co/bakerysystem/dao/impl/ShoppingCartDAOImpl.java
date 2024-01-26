package za.co.bakerysystem.dao.impl;

import java.sql.*;
import java.util.ArrayList;
import java.util.List;
import za.co.bakerysystem.dao.ShoppingCartDAO;
import za.co.bakerysystem.dbmanager.DbManager;
import za.co.bakerysystem.model.Product;
import za.co.bakerysystem.model.ShoppingCart;

public class ShoppingCartDAOImpl implements ShoppingCartDAO {

    private Connection connection;
    private static DbManager db;

    public ShoppingCartDAOImpl(Connection connection) {
        this.connection = connection;
    }

    // SQL queries
    private static final String SELECT_CART_BY_ID = "SELECT * FROM ShoppingCart WHERE cartID = ?";
    private static final String ADD_ITEM_TO_CART = "INSERT INTO shoppingcartproduct (cartID, productID, quantity) VALUES (?, ?, ?)";
    private static final String REMOVE_ITEM_FROM_CART = "DELETE FROM ShoppingCartProduct WHERE cartID = ? AND productID = ?";
    private static final String UPDATE_CART_TOTAL = "UPDATE ShoppingCart SET totalAmount = ? WHERE cartID = ?";

    @Override
    public ShoppingCart getShoppingCartById(int cartID) {
        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;
        db = DbManager.getInstance();

        try {
            connection = db.getConnection();
            preparedStatement = connection.prepareStatement(SELECT_CART_BY_ID);
            preparedStatement.setInt(1, cartID);
            resultSet = preparedStatement.executeQuery();

            if (resultSet.next()) {
                return extractShoppingCartFromResultSet(resultSet);
            }
        } catch (SQLException e) {
            System.out.println("Error :"+e.getMessage());
        } finally {
            try {
                if (resultSet != null) {
                    resultSet.close();
                }
                if (preparedStatement != null) {
                    preparedStatement.close();
                }
            } catch (SQLException e) {
                System.out.println("Error :"+e.getMessage());
            }
        }
        return null;
    }

    @Override
    public boolean addProductToCart(int cartID, Product product, int quantity) {
        PreparedStatement preparedStatement = null;
        db = DbManager.getInstance();

        try {
            connection = db.getConnection();

            // Check if the cartID exists in the shoppingcart table
            if (!isCartExists(cartID)) {
                // If cartID doesn't exist, create a new shopping cart entry
                createShoppingCart(cartID);
            }

            preparedStatement = connection.prepareStatement(ADD_ITEM_TO_CART);
            preparedStatement.setInt(1, cartID);
            preparedStatement.setInt(2, product.getID());
            preparedStatement.setInt(3, quantity);
            int rowsAffected = preparedStatement.executeUpdate();

            // After adding the product to the cart, update the cart total
            updateCartTotal(cartID);

            // Return true if at least one row was affected (success), false otherwise
            return rowsAffected > 0;
        } catch (SQLException e) {
            System.out.println("Error :"+e.getMessage());
            System.err.println("SQL Exception: " + e.getMessage());
            return false;  // Operation failed
        }
    }

// Helper method to check if the cartID exists in the shoppingcart table
    private boolean isCartExists(int cartID) throws SQLException {
        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;
        try {
            connection = db.getConnection();
            preparedStatement = connection.prepareStatement(SELECT_CART_BY_ID);
            preparedStatement.setInt(1, cartID);
            resultSet = preparedStatement.executeQuery();
            return resultSet.next();  // Return true if there is a result (cartID exists), false otherwise
        } finally {
            if (resultSet != null) {
                resultSet.close();
            }
            if (preparedStatement != null) {
                preparedStatement.close();
            }
        }
    }

// Helper method to create a new shopping cart entry
    private boolean createShoppingCart(int cartID) {
        PreparedStatement preparedStatement = null;
        try {
            connection = db.getConnection();
            String createCartQuery = "INSERT INTO ShoppingCart (cartID, totalAmount) VALUES (?, 0)";
            preparedStatement = connection.prepareStatement(createCartQuery);
            preparedStatement.setInt(1, cartID);
            int rowsAffected = preparedStatement.executeUpdate();

            // Return true if at least one row was affected (success), false otherwise
            return rowsAffected > 0;
        } catch (SQLException e) {
            System.out.println("Error :"+e.getMessage());
            System.err.println("SQL Exception: " + e.getMessage());
            return false;  // Operation failed
        }
    }

    @Override
    public boolean removeProductFromCart(int cartID, Product product) {
        PreparedStatement preparedStatement = null;
        db = DbManager.getInstance();

        try {
            connection = db.getConnection();
            preparedStatement = connection.prepareStatement(REMOVE_ITEM_FROM_CART);
            preparedStatement.setInt(1, cartID);
            preparedStatement.setInt(2, product.getID());
            int rowsAffected = preparedStatement.executeUpdate();
            updateCartTotal(cartID);//not sure

            // Return true if at least one row was affected (success), false otherwise
            return rowsAffected > 0;
        } catch (SQLException e) {
            System.out.println("Error :"+e.getMessage());
            return false;  // Operation failed
        }
    }

    @Override
    public boolean updateCartTotal(int cartID) {
        PreparedStatement preparedStatement = null;
        db = DbManager.getInstance();

        try {
            connection = db.getConnection();
            int totalQuantity = calculateTotalQuantity(cartID);

            // Update the total quantity in the ShoppingCartProduct table
            String updateQuery = "UPDATE ShoppingCartProduct SET quantity = ? WHERE cartID = ?";
            preparedStatement = connection.prepareStatement(updateQuery);
            preparedStatement.setInt(1, totalQuantity);
            preparedStatement.setInt(2, cartID);
            int quantityUpdateResult = preparedStatement.executeUpdate();

            // Calculate and update the total amount in the ShoppingCart table
            double totalAmount = calculateTotalAmount(cartID);
            String updateTotalQuery = "UPDATE ShoppingCart SET totalAmount = ? WHERE cartID = ?";
            preparedStatement = connection.prepareStatement(updateTotalQuery);
            preparedStatement.setDouble(1, totalAmount);
            preparedStatement.setInt(2, cartID);
            int totalAmountUpdateResult = preparedStatement.executeUpdate();

            // Return true if at least one of the updates was successful, false otherwise
            return quantityUpdateResult > 0 || totalAmountUpdateResult > 0;
        } catch (SQLException e) {
            System.out.println("Error :"+e.getMessage());
            return false;  // Operation failed
        }
    }

    private ShoppingCart extractShoppingCartFromResultSet(ResultSet resultSet) throws SQLException {
        int cartID = resultSet.getInt("cartID");
        double totalAmount = resultSet.getDouble("totalAmount");
        // Retrieve products for the shopping cart
        List<Product> products = getProductsForShoppingCart(cartID);

        return new ShoppingCart(cartID, products, totalAmount);
    }

    private List<Product> getProductsForShoppingCart(int cartID) {
        List<Product> products = new ArrayList<Product>();
        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;
        db = DbManager.getInstance();

        try {
            connection = db.getConnection();
            // Assuming there's a table named ShoppingCartProduct with columns (cartID, productID, quantity)
            String query = "SELECT i.* FROM Product i "
                    + "JOIN ShoppingCartProduct sci ON i.productID = sci.productID "
                    + "WHERE sci.cartID = ?";
            preparedStatement = connection.prepareStatement(query);
            preparedStatement.setInt(1, cartID);
            resultSet = preparedStatement.executeQuery();

            while (resultSet.next()) {
                Product product = extractProductFromResultSet(resultSet);
                products.add(product);
            }
        } catch (SQLException e) {
            System.out.println("Error :"+e.getMessage());
        } finally {
            try {
                if (resultSet != null) {
                    resultSet.close();
                }
                if (preparedStatement != null) {
                    preparedStatement.close();
                }
            } catch (SQLException e) {
                System.out.println("Error :"+e.getMessage());
            }
        }
        return products;
    }

    private int calculateTotalQuantity(int cartID) {
        int totalQuantity = 0;
        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;
        db = DbManager.getInstance();

        try {
            connection = db.getConnection();
            String query = "SELECT COUNT(DISTINCT productID) AS Quantity FROM ShoppingCartProduct WHERE cartID = ?";
            preparedStatement = connection.prepareStatement(query);
            preparedStatement.setInt(1, cartID);
            resultSet = preparedStatement.executeQuery();

            if (resultSet.next()) {
                totalQuantity = resultSet.getInt("Quantity");
            }
        } catch (SQLException e) {
            System.out.println("Error :"+e.getMessage());
        } finally {
            try {
                if (resultSet != null) {
                    resultSet.close();
                }
                if (preparedStatement != null) {
                    preparedStatement.close();
                }
            } catch (SQLException e) {
                System.out.println("Error :"+e.getMessage());
            }
        }
        return totalQuantity;
    }

    private double calculateTotalAmount(int cartID) {
        double totalAmount = 0;
        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;
        db = DbManager.getInstance();

        try {
            connection = db.getConnection();
            String query = "SELECT SUM(i.price * sci.quantity) AS totalAmount "
                    + "FROM Product i JOIN ShoppingCartProduct sci ON i.productID = sci.productID "
                    + "WHERE sci.cartID = ?";
            preparedStatement = connection.prepareStatement(query);
            preparedStatement.setInt(1, cartID);
            resultSet = preparedStatement.executeQuery();

            if (resultSet.next()) {
                totalAmount = resultSet.getDouble("totalAmount");
            }
        } catch (SQLException e) {
            System.out.println("Error :"+e.getMessage());
        } finally {
            try {
                if (resultSet != null) {
                    resultSet.close();
                }
                if (preparedStatement != null) {
                    preparedStatement.close();
                }
            } catch (SQLException e) {
                System.out.println("Error :"+e.getMessage());
            }
        }
        return totalAmount;
    }

    private Product extractProductFromResultSet(ResultSet resultSet) throws SQLException {
        int ID = resultSet.getInt("productID");
        String name = resultSet.getString("name");
        int categoryID = resultSet.getInt("categoryID");
        double foodcost = resultSet.getDouble("foodcost");
        String description = resultSet.getString("description");
        String warnings = resultSet.getString("warnings");
        String nutrientInfo = resultSet.getString("nutrientInfoRMATION");
        int timecost = resultSet.getInt("timecost");
        String comment = resultSet.getString("comment");
        double price = resultSet.getDouble("price");

        return new Product(ID, name, price, foodcost, timecost, comment, description, nutrientInfo, warnings, categoryID);
    }

    public static void main(String[] args) {
        db = DbManager.getInstance();
        testShoppingCartMethods();
    }

    private static void testShoppingCartMethods() {
        ShoppingCartDAOImpl shoppingCartDAO = new ShoppingCartDAOImpl(db.getConnection());
        ProductDAOImpl productDAO = new ProductDAOImpl();

        try {
            Product newProduct = new Product("Freshh", 4.99, 6.7, 2, "GOOD BREAD", "HIGH IN carbo", "fibre", "none", 2);
            productDAO.createProduct(newProduct);

            // Get the newly added product from the database
            Product addedProduct = productDAO.getProductsByKeyWord("Freshh").get(0);

            //int totalQuantity = shoppingCartDAO.calculateTotalQuantity(5);
//           
//            // Add the product to the shopping cart with the calculated total quantity
            // shoppingCartDAO.addProductToCart(2,addedProduct, totalQuantity);
            // Display the updated shopping cart
//            ShoppingCart retrievedCart = shoppingCartDAO.getShoppingCartById(1);
//            System.out.println("Shopping Cart after adding product: " + retrievedCart);
            //Display all products after adding to the cart
            // System.out.println("Products after adding to the cart: " + productDAO.getProducts());
        } catch (Exception e) {
            System.out.println("Error :"+e.getMessage());
        }
    }
}
