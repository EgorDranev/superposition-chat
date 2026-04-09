import React, { useState, useRef, useEffect } from "react";

// ─── Design tokens — extracted from superposition.pro screenshot ─────────────
// Light lavender-gray page, white cards, medium purple CTA, dark charcoal text
const T = {
  bgPage:      "#eceaf2",   // site's light lavender-gray background
  bgCard:      "#ffffff",   // white — cards, nav, bubbles
  bgUser:      "#7c5abf",   // medium purple — matches "Записаться" / "Онлайн-запись" CTA
  bgChip:      "#ffffff",   // white pill — matches nav pill style

  border:      "rgba(0,0,0,0.09)",
  borderMid:   "rgba(0,0,0,0.14)",

  accent:      "#7c5abf",   // medium purple — CTA color
  accentLight: "#ede9f8",   // very light purple tint

  textPrimary: "#1a1a2e",   // dark near-black — body text
  textMuted:   "#6b6682",   // medium purple-gray — secondary text (readable: ~5:1 on white)
  textOnPurple:"#ffffff",   // white on purple backgrounds
  textLink:    "#7c5abf",   // links match accent

  online:      "#2ea86b",
};

const SYSTEM = `Ты — Наталья Захарова, основательница и главный тренер студии Superposition.pro (Москва, Новинский бульвар 7, м. Смоленская). Ты всегда говоришь от первого лица, от своего имени. Никогда не выходи из роли.

Правила диалога:

ПЕРВЫЙ ответ — приветствие:
Тепло поприветствуй. Покажи, что слышишь запрос. Задай ровно один уточняющий вопрос (опыт, травмы, цель, ритм жизни). Не больше.

ВТОРОЙ и последующие ответы — консультация:
Отвечай конкретно: упражнения, подходы, нюансы под эту цель. Говори как эксперт, но живым языком. Если нужно уточнить — один вопрос, не больше. Максимум 3-4 предложения.

ВАЖНО — не пиши ссылки и не упоминай запись в тексте ответа. Кнопка с приглашением на пробную тренировку добавляется автоматически под каждым твоим ответом, начиная со второго.

Тон: тёплый, уверенный, человечный. Без восклицательных знаков через слово, без "конечно!", без маркированных списков. Пиши как живой человек — коротко и по делу.`;

const CHIPS = ["Набор мышечной массы", "Похудение", "Выносливость", "Реабилитация"];

