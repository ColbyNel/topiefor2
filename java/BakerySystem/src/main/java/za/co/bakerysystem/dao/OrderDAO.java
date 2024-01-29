package za.co.bakerysystem.dao;

import java.util.List;
import za.co.bakerysystem.model.Order;
import za.co.bakerysystem.model.OrderDetails;
import za.co.bakerysystem.model.Payment;
import za.co.bakerysystem.model.Product;

public interface OrderDAO {

    boolean createOrder(Order order);

    boolean updateOrder(Order order);

    boolean fulfillOrder(int orderID, int fullFilled);

    boolean createOrderDetail(OrderDetails orderDetails);

    List<Order> getOrders();

    List<Order> getLastedOrders();

    int getOrdersCurrent();

    int getTotalOrdersQuantity();

    List<Order> getOrdersByRange(String startDate, String endDate, String keyWord);

    Order getOrder(int orderID);

    List<Payment> getOrderPayment(int orderID);

    List<Product> getOrderProduct(int orderID);

    List<Order> getOrdersPlaced(String startDate, String endDate, String sortOrder);

    List<Order> getOrdersOutstanding(String startDate, String endDate, int category);

    List<Order> getOrdersDelivered(String startDate, String endDate, String sortOrder);

    boolean deleteOrder(int orderID);

    void deleteOrderDetail(int orderID);

}
