package za.co.bakerysystem.service.impl;

import za.co.bakerysystem.dao.PaymentDAO;
import za.co.bakerysystem.model.Payment;
import za.co.bakerysystem.model.PaymentType;
import za.co.bakerysystem.service.PaymentService;

import java.util.List;

public class PaymentServiceImpl implements PaymentService {

    private PaymentDAO paymentDAO;

    public PaymentServiceImpl(PaymentDAO paymentDAO) {
        this.paymentDAO = paymentDAO;
    }

    @Override
    public boolean createPayment(Payment payment) {
        return paymentDAO.createPayment(payment);
    }

    @Override
    public boolean deletePayment(int orderID) {
        return paymentDAO.deletePayment(orderID);
    }

    @Override
    public List<Payment> getOrderPayments(int orderID) {
        return paymentDAO.getOrderPayments(orderID);
    }

    @Override
    public List<PaymentType> getPaymentTypes() {
        return paymentDAO.getPaymentTypes();
    }
}
