package com.blueyonder.productandcategoryservice.entities;

import java.util.Set;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Table(name="category_info")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@ToString
public class Category {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Integer categoryId;
	private String name;
	private String categoryDescription;
	
	@ManyToMany(fetch = FetchType.LAZY)
	@JoinTable(
			name="product_categories",
			joinColumns = @JoinColumn(name="categoryId"),
			inverseJoinColumns=@JoinColumn(name="productId"))
	@JsonIgnoreProperties("categoryList")
	
	private Set<Product>productList;
}
