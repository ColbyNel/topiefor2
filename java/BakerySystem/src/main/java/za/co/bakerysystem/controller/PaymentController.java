package za.co.bakerysystem.controller;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;
import za.co.bakerysystem.dao.PaymentDAO;
import za.co.bakerysystem.dao.impl.PaymentDAOImpl;
import za.co.bakerysystem.model.Payment;
import za.co.bakerysystem.model.PaymentType;

@Path("/payments")
public class PaymentController {

    private final PaymentDAO paymentDAO = new PaymentDAOImpl(); // Replace with your actual implementation

    @POST
    @Path("/create")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response createPayment(Payment payment) {
        // Perform additional validation if needed
        if (payment.getAmount() <= 0) {
            return Response.status(Response.Status.BAD_REQUEST).entity("Payment amount must be greater than 0").build();
        }

        if (paymentDAO.createPayment(payment)) {
            return Response.status(Response.Status.CREATED).entity("Payment created successfully").build();
        } else {
            return Response.status(Response.Status.BAD_REQUEST).entity("Failed to create payment").build();
        }
    }

    @DELETE
    @Path("/delete/{orderID}")
    public Response deletePayment(@PathParam("orderID") int orderID) {
        if (orderID <= 0) {
            return Response.status(Response.Status.BAD_REQUEST).entity("Order ID must be greater than 0").build();
        }

        if (paymentDAO.deletePayment(orderID)) {
            return Response.ok("Payment deleted successfully").build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).entity("Payment not found").build();
        }
    }

    @GET
    @Path("/order-payments/{orderID}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getOrderPayments(@PathParam("orderID") int orderID) {
        if (orderID <= 0) {
            return Response.status(Response.Status.BAD_REQUEST).entity("Order ID must be greater than 0").build();
        }

        List<Payment> orderPayments = paymentDAO.getOrderPayments(orderID);

        if (orderPayments != null && !orderPayments.isEmpty()) {
            return Response.ok(orderPayments).build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).entity("No payments found for the specified order").build();
        }
    }

    @GET
    @Path("/payment-types")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getPaymentTypes() {
        List<PaymentType> paymentTypes = paymentDAO.getPaymentTypes();

        if (paymentTypes != null && !paymentTypes.isEmpty()) {
            return Response.ok(paymentTypes).build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).entity("No payment types found").build();
        }
    }
}
