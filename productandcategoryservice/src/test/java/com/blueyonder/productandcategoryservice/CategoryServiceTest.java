package com.blueyonder.productandcategoryservice;
import org.assertj.core.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.HashSet;
import java.util.Optional;
import java.util.Set;

import static org.junit.jupiter.api.Assertions.assertAll;
import static org.mockito.Mockito.doNothing;
import static org.mockito.Mockito.when;

import com.blueyonder.productandcategoryservice.controller.CategoryController;
import com.blueyonder.productandcategoryservice.entities.Category;
import com.blueyonder.productandcategoryservice.entities.Product;
import com.blueyonder.productandcategoryservice.exceptions.CategoryNotFoundException;
import com.blueyonder.productandcategoryservice.repositories.CategoryRepository;
import com.blueyonder.productandcategoryservice.service.CategoryServiceImpl;

@ExtendWith(MockitoExtension.class)
public class CategoryServiceTest {
    @Mock
    private CategoryRepository categoryRepository;

    @InjectMocks
    private CategoryServiceImpl categoryService;

    @Test
    public void testCreateCategory() {
        Category category = new Category();
        category.setName("test");
        category.setCategoryDescription("test");
        when(categoryRepository.save(Mockito.any(Category.class))).thenReturn(category);
        Category savedCategory = categoryService.addCategory(category);
        Mockito.verify(categoryRepository, Mockito.times(1)).save(Mockito.any(Category.class));
        Assertions.assertThat(savedCategory).isNotNull();
        Assertions.assertThat(savedCategory.getName()).isEqualTo(category.getName());
        Assertions.assertThat(savedCategory.getCategoryDescription()).isEqualTo(category.getCategoryDescription());
    }


    @Test
    public void testFindCategoryById_Found() throws Exception {
        Category category = new Category();
        category.setCategoryId(1);
        category.setName("Test Category");
        category.setCategoryDescription("Test Description");

        when(categoryRepository.findById(category.getCategoryId())).thenReturn(Optional.of(category));

        Category foundCategory = categoryService.findCategoryById(category.getCategoryId());

        Assertions.assertThat(foundCategory).isNotNull();
        Assertions.assertThat(foundCategory.getCategoryId()).isEqualTo(category.getCategoryId());
        Assertions.assertThat(foundCategory.getName()).isEqualTo(category.getName());
        Assertions.assertThat(foundCategory.getCategoryDescription()).isEqualTo(category.getCategoryDescription());

        Mockito.verify(categoryRepository).findById(category.getCategoryId());
    }

    @Test
    public void testFindCategoryById_NotFound() {
        int categoryId = 999;

        when(categoryRepository.findById(categoryId)).thenReturn(Optional.empty());
        Assertions.assertThatThrownBy(() -> categoryService.findCategoryById(categoryId))
                .isInstanceOf(CategoryNotFoundException.class);

        Mockito.verify(categoryRepository).findById(categoryId);
    }

    @Test
    public void testDeleteCategory() throws CategoryNotFoundException {
        Category category = new Category();
        category.setCategoryId(1);
        category.setName("Test Category");
        category.setCategoryDescription("Test Description");

        when(categoryRepository.existsById(category.getCategoryId())).thenReturn(true);
        when(categoryRepository.findById(category.getCategoryId())).thenReturn(Optional.of(category));
        categoryService.deleteCategory(category.getCategoryId());
        Mockito.verify(categoryRepository).existsById(category.getCategoryId());
        Mockito.verify(categoryRepository).deleteById(category.getCategoryId());
    }

    @Test
    public void testDeleteCategory_NotFound() {
        int categoryId = 999;

        when(categoryRepository.existsById(categoryId)).thenReturn(false);
        Assertions.assertThatThrownBy(() -> categoryService.deleteCategory(categoryId))
                .isInstanceOf(CategoryNotFoundException.class);

        Mockito.verify(categoryRepository).existsById(categoryId);
        Mockito.verify(categoryRepository, Mockito.never()).deleteById(categoryId);
    }
    
    @Test
    public void testFindCategoryByName_Found() throws Exception {
        String categoryName = "Test Category";
        Category category = new Category();
        category.setCategoryId(1);
        category.setName(categoryName);
        category.setCategoryDescription("Test Description");

        Set<Category> categorySet = new HashSet<>();
        categorySet.add(category);

        when(categoryRepository.existsByName(categoryName)).thenReturn(true);
        when(categoryRepository.findAllByName(categoryName)).thenReturn(categorySet);

        Set<Category> foundCategories = categoryService.findAllByName(categoryName);

        Assertions.assertThat(foundCategories).isNotEmpty();
        Assertions.assertThat(foundCategories).contains(category); 

        Mockito.verify(categoryRepository).existsByName(categoryName);
        Mockito.verify(categoryRepository).findAllByName(categoryName); 
    }


    @Test
    public void testFindCategoryByName_NotFound() {
        String categoryName = "Nonexistent Category";

        when(categoryRepository.existsByName(categoryName)).thenReturn(false);

        Assertions.assertThatThrownBy(() -> categoryService.findAllByName(categoryName))
                .isInstanceOf(CategoryNotFoundException.class);

        Mockito.verify(categoryRepository).existsByName(categoryName);
    }

    @Test
    public void testFindCategoryByDescription_Found() throws Exception {
        String categoryDescription = "Test Description";
        Category category = new Category();
        category.setCategoryId(1);
        category.setName("Test Category");
        category.setCategoryDescription(categoryDescription);

        Set<Category> categorySet = new HashSet<>();
        categorySet.add(category);

        when(categoryRepository.findAllByCategoryDescription(categoryDescription)).thenReturn(categorySet);
        when(categoryRepository.existsByCategoryDescription(categoryDescription)).thenReturn(true);
        
        Set<Category> foundCategories = categoryService.findAllByCategoryDescription(categoryDescription);
        Assertions.assertThat(foundCategories).isNotEmpty();
        Assertions.assertThat(foundCategories.iterator().next().getCategoryDescription()).isEqualTo(categoryDescription);

        Mockito.verify(categoryRepository).existsByCategoryDescription(categoryDescription);
        Mockito.verify(categoryRepository).findAllByCategoryDescription(categoryDescription);
    }

    @Test
    public void testFindCategoryByDescription_NotFound() {
        String categoryDescription = "Nonexistent Description";

        when(categoryRepository.existsByCategoryDescription(categoryDescription)).thenReturn(false);

        Assertions.assertThatThrownBy(() -> categoryService.findAllByCategoryDescription(categoryDescription))
                .isInstanceOf(CategoryNotFoundException.class);

        Mockito.verify(categoryRepository).existsByCategoryDescription(categoryDescription);
    }
}
