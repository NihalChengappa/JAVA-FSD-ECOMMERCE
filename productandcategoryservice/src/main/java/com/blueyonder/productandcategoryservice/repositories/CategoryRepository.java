package com.blueyonder.productandcategoryservice.repositories;

import java.util.Set;

import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import com.blueyonder.productandcategoryservice.entities.Category;

@Repository
public interface CategoryRepository extends CrudRepository<Category, Integer>{
	Set<Category> findAll();
	Set<Category> findAllByName(String value);
	public Set<Category> findAllByCategoryDescription(String value);
	public boolean existsByCategoryDescription(String value);
	public boolean existsByName(String value);

}
