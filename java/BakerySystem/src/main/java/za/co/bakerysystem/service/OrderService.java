/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 * Click nbfs://nbhost/SystemFileSystem/Templates/Classes/Interface.java to edit this template
 */
package za.co.bakerysystem.service;

import java.util.List;
import za.co.bakerysystem.model.Order;
import za.co.bakerysystem.model.OrderDetails;
import za.co.bakerysystem.model.Payment;
import za.co.bakerysystem.model.Product;

public interface OrderService {

    boolean createOrder(Order order);

    boolean updateOrder(Order order);

    boolean fulfillOrder(int orderID, boolean fullFilled);

    boolean createOrderDetail(OrderDetails orderDetails);

    List<Order> getOrders();

    List<Order> getLastedOrders();

    int getOrdersCurrent();

    int getTotalOrdersQuantity();

    List<Order> getOrdersByRange(String startDate, String endDate, String keyWord);

    Order getOrder(int orderID);

    List<Payment> getOrderPayment(int orderID);

    List<Product> getOrderProduct(int orderID);

    void deleteOrder(int orderID);

    void deleteOrderDetail(int orderID);
}
