/* ============================================================
   CLICKCLICK CHATBOT WIDGET — FREE (no API needed)
   Same UI as the coming-soon chatbot; software/strategy focused.
   ============================================================ */

(function () {
  const CALENDAR_URL = "https://calendly.com/clickclick-booking";
  const EMAIL = "hello@clickclick.video";

  const RESPONSES = [
    {
      keys: ["hello", "hi ", "hey", "hiya", "howdy", "morning", "afternoon", "evening"],
      reply: "Hi there — welcome. How can I help you today?",
    },
    {
      keys: [
        "production",
        "produce video",
        "produce videos",
        "make a video",
        "make videos",
        "film us",
        "filming",
        "shoot a",
        "video shoot",
        "create videos for",
        "cinematic",
        "brand film",
        "corporate video",
      ],
      reply:
        "Thanks for asking — we’re best placed on the software, platforms and strategy side of video marketing. If that’s useful, I’m happy to point you toward a short call with the team.",
      book: true,
    },
    {
      keys: ["agency", "are you an agency"],
      reply:
        "We’re a video marketing solutions team — software platforms, strategy and planning, and custom builds. If you tell me what you’re hoping to achieve, I can steer you in the right direction.",
    },
    {
      keys: ["live commerce", "live stream", "live selling", "live shop", "shoppable", "social commerce"],
      reply:
        "Live and social commerce is one of our main areas. We help with the platforms and workflows that turn viewers into buyers — things like live commerce setups, influencer systems, creator workflows, shoppable video and sales tracking. A quick call is usually the easiest way to see what would fit your brand.",
      book: true,
    },
    {
      keys: ["tiktok shop", "tiktok", "amazon"],
      reply:
        "We’re official TikTok and Amazon Partners, so we spend a lot of time in those ecosystems. We help with the platforms and strategy around live and social commerce. Happy to talk through what you’re working on if you’d like.",
      book: true,
    },
    {
      keys: ["signage", "screens", "digital signage", "gym screen", "in-store"],
      reply:
        "Digital signage is a really common ask for us. We help teams get video onto screens across gyms, retail and multi-site spaces, and keep content updating without chasing USB sticks. If that sounds close to what you need, we can walk through options on a call or over email.",
      book: true,
    },
    {
      keys: ["social listening", "signals", "social noise", "listening"],
      reply:
        "Yes — social listening is part of what we do. The idea is to cut through the noise and surface the signals worth acting on, so campaigns and content decisions feel clearer. If you’d like, we can book a short call to see whether it’s a fit for your team.",
      book: true,
    },
    {
      keys: ["tv", "television", "connected tv", "ctv", "broadcast ad"],
      reply:
        "On the TV side, we help with platforms and distribution — getting video onto the right screens through advertising tech. If you’re exploring connected TV or broader screen placement, I’m happy to connect you with the team for a proper chat.",
      book: true,
    },
    {
      keys: [
        "asset management",
        "video library",
        "dam",
        "custom",
        "bespoke",
        "custom build",
        "software",
        "platform",
        "tool",
        "app",
        "integration",
      ],
      reply:
        "Custom software is a big part of ClickClick — especially when off-the-shelf tools don’t quite match how your team works. That includes things like video asset management, so the right cuts are easy to find, version and share. Tell me a little about the problem and I can suggest next steps.",
      book: true,
    },
    {
      keys: ["strategy", "planning", "consultation", "roadmap", "workshop"],
      reply:
        "Strategy and planning is absolutely something we help with. We work with teams on how to scale video output thoughtfully — with roadmaps, guidance, and the right software alongside, including AI-powered creative and campaign tools where they’re useful. What’s the main goal you’re aiming for?",
      book: true,
    },
    {
      keys: ["ai", "artificial intelligence"],
      reply:
        "We use AI where it genuinely helps — mostly in creative and campaign tools, and in smarter planning. It’s always paired with strategy and software rather than being a gimmick. If you share what you’re hoping AI might unlock, I can point you the right way.",
      book: true,
    },
    {
      keys: [
        "price",
        "pricing",
        "cost",
        "how much",
        "budget",
        "rates",
        "fees",
        "quote",
        "investment",
        "package",
        "£",
      ],
      reply:
        "Pricing depends on what you need, but we work across a wide range — from around £50 through to much larger projects in the tens of thousands. Once we understand the problem and timeframe, we can recommend something sensible. A short call or an email to hello@clickclick.video is the easiest next step.",
      book: true,
    },
    {
      keys: ["book", "call", "meeting", "speak", "talk", "appointment", "schedule", "discovery", "calendly"],
      reply:
        "Of course — you can book a time with the button below, or email hello@clickclick.video if you prefer to write first. There’s no pressure; it’s just a chance to talk through what you need.",
      book: true,
    },
    {
      keys: ["contact", "email", "reach", "get in touch", "hello@"],
      reply:
        "You can reach us anytime at hello@clickclick.video. If you’d rather speak live, you’re also welcome to book a call using the button below — we’ll get back to you promptly either way.",
      book: true,
    },
    {
      keys: [
        "what do you do",
        "what is clickclick",
        "who are you",
        "your services",
        "services",
        "what can you",
        "solutions",
        "offer",
      ],
      reply:
        "ClickClick helps brands with video marketing software and strategy. That covers consultations and planning, live and social commerce platforms, and media tech like social listening, TV platforms, digital signage and performance data — plus custom builds when you need something tailored. What area are you most interested in?",
    },
    {
      keys: ["belfast", "northern ireland", "ni ", "glandore", "arthur", "address", "based", "where are you", "location", "office"],
      reply:
        "We’re based at Glandore, 41 Arthur Street, Belfast, BT1 4GB — and we’re proudly backed by InvestNI. You’re welcome to get in touch by email or book a call anytime.",
      book: true,
    },
    {
      keys: ["investni", "invest ni", "backed by"],
      reply:
        "Yes — ClickClick is backed by InvestNI. We’re building video marketing software and strategy from Belfast, and that support has been a real part of the journey.",
      book: true,
    },
    {
      keys: ["award", "start up", "startup", "winner"],
      reply:
        "Thank you for asking — we won the 2026 UK Start Up Awards for Marketing & Advertising, and we’re also TikTok and Amazon Partners. It’s something the team is genuinely proud of, and it shows up in how we build platforms and strategy for clients.",
      book: true,
    },
    {
      keys: ["client", "brands", "who have you", "portfolio", "worked with", "loccitane", "occitane", "astrid", "revolucion"],
      reply:
        "We’ve worked with brands including L’Occitane, Revolución de Cuba and Astrid & Miyu, among others. Every project is a little different, so we’d love to hear what you’re working on and see how we can help.",
      book: true,
    },
    {
      keys: ["thank", "thanks", "cheers", "great", "brilliant", "perfect", "awesome", "helpful"],
      reply:
        "You’re very welcome. If there’s anything else you’d like to know, just ask — or I can help you book a quick call with the team.",
      book: true,
    },
    {
      keys: ["bye", "goodbye", "see you", "later", "take care"],
      reply: "Thanks for chatting — take care, and feel free to come back anytime.",
    },
    {
      keys: ["human", "real person", "speak to someone", "actual person", "member of staff"],
      reply:
        "Absolutely. Email hello@clickclick.video or book a call below and someone from the team will pick it up personally.",
      book: true,
    },
    {
      keys: ["get started", "qualify", "help me choose", "not sure where"],
      reply: "__QUALIFY__",
    },
  ];

  const FALLBACKS = [
    "I’m not quite sure I caught that — could you rephrase, or would you rather book a short call with the team?",
    "Happy to help if you can share a bit more. You can also tap Get started and I’ll ask a few simple questions for the team.",
    "No problem — you’re always welcome to email hello@clickclick.video, or book a call if that’s easier.",
  ];
  let fallbackIndex = 0;

  const QUICK_REPLIES = [
    "What do you do?",
    "How much does it cost?",
    "Get started",
    "Book a call",
  ];

  const QUALIFY_STEPS = [
    {
      key: "problem",
      prompt: "Great. What’s the main thing you’re hoping to sort out?",
    },
    {
      key: "budget",
      prompt: "And roughly speaking, do you have a budget range in mind? A ballpark is fine.",
    },
    {
      key: "decision",
      prompt: "Are you the decision maker, or will a few people need to be involved?",
    },
    {
      key: "timeframe",
      prompt: "Last one — is there a timeframe you’re working toward?",
    },
  ];

  const lead = { problem: "", budget: "", decision: "", timeframe: "" };
  let qualifyIndex = -1;

  const style = document.createElement("style");
  style.textContent = `
    #cc-btn {
      position:fixed;bottom:28px;right:28px;z-index:10000;
      width:58px;height:58px;border-radius:50%;
      background:linear-gradient(135deg,#00bcd4,#e83e8c);
      border:none;cursor:pointer !important;
      display:flex;align-items:center;justify-content:center;
      box-shadow:0 4px 24px rgba(0,188,212,0.35);
      transition:transform .2s,box-shadow .2s;
    }
    #cc-btn:hover{transform:scale(1.08);box-shadow:0 6px 30px rgba(232,62,140,0.35);}
    #cc-btn svg{transition:transform .3s;}
    #cc-btn.open svg{transform:rotate(90deg);}
    #cc-label {
      position:fixed;bottom:42px;right:96px;z-index:10000;
      background:#1a1a1a;color:#F0EAD6;font-family:'Poppins',system-ui,sans-serif;
      font-size:.75rem;font-weight:500;padding:8px 12px;border-radius:100px;
      box-shadow:0 4px 16px rgba(0,0,0,.15);pointer-events:none;
      opacity:1;transition:opacity .2s;
    }
    #cc-label.hidden{opacity:0;}
    #cc-panel {
      position:fixed;bottom:100px;right:28px;z-index:9999;
      width:360px;max-height:540px;
      background:#F0EAD6;border-radius:16px;
      box-shadow:0 16px 60px rgba(26,26,26,0.18);
      display:flex;flex-direction:column;overflow:hidden;
      font-family:'Poppins',system-ui,sans-serif;
      opacity:0;transform:translateY(16px) scale(0.97);pointer-events:none;
      transition:opacity .25s,transform .25s;
      cursor:auto !important;
    }
    #cc-panel, #cc-panel * { cursor: auto !important; }
    #cc-btn, #cc-send, .cc-qb, #cc-book, #cc-mail { cursor: pointer !important; }
    body.cursor-on-chat #cursor-blob,
    body.cursor-on-chat #cursor-inner { opacity: 0 !important; visibility: hidden; }
    #cc-panel.visible{opacity:1;transform:translateY(0) scale(1);pointer-events:all;}
    #cc-head {
      background:#1a1a1a;padding:18px 20px;
      display:flex;align-items:center;gap:12px;flex-shrink:0;
    }
    #cc-avatar {
      width:36px;height:36px;border-radius:50%;flex-shrink:0;
      background:linear-gradient(135deg,#00bcd4,#e83e8c);
      display:flex;align-items:center;justify-content:center;
    }
    #cc-hname{font-size:.88rem;font-weight:600;color:#F0EAD6;line-height:1.2;}
    #cc-hstatus{font-size:.72rem;font-weight:300;color:rgba(240,234,214,.5);}
    #cc-hstatus span{display:inline-block;width:6px;height:6px;background:#00bcd4;border-radius:50%;margin-right:5px;vertical-align:middle;}
    #cc-msgs {
      flex:1;overflow-y:auto;padding:20px 16px 12px;
      display:flex;flex-direction:column;gap:12px;scroll-behavior:smooth;
    }
    #cc-msgs::-webkit-scrollbar{width:4px;}
    #cc-msgs::-webkit-scrollbar-thumb{background:rgba(26,26,26,.1);border-radius:4px;}
    .cc-m{max-width:84%;font-size:.875rem;line-height:1.55;font-weight:300;animation:ccUp .25s ease forwards;}
    .cc-bot{align-self:flex-start;background:#fff;color:#1a1a1a;padding:11px 15px;border-radius:4px 16px 16px 16px;box-shadow:0 2px 8px rgba(26,26,26,.06);}
    .cc-usr{align-self:flex-end;background:#1a1a1a;color:#F0EAD6;padding:11px 15px;border-radius:16px 4px 16px 16px;}
    .cc-typing{align-self:flex-start;background:#fff;padding:11px 16px;border-radius:4px 16px 16px 16px;display:flex;gap:5px;align-items:center;box-shadow:0 2px 8px rgba(26,26,26,.06);}
    .cc-typing span{width:6px;height:6px;background:#888;border-radius:50%;animation:ccBounce 1.2s infinite;}
    .cc-typing span:nth-child(2){animation-delay:.2s;}
    .cc-typing span:nth-child(3){animation-delay:.4s;}
    #cc-qr{padding:0 16px 12px;display:flex;flex-wrap:wrap;gap:7px;flex-shrink:0;}
    .cc-qb{
      background:transparent;border:1.5px solid rgba(26,26,26,.15);border-radius:100px;
      padding:6px 14px;font-family:'Poppins',system-ui,sans-serif;font-size:.75rem;font-weight:400;
      color:#555;cursor:pointer;transition:border-color .2s,color .2s,background .2s;white-space:nowrap;
    }
    .cc-qb:hover{border-color:#00bcd4;color:#00bcd4;background:rgba(0,188,212,.05);}
    #cc-book{
      margin:0 16px 8px;display:none;
      background:linear-gradient(135deg,#00bcd4,#e83e8c);
      color:#fff;border:none;border-radius:100px;padding:11px 20px;
      font-family:'Poppins',system-ui,sans-serif;font-size:.82rem;font-weight:600;
      cursor:pointer;text-align:center;text-decoration:none;
      transition:opacity .2s,transform .2s;flex-shrink:0;
    }
    #cc-book:hover{opacity:.88;transform:translateY(-1px);}
    #cc-mail{
      margin:0 16px 12px;display:none;
      background:transparent;border:1.5px solid rgba(26,26,26,.2);
      color:#1a1a1a;border-radius:100px;padding:10px 18px;
      font-family:'Poppins',system-ui,sans-serif;font-size:.78rem;font-weight:500;
      cursor:pointer;text-align:center;text-decoration:none;flex-shrink:0;
    }
    #cc-mail:hover{border-color:#00bcd4;color:#00bcd4;}
    #cc-foot{display:flex;gap:10px;padding:12px 16px 16px;border-top:1px solid rgba(26,26,26,.07);flex-shrink:0;}
    #cc-inp{
      flex:1;border:1.5px solid rgba(26,26,26,.15);border-radius:100px;
      padding:10px 18px;font-family:'Poppins',system-ui,sans-serif;font-size:.875rem;font-weight:300;
      color:#1a1a1a;background:#fff;outline:none;transition:border-color .2s;
    }
    #cc-inp:focus{border-color:#00bcd4;}
    #cc-inp::placeholder{color:#aaa;}
    #cc-send{
      width:40px;height:40px;border-radius:50%;background:#1a1a1a;border:none;cursor:pointer;
      display:flex;align-items:center;justify-content:center;flex-shrink:0;
      transition:background .2s,transform .2s;
    }
    #cc-send:hover{background:#00bcd4;transform:scale(1.05);}
    @keyframes ccUp{from{opacity:0;transform:translateY(8px)}to{opacity:1;transform:translateY(0)}}
    @keyframes ccBounce{0%,60%,100%{transform:translateY(0)}30%{transform:translateY(-5px)}}
    @media(max-width:420px){
      #cc-panel{width:calc(100vw - 32px);right:16px;bottom:90px;max-height:70vh;}
      #cc-btn{right:16px;bottom:16px;}
      #cc-label{right:84px;bottom:30px;}
    }
  `;
  document.head.appendChild(style);

  document.body.insertAdjacentHTML(
    "beforeend",
    `
    <div id="cc-label">Chat with us</div>
    <button id="cc-btn" aria-label="Open chat">
      <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="#F0EAD6" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
        <circle cx="8.5" cy="10.5" r="1" fill="#F0EAD6" stroke="none"/>
        <circle cx="12" cy="10.5" r="1" fill="#F0EAD6" stroke="none"/>
        <circle cx="15.5" cy="10.5" r="1" fill="#F0EAD6" stroke="none"/>
      </svg>
    </button>
    <div id="cc-panel" role="dialog" aria-label="ClickClick chat">
      <div id="cc-head">
        <div id="cc-avatar" aria-hidden="true">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#F0EAD6" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
        </div>
        <div>
          <div id="cc-hname">ClickClick Support</div>
          <div id="cc-hstatus"><span></span>Online now</div>
        </div>
      </div>
      <div id="cc-msgs"></div>
      <div id="cc-qr"></div>
      <a id="cc-book" href="${CALENDAR_URL}" target="_blank" rel="noopener">Book a call</a>
      <a id="cc-mail" href="mailto:${EMAIL}">Email ${EMAIL}</a>
      <div id="cc-foot">
        <input id="cc-inp" type="text" placeholder="Ask about solutions, pricing…" autocomplete="off"/>
        <button id="cc-send" aria-label="Send">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#F0EAD6" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/>
          </svg>
        </button>
      </div>
    </div>
  `
  );

  const panel = document.getElementById("cc-panel");
  const btn = document.getElementById("cc-btn");
  const label = document.getElementById("cc-label");
  const msgs = document.getElementById("cc-msgs");
  const inp = document.getElementById("cc-inp");
  const send = document.getElementById("cc-send");
  const qr = document.getElementById("cc-qr");
  const book = document.getElementById("cc-book");
  const mail = document.getElementById("cc-mail");
  let open = false;
  let qrShown = false;

  function leadMailto() {
    const body = [
      "Hi ClickClick,",
      "",
      "Chatbot lead notes:",
      `Problem: ${lead.problem || "—"}`,
      `Budget: ${lead.budget || "—"}`,
      `Decision maker: ${lead.decision || "—"}`,
      `Timeframe: ${lead.timeframe || "—"}`,
      "",
      "Sent from the website chatbot.",
    ].join("\n");
    return (
      "mailto:" +
      EMAIL +
      "?subject=" +
      encodeURIComponent("Website chat enquiry") +
      "&body=" +
      encodeURIComponent(body)
    );
  }

  function showActions(showBook) {
    if (showBook) book.style.display = "block";
    mail.style.display = "block";
    mail.href = leadMailto();
  }

  function addMsg(text, role) {
    const d = document.createElement("div");
    d.className = "cc-m " + (role === "user" ? "cc-usr" : "cc-bot");
    d.textContent = text;
    msgs.appendChild(d);
    msgs.scrollTop = msgs.scrollHeight;
  }

  function typing(show) {
    if (show) {
      const d = document.createElement("div");
      d.className = "cc-typing";
      d.id = "cc-t";
      d.innerHTML = "<span></span><span></span><span></span>";
      msgs.appendChild(d);
      msgs.scrollTop = msgs.scrollHeight;
    } else {
      const t = document.getElementById("cc-t");
      if (t) t.remove();
    }
  }

  function showQR() {
    if (qrShown) return;
    qrShown = true;
    QUICK_REPLIES.forEach((labelText) => {
      const b = document.createElement("button");
      b.className = "cc-qb";
      b.textContent = labelText;
      b.addEventListener("click", () => {
        qr.innerHTML = "";
        send_msg(labelText);
      });
      qr.appendChild(b);
    });
  }

  function getResponse(text) {
    const low = (" " + text.toLowerCase() + " ").replace(/\s+/g, " ");
    for (const r of RESPONSES) {
      if (r.keys.some((k) => low.includes(k.toLowerCase()))) return r;
    }
    return null;
  }

  function startQualify() {
    qualifyIndex = 0;
    addMsg("Of course — just a few quick questions so the team can help properly. You can say “skip” on any of them.", "bot");
    setTimeout(() => addMsg(QUALIFY_STEPS[0].prompt, "bot"), 350);
  }

  function finishQualify() {
    qualifyIndex = -1;
    addMsg(
      "Thank you — that’s really helpful. You can book a call below, or email us and I’ll include these notes so the team has the context.",
      "bot"
    );
    showActions(true);
  }

  function handleQualify(text) {
    const step = QUALIFY_STEPS[qualifyIndex];
    const value = text.toLowerCase() === "skip" ? "Skipped" : text;
    lead[step.key] = value;
    qualifyIndex += 1;
    if (qualifyIndex >= QUALIFY_STEPS.length) {
      finishQualify();
      return;
    }
    addMsg(QUALIFY_STEPS[qualifyIndex].prompt, "bot");
  }

  function botReply(fn) {
    typing(true);
    setTimeout(() => {
      typing(false);
      fn();
    }, 700 + Math.random() * 350);
  }

  function send_msg(text) {
    text = text.trim();
    if (!text) return;
    inp.value = "";
    qr.innerHTML = "";
    addMsg(text, "user");

    botReply(() => {
      if (qualifyIndex >= 0) {
        handleQualify(text);
        return;
      }

      const match = getResponse(text);
      if (match && match.reply === "__QUALIFY__") {
        startQualify();
        return;
      }

      if (match) {
        addMsg(match.reply, "bot");
        if (match.book) showActions(true);
      } else {
        addMsg(FALLBACKS[fallbackIndex++ % FALLBACKS.length], "bot");
        showActions(true);
      }
    });
  }

  function toggle() {
    open = !open;
    panel.classList.toggle("visible", open);
    btn.classList.toggle("open", open);
    label.classList.toggle("hidden", open);
    if (open && msgs.children.length === 0) {
      setTimeout(() => {
        addMsg("Hi there — how can I help today?", "bot");
        setTimeout(showQR, 400);
      }, 200);
    }
    if (open) setTimeout(() => inp.focus(), 250);
  }

  btn.addEventListener("click", toggle);
  send.addEventListener("click", () => send_msg(inp.value));
  inp.addEventListener("keydown", (e) => {
    if (e.key === "Enter") send_msg(inp.value);
  });
})();
