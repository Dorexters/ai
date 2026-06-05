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

## Teknologi

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

## Penjelasan Kode `style.css`

| Baris | Contoh Kode | Kegunaan | Detail & Analogi |
|-------|-------------|----------|------------------|
| 1-49 | `:root { --color-bg: #0a0a0a; --space-8: 8px; --space-13: 13px; ... }` | CSS Custom Properties | Menyimpan semua variabel warna, spacing Fibonacci, border-radius, font, transisi, z-index. Seperti rak bumbu dapur. |
| 51 | `* { margin: 0; padding: 0; box-sizing: border-box; }` | Reset universal | Menghilangkan jarak bawaan browser, menyamakan hitung ukuran elemen. |
| 58 | `html { font-size: 100%; -webkit-text-size-adjust: 100%; }` | Basis font | Menjaga ukuran font relatif dan mencegah penyesuaian otomatis di mobile. |
| 66 | `body { font-family: var(--font-main); background-color: var(--color-bg); color: var(--color-text); height: 100dvh; position: fixed; }` | Tampilan dasar | Mengunci halaman penuh tanpa scroll, latar hitam, font Poppins. |
| 80 | `#app { display: grid; grid-template-rows: auto 1fr auto; height: 100dvh; }` | Layout utama | Membagi halaman menjadi header (auto), chat (fleksibel), input (auto). |
| 94 | `.header { display: flex; backdrop-filter: blur(8px); background: var(--color-glass-bg); border-bottom: 1px solid var(--color-glass-border); }` | Panel kaca buram | Efek glassmorphism, border bawah tipis merah transparan. |
| 112 | `.avatar-container { position: relative; width: 55px; height: 55px; border-radius: 50%; overflow: hidden; border: 2px solid var(--color-accent-mid); cursor: pointer; }` | Bingkai foto bulat | Ukuran tetap 55px, bulat penuh, border merah, siap diklik. |
| 145 | `.avatar-image { width: 100%; height: 100%; object-fit: cover; display: block; }` | Gambar di avatar | Memastikan foto mengisi lingkaran tanpa distorsi. |
| 156 | `.camera-icon { position: absolute; bottom: 0; right: 0; opacity: 0; transition: opacity var(--transition-medium); }` | Ikon kamera | Muncul saat hover, posisi di pojok kanan bawah avatar. |
| 187 | `.character-name-input { background: transparent; border: none; border-bottom: 1px solid var(--color-input-border); font-family: var(--font-main); font-weight: 600; }` | Input nama minimalis | Garis bawah tipis, fokus berubah warna merah. |
| 202 | `.status-dot { width: 8px; height: 8px; border-radius: 50%; background: var(--color-status-green); box-shadow: 0 0 6px var(--color-status-green); }` | Dot hijau online | Efek glowing hijau menunjukkan AI selalu tersedia. |
| 232 | `.chat-main { overflow-y: auto; padding: var(--space-13); display: flex; flex-direction: column; gap: var(--space-13); }` | Area chat scrollable | Flex kolom, latar gradien gelap. |
| 260 | `.message { max-width: 80%; animation: fadeIn 0.3s ease forwards; }` | Bubble pesan | Lebar maksimal 80%, animasi muncul halus. |
| 304 | `.user-message .bubble { background: var(--color-bubble-user); border: 1px solid rgba(255, 23, 68, 0.25); border-bottom-right-radius: 8px; }` | Bubble user | Warna merah gelap, sudut kanan bawah runcing. |
| 312 | `.ai-message .bubble { background: var(--color-bubble-ai); border: 1px solid rgba(194, 24, 91, 0.3); border-bottom-left-radius: 8px; }` | Bubble AI | Warna abu gelap, sudut kiri bawah runcing. |
| 328 | `.typing-indicator { display: flex; gap: 5px; padding: var(--space-8) var(--space-21); background: var(--color-bubble-ai); border-radius: var(--border-radius-lg); }` | Indikator mengetik | Background bubble abu, tiga titik animasi. |
| 356 | `.input-area { display: flex; backdrop-filter: blur(8px); background: var(--color-glass-bg); border-top: 1px solid var(--color-glass-border); padding: var(--space-13) var(--space-21); }` | Area input kaca | Glassmorphism di bagian bawah. |
| 377 | `.message-input { flex: 1; background: var(--color-input-bg); border: 1px solid var(--color-input-border); border-radius: var(--border-radius-md); resize: none; max-height: 150px; }` | Textarea input | Latar gelap, border tipis, auto-resize dibatasi 150px. |
| 418 | `.send-button { background: var(--color-accent-mid); width: 42px; height: 42px; border-radius: 50%; border: none; color: white; cursor: pointer; box-shadow: 0 2px 8px rgba(204, 0, 0, 0.4); }` | Tombol kirim | Lingkaran merah dengan shadow, hover lebih terang. |
| 455 | `.drawer { position: fixed; top: 0; right: 0; width: 320px; height: 100dvh; background: var(--color-bg-secondary); transform: translateX(100%); transition: transform var(--transition-medium); }` | Panel pengaturan geser | Tersembunyi di kanan, muncul saat class `open` ditambahkan. |
| 598 | `.modal { position: fixed; top: 50%; left: 50%; transform: translate(-50%, -50%); background: var(--color-bg-secondary); border: 2px solid var(--color-accent-dark); border-radius: var(--border-radius-lg); padding: var(--space-34); z-index: var(--z-modal); }` | Modal dialog | Di tengah layar, border merah, shadow kuat. |
| 650 | `.backdrop { position: fixed; inset: 0; background: rgba(0,0,0,0.6); backdrop-filter: blur(3px); z-index: var(--z-backdrop); }` | Overlay latar | Menutupi seluruh layar, klik untuk menutup panel/modal. |
| 666 | `@keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }` | Animasi kemunculan | Digunakan untuk pesan baru dan modal. |
| 684 | `@keyframes typingPulse { 0%,60%,100% { transform: scale(1); opacity: 0.5; } 30% { transform: scale(1.2); opacity: 1; } }` | Animasi dot mengetik | Tiga titik berdenyut bergantian. |
| 691 | `.chat-main::-webkit-scrollbar { width: 6px; } .chat-main::-webkit-scrollbar-thumb { background: var(--color-accent-dark); border-radius: 3px; }` | Custom scrollbar | Scrollbar merah darah di area chat. |
| 718 | `@media (max-width: 600px) { :root { --header-height: 72px; --avatar-size: 42px; } ... }` | Responsif mobile | Mengecilkan avatar, padding, lebar bubble untuk layar kecil. |
| 742 | `@media (min-width: 1200px) { .chat-main { padding: var(--space-21) var(--space-34); } }` | Responsif desktop besar | Memberi ruang lebih lega. |

