package za.co.bakerysystem.service;

import za.co.bakerysystem.model.Product;
import za.co.bakerysystem.model.ShoppingCart;

public interface ShoppingCartService {

    ShoppingCart getShoppingCartById(int cartID);

    void addProductToCart(int cartID, Product product, int quantity);

    void removeProductFromCart(int cartID, Product product);

    void updateCartTotal(int cartID);
}
