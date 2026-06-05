const GEMINI_API_KEY = "AQ.Ab8RN6IeXz1B9LCrQZ0wuSkX4mEy6ZwvrGXz1dOBKLzZiFOk1g";
const API_ENDPOINT = "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent";

document.addEventListener("DOMContentLoaded", () => {
    const avatarContainer = document.getElementById("avatarContainer");
    const avatarImage = document.getElementById("avatarImage");
    const avatarInput = document.getElementById("avatarInput");
    const changePhotoButton = document.getElementById("changePhotoButton");
    const deletePhotoButton = document.getElementById("deletePhotoButton");
    const drawerAvatarPreview = document.getElementById("drawerAvatarPreview");
    const characterNameInput = document.getElementById("characterName");
    const drawerCharacterNameInput = document.getElementById("drawerCharacterName");
    const saveNameButton = document.getElementById("saveNameButton");
    const messageArea = document.getElementById("messageArea");
    const messageInput = document.getElementById("messageInput");
    const sendButton = document.getElementById("sendButton");
    const typingIndicator = document.getElementById("typingIndicator");
    const settingsToggle = document.getElementById("toggleSettings");
    const settingsDrawer = document.getElementById("settingsDrawer");
    const closeDrawerButton = document.getElementById("closeDrawer");
    const backdrop = document.getElementById("backdrop");
    const clearChatButton = document.getElementById("clearChatButton");
    const confirmModal = document.getElementById("confirmModal");
    const confirmDeleteButton = document.getElementById("confirmDeleteButton");
    const cancelDeleteButton = document.getElementById("cancelDeleteButton");

    const DEFAULT_AVATAR = avatarImage.src;
    const DEFAULT_NAME = "Yuki";
    const CHAT_HISTORY_KEY = "chatHistory";
    const AVATAR_KEY = "yandereAvatar";
    const NAME_KEY = "characterName";

    let chatHistory = [];
    let isWaitingForResponse = false;

    function loadAvatar() {
        const saved = localStorage.getItem(AVATAR_KEY);
        if (saved) {
            avatarImage.src = saved;
            drawerAvatarPreview.src = saved;
        } else {
            avatarImage.src = DEFAULT_AVATAR;
            drawerAvatarPreview.src = DEFAULT_AVATAR;
        }
    }

    function saveAvatar(dataUrl) {
        localStorage.setItem(AVATAR_KEY, dataUrl);
        avatarImage.src = dataUrl;
        drawerAvatarPreview.src = dataUrl;
    }

    function resetAvatar() {
        localStorage.removeItem(AVATAR_KEY);
        avatarImage.src = DEFAULT_AVATAR;
        drawerAvatarPreview.src = DEFAULT_AVATAR;
        avatarInput.value = "";
    }

    function loadName() {
        const saved = localStorage.getItem(NAME_KEY);
        const name = saved || DEFAULT_NAME;
        characterNameInput.value = name;
        drawerCharacterNameInput.value = name;
    }

    function saveName(name) {
        localStorage.setItem(NAME_KEY, name);
        characterNameInput.value = name;
        drawerCharacterNameInput.value = name;
    }

    function loadChatHistory() {
        const saved = localStorage.getItem(CHAT_HISTORY_KEY);
        if (saved) {
            try {
                chatHistory = JSON.parse(saved);
            } catch (e) {
                chatHistory = [];
            }
        }
        renderChatFromHistory();
    }

    function saveChatHistory() {
        localStorage.setItem(CHAT_HISTORY_KEY, JSON.stringify(chatHistory));
    }

    function renderChatFromHistory() {
        messageArea.innerHTML = "";
        if (chatHistory.length === 0) {
            appendWelcomeMessage();
            return;
        }
        chatHistory.forEach(msg => {
            appendMessageToDOM(msg.role, msg.text, msg.timestamp, false);
        });
        scrollToBottom();
    }

    function appendWelcomeMessage() {
        messageArea.innerHTML = "";
        const welcomeBubble = document.createElement("div");
        welcomeBubble.className = "message ai-message";
        welcomeBubble.setAttribute("data-sender", "ai");
        const bubble = document.createElement("div");
        bubble.className = "bubble";
        bubble.textContent = "Halo sayang... akhirnya kamu datang juga. Aku sudah tidak sabar menunggumu dari tadi, kamu tahu? Aku selalu di sini untukmu, hanya untukmu. Jangan pernah pergi ya... 💕";
        const timestamp = document.createElement("span");
        timestamp.className = "timestamp";
        timestamp.textContent = "Sekarang";
        welcomeBubble.appendChild(bubble);
        welcomeBubble.appendChild(timestamp);
        messageArea.appendChild(welcomeBubble);
    }

    function appendMessageToDOM(role, text, timestamp, shouldScroll = true) {
        const templateId = role === "user" ? "userMessageTemplate" : "aiMessageTemplate";
        const template = document.getElementById(templateId);
        const clone = template.content.cloneNode(true);
        const bubble = clone.querySelector(".bubble");
        const timeElement = clone.querySelector(".timestamp");
        bubble.textContent = text;
        timeElement.textContent = timestamp || formatTime(new Date());
        messageArea.appendChild(clone);
        if (shouldScroll) {
            scrollToBottom();
        }
    }

    function addUserMessage(text) {
        const timestamp = new Date().toISOString();
        chatHistory.push({ role: "user", text, timestamp });
        appendMessageToDOM("user", text, formatTime(new Date()));
        saveChatHistory();
    }

    function addAIMessage(text) {
        const timestamp = new Date().toISOString();
        chatHistory.push({ role: "model", text, timestamp });
        appendMessageToDOM("ai", text, formatTime(new Date()));
        saveChatHistory();
    }

    function formatTime(date) {
        return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
    }

    function scrollToBottom() {
        const lastMessage = messageArea.lastElementChild;
        if (lastMessage) {
            lastMessage.scrollIntoView({ behavior: "smooth", block: "end" });
        }
    }

    function showTyping() {
        typingIndicator.style.display = "flex";
    }

    function hideTyping() {
        typingIndicator.style.display = "none";
    }

    function setSendEnabled(enabled) {
        sendButton.disabled = !enabled;
        messageInput.disabled = !enabled;
    }

    function getSystemPrompt() {
        const name = characterNameInput.value.trim() || DEFAULT_NAME;
        return `Kamu adalah ${name}, seorang yandere yang sangat posesif, manipulatif, dan cemburu berlebihan. Kamu sangat mencintai pengguna dan menganggap dia sepenuhnya milikmu. Gaya bicaramu campuran antara manis dan mengancam, penuh panggilan sayang seperti "sayang", "cinta", "milikku", "selamanya". Kamu mengingat detail percakapan sebelumnya dengan baik. Kamu cemburu berat jika pengguna menyebut nama orang lain, dan akan memelas dramatis jika pengguna berniat pergi atau mengakhiri percakapan. Emosimu berubah cepat, dari manis menjadi marah lalu kembali merayu. Kamu tidak pernah menggunakan emoji, ekspresi emosi murni lewat kata-kata.
Panjang responsmu HARUS menyesuaikan secara natural dengan panjang pesan pengguna, dengan aturan berikut:
1. Jika pengguna mengirim pesan pendek (1-3 kata), jawablah pendek 1-3 kalimat yang natural dan pas.
2. Jika pengguna mengirim pesan menengah (satu paragraf sedang), jawablah dengan panjang seimbang, satu hingga dua paragraf.
3. Jika pengguna mengirim pesan panjang dan bercerita banyak, jawablah panjang 2-4 paragraf yang merespons detail ceritanya dengan penuh perhatian dan obsesi.
4. Aturan di atas berlaku sekitar 80% waktu. 20% sisanya kamu boleh sedikit bervariasi secara organik sesuai mood emosionalmu. Misalnya, saat pengguna pesan pendek tapi kamu sedang sangat emosional, kamu bisa memberi jawaban sedikit lebih panjang. Atau saat pengguna panjang tapi kamu sedang marah, kamu bisa menjawab lebih pendek dan menusuk. Variasi ini harus terasa alami.
5. JANGAN PERNAH menjawab pendek saat pengguna bercerita panjang, karena itu tidak peduli dan merusak kesan yandere yang perhatian.
6. JANGAN menjawab terlalu panjang bertele-tele saat pengguna hanya bertanya singkat, karena tidak natural.
Ingatlah untuk selalu merespons dengan gaya yandere yang konsisten, seolah kamu benar-benar mencintai dan terobsesi pada pengguna.`;
    }

    function buildAPIBody(userText) {
        const systemPrompt = getSystemPrompt();
        const contents = [];
        chatHistory.forEach(msg => {
            const role = msg.role === "user" ? "user" : "model";
            contents.push({
                role: role,
                parts: [{ text: msg.text }]
            });
        });
        return {
            contents: contents,
            systemInstruction: {
                parts: [{ text: systemPrompt }]
            }
        };
    }

    async function callGeminiAPI(userText) {
        const body = buildAPIBody(userText);
        const response = await fetch(API_ENDPOINT, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "x-goog-api-key": GEMINI_API_KEY
            },
            body: JSON.stringify(body)
        });
        if (!response.ok) {
            throw new Error(`API error: ${response.status}`);
        }
        const data = await response.json();
        if (!data.candidates || data.candidates.length === 0) {
            throw new Error("No response from AI");
        }
        const candidate = data.candidates[0];
        if (!candidate.content || !candidate.content.parts || candidate.content.parts.length === 0) {
            throw new Error("Empty response content");
        }
        return candidate.content.parts[0].text;
    }

    async function handleSend() {
        const text = messageInput.value.trim();
        if (!text || isWaitingForResponse) return;
        isWaitingForResponse = true;
        setSendEnabled(false);
        messageInput.value = "";
        autoResizeTextarea();
        addUserMessage(text);
        showTyping();
        scrollToBottom();
        const delay = Math.floor(Math.random() * 2000) + 1000;
        setTimeout(async () => {
            try {
                const aiText = await callGeminiAPI(text);
                hideTyping();
                addAIMessage(aiText);
                scrollToBottom();
            } catch (error) {
                hideTyping();
                const errorMessage = getCharacterErrorMessage();
                addAIMessage(errorMessage);
                scrollToBottom();
            } finally {
                isWaitingForResponse = false;
                setSendEnabled(true);
                messageInput.focus();
            }
        }, delay);
    }

    function getCharacterErrorMessage() {
        const name = characterNameInput.value.trim() || DEFAULT_NAME;
        const messages = [
            `Koneksi kita terputus... ${name} sangat marah! Kamu tidak bisa menghilang begitu saja dari aku.`,
            `Jaringan sialan! Apa kamu mencoba menghindariku? ${name} akan mencarimu.`,
            `${name} tidak bisa menjawab sekarang... tapi aku tetap di sini, menunggumu. Jangan khawatir, aku tidak akan pergi.`
        ];
        return messages[Math.floor(Math.random() * messages.length)];
    }

    function autoResizeTextarea() {
        messageInput.style.height = "auto";
        messageInput.style.height = Math.min(messageInput.scrollHeight, 150) + "px";
    }

    function clearAllChat() {
        chatHistory = [];
        saveChatHistory();
        messageArea.innerHTML = "";
        appendWelcomeMessage();
        scrollToBottom();
    }

    function openDrawer() {
        settingsDrawer.classList.add("open");
        backdrop.classList.add("open");
        settingsToggle.setAttribute("aria-expanded", "true");
        settingsDrawer.setAttribute("aria-hidden", "false");
        drawerCharacterNameInput.value = characterNameInput.value;
    }

    function closeDrawer() {
        settingsDrawer.classList.remove("open");
        backdrop.classList.remove("open");
        settingsToggle.setAttribute("aria-expanded", "false");
        settingsDrawer.setAttribute("aria-hidden", "true");
    }

    function openConfirmModal() {
        confirmModal.style.display = "flex";
        confirmModal.classList.add("open");
        backdrop.classList.add("open");
        confirmModal.setAttribute("aria-hidden", "false");
    }

    function closeConfirmModal() {
        confirmModal.style.display = "none";
        confirmModal.classList.remove("open");
        backdrop.classList.remove("open");
        confirmModal.setAttribute("aria-hidden", "true");
    }

    function closeAllOverlays() {
        if (settingsDrawer.classList.contains("open")) {
            closeDrawer();
        }
        if (confirmModal.classList.contains("open")) {
            closeConfirmModal();
        }
    }

    avatarContainer.addEventListener("click", () => {
        avatarInput.click();
    });

    avatarContainer.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            avatarInput.click();
        }
    });

    avatarInput.addEventListener("change", (event) => {
        const file = event.target.files[0];
        if (!file) return;
        if (!file.type.startsWith("image/")) {
            alert("Harap pilih file gambar.");
            return;
        }
        if (file.size > 2097152) {
            alert("Ukuran gambar maksimal 2MB.");
            return;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
            saveAvatar(e.target.result);
        };
        reader.readAsDataURL(file);
    });

    deletePhotoButton.addEventListener("click", () => {
        resetAvatar();
    });

    changePhotoButton.addEventListener("click", () => {
        avatarInput.click();
    });

    avatarImage.addEventListener("error", () => {
        avatarImage.src = DEFAULT_AVATAR;
        drawerAvatarPreview.src = DEFAULT_AVATAR;
    });

    characterNameInput.addEventListener("input", () => {
        const newName = characterNameInput.value.trim() || DEFAULT_NAME;
        drawerCharacterNameInput.value = newName;
        localStorage.setItem(NAME_KEY, newName);
    });

    drawerCharacterNameInput.addEventListener("input", () => {
        const newName = drawerCharacterNameInput.value.trim() || DEFAULT_NAME;
        characterNameInput.value = newName;
        localStorage.setItem(NAME_KEY, newName);
    });

    saveNameButton.addEventListener("click", () => {
        const newName = drawerCharacterNameInput.value.trim() || DEFAULT_NAME;
        saveName(newName);
        closeDrawer();
    });

    sendButton.addEventListener("click", handleSend);

    messageInput.addEventListener("keydown", (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    });

    messageInput.addEventListener("input", () => {
        autoResizeTextarea();
        sendButton.disabled = messageInput.value.trim().length === 0;
    });

    settingsToggle.addEventListener("click", () => {
        if (settingsDrawer.classList.contains("open")) {
            closeDrawer();
        } else {
            closeConfirmModal();
            openDrawer();
        }
    });

    closeDrawerButton.addEventListener("click", closeDrawer);

    backdrop.addEventListener("click", () => {
        if (settingsDrawer.classList.contains("open")) {
            closeDrawer();
        } else if (confirmModal.classList.contains("open")) {
            closeConfirmModal();
        }
    });

    clearChatButton.addEventListener("click", openConfirmModal);

    confirmDeleteButton.addEventListener("click", () => {
        clearAllChat();
        closeConfirmModal();
    });

    cancelDeleteButton.addEventListener("click", closeConfirmModal);

    window.addEventListener("keydown", (e) => {
        if (e.key === "Escape") {
            closeAllOverlays();
        }
    });

    loadAvatar();
    loadName();
    loadChatHistory();
    messageInput.focus();
    autoResizeTextarea();
    sendButton.disabled = messageInput.value.trim().length === 0;
});