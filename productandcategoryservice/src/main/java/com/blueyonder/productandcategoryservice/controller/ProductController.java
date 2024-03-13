package com.blueyonder.productandcategoryservice.controller;

import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
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
import com.blueyonder.productandcategoryservice.entities.Product;
import com.blueyonder.productandcategoryservice.exceptions.CategoryNotFoundException;
import com.blueyonder.productandcategoryservice.exceptions.ProductNotFoundException;
import com.blueyonder.productandcategoryservice.service.ProductService;

@RestController
//@CrossOrigin("*")
@RequestMapping("/ecommerceapp/api/v1/product")
public class ProductController {

	@Autowired
	private ProductService productService;

	@PostMapping("/addproduct")
	public ResponseEntity<Product> addNewProduct(@RequestBody Product product) {
		productService.addProduct(product);
		return new ResponseEntity<Product>(product,HttpStatus.CREATED);
	}
	@PutMapping("/updateproduct/{id}")
	public ResponseEntity<Product> updateProduct(@RequestBody Product product,@PathVariable("id") Integer id) throws ProductNotFoundException {
		Product prod=productService.findProductById(id);
		if(product.getProductDescription()!=null) {
			prod.setProductDescription(product.getProductDescription());
		}
		if(product.getProductName()!=null) {
			prod.setProductName(product.getProductName());
		}
		if(product.getProductPrice()!=null) {
			prod.setProductPrice(product.getProductPrice());
		}
		productService.updateProduct(prod);
		return new ResponseEntity<Product>(prod,HttpStatus.OK);
	}
	@DeleteMapping("/deleteproduct/{id}")
	public ResponseEntity<String> deleteProduct(@PathVariable("id") Integer id) throws ProductNotFoundException {
		productService.deleteProduct(id);
		return new ResponseEntity<String>("Deleted Successfully",HttpStatus.OK);
	}
	@GetMapping("/getproducts")
	public ResponseEntity<Set<Product>> getProducts(){
		
		return new ResponseEntity<Set<Product>>(productService.findAllProducts(),HttpStatus.OK);
	}
	@GetMapping("/getproductbyfield")
	public ResponseEntity<Object> getProductByField(@RequestParam("field") String field,@RequestParam("value") String value) throws NumberFormatException, ProductNotFoundException{
		field=field.toLowerCase();
		switch(field) {
			case "id":
				return new ResponseEntity<>(productService.findProductById(Integer.parseInt(value)),HttpStatus.OK);
			case "name":
				return new ResponseEntity<>(productService.findAllProductsByName(value),HttpStatus.OK);
			case "price":
				return new ResponseEntity<>(productService.findAllProductsByPrice(Integer.parseInt(value)),HttpStatus.OK);
			case "description":
				return new ResponseEntity<>(productService.findAllProductsByDescription(value),HttpStatus.OK);
		}
		return null;
	}
}
