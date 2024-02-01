package za.co.bakerysystem.service;

import java.time.LocalDate;
import java.util.List;
import za.co.bakerysystem.exception.OrderNotFoundException;
import za.co.bakerysystem.model.Order;
import za.co.bakerysystem.model.OrderDetails;

public interface OrderService {

    boolean createOrder(Order order);

    boolean updateOrder(Order order);

    boolean fulfillOrder(int orderID, int fullFilled);

    int getOrderQuantity(int productID);

    int getOrderQuantityByKeyWord(String keyWord);

    boolean createOrderDetail(OrderDetails orderDetails);

    int getNumOrders(int customerID);

    List<Order> getOrders(int productID);

    List<Order> getOrdersByRange(int fulfilled, LocalDate startDate, LocalDate endDate);

    List<Order> getOrders();

    List<Order> getCustomerOrders(int customerID);

    List<Order> getLastedOrders();

    List<Order> getOrdersPlaced(String startDate, String endDate, String sortOrder);

    List<Order> getOrdersOutstanding(String startDate, String endDate, int category);

    List<Order> getOrdersDelivered(String startDate, String endDate, String sortOrder);

    int getOrdersCurrent();

    int getTotalOrdersQuantity();

    List<Order> getOrdersByRange(String startDate, String endDate, String keyWord);

    Order getOrder(int orderID) throws OrderNotFoundException;

    boolean deleteOrder(int orderID);

    void deleteOrderDetail(int orderID);
}
