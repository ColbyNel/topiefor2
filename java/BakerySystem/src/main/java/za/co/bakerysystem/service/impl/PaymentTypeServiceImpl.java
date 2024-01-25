package za.co.bakerysystem.service.impl;

import java.util.List;
import za.co.bakerysystem.dao.PaymentTypeDAO;
import za.co.bakerysystem.model.PaymentType;
import za.co.bakerysystem.service.PaymentTypeService;

public class PaymentTypeServiceImpl implements PaymentTypeService {

    private PaymentTypeDAO paymentTypeDAO;

    public PaymentTypeServiceImpl(PaymentTypeDAO paymentTypeDAO) {
        this.paymentTypeDAO = paymentTypeDAO;
    }

    @Override
    public boolean save(PaymentType paymentType) {
        return paymentTypeDAO.save(paymentType);
    }

    @Override
    public PaymentType findById(int id) {
        return paymentTypeDAO.findById(id);
    }

    @Override
    public List<PaymentType> findAll() {
        return paymentTypeDAO.findAll();
    }

    @Override
    public boolean update(PaymentType paymentType) {
        return paymentTypeDAO.update(paymentType);
    }

    @Override
    public boolean delete(int id) {
        return paymentTypeDAO.delete(id);
    }
}
