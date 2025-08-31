package com.example.backend.core.security;

import com.example.backend.userService.model.Account;
import com.example.backend.userService.repository.AccountRepository;
import com.example.backend.userService.service.JwtService;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import java.io.IOException;
import java.net.URLEncoder;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Component
public class CustomOAuth2SuccessHandler implements AuthenticationSuccessHandler {

    @Autowired
    private JwtService jwtService;

    @Autowired
    private AccountRepository accountRepository;

    @Override
    public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
                                        Authentication authentication) throws IOException, ServletException {

        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();
        String email = oAuth2User.getAttribute("email");
        String name = oAuth2User.getAttribute("name");
        String role = "2";

        Object pictureAttr = oAuth2User.getAttribute("picture");
        String imageName = null;
        if (pictureAttr instanceof String) {
            imageName = (String) pictureAttr;
        } else if (pictureAttr instanceof Map<?, ?>) {
            Map<?, ?> pictureMap = (Map<?, ?>) pictureAttr;
            Object data = pictureMap.get("data");
            if (data instanceof Map<?, ?>) {
                Object url = ((Map<?, ?>) data).get("url");
                if (url instanceof String) {
                    imageName = (String) url;
                }
            }
        }

        // Kiểm tra xem user đã tồn tại chưa
        Optional<Account> accountOptional = accountRepository.findByEmail(email);

        Account account;
        if (accountOptional.isEmpty()) {
            // 🆕 Chưa có → tạo mới
            account = new Account();
            account.setId(UUID.randomUUID().toString());
            account.setEmail(email);
            account.setFullName(name);
            if (imageName == null) {
                imageName = "userLogo192192adeal.png";
            }
            account.setImageName(imageName);
            account.setRole(2);
            account.setPassword("GOOGLE_LOGIN");
            accountRepository.save(account);
        } else {
            // ✅ Nếu đã tồn tại, có thể cập nhật thông tin nếu muốn
            account = accountOptional.get();
//            if (account.getStatus() == 0) {
//                String redirectUrl = "https://kushoe.xyz?error=" + URLEncoder.encode("Tài khoản này đã bị khóa.", "UTF-8");
//                response.sendRedirect(redirectUrl);
//                return;
//            }
            imageName = account.getImageName();
            role = String.valueOf(account.getRole());
        }

        // Tạo JWT
        String jwtToken = jwtService.generateToken(email);

        // Encode các giá trị để tránh lỗi URL
        String redirectUrl = String.format(
                "http://localhost:5173/oauth2-redirect?token=%s&email=%s&imageName=%s&role=%s",
                URLEncoder.encode(jwtToken, "UTF-8"),
                URLEncoder.encode(email, "UTF-8"),
                URLEncoder.encode(imageName, "UTF-8"),
                URLEncoder.encode(role, "UTF-8")
        );

        response.sendRedirect(redirectUrl);
    }
}
