package za.co.bakerysystem.dao;

public interface RecipeIngredientDAO {

    boolean createRecipeIngredient(int recipeID, int ingredientID, int grams);

    boolean deleteRecipeIngredient(int recipeID, int ingredientID);
}
