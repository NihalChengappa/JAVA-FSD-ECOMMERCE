package com.blueyonder.productandcategoryservice.repositories;

import java.util.Set;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.blueyonder.productandcategoryservice.entities.Category;
import com.blueyonder.productandcategoryservice.entities.Product;

@Repository
public interface ProductRepository extends CrudRepository<Product, Integer>{
	public Set<Product> findAll();
	public Set<Product> findAllByProductName(String value);
	public Set<Product> findAllByProductDescription(String value);
	public Set<Product> findAllByProductPrice(Integer value);
}
