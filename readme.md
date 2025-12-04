# BTL2 - Hệ Cơ Sở Dữ Liệu: Shopee Management System

Ứng dụng quản lý cơ sở dữ liệu Shopee, bao gồm các chức năng quản lý người dùng, báo cáo khách hàng VIP và gợi ý sản phẩm thông minh sử dụng thuật toán Recommendation Engine.

---

## 👨‍💻 Thành viên nhóm

- **Lớp:** [L12]
- **Nhóm:** [GROUP 6]
- **Thành viên:**
  1. [Nguyen Duc Trung Kien] - [2311734]
  2. [Nguyen Quang Tung] - [2313817]
  3. [Nguyen Phan Manh Dung] - [2310559]
  4. [Huynh Kim Quy] - [2312894]
  5. [Nguyen Minh Duc] - [2310785]

---

## 🛠 Công nghệ sử dụng

- **Backend:** Node.js, Express.js
- **Language:** TypeScript
- **Database:** Microsoft SQL Server
- **Frontend:** EJS (Embedded JavaScript Templates)
- **Styling:** Tailwind CSS v4
- **Code Quality:** ESLint, Husky
- **Configuration:** Dotenv

---

## ⚙️ Yêu cầu cài đặt (Prerequisites)

Trước khi chạy chương trình, máy tính cần cài đặt:

1.  **Node.js** (Phiên bản 18 trở lên).
2.  **SQL Server** (2019 hoặc mới hơn).
3.  **SQL Server Management Studio (SSMS)**.
4.  **Git** (để clone dự án).

---

## 📥 Hướng dẫn Cài đặt & Cấu hình

### 1. Cài đặt Source Code

Mở Terminal (CMD/PowerShell) tại thư mục muốn lưu dự án:

```bash
# Clone dự án (hoặc giải nén file zip nộp bài)
git clone <link-repo-cua-ban>
cd BTL_Database

# Cài đặt các thư viện cần thiết
npm install
```

### 2. Thiết lập Cơ sở dữ liệu (SQL Server)

Mở SSMS và chạy các file script SQL theo **đúng thứ tự** sau để đảm bảo không bị lỗi khóa ngoại, các file script SQL được lưu ở thư mục **public/3.Final**:

1.  `3.0.CreateTable.sql` (Tạo cấu trúc bảng)
2.  `3.1.Data.sql` (Nhập dữ liệu mẫu)
3.  `3.2.Procedure.sql` (Tạo thủ tục lưu trữ)
4.  `3.3.Trigger.sql` (Tạo Triggers)
5.  `3.4.Function.sql` (Tạo Hàm)
6.  `3.5.Testing.sql` (Dữ liệu test bổ sung - Tùy chọn)

**Lưu ý quan trọng:**

- Đảm bảo SQL Server đã bật giao thức **TCP/IP** (Trong SQL Server Configuration Manager -> SQL Server Network Configuration -> Protocols -> TCP/IP -> Enabled).
- Restart lại SQL Server Service sau khi bật TCP/IP.

### 3. Cấu hình Biến môi trường (.env)

Dự án sử dụng biến môi trường để bảo mật thông tin kết nối:

1. Tại thư mục gốc, copy file .env.example thành file .env
2. Mở file .env và điền thông tin SQL Sever của bạn

### 4. Chạy chương trình

## Terminal: Chạy Server (Backend)

```bash
npm run dev
```

Sever sẽ chạy tại: http://localhost:3000
