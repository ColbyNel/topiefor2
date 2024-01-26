package za.co.bakerysystem.service;

import java.util.List;
import za.co.bakerysystem.model.Product;
import za.co.bakerysystem.model.ShoppingCart;

public interface ShoppingCartService {

    ShoppingCart getShoppingCartById(int cartID);

    boolean addProductToCart(int cartID, Product product, int quantity);

    boolean removeProductFromCart(int cartID, Product product);

    boolean updateCartTotal(int cartID);

    List<Product> getProductsForShoppingCart(int cartID);

    int calculateTotalQuantity(int cartID);

    double calculateTotalAmount(int cartID);
}
