package za.co.bakerysystem.dao;

import java.util.List;
import za.co.bakerysystem.model.Payment;
import za.co.bakerysystem.model.PaymentType;

public interface PaymentDAO {

    boolean createPayment(Payment payment);

    boolean deletePayment(int orderID);

    List<Payment> getOrderPayments(int orderID);

    List<Payment> getOrderPayment(int orderID);

    List<PaymentType> getPaymentTypes();
}
