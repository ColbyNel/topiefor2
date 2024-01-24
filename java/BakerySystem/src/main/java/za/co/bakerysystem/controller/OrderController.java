package za.co.bakerysystem.controller;

import java.util.List;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import za.co.bakerysystem.dao.OrderDAO;
import za.co.bakerysystem.dao.impl.OrderDAOImpl;
import za.co.bakerysystem.model.Order;

@Path("/orders")
public class OrderController {

    private final OrderDAO orderDAO = new OrderDAOImpl();

    @POST
    @Path("/add_order")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response addOrder(Order order) {
        if (orderDAO.createOrder(order)) {
            return Response.status(Response.Status.CREATED).entity("Order added successfully").build();
        } else {
            return Response.status(Response.Status.BAD_REQUEST).entity("Order was not added successfully").build();

        }
    }

    @GET
    @Path("/all_orders")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllOrders() {
        List<Order> allOrders = orderDAO.getOrders();

        if (allOrders != null && !allOrders.isEmpty()) {
            return Response.ok(allOrders).build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).entity("No orders found").build();
        }
    }

    @PUT
    @Path("/update_order")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updateOrders(Order updatedOrders) {
        if (orderDAO.updateOrder(updatedOrders)) {
            return Response.ok("Orders updated successfully").build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).entity("Orders not found").build();
        }
    }

}
