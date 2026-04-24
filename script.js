// =========================================
// FOOTER YEAR
// =========================================
document.getElementById("year").textContent = new Date().getFullYear();

// =========================================
// MOBILE MENU TOGGLE
// =========================================
const menuBtn = document.getElementById("menu-btn");
const navBar = document.querySelector(".nav-bar");
menuBtn.addEventListener("click", () => {
  navBar.classList.toggle("menu-open");
});
document
  .querySelectorAll(".nav-links a")
  .forEach((a) =>
    a.addEventListener("click", () => navBar.classList.remove("menu-open")),
  );

// =========================================
// CHAT WIDGET
// =========================================
const chatFab = document.getElementById("chat-fab");
const chatPanel = document.getElementById("chat-panel");
const chatClose = document.getElementById("chat-close");
const chatOpenBtn = document.getElementById("chat-open-btn");
const chatForm = document.getElementById("chat-form");
const chatText = document.getElementById("chat-text");
const chatBody = document.getElementById("chat-body");
const chatSuggestions = document.getElementById("chat-suggestions");

function openChat() {
  chatPanel.hidden = false;
  chatFab.style.display = "none";
  setTimeout(() => chatText.focus(), 250);
}
function closeChat() {
  chatPanel.hidden = true;
  chatFab.style.display = "flex";
}

chatFab.addEventListener("click", openChat);
chatClose.addEventListener("click", closeChat);
if (chatOpenBtn)
  chatOpenBtn.addEventListener("click", (e) => {
    e.preventDefault();
    openChat();
  });

// =========================================
// CHAT KNOWLEDGE BASE
// Rule-based matching with keyword scoring.
// Each entry has keywords (user terms) and a response.
// =========================================
const knowledge = [
  {
    keywords: ["what", "jinja", "about", "product"],
    reply:
      "Jinja Herbal Extracts is a 100% natural wellness tonic made from traditional African herbs. It's designed to detoxify your body, boost energy, support immunity, and help with sleep, digestion, skin, and overall wellness.",
  },
  {
    keywords: [
      "help",
      "benefit",
      "good for",
      "treat",
      "cure",
      "battle",
      "blood pressure",
      "diabetes",
      "sugar",
      "fatigue",
      "tired",
      "immune",
      "circulation",
      "ulcer",
      "pile",
      "arthritis",
      "infertility",
      "infection",
      "sleep",
      "skin",
      "digestion",
    ],
    reply:
      "Jinja is formulated to support people dealing with things like fatigue, weak immunity, poor sleep, poor digestion, and general body wellness. Many users also take it to support healthy blood pressure, blood sugar, and circulation. Note: Jinja is a natural supplement, not a drug — for medical conditions always speak to your doctor.",
  },
  {
    keywords: [
      "how",
      "take",
      "use",
      "dose",
      "dosage",
      "drink",
      "shot",
      "spoon",
    ],
    reply:
      "Jinja is easy to use — 30mls morning and night with little warm water, (not for pregnant women, nursing mothers and children below 10).Ulcer patients should eat before taking",
  },
  {
    keywords: [
      "safe",
      "side effect",
      "side-effect",
      "reaction",
      "harm",
      "danger",
    ],
    reply:
      "Jinja is made from 100% natural herbs with no harsh chemicals. Most people tolerate it very well. However it's not for pregnant women, Breastfeeding mothers, and children below 10.",
  },
  {
    keywords: ["ingredient", "contain", "inside", "made of", "formula"],
    reply:
      "Jinja is a proprietary blend of traditional African herbal extracts, It's NAFDAC approved. The active ingredients are Capolobia Alba, Cnetis ferruginea, Heliotropium indicum and water.",
  },
  {
    keywords: [
      "price",
      "cost",
      "how much",
      "pay",
      "naira",
      "dollar",
      "pound",
      "expensive",
    ],
    reply:
      "Pricing depends on where you're ordering from. To get an accurate price — including shipping to your country — please send us a message and we'll confirm the latest price and options for you.",
  },
  {
    keywords: ["order", "buy", "purchase", "get", "where"],
    reply:
      "Easy! Click the 'Order Jinja' button on this page — it opens WhatsApp with us directly, ready to send. Or WhatsApp us straight at +234 902 666 2733. We'll confirm your order, pricing, and arrange delivery.",
  },
  {
    keywords: [
      "ship",
      "shipping",
      "deliver",
      "delivery",
      "international",
      "worldwide",
      "country",
      "uk",
      "us",
      "usa",
      "europe",
      "nigeria",
      "abroad",
    ],
    reply:
      "Yes — Jinja ships worldwide. Wherever you are, we can arrange delivery. Send us a message with your country and we'll confirm shipping time and cost.",
  },
  {
    keywords: [
      "long",
      "result",
      "work",
      "see",
      "week",
      "month",
      "fast",
      "time",
    ],
    reply:
      "Results vary by person. Many people notice improvements in energy and sleep within the first few weeks of consistent daily use. For deeper benefits like detox and full-body wellness, we recommend using it consistently for at least 1–3 months.",
  },
  {
    keywords: [
      "pregnant",
      "pregnancy",
      "breastfeed",
      "baby",
      "child",
      "kid",
      "age",
    ],
    reply:
      "Jinja is formulated for adults and young adults above 10. Jinja is not for Pregnant women, Breastfeeding mothers, and children below 10 .",
  },
  {
    keywords: ["nafdac", "approved", "certified", "regulate", "certification"],
    reply:
      "Jinja is produced under professional standards and carries the NAFDAC certification.",
  },
  {
    keywords: [
      "distributor",
      "distribute",
      "sell",
      "earn",
      "job",
      "business",
      "income",
      "work",
      "opportunity",
      "multistream",
    ],
    reply:
      "Yes! Multistream is all about empowering people. You can become a distributor and earn weekly just using your phone — flexible time, work anywhere. Scroll to the 'Earn With Us' section or message us to get started.",
  },
  {
    keywords: ["contact", "phone", "number", "whatsapp", "email", "message"],
    reply:
      "You can reach us on WhatsApp at +234 902 666 2733. Click the 'Order Jinja' button or tap the number in the Order section and we'll respond quickly.",
  },
  {
    keywords: ["bottle", "size", "ml", "750", "350", "quantity"],
    reply:
      "Jinja Herbal Extracts comes in 2 sizes: 350ml and 750ml bottle. One big bottle lasts most people about 12 days depending on daily intake.",
  },
  {
    keywords: ["multistream", "company", "who", "brand", "tm ltd"],
    reply:
      "Multistream TM Ltd is the company behind the distribution of Jinja. We're all about empowering people — we help people access wellness products and build income opportunities.",
  },
  {
    keywords: ["soap", "cream", "other product"],
    reply:
      "Right now this site focuses on Jinja Herbal Extracts. We do have additional wellness products like the Iru Antiseptic soap, more prodcuts coming soon we will update as they get listed.",
  },
];

