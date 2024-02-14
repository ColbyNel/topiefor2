package za.co.bakerysystem.dao.impl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import za.co.bakerysystem.dao.RecipeIngredientDAO;
import za.co.bakerysystem.dbmanager.DbManager;
import za.co.bakerysystem.exception.recipeingredients.RecipeIngredientsNotFoundException;
import za.co.bakerysystem.model.Product;
import za.co.bakerysystem.model.RecipeIngredient;

public class RecipeIngredientDAOImpl implements RecipeIngredientDAO {

    private Connection connection;
    private static DbManager db;
    private PreparedStatement ps;
    private ResultSet rs;
    public static Map<Integer, Map<Integer, Integer>> recipeIngredientMap = new HashMap<>();

    private static final String GET_RECIPE_INGREDIENTS = "SELECT * FROM recipe_ingredient WHERE recipe_id = ?";

    public RecipeIngredientDAOImpl(Connection connection) {
        this.connection = connection;
    }

    public RecipeIngredientDAOImpl() {
        db = DbManager.getInstance();
        this.connection = db.getConnection();
    }

    @Override
    public boolean createRecipeIngredient(int recipeID, int ingredientID, int quantity) {
        connection = db.getConnection();

        try {
            ps = connection.prepareStatement("INSERT INTO Recipe_Ingredient VALUES(?,?,?)");

            ps.setInt(1, recipeID);
            ps.setInt(2, ingredientID);
            ps.setInt(3, quantity);

            int affectedRows = ps.executeUpdate();
            return affectedRows > 0;
        } catch (SQLException e) {
            System.out.println("Error: " + e.getMessage());

        }
        return false;
    }

    @Override
    public Map<Integer, Integer> getRecipeIngredientsMap(Product product) {
        try {
            // If the recipe ingredients for the product are not in the map, fetch them from the database and add to the map
            if (!recipeIngredientMap.containsKey(product.getID())) {
                connection = db.getConnection();
                ps = connection.prepareStatement(GET_RECIPE_INGREDIENTS);
                ps.setInt(1, product.getID());
                rs = ps.executeQuery();

                Map<Integer, Integer> ingredientQuantityMap = new HashMap<>();

                while (rs.next()) {
                    int ingredientID = rs.getInt("Ingredient_ID");
                    int quantity = rs.getInt("Quantity");
                    ingredientQuantityMap.put(ingredientID, quantity);
                }

                // Store the ingredient quantity map in the map
                recipeIngredientMap.put(product.getID(), ingredientQuantityMap);
            }

            // Return the ingredient quantity map from the map
            return recipeIngredientMap.get(product.getID());

        } catch (SQLException e) {
            System.err.println("SQL Exception: " + e.getMessage());
            return null;
        }
    }

    @Override
    public List<RecipeIngredient> getRecipeIngredients(Product product) throws RecipeIngredientsNotFoundException {
        try {
            connection = db.getConnection();
            String query = "SELECT * FROM recipe_ingredient WHERE recipe_id = ?";
            ps = connection.prepareStatement(query);
            ps.setInt(1, product.getID());

            rs = ps.executeQuery();

            List<RecipeIngredient> recipeIngredients = new ArrayList<>();

            while (rs.next()) {
                int ingredientID = rs.getInt("ingredient_id");
                int quantity = rs.getInt("quantity");

                RecipeIngredient recipeIngredient = new RecipeIngredient(product.getID(), ingredientID, quantity);
                recipeIngredients.add(recipeIngredient);
            }

            if (recipeIngredients.isEmpty()) {
                throw new RecipeIngredientsNotFoundException("Recipe ingredients not found for product ID: " + product.getID());
            }

            return recipeIngredients;
        } catch (SQLException e) {
            System.err.println("SQL Exception: " + e.getMessage());
            throw new RecipeIngredientsNotFoundException("Error retrieving recipe ingredients");
        }
    }

    @Override
    public boolean deleteRecipeIngredient(int recipeID, int ingredientID) {
        boolean deletionSuccessful = false;
        connection = db.getConnection();

        try {
            ps = connection.prepareStatement("DELETE FROM Recipe_Ingredient WHERE Recipe_ID = ? AND Ingredient_ID = ?");
            ps.setInt(1, recipeID);
            ps.setInt(2, ingredientID);

            int affectedRows = ps.executeUpdate();
            deletionSuccessful = affectedRows > 0;
        } catch (SQLException e) {
            System.out.println("Error: " + e.getMessage());
        }
        return deletionSuccessful;
    }

    //-------------------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------------------
    public static void main(String[] args) {

        // Test createRecipeIngredient method
//        RecipeIngredientDAO recipeIngredientDAO = new RecipeIngredientDAOImpl();
//        recipeIngredientDAO.createRecipeIngredient(2, 2, 200);
//        // Test deleteRecipeIngredient method
//        boolean deletionResult = recipeIngredientDAO.deleteRecipeIngredient(2, 2);
//        System.out.println("Deletion Result: " + deletionResult);
    }

}
