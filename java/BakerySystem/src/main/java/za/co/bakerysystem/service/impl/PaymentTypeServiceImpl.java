package za.co.bakerysystem.service.impl;

import java.util.List;
import za.co.bakerysystem.dao.PaymentTypeDAO;
import za.co.bakerysystem.dao.impl.PaymentTypeDAOImpl;
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
    
    //-----------------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------------
    
    public static void main(String[] args) {
        // Replace these mock objects with your actual DAO implementations
        PaymentTypeDAO paymentTypeDAO = new PaymentTypeDAOImpl();
        PaymentTypeServiceImpl paymentTypeService = new PaymentTypeServiceImpl(paymentTypeDAO);

//        // Test save
//        PaymentType newPaymentType = new PaymentType("Online Transfer");
//        boolean paymentTypeSaved = paymentTypeService.save(newPaymentType);
//        System.out.println("Saving Payment Type: " + paymentTypeSaved);

        // Test findById
//        int paymentTypeId = 5; // Replace with a valid payment type ID
//        PaymentType foundPaymentType = paymentTypeService.findById(paymentTypeId);
//        System.out.println("Found Payment Type: " + foundPaymentType);

//        // Test findAll
//        List<PaymentType> allPaymentTypes = paymentTypeService.findAll();
//        System.out.println("All Payment Types: " + allPaymentTypes);
//

//        // Test delete
//        boolean paymentTypeDeleted = paymentTypeService.delete(paymentTypeId);
//        System.out.println("Deleting Payment Type: " + paymentTypeDeleted);
    }
}