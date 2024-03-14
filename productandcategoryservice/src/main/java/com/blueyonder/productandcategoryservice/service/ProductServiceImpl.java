package com.blueyonder.productandcategoryservice.service;

import java.util.Optional;
import java.util.Set;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.blueyonder.productandcategoryservice.entities.Category;
import com.blueyonder.productandcategoryservice.entities.Product;
import com.blueyonder.productandcategoryservice.exceptions.ProductNotFoundException;
import com.blueyonder.productandcategoryservice.repositories.ProductRepository;

@Service
public class ProductServiceImpl implements ProductService{

	@Autowired
	ProductRepository productRepository;
	Logger logger=LoggerFactory.getLogger(ProductService.class);
	@Override
	public void addProduct(Product product) {
		// TODO Auto-generated method stub
		productRepository.save(product);
		
	}

	@Override
	public void updateProduct(Product product) throws ProductNotFoundException {
		// TODO Auto-generated method stub
		productRepository.save(product);
	}

	@Transactional
	@Override
	public void deleteProduct(Integer id) {
		// TODO Auto-generated method stub
		Optional<Product>product = productRepository.findById(id);

		 // Remove associations with categories
        for (Category category : product.get().getCategoryList()) {
        	category.getProductList().remove(product.get());
            product.get().getCategoryList().remove(product.get());
        }

        // Delete the product
        productRepository.delete(product.get());
	}

	@Override
	public Product findProductById(Integer id) throws ProductNotFoundException {
		// TODO Auto-generated method stub
		Optional<Product> product=productRepository.findById(id);
		if(product.isPresent()) {
			return product.get();
		}
		else {
			throw new ProductNotFoundException();
		}
	}

	@Override
	public Set<Product> findAllProducts() {
		// TODO Auto-generated method stub
		return productRepository.findAll();
	}

	@Override
	public Set<Product> findAllProductsByName(String value) {
		// TODO Auto-generated method stub
		return productRepository.findAllByProductName(value);
	}

	@Override
	public Set<Product> findAllProductsByDescription(String value) {
		// TODO Auto-generated method stub
		return productRepository.findAllByProductDescription(value);
	}

	@Override
	public Set<Product> findAllProductsByPrice(Integer value) {
		// TODO Auto-generated method stub
		return productRepository.findAllByProductPrice(value);
	}

}
