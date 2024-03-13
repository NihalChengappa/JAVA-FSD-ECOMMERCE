package com.blueyonder.productandcategoryservice.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class ProductCategoryExceptionHandler {

	@ExceptionHandler(CategoryNotFoundException.class)
	public ResponseEntity<String>handleCategoryNotFoundException() {
		return new ResponseEntity<String>("Category doesn't exist",HttpStatus.NOT_FOUND);
	}
	@ExceptionHandler(ProductNotFoundException.class)
	public String handleProductNotFoundException() {
		return "Product doesn't exist";
	}
}
