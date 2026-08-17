/* ============================================================================
   TRÌNH SỬA TRỰC QUAN — Làng Văn hóa - Du lịch các dân tộc Việt Nam
   Mở trang kèm ?edit=1 → duyệt web như bình thường, bấm bút chì để sửa.
   Lưu qua Netlify Identity + Git Gateway (ghi thẳng vào content.json trên GitHub).
   ========================================================================== */
(function () {
  "use strict";

  var GG = location.origin + "/.netlify/git/github";
  var BRANCH = "main";
  var pending = {};          // { "images.hero": "/images/uploads/x.jpg", "texts.heroTitleVi": "..." }
  var uploads = [];          // [{path, base64}]
  var user = null;

  /* ---------------------------------------------------------------- styles */
  var CSS = [
    ".cmsbar{position:fixed;bottom:0;left:0;right:0;height:56px;z-index:99999;background:#12405F;color:#fff;",
    "display:flex;align-items:center;gap:14px;padding:0 18px;font-family:system-ui,Segoe UI,Roboto,sans-serif;",
    "box-shadow:0 -4px 20px rgba(0,0,0,.25)}",
    ".cmsbar b{font-size:.98rem;letter-spacing:.01em}",
    ".cmsbar .sp{flex:1}",
    ".cmsbar button,.cmsbar a.bt{border:0;border-radius:999px;padding:9px 17px;font-weight:700;font-size:.88rem;",
    "cursor:pointer;font-family:inherit;text-decoration:none;display:inline-block;transition:.2s}",
    ".cmsbar .save{background:#FFB020;color:#43290A}",
    ".cmsbar .save:disabled{opacity:.45;cursor:default}",
    ".cmsbar .ghost{background:rgba(255,255,255,.14);color:#fff}",
    ".cmsbar .cnt{background:#E5432B;color:#fff;border-radius:999px;padding:2px 10px;font-size:.8rem;font-weight:700}",
    "body.cmsedit{padding-bottom:60px}",
    ".cms-t{outline:2px dashed rgba(229,67,43,.55);outline-offset:2px;transition:outline-color .15s}",
    ".cms-t:hover{outline-color:#E5432B;outline-style:solid}",
    ".cms-pen{position:absolute;z-index:9999;background:#E5432B;color:#fff;border:0;border-radius:8px;",
    "width:30px;height:30px;cursor:pointer;font-size:15px;line-height:1;box-shadow:0 4px 12px rgba(0,0,0,.3);",
    "display:grid;place-items:center;padding:0}",
    ".cms-pen:hover{background:#C22F1C;transform:scale(1.08)}",
    ".cms-dim{position:fixed;inset:0;background:rgba(10,30,45,.55);z-index:100000;display:grid;place-items:center;padding:20px}",
    ".cms-mod{background:#fff;border-radius:16px;max-width:680px;width:100%;max-height:88vh;overflow:auto;",
    "font-family:system-ui,Segoe UI,Roboto,sans-serif;box-shadow:0 30px 80px rgba(0,0,0,.4)}",
    ".cms-mod header{padding:18px 22px;border-bottom:1px solid #e6e9ee;display:flex;align-items:center;gap:12px}",
    ".cms-mod header h3{margin:0;font-size:1.05rem;color:#12405F;flex:1}",
    ".cms-mod .x{border:0;background:#eef1f5;width:32px;height:32px;border-radius:8px;cursor:pointer;font-size:17px}",
    ".cms-mod .bd{padding:20px 22px}",
    ".cms-mod label{display:block;font-size:.82rem;font-weight:700;color:#55697A;margin:14px 0 6px;text-transform:uppercase;letter-spacing:.04em}",
    ".cms-mod label:first-child{margin-top:0}",
    ".cms-mod input[type=text],.cms-mod textarea{width:100%;box-sizing:border-box;border:1.5px solid #d8dee6;border-radius:10px;",
    "padding:11px 13px;font-size:.96rem;font-family:inherit;color:#22323E;line-height:1.5}",
    ".cms-mod textarea{min-height:96px;resize:vertical}",
    ".cms-mod input:focus,.cms-mod textarea:focus{outline:0;border-color:#12A594}",
    ".cms-mod .hint{font-size:.8rem;color:#7b8a99;margin-top:6px}",
    ".cms-mod footer{padding:16px 22px;border-top:1px solid #e6e9ee;display:flex;gap:10px;justify-content:flex-end}",
    ".cms-mod footer button{border:0;border-radius:999px;padding:11px 22px;font-weight:700;font-size:.9rem;cursor:pointer;font-family:inherit}",
    ".cms-mod .ok{background:#12A594;color:#fff}.cms-mod .no{background:#eef1f5;color:#55697A}",
    ".cms-prev{width:100%;max-height:230px;object-fit:contain;background:#f4f6f9;border-radius:10px;display:block;margin-bottom:10px}",
    ".cms-drop{border:2px dashed #c8d2dc;border-radius:12px;padding:22px;text-align:center;color:#55697A;cursor:pointer;font-size:.92rem}",
    ".cms-drop:hover{border-color:#12A594;background:#f4fbfa}",
    ".cms-toast{position:fixed;left:50%;bottom:74px;transform:translateX(-50%);z-index:100001;background:#12405F;color:#fff;",
    "padding:14px 24px;border-radius:999px;font-family:system-ui,sans-serif;font-size:.92rem;box-shadow:0 12px 40px rgba(0,0,0,.3)}",
    "body.cmsedit .fab{bottom:74px}",
    ".cms-badge{position:absolute;z-index:9998;background:#12A594;color:#fff;font-size:.68rem;font-weight:700;",
    "padding:2px 7px;border-radius:6px;font-family:system-ui,sans-serif;pointer-events:none}"
  ].join("");

  function css() { var s = document.createElement("style"); s.textContent = CSS; document.head.appendChild(s); }

  /* ------------------------------------------------------------- tiện ích */
  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
  function toast(msg, ms) {
    var t = el("div", "cms-toast", msg); document.body.appendChild(t);
    setTimeout(function () { t.remove(); }, ms || 3200);
  }
  function b64(str) {
    var bytes = new TextEncoder().encode(str), bin = "";
    for (var i = 0; i < bytes.length; i++) bin += String.fromCharCode(bytes[i]);
    return btoa(bin);
  }
  function lang() { return document.documentElement.getAttribute("lang") === "en" ? "en" : "vi"; }
  function get(obj, path) {
    return path.split(".").reduce(function (o, k) { return o == null ? o : o[k]; }, obj);
  }
  function set(obj, path, val) {
    var ks = path.split("."), o = obj;
    for (var i = 0; i < ks.length - 1; i++) { if (o[ks[i]] == null) o[ks[i]] = {}; o = o[ks[i]]; }
    o[ks[ks.length - 1]] = val;
  }
  function cur(path) { return pending[path] !== undefined ? pending[path] : get(window.SITE || {}, path); }

  /* --------------------------------------------------- thu nhỏ ảnh trước khi tải lên */
  function shrink(file, maxW, quality) {
    return new Promise(function (res, rej) {
      var img = new Image(), url = URL.createObjectURL(file);
      img.onload = function () {
        var w = img.width, h = img.height;
        if (w > maxW) { h = Math.round(h * maxW / w); w = maxW; }
        var c = document.createElement("canvas"); c.width = w; c.height = h;
        c.getContext("2d").drawImage(img, 0, 0, w, h);
        URL.revokeObjectURL(url);
        c.toBlob(function (blob) {
          var fr = new FileReader();
          fr.onload = function () { res({ base64: fr.result.split(",")[1], w: w, h: h, size: blob.size }); };
          fr.readAsDataURL(blob);
        }, "image/jpeg", quality);
      };
      img.onerror = function () { URL.revokeObjectURL(url); rej(new Error("Không đọc được ảnh")); };
      img.src = url;
    });
  }

  /* ------------------------------------------------------------ hộp thoại */
  function modal(title, buildBody, onSave) {
    var dim = el("div", "cms-dim"), mod = el("div", "cms-mod");
    var hd = el("header", null, '<h3>' + title + '</h3>');
    var x = el("button", "x", "✕"); hd.appendChild(x);
    var bd = el("div", "bd"); var ft = el("footer");
    var no = el("button", "no", "Hủy"), ok = el("button", "ok", "Áp dụng");
    ft.appendChild(no); ft.appendChild(ok);
    mod.appendChild(hd); mod.appendChild(bd); mod.appendChild(ft); dim.appendChild(mod);
    document.body.appendChild(dim);
    var api = buildBody(bd);
    function close() { dim.remove(); }
    x.onclick = no.onclick = close;
    dim.onclick = function (e) { if (e.target === dim) close(); };
    ok.onclick = function () { if (onSave(api) !== false) close(); };
    return close;
  }

  /* ----------------------------------------------------------- sửa CHỮ */
  function editText(target) {
    var isHTML = target.html;
    modal("Sửa: " + target.label, function (bd) {
      var vi = el("textarea"), en = el("textarea");
      vi.value = cur("texts." + target.vi) || "";
      en.value = cur("texts." + target.en) || "";
      bd.appendChild(el("label", null, "Tiếng Việt"));
      bd.appendChild(vi);
      if (isHTML) bd.appendChild(el("div", "hint", 'Có thể bọc &lt;em&gt;…&lt;/em&gt; quanh cụm từ muốn tô màu vàng (chữ trong đó sẽ thành màu vàng, in nghiêng).'));
      bd.appendChild(el("label", null, "Tiếng Anh"));
      bd.appendChild(en);
      bd.appendChild(el("div", "hint", "Để trống phần tiếng Anh thì trang tiếng Anh sẽ hiện nội dung tiếng Việt."));
      return { vi: vi, en: en };
    }, function (a) {
      pending["texts." + target.vi] = a.vi.value;
      pending["texts." + target.en] = a.en.value;
      var e = document.getElementById(target.id);
      if (e) {
        e.setAttribute("data-vi", a.vi.value);
        e.setAttribute("data-en", a.en.value || a.vi.value);
        e.innerHTML = lang() === "en" ? (a.en.value || a.vi.value) : a.vi.value;
      }
      bump();
    });
  }

  /* ----------------------------------------------------------- sửa ẢNH */
  function editImage(key, imgEl) {
    modal("Đổi ảnh: " + (IMG_LABELS[key] || key), function (bd) {
      var prev = el("img", "cms-prev"); prev.src = imgEl.src;
      var drop = el("div", "cms-drop", "Bấm để chọn ảnh mới từ máy<br><span style='font-size:.82rem'>Ảnh sẽ tự thu nhỏ về 1600px cho web tải nhanh</span>");
      var inp = el("input"); inp.type = "file"; inp.accept = "image/*"; inp.style.display = "none";
      var info = el("div", "hint", "");
      bd.appendChild(prev); bd.appendChild(drop); bd.appendChild(inp); bd.appendChild(info);
      var picked = null;
      drop.onclick = function () { inp.click(); };
      inp.onchange = function () {
        var f = inp.files[0]; if (!f) return;
        info.textContent = "Đang xử lý ảnh…";
        shrink(f, 1600, 0.82).then(function (r) {
          picked = { name: f.name, data: r };
          prev.src = "data:image/jpeg;base64," + r.base64;
          info.textContent = "Ảnh mới: " + r.w + "×" + r.h + "px · " + Math.round(r.size / 1024) + " KB";
        }).catch(function (e) { info.textContent = "Lỗi: " + e.message; });
      };
      return { get: function () { return picked; } };
    }, function (a) {
      var p = a.get();
      if (!p) return true;
      var safe = key + "-" + Date.now() + ".jpg";
      var path = "images/uploads/" + safe;
      uploads.push({ path: path, base64: p.data.base64 });
      pending["images." + key] = "/" + path;
      imgEl.src = "data:image/jpeg;base64," + p.data.base64;
      bump();
    });
  }

  /* ---------------------------------------------------------- sửa LIÊN KẾT */
  function editLink(key, label, hint) {
    modal("Sửa liên kết: " + label, function (bd) {
      var i = el("input"); i.type = "text"; i.value = cur("links." + key) || "";
      bd.appendChild(el("label", null, "Địa chỉ"));
      bd.appendChild(i);
      if (hint) bd.appendChild(el("div", "hint", hint));
      return { i: i };
    }, function (a) {
      pending["links." + key] = a.i.value.trim();
      bump();
    });
  }

  /* ------------------------------------------------------------ sửa VIDEO */
  function editVideo(key, label) {
    modal("Sửa video: " + label, function (bd) {
      var i = el("input"); i.type = "text"; i.value = cur("videos." + key) || "";
      bd.appendChild(el("label", null, "Link YouTube"));
      bd.appendChild(i);
      bd.appendChild(el("div", "hint", "Dán link dạng https://www.youtube.com/watch?v=… — để trống nếu chưa có video."));
      return { i: i };
    }, function (a) {
      pending["videos." + key] = a.i.value.trim();
      bump();
      toast("Đã ghi nhận. Video sẽ hiện sau khi Lưu và tải lại trang.");
    });
  }

  /* ------------------------------------------------- gắn bút chì vào phần tử */
  function attach(node, onClick, badge) {
    if (!node || node.dataset.cmsOn) return;
    node.dataset.cmsOn = "1";
    node.classList.add("cms-t");
    var pen = el("button", "cms-pen", "✎");
    pen.title = "Sửa phần này";
    pen.onclick = function (e) { e.preventDefault(); e.stopPropagation(); onClick(); };
    document.body.appendChild(pen);
    var tag = null;
    if (badge) { tag = el("div", "cms-badge", badge); document.body.appendChild(tag); }
    function place() {
      var r = node.getBoundingClientRect();
      if (r.width === 0 && r.height === 0) { pen.style.display = "none"; if (tag) tag.style.display = "none"; return; }
      pen.style.display = ""; if (tag) tag.style.display = "";
      pen.style.left = (window.scrollX + r.left + 6) + "px";
      pen.style.top = (window.scrollY + r.top + 6) + "px";
      if (tag) { tag.style.left = (window.scrollX + r.left + 42) + "px"; tag.style.top = (window.scrollY + r.top + 12) + "px"; }
    }
    place();
    window.addEventListener("scroll", place, { passive: true });
    window.addEventListener("resize", place);
    setInterval(place, 1200);
  }

  /* ------------------------------------------------------- nhãn tiếng Việt */
  var IMG_LABELS = {
    "hero": "Ảnh nền đầu trang", "gioi-thieu-1": "Giới thiệu 1", "gioi-thieu-2": "Giới thiệu 2",
    "gioi-thieu-3": "Giới thiệu 3", "khu-lang-1": "Khu Làng dân tộc I", "khu-lang-2": "Khu Làng dân tộc II",
    "khu-lang-3": "Khu Làng dân tộc III", "khu-lang-4": "Khu Làng dân tộc IV", "khu-nghi-le": "Khu Nghi lễ thờ Tổ",
    "khu-ho-tren-nui": "Khu Hồ trên núi", "ct-dau-chan-1ngay": "Poster Dấu chân bản làng 1 ngày",
    "ct-dau-chan-nuangay": "Poster Dấu chân bản làng ½ ngày", "ct-tay-nguyen-1ngay": "Poster Tây Nguyên 1 ngày",
    "ct-tay-nguyen-nuangay": "Poster Tây Nguyên ½ ngày", "luu-tru-1": "Lưu trú 1", "luu-tru-2": "Lưu trú 2",
    "luu-tru-3": "Lưu trú 3", "luu-tru-4": "Lưu trú 4", "ban-do-lang": "Bản đồ tham quan",
    "gallery-1": "Thư viện 1", "gallery-2": "Thư viện 2", "gallery-3": "Thư viện 3", "gallery-4": "Thư viện 4",
    "gallery-5": "Thư viện 5", "gallery-6": "Thư viện 6", "gallery-7": "Thư viện 7"
  };
  var SEC_LABELS = {
    "gioi-thieu": "Giới thiệu", "khong-gian": "Không gian", "trai-nghiem": "Trải nghiệm",
    "chuong-trinh": "Chương trình", "dich-vu": "Dịch vụ", "luu-tru": "Lưu trú",
    "lich-hoat-dong": "Lịch hoạt động", "su-kien": "Lịch sự kiện", "ban-do": "Bản đồ",
    "thu-vien": "Thư viện ảnh", "lien-he": "Liên hệ"
  };

  /* ------------------------------------------------------------ quét trang */
  function scan() {
    /* chữ đầu trang */
    if (document.getElementById("heroTitle"))
      attach(document.getElementById("heroTitle"), function () {
        editText({ id: "heroTitle", vi: "heroTitleVi", en: "heroTitleEn", label: "Tiêu đề đầu trang", html: true });
      }, "Tiêu đề");
    if (document.getElementById("heroLead"))
      attach(document.getElementById("heroLead"), function () {
        editText({ id: "heroLead", vi: "heroLeadVi", en: "heroLeadEn", label: "Mô tả đầu trang" });
      }, "Mô tả");

    /* tiêu đề & mô tả từng mục */
    Object.keys(SEC_LABELS).forEach(function (sid) {
      var h = document.getElementById("h2-" + sid);
      if (h) attach(h, function () {
        editText({ id: "h2-" + sid, vi: "h2." + sid + ".vi", en: "h2." + sid + ".en", label: SEC_LABELS[sid] + " — tiêu đề" });
      }, "Tiêu đề");
      var l = document.getElementById("lead-" + sid);
      if (l) attach(l, function () {
        editText({ id: "lead-" + sid, vi: "lead." + sid + ".vi", en: "lead." + sid + ".en", label: SEC_LABELS[sid] + " — mô tả" });
      }, "Mô tả");
    });

    /* ảnh */
    Array.prototype.forEach.call(document.querySelectorAll("img"), function (img) {
      var s = img.getAttribute("src") || "";
      var m = s.match(/images\/([a-z0-9-]+)\.(?:jpg|png)/i);
      if (!m) return;
      var key = m[1];
      if (!IMG_LABELS[key]) return;
      var box = img.closest(".media") || img.parentElement;
      attach(box, function () { editImage(key, img); }, IMG_LABELS[key]);
    });

    /* video */
    Array.prototype.forEach.call(document.querySelectorAll(".yt[data-yt]"), function (b) {
      var k = b.getAttribute("data-yt");
      attach(b, function () { editVideo(k, k === "gioiThieu" ? "Giới thiệu Làng" : "Hoạt động - trải nghiệm"); }, "Video");
    });

    /* liên kết mạng xã hội */
    var LINKS = [
      { key: "fanpage", sel: '.fanbtn.fb', label: "Fanpage Facebook", hint: "Ví dụ https://www.facebook.com/Langvhdl" },
      { key: "messenger", sel: '.fanbtn.msg', label: "Nhắn tin Messenger", hint: "Dạng https://m.me/TenFanpage" }
    ];
    LINKS.forEach(function (L) {
      var n = document.querySelector(L.sel);
      if (n) attach(n, function () { editLink(L.key, L.label, L.hint); }, "Liên kết");
    });
  }

  /* --------------------------------------------------------------- thanh trên */
  var bar, saveBtn, cntEl;
  function bump() {
    var n = Object.keys(pending).length;
    cntEl.textContent = n;
    cntEl.style.display = n ? "" : "none";
    saveBtn.disabled = !n;
    saveBtn.textContent = n ? "Lưu & xuất bản (" + n + ")" : "Chưa có thay đổi";
  }
  function buildBar() {
    bar = el("div", "cmsbar");
    bar.appendChild(el("b", null, "✎ Chế độ chỉnh sửa"));
    cntEl = el("span", "cnt", "0"); cntEl.style.display = "none"; bar.appendChild(cntEl);
    bar.appendChild(el("span", "sp"));
    var adm = el("a", "bt ghost", "Bảng giá &amp; lịch sự kiện"); adm.href = "/admin/"; adm.target = "_blank";
    bar.appendChild(adm);
    var out = el("button", "ghost", "Thoát"); out.onclick = function () {
      if (Object.keys(pending).length && !confirm("Còn thay đổi chưa lưu. Thoát luôn?")) return;
      location.href = location.pathname;
    };
    bar.appendChild(out);
    saveBtn = el("button", "save", "Chưa có thay đổi"); saveBtn.disabled = true; saveBtn.onclick = save;
    bar.appendChild(saveBtn);
    document.body.appendChild(bar);
    document.body.classList.add("cmsedit");
  }

  /* ------------------------------------------------------------------ lưu */
  function jwt() {
    var u = window.netlifyIdentity && window.netlifyIdentity.currentUser();
    if (!u) return Promise.reject(new Error("Phiên đăng nhập đã hết hạn. Hãy tải lại trang và đăng nhập lại."));
    user = u;
    return u.jwt();
  }

  function ggPut(path, contentB64, sha, msg) {
    return jwt().then(function (t) {
      var body = { message: msg, content: contentB64, branch: BRANCH };
      if (sha) body.sha = sha;
      return fetch(GG + "/contents/" + path, {
        method: "PUT",
        headers: { "Authorization": "Bearer " + t, "Content-Type": "application/json" },
        body: JSON.stringify(body)
      });
    }).then(function (r) {
      if (!r.ok) return r.text().then(function (t) { throw new Error(path + " → " + r.status + " " + t.slice(0, 160)); });
      return r.json();
    });
  }

  function save() {
    saveBtn.disabled = true; saveBtn.textContent = "Đang lưu…";
    var chain = Promise.resolve();

    /* 1. tải các ảnh mới lên */
    uploads.forEach(function (u) {
      chain = chain.then(function () {
        saveBtn.textContent = "Đang tải ảnh…";
        return ggPut(u.path, u.base64, null, "Tải ảnh " + u.path.split("/").pop() + " (sửa trực quan)");
      });
    });

    /* 2. đọc content.json hiện tại rồi ghi đè */
    chain = chain.then(function () {
      saveBtn.textContent = "Đang lưu nội dung…";
      return jwt();
    }).then(function (t) {
      return fetch(GG + "/contents/content.json?ref=" + BRANCH, { headers: { "Authorization": "Bearer " + t } });
    }).then(function (r) {
      if (!r.ok) throw new Error("Không đọc được content.json (" + r.status + ")");
      return r.json();
    }).then(function (f) {
      var raw = decodeURIComponent(escape(atob(f.content.replace(/\n/g, ""))));
      var data = JSON.parse(raw);
      Object.keys(pending).forEach(function (k) { set(data, k, pending[k]); });
      return ggPut("content.json", b64(JSON.stringify(data, null, 2)), f.sha,
        "Cập nhật nội dung landing page (sửa trực quan)");
    });

    chain.then(function () {
      pending = {}; uploads = []; bump();
      saveBtn.textContent = "Đã lưu ✓";
      toast("Đã lưu. Website sẽ tự cập nhật sau 1-2 phút.", 6000);
    }).catch(function (e) {
      saveBtn.disabled = false; bump();
      alert("Lưu không thành công:\n" + e.message +
        "\n\nHãy thử đăng nhập lại, hoặc dùng trang /admin/ để lưu.");
    });
  }

  /* ------------------------------------------------------------ đăng nhập */
  function start() {
    css(); buildBar(); scan();
    toast("Rê chuột lên tiêu đề, đoạn mô tả hoặc ảnh — bấm nút ✎ để sửa.", 6000);
  }

  function boot() {
    var NI = window.netlifyIdentity;
    if (!NI) { alert("Thiếu Netlify Identity. Hãy tải lại trang."); return; }

    /* Cho tien ich Identity khoi tao xong roi moi quyet dinh */
    var settled = false;
    function decide(u) {
      if (settled) return; settled = true;
      user = u || NI.currentUser();
      if (user) { start(); return; }
      NI.on("login", function (x) { user = x; NI.close(); start(); });
      NI.on("close", function () { if (!user) location.href = location.pathname; });
      NI.open("login");
    }
    NI.on("init", decide);
    setTimeout(function () { decide(NI.currentUser()); }, 1600);
  }

  if (document.readyState === "complete") setTimeout(boot, 400);
  else window.addEventListener("load", function () { setTimeout(boot, 400); });
})();
