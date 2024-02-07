package za.co.bakerysystem.service;

import za.co.bakerysystem.exception.shoppingcart.ShoppingCartNotFoundException;
import za.co.bakerysystem.model.Product;
import za.co.bakerysystem.model.ShoppingCart;

public interface ShoppingCartService {

    ShoppingCart getShoppingCartById(int cartID) throws ShoppingCartNotFoundException;

    boolean addProductToCart(int cartID, Product product, int quantity);

    boolean removeProductFromCart(int cartID, Product product);

    double calculateTotalAmount(int cartID);
}
