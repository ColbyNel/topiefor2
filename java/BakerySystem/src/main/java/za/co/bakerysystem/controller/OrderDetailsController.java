package za.co.bakerysystem.controller;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;
import za.co.bakerysystem.dao.OrderDetailsDAO;
import za.co.bakerysystem.dao.impl.OrderDetailsDAOImpl;
import za.co.bakerysystem.model.OrderDetails;

@Path("/orderdetails")
public class OrderDetailsController {

    private final OrderDetailsDAO orderDetailsDAO = new OrderDetailsDAOImpl();

    @POST
    @Path("/save")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response saveOrderDetails(OrderDetails orderDetails) {
        if (orderDetailsDAO.save(orderDetails)) {
            return Response.status(Response.Status.CREATED).entity("Order details saved successfully").build();
        } else {
            return Response.status(Response.Status.BAD_REQUEST).entity("Order details not saved").build();
        }
    }

    @GET
    @Path("/find/{orderId}/{productId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response findOrderDetails(
            @PathParam("orderId") int orderId,
            @PathParam("productId") int productId) {
        OrderDetails orderDetails = orderDetailsDAO.findById(orderId, productId);

        if (orderDetails != null) {
            return Response.ok(orderDetails).build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).entity("Order details not found").build();
        }
    }

    @GET
    @Path("/all")
    @Produces(MediaType.APPLICATION_JSON)
    public Response findAllOrderDetails() {
        List<OrderDetails> allOrderDetails = orderDetailsDAO.findAll();

        if (allOrderDetails != null && !allOrderDetails.isEmpty()) {
            return Response.ok(allOrderDetails).build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).entity("No order details found").build();
        }
    }

    @PUT
    @Path("/update")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updateOrderDetails(OrderDetails orderDetails) {
        if (orderDetailsDAO.update(orderDetails)) {
            return Response.ok("Order details updated successfully").build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).entity("Order details not found").build();
        }
    }

    @DELETE
    @Path("/delete/{orderId}/{productId}")
    public Response deleteOrderDetails(
            @PathParam("orderId") int orderId,
            @PathParam("productId") int productId) {
        if (orderDetailsDAO.delete(orderId, productId)) {
            return Response.ok("Order details deleted successfully").build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).entity("Order details not found").build();
        }
    }
}