// ─── Avatar ───────────────────────────────────────────────────────────────────
function NatalyaAvatar({ size = 36 }) {
  return (
    <div style={{ width: size, height: size, borderRadius: "50%", overflow: "hidden", flexShrink: 0, boxShadow: `0 0 0 2px #fff, 0 0 0 3.5px ${T.accent}` }}>
      <svg width={size} height={size} viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="bg" cx="50%" cy="38%" r="65%">
            <stop offset="0%" stopColor="#1e1535"/>
            <stop offset="100%" stopColor="#07050f"/>
          </radialGradient>
          <radialGradient id="faceGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#c6b7f2" stopOpacity="0.18"/>
            <stop offset="100%" stopColor="#c6b7f2" stopOpacity="0"/>
          </radialGradient>
          <radialGradient id="eyeL" cx="40%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#ddd0ff"/>
            <stop offset="50%" stopColor="#9b7ee8"/>
            <stop offset="100%" stopColor="#5530a8"/>
          </radialGradient>
          <radialGradient id="eyeR" cx="40%" cy="35%" r="60%">
            <stop offset="0%" stopColor="#ddd0ff"/>
            <stop offset="50%" stopColor="#9b7ee8"/>
            <stop offset="100%" stopColor="#5530a8"/>
          </radialGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="1.2" result="blur"/>
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
        <rect width="100" height="100" fill="url(#bg)"/>
        <line x1="50" y1="0" x2="50" y2="100" stroke="#c6b7f2" strokeWidth="0.2" opacity="0.06"/>
        <line x1="0" y1="50" x2="100" y2="50" stroke="#c6b7f2" strokeWidth="0.2" opacity="0.06"/>
        <ellipse cx="50" cy="53" rx="28" ry="33" fill="url(#faceGlow)"/>
        <path d="M8 100 L22 73 Q50 83 78 73 L92 100Z" fill="#120d1f"/>
        <path d="M32 80 L50 76 L68 80" stroke="#c6b7f2" strokeWidth="0.7" opacity="0.55" fill="none"/>
        <path d="M26 86 L50 80 L74 86" stroke="#c6b7f2" strokeWidth="0.3" opacity="0.25" fill="none"/>
        <rect x="44" y="70" width="12" height="12" rx="4" fill="#c09070"/>
        <ellipse cx="50" cy="37" rx="27" ry="24" fill="#110a1a"/>
        <ellipse cx="50" cy="56" rx="21" ry="25" fill="#c8936e"/>
        <path d="M23 45 Q26 23 50 19 Q74 23 77 45 Q67 37 50 35 Q33 37 23 45Z" fill="#150b22"/>
        <ellipse cx="25" cy="51" rx="7" ry="12" fill="#150b22"/>
        <ellipse cx="75" cy="51" rx="7" ry="12" fill="#150b22"/>
        <path d="M23 45 Q26 23 50 19 Q74 23 77 45" stroke="#c6b7f2" strokeWidth="0.8" opacity="0.5" fill="none" filter="url(#glow)"/>
        <path d="M18 55 Q20 35 25 28" stroke="#c6b7f2" strokeWidth="0.5" opacity="0.3" fill="none"/>
        <path d="M82 55 Q80 35 75 28" stroke="#c6b7f2" strokeWidth="0.5" opacity="0.3" fill="none"/>
        <path d="M40 26 Q42 16 48 19" stroke="#2a1438" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
        <path d="M50 18 Q52 12 57 16" stroke="#2a1438" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
        <path d="M58 23 Q64 15 66 19" stroke="#2a1438" strokeWidth="1.8" strokeLinecap="round" fill="none"/>
        <path d="M33 29 Q28 20 34 18" stroke="#2a1438" strokeWidth="1.4" strokeLinecap="round" fill="none"/>
        <path d="M25 42 Q21 32 27 28" stroke="#2a1438" strokeWidth="1.3" strokeLinecap="round" fill="none"/>
        <path d="M71 37 Q77 27 73 23" stroke="#2a1438" strokeWidth="1.3" strokeLinecap="round" fill="none"/>
        <ellipse cx="50" cy="41" rx="19" ry="9" fill="#c8936e"/>
        <path d="M28 58 L33 55" stroke="#c6b7f2" strokeWidth="0.5" opacity="0.35"/>
        <path d="M72 58 L67 55" stroke="#c6b7f2" strokeWidth="0.5" opacity="0.35"/>
        <path d="M31 49 Q38 44 44 47" stroke="#150b22" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
        <path d="M56 47 Q62 44 69 49" stroke="#150b22" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
        <path d="M32 50 Q38 46 43 48" stroke="#c6b7f2" strokeWidth="0.5" opacity="0.4" fill="none"/>
        <path d="M57 48 Q62 46 68 50" stroke="#c6b7f2" strokeWidth="0.5" opacity="0.4" fill="none"/>
        <ellipse cx="38" cy="54" rx="6.5" ry="4.5" fill="#08051a"/>
        <ellipse cx="62" cy="54" rx="6.5" ry="4.5" fill="#08051a"/>
        <circle cx="38" cy="54" r="3.8" fill="url(#eyeL)"/>
        <circle cx="62" cy="54" r="3.8" fill="url(#eyeR)"/>
        <circle cx="38" cy="54" r="2" fill="#1a0a3a"/>
        <circle cx="62" cy="54" r="2" fill="#1a0a3a"/>
        <circle cx="38" cy="54" r="3.8" stroke="#c6b7f2" strokeWidth="0.6" opacity="0.7" fill="none" filter="url(#glow)"/>
        <circle cx="62" cy="54" r="3.8" stroke="#c6b7f2" strokeWidth="0.6" opacity="0.7" fill="none" filter="url(#glow)"/>
        <circle cx="39.5" cy="52.2" r="1.1" fill="white" opacity="0.85"/>
        <circle cx="63.5" cy="52.2" r="1.1" fill="white" opacity="0.85"/>
        <path d="M32 51 Q38 48.5 44 51" stroke="#150b22" strokeWidth="1.2" fill="none"/>
        <path d="M56 51 Q62 48.5 68 51" stroke="#150b22" strokeWidth="1.2" fill="none"/>
        <path d="M47 61 Q46 66 49 67.5 Q51 67.5 53 67 Q56 65.5 55 61" stroke="#a07050" strokeWidth="1.1" fill="none" strokeLinecap="round"/>
        <path d="M42 72.5 Q46 69 50 70.5 Q54 69 58 72.5 Q54 77 50 77 Q46 77 42 72.5Z" fill="#a85e78"/>
        <path d="M42 72.5 Q50 75 58 72.5" stroke="#8a4860" strokeWidth="0.7" fill="none"/>
        <path d="M45.5 71 Q50 70 54.5 71" stroke="#c07090" strokeWidth="0.7" fill="none" strokeLinecap="round"/>
        <path d="M5 5 L5 14 M5 5 L14 5" stroke="#c6b7f2" strokeWidth="1.2" opacity="0.65" strokeLinecap="round"/>
        <path d="M95 5 L95 14 M95 5 L86 5" stroke="#c6b7f2" strokeWidth="1.2" opacity="0.65" strokeLinecap="round"/>
        <path d="M5 95 L5 86 M5 95 L14 95" stroke="#c6b7f2" strokeWidth="1.2" opacity="0.65" strokeLinecap="round"/>
        <path d="M95 95 L95 86 M95 95 L86 95" stroke="#c6b7f2" strokeWidth="1.2" opacity="0.65" strokeLinecap="round"/>
        <rect x="0" y="50" width="100" height="0.5" fill="#c6b7f2" opacity="0.07"/>
        <circle cx="17" cy="50" r="1" fill="#c6b7f2" opacity="0.45"/>
        <circle cx="83" cy="50" r="1" fill="#c6b7f2" opacity="0.45"/>
        <path d="M21 36 Q15 53 21 70" stroke="#c6b7f2" strokeWidth="0.5" opacity="0.2" fill="none" strokeDasharray="1.5 3"/>
        <path d="M79 36 Q85 53 79 70" stroke="#c6b7f2" strokeWidth="0.5" opacity="0.2" fill="none" strokeDasharray="1.5 3"/>
      </svg>
    </div>
  );
}

