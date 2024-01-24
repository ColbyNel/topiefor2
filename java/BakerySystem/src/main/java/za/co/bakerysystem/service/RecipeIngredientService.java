package za.co.bakerysystem.service;

public interface RecipeIngredientService {

    boolean createRecipeIngredient(int recipeID, int ingredientID, int grams);

    boolean deleteRecipeIngredient(int recipeID, int ingredientID);
}
