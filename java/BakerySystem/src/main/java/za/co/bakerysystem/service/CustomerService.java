package za.co.bakerysystem.service;

import java.time.LocalDate;
import java.util.List;
import za.co.bakerysystem.exception.DuplicateEmailException;
import za.co.bakerysystem.exception.DuplicateIdException;
import za.co.bakerysystem.model.Customer;
import za.co.bakerysystem.model.Order;
import za.co.bakerysystem.model.Product;

public interface CustomerService {

    boolean createCustomer(Customer customer);

    Customer login(String emailAddress, String password);

    boolean updateCustomer(Customer customer, int customerID);

    List<Customer> getCustomers();

    int getCustomersQuantity();

    List<Customer> getCustomersByKeyWord(String keyWord);

    Customer getCustomer(int customerID);

    List<Product> getFavoriteProducts(int customerID);

    int getCustomerPoints(int customerID);

    List<Order> getCustomerOrders(int customerID);

    Customer getCustomerByEmail(String email);

    int getNumOrders(int customerID);

    List<Order> getOrdersByRange(int fulfilled, LocalDate startDate, LocalDate endDate);

    boolean deleteCustomer(int customerIDs);

    boolean exists(String email, String ID) throws DuplicateEmailException, DuplicateIdException;
}
