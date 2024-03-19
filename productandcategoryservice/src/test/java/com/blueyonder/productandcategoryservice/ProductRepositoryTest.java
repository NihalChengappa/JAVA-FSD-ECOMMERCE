package com.blueyonder.productandcategoryservice;

import static org.mockito.Mockito.when;
import static org.mockito.ArgumentMatchers.anyInt;
import static org.mockito.ArgumentMatchers.anyString;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.junit.jupiter.api.Assertions.assertTrue;
import static org.junit.jupiter.api.Assertions.assertThrows;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import com.blueyonder.productandcategoryservice.entities.Product;
import com.blueyonder.productandcategoryservice.exceptions.ProductNotFoundException;
import com.blueyonder.productandcategoryservice.repositories.ProductRepository;
import com.blueyonder.productandcategoryservice.service.ProductServiceImpl;

@ExtendWith(MockitoExtension.class)
public class ProductRepositoryTest {

    @Mock
    private ProductRepository productRepositoryMock;

    @InjectMocks
    private ProductServiceImpl productService;

    private Set<Product> testProductSet;

    @BeforeEach
    public void setup() {
        testProductSet = new HashSet<>();
        Product product1 = new Product();
        product1.setProductId(1);
        product1.setProductName("Product1");
        Product product2 = new Product();
        product2.setProductId(2);
        product2.setProductName("Product2");
        testProductSet.add(product1);
        testProductSet.add(product2);
    }

    @Test
    public void testFindAll() {
        when(productRepositoryMock.findAll()).thenReturn(testProductSet);
        Set<Product> foundProducts = productService.findAllProducts();
        assertEquals(testProductSet, foundProducts);
        Mockito.verify(productRepositoryMock).findAll();
    }

    @Test
    public void testFindAllProductsByName() throws ProductNotFoundException {
        String productName = "Product1";
        when(productRepositoryMock.findAllByProductName(productName)).thenReturn(testProductSet);
        when(productRepositoryMock.existsByProductName(productName)).thenReturn(true);
        Set<Product> foundProducts = productService.findAllProductsByName(productName);
        assertEquals(testProductSet, foundProducts);
        Mockito.verify(productRepositoryMock).findAllByProductName(productName);
    }

    @Test
    public void testFindAllProductsByName_NotFound() {
        String productName = "NonexistentProduct";
        when(productRepositoryMock.existsByProductName(productName)).thenReturn(false);
        assertThrows(ProductNotFoundException.class, () -> productService.findAllProductsByName(productName));
        Mockito.verify(productRepositoryMock).existsByProductName(productName);
    }

    @Test
    public void testFindAllProductsByDescription() throws ProductNotFoundException {
        String productDescription = "Description";
        when(productRepositoryMock.findAllByProductDescription(productDescription)).thenReturn(testProductSet);
        when(productRepositoryMock.existsByProductDescription(productDescription)).thenReturn(true);
        Set<Product> foundProducts = productService.findAllProductsByDescription(productDescription);
        assertEquals(testProductSet, foundProducts);
        Mockito.verify(productRepositoryMock).findAllByProductDescription(productDescription);
    }

    @Test
    public void testFindAllProductsByDescription_NotFound() {
        String productDescription = "NonexistentDescription";
        when(productRepositoryMock.existsByProductDescription(productDescription)).thenReturn(false);
        assertThrows(ProductNotFoundException.class, () -> productService.findAllProductsByDescription(productDescription));
        Mockito.verify(productRepositoryMock).existsByProductDescription(productDescription);
    }

    @Test
    public void testFindAllProductsByPrice() throws ProductNotFoundException {
        int productPrice = 100;
        when(productRepositoryMock.findAllByProductPrice(productPrice)).thenReturn(testProductSet);
        when(productRepositoryMock.existsByProductPrice(productPrice)).thenReturn(true);
        Set<Product> foundProducts = productService.findAllProductsByPrice(productPrice);
        assertEquals(testProductSet, foundProducts);
        Mockito.verify(productRepositoryMock).findAllByProductPrice(productPrice);
    }

    @Test
    public void testFindAllProductsByPrice_NotFound() {
        int productPrice = 999;
        when(productRepositoryMock.existsByProductPrice(productPrice)).thenReturn(false);
        assertThrows(ProductNotFoundException.class, () -> productService.findAllProductsByPrice(productPrice));
        Mockito.verify(productRepositoryMock).existsByProductPrice(productPrice);
    }

}
