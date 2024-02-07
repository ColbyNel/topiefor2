package za.co.bakerysystem.service;

import java.util.List;
<<<<<<< Updated upstream
import za.co.bakerysystem.exception.category.CategoryNotFoundException;
=======
import java.util.Map;
>>>>>>> Stashed changes
import za.co.bakerysystem.exception.category.DuplicateCategoryExcpetion;
import za.co.bakerysystem.model.Category;

public interface CategoryService {

    Category getCategoryById(int categoryID) throws CategoryNotFoundException;

    boolean addCategory(Category category);

    List<Category> getAllCategory();

    boolean updateCategory(Category category, int categoryId);

    boolean deleteCategory(int categoryID);

    boolean exists(String description) throws DuplicateCategoryExcpetion;

    List<Map<String, Object>> getCategoryPopularity();
}
