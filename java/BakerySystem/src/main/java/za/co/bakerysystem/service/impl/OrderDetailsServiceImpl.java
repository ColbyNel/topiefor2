package za.co.bakerysystem.service.impl;

import za.co.bakerysystem.dao.OrderDetailsDAO;
import za.co.bakerysystem.model.OrderDetails;
import za.co.bakerysystem.service.OrderDetailsService;

import java.util.List;

public class OrderDetailsServiceImpl implements OrderDetailsService {

    private OrderDetailsDAO orderDetailsDAO;

    public OrderDetailsServiceImpl(OrderDetailsDAO orderDetailsDAO) {
        this.orderDetailsDAO = orderDetailsDAO;
    }

    @Override
    public boolean saveOrderDetails(OrderDetails orderDetails) {
        return orderDetailsDAO.save(orderDetails);
    }

    @Override
    public OrderDetails findOrderDetailsById(int orderId, int productId) {
        return orderDetailsDAO.findById(orderId, productId);
    }

    @Override
    public List<OrderDetails> findAllOrderDetails() {
        return orderDetailsDAO.findAll();
    }

    @Override
    public boolean updateOrderDetails(OrderDetails orderDetails) {
        return orderDetailsDAO.update(orderDetails);
    }

    @Override
    public boolean deleteOrderDetails(int orderId, int productId) {
        return orderDetailsDAO.delete(orderId, productId);
    }
}
