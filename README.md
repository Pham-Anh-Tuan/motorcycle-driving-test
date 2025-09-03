# Ôn Thi Bằng Lái Xe Máy A1 (Motorcycle Driving Test)

Một ứng dụng web hỗ trợ ôn luyện lý thuyết thi bằng lái xe máy hạng A1, bao gồm phần back-end xử lý dữ liệu và front-end giao diện người dùng hiện đại.

<img width="960" height="445" alt="image" src="https://github.com/user-attachments/assets/3488dabc-872b-4027-a448-97d9c32a58f4" />


## Mô tả tổng quan

Dự án là một nền tảng ôn luyện lý thuyết thi bằng lái xe máy A1, hỗ trợ người dùng:

- Luyện tập với bộ câu hỏi phong phú và bám sát quy định.  
- Giao diện trực quan, thân thiện, tối ưu cho cả máy tính và thiết bị di động.  
- Kiểm tra nhanh và đánh giá kết quả ngay lập tức.
  
<img width="960" height="448" alt="image" src="https://github.com/user-attachments/assets/7f557734-1ca9-4023-b258-f7e679dac973" />

## Tính năng nổi bật

- **Bộ câu hỏi phong phú**: Hỗ trợ nhiều dạng câu hỏi (trắc nghiệm, đúng/sai...).  
- **Thống kê thực hành**: Hiển thị số lần làm, các câu sai để ôn lại.  
- **Responsive UI**: Tương thích trên cả desktop và mobile.  
- **Cập nhật dễ dàng**: Cấu trúc rõ ràng giúp thêm câu hỏi hoặc tính năng mới nhanh chóng.

---

## Kiến trúc dự án

Dự án chia làm hai phần chính:

### 1. Backend

- Chứa API để lấy câu hỏi, kiểm tra kết quả, lưu lịch sử người dùng.  
- Tổ chức bằng Java và Springboot để xây dựng APIs hiệu quả.  
- Mô hình RESTful API chuẩn.

### 2. Frontend

- Xây dựng với TypeScript (như thể hiện trên GitHub), kết hợp framework hiện đại ReactJs.
- Giao diện đẹp, dễ sử dụng.
- Tương tác trực tiếp với backend để hiển thị nội dung, xử lý bài thi, báo cáo kết quả.
  
<img width="960" height="448" alt="image" src="https://github.com/user-attachments/assets/12fc50a1-cace-44e9-92ec-5f28983ec19f" />

## Cài đặt & khởi chạy

Clone dự án:
```bash
git clone https://github.com/Pham-Anh-Tuan/motorcycle-driving-test.git
cd motorcycle-driving-test

cd backend
# Cài đặt phụ thuộc, ví dụ với Node.js:
npm install
# Chạy server:
npm start

cd frontend
npm install
npm run dev
