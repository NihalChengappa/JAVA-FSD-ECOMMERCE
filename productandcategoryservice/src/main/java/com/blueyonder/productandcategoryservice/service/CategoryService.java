package com.blueyonder.productandcategoryservice.service;

import java.util.Set;

import com.blueyonder.productandcategoryservice.entities.Category;
import com.blueyonder.productandcategoryservice.exceptions.CategoryNotFoundException;

public interface CategoryService {
	public void addCategory(Category category);
	public void updateCategory(Category category) throws CategoryNotFoundException;
	public void deleteCategory(Integer id) throws CategoryNotFoundException;
	public Category findCategoryById(Integer id) throws CategoryNotFoundException;
	public Set<Category> getAllCategories();
	public Set<Category> findAllByName(String value) throws CategoryNotFoundException;
	public Set<Category> findAllByCategoryDescription(String value) throws CategoryNotFoundException;
}
