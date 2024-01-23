package za.co.bakerysystem.controller;

import java.util.List;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import za.co.bakerysystem.dao.IngredientDAO;
import za.co.bakerysystem.dao.impl.IngredientDAOImpl;
import za.co.bakerysystem.model.Ingredient;

@Path("/ingredients")
public class IngredientController {

    private final IngredientDAO ingredientDAO = new IngredientDAOImpl();

    @POST
    @Path("/add_ingredient")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response addIngredient(Ingredient ingredient) {
        if (ingredientDAO.createIngredient(ingredient)) {
            return Response.status(Response.Status.CREATED).entity("Ingredient added successfully").build();
        } else {
            return Response.status(Response.Status.BAD_REQUEST).entity("Ingredient was not added successful!").build();

        }
    }

    @GET
    @Path("/get_ingredient/{ingredientID}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getItemById(@PathParam("ingredientID") int ingredientID) {
        if (ingredientDAO.getIngredient(ingredientID) != null) {
            return Response.ok(ingredientDAO.getIngredient(ingredientID)).build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).entity("Ingredient not found").build();
        }
    }
    
      @PUT
    @Path("/update/{ingredientId}")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updateIngredient(Ingredient updatedIngredient) {
        if (ingredientDAO.updateIngredient(updatedIngredient)) {
            return Response.ok("Ingredient updated successfully").build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).entity("Ingredient not found").build();
        }
    }
    
    @DELETE
    @Path("/delete_ingredient/{ingredientId}")
    public Response deleteIngredient(@PathParam("ingredientId") int ingredientId) {
        if (ingredientDAO.deleteIngredient(ingredientId)) {
            return Response.ok("Ingredient deleted successfully").build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).entity("Ingredient not found").build();
        }
    }
    
     @GET
    @Path("/all_ingredients")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllIngredients() {
        List<Ingredient> allIngredients = ingredientDAO.getIngredients();

        if (allIngredients != null && !allIngredients.isEmpty()) {
            return Response.ok(allIngredients).build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).entity("No ingredients found").build();
        }
    }
    

}
