package za.co.bakerysystem.service.impl;

import java.util.List;
import za.co.bakerysystem.dao.CategoryDAO;
import za.co.bakerysystem.model.Category;
import za.co.bakerysystem.service.CategoryService;

public class CategoryServiceImpl implements CategoryService {

    private CategoryDAO categoryDAO;

    public CategoryServiceImpl(CategoryDAO categoryDAO) {
        this.categoryDAO = categoryDAO;
    }

    @Override
    public Category getCategoryById(int categoryID) {
        return categoryDAO.getCategoryById(categoryID);
    }

    @Override
    public boolean addCategory(Category category) {
        return categoryDAO.addCategory(category);
    }

    @Override
    public List<Category> getAllCategory() {
        return categoryDAO.getAllCategory();
    }

    @Override
    public boolean updateCategory(Category category, int categoryId) {
        return categoryDAO.updateCategory(category, categoryId);
    }

    @Override
    public boolean deleteCategory(int categoryID) {
        return categoryDAO.deleteCategory(categoryID);
    }
}
