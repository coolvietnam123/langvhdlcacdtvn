# Hướng dẫn quản trị landing page Làng Văn hóa - Du lịch các dân tộc Việt Nam

Tài liệu này gồm 2 phần:

- **Phần A — Cài đặt một lần** (người phụ trách kỹ thuật làm, khoảng 20 phút)
- **Phần B — Sử dụng hằng ngày** (cán bộ biên tập, không cần biết kỹ thuật)

---

## PHẦN A — CÀI ĐẶT MỘT LẦN

Trang quản trị hoạt động theo cơ chế: biên tập viên sửa nội dung trên web → nội dung được lưu vào kho mã nguồn trên GitHub → Netlify tự động cập nhật lại website. Vì vậy cần đưa website lên GitHub một lần.

### Bước 1. Tạo kho mã nguồn trên GitHub

1. Đăng nhập <https://github.com> (chưa có tài khoản thì đăng ký miễn phí).
2. Bấm nút **+** góc trên bên phải → **New repository**.
3. Đặt tên, ví dụ `lang-van-hoa-website`. Chọn **Private** nếu không muốn công khai mã nguồn.
4. **Không** tích chọn "Add a README file". Bấm **Create repository**.
5. Ở màn hình tiếp theo, chọn dòng **uploading an existing file**.
6. Giải nén tệp `landing-page-lang-van-hoa-website.zip`, rồi kéo **toàn bộ nội dung bên trong** (tệp `index.html`, các thư mục `admin`, `images`, `assets`, `videos`, tệp `content.json`, `_headers`…) vào ô tải lên.

   > Lưu ý: kéo *nội dung bên trong* thư mục, **không** kéo cả thư mục cha.

7. Bấm **Commit changes**.

### Bước 2. Nối Netlify với GitHub

1. Đăng nhập <https://app.netlify.com>, mở site `langvhdlcacdantocvietnam`.
2. Vào **Site configuration → Build & deploy → Continuous deployment** → bấm **Link repository**.
3. Chọn **GitHub**, cho phép Netlify truy cập, rồi chọn kho vừa tạo.
4. Phần **Build settings** để trống:
   - Build command: *(để trống)*
   - Publish directory: `.` (dấu chấm)
5. Bấm **Deploy**.

Từ đây, mỗi lần biên tập viên bấm Lưu, website sẽ tự cập nhật sau khoảng 1-2 phút.

### Bước 3. Bật đăng nhập cho biên tập viên

1. Trong Netlify, vào tab **Integrations** (hoặc **Identity**) → bật **Netlify Identity**.
2. Vào **Identity → Services → Git Gateway** → bấm **Enable Git Gateway**.
3. Vào **Identity → Registration preferences** → chọn **Invite only**
   (chỉ người được mời mới đăng nhập được — an toàn hơn).

### Bước 4. Mời người dùng

1. Vào tab **Identity** → **Invite users** → nhập email của từng cán bộ biên tập.
2. Họ nhận email mời → bấm **Accept the invite** → đặt mật khẩu → được đưa thẳng vào trang quản trị.

### Bước 5. Kiểm tra

Mở `https://langvhdlcacdantocvietnam.netlify.app/admin/` — phải hiện màn hình đăng nhập.

---

## PHẦN B — SỬ DỤNG HẰNG NGÀY

### Đăng nhập

Mở địa chỉ: **https://langvhdlcacdantocvietnam.netlify.app/admin/**
Nhập email và mật khẩu đã đặt.

### Thay ảnh

1. Ở cột trái chọn **Nội dung Landing page → 🖼 Ảnh trên trang**.
2. Tìm đúng ô ảnh cần đổi (mỗi ô đã ghi rõ vị trí, ví dụ *"Khu Làng dân tộc II"*, *"Lưu trú 2 - Bể bơi vô cực"*).
3. Bấm vào ảnh → **Upload** → chọn ảnh mới từ máy → **Choose selected**.
4. Bấm **Save** (góc trên bên trái).
5. Chờ 1-2 phút rồi mở lại website, nhấn **Ctrl + F5** để thấy ảnh mới.

**Khuyến nghị về ảnh:**

| Vị trí | Tỉ lệ nên dùng | Kích thước gợi ý |
|---|---|---|
| Ảnh nền đầu trang | ngang 16:9 | 2400 × 1350 px |
| Giới thiệu 1 | dọc 3:4 | 1200 × 1600 px |
| Giới thiệu 2, 3 | vuông 1:1 | 1400 × 1400 px |
| Các khu làng, lưu trú | ngang 4:3 | 1500 × 1125 px |
| Ảnh chương trình | dọc (poster) | giữ nguyên khổ poster |
| Thư viện ảnh | ngang 4:3 | 1500 × 1125 px |

