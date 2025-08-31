package com.example.backend.core.utils;
import com.example.backend.userService.model.Account;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import io.jsonwebtoken.security.Keys;
import org.springframework.stereotype.Component;

import java.util.Date;
@Component
public class JwtUtil {
    private final String SECRET_KEY = "your-very-long-and-secure-secret-key-123456"; // nên để trong biến môi trường thực tế

    public String generateToken(Account account) {
        return Jwts.builder()
                .setSubject(account.getEmail())
                .claim("role", account.getRole())
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24 * 365)) // 1 năm
                .signWith(Keys.hmacShaKeyFor(SECRET_KEY.getBytes()), SignatureAlgorithm.HS256)
                .compact();
    }

    public String extractEmail(String token) {
        return Jwts.parser()
                .setSigningKey(SECRET_KEY.getBytes())
                .build()
                .parseClaimsJws(token)
                .getBody()
                .getSubject();
    }

    public boolean validateToken(String token) {
        try {
            Jwts.parser()
                    .setSigningKey(SECRET_KEY.getBytes())
                    .build()
                    .parseClaimsJws(token);
            return true;
        } catch (ExpiredJwtException ex) {
            throw ex; // Ném lại để xử lý riêng biệt
        } catch (JwtException ex) {
            return false;
        }
    }

}
