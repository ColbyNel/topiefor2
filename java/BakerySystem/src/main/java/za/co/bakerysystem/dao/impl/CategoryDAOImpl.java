package za.co.bakerysystem.dao.impl;

import java.sql.CallableStatement;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import za.co.bakerysystem.dao.CategoryDAO;
import za.co.bakerysystem.dbmanager.DbManager;
import za.co.bakerysystem.exception.category.CategoryNotFoundException;
import za.co.bakerysystem.model.Category;

public class CategoryDAOImpl implements CategoryDAO {

    private Connection connection;
    private PreparedStatement ps;
    private ResultSet rs;
    private static DbManager db;

    public CategoryDAOImpl(Connection connection) {
        this.connection = connection;
    }

    public CategoryDAOImpl() {
        db = DbManager.getInstance();
        connection = db.getConnection();
    }

    // SQL queries
    private static final String SELECT_CATEGORY_BY_ID = "SELECT * FROM Category WHERE categoryId = ?";
    private static final String SELECT_ALL_CATEGORIES = "SELECT * FROM Category";
    private static final String INSERT_CATEGORY = "INSERT INTO Category (description) VALUES (?)";
    private static final String UPDATE_CATEGORY = "UPDATE Category SET description = ? WHERE categoryId = ?";
    private static final String DELETE_CATEGORY = "DELETE FROM Category WHERE categoryId = ?";

    @Override
    public Category getCategoryById(int categoryId) throws CategoryNotFoundException {
        db = DbManager.getInstance();

        try {
            connection = db.getConnection();
            ps = connection.prepareStatement(SELECT_CATEGORY_BY_ID);
            ps.setInt(1, categoryId);
            rs = ps.executeQuery();

            if (rs.next()) {
                return extractCategoryFromResultSet(rs);
            } else {
                throw new CategoryNotFoundException("Category not found with ID: " + categoryId);
            }
        } catch (SQLException e) {
            e.printStackTrace();
            throw new CategoryNotFoundException("Error fetching category information");
        } finally {
            closeResources(ps, rs);
        }
    }

    @Override
    public boolean addCategory(Category category) {
        boolean retVal = false;

        db = DbManager.getInstance();

        try {
            connection = db.getConnection();
            ps = connection.prepareStatement(INSERT_CATEGORY, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, category.getDescription());
            retVal = ps.executeUpdate() > 0;

        } catch (SQLException e) {
            System.out.println("Error: " + e.getMessage());
        } finally {
            closeResources(ps, null);
        }
        return retVal;

    }

    @Override
    public boolean updateCategory(Category category, int categoryID) {
        boolean retVal = false;

        db = DbManager.getInstance();

        try {
            connection = db.getConnection();
            ps = connection.prepareStatement(UPDATE_CATEGORY);
            ps.setString(1, category.getDescription());
            ps.setInt(2, category.getCategoryId());
            retVal = ps.executeUpdate() > 0;
        } catch (SQLException e) {
            System.out.println("Error: " + e.getMessage());
        } finally {
            closeResources(ps, null);
        }
        return retVal;

    }

    @Override
    public boolean deleteCategory(int categoryId) {
        boolean retVal = false;

        db = DbManager.getInstance();

        try {
            connection = db.getConnection();
            ps = connection.prepareStatement(DELETE_CATEGORY);
            ps.setInt(1, categoryId);
            retVal = ps.executeUpdate() > 0;

        } catch (SQLException e) {
            System.out.println("Error: " + e.getMessage());
        } finally {
            closeResources(ps, null);
        }
        return retVal;

    }

    @Override
    public List<Category> getAllCategory() {
        List<Category> categories = new ArrayList<>();
        db = DbManager.getInstance();
        try {
            connection = db.getConnection();
            ps = connection.prepareStatement(SELECT_ALL_CATEGORIES);
            rs = ps.executeQuery();
            while (rs.next()) {
                categories.add(extractCategoryFromResultSet(rs));
            }

        } catch (SQLException e) {
            System.out.println("Error: " + e.getMessage());

        }

        return categories;
    }

    @Override
    public List<Map<String, Object>> getCategoryPopularity() {
        List<Map<String, Object>> resultList = new ArrayList<>();

        try {
            connection = db.getConnection();
            CallableStatement stmt = connection.prepareCall("{CALL GetCategoryPopularity()}");
            rs = stmt.executeQuery();

            while (rs.next()) {
                Map<String, Object> row = new HashMap<>();
                row.put("Category", rs.getString("Category"));
                row.put("NumberOfOrders", rs.getInt("NumberOfOrders"));
                resultList.add(row);
            }
        } catch (SQLException e) {
            System.out.println("Error: " + e.getMessage());
        }

        return resultList;
    }

    private Category extractCategoryFromResultSet(ResultSet rs) throws SQLException {
        int categoryId = rs.getInt("categoryId");
        String description = rs.getString("description");
        return new Category(categoryId, description);
    }

    private void closeResources(PreparedStatement ps, ResultSet rs) {
        try {
            if (rs != null) {
                rs.close();
            }
            if (ps != null) {
                ps.close();
            }
        } catch (SQLException e) {
            System.out.println("Error: " + e.getMessage());
        }
    }

    public static void main(String[] args) {
        db = DbManager.getInstance();
        Connection connection = db.getConnection();

        CategoryDAO categoryDAO = new CategoryDAOImpl(connection);

        //Test getCategoryPopularity
        List<Map<String, Object>> popularity = categoryDAO.getCategoryPopularity();

//        for (Map<String, Object> map : popularity) {
//            System.out.println(map);
//
//        }

//        Category category = new Category("Pies");
//
//        if (categoryDAO.addCategory(category)) {
//            System.out.println("Successfully added category");
//        } else {
//            System.out.println("not added category");
//
//        }
//        List<Category> categories = categoryDAO.getAllCategory();
//        for (Category category1 : categories) {
//            System.out.println(category1); 
//        }
//        Category category1 = categoryDAO.getCategoryById(3);
//
//        System.out.println(category1);
//        if (categoryDAO.deleteCategory(2)) {
//            System.out.println("Success deleting category");
//        } else {
//            System.out.println("Unsuccessful deleting category");
//
//        }
//        if (categoryDAO.updateCategory(new Category(2, "Pies"), 2)) {
//            System.out.println("Success updated category");
//
//        } else {
//            System.out.println("failed updated category");
//
//        }
    }

}
