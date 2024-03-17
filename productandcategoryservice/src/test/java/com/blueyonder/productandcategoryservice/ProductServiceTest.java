package com.blueyonder.productandcategoryservice;

import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import static org.mockito.Mockito.when;

import com.blueyonder.productandcategoryservice.entities.Product;
import com.blueyonder.productandcategoryservice.exceptions.ProductNotFoundException;
import com.blueyonder.productandcategoryservice.repositories.ProductRepository;
import com.blueyonder.productandcategoryservice.service.ProductServiceImpl;

@ExtendWith(MockitoExtension.class)
public class ProductServiceTest {

    @Mock
    private ProductRepository productRepository;

    @InjectMocks
    private ProductServiceImpl productService;

    @Test
    public void testAddProduct() {
        Product product = new Product();
        when(productRepository.save(Mockito.any(Product.class))).thenReturn(product);

        productService.addProduct(product);

        Mockito.verify(productRepository, Mockito.times(1)).save(Mockito.any(Product.class));
    }

    @Test
    public void testFindProductById_Found() throws Exception {
        Product product = new Product();
        product.setProductId(1);

        when(productRepository.findById(product.getProductId())).thenReturn(Optional.of(product));
        when(productRepository.existsById(product.getProductId())).thenReturn(true);

        Product foundProduct = productService.findProductById(product.getProductId());

        Assertions.assertThat(foundProduct).isNotNull();
        Assertions.assertThat(foundProduct.getProductId()).isEqualTo(product.getProductId());

        Mockito.verify(productRepository).findById(product.getProductId());
    }

    @Test
    public void testFindProductById_NotFound() {
        int productId = 999;

        when(productRepository.existsById(productId)).thenReturn(false);

        Assertions.assertThatThrownBy(() -> productService.findProductById(productId))
                .isInstanceOf(ProductNotFoundException.class);

        Mockito.verify((productRepository),Mockito.never()).findById(productId);
    }

    @Test
    public void testDeleteProduct() throws ProductNotFoundException {
        Product product = new Product();
        product.setProductId(1);
        
        when(productRepository.existsById(product.getProductId())).thenReturn(true);
        when(productRepository.findById(product.getProductId())).thenReturn(Optional.of(product));
        
        productService.deleteProduct(product.getProductId());
        
        Mockito.verify(productRepository).findById(product.getProductId());
        Mockito.verify(productRepository).delete(product);
    }

    @Test
    public void testDeleteProduct_NotFound() {
        int productId = 999;

        when(productRepository.existsById(productId)).thenReturn(false);
        
        Assertions.assertThatThrownBy(() -> productService.deleteProduct(productId))
                .isInstanceOf(ProductNotFoundException.class);

        Mockito.verify(productRepository).existsById(productId);
        Mockito.verify(productRepository, Mockito.never()).deleteById(productId);
    }

    @Test
    public void testFindProductByName_Found() throws Exception {
        String productName = "Test Product";
        Product product = new Product();
        product.setProductId(1);
        product.setProductName(productName);
        product.setProductDescription("Test Description");

        Set<Product> productSet = new HashSet<>();
        productSet.add(product);

        when(productRepository.existsByProductName(productName)).thenReturn(true);
        when(productRepository.findAllByProductName(productName)).thenReturn(productSet);

        Set<Product> foundProducts = productService.findAllProductsByName(productName);

        Assertions.assertThat(foundProducts).isNotEmpty();
        Assertions.assertThat(foundProducts).contains(product);

        Mockito.verify(productRepository).existsByProductName(productName);
        Mockito.verify(productRepository).findAllByProductName(productName);
    }

    @Test
    public void testFindProductByName_NotFound() {
        String productName = "Nonexistent Product";

        when(productRepository.existsByProductName(productName)).thenReturn(false);

        Assertions.assertThatThrownBy(() -> productService.findAllProductsByName(productName))
                .isInstanceOf(ProductNotFoundException.class);

        Mockito.verify(productRepository).existsByProductName(productName);
        Mockito.verify(productRepository,Mockito.never()).findAllByProductName(productName);
    }

    @Test
    public void testFindProductByDescription_Found() throws Exception {
        String productDescription = "Test Description";
        Product product = new Product();
        product.setProductId(1);
        product.setProductName("Test Product");
        product.setProductDescription(productDescription);

        Set<Product> productSet = new HashSet<>();
        productSet.add(product);

        when(productRepository.findAllByProductDescription(productDescription)).thenReturn(productSet);
        when(productRepository.existsByProductDescription(productDescription)).thenReturn(true);

        Set<Product> foundProducts = productService.findAllProductsByDescription(productDescription);
        Assertions.assertThat(foundProducts).isNotEmpty();
        Assertions.assertThat(foundProducts.iterator().next().getProductDescription()).isEqualTo(productDescription);

        Mockito.verify(productRepository).existsByProductDescription(productDescription);
        Mockito.verify(productRepository).findAllByProductDescription(productDescription);
    }

    @Test
    public void testFindProductByDescription_NotFound() {
        String productDescription = "Nonexistent Description";

        when(productRepository.existsByProductDescription(productDescription)).thenReturn(false);

        Assertions.assertThatThrownBy(() -> productService.findAllProductsByDescription(productDescription))
                .isInstanceOf(ProductNotFoundException.class);

        Mockito.verify(productRepository).existsByProductDescription(productDescription);
        Mockito.verify(productRepository,Mockito.never()).findAllByProductDescription(productDescription);
    }

}
