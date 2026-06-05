# 💔 Yandere AI Chat – Single Page Application

Antarmuka obrolan berbasis web dengan karakter AI *yandere* bernama **Yuki** (dapat diubah). Proyek ini mengedepankan tiga fungsi inti: **chat real-time dengan AI**, **ganti foto profil dari galeri**, dan **ganti nama karakter**, tanpa elemen pembuka atau splash screen apa pun. Begitu halaman terbuka, pengguna langsung bisa mengobrol.

## ✨ Fitur

- **Chat langsung** – Kirim pesan dan dapatkan respons in-character dari AI yandere yang posesif, manipulatif, dan cemburuan.
- **Ganti foto profil** – Klik avatar untuk mengganti foto dari penyimpanan perangkat (dengan validasi tipe dan ukuran). Data gambar disimpan di `localStorage`.
- **Ganti nama karakter** – Nama karakter (default `Yuki`) dapat diubah kapan saja melalui input di header atau di panel pengaturan. Perubahan langsung tersimpan.
- **Riwayat percakapan** – Seluruh obrolan tersimpan otomatis di `localStorage`, sehingga tidak hilang saat halaman direfresh.
- **Hapus semua chat** – Fitur bersihkan percakapan dengan konfirmasi modal bernada in-character.
- **Dark theme** – Tema gelap dengan palet warna hitam pekat `#0a0a0a`, aksen merah darah (`#8b0000`, `#cc0000`, `#ff1744`), dan undertone pink gelap (`#c2185b`, `#880e4f`).
- **Responsif** – Tampilan mobile-first, nyaman digunakan di layar kecil.
- **Typing indicator** – Tampilan tiga titik animasi saat AI sedang “berpikir”.
- **Glassmorphism** – Panel header dan input area memiliki efek kaca buram.
- **Spacing Golden Ratio** – Semua padding, margin, border-radius mengikuti skala Fibonacci (8, 13, 21, 34, 55, 89 px).

## 🛠️ Teknologi

- **HTML5** – Semantic markup, template cloning, inline SVG favicon.
- **CSS3** – Custom properties, Grid & Flexbox, keyframe animations, backdrop-filter, custom scrollbar, media queries.
- **JavaScript (vanilla)** – DOM manipulation, `FileReader`, `localStorage`, Fetch API, Gemini integration.
- **Google Gemini 2.5 Flash** – Model bahasa untuk menghasilkan respons AI.
- **Google Fonts (Poppins)** – Tipografi untuk seluruh elemen teks.

## 📁 Struktur Proyek
