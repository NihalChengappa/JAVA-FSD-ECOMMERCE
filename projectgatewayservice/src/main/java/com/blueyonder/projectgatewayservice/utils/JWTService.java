package com.blueyonder.projectgatewayservice.utils;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jws;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.io.Decoders;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;

import java.security.Key;
import java.util.Base64;

@Component
public class JWTService {

    public static final String SECRET = "5367566B59703373367639792F423F4528482B4D6251655468576D5A71347437";

    public void validateToken(final String token) {
        Jwts.parserBuilder().setSigningKey(getSignKey()).build().parseClaimsJws(token);
    }

    private Key getSignKey() {
        byte[] keyBytes = Decoders.BASE64.decode(SECRET);
        return Keys.hmacShaKeyFor(keyBytes);
    }
    
    public String getClaims(String token) {
    	String[] chunks = token.split("\\.");
    	Base64.Decoder decoder = Base64.getUrlDecoder();

//    	String header = new String(decoder.decode(chunks[0]));
    	String payload = new String(decoder.decode(chunks[1]));
		return payload;
    	
    }
    public String getAuthority(String token) {
        String payload = getClaims(token);

        ObjectMapper objectMapper = new ObjectMapper();
        try {
            JsonNode payloadJson = objectMapper.readTree(payload);
            JsonNode roleNode = payloadJson.get("role");
            if (roleNode != null && roleNode.isArray() && roleNode.size() > 0) {
                return roleNode.get(0).get("authority").asText();
            } else {
                return null; // No "role" claim or empty array
            }
        } catch (Exception e) {
            // Handle parsing exception
            e.printStackTrace();
            return null;
        }
    }
    
}