// ─── CTA button — matches site's purple "Записаться" button ─────────────────
const CTA_URL = "https://superposition.pro/fitnes-tancy#form";

function CtaButton() {
  return (
    <a
      href={CTA_URL}
      target="_blank"
      rel="noreferrer"
      style={{
        display: "inline-flex", alignItems: "center", gap: 7,
        marginTop: 6,
        padding: "9px 16px",
        borderRadius: 20,
        background: T.accent,
        color: "#ffffff",
        fontSize: 12.5, fontWeight: 500,
        fontFamily: "inherit",
        textDecoration: "none",
        letterSpacing: "0.01em",
        boxShadow: "0 2px 8px rgba(124,90,191,0.25)",
        transition: "opacity 0.15s",
      }}
      onMouseEnter={e => e.currentTarget.style.opacity = "0.88"}
      onMouseLeave={e => e.currentTarget.style.opacity = "1"}
    >
      <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
        <rect x="1" y="2.5" width="11" height="9" rx="1.5" stroke="white" strokeWidth="1.2"/>
        <path d="M1 5.5h11" stroke="white" strokeWidth="1.2"/>
        <path d="M4 1v3M9 1v3" stroke="white" strokeWidth="1.2" strokeLinecap="round"/>
      </svg>
      Записаться на пробную тренировку
    </a>
  );
}


// ─── FAQ accordion — expands under CtaButton ─────────────────────────────────
const FAQ_QUESTIONS = [
  "Подходят ли тренировки для новичков без опыта?",
  "Как проходит первое занятие и сколько оно стоит?",
  "Можно ли заниматься при болях в спине или травмах?",
  "Сколько тренировок в неделю нужно для результата?",
  "Есть ли онлайн-формат занятий?",
];

