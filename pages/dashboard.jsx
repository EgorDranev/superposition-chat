import { useState, useEffect, useCallback } from "react";

const PASS_KEY = "sp_dash_pass";

function timeAgo(ts) {
  const diff = Date.now() - ts;
  const m = Math.floor(diff / 60000);
  if (m < 1)  return "только что";
  if (m < 60) return `${m} мин назад`;
  const h = Math.floor(m / 60);
  if (h < 24) return `${h} ч назад`;
  return `${Math.floor(h / 24)} дн назад`;
}

function formatDate(ts) {
  return new Date(ts).toLocaleString("ru-RU", {
    day:"2-digit", month:"2-digit", year:"numeric",
    hour:"2-digit", minute:"2-digit",
  });
}

function ConvCard({ conv, expanded, onToggle }) {
  const userMsgs = conv.messages?.filter(m => m.role === "user") || [];
  const aiMsgs   = conv.messages?.filter(m => m.role === "assistant") || [];
  const firstMsg = userMsgs[0]?.content || "";
  const preview  = firstMsg.length > 80 ? firstMsg.slice(0, 80) + "…" : firstMsg;

  return (
    <div style={{
      background:"#fff", borderRadius:12, border:"1px solid #e8e4f0",
      overflow:"hidden", transition:"box-shadow .15s",
      boxShadow: expanded ? "0 4px 20px rgba(124,90,191,.1)" : "none",
    }}>
      {/* Header */}
      <div
        onClick={onToggle}
        style={{
          padding:"16px 20px", cursor:"pointer", display:"flex",
          alignItems:"center", gap:14,
          borderBottom: expanded ? "1px solid #f0edf8" : "none",
        }}
      >
        <div style={{
          width:40, height:40, borderRadius:"50%", flexShrink:0,
          background:"#ede9f8", display:"flex", alignItems:"center", justifyContent:"center",
          fontSize:16,
        }}>💬</div>
        <div style={{flex:1, minWidth:0}}>
          <div style={{fontSize:13.5, fontWeight:600, color:"#16131f", marginBottom:3,
            overflow:"hidden", textOverflow:"ellipsis", whiteSpace:"nowrap"}}>
            {preview || "(пустое сообщение)"}
          </div>
          <div style={{fontSize:11.5, color:"#9b94b0", display:"flex", gap:12}}>
            <span>💬 {userMsgs.length + aiMsgs.length} сообщений</span>
            <span>🕐 {timeAgo(conv.lastActivity)}</span>
            <span style={{overflow:"hidden",textOverflow:"ellipsis",whiteSpace:"nowrap",maxWidth:200}}>
              {conv.id}
            </span>
          </div>
        </div>
        <div style={{fontSize:11, color:"#b0a8c8", flexShrink:0, textAlign:"right"}}>
          <div>{formatDate(conv.startedAt || conv.lastActivity)}</div>
          <div style={{marginTop:2, color: expanded ? "#7c5abf" : "#c4bcda"}}>
            {expanded ? "▲ свернуть" : "▼ развернуть"}
          </div>
        </div>
      </div>

      {/* Messages */}
      {expanded && (
        <div style={{padding:"0 20px 20px", display:"flex", flexDirection:"column", gap:10, marginTop:16}}>
          {conv.messages?.map((m, i) => (
            <div key={i} style={{
              display:"flex", gap:10,
              flexDirection: m.role === "user" ? "row-reverse" : "row",
              alignItems:"flex-start",
            }}>
              <div style={{
                width:28, height:28, borderRadius:"50%", flexShrink:0,
                background: m.role === "user" ? "#7c5abf" : "#ede9f8",
                display:"flex", alignItems:"center", justifyContent:"center",
                fontSize:12, color: m.role === "user" ? "#fff" : "#7c5abf",
                fontWeight:700, marginTop:2,
              }}>
                {m.role === "user" ? "В" : "Н"}
              </div>
              <div style={{
                padding:"9px 13px", borderRadius: m.role === "user" ? "12px 12px 2px 12px" : "12px 12px 12px 2px",
                background: m.role === "user" ? "#7c5abf" : "#f7f4fd",
                color: m.role === "user" ? "#fff" : "#16131f",
                fontSize:13, lineHeight:1.6, maxWidth:"80%",
                border: m.role === "assistant" ? "1px solid #ede9f8" : "none",
              }}>
                {m.content}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default function Dashboard() {
  const [pass,    setPass]    = useState("");
  const [authed,  setAuthed]  = useState(false);
  const [loading, setLoading] = useState(false);
  const [error,   setError]   = useState("");
  const [data,    setData]    = useState(null);
  const [expanded, setExpanded] = useState(null);
  const [search,  setSearch]  = useState("");

  // Check stored pass on load
  useEffect(() => {
    const stored = sessionStorage.getItem(PASS_KEY);
    if (stored) authenticate(stored);
  }, []);

  async function authenticate(p) {
    setLoading(true);
    setError("");
    try {
      const r = await fetch(`/api/conversations?pass=${encodeURIComponent(p)}&limit=50`);
      if (!r.ok) { setError("Неверный пароль"); setLoading(false); return; }
      const d = await r.json();
      sessionStorage.setItem(PASS_KEY, p);
      setAuthed(true);
      setData(d);
    } catch(e) { setError("Ошибка соединения"); }
    setLoading(false);
  }

  async function refresh() {
    const stored = sessionStorage.getItem(PASS_KEY);
    if (!stored) return;
    setLoading(true);
    try {
      const r = await fetch(`/api/conversations?pass=${encodeURIComponent(stored)}&limit=50`);
      const d = await r.json();
      setData(d);
    } catch{}
    setLoading(false);
  }

  const convs = data?.conversations || [];
  const filtered = convs.filter(c => {
    if (!search) return true;
    const s = search.toLowerCase();
    return c.messages?.some(m => m.content?.toLowerCase().includes(s));
  });

  // Stats
  const today = convs.filter(c => {
    const d = new Date(c.startedAt || c.lastActivity);
    const now = new Date();
    return d.toDateString() === now.toDateString();
  }).length;
  const totalMsgs = convs.reduce((a, c) => a + (c.messages?.length || 0), 0);

  // Login screen
  if (!authed) return (
    <div style={{
      minHeight:"100vh", background:"#f7f5f2",
      display:"flex", alignItems:"center", justifyContent:"center",
      fontFamily:"'Manrope',sans-serif",
    }}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@600&family=Manrope:wght@400;500;600;700&display=swap')`}</style>
      <div style={{
        background:"#fff", borderRadius:20, padding:"48px 40px",
        width:380, boxShadow:"0 8px 40px rgba(22,19,31,.1)",
        border:"1px solid #ede9f8",
      }}>
        <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:28,fontWeight:600,color:"#16131f",marginBottom:6}}>
          Дашборд
        </div>
        <div style={{fontSize:13,color:"#9b94b0",marginBottom:32}}>Superposition.pro · разговоры</div>
        <input
          type="password"
          placeholder="Пароль"
          value={pass}
          onChange={e => setPass(e.target.value)}
          onKeyDown={e => e.key === "Enter" && authenticate(pass)}
          style={{
            width:"100%", padding:"11px 14px", borderRadius:10,
            border:"1px solid #ddd8f0", fontFamily:"inherit",
            fontSize:14, outline:"none", marginBottom:12,
            color:"#16131f",
          }}
        />
        {error && <div style={{fontSize:12,color:"#e24b4a",marginBottom:10}}>{error}</div>}
        <button
          onClick={() => authenticate(pass)}
          disabled={loading}
          style={{
            width:"100%", background:"#7c5abf", color:"#fff",
            fontFamily:"inherit", fontSize:14, fontWeight:600,
            padding:"12px", borderRadius:24, border:"none", cursor:"pointer",
            opacity: loading ? .6 : 1,
          }}
        >{loading ? "Загрузка…" : "Войти"}</button>
        <div style={{fontSize:11,color:"#c4bcda",marginTop:16,textAlign:"center"}}>
          По умолчанию: superposition2025
        </div>
      </div>
    </div>
  );

  return (
    <div style={{minHeight:"100vh",background:"#f7f5f2",fontFamily:"'Manrope',sans-serif"}}>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@500;600&family=Manrope:wght@400;500;600;700&display=swap')`}</style>

      {/* Header */}
      <div style={{background:"#16131f",padding:"20px 32px",display:"flex",alignItems:"center",gap:16}}>
        <div>
          <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:22,fontWeight:600,color:"#fff"}}>
            Superposition.pro
          </div>
          <div style={{fontSize:11,color:"rgba(255,255,255,.4)",letterSpacing:".07em",textTransform:"uppercase",marginTop:2}}>
            Дашборд разговоров
          </div>
        </div>
        <div style={{marginLeft:"auto",display:"flex",gap:10,alignItems:"center"}}>
          <button onClick={refresh} disabled={loading} style={{
            background:"rgba(255,255,255,.08)",color:"rgba(255,255,255,.7)",
            border:"1px solid rgba(255,255,255,.1)",borderRadius:20,
            padding:"7px 16px",fontSize:12,fontFamily:"inherit",cursor:"pointer",
          }}>
            {loading ? "…" : "↻ Обновить"}
          </button>
          <button onClick={() => { sessionStorage.removeItem(PASS_KEY); setAuthed(false); }} style={{
            background:"transparent",color:"rgba(255,255,255,.35)",
            border:"none",fontSize:12,fontFamily:"inherit",cursor:"pointer",
          }}>
            Выйти
          </button>
        </div>
      </div>

      <div style={{maxWidth:900,margin:"0 auto",padding:"32px 24px"}}>

        {/* Stats */}
        <div style={{display:"grid",gridTemplateColumns:"repeat(3,1fr)",gap:14,marginBottom:28}}>
          {[
            ["Всего разговоров", data?.total || 0, "💬"],
            ["Сегодня",          today,             "📅"],
            ["Всего сообщений",  totalMsgs,         "✉️"],
          ].map(([label, val, ico]) => (
            <div key={label} style={{
              background:"#fff",borderRadius:14,padding:"20px 22px",
              border:"1px solid #e8e4f0",
            }}>
              <div style={{fontSize:22,marginBottom:6}}>{ico}</div>
              <div style={{fontFamily:"'Cormorant Garamond',serif",fontSize:36,fontWeight:600,color:"#16131f",lineHeight:1}}>{val}</div>
              <div style={{fontSize:11.5,color:"#9b94b0",marginTop:4,textTransform:"uppercase",letterSpacing:".06em"}}>{label}</div>
            </div>
          ))}
        </div>

        {/* Search */}
        <div style={{marginBottom:16}}>
          <input
            type="text"
            placeholder="Поиск по тексту разговоров…"
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{
              width:"100%", padding:"10px 14px", borderRadius:10,
              border:"1px solid #e0dbf0", fontFamily:"inherit",
              fontSize:13.5, outline:"none", background:"#fff", color:"#16131f",
            }}
          />
        </div>

        {/* Conversation list */}
        <div style={{display:"flex",flexDirection:"column",gap:10}}>
          {filtered.length === 0 && (
            <div style={{textAlign:"center",padding:"48px",color:"#b0a8c8",fontSize:14}}>
              {search ? "Ничего не найдено" : "Разговоров пока нет"}
            </div>
          )}
          {filtered.map(conv => (
            <ConvCard
              key={conv.id}
              conv={conv}
              expanded={expanded === conv.id}
              onToggle={() => setExpanded(expanded === conv.id ? null : conv.id)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
