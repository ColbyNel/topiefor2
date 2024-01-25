package za.co.bakerysystem.service.impl;

import za.co.bakerysystem.dao.RecipeDAO;
import za.co.bakerysystem.dao.impl.RecipeDAOImpl;
import za.co.bakerysystem.service.RecipeService;

public class RecipeServiceImpl implements RecipeService {

    private RecipeDAO recipeDAO;

    public RecipeServiceImpl() {
        this.recipeDAO = new RecipeDAOImpl();
    }

    @Override
    public boolean createRecipe(int productID, String comment) {
        return recipeDAO.createRecipe(productID, comment);
    }

   
    @Override
    public boolean deleteRecipeDetail(int recipeID) {
        return recipeDAO.deleteRecipeDetail(recipeID);
    }



}
