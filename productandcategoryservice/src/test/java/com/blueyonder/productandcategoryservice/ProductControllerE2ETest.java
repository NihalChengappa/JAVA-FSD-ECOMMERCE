package com.blueyonder.productandcategoryservice;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;

import java.util.Set;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.blueyonder.productandcategoryservice.entities.Product;

@SpringBootTest(webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class ProductControllerE2ETest {
    @Autowired
    private TestRestTemplate restTemplate;
    
    @Test
    public void testGetProducts_Success() {
        // Define the request URL
        String requestUrl = "/ecommerceapp/api/v1/product/getproducts";
        
        // Send GET request and retrieve the response
        ResponseEntity<Set<Product>> responseEntity = restTemplate.exchange(
            requestUrl,
            org.springframework.http.HttpMethod.GET,
            null,
            new ParameterizedTypeReference<Set<Product>>() {}
        );
        
        // Verify that the response status code is OK (200)
        assertEquals(HttpStatus.OK, responseEntity.getStatusCode());
    }
}
