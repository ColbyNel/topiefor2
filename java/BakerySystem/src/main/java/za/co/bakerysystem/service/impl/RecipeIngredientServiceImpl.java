package za.co.bakerysystem.service.impl;

import za.co.bakerysystem.dao.RecipeIngredientDAO;
import za.co.bakerysystem.service.RecipeIngredientService;

public class RecipeIngredientServiceImpl implements RecipeIngredientService {

    private RecipeIngredientDAO recipeIngredientDAO;

    public RecipeIngredientServiceImpl(RecipeIngredientDAO recipeIngredientDAO) {
        this.recipeIngredientDAO = recipeIngredientDAO;
    }

    @Override
    public boolean createRecipeIngredient(int recipeID, int ingredientID, int grams) {
        return recipeIngredientDAO.createRecipeIngredient(recipeID, ingredientID, grams);
    }

    @Override
    public boolean deleteRecipeIngredient(int recipeID, int ingredientID) {
        return recipeIngredientDAO.deleteRecipeIngredient(recipeID, ingredientID);
    }
}
