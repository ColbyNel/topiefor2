package za.co.bakerysystem.controller;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;
import za.co.bakerysystem.dao.PaymentTypeDAO;
import za.co.bakerysystem.dao.impl.PaymentTypeDAOImpl;
import za.co.bakerysystem.exception.paymentType.DuplicatePaymentTypeException;
import za.co.bakerysystem.exception.paymentType.PaymentTypeNotFoundException;
import za.co.bakerysystem.model.PaymentType;
import za.co.bakerysystem.service.PaymentTypeService;
import za.co.bakerysystem.service.impl.PaymentTypeServiceImpl;

@Path("/payment_types")
public class PaymentTypeController {

    private final PaymentTypeDAO paymentTypeDAO = new PaymentTypeDAOImpl();
    private final PaymentTypeService paymentTypeService = new PaymentTypeServiceImpl(paymentTypeDAO);

    @POST
    @Path("/create")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response createPaymentType(PaymentType paymentType) {

        try {
            paymentTypeService.exists(paymentType.getType().toLowerCase());

            if (paymentTypeService.create(paymentType)) {
                return Response.status(Response.Status.CREATED).entity("Payment type saved successfully").build();
            }

        } catch (DuplicatePaymentTypeException ex) {
            return Response.status(Response.Status.FORBIDDEN).entity("Payment already exists").build();
        }

        return Response.status(Response.Status.INTERNAL_SERVER_ERROR).build();
    }

    @GET
    @Path("get/{id}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getPaymentTypeById(@PathParam("id") int id) {
        try {
            if (id <= 0) {
                return Response.status(Response.Status.BAD_REQUEST).entity("Payment type ID must be greater than 0").build();
            }

            PaymentType paymentType = paymentTypeService.getById(id);

            if (paymentType != null) {
                return Response.ok(paymentType).build();
            } else {
                return Response.status(Response.Status.NOT_FOUND).entity("Payment type not found").build();
            }
        } catch (PaymentTypeNotFoundException e) {
            return Response.status(Response.Status.NOT_FOUND).entity("Payment type not found: " + e.getMessage()).build();
        }
    }

    @GET
    @Path("/all")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllPaymentTypes() {
        List<PaymentType> paymentTypes = paymentTypeService.getAll();

        if (paymentTypes != null && !paymentTypes.isEmpty()) {
            return Response.ok(paymentTypes).build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).entity("No payment types found").build();
        }
    }

    @PUT
    @Path("/update")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updatePaymentType(PaymentType paymentType) {
        if (paymentTypeService.update(paymentType)) {
            return Response.ok("Payment type updated successfully").build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).entity("Payment type not found").build();
        }
    }

    @DELETE
    @Path("/delete/{id}")
    public Response deletePaymentType(@PathParam("id") int id) {
        if (id <= 0) {
            return Response.status(Response.Status.BAD_REQUEST).entity("Payment type ID must be greater than 0").build();
        }

        if (paymentTypeService.delete(id)) {
            return Response.ok("Payment type deleted successfully").build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).entity("Payment type not found").build();
        }
    }
}