## Penjelasan Kode `script.js`

| Baris | Contoh Kode | Kegunaan | Detail & Analogi |
|-------|-------------|----------|------------------|
| 1 | `const GEMINI_API_KEY = "AQ.Ab8RN6IeXz1B9LCrQZ0wuSkX4mEy6ZwvrGXz1dOBKLzZiFOk1g";` | Kunci API | Kredensial untuk mengakses Gemini. |
| 2 | `const API_ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";` | URL endpoint | Alamat model AI yang digunakan. |
| 4 | `document.addEventListener("DOMContentLoaded", () => { ... });` | Inisialisasi | Menjalankan semua kode setelah HTML siap. |
| 5-29 | `const avatarContainer = document.getElementById("avatarContainer");` dll. | Referensi elemen | Menyimpan referensi ke setiap elemen penting agar mudah diakses. |
| 31 | `const DEFAULT_AVATAR = avatarImage.src;` | Avatar default | Menyimpan string base64 SVG placeholder. |
| 32 | `const DEFAULT_NAME = "Yuki";` | Nama default | Nama awal jika belum ada di localStorage. |
| 37 | `function loadAvatar() { const saved = localStorage.getItem(AVATAR_KEY); if (saved) { avatarImage.src = saved; drawerAvatarPreview.src = saved; } else { avatarImage.src = DEFAULT_AVATAR; drawerAvatarPreview.src = DEFAULT_AVATAR; } }` | Memuat avatar | Mengambil base64 dari localStorage atau mengembalikan ke default. |
| 48 | `function saveAvatar(dataUrl) { localStorage.setItem(AVATAR_KEY, dataUrl); avatarImage.src = dataUrl; drawerAvatarPreview.src = dataUrl; }` | Menyimpan avatar | Menyimpan data URL ke localStorage dan memperbarui kedua elemen img. |
| 54 | `function resetAvatar() { localStorage.removeItem(AVATAR_KEY); avatarImage.src = DEFAULT_AVATAR; drawerAvatarPreview.src = DEFAULT_AVATAR; avatarInput.value = ""; }` | Reset avatar | Menghapus avatar custom, kembali ke placeholder. |
| 61 | `function loadName() { const saved = localStorage.getItem(NAME_KEY); const name = saved \|\| DEFAULT_NAME; characterNameInput.value = name; drawerCharacterNameInput.value = name; }` | Memuat nama | Membaca nama dari localStorage atau pakai default. |
| 68 | `function saveName(name) { localStorage.setItem(NAME_KEY, name); characterNameInput.value = name; drawerCharacterNameInput.value = name; }` | Menyimpan nama | Menyimpan dan menyinkronkan input nama. |
| 74 | `function loadChatHistory() { const saved = localStorage.getItem(CHAT_HISTORY_KEY); if (saved) { try { chatHistory = JSON.parse(saved); } catch (e) { chatHistory = []; } } renderChatFromHistory(); }` | Memuat riwayat chat | Parse JSON dari localStorage, tangani error, lalu render ulang. |
| 87 | `function renderChatFromHistory() { messageArea.innerHTML = ""; if (chatHistory.length === 0) { appendWelcomeMessage(); return; } chatHistory.forEach(msg => { appendMessageToDOM(msg.role, msg.text, msg.timestamp, false); }); scrollToBottom(); }` | Merender ulang pesan | Mengosongkan area, lalu menampilkan pesan dari array riwayat. |
| 98 | `function appendWelcomeMessage() { ... }` | Pesan sambutan | Menampilkan bubble awal jika riwayat kosong. |
| 112 | `function appendMessageToDOM(role, text, timestamp, shouldScroll = true) { ... }` | Tambah pesan ke DOM | Mengkloning template, mengisi teks & waktu, lalu menempel ke area chat. |
| 125 | `function addUserMessage(text) { ... chatHistory.push({ role: "user", text, timestamp }); saveChatHistory(); }` | Tambah pesan user | Mencatat ke riwayat, menyimpan ke localStorage. |
| 133 | `function addAIMessage(text) { ... chatHistory.push({ role: "model", text, timestamp }); saveChatHistory(); }` | Tambah pesan AI | Mencatat dengan role "model" (sesuai API Gemini). |
| 141 | `function formatTime(date) { return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }); }` | Format waktu | Menghasilkan string jam:menit. |
| 152 | `function showTyping() { typingIndicator.style.display = "flex"; }` | Tampilkan indikator | Memunculkan tiga titik. |
| 156 | `function hideTyping() { typingIndicator.style.display = "none"; }` | Sembunyikan indikator | Menghilangkan titik setelah respons diterima. |
| 165 | `function getSystemPrompt() { const name = characterNameInput.value.trim() \|\| DEFAULT_NAME; return \`Kamu adalah ${name}...\`; }` | System prompt AI | Membangun kepribadian yandere + aturan panjang respons dinamis. |
| 184 | `function buildAPIBody(userText) { ... }` | Bangun body request | Merangkai isi percakapan dan system instruction untuk API Gemini. |
| 200 | `async function callGeminiAPI(userText) { const body = buildAPIBody(userText); const response = await fetch(API_ENDPOINT, { method: "POST", headers: { "Content-Type": "application/json", "x-goog-api-key": GEMINI_API_KEY }, body: JSON.stringify(body) }); ... }` | Panggil API | Mengirim request dan mengekstrak teks respons. Error handling jika gagal. |
| 228 | `async function handleSend() { ... }` | Proses kirim pesan | Validasi input, tambah ke riwayat, tampilkan typing, delay acak, panggil API, tampilkan jawaban. |
| 269 | `function autoResizeTextarea() { messageInput.style.height = "auto"; messageInput.style.height = Math.min(messageInput.scrollHeight, 150) + "px"; }` | Auto-resize textarea | Menyesuaikan tinggi textarea dengan konten, maks 150px. |
| 274 | `function clearAllChat() { chatHistory = []; saveChatHistory(); messageArea.innerHTML = ""; appendWelcomeMessage(); }` | Hapus semua chat | Reset riwayat dan tampilan. |
| 281 | `function openDrawer() { settingsDrawer.classList.add("open"); backdrop.classList.add("open"); ... }` | Buka drawer | Menambahkan class `open` ke drawer dan backdrop. |
| 286 | `function closeDrawer() { settingsDrawer.classList.remove("open"); backdrop.classList.remove("open"); ... }` | Tutup drawer | Menghapus class `open`. |
| 316 | `avatarContainer.addEventListener("click", () => { avatarInput.click(); });` | Pemicu klik avatar | Meneruskan klik ke input file tersembunyi. |
| 327 | `avatarInput.addEventListener("change", (event) => { const file = event.target.files[0]; if (!file) return; if (!file.type.startsWith("image/")) { alert("..."); return; } if (file.size > 2097152) { alert("..."); return; } const reader = new FileReader(); reader.onload = (e) => { saveAvatar(e.target.result); }; reader.readAsDataURL(file); });` | Ganti foto profil | Validasi tipe & ukuran, baca file sebagai data URL, simpan. |
| 340 | `deletePhotoButton.addEventListener("click", () => { resetAvatar(); });` | Hapus foto | Kembalikan avatar ke default. |
| 348 | `avatarImage.addEventListener("error", () => { avatarImage.src = DEFAULT_AVATAR; drawerAvatarPreview.src = DEFAULT_AVATAR; });` | Fallback error gambar | Jika URL avatar rusak, pakai default. |
| 353 | `characterNameInput.addEventListener("input", () => { ... saveName(newName); });` | Sinkronisasi nama | Setiap perubahan di input header langsung simpan dan perbarui drawer. |
| 371 | `sendButton.addEventListener("click", handleSend);` | Kirim dengan klik | Memanggil fungsi utama. |
| 373 | `messageInput.addEventListener("keydown", (e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); handleSend(); } });` | Kirim dengan Enter | Enter kirim, Shift+Enter baris baru. |
| 380 | `messageInput.addEventListener("input", () => { autoResizeTextarea(); sendButton.disabled = messageInput.value.trim().length === 0; });` | Update input | Auto-resize dan aktifkan/nonaktifkan tombol kirim. |
| 385 | `settingsToggle.addEventListener("click", () => { ... });` | Toggle drawer | Buka/tutup panel pengaturan. |
| 394 | `closeDrawerButton.addEventListener("click", closeDrawer);` | Tutup via tombol X | Menutup drawer. |
| 396 | `backdrop.addEventListener("click", () => { if (settingsDrawer.classList.contains("open")) closeDrawer(); else if (confirmModal.classList.contains("open")) closeConfirmModal(); });` | Tutup overlay | Klik di luar panel menutup drawer atau modal. |
| 404 | `clearChatButton.addEventListener("click", openConfirmModal);` | Buka modal hapus | Menampilkan konfirmasi. |
| 406 | `confirmDeleteButton.addEventListener("click", () => { clearAllChat(); closeConfirmModal(); });` | Hapus chat | Konfirmasi hapus semua chat. |
| 411 | `cancelDeleteButton.addEventListener("click", closeConfirmModal);` | Batal hapus | Menutup modal tanpa aksi. |
| 413 | `window.addEventListener("keydown", (e) => { if (e.key === "Escape") { closeAllOverlays(); } });` | Escape key | Menutup semua panel dengan Escape. |
| 419 | `loadAvatar(); loadName(); loadChatHistory(); messageInput.focus(); autoResizeTextarea(); sendButton.disabled = true;` | Inisialisasi akhir | Memuat data dari localStorage, fokus input, atur tombol kirim. |