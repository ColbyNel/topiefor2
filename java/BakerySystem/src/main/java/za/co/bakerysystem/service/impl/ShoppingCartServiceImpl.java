package za.co.bakerysystem.service.impl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.List;
import java.util.Map;
import java.util.logging.Level;
import java.util.logging.Logger;
import za.co.bakerysystem.dao.IngredientDAO;
import za.co.bakerysystem.dao.ProductDAO;
import za.co.bakerysystem.dao.RecipeIngredientDAO;
import za.co.bakerysystem.dao.ShoppingCartDAO;
import za.co.bakerysystem.dao.impl.IngredientDAOImpl;
import za.co.bakerysystem.exception.recipeingredients.RecipeIngredientsNotFoundException;
import za.co.bakerysystem.exception.shoppingcart.ShoppingCartNotFoundException;
import za.co.bakerysystem.model.Product;
import za.co.bakerysystem.model.RecipeIngredient;
import za.co.bakerysystem.model.ShoppingCart;
import za.co.bakerysystem.service.ShoppingCartService;

public class ShoppingCartServiceImpl implements ShoppingCartService {

    private ShoppingCartDAO shoppingCartDAO;
    private ProductDAO productDAO;
    private RecipeIngredientDAO recipeIngredientDAO;
    private IngredientDAO ingredientDAO;
    private Connection connection;
    private PreparedStatement ps;
    private ResultSet rs;

    public ShoppingCartServiceImpl(ShoppingCartDAO shoppingCartDAO, ProductDAO productDAO, RecipeIngredientDAO recipeIngredientDAO, IngredientDAO ingredientDAO) {
        this.shoppingCartDAO = shoppingCartDAO;
        this.ingredientDAO = ingredientDAO;
        this.recipeIngredientDAO = recipeIngredientDAO;
        this.productDAO = productDAO;
    }

    @Override
    public ShoppingCart getShoppingCartById(int cartID) throws ShoppingCartNotFoundException {
        return shoppingCartDAO.getShoppingCartById(cartID);
    }
//--------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------

    @Override
    public boolean addProductToCart(int cartID, Product product, int quantity) {
        try {
            if (product != null && canMakeProduct(product, quantity)) {
                boolean addedToCart = shoppingCartDAO.addProductToCart(cartID, product, quantity);
                if (addedToCart) {
                    subtractIngredientQuantityForProduct(product, quantity);
                }
                return addedToCart;
            }
        } catch (RecipeIngredientsNotFoundException ex) {
            Logger.getLogger(ShoppingCartServiceImpl.class.getName()).log(Level.SEVERE, null, ex);
        }
        return false;
    }

    private void subtractIngredientQuantityForProduct(Product product, int quantity) {
        try {
            List<RecipeIngredient> recipeIngredients = recipeIngredientDAO.getRecipeIngredients(product);

            for (RecipeIngredient recipeIngredient : recipeIngredients) {
                int requiredQuantity = recipeIngredient.getQuantity() * quantity;

                // Perform in-memory subtraction without updating the database
                Integer currentQuantity = IngredientDAOImpl.ingredientMap.get(recipeIngredient.getIngredientID());
                if (currentQuantity != null) {
                    IngredientDAOImpl.ingredientMap.put(recipeIngredient.getIngredientID(), currentQuantity - requiredQuantity);
                }
            }
        } catch (RecipeIngredientsNotFoundException ex) {
            Logger.getLogger(ShoppingCartServiceImpl.class.getName()).log(Level.SEVERE, null, ex);
        }
    }

    private boolean canMakeProduct(Product product, int quantity) throws RecipeIngredientsNotFoundException {
        
        Map<Integer, Integer> ingredientQuantityMap = recipeIngredientDAO.getRecipeIngredientsMap(product);

        for (Map.Entry<Integer, Integer> entry : ingredientQuantityMap.entrySet()) {
            int ingredientID = entry.getKey();
            int requiredQuantity = entry.getValue() * quantity;

            if (!ingredientDAO.hasEnoughIngredientStock(ingredientID, requiredQuantity)) {
                throw new IllegalStateException("Product is out of stock. Ingredient ID: " + ingredientID);
            }
        }

        return true;
    }

//--------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------
//--------------------------------------------------------------------------------------------------------
    @Override
    public boolean removeProductFromCart(int cartID, Product product) {
        if (product != null) {
            return shoppingCartDAO.removeProductFromCart(cartID, product);
        }
        return false;
    }

    @Override
    public double calculateTotalAmount(int cartID) {
        return shoppingCartDAO.calculateTotalAmount(cartID);
    }

    //---------------------------------------------------------------------------------------------------
    //---------------------------------------------------------------------------------------------------
    //---------------------------------------------------------------------------------------------------
    public static void main(String[] args) {
        // Instantiate necessary DAO and Service objects
      //  ProductDAO productDAO = new ProductDAOImpl();
     //   ShoppingCartDAO shoppingCartDAO = new ShoppingCartDAOImpl();
    //    ShoppingCartService shoppingCartService = new ShoppingCartServiceImpl(shoppingCartDAO, productDAO);

//        // Test getShoppingCartById
//        int sampleCartID = 1;  // Replace with an actual cart ID for testing
//        ShoppingCart cart = shoppingCartService.getShoppingCartById(sampleCartID);
//        System.out.println("Shopping Cart for ID " + sampleCartID + ": " + cart);
//        // Test addProductToCart
//        // Create a new product and add it to the cart
//        Product newProduct = new Product("Blue", 4.99, 6.7, 2, "GOOD BREAD", "HIGH IN carbo", "fibre", "none", 2);
//        productDAO.createProduct(newProduct);
        // Get the newly added product from the database
       // Product addedProduct = productDAO.getProductsByKeyWord("Black Cake").get(0);

        // Add the product to the cart
      //  boolean addProductResult = shoppingCartService.addProductToCart(2, addedProduct, 1);
      //  System.out.println("Add Product to Cart Result: " + addProductResult);

//        // Test removeProductFromCart
//        // Remove the product from the cart
//        boolean removeProductResult = shoppingCartService.removeProductFromCart(sampleCartID, addedProduct);
//        System.out.println("Remove Product from Cart Result: " + removeProductResult);
//
//        // Test updateCartTotal
//        // Update the total for the cart
//        boolean updateTotalResult = shoppingCartService.updateCartTotal(sampleCartID);
//        System.out.println("Update Cart Total Result: " + updateTotalResult);
    }

}
