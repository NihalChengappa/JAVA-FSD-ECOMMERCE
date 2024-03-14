package com.blueyonder.projectgatewayservice.filter;

import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.stereotype.Component;
import java.util.*;
import java.util.function.Predicate;
@Component
public class RouteValidator {
	
	public static  final List<String> openApiEndpoints=List.of(
			"/auth/register",
			"/auth/login",
			"/eureka",
			"/api-docs"
			);
	public static  final List<String> isAdmin=List.of(
			"/productandcategory/ecommerceapp/api/v1/category/addcategory",
			"/productandcategory/ecommerceapp/api/v1/category/updatecategory",
			"/productandcategory/ecommerceapp/api/v1/category/deletecategory",
			"/productandcategory/ecommerceapp/api/v1/product/deleteproduct",
			"/productandcategory/ecommerceapp/api/v1/product/updateproduct",
			"/productandcategory/ecommerceapp/api/v1/product/addproduct",
			"/productandcategory/ecommerceapp/api/v1/link"
			);
    
	public Predicate<ServerHttpRequest> isSecured =
            request -> openApiEndpoints
                    .stream()
                    .noneMatch(uri -> request.getURI().getPath().contains(uri));
    public Predicate<ServerHttpRequest> isAdminSecured =
            request -> isAdmin
                    .stream()
                    .anyMatch(uri -> request.getURI().getPath().contains(uri));
    
}
