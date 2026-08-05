# Hướng dẫn tự bảo trì trang nhantran

Trang chạy bằng **Astro**. Astro không nhét JavaScript nào vào trang cho người xem —
nó chỉ là cái máy ráp sẵn HTML tĩnh lúc build. Xem xong vẫn là HTML thuần như cũ.

```
~/nhantran-site/
├── src/
│   ├── pages/
│   │   ├── index.astro          ← trang chủ
│   │   ├── blog/*.md            ← mỗi bài viết một file
│   │   ├── work/*.md            ← mỗi dự án một file
│   │   └── rss.xml.js           ← feed, tự sinh
│   ├── layouts/                 ← khuôn trang
│   ├── components/Mark.astro    ← logo
│   └── styles/global.css        ← TOÀN BỘ thiết kế nằm ở đây
├── public/favicon.svg
├── .github/workflows/deploy.yml ← push là tự deploy
└── legacy/                      ← bản một-file cũ, chỉ có dưới máy
```

**Danh sách bài viết và dự án ở trang chủ là tự sinh.** Thêm một file `.md` là nó tự
hiện lên. Không phải sửa `index.astro` nữa.

---

## Chạy dưới máy

```bash
cd ~/nhantran-site
npm run dev        # mở http://localhost:4321 — sửa file là tự cập nhật
npm run build      # dựng bản thật vào dist/
```

---

## 1. Viết một bài mới

Tạo file trong `src/pages/blog/`, tên file chính là địa chỉ web:

```markdown
---
layout: ../../layouts/Post.astro
title: Tiêu đề bài viết
date: "2026.08"
description: Một câu tóm tắt — dùng cho Google và khi share link.
---

Đoạn mở đầu. Vào thẳng vấn đề, đừng dạo đầu.

## Một tiểu mục

Câu ngắn. Câu khẳng định.
```

Xong. Trang chủ tự hiện bài mới nhất, RSS tự cập nhật.
Trang chủ chỉ hiện **3 bài mới nhất**, sắp theo `date` giảm dần.

**Tiêu đề nghĩ trước, viết sau.** Nếu bài lên Hacker News hay X, người ta bấm vào
tiêu đề chứ không bấm vào bạn.

## 2. Thêm một dự án

Tạo file trong `src/pages/work/`:

```markdown
---
layout: ../../layouts/Project.astro
order: 2                    # số thứ tự — hiện thành 002 ở trang chủ
title: tên-dự-án
status: active              # hoặc: archived
year: 2026
lede: Một câu nói rõ nó làm gì cho ai. Không tính từ.
stats:
  - { n: "60–90%", label: "tokens cut" }
links:
  - { label: "mã nguồn", href: "https://github.com/caubanhan/..." }
---

## Vấn đề
## Cách làm
## Kết quả
```

- `status: archived` → dòng ở trang chủ chuyển xám, ô vuông rỗng.
  **Cứ để dự án đã dừng ở đó.** Người tự tin mới dám liệt kê thứ mình đã bỏ.
- `stats` chưa có số thật thì **xoá hẳn đi**, đừng bịa.
- `links` để **cuối trang**, cố ý. Đừng đẩy khách ra GitHub ngay từ đầu.

**Phần quan trọng nhất là đoạn "đã bỏ"** trong mục Cách làm — hướng bạn từng cân nhắc
và lý do không đi. Nó cho thấy bạn *ra quyết định*, chứ không chỉ biết xài công cụ.
Đó là thứ phân biệt bạn với một cái README.

## 3. Sửa trang chủ

Mở `src/pages/index.astro`. Ở đó có: lời chào `Xin chào`, đoạn `class="bio"`,
dòng email, và danh sách link mạng xã hội. Ba mục `work.` / `log.` là tự sinh, đừng sửa tay.

---

## 4. Hệ thiết kế

Tất cả ở đầu `src/styles/global.css`, trong khối `:root`. Đổi một dòng là đổi cả site.

```css
--sand: #EDE8E0;   /* nền cát */
--ink:  #1B1A18;   /* chữ chính */
--mid:  #6A645C;   /* chữ phụ */
--dim:  #A8A196;   /* nhãn, ngày tháng */
--dot:  #D3CCC0;   /* chấm bi nền */
--sig:  #2F5D86;   /* xanh thép — màu nhấn DUY NHẤT, chỉ dùng khi hover */
--ease: cubic-bezier(.16, 1, .3, 1);
```

**Quy tắc:** mọi chuyển động dùng chung đúng một `--ease`. Đó là đường cong Apple hay
dùng — vào nhanh, tắt rất chậm. Thêm đường cong thứ hai là mất tính nhất quán ngay.