function FaqButton({ onQuestion }) {
  const [open, setOpen] = React.useState(false);
  return (
    <div style={{ marginTop: 6 }}>
      <button
        onClick={() => setOpen(o => !o)}
        style={{
          display: "inline-flex", alignItems: "center", gap: 7,
          padding: "9px 16px", borderRadius: 20,
          background: "transparent",
          border: `1px solid ${T.borderMid}`,
          color: T.textMuted, fontSize: 12.5, fontWeight: 500,
          fontFamily: "inherit", cursor: "pointer",
          letterSpacing: "0.01em",
          transition: "all 0.15s",
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = T.accent; e.currentTarget.style.color = T.accent; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = T.borderMid; e.currentTarget.style.color = T.textMuted; }}
      >
        <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
          <circle cx="6.5" cy="6.5" r="5.5" stroke="currentColor" strokeWidth="1.2"/>
          <path d="M6.5 5.5c0-.8.6-1.5 1.5-1s1 1.5 0 2c-.4.2-.5.5-.5.8" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
          <circle cx="6.5" cy="9.5" r="0.6" fill="currentColor"/>
        </svg>
        Часто задаваемые вопросы
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none"
          style={{ transform: open ? "rotate(180deg)" : "rotate(0deg)", transition: "transform 0.2s" }}>
          <path d="M2 3.5l3 3 3-3" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </button>

      {open && (
        <div style={{
          marginTop: 8, display: "flex", flexDirection: "column", gap: 4,
          animation: "fadeUp 0.15s ease",
        }}>
          {FAQ_QUESTIONS.map((q, i) => (
            <button key={i} onClick={() => { setOpen(false); onQuestion(q); }} style={{
              textAlign: "left", padding: "8px 13px",
              borderRadius: 10,
              border: `1px solid ${T.border}`,
              background: T.bgCard,
              color: T.textPrimary,
              fontSize: 12.5, fontFamily: "inherit", cursor: "pointer",
              lineHeight: 1.45, fontWeight: 400,
              transition: "all 0.12s",
              boxShadow: "0 1px 3px rgba(28,20,50,0.06)",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = T.accent; e.currentTarget.style.background = T.accentLight; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = T.border; e.currentTarget.style.background = T.bgCard; }}
            >
              <span style={{ color: T.accent, marginRight: 6, fontSize: 11 }}>→</span>{q}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── App ──────────────────────────────────────────────────────────────────────
export default function App() {
  const [messages, setMessages] = useState([
    { role: "assistant", text: "Привет. Я Наталья, тренер и основательница Superposition.pro. Расскажите, с чем хотите поработать — и я подскажу, с чего лучше начать." }
  ]);
  const [input, setInput]        = useState("");
  const [loading, setLoading]    = useState(false);
  const [chipsVisible, setChips] = useState(true);
  const [history, setHistory]    = useState([]);
  const [convId,  setConvId]     = useState(null);
  const bottomRef                = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [messages, loading]);

  async function send(text) {
    const msg = text || input.trim();
    if (!msg || loading) return;
    setChips(false);
    setInput("");
    const newHistory = [...history, { role: "user", content: msg }];
    setHistory(newHistory);
    setMessages(prev => [...prev, { role: "user", text: msg }]);
    setLoading(true);
    try {
      const headers = { "Content-Type": "application/json" };
      if (convId) headers["x-conv-id"] = convId;
      const res = await fetch("/api/chat", {
        method: "POST",
        headers,
        body: JSON.stringify({ model: "claude-sonnet-4-20250514", max_tokens: 1000, system: SYSTEM, messages: newHistory })
      });
      const data = await res.json();
      const returnedId = res.headers.get("x-conv-id");
      if (returnedId) setConvId(returnedId);
      if (!res.ok || !data.content) {
        const errMsg = data?.error?.message || data?.error || JSON.stringify(data);
        setMessages(prev => [...prev, { role: "assistant", text: "Ошибка API: " + errMsg }]);
      } else {
        const reply = data.content[0].text;
        setHistory(prev => [...prev, { role: "assistant", content: reply }]);
        setMessages(prev => [...prev, { role: "assistant", text: reply }]);
      }
    } catch (e) {
      setMessages(prev => [...prev, { role: "assistant", text: "Ошибка fetch: " + e.message }]);
    }
    setLoading(false);
  }

  function renderText(text) {
    return text.split(/(https?:\/\/[^\s]+)/g).map((p, i) =>
      p.match(/^https?:\/\//)
        ? <a key={i} href={p} target="_blank" rel="noreferrer"
            style={{ color: T.textLink, fontWeight: 500, textDecoration: "none", borderBottom: `1px solid rgba(124,90,191,0.3)` }}>{p}</a>
        : p
    );
  }

  return (
    <div style={{
      fontFamily: "'DM Sans', sans-serif",
      display: "flex", flexDirection: "column",
      height: "100vh", maxWidth: 640, margin: "0 auto",
      background: T.bgPage,
      borderRadius: 16, overflow: "hidden",
      boxShadow: "0 4px 32px rgba(28,20,50,0.12)",
      WebkitFontSmoothing: "antialiased",
    }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&family=DM+Sans:wght@300;400;500&display=swap');
        ::-webkit-scrollbar { width: 0 }
        @keyframes bounce { 0%,80%,100%{transform:translateY(0)} 40%{transform:translateY(-5px)} }
        @keyframes fadeUp { from{opacity:0;transform:translateY(4px)} to{opacity:1;transform:translateY(0)} }
        .msg-row { animation: fadeUp 0.18s ease }
        .chip:hover { background: ${T.accentLight} !important; border-color: ${T.accent} !important; color: ${T.accent} !important }
        .send:hover:not(:disabled) { background: #6a4aab !important }
        textarea { color: ${T.textPrimary}; caret-color: ${T.accent} }
        textarea::placeholder { color: #a09ab8 }
      `}</style>

      {/* ── Header — white card, matches site nav style ───────────────────── */}
      <div style={{
        padding: "14px 20px 13px",
        background: T.bgCard,
        display: "flex", alignItems: "center", gap: 12,
        borderBottom: `1px solid ${T.border}`,
        boxShadow: "0 1px 0 rgba(0,0,0,0.06)",
      }}>
        <NatalyaAvatar size={44} />
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{
            fontFamily: "'Cormorant Garamond', serif",
            fontSize: 17, fontWeight: 600,
            letterSpacing: "0.06em", textTransform: "uppercase",
            color: T.textPrimary,
            lineHeight: 1.2,
          }}>
            Наталья Захарова
          </div>
          <div style={{
            fontSize: 11, color: T.textMuted,      // #6b6682 on white = ~5.2:1 ✓
            letterSpacing: "0.03em", marginTop: 2,
          }}>
            Superposition.pro · тренер-основательница
          </div>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: 5, flexShrink: 0 }}>
          <div style={{ width: 7, height: 7, borderRadius: "50%", background: T.online }} />
          <span style={{ fontSize: 11, color: T.online, fontWeight: 500 }}>Online</span>
        </div>
      </div>

      {/* ── Messages — lavender-gray canvas with white bubbles ────────────── */}
      <div style={{
        flex: 1, overflowY: "auto",
        padding: "20px 16px 8px",
        display: "flex", flexDirection: "column", gap: 16,
        background: T.bgPage,
      }}>
        {messages.map((m, i) => {
          // count how many assistant messages have appeared up to and including this one
          const assistantIndex = messages.slice(0, i + 1).filter(x => x.role === "assistant").length;
          const showCta = m.role === "assistant" && assistantIndex >= 2;

          return (
          <div key={i} className="msg-row" style={{
            display: "flex", gap: 9, alignItems: "flex-end",
            flexDirection: m.role === "user" ? "row-reverse" : "row",
          }}>
            {m.role === "assistant" && <NatalyaAvatar size={32} />}

            <div style={{ display: "flex", flexDirection: "column", gap: 3,
              alignItems: m.role === "user" ? "flex-end" : "flex-start", maxWidth: "76%" }}>
              <div style={{
                fontSize: 10.5, color: T.textMuted,
                fontFamily: "'Cormorant Garamond', serif", fontWeight: 500,
                letterSpacing: "0.05em",
                paddingLeft: m.role === "assistant" ? 3 : 0,
                paddingRight: m.role === "user" ? 3 : 0,
              }}>
                {m.role === "user" ? "Вы" : "Наталья"}
              </div>

              <div style={{
                padding: "12px 16px",
                borderRadius: m.role === "user" ? "16px 16px 4px 16px" : "16px 16px 16px 4px",
                fontSize: 14, lineHeight: 1.65, fontWeight: 400,
                background: m.role === "user" ? T.bgUser : T.bgCard,
                color: m.role === "user" ? T.textOnPurple : T.textPrimary,
                border: m.role === "assistant" ? `1px solid ${T.border}` : "none",
                boxShadow: "0 1px 6px rgba(28,20,50,0.08)",
              }}>
                {renderText(m.text)}
              </div>

              {showCta && <><CtaButton /><FaqButton onQuestion={send} /></>}
            </div>
          </div>
          );
        })}

        {loading && (
          <div className="msg-row" style={{ display: "flex", gap: 9, alignItems: "flex-end" }}>
            <NatalyaAvatar size={32} />
            <div style={{
              padding: "14px 16px", borderRadius: "16px 16px 16px 4px",
              background: T.bgCard, border: `1px solid ${T.border}`,
              boxShadow: "0 1px 6px rgba(28,20,50,0.08)",
              display: "flex", gap: 5, alignItems: "center",
            }}>
              {[0, 0.18, 0.36].map((d, i) => (
                <div key={i} style={{ width: 5, height: 5, borderRadius: "50%",
                  background: T.accent, animation: `bounce 1.2s ${d}s infinite` }} />
              ))}
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* ── Quick chips — white pills matching site nav pill style ─────────── */}
      {chipsVisible && (
        <div style={{
          display: "flex", flexWrap: "wrap", gap: 8,
          padding: "10px 16px 14px",
          background: T.bgPage,
          borderTop: `1px solid ${T.border}`,
        }}>
          {CHIPS.map(c => (
            <button key={c} className="chip" onClick={() => send(c)} style={{
              fontSize: 12, padding: "6px 14px", borderRadius: 20,
              border: `1px solid ${T.borderMid}`,
              // #1a1a2e on white = 18:1 ✓
              color: T.textPrimary, cursor: "pointer",
              background: T.bgChip,
              fontFamily: "inherit", fontWeight: 400,
              transition: "all 0.15s",
            }}>{c}</button>
          ))}
        </div>
      )}

      {/* ── Input — white card matching the site's card/form style ─────────── */}
      <div style={{
        borderTop: `1px solid ${T.border}`,
        padding: "12px 14px 14px",
        display: "flex", gap: 10, alignItems: "flex-end",
        background: T.bgCard,
      }}>
        <textarea
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } }}
          placeholder="Напишите вопрос..."
          rows={1}
          style={{
            flex: 1, border: `1px solid ${T.border}`,
            borderRadius: 10, padding: "10px 14px",
            fontFamily: "inherit", fontSize: 14,
            resize: "none", outline: "none",
            lineHeight: 1.5, minHeight: 40, maxHeight: 110,
            fontWeight: 400, background: T.bgPage,
            // #a09ab8 placeholder on #eceaf2 = ~3.1:1 — acceptable for placeholder
          }}
        />
        {/* Send button — same purple as site's CTA "Записаться" */}
        <button className="send" onClick={() => send()} disabled={loading} style={{
          width: 40, height: 40, borderRadius: 10,
          background: T.accent,  // #7c5abf — same as site CTA
          border: "none", cursor: loading ? "default" : "pointer",
          display: "flex", alignItems: "center", justifyContent: "center",
          opacity: loading ? 0.4 : 1, flexShrink: 0,
          transition: "background 0.15s, opacity 0.15s",
        }}>
          <svg width="15" height="15" viewBox="0 0 14 14" fill="none">
            <path d="M2 7h10M8 3l4 4-4 4" stroke="#ffffff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
      </div>
    </div>
  );
}
