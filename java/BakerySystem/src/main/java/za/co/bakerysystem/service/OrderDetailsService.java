package za.co.bakerysystem.service;

import java.util.List;
import za.co.bakerysystem.model.OrderDetails;

public interface OrderDetailsService {

    boolean save(OrderDetails orderDetails);

    OrderDetails findById(int orderId, int productId);

    List<OrderDetails> findAll();

    boolean update(OrderDetails orderDetails);

    boolean delete(int orderId, int productId);
}
