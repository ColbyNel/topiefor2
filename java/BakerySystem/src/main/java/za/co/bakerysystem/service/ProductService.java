package za.co.bakerysystem.service;

import java.util.List;
import za.co.bakerysystem.exception.DuplicateProductException;
import za.co.bakerysystem.model.Product;

public interface ProductService {

    boolean createProduct(Product product);

    boolean updateProduct(Product product);

    List<Product> getAllProductByCategory(int categoryID);

    List<Product> getProducts();

    List<Product> getProductsByKeyWord(String keyWord);

    List<Product> getFavoriteProducts(int customerID);

    List<Product> getOrderProduct(int orderID);

    List<Product> getRelatedProducts(int ingredientID);

    List<Product> getProductsForShoppingCart(int cartID);

    Product getProduct(int productID);

    int getProductQuantity();

    boolean deleteProduct(int productID);

    boolean exists(String name) throws DuplicateProductException;
}
