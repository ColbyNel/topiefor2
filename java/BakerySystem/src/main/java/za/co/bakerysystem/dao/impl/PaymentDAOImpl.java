package za.co.bakerysystem.dao.impl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import za.co.bakerysystem.dao.PaymentDAO;
import za.co.bakerysystem.dbmanager.DbManager;
import za.co.bakerysystem.model.Payment;
import za.co.bakerysystem.model.PaymentType;

public class PaymentDAOImpl implements PaymentDAO {

    private Connection connection;
    private static final DbManager db = DbManager.getInstance();
    private PreparedStatement ps;
    private ResultSet rs;

    @Override
    public boolean createPayment(Payment payment) {
        connection = db.getConnection();

        try {
            String query = "INSERT INTO Payment(order_id, Payment_Type_ID, Amount) VALUES (?, ?, ?)";
            ps = connection.prepareStatement(query);

            ps.setInt(1, payment.getOrderID());
            ps.setInt(2, payment.getPaymentTypeID());
            ps.setDouble(3, payment.getAmount());

            int affectedRows = ps.executeUpdate();
            return affectedRows > 0;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        }
    }

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
            e.printStackTrace();
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
            e.printStackTrace();
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
            e.printStackTrace();
        }
        return paymentTypes;
    }
    
    //-------------------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------------------
    
    public static void main(String[] args) {
        PaymentDAO paymentDAO = new PaymentDAOImpl();

//        // Test createPayment method
//        Payment newPayment = new Payment();
//        newPayment.setOrderID(2); // Set the orderID to an existing order ID in your database
//        newPayment.setPaymentTypeID(1); // Set the paymentTypeID to an existing payment type ID in your database
//        newPayment.setAmount(50.0);
//
//        boolean createPaymentSuccess = paymentDAO.createPayment(newPayment);
//        System.out.println("Create Payment success: " + createPaymentSuccess);

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
