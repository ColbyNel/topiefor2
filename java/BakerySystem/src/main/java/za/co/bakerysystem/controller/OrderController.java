package za.co.bakerysystem.controller;

import java.util.List;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import za.co.bakerysystem.dao.OrderDAO;
import za.co.bakerysystem.dao.impl.OrderDAOImpl;
import za.co.bakerysystem.model.Order;
import za.co.bakerysystem.model.OrderDetails;

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
    
    @POST
    @Path("/add_order_details")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response addOrderDetails(OrderDetails orderDetails) {
        if (orderDAO.createOrderDetail(orderDetails)) {
            return Response.status(Response.Status.CREATED).entity("Order details added successfully").build();
        } else {
            return Response.status(Response.Status.BAD_REQUEST).entity("Order details was not added successfully").build();

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

    @DELETE
    @Path("/delete/{orderId}")
    public Response deleteOrder(@PathParam("orderId") int orderId) {
        if (orderDAO.deleteOrder(orderId)) {
            return Response.ok("Order deleted successfully").build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).entity("Order not found").build();
        }
    }

    @GET
    @Path("/get_order/{orderID}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getOrderOrder(@PathParam("orderId") int orderId) {
        List<Order> allOrderOrder = orderDAO.getOrders();

        if (allOrderOrder != null && !allOrderOrder.isEmpty()) {
            return Response.ok(allOrderOrder).build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).entity("No orders found").build();
        }
    }

    @GET
    @Path("/total_order")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getOrderQuantity() {
        int count = orderDAO.getTotalOrdersQuantity();

        if (count > 0) {
            return Response.ok(count).build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).entity("No orders found").build();
        }
    }

}
