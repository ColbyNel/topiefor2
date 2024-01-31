package za.co.bakerysystem.service.impl;

import java.time.LocalDate;
import java.util.List;
import za.co.bakerysystem.dao.CustomerDAO;
import za.co.bakerysystem.dao.impl.CustomerDAOImpl;
import za.co.bakerysystem.exception.DuplicateEmailException;
import za.co.bakerysystem.exception.DuplicateIdException;
import za.co.bakerysystem.model.Customer;
import za.co.bakerysystem.model.Order;
import za.co.bakerysystem.model.Product;
import za.co.bakerysystem.service.CustomerService;

public class CustomerServiceImpl implements CustomerService {

    private final CustomerDAO customerDAO;

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
    public Customer getCustomerByEmail(String email) {
        
        //if(user not found){
        // throw new UserNotFound("user not found");
//        }
        return customerDAO.getCustomerByEmail(email);
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

     @Override
    public boolean exists(String email,String id) throws DuplicateEmailException,DuplicateIdException {
        
        if(customerDAO.getCustomers().stream().anyMatch(customer->customer.getEmail().equalsIgnoreCase(email.toLowerCase()))){
            throw new DuplicateEmailException("Email provided already exists");
        }
        if(customerDAO.getCustomers().stream().anyMatch(customer->customer.getCustomerIDNo().equalsIgnoreCase(id))){
            throw new DuplicateIdException("ID/Passport Number provided already exists");
        }
        return false;
    }
    //--------------------------------------------------------------------------------------------------
    //--------------------------------------------------------------------------------------------------
    //--------------------------------------------------------------------------------------------------
    public static void main(String[] args) {
        CustomerDAO customerDAO = new CustomerDAOImpl();
        CustomerService customerService = new CustomerServiceImpl(customerDAO);

        // Testing createCustomer
        Customer newCustomer = new Customer("John", "84884", "09833", "add1", "add2", "city", "zip", "com", "john@example.com", "password");
        boolean customerCreated = customerService.createCustomer(newCustomer);
        System.out.println("Customer created: " + customerCreated);
        // Testing login
        //   String emailAddress = "john@example.com";
        //      String password = "password";
        //      Customer loggedInCustomer = customerService.login(emailAddress, password);
//        System.out.println("Logged in customer: " + loggedInCustomer);
//        // Testing updateCustomer
//        int customerIdToUpdate = loggedInCustomer.getID(); // Assuming customer with ID exists
//      Customer updatedCustomer = new Customer(" updated John","84884","09833","add1","add2","city","zip","com","john@example.com", "password");
//        boolean customerUpdated = customerService.updateCustomer(updatedCustomer, customerIdToUpdate);
//        System.out.println("Customer updated: " + customerUpdated);
        // Testing getCustomers
//        List<Customer> allCustomers = customerService.getCustomers();
//        System.out.println("All Customers: " + allCustomers);
//        // Testing getCustomersQuantity
//        int customersQuantity = customerService.getCustomersQuantity();
//        System.out.println("Customers Quantity: " + customersQuantity);
//        // Testing getCustomersByKeyWord
//        String keyword = "John";
//        List<Customer> customersByKeyword = customerService.getCustomersByKeyWord(keyword);
//        System.out.println("Customers with keyword '" + keyword + "': " + customersByKeyword);
        // Testing getCustomer
//        int customerIdToRetrieve = 2;
//        Customer retrievedCustomer = customerService.getCustomer(customerIdToRetrieve);
//        System.out.println("Customer retrieved by ID " + customerIdToRetrieve + ": " + retrievedCustomer);
        // Testing getFavoriteProducts
//        int customerIdForFavorites = 1;
//        List<Product> favoriteProducts = customerService.getFavoriteProducts(customerIdForFavorites);
//        System.out.println("Favorite products for customer " + customerIdForFavorites + ": " + favoriteProducts);
        // Testing getCustomerPoints
//        int customerPoints = customerService.getCustomerPoints(1);
//        System.out.println("Customer points for customer " + 1 + ": " + customerPoints);
        // Testing getCustomerOrders
//        List<Order> customerOrders = customerService.getCustomerOrders(4);
//        System.out.println("Orders for customer " + 4 + ": " + customerOrders);
        // Testing getNumOrders
//        int numOrders = customerService.getNumOrders(4);
//        System.out.println("Number of orders for customer " + 4 + ": " + numOrders);
//
        // Testing getOrdersByRange
//        int fulfilled = 1; // Assuming 1 represents fulfilled orders
//        LocalDate startDate = LocalDate.now().minusMonths(1);
//        LocalDate endDate = LocalDate.now().plusMonths(1);
//        List<Order> ordersByRange = customerService.getOrdersByRange(fulfilled, startDate, endDate);
//        System.out.println("Orders fulfilled between " + startDate + " and " + endDate + ": " + ordersByRange);
////
        // Testing deleteCustomer
//        int customerIdToDelete = 1; // Assuming customer with ID exists
//        boolean customerDeleted = customerService.deleteCustomer(customerIdToDelete);
//        System.out.println("Customer deleted: " + customerDeleted);
    }

   

}
