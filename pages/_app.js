import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useRouter } from "next/router";

function ChatWidget() {
  const [open, setOpen]     = useState(false);
  const [mounted, setMounted] = useState(false);
  const [tip, setTip]       = useState(false);

  useEffect(() => {
    setMounted(true);
    const a = setTimeout(() => setTip(true),  1800);
    const b = setTimeout(() => setTip(false), 5000);
    window.__spOpen = () => setOpen(true);
    return () => { clearTimeout(a); clearTimeout(b); delete window.__spOpen; };
  }, []);

  if (!mounted) return null;

  const F = { position:"fixed", zIndex:2147483647 };

  const widget = <>
    <div style={{
      ...F, bottom:100, right:24,
      width:400, height:640,
      maxHeight:"calc(100vh - 120px)",
      borderRadius:20, overflow:"hidden",
      boxShadow:"0 12px 56px rgba(22,19,31,.3)",
      border:"1px solid rgba(124,90,191,.2)",
      opacity: open ? 1 : 0,
      pointerEvents: open ? "all" : "none",
      transform: open ? "translateY(0) scale(1)" : "translateY(14px) scale(.97)",
      transition:"opacity .22s ease,transform .22s ease",
      background:"#fff",
    }}>
      {open && <iframe src="/embed" allow="clipboard-write"
        style={{width:"100%",height:"100%",border:"none",display:"block"}}/>}
    </div>

    {tip && !open && (
      <div style={{
        ...F, bottom:104, right:98,
        background:"#16131f", color:"#fff",
        fontFamily:"'Manrope',sans-serif",
        fontSize:13, fontWeight:500,
        padding:"10px 16px", borderRadius:10,
        whiteSpace:"nowrap",
        boxShadow:"0 4px 20px rgba(0,0,0,.2)",
        pointerEvents:"none",
      }}>
        💬 Спросите тренера
      </div>
    )}

    <button
      onClick={() => setOpen(o => !o)}
      aria-label="Открыть чат"
      style={{
        ...F, bottom:24, right:24,
        width:64, height:64, borderRadius:"50%",
        background:"#7c5abf", border:"none", cursor:"pointer",
        boxShadow:"0 4px 24px rgba(124,90,191,.5)",
        display:"flex", alignItems:"center", justifyContent:"center",
      }}
    >
      {open
        ? <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M5 5l12 12M17 5L5 17" stroke="#fff" strokeWidth="2.2" strokeLinecap="round"/></svg>
        : <>
            <svg width="27" height="27" viewBox="0 0 27 27" fill="none">
              <path d="M4 5a2 2 0 0 1 2-2h15a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H9.5L4 23V5Z" fill="white"/>
              <circle cx="9.5" cy="11.5" r="1.3" fill="#7c5abf"/>
              <circle cx="13.5" cy="11.5" r="1.3" fill="#7c5abf"/>
              <circle cx="17.5" cy="11.5" r="1.3" fill="#7c5abf"/>
            </svg>
            <div style={{position:"absolute",top:1,right:1,width:14,height:14,borderRadius:"50%",background:"#2ea86b",border:"2.5px solid #fff"}}/>
          </>
      }
    </button>
  </>;

  return createPortal(widget, document.body);
}

// Pages where the widget should appear
const WIDGET_PAGES = ["/home", "/"];

export default function App({ Component, pageProps }) {
  const router = useRouter();
  const showWidget = WIDGET_PAGES.includes(router.pathname);

  return <>
    <Component {...pageProps} />
    {showWidget && <ChatWidget />}
  </>;
}
