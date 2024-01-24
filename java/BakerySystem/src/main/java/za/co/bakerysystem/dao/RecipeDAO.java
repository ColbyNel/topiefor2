package za.co.bakerysystem.dao;

public interface RecipeDAO {

    boolean createRecipe(int productID, String comment);

    boolean createRecipeIngredient(int recipeID, int ingredientID, int grams);

    boolean deleteRecipeDetail(int recipeID);
}
