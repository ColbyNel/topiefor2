package za.co.bakerysystem.controller;

import java.util.logging.Level;
import java.util.logging.Logger;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import za.co.bakerysystem.dao.AdminDAO;
import za.co.bakerysystem.dao.impl.AdminDAOImpl;
<<<<<<< Updated upstream
import za.co.bakerysystem.exception.admin.AdminLoginException;
import za.co.bakerysystem.exception.admin.AdminNotFoundException;
=======
import za.co.bakerysystem.exception.admin.AdminNotFound;
import za.co.bakerysystem.exception.customer.DuplicateEmailException;
>>>>>>> Stashed changes
import za.co.bakerysystem.model.Admin;
import za.co.bakerysystem.service.AdminService;
import za.co.bakerysystem.service.impl.AdminServiceImpl;

@Path("admin")
public class AdminController {

    AdminDAO adminDAO = new AdminDAOImpl();
    AdminService adminService = new AdminServiceImpl();

    @GET
    @Path("/{adminID}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAdminById(@PathParam("adminID") int adminID) {
<<<<<<< Updated upstream
        try {
            Admin admin = adminService.getAdminById(adminID);
            return Response.ok(admin).build();
        } catch (AdminNotFoundException e) {
            return Response.status(Response.Status.NOT_FOUND).entity("Admin not found for ID: " + adminID).build();
=======
        Admin admin;
        try {
            admin = adminService.getAdminById(adminID);
            return Response.ok(admin).build();
        } catch (AdminNotFound ex) {
            return Response.status(Response.Status.NOT_FOUND).build();
>>>>>>> Stashed changes
        }

    }

    @POST
    @Path("/signup")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response createAdmin(Admin admin) {

        try {
            adminService.exists(admin.getEmailAddress());
            adminService.createAdmin(admin);
            return Response.status(Response.Status.CREATED).entity("Signup successful").build();

        } catch (DuplicateEmailException ex) {
            return Response.status(Response.Status.NOT_FOUND).entity(ex.getMessage()).build();
        }
    }

    @POST
    @Path("/login")
    @Consumes(MediaType.APPLICATION_JSON)
    @Produces(MediaType.APPLICATION_JSON)
    public Response login(Admin admin) {
        try {
            Admin authenticatedAdmin = adminService.login(admin.getEmailAddress(), admin.getPassword());
            return Response.ok(authenticatedAdmin).entity("Login successful").build();
        } catch (AdminLoginException e) {
            return Response.status(Response.Status.UNAUTHORIZED).entity("Login failed. Please check your email and password.").build();
        }
    }

}
