package za.co.bakerysystem.dao;

import java.util.List;
import za.co.bakerysystem.exception.recipeingredients.RecipeIngredientsNotFoundException;
import za.co.bakerysystem.model.Product;
import za.co.bakerysystem.model.RecipeIngredient;

public interface RecipeIngredientDAO {

    boolean createRecipeIngredient(int recipeID, int ingredientID, int grams);

    List<RecipeIngredient> getRecipeIngredients(Product product) throws RecipeIngredientsNotFoundException;

    boolean deleteRecipeIngredient(int recipeID, int ingredientID);
}
