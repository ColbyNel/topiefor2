package za.co.bakerysystem.service;

public interface RecipeService {

    boolean createRecipe(int productID, String comment);

    boolean createRecipeIngredient(int recipeID, int ingredientID, int grams);

    boolean deleteRecipeDetail(int recipeID);
}
