package com.blueyonder.productandcategoryservice.controller;

import java.util.Optional;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import com.blueyonder.productandcategoryservice.entities.Category;
import com.blueyonder.productandcategoryservice.exceptions.CategoryNotFoundException;
import com.blueyonder.productandcategoryservice.service.CategoryService;


@RestController
//@CrossOrigin("*")
@RequestMapping("/ecommerceapp/api/v1/category")
public class CategoryController {

	@Autowired
	private CategoryService categoryService;

	@PostMapping(value="/addcategory",consumes = MediaType.APPLICATION_JSON_VALUE)
	public ResponseEntity<Category> addNewCategory(@RequestBody Category category) {
		categoryService.addCategory(category);
		return new ResponseEntity<Category>(category,HttpStatus.CREATED);
	}
	@PutMapping("/updatecategory/{id}")
	public ResponseEntity<Category> updateCategory(@RequestBody Category category,@PathVariable("id") Integer id) throws CategoryNotFoundException {
		Category cat=categoryService.findCategoryById(id);
		if(category.getCategoryDescription()!=null) {
			cat.setCategoryDescription(category.getCategoryDescription());
		}
		if(category.getName()!=null) {
			cat.setName(category.getName());
		}
		categoryService.updateCategory(cat);
		return new ResponseEntity<Category>(category,HttpStatus.OK);
	}
	@DeleteMapping("/deletecategory/{id}")
	public ResponseEntity<String> deleteCategory(@PathVariable("id") Integer id) throws CategoryNotFoundException {
			categoryService.deleteCategory(id);
			return new ResponseEntity<String>("Deleted Successfully",HttpStatus.OK);
	}
	@GetMapping("/getcategories")
	public ResponseEntity<Set<Category>> getCategories(){
		
		return new ResponseEntity<Set<Category>>(categoryService.getAllCategories(),HttpStatus.OK);
	}
	@GetMapping("/getcategorybyfield")
	public ResponseEntity<Object> getCategoryByField(@RequestParam("field") String field,@RequestParam("value") String value) throws NumberFormatException, CategoryNotFoundException{
		field=field.toLowerCase();
		switch(field) {
			case "id":
				if(categoryService.findCategoryById(Integer.parseInt(value))==null) {
					throw new CategoryNotFoundException();
				}
				else {
					return new ResponseEntity<>(categoryService.findCategoryById(Integer.parseInt(value)),HttpStatus.OK);
				}
				
			case "name":
				if(categoryService.findAllByName(value).isEmpty()) {
					throw new CategoryNotFoundException();
				}
				else {
					return new ResponseEntity<>(categoryService.findAllByName(value),HttpStatus.OK);
				}
				
			case "description":
				if(categoryService.findAllByCategoryDescription(value).isEmpty()) {
					throw new CategoryNotFoundException();
				}
				else {
					return new ResponseEntity<>(categoryService.findAllByCategoryDescription(value),HttpStatus.OK);
				}
				
		}
		return null;
	}
}
