package za.co.bakerysystem.dao.impl;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import za.co.bakerysystem.dao.RecipeDAO;
import za.co.bakerysystem.dbmanager.DbManager;

public class RecipeDAOImpl implements RecipeDAO {

    private Connection connection;
    private static final DbManager db = DbManager.getInstance();
    private PreparedStatement ps;

    @Override
    public boolean createRecipe(int productID, String comment) {
        connection = db.getConnection();

        try {
            ps = connection.prepareStatement("INSERT INTO Recipe VALUES(?,?)");

            ps.setInt(1, productID);
            ps.setString(2, comment);

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
    public boolean deleteRecipeDetail(int recipeID) {
        connection = db.getConnection();

        try {
            ps = connection.prepareStatement("DELETE FROM Recipe_Ingredient WHERE Recipe_ID = ?");

            ps.setInt(1, recipeID);

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
    
    //-----------------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------------
    
    public static void main(String[] args) {
        RecipeDAO recipeDAO = new RecipeDAOImpl();

        // Test createRecipe
//        boolean createRecipeSuccess = recipeDAO.createRecipe(2, "Test Recipe"); // make sure productid exists
//        System.out.println("Create Recipe success: " + createRecipeSuccess);

        // Test createRecipeIngredient
//        boolean createRecipeIngredientSuccess = recipeDAO.createRecipeIngredient(2, 2, 100);
//        System.out.println("Create Recipe Ingredient success: " + createRecipeIngredientSuccess);

//        // Test deleteRecipeDetail
//        boolean deleteRecipeDetailSuccess = recipeDAO.deleteRecipeDetail(1);
//        System.out.println("Delete Recipe Detail success: " + deleteRecipeDetailSuccess);
    }

}
