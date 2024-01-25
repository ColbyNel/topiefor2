package za.co.bakerysystem.service.impl;

import za.co.bakerysystem.dao.ProductDAO;
import za.co.bakerysystem.model.Customer;
import za.co.bakerysystem.model.Order;
import za.co.bakerysystem.model.Product;
import za.co.bakerysystem.service.ProductService;

import java.util.List;

public class ProductServiceImpl implements ProductService {

    private ProductDAO productDAO;

    public ProductServiceImpl(ProductDAO productDAO) {
        this.productDAO = productDAO;
    }

    @Override
    public boolean createProduct(Product product) {
        return productDAO.createProduct(product);
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
    public int getOrderQuantity(int productID) {
        return productDAO.getOrderQuantity(productID);
    }

    @Override
    public int getSaleQuantity(int productID) {
        return productDAO.getSaleQuantity(productID);
    }

    @Override
    public int getOrderQuantityByKeyWord(String keyWord) {
        return productDAO.getOrderQuantityByKeyWord(keyWord);
    }

    @Override
    public List<Order> getOrders(int productID) {
        return productDAO.getOrders(productID);
    }

    @Override
    public List<Customer> getTopCustomers(int productID) {
        return productDAO.getTopCustomers(productID);
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
    public List<String> getRecipe(int productID) {
        return productDAO.getRecipe(productID);
    }

    @Override
    public boolean deleteProduct(int productID) {
        return productDAO.deleteProduct(productID);
    }
}
