package za.co.bakerysystem.controller;

import javax.validation.Valid;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import za.co.bakerysystem.dao.ShoppingCartDAO;
import za.co.bakerysystem.dao.impl.ShoppingCartDAOImpl;
import za.co.bakerysystem.model.Product;
import za.co.bakerysystem.model.ShoppingCart;

@Path("/shopping_carts")
public class ShoppingCartController {

    private final ShoppingCartDAO shoppingCartDAO = new ShoppingCartDAOImpl(); // Replace with your actual implementation

    @GET
    @Path("/{cartID}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getShoppingCartById(@PathParam("cartID") int cartID) {
        if (cartID <= 0) {
            return Response.status(Response.Status.BAD_REQUEST).entity("Cart ID must be greater than 0").build();
        }

        ShoppingCart shoppingCart = shoppingCartDAO.getShoppingCartById(cartID);

        if (shoppingCart != null) {
            return Response.ok(shoppingCart).build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).entity("Shopping cart not found").build();
        }
    }

    @POST
    @Path("/add_product/{cartID}")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response addProductToCart(
            Product product,
            @PathParam("cartID") int cartID,
            @QueryParam("quantity") int quantity) {
        if (cartID <= 0 || quantity <= 0) {
            return Response.status(Response.Status.BAD_REQUEST).entity("Cart ID and quantity must be greater than 0").build();
        }

        boolean success = shoppingCartDAO.addProductToCart(cartID, product, quantity);

        if (success) {
            return Response.status(Response.Status.CREATED).entity("Product added to cart successfully").build();
        } else {
            return Response.status(Response.Status.BAD_REQUEST).entity("Failed to add product to cart").build();
        }
    }

    @DELETE
    @Path("/remove_product/{cartID}")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response removeProductFromCart(Product product,
            @PathParam("cartID") int cartID
    ) {
        if (cartID <= 0) {
            return Response.status(Response.Status.BAD_REQUEST).entity("Cart ID must be greater than 0").build();
        }

        boolean success = shoppingCartDAO.removeProductFromCart(cartID, product);

        if (success) {
            return Response.ok("Product removed from cart successfully").build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).entity("Product not found in the cart").build();
        }
    }

    @PUT
    @Path("/update_total/{cartID}")
    public Response updateCartTotal(@PathParam("cartID") int cartID) {
        if (cartID <= 0) {
            return Response.status(Response.Status.BAD_REQUEST).entity("Cart ID must be greater than 0").build();
        }

        boolean success = shoppingCartDAO.updateCartTotal(cartID);

        if (success) {
            return Response.ok("Cart total updated successfully").build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).entity("Shopping cart not found").build();
        }
    }
}