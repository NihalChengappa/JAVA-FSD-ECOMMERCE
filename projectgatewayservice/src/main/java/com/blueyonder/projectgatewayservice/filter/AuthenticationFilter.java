package com.blueyonder.projectgatewayservice.filter;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.gateway.filter.GatewayFilter;
import org.springframework.cloud.gateway.filter.factory.AbstractGatewayFilterFactory;
import org.springframework.http.HttpHeaders;
import org.springframework.stereotype.Component;

import com.blueyonder.projectgatewayservice.utils.JWTService;

@Component
public class AuthenticationFilter extends AbstractGatewayFilterFactory<AuthenticationFilter.Config>{

	@Autowired
	private RouteValidator routeValidator;
	
	@Autowired
	private JWTService jwtService;
	
	public AuthenticationFilter() {
		super(Config.class);
	}
	
	public static class Config{
		
	}
	
	@Override
	public GatewayFilter apply(Config config) {
		// TODO Auto-generated method stub
		return ((exchange,chain)->{
			if(routeValidator.isSecured.test(exchange.getRequest())) {
				if(!exchange.getRequest().getHeaders().containsKey(HttpHeaders.AUTHORIZATION)) {
					throw new RuntimeException("Missing authorization Header!");
				}
				String authHeaders=exchange.getRequest().getHeaders().get(HttpHeaders.AUTHORIZATION).get(0);
				if (authHeaders != null && authHeaders.startsWith("Bearer ")) {
                    authHeaders = authHeaders.substring(7);
                }
                try {
//                	System.out.println(authHeaders);
                    jwtService.validateToken(authHeaders);
//                    System.out.println(exchange.getRequest());
                    System.out.println(routeValidator.isAdminSecured.test(exchange.getRequest()));
                    System.out.println(jwtService.getAuthority(authHeaders));
                    if(!jwtService.getAuthority(authHeaders).equals("ROLE_ADMIN") && routeValidator.isAdminSecured.test(exchange.getRequest())) {
                    	System.out.println(3333);
                    	throw new RuntimeException();
                    }

                } catch (Exception e) {
                    System.out.println("invalid access...!");
                    throw new RuntimeException("un authorized access to application");
                }
			}
			
			return chain.filter(exchange);
		});
	}

}
