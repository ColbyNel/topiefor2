package za.co.bakerysystem.service.impl;

import za.co.bakerysystem.dao.ProductDAO;
import za.co.bakerysystem.model.Product;
import za.co.bakerysystem.service.ProductService;

import java.util.List;
import za.co.bakerysystem.dao.impl.ProductDAOImpl;

public class ProductServiceImpl implements ProductService {

    private ProductDAO productDAO;

    public ProductServiceImpl(ProductDAO productDAO) {
        this.productDAO = productDAO;
    }

    public ProductServiceImpl() {
        this.productDAO = new ProductDAOImpl();
    }

    @Override
    public boolean createProduct(Product product) {
        return productDAO.createProduct(product);
    }

    @Override
    public List<Product> getOrderProduct(int orderID) {
        return productDAO.getOrderProduct(orderID);
    }

    @Override
    public List<Product> getProductsForShoppingCart(int cartID) {
        return productDAO.getProductsForShoppingCart(cartID);
    }

    @Override
    public List<Product> getFavoriteProducts(int customerID) {
        return productDAO.getFavoriteProducts(customerID);
    }

    @Override
    public boolean updateProduct(Product product) {
        return productDAO.updateProduct(product);
    }

    @Override
    public List<Product> getProducts() {
        return productDAO.getProducts();
    }

    @Override
    public List<Product> getProductsByKeyWord(String keyWord) {
        return productDAO.getProductsByKeyWord(keyWord);
    }

    @Override
    public List<Product> getAllProductByCategory(int categoryID) {
        return productDAO.getAllProductByCategory(categoryID);
    }

    @Override
    public List<Product> getRelatedProducts(int ingredientID) {
        return productDAO.getRelatedProducts(ingredientID);
    }

    @Override
    public Product getProduct(int productID) {
        return productDAO.getProduct(productID);
    }

    @Override
    public int getProductQuantity() {
        return productDAO.getProductQuantity();
    }

    @Override
    public boolean deleteProduct(int productID) {
        return productDAO.deleteProduct(productID);
    }

    //--------------------------------------------------------------------------------------------
    //--------------------------------------------------------------------------------------------
    //--------------------------------------------------------------------------------------------
    public static void main(String[] args) {
        ProductDAO productDAO = new ProductDAOImpl();
        ProductServiceImpl productService = new ProductServiceImpl(productDAO);

        // Test createProduct
//        Product newProduct = new Product("Bread", 7.99, 2.0, 5, "Delicious bread", "High in fiber", "Nutrient info", "No warnings", 1);
//        boolean productCreated = productService.createProduct(newProduct);
//        System.out.println("Creating Product: " + productCreated);
        // Test updateProduct
//        int productIdToUpdate = 8; // Replace with a valid product ID
//        Product productToUpdate = productService.getProduct(productIdToUpdate);
//        if (productToUpdate != null) {
//            productToUpdate.setName("Updated Bread");
//            boolean productUpdated = productService.updateProduct(productToUpdate);
//            System.out.println("Updating Product: " + productUpdated);
//        } else {
//            System.out.println("Product not found for updating.");
//        }
//        // Test getProducts
//        List<Product> allProducts = productService.getProducts();
//        System.out.println("All Products: " + allProducts);
        // Test getProduct
//        int productIdToGet = 6; // Replace with a valid product ID
//        Product retrievedProduct = productService.getProduct(productIdToGet);
//        System.out.println("Retrieved Product: " + retrievedProduct);
//        // Test deleteProduct
//        boolean productDeleted = productService.deleteProduct(productIdToGet);
//        System.out.println("Deleting Product: " + productDeleted);
        System.out.println(productService.getProductQuantity());
    }

}
