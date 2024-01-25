package za.co.bakerysystem.service.impl;

import java.time.LocalDateTime;
import java.util.List;
import za.co.bakerysystem.dao.OrderDAO;
import za.co.bakerysystem.dao.impl.OrderDAOImpl;
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
    public boolean fulfillOrder(int orderID, int fulfilled) {
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
    
    //-------------------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------------------
    
    
     public static void main(String[] args) {
        OrderDAO orderDAO = new OrderDAOImpl();
        OrderServiceImpl orderService = new OrderServiceImpl(orderDAO);

        // Create a sample Order
        Order order = new Order();
        order.setCustomerID(2);
        order.setDatePlaced(LocalDateTime.now());
        order.setFulfilled(0);
        order.setComment("Test Order");

        // Create a sample OrderDetail
        OrderDetails orderDetails = new OrderDetails();
        orderDetails.setOrderID(6);
        orderDetails.setProductID(6);
        orderDetails.setPriceAtSale(10.99);
        orderDetails.setFoodCostAtSale(5.99);
        orderDetails.setQuantity(2);
        orderDetails.setComment("Ordered");

        // Test creating an order
        //System.out.println("Creating Order: " + orderService.createOrder(order));

//        // Test fulfilling an order
      //  System.out.println("Fulfilling Order: " + orderService.fulfillOrder(6, 1));

        // Test creating an order detail
      //  System.out.println("Creating Order Detail: " + orderService.createOrderDetail(orderDetails));

//        // Test getting orders
//        List<Order> orders = orderService.getOrders();
//        System.out.println("Orders: " + orders);

        // Test getting order payment
//        List<Payment> orderPayment = orderService.getOrderPayment(2);
//        System.out.println("Order Payment: " + orderPayment);

        // Test getting order product
//        List<Product> orderProduct = orderService.getOrderProduct(6);
//        System.out.println("Order Product: " + orderProduct);

//        // Test deleting an order
//        orderService.deleteOrder(o6);
//
//        // Test deleting an order detail
//        orderService.deleteOrderDetail(orderDetails.getOrderID());
    }
}
