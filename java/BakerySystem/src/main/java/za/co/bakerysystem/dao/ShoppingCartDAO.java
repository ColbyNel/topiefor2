
package za.co.bakerysystem.dao;

import za.co.bakerysystem.model.Product;
import za.co.bakerysystem.model.ShoppingCart;


public interface ShoppingCartDAO {

    ShoppingCart getShoppingCartById(int cartID);

    boolean addProductToCart(int cartID, Product product, int quantity);

    boolean removeProductFromCart(int cartID, Product product);

    boolean updateCartTotal(int cartID);
}

