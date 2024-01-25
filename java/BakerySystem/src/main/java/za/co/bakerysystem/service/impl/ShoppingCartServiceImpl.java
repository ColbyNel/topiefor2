package za.co.bakerysystem.service.impl;

import za.co.bakerysystem.dao.ProductDAO;
import za.co.bakerysystem.dao.ShoppingCartDAO;
import za.co.bakerysystem.dao.impl.ProductDAOImpl;
import za.co.bakerysystem.dao.impl.ShoppingCartDAOImpl;
import za.co.bakerysystem.dbmanager.DbManager;
import za.co.bakerysystem.model.Product;
import za.co.bakerysystem.model.ShoppingCart;
import za.co.bakerysystem.service.ShoppingCartService;

public class ShoppingCartServiceImpl implements ShoppingCartService {

    private ShoppingCartDAO shoppingCartDAO;
    private ProductDAO productDAO;
    private DbManager db;

    public ShoppingCartServiceImpl() {
        db = DbManager.getInstance();
        this.shoppingCartDAO = new ShoppingCartDAOImpl(db.getConnection());
        this.productDAO = new ProductDAOImpl();
    }

    @Override
    public ShoppingCart getShoppingCartById(int cartID) {
        return shoppingCartDAO.getShoppingCartById(cartID);
    }

    @Override
    public void addProductToCart(int cartID, Product product, int quantity) {
        try {
            // Check if the product exists
            Product existingProduct = productDAO.getProduct(product.getID());
            if (existingProduct != null) {
                // Add the product to the cart
                shoppingCartDAO.addProductToCart(cartID, existingProduct, quantity);
                // Update the cart total
                updateCartTotal(cartID);
            } else {
                System.out.println("Product not found. Cannot add to cart.");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void removeProductFromCart(int cartID, Product product) {
        try {
            // Check if the product exists
            Product existingProduct = productDAO.getProduct(product.getID());
            if (existingProduct != null) {
                // Remove the product from the cart
                shoppingCartDAO.removeProductFromCart(cartID, existingProduct);
                // Update the cart total
                updateCartTotal(cartID);
            } else {
                System.out.println("Product not found. Cannot remove from cart.");
            }
        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Override
    public void updateCartTotal(int cartID) {
        shoppingCartDAO.updateCartTotal(cartID);
    }
}
