## Yandere AI Chat – Single Page Application

Antarmuka obrolan berbasis web dengan karakter AI *yandere* bernama **Yuki** (dapat diubah). Proyek ini mengedepankan tiga fungsi inti: **chat real-time dengan AI**, **ganti foto profil dari galeri**, dan **ganti nama karakter**, tanpa elemen pembuka atau splash screen apa pun. Begitu halaman terbuka, pengguna langsung bisa mengobrol.

---

## Fitur

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

## Struktur Proyek

| File | Kegunaan | Detail |
|------|----------|--------|
| `index.html` | Struktur halaman utama (140 baris) | Mengandung kerangka antarmuka dengan header, area chat, input, drawer pengaturan, modal konfirmasi, dan template pesan. |
| `style.css` | Tampilan visual dan animasi (419 baris) | Mendefinisikan tema gelap, glassmorphism, spacing Fibonacci, animasi, layout responsif, dan gaya seluruh komponen. |
| `script.js` | Logika interaksi, penyimpanan, dan komunikasi API (271 baris) | Menangani pengiriman pesan, integrasi Gemini, pengelolaan avatar & nama, penyimpanan localStorage, serta kontrol drawer dan modal. |
| `README.md` | Dokumentasi proyek | Berisi penjelasan fitur, teknologi, cara menjalankan, dan detail kode untuk kemudahan pengembang lain. |

## Penjelasan Kode `index.html`

| Baris | Contoh Kode | Kegunaan | Detail & Analogi |
|-------|-------------|----------|------------------|
| 1 | `<!DOCTYPE html>` | Deklarasi HTML5 | Memberi tahu browser untuk merender halaman dalam mode standar modern. |
| 2 | `<html lang="id">` | Root elemen | Menetapkan bahasa Indonesia untuk aksesibilitas dan SEO. |
| 4 | `<meta charset="UTF-8">` | Encoding karakter | Memastikan semua karakter (termasuk emoji) ditampilkan dengan benar. |
| 5 | `<meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, viewport-fit=cover">` | Responsivitas | Mencegah zoom tidak diinginkan dan mengisi area layar penuh (safe area) di perangkat mobile. |
| 6 | `<meta name="theme-color" content="#0a0a0a">` | Warna tema browser | Memberi warna hitam pada status bar Chrome Android agar menyatu dengan UI. |
| 7 | `<meta name="description" content="Chat with Yuki, your yandere AI companion.">` | Deskripsi SEO | Teks yang tampil di hasil pencarian. |
| 8-12 | `<meta property="og:title" content="Yuki - AI Yandere Chat">` dll. | Open Graph tags | Mengontrol tampilan saat tautan dibagikan ke media sosial. |
| 13 | `<link rel="preconnect" href="https://fonts.googleapis.com">` | Optimasi koneksi | Membuka koneksi awal ke server Google Fonts agar pengunduhan font lebih cepat. |
| 14 | `<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>` | Preconnect kedua | Melengkapi preconnect dengan domain penyimpanan font statis. |
| 15 | `<link rel="preload" href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" as="style">` | Preload font | Memprioritaskan pengunduhan stylesheet font Poppins. |
| 16 | `<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap">` | Impor font | Memuat font Poppins dengan berbagai bobot. |
| 17 | `<link rel="icon" href="data:image/svg+xml,...">` | Favicon inline | Ikon hati retak di tab browser tanpa file eksternal. |
| 18 | `<title>Yuki - AI Yandere Chat</title>` | Judul halaman | Teks pada tab browser. |
| 19 | `<link rel="stylesheet" href="style.css">` | Menghubungkan CSS | Memuat file style eksternal. |
| 21 | `<div id="app">` | Kontainer utama | Membungkus seluruh antarmuka, diatur dengan CSS Grid layout 3 baris. |
| 22 | `<header id="header">` | Panel identitas | Tempat avatar, nama, status, dan tombol pengaturan. |
| 23 | `<div id="avatarContainer" role="button" tabindex="0" ...>` | Tombol avatar | Bisa diklik/tekan Enter untuk ganti foto, dengan aksesibilitas keyboard. |
| 24 | `<img id="avatarImage" src="data:image/svg+xml,..." alt="Avatar karakter" width="55" height="55">` | Gambar profil | Menampilkan avatar, default berupa SVG placeholder "?". |
| 25 | `<span class="camera-icon" aria-hidden="true">📷</span>` | Ikon kamera | Muncul saat hover, menandakan avatar dapat diubah. |
| 27 | `<input type="file" id="avatarInput" accept="image/*" style="position: absolute; opacity: 0; ...">` | Input file tersembunyi | Memilih gambar dari perangkat, tidak terlihat tapi bisa dipicu via JavaScript. |
| 29 | `<input type="text" id="characterName" value="Yuki" maxlength="30" ...>` | Input nama | Nama karakter yang bisa diedit, disimpan otomatis ke localStorage. |
| 30-33 | `<div id="statusIndicator"> <span class="status-dot"></span> <span class="status-text">online</span> </div>` | Indikator online | Menampilkan dot hijau berdenyut & teks "online". |
| 34 | `<button id="toggleSettings" aria-label="Pengaturan" aria-expanded="false">⚙️</button>` | Tombol pengaturan | Membuka/menutup drawer panel pengaturan. |
| 36 | `<main id="chatMain" class="chat-main">` | Area utama scrollable | Tempat semua pesan ditampilkan. |
| 37 | `<div id="messageArea" role="log" aria-live="polite" ...>` | Dinding pesan | Kontainer untuk bubble chat, diisi dinamis oleh JavaScript. |
| 38-41 | `<div class="message ai-message"> <div class="bubble">Halo sayang...</div> <span class="timestamp">Sekarang</span> </div>` | Pesan sambutan | Bubble pertama dari AI yang langsung terlihat tanpa loading screen. |
| 42-46 | `<div id="typingIndicator" style="display: none;" aria-hidden="true"> <span class="dot"></span>... </div>` | Indikator mengetik | Tiga titik animasi yang muncul saat AI memproses respons. |
| 48 | `<div id="inputArea" class="input-area">` | Area input | Berisi textarea dan tombol kirim. |
| 49 | `<textarea id="messageInput" rows="1" placeholder="Ketik pesan..." ...>` | Kotak ketik | Auto-resize, Enter kirim, Shift+Enter baris baru. |
| 50 | `<button id="sendButton" class="send-button" aria-label="Kirim pesan" disabled>➤</button>` | Tombol kirim | Nonaktif saat input kosong. |
| 53-83 | `<div id="settingsDrawer" class="drawer" aria-hidden="true"> ... </div>` | Panel pengaturan geser | Berisi kontrol ganti foto, ubah nama, dan hapus chat. Geser dari kanan. |
| 85-92 | `<div id="confirmModal" class="modal" style="display: none;" role="dialog" aria-modal="true"> ... </div>` | Modal konfirmasi hapus | Dialog in-character sebelum menghapus semua chat. |
| 94 | `<div id="backdrop" class="backdrop" style="display: none;" aria-hidden="true"></div>` | Overlay latar | Lapisan gelap di belakang drawer/modal, klik untuk menutup. |
| 96-106 | `<template id="userMessageTemplate"> ... </template>` & `<template id="aiMessageTemplate"> ... </template>` | Template pesan | Cetakan HTML untuk bubble user dan AI yang dikloning JavaScript. |
| 108 | `<script src="script.js" defer></script>` | Memuat JavaScript | `defer` memastikan script dijalankan setelah HTML selesai di-parse. |