// =========================================
// MATCH ENGINE
// =========================================
function scoreMatch(text, keywords) {
  const lower = text.toLowerCase();
  let score = 0;
  for (const kw of keywords) {
    if (lower.includes(kw.toLowerCase())) score += kw.length > 3 ? 2 : 1;
  }
  return score;
}

function getReply(userText) {
  const clean = userText.trim().toLowerCase();

  // Greetings
  if (
    /^(hi|hello|hey|yo|hola|sup|good\s*(morning|afternoon|evening))\b/.test(
      clean,
    )
  ) {
    return "Hi there! Welcome. Ask me anything about Jinja — how it works, benefits, how to order, or becoming a distributor.";
  }
  // Thanks
  if (/\b(thanks|thank you|thx|cheers|appreciate)\b/.test(clean)) {
    return "You're welcome! If you have any more questions, just ask. Your health matters.";
  }
  // Bye
  if (/\b(bye|goodbye|see ya|later)\b/.test(clean)) {
    return "Take care! Remember — your health is your real wealth.";
  }

  let best = { score: 0, reply: null };
  for (const entry of knowledge) {
    const score = scoreMatch(clean, entry.keywords);
    if (score > best.score) best = { score, reply: entry.reply };
  }

  if (best.score === 0) {
    return "That's a great question. I don't have a direct answer for that one — please send us a message through the 'Order Jinja' section and someone from the Multistream team will help you personally.";
  }
  return best.reply;
}

// =========================================
// RENDER HELPERS
// =========================================
function addMessage(text, who = "bot") {
  const div = document.createElement("div");
  div.className = `msg ${who}`;
  div.innerHTML = `<p>${text}</p>`;
  chatBody.appendChild(div);
  chatBody.scrollTop = chatBody.scrollHeight;
  return div;
}

function showTyping() {
  const div = document.createElement("div");
  div.className = "msg bot typing-wrap";
  div.innerHTML = `<div class="typing"><span></span><span></span><span></span></div>`;
  chatBody.appendChild(div);
  chatBody.scrollTop = chatBody.scrollHeight;
  return div;
}

function handleUserMessage(text) {
  if (!text.trim()) return;
  addMessage(text, "user");
  if (chatSuggestions) chatSuggestions.style.display = "none";
  const typing = showTyping();
  setTimeout(
    () => {
      typing.remove();
      addMessage(getReply(text), "bot");
    },
    600 + Math.random() * 400,
  );
}

// =========================================
// EVENT BINDINGS
// =========================================
chatForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const t = chatText.value;
  chatText.value = "";
  handleUserMessage(t);
});

document.querySelectorAll(".suggest").forEach((btn) => {
  btn.addEventListener("click", () => {
    handleUserMessage(btn.dataset.q);
  });
});
