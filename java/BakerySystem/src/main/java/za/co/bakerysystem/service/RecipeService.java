package za.co.bakerysystem.service;

public interface RecipeService {

    boolean createRecipe(int productID, String comment);


    boolean deleteRecipeDetail(int recipeID);
}
