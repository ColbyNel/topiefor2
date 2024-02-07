package za.co.bakerysystem.dao;

import java.util.List;
import za.co.bakerysystem.exception.ingredient.IngredientNotFoundException;
import za.co.bakerysystem.model.Ingredient;

public interface IngredientDAO {

    boolean createIngredient(Ingredient ingredient);

    boolean updateIngredient(Ingredient ingredient);

    List<Ingredient> getIngredients();

    List<Ingredient> getIngredientsByKeyWord(String keyWord);

    Ingredient getIngredient(int ingredientID) throws IngredientNotFoundException ;

    int getIngredientQuantity();

    List<Ingredient> getIngredientsInStock();
    
    List<Ingredient> getIngredientsToBeOrdered();

    boolean deleteIngredient(int ingredientID);
}
