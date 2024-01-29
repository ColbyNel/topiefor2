package za.co.bakerysystem.service.impl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import za.co.bakerysystem.dao.OrderDetailsDAO;
import za.co.bakerysystem.dao.ProductDAO;
import za.co.bakerysystem.dao.ShoppingCartDAO;
import za.co.bakerysystem.dao.impl.ProductDAOImpl;
import za.co.bakerysystem.dao.impl.ShoppingCartDAOImpl;
import static za.co.bakerysystem.dao.impl.ShoppingCartDAOImpl.db;
import za.co.bakerysystem.model.OrderDetails;
import za.co.bakerysystem.model.Product;
import za.co.bakerysystem.model.RecipeIngredient;
import za.co.bakerysystem.model.ShoppingCart;
import za.co.bakerysystem.service.ShoppingCartService;

public class ShoppingCartServiceImpl implements ShoppingCartService {

    private ShoppingCartDAO shoppingCartDAO;
    private ProductDAO productDAO;

    private static final String CHECK_INGREDIENT_STOCK = "SELECT grams FROM ingredient WHERE id = ?";
    private static final String GET_RECIPE_INGREDIENTS = "SELECT * FROM recipe_ingredient WHERE recipe_id = ?";

    public ShoppingCartServiceImpl(ShoppingCartDAO shoppingCartDAO, ProductDAO productDAO) {
        this.shoppingCartDAO = shoppingCartDAO;
        this.productDAO = productDAO;
    }

    @Override
    public ShoppingCart getShoppingCartById(int cartID) {
        return shoppingCartDAO.getShoppingCartById(cartID);
    }
//---------------------------------------------------------------------------------------------------
   @Override
    public boolean addProductToCart(int cartID, Product product, int quantity) {
        if (product != null && canMakeProduct(product, quantity)) {
            // If canMakeProduct returns true, proceed to add the product to the cart
            return shoppingCartDAO.addProductToCart(cartID, product, quantity);
        }
        return false;
    }


  
    // Helper method to check if the product can be made with the available ingredients
    private boolean canMakeProduct(Product product, int quantity) {
        List<RecipeIngredient> recipeIngredients = getRecipeIngredients(product);

        for (RecipeIngredient recipeIngredient : recipeIngredients) {
            int requiredGrams = recipeIngredient.getGrams() * quantity;
            if (!hasEnoughIngredientStock(recipeIngredient.getIngredientID(), requiredGrams)) {
                // Display an error message or handle out-of-stock scenario
                System.out.println("Product is out of stock. Ingredient ID: " + recipeIngredient.getIngredientID());
                return false;
            }
        }

       
        return true;
    }

    // Helper method to retrieve the list of ingredients in the product's recipe
    private List<RecipeIngredient> getRecipeIngredients(Product product) {
        Connection connection = null;
        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;

        try {
            connection = db.getConnection();
            preparedStatement = connection.prepareStatement(GET_RECIPE_INGREDIENTS);
            preparedStatement.setInt(1, product.getID());
            // Execute the query to get recipe ingredients
            resultSet = preparedStatement.executeQuery();

            List<RecipeIngredient> recipeIngredients = new ArrayList<>();

            while (resultSet.next()) {
                int ingredientID = resultSet.getInt("ingredient_id");
                int grams = resultSet.getInt("grams");
                RecipeIngredient recipeIngredient = new RecipeIngredient(product.getID(), ingredientID, grams);
                recipeIngredients.add(recipeIngredient);
            }

            return recipeIngredients;
        } catch (SQLException e) {
            System.err.println("SQL Exception: " + e.getMessage());
            return null;
        }

    }

    // Helper method to check if there is enough stock for a specific ingredient
    private boolean hasEnoughIngredientStock(int ingredientID, int requiredGrams) {
        Connection connection = null;
        PreparedStatement preparedStatement = null;
        ResultSet resultSet = null;

        try {
            connection = db.getConnection();
            preparedStatement = connection.prepareStatement(CHECK_INGREDIENT_STOCK);
            preparedStatement.setInt(1, ingredientID);
            // Execute the query to check ingredient stock
            resultSet = preparedStatement.executeQuery();

            // Placeholder logic to check if there is enough stock, replace with actual logic
            if (resultSet.next()) {
                int availableQuantity = resultSet.getInt("grams");
                return requiredGrams <= availableQuantity;
            } else {
                return false;
            }
        } catch (SQLException e) {
            System.err.println("SQL Exception: " + e.getMessage());
            return false;
        }
    }

//---------------------------------------------------------------------------------------------------

    @Override
    public boolean removeProductFromCart(int cartID, Product product) {
        if (product != null) {
            return shoppingCartDAO.removeProductFromCart(cartID, product);
        }
        return false;
    }

    @Override
    public List<Product> getProductsForShoppingCart(int cartID) {
        return shoppingCartDAO.getProductsForShoppingCart(cartID);
    }

    @Override
    public int calculateTotalQuantity(int cartID) {
        return shoppingCartDAO.calculateTotalQuantity(cartID);
    }

    @Override
    public double calculateTotalAmount(int cartID) {
        return shoppingCartDAO.calculateTotalAmount(cartID);
    }

    @Override
    public boolean updateCartTotal(int cartID) {
        return shoppingCartDAO.updateCartTotal(cartID);
    }

    //---------------------------------------------------------------------------------------------------
    //---------------------------------------------------------------------------------------------------
    //---------------------------------------------------------------------------------------------------
    public static void main(String[] args) {
        // Instantiate necessary DAO and Service objects
        ProductDAO productDAO = new ProductDAOImpl();
        ShoppingCartDAO shoppingCartDAO = new ShoppingCartDAOImpl();
        ShoppingCartService shoppingCartService = new ShoppingCartServiceImpl(shoppingCartDAO, productDAO);

//        // Test getShoppingCartById
//        int sampleCartID = 1;  // Replace with an actual cart ID for testing
//        ShoppingCart cart = shoppingCartService.getShoppingCartById(sampleCartID);
//        System.out.println("Shopping Cart for ID " + sampleCartID + ": " + cart);
//        // Test addProductToCart
//        // Create a new product and add it to the cart
//        Product newProduct = new Product("Blue", 4.99, 6.7, 2, "GOOD BREAD", "HIGH IN carbo", "fibre", "none", 2);
//        productDAO.createProduct(newProduct);
        // Get the newly added product from the database
        Product addedProduct = productDAO.getProductsByKeyWord("Black Cake").get(0);
        int totalQuantity = shoppingCartService.calculateTotalQuantity(2);

        // Add the product to the cart
        boolean addProductResult = shoppingCartService.addProductToCart(2, addedProduct, totalQuantity);
        System.out.println("Add Product to Cart Result: " + addProductResult);

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
