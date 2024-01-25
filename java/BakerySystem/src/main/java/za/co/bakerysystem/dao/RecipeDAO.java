package za.co.bakerysystem.dao;

public interface RecipeDAO {

    boolean createRecipe(int productID, String comment);

    boolean deleteRecipeDetail(int recipeID);
}
