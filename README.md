# Nền tảng quản lý sự kiện

Đây là một ứng dụng web cho phép người dùng đăng ký, tìm kiếm, và đặt vé cho các sự kiện như hội thảo, hòa nhạc. Admin có thể tạo, chỉnh sửa, xóa sự kiện và xem thống kê về số lượng vé bán được. Hệ thống hỗ trợ thông báo thời gian thực khi có sự kiện mới, sử dụng Socket.IO. Backend được xây dựng bằng Node.js, Express, và MongoDB, tích hợp xác thực JWT và triển khai trên Heroku.

## Tính năng chính
- Đăng ký/đăng nhập với phân quyền người dùng (user/admin).
- Tạo, chỉnh sửa, xóa, và tìm kiếm sự kiện theo danh mục hoặc ngày.
- Đặt vé cho sự kiện và xem lịch sử vé đã đặt.
- Thông báo thời gian thực khi có sự kiện mới.
- Thống kê tổng số sự kiện và vé bán được (dành cho admin).

## Công nghệ
- **Backend**: Node.js, Express.js, MongoDB (Mongoose), Socket.IO
- **Authentication**: JSON Web Token (JWT)
- **Triển khai**: Heroku hoặc Render
- **Công cụ**: Postman (kiểm thử API), Git/GitHub (quản lý mã nguồn)

## Cơ sở dữ liệu
Sử dụng MongoDB với 3 collection chính:
- **User**: Lưu thông tin người dùng (name, email, password, role, bookedTickets).
- **Event**: Lưu thông tin sự kiện (title, description, date, location, category, price, createdBy).
- **Ticket**: Lưu thông tin vé (eventId, userId, purchaseDate).

Mối quan hệ:
- User liên kết với Ticket qua `bookedTickets` (1 user có nhiều vé).
- Event liên kết với Ticket qua `eventId` (1 sự kiện có nhiều vé).
- Event liên kết với User qua `createdBy` (1 admin tạo nhiều sự kiện).

![Sơ đồ cơ sở dữ liệu](event_sql.jpg)

## API Endpoints
Danh sách các endpoint API được thiết kế theo chuẩn RESTful để quản lý người dùng, sự kiện, vé, và thống kê.

### User Endpoints
| Phương thức | Endpoint | Mô tả | Body | Phân quyền | Trả về |
|-------------|----------|-------|------|------------|--------|
| `POST` | `/api/users/register` | Đăng ký người dùng mới | `{ "name": "string", "email": "string", "password": "string" }` | Không yêu cầu token | `{ "token": "JWT token" }` |
| `POST` | `/api/users/login` | Đăng nhập | `{ "email": "string", "password": "string" }` | Không yêu cầu token | `{ "token": "JWT token" }` |
| `GET` | `/api/users/profile` | Lấy thông tin người dùng | Không có | Yều cầu token (user/admin) | `{ "name": "string", "email": "string", "role": "string", "bookedTickets": ["ticket_id"] }` |

### Event Endpoints
| Phương thức | Endpoint | Mô tả | Body | Phân quyền | Trả về |
|-------------|----------|-------|------|------------|--------|
| `POST` | `/api/events` | Tạo sự kiện mới | `{ "title": "string", "description": "string", "date": "ISODate", "location": "string", "category": "string", "price": number }` | Yêu cầu token (admin) | Thông tin sự kiện |
| `GET` | `/api/events` | Lấy danh sách tất cả sự kiện | Không có | Không yêu cầu token | Mảng các sự kiện |
| `GET` | `/api/events/:id` | Lấy chi tiết một sự kiện | Không có | Không yêu cầu token | Thông tin sự kiện |
| `PUT` | `/api/events/:id` | Cập nhật sự kiện | Các trường cần cập nhật (như POST) | Yêu cầu token (admin) | Sự kiện đã cập nhật |
| `DELETE` | `/api/events/:id` | Xóa sự kiện | Không có | Yêu cầu token (admin) | `{ "msg": "Event deleted" }` |
| `GET` | `/api/events/search` | Tìm kiếm sự kiện | Query: `?category=string&date=ISODate` | Không yêu cầu token | Mảng các sự kiện phù hợp |

### Ticket Endpoints
| Phương thức | Endpoint | Mô tả | Body | Phân quyền | Trả về |
|-------------|----------|-------|------|------------|--------|
| `POST` | `/api/tickets` | Đặt vé cho sự kiện | `{ "eventId": "string" }` | Yêu cầu token (user) | Thông tin vé |
| `GET` | `/api/tickets/user` | Lấy danh sách vé của người dùng | Không có | Yêu cầu token (user) | Mảng các vé |

### Admin Endpoints
| Phương thức | Endpoint | Mô tả | Body | Phân quyền | Trả về |
|-------------|----------|-------|------|------------|--------|
| `GET` | `/api/admin/stats` | Xem thống kê (tổng sự kiện, vé) | Không có | Yêu cầu token (admin) | `{ "totalEvents": number, "totalTickets": number }` |

## Hướng dẫn cài đặt (Dự kiến)
(Sẽ được cập nhật sau khi hoàn thành backend)

## Link demo
(Sẽ được cập nhật sau khi triển khai trên Heroku)