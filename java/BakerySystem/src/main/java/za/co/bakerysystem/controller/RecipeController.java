package za.co.bakerysystem.controller;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import za.co.bakerysystem.dao.RecipeDAO;
import za.co.bakerysystem.dao.impl.RecipeDAOImpl;
import za.co.bakerysystem.model.Recipe;

@Path("/recipes")
public class RecipeController {

    private final RecipeDAO recipeDAO = new RecipeDAOImpl(); // Replace with your actual implementation

    @POST
    @Path("/create")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response createRecipe(Recipe recipe) {
        int productID = recipe.getProductID();
        String comment = recipe.getComment();

        if (recipeDAO.createRecipe(productID, comment)) {
            return Response.status(Response.Status.CREATED).entity("Recipe created successfully").build();
        } else {
            return Response.status(Response.Status.BAD_REQUEST).entity("Failed to create recipe").build();
        }
    }

    

    @DELETE
    @Path("/{recipeID}/delete-detail")
    public Response deleteRecipeDetail(@PathParam("recipeID") int recipeID) {
        if (recipeDAO.deleteRecipeDetail(recipeID)) {
            return Response.ok("Recipe detail deleted successfully").build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).entity("Recipe detail not found").build();
        }
    }
}
