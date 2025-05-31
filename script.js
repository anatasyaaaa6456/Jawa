let activeSection = "home";
let chatLog = [];
let comments = [];

// Typing Animation for R.Zox
const rzoxEl = document.getElementById("rzox");
const rzoxText = "R.Zox";
let rzoxIndex = 0;

function startTyping() {
  if (rzoxIndex < rzoxText.length) {
    rzoxEl.innerHTML += rzoxText[rzoxIndex];
    rzoxIndex++;
    setTimeout(startTyping, 100);
  }
}

window.onload = () => {
  startTyping();

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
      clearInterval(interval);
      document.getElementById("loading-screen").classList.add("hidden");
      document.getElementById("app").classList.remove("hidden");
    }
  }, 1000);

  // Countdown to 5 Januari 2026
  const targetDate = new Date("January 5, 2026 00:00:00").getTime();
  const countdownDisplay = document.getElementById("countdown-display");

  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;
    if (distance < 0) {
      countdownDisplay.innerText = "Waktumu Habis.";
      return;
    }
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % 1000) / 1000);
    countdownDisplay.innerText = `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }

setInterval(updateCountdown, 1000);
updateCountdown();

// Play Music
let isPlaying = false;
function toggleMusic() {
  const audio = document.getElementById("music");
  isPlaying = !isPlaying;
  if (isPlaying) {
    audio.play().catch(e => console.log("Autoplay blocked"));
  } else {
    audio.pause();
  }
}

// Welcome Prompt
const userName = prompt("Siapa nama kamu?") || "Pengunjung";

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

// Anna AI Chatbot
function sendMessage() {
  const input = document.getElementById("ai-input");
  const message = input.value.trim();
  if (!message) return;

  const userMsg = `<div class="user-message">${message}</div>`;
  const aiReply = getAIResponse(message);
  document.getElementById("chat-log").innerHTML += userMsg + aiReply;
  input.value = "";
  document.getElementById("chat-log").scrollTop = document.getElementById("chat-log").scrollHeight;
}

function getAIResponse(message) {
  message = message.toLowerCase();
  let reply = "";

  if (message.includes("hai") || message.includes("halo")) {
    reply = `<div class="ai-message">Halo, saya Anna AI. Ada yang bisa saya bantu?</div>`;
  } else if (message.includes("karya")) {
    reply = `<div class="ai-message">Saat ini tersedia satu cerita utama berjudul 'ANTAKA' dalam format PDF.</div>`;
  } else if (message.includes("profil")) {
    reply = `<div class="ai-message">Kyoutaka, atau Januar Pratama. Moto hidup: 'Bekerja seenak jidat'</div>`;
  } else if (message.includes("kontak")) {
    reply = `<div class="ai-message">WhatsApp: +62 889-8096-3797 | Email: januar@kyoutaka.dev</div>`;
  } else if (message.includes("rundown")) {
    const time = document.getElementById("countdown-display").innerText.split(" ")[0];
    reply = `<div class="ai-message">Masih tersisa ${time} hari menuju kebangkitan Sang Kegelapan.</div>`;
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
  const commentList = document.getElementById("comment-list");
  const comment = input.value.trim();
  if (!comment) return;

  const time = new Date().toLocaleTimeString();
  commentList.innerHTML += `<div><strong>${userName}:</strong> ${comment} <small>${time}</small></div>`;
  input.value = "";
}

// Status Online Blink
const onlineIndicator = document.getElementById("online-indicator");
setInterval(() => {
  onlineIndicator.style.background = onlineIndicator.style.background === "red" ? "gray" : "red";
}, 5000);
