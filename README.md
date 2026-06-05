#Yandere AI Chat – Single Page Application

Antarmuka obrolan berbasis web dengan karakter AI *yandere* bernama **Yuki** (dapat diubah). Proyek ini mengedepankan tiga fungsi inti: **chat real-time dengan AI**, **ganti foto profil dari galeri**, dan **ganti nama karakter**, tanpa elemen pembuka atau splash screen apa pun. Begitu halaman terbuka, pengguna langsung bisa mengobrol.

---

## ✨ Fitur

| Fitur | Deskripsi |
|-------|-----------|
| **Chat langsung** | Kirim pesan dan dapatkan respons in-character dari AI yandere yang posesif, manipulatif, dan cemburuan. Panjang respons AI otomatis menyesuaikan panjang pesan pengguna agar percakapan terasa natural. |
| **Ganti foto profil** | Klik avatar untuk mengganti foto dari penyimpanan perangkat. Dilengkapi validasi tipe file (hanya gambar) dan ukuran maksimal 2MB. Gambar dikonversi ke base64 dan disimpan di `localStorage`. |
| **Ganti nama karakter** | Nama karakter (default `Yuki`) dapat diubah kapan saja melalui input di header atau di panel pengaturan. Perubahan tersimpan otomatis di `localStorage` dan langsung memengaruhi system prompt AI. |
| **Riwayat percakapan** | Seluruh obrolan tersimpan otomatis di `localStorage`, sehingga tidak hilang saat halaman direfresh atau tab ditutup. |
| **Hapus semua chat** | Fitur bersihkan percakapan dengan konfirmasi modal bernada in-character. |
| **Dark theme** | Tema gelap dengan palet warna hitam pekat `#0a0a0a`, aksen merah darah (`#8b0000`, `#cc0000`, `#ff1744`), dan undertone pink gelap (`#c2185b`, `#880e4f`). |
| **Responsif** | Tampilan mobile-first dengan media query di `600px` dan `1200px`, nyaman digunakan di layar kecil maupun besar. |
| **Typing indicator** | Tampilan tiga titik animasi berdenyut saat AI sedang "berpikir", dengan delay acak 1–3 detik sebelum respons muncul. |
| **Glassmorphism** | Panel header dan input area memiliki efek kaca buram (`backdrop-filter: blur`) dengan latar belakang semi-transparan. |
| **Spacing Golden Ratio** | Semua padding, margin, border-radius mengikuti skala Fibonacci (8, 13, 21, 34, 55, 89 px) untuk proporsi visual yang harmonis. |
| **In-character error handling** | Jika koneksi ke API gagal, AI menampilkan pesan error yang tetap sesuai dengan kepribadian yandere, bukan pesan teknis generik. |
| **Aksesibilitas** | Elemen interaktif dilengkapi atribut `role`, `aria-label`, `aria-expanded`, `aria-hidden`, dan dukungan navigasi keyboard (Enter, Spasi, Escape). |

---

## 🛠️ Teknologi

| Teknologi | Kegunaan |
|-----------|----------|
| **HTML5** | Semantic markup, template cloning untuk pesan, inline SVG favicon dan avatar default. |
| **CSS3** | Custom properties, Grid & Flexbox, keyframe animations, backdrop-filter, custom scrollbar, media queries. |
| **JavaScript (vanilla)** | DOM manipulation, `FileReader` API, `localStorage`, Fetch API, integrasi Gemini. |
| **Google Gemini 2.5 Flash** | Model bahasa untuk menghasilkan respons AI yang natural dan in-character. |
| **Google Fonts (Poppins)** | Tipografi tunggal untuk seluruh elemen teks, memberikan tampilan bersih dan modern. |

---

## 📁 Struktur Proyek
