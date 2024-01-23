package za.co.bakerysystem.controller;

import java.util.List;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import za.co.bakerysystem.dao.CustomerDAO;
import za.co.bakerysystem.dao.impl.CustomerDAOImpl;
import za.co.bakerysystem.model.Customer;

@Path("/customers")
public class CustomerController {

    private final CustomerDAO customerDAO = new CustomerDAOImpl();

    @POST
    @Path("/signup")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response createCustomer(Customer customer) {

        if (customerDAO.createCustomer(customer)) {
            return Response.status(Response.Status.CREATED).entity("Signup successful!").build();
        } else {
            return Response.status(Response.Status.BAD_REQUEST).entity("Signup was not successful!").build();
        }
    }

    @POST
    @Path("/login")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response login(Customer customer) {
        Customer loggedInCustomer = customerDAO.login(customer.getEmail(), customer.getPassword());
        if (loggedInCustomer != null) {
            return Response.ok("Login successful!").build();
        } else {
            return Response.status(Response.Status.UNAUTHORIZED).entity("Login failed. Invalid credentials.").build();
        }
    }

    @GET
    @Path("/get/{customerId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getCustomersById(@PathParam("customerId") int customerId) {
        //List<Customer> allCustomers = customerDAO.getAllCustomers();

        if (customerDAO.getCustomer(customerId) != null) {
            return Response.ok(customerDAO.getCustomer(customerId)).build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).entity("Customer not found").build();
        }
    }

    @PUT
    @Path("/update/{customerId}")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updateCustomer(Customer updatedCustomer, @PathParam("customerId") int customerId) {
        if (customerDAO.updateCustomer(updatedCustomer, customerId)) {
            return Response.ok("Customer updated successfully").build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).entity("Customer not found").build();
        }
    }

    @DELETE
    @Path("/delete/{customerId}")
    public Response deleteCustomer(@PathParam("customerId") int customerId) {
        if (customerDAO.deleteCustomer(customerId)) {
            return Response.ok("Customer deleted successfully").build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).entity("Customer not found").build();
        }
    }

    @GET
    @Path("/all")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllCustomers() {
        List<Customer> allCustomers = customerDAO.getCustomers();

        if (allCustomers != null && !allCustomers.isEmpty()) {
            return Response.ok(allCustomers).build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).entity("No customers found").build();
        }
    }

    @GET
    @Path("/customer_orders/{customerID}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getCustomerOrder(@PathParam("customerId") int customerId) {
        List<Customer> allCustomerOrder = customerDAO.getCustomers();

        if (allCustomerOrder != null && !allCustomerOrder.isEmpty()) {
            return Response.ok(allCustomerOrder).build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).entity("No orders for this customers").build();
        }
    }

    @GET
    @Path("/keyword/{keyword}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getCustomersByKeyword(@PathParam("keyword") String keyword) {
        List<Customer> allCustomers = customerDAO.getCustomersByKeyWord(keyword);

        if (allCustomers != null && !allCustomers.isEmpty()) {
            return Response.ok(allCustomers).build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).entity("No customers found").build();
        }
    }

    @GET
    @Path("/total_customer")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getCustomerQuantity() {
        int count = customerDAO.getCustomersQuantity();

        if (count > 0) {
            return Response.ok(count).build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).entity("No customers found").build();
        }
    }

    @GET
    @Path("/order_number/{customerID}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getNumOrders(@PathParam("customerId") int customerId) {
        int count = customerDAO.getNumOrders(customerId);

        if (count > 0) {
            return Response.ok(count).build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).entity("No orders for this customers").build();
        }
    }

}