**Đổi sang nền tối:** `--sand` → `#0D0E10`, `--ink` → `#E6E3DE`, `--dot` → `#1E2024`,
`--dim` → `#5A5E63`, `--sig` → `#7FA8CE`, và `color-scheme: light` → `dark`.

**Lưới chấm bi:** `background-size: 12px 12px` trong `body`. Nhỏ hơn = dày hơn.
Dưới 8px bắt đầu nhiễu mắt.

**Font:** đang dùng font mono hệ thống nên mỗi máy hiện một kiểu. Muốn giống hệt mọi nơi
thì tải Geist Mono hoặc JetBrains Mono về `public/fonts/`, thêm `@font-face` vào
`global.css`, rồi đặt tên font đó lên đầu biến `--mono`.

## 5. Logo

`src/components/Mark.astro` — **một nét số 3 xoay đúng 90°**. Hai bụng của số 3 ngóc lên
thành hai vòm chữ M, chỗ thắt lưng rơi vào giữa. Không phải chữ M vẽ sẵn.

- Đổi cỡ: `<Mark size={40} />`
- Đổi độ dày: `<Mark stroke={1.4} />`. **To lên thì phải giảm số này**, không thì logo bị nặng
- `transform="rotate(-90 12 12)"` → **đừng đổi**. Đây chính là phần "úp xuống"

## 6. Hiệu ứng

**Chữ lắng thành hình** — trong `src/layouts/Base.astro`. Thứ tự do `data-seq` quyết định,
công thức chờ: `260ms + data-seq × 95ms`. Độ mạnh ở `.ch.dust` trong `global.css`.

**Vệt cát theo chuột** — trong `src/pages/index.astro`, chỉ chạy ở trang chủ.
`MAX_GRAINS` = số hạt tối đa, `FIELD_R` = bán kính chấm bi phồng quanh con trỏ.

---

## 7. Đưa lên mạng

Đã cài sẵn. **`git push` là xong** — GitHub Actions tự build và cập nhật
https://caubanhan.github.io

```bash
git add -A && git commit -m "thêm bài mới" && git push
```

Xem tiến trình ở tab **Actions** trên GitHub. Khoảng 1–2 phút.

**Muốn dùng domain riêng?** Tạo file `public/CNAME` chứa đúng tên miền, trỏ DNS về
GitHub, rồi push.

---

## 8. Những chỗ ĐỪNG đụng vào

Các bẫy đã thực sự làm trang trắng xoá lúc dựng. Ghi lại để khỏi vấp lại.

**Đừng thêm `will-change` vào `.ch`.** Trang có hàng trăm ký tự; mỗi ký tự một lớp
compositor riêng là đủ để trình duyệt gục.

**Đừng để vòng lặp `requestAnimationFrame` chạy khi không có gì để vẽ.** Code hiện tại
có kiểm tra: chuột đứng yên và chữ đã lắng xong thì nó ngủ hẳn. Giữ nguyên logic đó.

**Đừng dựng lại đám hạt trong `resize()`.** Có cờ `built` để chỉ dựng đúng một lần.
Bỏ đi thì mỗi lần resize hạt bị ném ra xa lại từ đầu, chữ không bao giờ tụ lại được.

**Đừng biến chữ thành phụ thuộc vào JavaScript.** Trang thiết kế để chữ **hiện sẵn**,
script chỉ *thêm* hiệu ứng rồi gỡ ra. JS chết thì trang vẫn đọc được.

---

## 9. Kiểm tra trước khi push

- [ ] `npm run build` không lỗi
- [ ] Thu nhỏ cửa sổ cỡ điện thoại — chuyển một cột, vẫn đọc được
- [ ] Bấm thử mọi link, không còn `href="#"` nào sót
- [ ] Bật Reduce Motion trong System Settings, load lại — chữ hiện ngay, không hiệu ứng
- [ ] Tắt JavaScript trong DevTools, load lại — **chữ vẫn phải đọc được**
- [ ] Còn `<!-- TODO -->` nào trong `src/pages/` không

---

## 10. Còn nợ

- [ ] Viết nội dung thật cho `work/rtk.md` và `work/flightwatch.md` (đang là nháp)
- [ ] Viết bài thật, xoá bài nháp `blog/2026-07-the-cost-of-a-token.md`
- [ ] Thêm dự án thứ ba — nên là một thứ bạn đã dừng
- [ ] Handle X, hoặc bỏ hẳn link đó
- [ ] Email thật (dòng `email: nhan at this domain` chỉ đúng nếu domain của bạn nhận mail)
- [ ] Ảnh Open Graph để share link ra X/Slack có preview
