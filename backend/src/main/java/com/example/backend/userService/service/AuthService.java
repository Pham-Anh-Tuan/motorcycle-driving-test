package com.example.backend.userService.service;

import com.example.backend.core.request.RegisterReq;
import com.example.backend.core.response.LoginRes;
import com.example.backend.core.utils.JwtUtil;
import com.example.backend.userService.model.Account;
import com.example.backend.userService.repository.AccountRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.security.SecureRandom;
import java.util.Map;
import java.util.Optional;
import java.util.UUID;

@Service
public class AuthService {
    @Autowired
    private AccountRepository accountRepository;

    @Autowired
    private JwtUtil jwtUtil;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    private EmailService emailService;

    public ResponseEntity<String> register(RegisterReq registerReq) {
        if (accountRepository.findByEmail(registerReq.getEmail()).isPresent()) {
            return ResponseEntity.badRequest().body("Email already exists");
        }

        Account account = new Account();
        account.setId(UUID.randomUUID().toString());
        account.setEmail(registerReq.getEmail());
        account.setFullName(registerReq.getFullName());
        account.setPassword(passwordEncoder.encode(registerReq.getPassword()));
        account.setImageName("userLogo192192adeal.png");
        account.setRole(2);
        accountRepository.save(account);

        return ResponseEntity.ok("Register successful");
    }

    public ResponseEntity<?> login(Map<String, String> request) {
        String email = request.get("email");
        String password = request.get("password");
        Optional<Account> account = accountRepository.findByEmail(email);

        if (!account.isPresent()) {
            return ResponseEntity.badRequest().body("Email not found");
        }

        if (!passwordEncoder.matches(password, account.get().getPassword())) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid password");
        }

        String token = jwtUtil.generateToken(account.get());
        Account acc = account.get();

//        if (acc.getStatus() == 0) {
//            return ResponseEntity.badRequest().body("Account blocked");
//        }

        // Trả về đối tượng LoginResponse chứa token và thông tin
        LoginRes response = new LoginRes(
                token,
                acc.getEmail(),
                acc.getFullName(),
                acc.getImageName(),
                acc.getRole()
        );

        return ResponseEntity.ok(response);
    }

    public ResponseEntity<String> changePassword(String email, String oldPassword, String newPassword) {
        Optional<Account> optionalAccount = accountRepository.findByEmail(email);

        if (optionalAccount.isEmpty()) {
            return ResponseEntity.badRequest().body("Email không tồn tại.");
        }

        Account account = optionalAccount.get();

        // Kiểm tra mật khẩu cũ
        if (!passwordEncoder.matches(oldPassword, account.getPassword())) {
            return ResponseEntity.badRequest().body("Mật khẩu cũ không đúng.");
        }

        // Nếu mật khẩu mới giống mật khẩu cũ
        if (passwordEncoder.matches(newPassword, account.getPassword())) {
            return ResponseEntity.badRequest().body("Mật khẩu mới không được giống mật khẩu cũ.");
        }

        // Cập nhật mật khẩu mới
        account.setPassword(passwordEncoder.encode(newPassword));
        accountRepository.save(account);

        return ResponseEntity.ok("Đổi mật khẩu thành công.");
    }

    public ResponseEntity<String> forgotPassword(String email) {
        Optional<Account> optionalAccount = accountRepository.findByEmail(email);

        if (optionalAccount.isEmpty()) {
            return ResponseEntity.badRequest().body("Email không tồn tại.");
        }

        Account account = optionalAccount.get();

        // Tạo mật khẩu mới ngẫu nhiên (8 ký tự bao gồm chữ và số)
        String newPassword = generateRandomPassword(8);

        // Mã hóa và cập nhật mật khẩu mới
        account.setPassword(passwordEncoder.encode(newPassword));
        accountRepository.save(account);

        // Gửi mật khẩu mới qua email (giả sử có một service gửi email)
        try {
            emailService.sendEmail(
                    email,
                    "Khôi phục mật khẩu",
                    "Mật khẩu mới của bạn là: " + newPassword
            );
        } catch (Exception e) {
            return ResponseEntity.badRequest().body("Không thể gửi email. Vui lòng thử lại sau.");
        }

        return ResponseEntity.ok("Mật khẩu mới đã được gửi đến email của bạn.");
    }

    private String generateRandomPassword(int length) {
        String chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
        SecureRandom random = new SecureRandom();
        StringBuilder sb = new StringBuilder();

        for (int i = 0; i < length; i++) {
            sb.append(chars.charAt(random.nextInt(chars.length())));
        }

        return sb.toString();
    }

}
