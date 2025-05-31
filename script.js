let activeMenu = "home";
let chatLog = [];
let comments = [];

// Typing Animation for R.Zox
window.onload = () => {
  const rzox = "R.Zox";
  let i = 0;
  const rzoxEl = document.getElementById("rzox");
  const typingInterval = setInterval(() => {
    if (i < rzox.length) {
      rzoxEl.innerHTML += rzox[i];
      i++;
    } else {
      clearInterval(typingInterval);
    }
  }, 100);

  // Countdown in Loading Screen
  let countdown = 17;
  const countdownEl = document.getElementById("countdown");
  const progressBar = document.getElementById("progress-bar");

  const interval = setInterval(() => {
    if (countdown > 0) {
      countdown--;
      countdownEl.textContent = countdown;
      progressBar.style.width = ((17 - countdown) / 17 * 100) + "%";
    } else {
      document.getElementById("loading-screen").classList.add("hidden");
      document.getElementById("app").classList.remove("hidden");
      clearInterval(interval);
    }
  }, 1000);

  // Countdown to January 5, 2026
  const countdownDisplay = document.getElementById("countdown-display");
  const targetDate = new Date("January 5, 2026 00:00:00").getTime();

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
      countdownDisplay.innerHTML = "Waktumu habis.";
      return;
    }

    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % 1000 * 60) / 1000);
    countdownDisplay.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }

setInterval(updateCountdown, 1000);
updateCountdown();

// Play Music
let isPlaying = false;
function toggleMusic() {
  const audio = document.getElementById("music");
  isPlaying = !isPlaying;
  if (isPlaying) {
    audio.play().catch(() => {});
  } else {
    audio.pause();
  }
}

// Status Online Blink
const onlineIndicator = document.getElementById("online-indicator");
setInterval(() => {
  onlineIndicator.style.background = onlineIndicator.style.background === "red" ? "gray" : "red";
}, 5000);

// Toggle Menu
function toggleMenu() {
  const menu = document.getElementById("menu-dropdown");
  menu.classList.toggle("hidden");
}

// Set Active Section
function setActive(id) {
  document.querySelectorAll("main section").forEach(sec => sec.classList.remove("active"));
  document.getElementById(id).classList.add("active");
  document.getElementById("menu-dropdown").classList.add("hidden");
}

// Anna AI Chat
function sendMessage() {
  const input = document.getElementById("ai-input");
  const log = document.getElementById("chat-log");
  const message = input.value.trim();
  if (!message) return;

  const userMsg = `<div class="user-message">${message}</div>`;
  const aiReply = getAIResponse(message);
  log.innerHTML += userMsg + aiReply;
  input.value = "";
  log.scrollTop = log.scrollHeight;
}

function getAIResponse(message) {
  message = message.toLowerCase();
  let reply = "";

  if (message.includes("hai") || message.includes("halo")) {
    reply = `<div class="ai-message">Halo! Ada yang bisa saya bantu?</div>`;
  } else if (message.includes("karya")) {
    reply = `<div class="ai-message">Saat ini tersedia satu cerita utama berjudul 'ANTAKA' dalam format PDF.</div>`;
  } else if (message.includes("profil")) {
    reply = `<div class="ai-message">Kyoutaka, atau Januar Pratama. Moto hidup: 'Bekerja seenak jidat'</div>`;
  } else if (message.includes("kontak")) {
    reply = `<div class="ai-message">WhatsApp: +62 889-8096-3797 | Email: januar@kyoutaka.dev</div>`;
  } else if (message.includes("rundown")) {
    const days = document.getElementById("countdown-display").textContent.split(" ")[0];
    reply = `<div class="ai-message">Masih tersisa ${days} hari menuju kebangkitan Sang Kegelapan.</div>`;
  } else if (message.includes("kemampuan")) {
    reply = `<div class="ai-message">Kemampuan: Virtual Creator 70%, Joki Tugas 85%, Guru 90%, Pekerja Kantor 75%</div>`;
  } else {
    reply = `<div class="ai-message">Maaf, saya belum bisa memahami itu. Coba tanyakan tentang profil, karya, rundown, kemampuan, kontak, atau komentar.</div>`;
  }

  return reply;
}

// Add Comment
function addComment() {
  const input = document.getElementById("comment-input");
  const list = document.getElementById("comment-list");
  const comment = input.value.trim();
  if (!comment) return;
  const time = new Date().toLocaleTimeString();
  list.innerHTML += `<div><strong>${prompt("Siapa nama kamu?") || "Pengunjung"}:</strong> ${comment} <small>${time}</small></div>`;
  input.value = "";
}

// Welcome Prompt
window.addEventListener("load", () => {
  prompt("Siapa nama kamu?");
});