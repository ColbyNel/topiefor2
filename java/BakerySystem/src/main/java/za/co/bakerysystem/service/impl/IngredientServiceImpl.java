package za.co.bakerysystem.service.impl;

import java.util.List;
import za.co.bakerysystem.dao.IngredientDAO;
import za.co.bakerysystem.model.Ingredient;
import za.co.bakerysystem.model.Product;
import za.co.bakerysystem.service.IngredientService;

public class IngredientServiceImpl implements IngredientService {

    private IngredientDAO ingredientDAO;

    public IngredientServiceImpl(IngredientDAO ingredientDAO) {
        this.ingredientDAO = ingredientDAO;
    }

    @Override
    public boolean createIngredient(Ingredient ingredient) {
        return ingredientDAO.createIngredient(ingredient);
    }

    @Override
    public boolean updateIngredient(Ingredient ingredient) {
        return ingredientDAO.updateIngredient(ingredient);
    }

    @Override
    public List<Ingredient> getIngredients() {
        return ingredientDAO.getIngredients();
    }

    @Override
    public List<Ingredient> getIngredientsByKeyWord(String keyWord) {
        return ingredientDAO.getIngredientsByKeyWord(keyWord);
    }

    @Override
    public Ingredient getIngredient(int ingredientID) {
        return ingredientDAO.getIngredient(ingredientID);
    }

    @Override
    public int getIngredientQuantity() {
        return ingredientDAO.getIngredientQuantity();
    }

    @Override
    public List<Product> getRelatedProducts(int ingredientID) {
        return ingredientDAO.getRelatedProducts(ingredientID);
    }

    @Override
    public boolean deleteIngredient(int ingredientID) {
        return ingredientDAO.deleteIngredient(ingredientID);
    }
}
