
package za.co.bakerysystem.dao;

import java.util.List;
import za.co.bakerysystem.exception.paymentType.PaymentTypeNotFoundException;
import za.co.bakerysystem.model.PaymentType;

public interface PaymentTypeDAO {

    boolean create(PaymentType paymentType);

    PaymentType getById(int id) throws PaymentTypeNotFoundException;

    List<PaymentType> getAll();

    boolean update(PaymentType paymentType);

    boolean delete(int id);
}
