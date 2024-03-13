package com.blueyonder.productandcategoryservice.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.blueyonder.productandcategoryservice.entities.Category;
import com.blueyonder.productandcategoryservice.entities.Product;
import com.blueyonder.productandcategoryservice.exceptions.CategoryNotFoundException;
import com.blueyonder.productandcategoryservice.exceptions.ProductNotFoundException;
import com.blueyonder.productandcategoryservice.service.CategoryService;
import com.blueyonder.productandcategoryservice.service.ProductService;

import jakarta.transaction.Transactional;

@RestController
//@CrossOrigin("*")
@RequestMapping("/ecommerceapp/api/v1/link")
public class LinkController {
	@Autowired
	private ProductService productService;
	@Autowired
    private CategoryService categoryService;
	
	@Transactional
	@PostMapping("/createlink")
	public void createLink(@RequestParam("productId") Integer productId,@RequestParam("categoryId") Integer categoryId) throws ProductNotFoundException, CategoryNotFoundException{
		System.out.println(productId+" "+categoryId); 
		Product product = productService.findProductById(productId);
	     Category category = categoryService.findCategoryById(categoryId);
	     product.getCategoryList().add(category);
	     category.getProductList().add(product);
	}
}