Ảnh nên **nhỏ hơn 1 MB** để trang tải nhanh. Ảnh chụp từ điện thoại thường nặng 5-10 MB — nên giảm dung lượng trước khi tải lên (dùng <https://squoosh.app> hoặc tính năng "Resize" của Windows).

### Thay video

1. Tải video lên kênh YouTube của Làng, đặt chế độ **Công khai** hoặc **Không công khai (Unlisted)**.
2. Sao chép đường dẫn video, dạng `https://www.youtube.com/watch?v=xxxxxxxx`.
3. Trong trang quản trị, mục **Video YouTube**, dán vào ô tương ứng → **Save**.

Để trống ô nào thì vị trí đó hiển thị ảnh minh họa thay cho video.

### Sửa chữ ở đầu trang

Mở mục **Chữ ở đầu trang**. Có 4 ô: tiêu đề lớn và mô tả ngắn, mỗi loại một bản tiếng Việt và một bản tiếng Anh. Nhớ sửa **cả hai ngôn ngữ** để trang tiếng Anh không bị lệch nội dung.

Muốn tô màu vàng một cụm từ trong tiêu đề thì bọc cụm đó trong `<em>` và `</em>`,
ví dụ: `Nơi hội tụ <em>sắc màu văn hóa</em> Việt Nam`.


### Sửa bảng giá

Mở mục **💰 Bảng giá**. Có 4 nhóm, bấm vào từng nhóm để mở ra:

| Nhóm | Nội dung sửa được |
|---|---|
| Giá chương trình theo đoàn | 4 chương trình, mỗi chương trình có các bậc giá theo quy mô đoàn (từ… đến… bao nhiêu khách, giá mỗi khách). Bấm **Add** để thêm bậc, biểu tượng thùng rác để xóa bậc. |
| Giá vé tham quan | Người lớn, sinh viên, học sinh, người 60+ |
| Giá xe điện | Vé liên tuyến người lớn, vé ưu đãi, xe theo tour tính theo giờ |
| Giá phòng lưu trú | 4 hạng phòng, mỗi hạng có 4 mức giá: qua đêm ngày thường / cuối tuần, trong ngày ngày thường / cuối tuần |

**Nhập số tiền không có dấu chấm**: gõ `30000`, không gõ `30.000`. Trang web sẽ tự hiển thị thành *30.000 đ*.

> Quan trọng: sửa ở đây thì **bảng giá hiển thị** và **công cụ tính chi phí tự động** đều đổi theo. Không cần sửa hai nơi.

### Sửa lịch sự kiện

Mở mục **📅 Lịch sự kiện theo tháng**. Mỗi thẻ là một tháng.

- **Thêm tháng mới**: bấm **Add Tháng** ở cuối danh sách.
- **Xóa tháng đã qua**: bấm biểu tượng thùng rác ở thẻ đó.
- **Đổi thứ tự**: kéo thả các thẻ.
- Trong mỗi tháng: điền tên tháng, chủ đề ngắn, tiêu đề sự kiện, rồi thêm từng dòng hoạt động ở mục **Các hoạt động**.

Mỗi ô đều có bản tiếng Việt và tiếng Anh. Nếu để trống ô tiếng Anh, trang tiếng Anh sẽ hiển thị nội dung tiếng Việt.

### Sửa tiêu đề và mô tả các mục

Mở mục **✍️ Chữ trên trang**. Ở đây có tiêu đề lớn và đoạn mô tả ngắn của từng mục trên trang: Giới thiệu, Không gian, Trải nghiệm, Chương trình, Dịch vụ, Lưu trú, Lịch hoạt động, Lịch sự kiện, Bản đồ, Thư viện, Liên hệ.

Nhớ sửa **cả bản tiếng Việt và tiếng Anh**.

### Sửa liên kết mạng xã hội

Mục **Liên kết mạng xã hội**: fanpage Facebook, Messenger, TikTok, website. Sửa ở đây sẽ đổi đồng loạt mọi vị trí trên trang.

---

## CÂU HỎI THƯỜNG GẶP

**Sửa xong nhưng website chưa đổi?**
Netlify cần 1-2 phút để cập nhật. Sau đó nhấn **Ctrl + F5** để xóa bộ nhớ đệm trình duyệt.

**Lỡ sửa sai, muốn quay lại như cũ?**
Mọi thay đổi đều được lưu lịch sử trên GitHub. Vào kho mã nguồn → tab **Commits** → chọn bản trước đó → **Revert**. Nếu không rành, báo người phụ trách kỹ thuật.

**Sửa bảng giá xong, công cụ tính chi phí có tự cập nhật không?**
Có. Bảng giá hiển thị trên trang và công cụ "Đặt lịch & tính chi phí" dùng chung một nguồn dữ liệu, nên chỉ cần sửa một chỗ.

**Trang quản trị báo lỗi "Failed to load config.yml"?**
Kiểm tra tệp `admin/config.yml` đã có trên GitHub chưa, và tên nhánh trong tệp (`branch: main`) có khớp với nhánh thật của kho mã nguồn không.

**Ảnh cũ có bị mất không?**
Không. Ảnh mới tải lên nằm trong `images/uploads`, ảnh cũ vẫn còn trong `images`. Trang chỉ đơn giản trỏ sang ảnh mới.

---

## CẤU TRÚC THƯ MỤC

```
index.html                  Trang web chính
content.json                Nội dung do trang quản trị ghi ra (ảnh, video, bảng giá, lịch sự kiện, chữ, liên kết)
admin/index.html            Trang quản trị
admin/config.yml            Khai báo các ô nội dung sửa được
images/                     Ảnh gốc của trang
images/uploads/             Ảnh do biên tập viên tải lên
assets/                     Logo, mã QR
videos/                     (dự phòng, hiện dùng YouTube)
_headers                    Cấu hình bộ nhớ đệm cho Netlify
```

Nếu `content.json` bị xóa hoặc lỗi, website vẫn chạy bình thường với ảnh và nội dung gốc — không bị trắng trang.
