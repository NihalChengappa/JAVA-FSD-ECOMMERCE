package com.blueyonder.productandcategoryservice;

import static org.mockito.Mockito.when;
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

import com.blueyonder.productandcategoryservice.entities.Category;
import com.blueyonder.productandcategoryservice.exceptions.CategoryNotFoundException;
import com.blueyonder.productandcategoryservice.repositories.CategoryRepository;
import com.blueyonder.productandcategoryservice.service.CategoryServiceImpl;

@ExtendWith(MockitoExtension.class)
public class CategoryRepositoryTest {

    @Mock
    private CategoryRepository categoryRepositoryMock;

    @InjectMocks
    private CategoryServiceImpl categoryService;

    private Set<Category> testCategorySet;

    @BeforeEach
    public void setup() {
        testCategorySet = new HashSet<>();
        Category category1 = new Category();
        category1.setCategoryId(1);
        category1.setName("Category1");
        Category category2 = new Category();
        category2.setCategoryId(2);
        category2.setName("Category2");
        testCategorySet.add(category1);
        testCategorySet.add(category2);
    }

    @Test
    public void testFindAll() {
        when(categoryRepositoryMock.findAll()).thenReturn(testCategorySet);
        Set<Category> foundCategories = categoryService.getAllCategories();
        assertEquals(testCategorySet, foundCategories);
        Mockito.verify(categoryRepositoryMock).findAll();
    }

    @Test
    public void testFindAllCategoriesByName() throws CategoryNotFoundException {
        String categoryName = "Category1";
        when(categoryRepositoryMock.findAllByName(categoryName)).thenReturn(testCategorySet);
        when(categoryRepositoryMock.existsByName(categoryName)).thenReturn(true);
        Set<Category> foundCategories = categoryService.findAllByName(categoryName);
        assertEquals(testCategorySet, foundCategories);
        Mockito.verify(categoryRepositoryMock).findAllByName(categoryName);
    }

    @Test
    public void testFindAllCategoriesByName_NotFound() {
        String categoryName = "NonexistentCategory";
        when(categoryRepositoryMock.existsByName(categoryName)).thenReturn(false);
        assertThrows(CategoryNotFoundException.class, () -> categoryService.findAllByName(categoryName));
        Mockito.verify(categoryRepositoryMock).existsByName(categoryName);
    }

    @Test
    public void testFindAllCategoriesByDescription() throws CategoryNotFoundException {
        String categoryDescription = "Description";
        when(categoryRepositoryMock.findAllByCategoryDescription(categoryDescription)).thenReturn(testCategorySet);
        when(categoryRepositoryMock.existsByCategoryDescription(categoryDescription)).thenReturn(true);
        Set<Category> foundCategories = categoryService.findAllByCategoryDescription(categoryDescription);
        assertEquals(testCategorySet, foundCategories);
        Mockito.verify(categoryRepositoryMock).findAllByCategoryDescription(categoryDescription);
    }

    @Test
    public void testFindAllCategoriesByDescription_NotFound() {
        String categoryDescription = "NonexistentDescription";
        when(categoryRepositoryMock.existsByCategoryDescription(categoryDescription)).thenReturn(false);
        assertThrows(CategoryNotFoundException.class, () -> categoryService.findAllByCategoryDescription(categoryDescription));
        Mockito.verify(categoryRepositoryMock).existsByCategoryDescription(categoryDescription);
    }

}
