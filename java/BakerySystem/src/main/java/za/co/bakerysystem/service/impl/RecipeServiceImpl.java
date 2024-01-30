package za.co.bakerysystem.service.impl;

import za.co.bakerysystem.dao.RecipeDAO;
import za.co.bakerysystem.dao.impl.RecipeDAOImpl;
import za.co.bakerysystem.service.RecipeService;

public class RecipeServiceImpl implements RecipeService {

    private RecipeDAO recipeDAO;

    public RecipeServiceImpl(RecipeDAO recipeDAO) {
        this.recipeDAO = recipeDAO;
    }

    public RecipeServiceImpl() {
        this.recipeDAO = new RecipeDAOImpl();
    }

    @Override
    public boolean createRecipe(int productID, String comment) {
        return recipeDAO.createRecipe(productID, comment);
    }

    @Override
    public boolean deleteRecipeDetail(int recipeID) {
        return recipeDAO.deleteRecipeDetail(recipeID);
    }

    //-------------------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------------------
    //-------------------------------------------------------------------------------------------------
    public static void main(String[] args) {
        // Create an instance of RecipeServiceImpl
//        RecipeService recipeService = new RecipeServiceImpl();
//
//        // Test createRecipe method
//        int productID = 5;
//        String comment = "Delicious recipe!";
//
//        boolean createResult = recipeService.createRecipe(productID, comment);
//
//        if (createResult) {
//            System.out.println("Recipe created successfully!");
//        } else {
//            System.out.println("Failed to create Recipe.");
//        }

//        // Test deleteRecipeDetail method
//        int recipeIDToDelete = 1;
//
//        boolean deleteResult = recipeService.deleteRecipeDetail(recipeIDToDelete);
//
//        if (deleteResult) {
//            System.out.println("Recipe detail deleted successfully!");
//        } else {
//            System.out.println("Failed to delete Recipe detail.");
//        }
    }

}
