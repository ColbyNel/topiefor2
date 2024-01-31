package za.co.bakerysystem.dao.impl;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import za.co.bakerysystem.dao.PaymentDAO;
import za.co.bakerysystem.dao.ProductDAO;
import za.co.bakerysystem.dbmanager.DbManager;
import za.co.bakerysystem.model.Payment;
import za.co.bakerysystem.model.PaymentType;
import za.co.bakerysystem.model.Product;
import za.co.bakerysystem.model.RecipeIngredient;

public class PaymentDAOImpl implements PaymentDAO {

    private Connection connection;
    private static final DbManager db = DbManager.getInstance();
    private PreparedStatement ps;
    private ResultSet rs;
    private ProductDAO productDAO;
    private CallableStatement cs;

    //--------------------------------------------------------------------------------------------------
    @Override
    public boolean createPayment(Payment payment) {
        productDAO = new ProductDAOImpl();
        connection = db.getConnection();

        try {
            // Begin a transaction
            connection.setAutoCommit(false);

            String paymentQuery = "INSERT INTO Payment(order_id, Payment_Type_ID, Amount) VALUES (?, ?, ?)";
            ps = connection.prepareStatement(paymentQuery);

            ps.setInt(1, payment.getOrderID());
            ps.setInt(2, payment.getPaymentTypeID());
            ps.setDouble(3, payment.getAmount());

            int paymentRows = ps.executeUpdate();

            if (paymentRows <= 0) {
                // Rollback the transaction if payment insertion fails
                connection.rollback();
                return false;
            }
            // Get products from OrderDetails
            List<Product> products = productDAO.getProductsForOrder(payment.getOrderID());

            // Iterate through each product and subtract ingredient quantity from the database
            for (Product product : products) {
                subtractIngredientQuantityForProduct(product);
            }
            // Commit the transaction after successful payment insertion and ingredient subtraction
            connection.commit();

            return true;
        } catch (SQLException e) {
            try {
                // Rollback the transaction on any exception
                connection.rollback();
            } catch (SQLException rollbackException) {
                System.err.println("Error rolling back transaction: " + rollbackException.getMessage());
            }

            System.err.println("Error: " + e.getMessage());
            return false;
        }
    }

    private List<RecipeIngredient> getRecipeIngredients(Product product) {

        try {
            connection = db.getConnection();
            String query = "SELECT * FROM recipe_ingredient WHERE recipe_id = ?";
            ps = connection.prepareStatement(query);
            ps.setInt(1, product.getID());

            rs = ps.executeQuery();

            List<RecipeIngredient> recipeIngredients = new ArrayList<>();

            while (rs.next()) {
                int ingredientID = rs.getInt("ingredient_id");
                int quantity = rs.getInt("quantity");

                RecipeIngredient recipeIngredient = new RecipeIngredient(product.getID(), ingredientID, quantity);
                recipeIngredients.add(recipeIngredient);
            }

            return recipeIngredients;
        } catch (SQLException e) {
            System.err.println("SQL Exception: " + e.getMessage());
            return null; // Handle the error appropriately
        }
    }

    private void subtractIngredientQuantityForProduct(Product product) {
        List<RecipeIngredient> recipeIngredients = getRecipeIngredients(product);

        try {
            connection = db.getConnection();
            for (RecipeIngredient recipeIngredient : recipeIngredients) {
                int requiredQuantity = recipeIngredient.getQuantity();

                String updateQuery = "UPDATE ingredient SET quantity = quantity - ? WHERE id = ?";
                ps = connection.prepareStatement(updateQuery);
                ps.setInt(1, requiredQuantity);
                ps.setInt(2, recipeIngredient.getIngredientID());

                ps.executeUpdate();
            }
        } catch (SQLException e) {
            System.err.println("SQL Exception: " + e.getMessage());
        }
    }

    //---------------------------------------------------------------------------------------------------
    @Override
    public boolean deletePayment(int orderID) {
        connection = db.getConnection();

        try {
            String query = "DELETE FROM Payment WHERE order_id = ?";
            ps = connection.prepareStatement(query);

            ps.setInt(1, orderID);

            int affectedRows = ps.executeUpdate();
            return affectedRows > 0;
        } catch (SQLException e) {
            System.out.println("Error: " + e.getMessage());
            return false;
        }
    }

    @Override
    public List<Payment> getOrderPayments(int orderID) {
        List<Payment> payments = new ArrayList<>();
        connection = db.getConnection();

        try {
            String query = "SELECT * FROM Payment WHERE order_id = ?";
            ps = connection.prepareStatement(query);

            ps.setInt(1, orderID);

            rs = ps.executeQuery();
            while (rs.next()) {
                Payment payment = new Payment();
                payment.setOrderID(rs.getInt("order_id"));
                payment.setPaymentTypeID(rs.getInt("Payment_Type_ID"));
                payment.setAmount(rs.getDouble("Amount"));
                payments.add(payment);
            }
        } catch (SQLException e) {
            System.out.println("Error: " + e.getMessage());
        }
        return payments;
    }

    @Override
    public List<Payment> getOrderPayment(int orderID) {
        List<Payment> payments = new ArrayList<>();
        connection = db.getConnection();

        try {
            String sql = "{CALL fetch_single_order_payments(?)}";
            cs = connection.prepareCall(sql);
            cs.setInt(1, orderID);

            rs = cs.executeQuery();

            while (rs.next()) {
                Payment payment = new Payment();
                payment.setPaymentTypeID(rs.getInt("payment_type_id"));
                payment.setOrderID(orderID);
                payment.setAmount(rs.getDouble("Amount"));
                payments.add(payment);
            }
        } catch (SQLException e) {
            System.out.println("Error getting order payments: " + e.getMessage());
        }
        return payments;
    }

    @Override
    public List<PaymentType> getPaymentTypes() {
        List<PaymentType> paymentTypes = new ArrayList<>();
        connection = db.getConnection();

        try {
            String query = "SELECT * FROM Payment_Type";
            ps = connection.prepareStatement(query);

            rs = ps.executeQuery();
            while (rs.next()) {
                PaymentType paymentType = new PaymentType();
                paymentType.setID(rs.getInt("Payment_Type_ID"));
                paymentType.setType(rs.getString("Type"));
                paymentTypes.add(paymentType);
            }
        } catch (SQLException e) {
            System.out.println("Error: " + e.getMessage());
        }
        return paymentTypes;
    }

    //-------------------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------------------
    public static void main(String[] args) {
        PaymentDAO paymentDAO = new PaymentDAOImpl();

        // Test createPayment method
        Payment newPayment = new Payment();
        newPayment.setOrderID(5);
        newPayment.setPaymentTypeID(1);
        newPayment.setAmount(50.0);

        boolean createPaymentSuccess = paymentDAO.createPayment(newPayment);
        System.out.println("Create Payment success: " + createPaymentSuccess);
        // Test getOrderPayments method
//        List<Payment> orderPayments = paymentDAO.getOrderPayments(2); // Replace 1 with an existing order ID in your database
//        System.out.println("Order Payments: " + orderPayments);
//        // Test deletePayment method
//        boolean deletePaymentSuccess = paymentDAO.deletePayment(2); // Replace 1 with an existing order ID in your database
//        System.out.println("Delete Payment success: " + deletePaymentSuccess);
//
//        // Test getPaymentTypes method
//        List<PaymentType> paymentTypes = paymentDAO.getPaymentTypes();
//        System.out.println("Payment Types: " + paymentTypes);
    }

}
