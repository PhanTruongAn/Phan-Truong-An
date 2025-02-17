# **Module API Service Specification**

## **Mục đích**

Module này cung cấp các API phục vụ cho việc đăng nhập, đăng ký, hiển thị danh sách điểm số người dùng và thực hiện hành động thay đổi điểm số theo đó bảng điểm số sẽ được cập nhật theo thời gian thực. Hệ thống sẽ xác thực người dùng bằng JWT trước khi xử lí các yêu cầu HTTP từ họ.

## **Cấu trúc Module**

1. **Controller**: Xử lý các yêu cầu HTTP từ người dùng, gọi các service thích hợp để xử lý dữ liệu, và trả về phản hồi.
2. **Service**: Chứa logic xử lý nghiệp vụ chính.
3. **Model**: Đại diện cho cấu trúc dữ liệu trong cơ sở dữ liệu, sử dụng ORM (Sequelize) để tương tác với cơ sở dữ liệu.
4. **Route**: Định nghĩa các endpoint của API, ánh xạ các URL đến các controller và service.

## **Flow API Request**

1. **Người dùng** gửi yêu cầu HTTP (GET, POST, PUT, DELETE) tới **Controller**.
2. **Controller** nhận yêu cầu và chuyển tiếp đến **Service** tương ứng.
3. **Middleware** Thực hiển xác thực người dùng trước khi chuyển tiếp yêu cầu người dùng đến **Service**.
4. **Service** thực hiện xử lý nghiệp vụ và truy vấn hoặc thao tác trên **Model**.
5. **Model** tương tác với cơ sở dữ liệu và trả kết quả về **Service**.
6. **Service** trả kết quả về **Controller**.
7. **Controller** trả kết quả cho người dùng dưới dạng phản hồi HTTP (JSON, Status Code).

## **Các API Endpoints**

- **Response**: Tất cả response trả về đều có dạng : `{ "status": "success"|"failure, "message": string,"data":T}`. Dữ liệu trả về sẽ được gán vào data, message và status sẽ tùy vào trạng thái và chức năng từng API.

### **GET /users**

- **Mô tả**: Lấy danh sách 10 người dùng có điểm số cao nhất.
- **Phương thức**: GET
- **Trả về**: Danh sách người dùng dưới dạng JSON.

### **POST /register**

- **Mô tả**: Tạo một người dùng mới.
- **Phương thức**: POST
- **Body**: `{ "username": "John Doe", "password": "123" }`
- **Trả về**: Thông tin người dùng mới tạo, mã trạng thái 200.

### **PUT /users**

- **Mô tả**: Người dùng thực hiện hành động thay đổi điểm số của họ.
- **Phương thức**: PUT
- **Body**: `{ "username": "John Doe","score":10 }`
- **Trả về**: Không trả về dữ liệu, chỉ trả về thông báo thành công.

## **Các cân nhắc về hệ thống**

- Tất cả các API có thể cần mã trạng thái HTTP phù hợp hơn (201,400,404, 500, v.v.).
- API cần có khả năng kiểm tra tính hợp lệ của dữ liệu đầu vào (validation).
- Triển khai các biện pháp để hạn chế tần suất gọi API liên tục từ người dùng.
- Cần phải lưu trữ cache dữ liệu để có thể hạn chế gọi dữ liệu giảm tải cho server và cải thiện hiệu suất.
