package za.co.bakerysystem.dao;

import za.co.bakerysystem.model.Customer;

import java.util.List;
import za.co.bakerysystem.exception.customer.CustomerDeletionException;
import za.co.bakerysystem.exception.customer.CustomerLoginException;
import za.co.bakerysystem.exception.customer.CustomerNotFoundException;

public interface CustomerDAO {

    boolean createCustomer(Customer customer);

    Customer login(String emailAddress, String password) throws CustomerLoginException;

    boolean updateCustomer(Customer customer, int customerID);

    List<Customer> getCustomers();

    List<Customer> getTopCustomers(int productID);

    int getCustomersQuantity();

    List<Customer> getCustomersByKeyWord(String keyWord);

    Customer getCustomer(int customerID) throws CustomerNotFoundException;

    Customer getCustomerByEmail(String email) throws CustomerNotFoundException;

    int getCustomerPoints(int customerID);

    boolean deleteCustomer(int customerID) throws CustomerNotFoundException, CustomerDeletionException;
}
