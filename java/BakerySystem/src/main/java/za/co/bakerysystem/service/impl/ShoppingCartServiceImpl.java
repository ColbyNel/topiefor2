package za.co.bakerysystem.service.impl;

import java.util.List;
import za.co.bakerysystem.dao.ProductDAO;
import za.co.bakerysystem.dao.ShoppingCartDAO;
import za.co.bakerysystem.dao.impl.ProductDAOImpl;
import za.co.bakerysystem.dao.impl.ShoppingCartDAOImpl;
import za.co.bakerysystem.model.Product;
import za.co.bakerysystem.model.ShoppingCart;
import za.co.bakerysystem.service.ShoppingCartService;

public class ShoppingCartServiceImpl implements ShoppingCartService {

    private ShoppingCartDAO shoppingCartDAO;
    private ProductDAO productDAO;

    public ShoppingCartServiceImpl(ShoppingCartDAO shoppingCartDAO, ProductDAO productDAO) {
        this.shoppingCartDAO = shoppingCartDAO;
        this.productDAO = productDAO;
    }

    @Override
    public ShoppingCart getShoppingCartById(int cartID) {
        return shoppingCartDAO.getShoppingCartById(cartID);
    }

    @Override
    public boolean addProductToCart(int cartID, Product product, int quantity) {
        if (product != null) {
            return shoppingCartDAO.addProductToCart(cartID, product, quantity);
        }
        return false;
    }

    @Override
    public boolean removeProductFromCart(int cartID, Product product) {
        if (product != null) {
            return shoppingCartDAO.removeProductFromCart(cartID, product);
        }
        return false;
    }

    @Override
    public List<Product> getProductsForShoppingCart(int cartID) {
        return shoppingCartDAO.getProductsForShoppingCart(cartID);
    }

    @Override
    public int calculateTotalQuantity(int cartID) {
        return shoppingCartDAO.calculateTotalQuantity(cartID);
    }

    @Override
    public double calculateTotalAmount(int cartID) {
        return shoppingCartDAO.calculateTotalAmount(cartID);
    }

    @Override
    public boolean updateCartTotal(int cartID) {
        return shoppingCartDAO.updateCartTotal(cartID);
    }

    //---------------------------------------------------------------------------------------------------
    //---------------------------------------------------------------------------------------------------
    //---------------------------------------------------------------------------------------------------
    public static void main(String[] args) {
        ProductDAO productDAO = new ProductDAOImpl();
        ShoppingCartDAO shoppingCartDAO = new ShoppingCartDAOImpl();
        ShoppingCartService shoppingCartService = new ShoppingCartServiceImpl(shoppingCartDAO, productDAO);

        // Test getShoppingCartById
//        int sampleCartID = 1;  // Replace with an actual cart ID for testing
//        ShoppingCart cart = shoppingCartService.getShoppingCartById(sampleCartID);
//        System.out.println("Shopping Cart for ID " + sampleCartID + ": " + cart);
        // Test addProductToCart
//        Product newProduct = new Product("Blue", 4.99, 6.7, 2, "GOOD BREAD", "HIGH IN carbo", "fibre", "none", 2);
//        productDAO.createProduct(newProduct);

        // Get the newly added product from the database
        Product addedProduct = productDAO.getProductsByKeyWord("White bread").get(0);
        //int totalQuantity = shoppingCartService.calculateTotalQuantity(1);

//        boolean addProductResult = shoppingCartService.addProductToCart(1, addedProduct, totalQuantity);
//        System.out.println("Add Product to Cart Result: " + addProductResult);

        // Test removeProductFromCart
//        boolean removeProductResult = shoppingCartService.removeProductFromCart(2, addedProduct);
//        System.out.println("Remove Product from Cart Result: " + removeProductResult);

        // Test updateCartTotal
        boolean updateTotalResult = shoppingCartService.updateCartTotal(2);
        System.out.println("Update Cart Total Result: " + updateTotalResult);
    }

}
