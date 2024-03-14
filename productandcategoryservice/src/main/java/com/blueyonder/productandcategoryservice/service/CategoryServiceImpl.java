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
import com.blueyonder.productandcategoryservice.exceptions.CategoryNotFoundException;
import com.blueyonder.productandcategoryservice.repositories.CategoryRepository;

@Service
public class CategoryServiceImpl implements CategoryService{

	@Autowired
	CategoryRepository categoryRepository;
	Logger logger=LoggerFactory.getLogger(CategoryService.class);
	@Override
	public void addCategory(Category category) {
		// TODO Auto-generated method stub
		categoryRepository.save(category);
	}
	
	@Override
	public Category findCategoryById(Integer id) throws CategoryNotFoundException {
		// TODO Auto-generated method stub
		Optional<Category> category=categoryRepository.findById(id);
		if(category.isPresent()) {
			return category.get();
		}
		else {
			logger.debug(id+" not found");
			throw new CategoryNotFoundException();
		}
	}

	@Override
	public void updateCategory(Category category) throws CategoryNotFoundException {
		// TODO Auto-generated method stub
		categoryRepository.save(category);
		
	}

	@Transactional
	@Override
	public void deleteCategory(Integer id) throws CategoryNotFoundException{
		// TODO Auto-generated method stub
		if(!categoryRepository.existsById(id)) {
			logger.error("categoryid:"+id+" does not exist");
			throw new CategoryNotFoundException();
		}
		Optional<Category>category = categoryRepository.findById(id);

        // Remove associations with categories
		category.get().getProductList().clear();
		categoryRepository.save(category.get());
		categoryRepository.deleteById(id);
		
	}

	@Override
	public Set<Category> getAllCategories() {
		// TODO Auto-generated method stub
		
		return categoryRepository.findAll();
		 
	}

	@Override
	public Set<Category> findAllByName(String value) throws CategoryNotFoundException {
		// TODO Auto-generated method stub
		if(!categoryRepository.existsByName(value)) {
			logger.error("category name:"+value+" does not exist");
			throw new CategoryNotFoundException();
		}
		return categoryRepository.findAllByName(value);
	}

	@Override
	public Set<Category> findAllByCategoryDescription(String value) throws CategoryNotFoundException {
		// TODO Auto-generated method stub
		if(!categoryRepository.existsByCategoryDescription(value)) {
			logger.error("category description:"+value+" does not exist");
			throw new CategoryNotFoundException();
		}
		return categoryRepository.findAllByCategoryDescription(value);
	}

}
