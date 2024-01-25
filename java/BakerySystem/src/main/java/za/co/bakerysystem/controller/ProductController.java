package za.co.bakerysystem.controller;

import java.util.List;
import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import za.co.bakerysystem.dao.ProductDAO;
import za.co.bakerysystem.dao.impl.ProductDAOImpl;
import za.co.bakerysystem.model.Product;

@Path("/products")

public class ProductController {

    private final ProductDAO productDAO = new ProductDAOImpl();

    @POST
    @Path("/add_product")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response addProduct(Product product) {
        if (productDAO.createProduct(product)) {
            return Response.status(Response.Status.CREATED).entity("Product added successfully").build();
        } else {
            return Response.status(Response.Status.BAD_REQUEST).entity("Product was not added successfully").build();

        }
    }

    @GET
    @Path("/get_product/{productId}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getProductById(@PathParam("productId") int productId) {
        if (productDAO.getProduct(productId) != null) {
            return Response.ok(productDAO.getProduct(productId)).build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).entity("Product not found").build();
        }
    }

    @DELETE
    @Path("/delete_product/{productId}")
    public Response deleteProducts(@PathParam("productId") int productId) {
        if (productDAO.deleteProduct(productId)) {
            return Response.ok("Product deleted successfully").build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).entity("Product not found").build();
        }
    }

    @GET
    @Path("/all_products")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllProducts() {
        List<Product> allProducts = productDAO.getProducts();

        if (allProducts != null && !allProducts.isEmpty()) {
            return Response.ok(allProducts).build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).entity("No product found").build();
        }
    }

    @PUT
    @Path("/update_product/{productId}")
    @Consumes(MediaType.APPLICATION_JSON)
    public Response updateProduct(Product updatedProduct) {
        if (productDAO.updateProduct(updatedProduct)) {
            return Response.ok("Product updated successfully").build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).entity("Product not found").build();
        }
    }

    @GET
    @Path("/keyword/{keyword}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getProductsByKeyword(@PathParam("keyword") String keyword) {
        List<Product> allProducts = productDAO.getProductsByKeyWord(keyword);

        if (allProducts != null && !allProducts.isEmpty()) {
            return Response.ok(allProducts).build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).entity("No products found").build();
        }
    }

    @GET
    @Path("/get_product_catergory/{categoryID}")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getAllProductByCategory(@PathParam("categoryID") int categoryID) {
        List<Product> allProducts = productDAO.getAllProductByCategory(categoryID);

        if (allProducts != null && !allProducts.isEmpty()) {
            return Response.ok(allProducts).build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).entity("No products found").build();
        }
    }

    @GET
    @Path("/total_products")
    @Produces(MediaType.APPLICATION_JSON)
    public Response getCustomerQuantity() {
        int count = productDAO.getProductQuantity();

        if (count > 0) {
            return Response.ok(count).build();
        } else {
            return Response.status(Response.Status.NOT_FOUND).entity("No products found").build();
        }
    }

}
