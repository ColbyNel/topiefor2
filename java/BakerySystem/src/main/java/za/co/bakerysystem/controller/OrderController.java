package za.co.bakerysystem.controller;

import java.util.List;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import za.co.bakerysystem.dao.OrderDAO;
import za.co.bakerysystem.dao.impl.OrderDAOImpl;
import za.co.bakerysystem.model.Order;
import za.co.bakerysystem.model.OrderDetails;
import za.co.bakerysystem.model.Payment;
import za.co.bakerysystem.model.Product;
import za.co.bakerysystem.service.OrderService;
import za.co.bakerysystem.service.impl.OrderServiceImpl;

@Path("/orders")
public class OrderController {

    private final OrderDAO orderDAO = new OrderDAOImpl();
    private final OrderService orderService = new OrderServiceImpl(orderDAO);

    @POST
    @Path("/add_order")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response addOrder(Order order) {
        if (orderService.createOrder(order)) {
            return Response.status(Response.Status.CREATED).entity("Order added successfully").build();
        } else {
            return Response.status(Response.Status.BAD_REQUEST).entity("Order was not added successfully").build();

        }
    }

    @POST
    @Path("/add_order_details")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response addOrderDetails(OrderDetails orderDetails) {
        if (orderService.createOrderDetail(orderDetails)) {
            return Response.status(Response.Status.CREATED).entity("Order details added successfully").build();
        } else {
            return Response.status(Response.Status.BAD_REQUEST).entity("Order details was not added successfully").build();

        }
    }

    @GET
    @Path("/all_orders")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllOrders() {
        List<Order> allOrders = orderService.getOrders();

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
        if (orderService.updateOrder(updatedOrders)) {
            return Response.ok("Orders updated successfully").build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).entity("Orders not found").build();
        }
    }

    @DELETE
    @Path("/delete/{orderId}")
    public Response deleteOrder(@PathParam("orderId") int orderId) {
        if (orderService.deleteOrder(orderId)) {
            return Response.ok("Order deleted successfully").build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).entity("Order not found").build();
        }
    }

    @GET
    @Path("/get_order/{orderID}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getOrderOrder(@PathParam("orderId") int orderId) {
        List<Order> allOrderOrder = orderService.getOrders();

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
        int count = orderService.getTotalOrdersQuantity();

        if (count > 0) {
            return Response.ok(count).build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).entity("No orders found").build();
        }
    }

    @GET
    @Path("/lasted_orders")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getLastedOrders() {
        List<Order> lastedOrders = orderService.getLastedOrders();

        if (lastedOrders != null && !lastedOrders.isEmpty()) {
            return Response.ok(lastedOrders).build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).entity("No lasted orders found").build();
        }
    }

    @GET
    @Path("/current_orders")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getOrdersCurrent() {
        int currentOrders = orderService.getOrdersCurrent();

        return Response.ok(currentOrders).build();
    }

    @GET
    @Path("/orders_by_range")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getOrdersByRange(
            @QueryParam("startDate") String startDate,
            @QueryParam("endDate") String endDate,
            @QueryParam("keyWord") String keyWord) {
        List<Order> ordersByRange = orderService.getOrdersByRange(startDate, endDate, keyWord);

        if (ordersByRange != null && !ordersByRange.isEmpty()) {
            return Response.ok(ordersByRange).build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).entity("No orders found for the specified range").build();
        }
    }

    @GET
    @Path("/order/{orderId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getOrder(@PathParam("orderId") int orderId) {
        Order order = orderService.getOrder(orderId);

        if (order != null) {
            return Response.ok(order).build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).entity("Order not found").build();
        }
    }

    @GET
    @Path("/order_payment/{orderId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getOrderPayment(@PathParam("orderId") int orderId) {
        List<Payment> orderPayments = orderService.getOrderPayment(orderId);

        if (orderPayments != null && !orderPayments.isEmpty()) {
            return Response.ok(orderPayments).build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).entity("No payment information found for the order").build();
        }
    }

    @GET
    @Path("/order_product/{orderId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getOrderProduct(@PathParam("orderId") int orderId) {
        List<Product> orderProducts = orderService.getOrderProduct(orderId);

        if (orderProducts != null && !orderProducts.isEmpty()) {
            return Response.ok(orderProducts).build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).entity("No product information found for the order").build();
        }
    }

    @DELETE
    @Path("/delete_order_detail/{orderId}")
    public Response deleteOrderDetail(@PathParam("orderId") int orderId) {
        orderService.deleteOrderDetail(orderId);
        return Response.ok("Order detail deleted successfully").build();
    }

    @GET
    @Path("/orders_placed")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getOrdersPlaced(
            @QueryParam("startDate") String startDate,
            @QueryParam("endDate") String endDate,
            @QueryParam("sortOrder") String sortOrder) {
        List<Order> ordersByRange = orderService.getOrdersPlaced(startDate, endDate, sortOrder);

        if (ordersByRange != null && !ordersByRange.isEmpty()) {
            return Response.ok(ordersByRange).build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).entity("No orders placed currently").build();
        }
    }

    @GET
    @Path("/orders_outstanding")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getOrdersOutstanding(
            @QueryParam("startDate") String startDate,
            @QueryParam("endDate") String endDate,
            @QueryParam("category") int category) {
        List<Order> ordersByRange = orderService.getOrdersOutstanding(startDate, endDate, category);

        if (ordersByRange != null && !ordersByRange.isEmpty()) {
            return Response.ok(ordersByRange).build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).entity("No outstanding orders").build();
        }
    }

}
