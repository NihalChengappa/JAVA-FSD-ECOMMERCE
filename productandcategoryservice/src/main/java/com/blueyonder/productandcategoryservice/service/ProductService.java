package com.blueyonder.productandcategoryservice.service;

import java.util.Set;

import com.blueyonder.productandcategoryservice.entities.Product;
import com.blueyonder.productandcategoryservice.exceptions.ProductNotFoundException;

public interface ProductService {
	public void addProduct(Product product);
	public void updateProduct(Product product) throws ProductNotFoundException;
	public void deleteProduct(Integer id);
	public Product findProductById(Integer id) throws ProductNotFoundException;
	public Set<Product> findAllProducts();
	public Set<Product> findAllProductsByName(String value);
	public Set<Product> findAllProductsByDescription(String value);
	public Set<Product> findAllProductsByPrice(Integer value);
}
