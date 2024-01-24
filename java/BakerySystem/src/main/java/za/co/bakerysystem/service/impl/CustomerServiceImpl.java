package za.co.bakerysystem.service.impl;

import java.time.LocalDate;
import java.util.List;
import za.co.bakerysystem.dao.CustomerDAO;
import za.co.bakerysystem.model.Customer;
import za.co.bakerysystem.model.Order;
import za.co.bakerysystem.model.Product;
import za.co.bakerysystem.service.CustomerService;

public class CustomerServiceImpl implements CustomerService {

    private CustomerDAO customerDAO;

    public CustomerServiceImpl(CustomerDAO customerDAO) {
        this.customerDAO = customerDAO;
    }

    @Override
    public boolean createCustomer(Customer customer) {
        return customerDAO.createCustomer(customer);
    }

    @Override
    public Customer login(String emailAddress, String password) {
        return customerDAO.login(emailAddress, password);
    }

    @Override
    public boolean updateCustomer(Customer customer, int customerID) {
        return customerDAO.updateCustomer(customer, customerID);
    }

    @Override
    public List<Customer> getCustomers() {
        return customerDAO.getCustomers();
    }

    @Override
    public int getCustomersQuantity() {
        return customerDAO.getCustomersQuantity();
    }

    @Override
    public List<Customer> getCustomersByKeyWord(String keyWord) {
        return customerDAO.getCustomersByKeyWord(keyWord);
    }

    @Override
    public Customer getCustomer(int customerID) {
        return customerDAO.getCustomer(customerID);
    }

    @Override
    public List<Product> getFavoriteProducts(int customerID) {
        return customerDAO.getFavoriteProducts(customerID);
    }

    @Override
    public int getCustomerPoints(int customerID) {
        return customerDAO.getCustomerPoints(customerID);
    }

    @Override
    public List<Order> getCustomerOrders(int customerID) {
        return customerDAO.getCustomerOrders(customerID);
    }

    @Override
    public int getNumOrders(int customerID) {
        return customerDAO.getNumOrders(customerID);
    }

    @Override
    public List<Order> getOrdersByRange(int fulfilled, LocalDate startDate, LocalDate endDate) {
        return customerDAO.getOrdersByRange(fulfilled, startDate, endDate);
    }

    @Override
    public boolean deleteCustomer(int customerID) {
        return customerDAO.deleteCustomer(customerID);
    }
}
