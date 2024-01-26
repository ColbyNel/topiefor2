package za.co.bakerysystem.dao.impl;

import java.sql.Connection;
import java.sql.PreparedStatement;
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
            System.out.println("Error: " + e.getMessage());
            
        }
        return false;
    }

    @Override
    public boolean deleteRecipeDetail(int recipeID) {
        connection = db.getConnection();

        try {
            ps = connection.prepareStatement("DELETE FROM Recipe WHERE product_id = ?");

            ps.setInt(1, recipeID);

            int affectedRows = ps.executeUpdate();
            return affectedRows > 0;
        } catch (SQLException e) {
            System.out.println("Error: " + e.getMessage());
            return false;
        }
    }

    //-----------------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------------
    //-----------------------------------------------------------------------------------------------
    public static void main(String[] args) {
        RecipeDAO recipeDAO = new RecipeDAOImpl();

        // Test createRecipe
        boolean createRecipeSuccess = recipeDAO.createRecipe(1, "Test Recipe"); // make sure productid exists
        System.out.println("Create Recipe success: " + createRecipeSuccess);
        // Test createRecipeIngredient
//        boolean createRecipeIngredientSuccess = recipeDAO.createRecipeIngredient(2, 2, 100);
//        System.out.println("Create Recipe Ingredient success: " + createRecipeIngredientSuccess);
//        // Test deleteRecipeDetail
        boolean deleteRecipeDetailSuccess = recipeDAO.deleteRecipeDetail(15);
        System.out.println("Delete Recipe Detail success: " + deleteRecipeDetailSuccess);
    }

}
