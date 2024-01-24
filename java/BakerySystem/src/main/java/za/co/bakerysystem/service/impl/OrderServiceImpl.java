package za.co.bakerysystem.service.impl;

import java.util.List;
import za.co.bakerysystem.dao.OrderDAO;
import za.co.bakerysystem.model.Order;
import za.co.bakerysystem.model.OrderDetails;
import za.co.bakerysystem.model.Payment;
import za.co.bakerysystem.model.Product;
import za.co.bakerysystem.service.OrderService;

public class OrderServiceImpl implements OrderService {

    private OrderDAO orderDAO;

    public OrderServiceImpl(OrderDAO orderDAO) {
        this.orderDAO = orderDAO;
    }

    @Override
    public boolean createOrder(Order order) {
        return orderDAO.createOrder(order);
    }

    @Override
    public boolean updateOrder(Order order) {
        return orderDAO.updateOrder(order);
    }

    @Override
    public boolean fulfillOrder(int orderID, boolean fulfilled) {
        return orderDAO.fulfillOrder(orderID, fulfilled);
    }

    @Override
    public boolean createOrderDetail(OrderDetails orderDetails) {
        return orderDAO.createOrderDetail(orderDetails);
    }

    @Override
    public List<Order> getOrders() {
        return orderDAO.getOrders();
    }

    @Override
    public List<Order> getLastedOrders() {
        return orderDAO.getLastedOrders();
    }

    @Override
    public int getOrdersCurrent() {
        return orderDAO.getOrdersCurrent();
    }

    @Override
    public int getTotalOrdersQuantity() {
        return orderDAO.getTotalOrdersQuantity();
    }

    @Override
    public List<Order> getOrdersByRange(String startDate, String endDate, String keyWord) {
        return orderDAO.getOrdersByRange(startDate, endDate, keyWord);
    }

    @Override
    public Order getOrder(int orderID) {
        return orderDAO.getOrder(orderID);
    }

    @Override
    public List<Payment> getOrderPayment(int orderID) {
        return orderDAO.getOrderPayment(orderID);
    }

    @Override
    public List<Product> getOrderProduct(int orderID) {
        return orderDAO.getOrderProduct(orderID);
    }

    @Override
    public void deleteOrder(int orderID) {
        orderDAO.deleteOrder(orderID);
    }

    @Override
    public void deleteOrderDetail(int orderID) {
        orderDAO.deleteOrderDetail(orderID);
    }
}
