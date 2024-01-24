
package za.co.bakerysystem.dao;

import java.util.List;
import za.co.bakerysystem.model.PaymentType;

public interface PaymentTypeDAO {

    boolean save(PaymentType paymentType);

    PaymentType findById(int id);

    List<PaymentType> findAll();

    boolean update(PaymentType paymentType);

    boolean delete(int id);
}
