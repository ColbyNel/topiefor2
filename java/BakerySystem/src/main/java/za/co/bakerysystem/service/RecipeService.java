package za.co.bakerysystem.service;

import java.util.List;

public interface RecipeService {

    boolean createRecipe(int productID, String comment);

    List<String> getRecipe(int productID);

    boolean deleteRecipeDetail(int recipeID);
}
