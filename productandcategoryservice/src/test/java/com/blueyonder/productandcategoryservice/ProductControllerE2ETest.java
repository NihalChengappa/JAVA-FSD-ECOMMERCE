package com.blueyonder.productandcategoryservice;
import static org.junit.jupiter.api.Assertions.assertEquals;

import java.util.Set;

import org.junit.jupiter.api.MethodOrderer;
import org.junit.jupiter.api.Order;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.TestMethodOrder;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import com.blueyonder.productandcategoryservice.entities.Product;

@TestMethodOrder(MethodOrderer.OrderAnnotation.class)
@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class ProductControllerE2ETest {
    @Autowired
    private TestRestTemplate restTemplate;
    
    Integer id;
    
    @Test
    @Order(5)
    public void testGetProducts_Success() {
        String requestUrl = "/ecommerceapp/api/v1/product/getproducts";
        
        ResponseEntity<Set<Product>> responseEntity = restTemplate.exchange(
            requestUrl,
            HttpMethod.GET,
            null,
            new ParameterizedTypeReference<Set<Product>>() {}
        );
        
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
    }
    @Test
    @Order(2)
    public void testGetProducts_ByName() {
        String requestUrl = "/ecommerceapp/api/v1/product/getproductbyfield?field=name&value=Dumbell";
        
        ResponseEntity<Object> responseEntity = restTemplate.exchange(
            requestUrl,
            HttpMethod.GET,
            null,
            new ParameterizedTypeReference<Object>() {}
        );
        
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
    }
    @Test
    @Order(3)
    public void testGetProducts_ById() {
        String requestUrl = "/ecommerceapp/api/v1/product/getproductbyfield?field=id&value=10";
        
        ResponseEntity<Product> responseEntity = restTemplate.exchange(
            requestUrl,
            HttpMethod.GET,
            null,
            new ParameterizedTypeReference<Product>() {}
        );
        
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
    }
    @Test
    @Order(4)
    public void testGetProducts_ByDescription() {
        String requestUrl = "/ecommerceapp/api/v1/product/getproductbyfield?field=description&value=Logitech Keyboard";
        
        ResponseEntity<Object> responseEntity = restTemplate.exchange(
            requestUrl,
            HttpMethod.GET,
            null,
            new ParameterizedTypeReference<Object>() {}
        );
        
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
    }
//    @Test
//    @Order(1)
//    public void testAddProducts() {
//        String requestUrl = "/ecommerceapp/api/v1/product/addproduct";
//        
//        Product product = new Product();
//        product.setProductName("test");
//        product.setProductPrice(20);
//        product.setProductDescription("test product");
//        HttpHeaders headers = new HttpHeaders();
//        headers.setContentType(MediaType.APPLICATION_JSON);
//
//        HttpEntity<Product> requestEntity = new HttpEntity<>(product, headers);
//
//        ResponseEntity<Product> responseEntity = restTemplate.exchange(
//            requestUrl,
//            HttpMethod.POST,
//            requestEntity,
//            new ParameterizedTypeReference<Product>() {}
//        );
//        id=responseEntity.getBody().getProductId();
//        assertEquals(HttpStatus.CREATED, responseEntity.getStatusCode());
//    }
    
    @Test
    @Order(6)
    public void testDeleteProducts() {
//    	System.out.println(Integer.toString(id));
        String requestUrl = "/ecommerceapp/api/v1/product/deleteproduct/19";
        System.out.println(requestUrl);
        ResponseEntity<String> responseEntity = restTemplate.exchange(
            requestUrl,
            HttpMethod.DELETE,
            null,
            new ParameterizedTypeReference<String>() {}
        );
        
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
    }
}
