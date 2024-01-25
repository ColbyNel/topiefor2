package za.co.bakerysystem.dao.impl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import za.co.bakerysystem.dao.RecipeIngredientDAO;
import za.co.bakerysystem.dbmanager.DbManager;

public class RecipeIngredientDAOImpl implements RecipeIngredientDAO {

    private Connection connection;
    private static final DbManager db = DbManager.getInstance();
    private PreparedStatement ps;
    private ResultSet rs;

    @Override
    public boolean createRecipeIngredient(int recipeID, int ingredientID, int grams) {
        connection = db.getConnection();

        try {
            ps = connection.prepareStatement("INSERT INTO Recipe_Ingredient VALUES(?,?,?)");

            ps.setInt(1, recipeID);
            ps.setInt(2, ingredientID);
            ps.setInt(3, grams);

            int affectedRows = ps.executeUpdate();
            return affectedRows > 0;
        } catch (SQLException e) {
            e.printStackTrace();
            return false;
        } finally {
            // Close resources in the finally block
            try {
                if (ps != null) {
                    ps.close();
                }
                if (connection != null) {
                    connection.close();
                }
            } catch (SQLException e) {
                e.printStackTrace();
            }
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
            e.printStackTrace();
        } finally {
            // Close resources in the finally block
            try {
                if (ps != null) {
                    ps.close();
                }
                if (connection != null) {
                    connection.close();
                }
            } catch (SQLException e) {
                e.printStackTrace();
            }
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