import Head from "next/head";
import { useState, useEffect } from "react";

const DIRECTIONS = [
  "Пилатес","Йога в гамаках","Функциональные","ЛФК-занятия",
  "Боди-балет","Силовые","Стретчинг","Фитнес-танцы","Плиометрика","Интервальные",
];

const PRICES = [
  { label:"Диагностическая", amount:"4 000 ₽", note:"Первое занятие · 55 минут", featured:true },
  { label:"Индивидуально",   amount:"5 000 ₽", note:"Только вы и тренер · 55 мин" },
  { label:"В паре",          amount:"3 500 ₽", note:"С другом или партнёром · 55 мин" },
  { label:"Онлайн",          amount:"5 000 ₽", note:"По видеосвязи · 55 минут" },
];

export default function Home() {
  const [open, setOpen] = useState(false);
  const [tip, setTip]   = useState(false);
  useEffect(() => {
    const a = setTimeout(() => setTip(true),  1800);
    const b = setTimeout(() => setTip(false), 5000);
    return () => { clearTimeout(a); clearTimeout(b); };
  }, []);

  return (<>
    <Head>
      <title>Superposition.pro — Персональные тренировки в Москве</title>
      <meta name="viewport" content="width=device-width,initial-scale=1"/>
      <link rel="preconnect" href="https://fonts.googleapis.com"/>
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Manrope:wght@400;500;600;700&display=swap" rel="stylesheet"/>
    </Head>

    <style>{`
      *,*::before,*::after{box-sizing:border-box;margin:0;padding:0}
      :root{
        --ink:   #16131f;
        --muted: #6b6480;
        --bg:    #f7f5f2;
        --card:  #ffffff;
        --dark:  #16131f;
        --pur:   #7c5abf;
        --pur-l: #ede9f8;
        --pur-m: rgba(124,90,191,0.15);
        --serif: 'Cormorant Garamond', Georgia, serif;
        --sans:  'Manrope', system-ui, sans-serif;
        --r:14px;
      }
      html{scroll-behavior:smooth}
      body{font-family:var(--sans);background:var(--bg);color:var(--ink);-webkit-font-smoothing:antialiased}
      a{text-decoration:none;color:inherit}
      img{display:block;max-width:100%}

      /* ─── NAV ─── */
      nav{
        position:sticky;top:0;z-index:90;
        background:rgba(247,245,242,0.88);
        backdrop-filter:blur(12px);
        border-bottom:1px solid rgba(0,0,0,0.07);
        padding:0 40px;height:68px;
        display:flex;align-items:center;gap:32px;
      }
      .logo{font-family:var(--serif);font-size:20px;font-weight:600;letter-spacing:.06em;color:var(--ink)}
      .logo sup{font-size:10px;letter-spacing:.1em;opacity:.5;font-family:var(--sans);font-weight:500}
      nav ul{display:flex;gap:2px;list-style:none;margin-left:8px}
      nav ul li a{font-size:13px;font-weight:500;color:var(--muted);padding:7px 14px;border-radius:20px;border:1px solid transparent;transition:all .15s}
      nav ul li a:hover{color:var(--pur);background:var(--pur-l);border-color:rgba(124,90,191,.2)}
      .nav-r{margin-left:auto;display:flex;align-items:center;gap:20px}
      .nav-phone{font-size:14px;font-weight:700;color:var(--pur)}
      .nav-btn{background:var(--pur);color:#fff;font-family:var(--sans);font-size:13px;font-weight:600;padding:10px 22px;border-radius:24px;border:none;cursor:pointer;transition:opacity .15s}
      .nav-btn:hover{opacity:.88}

      /* ─── HERO ─── */
      .hero{
        min-height:92vh;
        display:grid;grid-template-columns:1fr 1fr;
        max-width:1240px;margin:0 auto;padding:80px 40px 60px;
        gap:60px;align-items:center;
      }
      .hero-eyebrow{
        display:inline-flex;align-items:center;gap:8px;
        font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;
        color:var(--pur);margin-bottom:28px;
      }
      .hero-eyebrow::before{content:'';width:28px;height:1.5px;background:var(--pur)}
      .hero h1{
        font-family:var(--serif);font-size:72px;line-height:1.05;
        font-weight:600;color:var(--ink);margin-bottom:28px;
      }
      .hero h1 em{color:var(--pur);font-style:italic}
      .hero-lead{font-size:16px;line-height:1.75;color:var(--muted);max-width:460px;margin-bottom:40px}
      .hero-actions{display:flex;gap:12px;flex-wrap:wrap;margin-bottom:52px}
      .btn-solid{
        background:var(--pur);color:#fff;font-family:var(--sans);
        font-size:14px;font-weight:600;padding:14px 32px;
        border-radius:30px;border:none;cursor:pointer;transition:opacity .15s;
      }
      .btn-solid:hover{opacity:.88}
      .btn-outline{
        background:transparent;color:var(--ink);font-family:var(--sans);
        font-size:14px;font-weight:600;padding:13px 28px;
        border-radius:30px;border:1.5px solid rgba(0,0,0,.12);cursor:pointer;transition:all .15s;
      }
      .btn-outline:hover{border-color:var(--pur);color:var(--pur)}
      .hero-stats{display:flex;gap:36px}
      .stat-n{font-family:var(--serif);font-size:48px;font-weight:600;color:var(--ink);line-height:1}
      .stat-l{font-size:11px;font-weight:600;letter-spacing:.06em;text-transform:uppercase;color:var(--muted);margin-top:4px}

      /* Hero right — visual card */
      .hero-visual{
        position:relative;
        background:var(--dark);
        border-radius:24px;
        height:520px;
        overflow:hidden;
        display:flex;flex-direction:column;justify-content:flex-end;
        padding:36px;
      }
      .hero-visual::before{
        content:'';position:absolute;inset:0;
        background:radial-gradient(ellipse at 40% 30%,rgba(124,90,191,.35) 0%,transparent 65%);
      }
      .hero-visual-grid{
        position:absolute;inset:0;
        background-image:linear-gradient(rgba(124,90,191,.08) 1px,transparent 1px),linear-gradient(90deg,rgba(124,90,191,.08) 1px,transparent 1px);
        background-size:40px 40px;
      }
      .hero-visual-badge{
        position:relative;z-index:2;
        display:inline-flex;align-items:center;gap:8px;
        background:rgba(124,90,191,.25);border:1px solid rgba(124,90,191,.4);
        color:rgba(255,255,255,.9);font-size:12px;font-weight:600;
        padding:8px 14px;border-radius:20px;letter-spacing:.04em;
        margin-bottom:16px;width:fit-content;
      }
      .hero-visual-badge::before{content:'';width:7px;height:7px;border-radius:50%;background:#4aad6f}
      .hero-visual h2{
        position:relative;z-index:2;
        font-family:var(--serif);font-size:36px;font-weight:600;
        color:#fff;line-height:1.2;margin-bottom:24px;
      }
      .hero-chips{position:relative;z-index:2;display:flex;flex-wrap:wrap;gap:7px}
      .hero-chip{
        background:rgba(255,255,255,.07);border:1px solid rgba(255,255,255,.12);
        color:rgba(255,255,255,.65);font-size:12px;font-weight:500;
        padding:5px 12px;border-radius:16px;
      }

      /* ─── SECTION COMMONS ─── */
      .sec{padding:96px 40px;max-width:1240px;margin:0 auto}
      .sec-label{
        font-size:11px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;
        color:var(--pur);margin-bottom:14px;display:flex;align-items:center;gap:8px;
      }
      .sec-label::before{content:'';width:24px;height:1.5px;background:var(--pur)}
      .sec-h{font-family:var(--serif);font-size:52px;font-weight:600;color:var(--ink);line-height:1.1;margin-bottom:20px}
      .sec-sub{font-size:15px;color:var(--muted);line-height:1.7;max-width:560px}

      /* ─── DIRECTIONS ─── */
      .dir-wrap{
        display:grid;grid-template-columns:repeat(5,1fr);gap:10px;
        margin-top:52px;
      }
      .dir-item{
        background:var(--card);border:1px solid rgba(0,0,0,.07);
        border-radius:12px;padding:18px 16px;
        font-size:13px;font-weight:600;color:var(--ink);
        cursor:default;transition:all .18s;
      }
      .dir-item:hover{background:var(--pur-l);border-color:rgba(124,90,191,.3);color:var(--pur);transform:translateY(-2px)}

      /* ─── PROCESS ─── */
      .process-band{background:var(--dark);padding:96px 40px}
      .process-inner{max-width:1240px;margin:0 auto}
      .process-band .sec-label{color:rgba(198,183,242,.8)}
      .process-band .sec-label::before{background:rgba(198,183,242,.8)}
      .process-band .sec-h{color:#fff}
      .process-steps{
        display:grid;grid-template-columns:repeat(4,1fr);
        gap:1px;background:rgba(255,255,255,.06);
        border-radius:var(--r);overflow:hidden;margin-top:52px;
      }
      .p-step{background:var(--dark);padding:36px 28px}
      .p-step:first-child{border-radius:var(--r) 0 0 var(--r)}
      .p-step:last-child{border-radius:0 var(--r) var(--r) 0}
      .p-n{font-family:var(--serif);font-size:52px;font-weight:600;color:rgba(124,90,191,.35);margin-bottom:20px}
      .p-t{font-size:15px;font-weight:700;color:#fff;margin-bottom:10px}
      .p-d{font-size:13px;color:rgba(255,255,255,.45);line-height:1.65}

      /* ─── PRICING ─── */
      .pricing-grid{
        display:grid;grid-template-columns:repeat(4,1fr);
        gap:16px;margin-top:52px;
      }
      .p-card{
        background:var(--card);border:1px solid rgba(0,0,0,.07);
        border-radius:var(--r);padding:32px 24px;
        transition:transform .2s,box-shadow .2s;position:relative;
      }
      .p-card:hover{transform:translateY(-4px);box-shadow:0 12px 32px rgba(0,0,0,.08)}
      .p-card.feat{border-color:var(--pur);border-width:2px}
      .feat-tag{
        position:absolute;top:-13px;left:50%;transform:translateX(-50%);
        background:var(--pur);color:#fff;font-size:10px;font-weight:700;
        letter-spacing:.07em;padding:4px 14px;border-radius:20px;white-space:nowrap;
      }
      .p-card-label{font-size:11px;font-weight:700;letter-spacing:.1em;text-transform:uppercase;color:var(--muted);margin-bottom:14px}
      .p-card-amt{font-family:var(--serif);font-size:44px;font-weight:600;color:var(--ink);margin-bottom:8px;line-height:1}
      .p-card-note{font-size:12px;color:var(--muted);margin-bottom:28px;line-height:1.5}
      .p-card-btn{
        width:100%;background:var(--pur);color:#fff;font-family:var(--sans);
        font-size:13px;font-weight:600;padding:12px;
        border-radius:24px;border:none;cursor:pointer;transition:opacity .15s;
      }
      .p-card-btn:hover{opacity:.88}

      /* ─── CTA STRIP ─── */
      .cta-strip{
        background:var(--pur);
        margin:0 40px 96px;border-radius:24px;
        padding:64px 64px;
        display:flex;align-items:center;justify-content:space-between;gap:32px;
      }
      .cta-strip h2{font-family:var(--serif);font-size:44px;font-weight:600;color:#fff;line-height:1.2;max-width:520px}
      .cta-strip-r{display:flex;flex-direction:column;align-items:flex-end;gap:14px;flex-shrink:0}
      .cta-ph{font-size:22px;font-weight:700;color:rgba(255,255,255,.85)}
      .btn-inv{
        background:#fff;color:var(--pur);font-family:var(--sans);
        font-size:14px;font-weight:700;padding:14px 32px;
        border-radius:30px;border:none;cursor:pointer;transition:opacity .15s;
      }
      .btn-inv:hover{opacity:.9}

      /* ─── FOOTER ─── */
      footer{
        background:var(--dark);padding:56px 40px 32px;
        display:grid;grid-template-columns:2fr 1fr 1fr;
        gap:48px;max-width:none;
      }
      .ft-brand{font-family:var(--serif);font-size:22px;font-weight:600;color:#fff;letter-spacing:.06em;margin-bottom:12px}
      .ft-info{font-size:13px;color:rgba(255,255,255,.35);line-height:1.8}
      .ft-col-h{font-size:10px;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:rgba(255,255,255,.25);margin-bottom:16px}
      .ft-links{display:flex;flex-direction:column;gap:9px}
      .ft-links a{font-size:13px;color:rgba(255,255,255,.45);transition:color .15s}
      .ft-links a:hover{color:#fff}
      .ft-bottom{
        background:var(--dark);padding:20px 40px 32px;
        border-top:1px solid rgba(255,255,255,.05);
        display:flex;justify-content:space-between;align-items:center;
      }
      .ft-copy{font-size:11px;color:rgba(255,255,255,.2)}

      /* ─── WIDGET ─── */
      #sp-bubble{
        position:fixed;bottom:100px;right:24px;z-index:9998;
        width:400px;height:640px;max-height:calc(100vh - 120px);
        border-radius:20px;overflow:hidden;
        box-shadow:0 12px 56px rgba(22,19,31,.28);
        border:1px solid rgba(124,90,191,.2);
        opacity:0;pointer-events:none;
        transform:translateY(16px) scale(.97);
        transition:opacity .24s ease,transform .24s ease;
      }
      #sp-bubble.open{opacity:1;pointer-events:all;transform:translateY(0) scale(1)}
      #sp-bubble iframe{width:100%;height:100%;border:none;display:block}
      #sp-btn{
        position:fixed;bottom:24px;right:24px;z-index:9999;
        width:64px;height:64px;border-radius:50%;
        background:var(--pur);border:none;cursor:pointer;
        box-shadow:0 4px 24px rgba(124,90,191,.5);
        display:flex;align-items:center;justify-content:center;
        transition:transform .2s,box-shadow .2s;
      }
      #sp-btn:hover{transform:scale(1.06);box-shadow:0 6px 32px rgba(124,90,191,.6)}
      #sp-dot{position:absolute;top:1px;right:1px;width:14px;height:14px;border-radius:50%;background:#2ea86b;border:2.5px solid #fff}
      #sp-tip{
        position:fixed;bottom:104px;right:98px;z-index:9997;
        background:var(--dark);color:#fff;font-family:var(--sans);
        font-size:13px;font-weight:500;padding:10px 16px;border-radius:10px;
        white-space:nowrap;box-shadow:0 4px 20px rgba(0,0,0,.2);
        pointer-events:none;transition:opacity .3s;
      }
      #sp-tip::after{
        content:'';position:absolute;right:-6px;top:50%;transform:translateY(-50%);
        border:6px solid transparent;border-right:none;border-left-color:var(--dark);
      }

      @media(max-width:900px){
        nav ul{display:none}
        .hero{grid-template-columns:1fr;padding:48px 20px 40px;min-height:auto;gap:32px}
        .hero h1{font-size:48px}
        .hero-visual{display:none}
        .sec{padding:64px 20px}
        .sec-h{font-size:38px}
        .dir-wrap{grid-template-columns:repeat(2,1fr)}
        .process-band{padding:64px 20px}
        .process-steps{grid-template-columns:1fr 1fr}
        .pricing-grid{grid-template-columns:1fr 1fr}
        .cta-strip{flex-direction:column;text-align:center;margin:0 20px 64px;padding:44px 32px}
        .cta-strip-r{align-items:center}
        footer{grid-template-columns:1fr 1fr;padding:48px 20px 24px}
        .ft-bottom{padding:16px 20px 24px;flex-direction:column;gap:6px;text-align:center}
        #sp-bubble{width:calc(100vw - 20px);right:10px}
      }
    `}</style>

    {/* ── NAV ── */}
    <nav>
      <div className="logo">Superposition<sup>.PRO</sup></div>
      <ul>
        <li><a href="#directions">Направления</a></li>
        <li><a href="#process">Как работаем</a></li>
        <li><a href="#pricing">Стоимость</a></li>
      </ul>
      <div className="nav-r">
        <a className="nav-phone" href="tel:+74999927677">+7 (499) 992-76-77</a>
        <button className="nav-btn" onClick={() => setOpen(true)}>Записаться</button>
      </div>
    </nav>

    {/* ── HERO ── */}
    <section className="hero">
      <div>
        <div className="hero-eyebrow">Персональные тренировки · Москва</div>
        <h1>Студия,<br/>где тело<br/><em>меняется</em></h1>
        <p className="hero-lead">
          Приватный зал. Опытный тренер. Программа, составленная лично под вас — без шаблонов и без спешки.
        </p>
        <div className="hero-actions">
          <button className="btn-solid" onClick={() => setOpen(true)}>Записаться на тренировку</button>
          <button className="btn-outline" onClick={() => setOpen(true)}>Спросить тренера</button>
        </div>
        <div className="hero-stats">
          <div><div className="stat-n">17</div><div className="stat-l">лет работы</div></div>
          <div><div className="stat-n">300+</div><div className="stat-l">клиентов</div></div>
          <div><div className="stat-n">4.8</div><div className="stat-l">рейтинг</div></div>
        </div>
      </div>

      <div className="hero-visual">
        <div className="hero-visual-grid"/>
        <div className="hero-visual-badge">Онлайн — запись открыта</div>
        <h2>10 направлений.<br/>Один зал.<br/>Ваш результат.</h2>
        <div className="hero-chips">
          {["Пилатес","Йога в гамаках","ЛФК","Боди-балет","Силовые","Онлайн"].map(c =>
            <span className="hero-chip" key={c}>{c}</span>
          )}
        </div>
      </div>
    </section>


    {/* ── ABOUT ── */}
    <section id="about" style={{background:"var(--card)",padding:"96px 40px"}}>
      <div style={{maxWidth:1240,margin:"0 auto",display:"grid",gridTemplateColumns:"1fr 1fr",gap:80,alignItems:"center"}}>

        {/* Left — text */}
        <div>
          <div className="sec-label">О студии</div>
          <h2 className="sec-h" style={{marginBottom:24}}>17 лет.<br/>Один принцип.</h2>
          <p style={{fontSize:17,lineHeight:1.8,color:"var(--muted)",marginBottom:24,fontFamily:"var(--serif)",fontWeight:400,fontStyle:"italic"}}>
            «Каждый клиент — это отдельная история. Мы не тренируем всех одинаково.»
          </p>
          <p style={{fontSize:14,lineHeight:1.8,color:"var(--muted)",marginBottom:16}}>
            Superposition.pro — приватная студия персональных тренировок в центре Москвы. Мы открылись в 2007 году с одной идеей: фитнес должен подходить человеку, а не наоборот.
          </p>
          <p style={{fontSize:14,lineHeight:1.8,color:"var(--muted)",marginBottom:36}}>
            Здесь нет потоков и групп. Только вы, тренер и программа, составленная под ваши цели, возможности и образ жизни. Некоторые наши клиенты занимаются с нами больше десяти лет — и приводят детей.
          </p>
          <div style={{display:"flex",gap:32}}>
            {[["10","направлений тренировок"],["4","тренера-специалиста"],["55 мин","каждое занятие"]].map(([n,l]) => (
              <div key={n}>
                <div style={{fontFamily:"var(--serif)",fontSize:38,fontWeight:600,color:"var(--ink)",lineHeight:1}}>{n}</div>
                <div style={{fontSize:11,fontWeight:600,letterSpacing:".07em",textTransform:"uppercase",color:"var(--muted)",marginTop:5}}>{l}</div>
              </div>
            ))}
          </div>
        </div>

        {/* Right — dark card with quote + details */}
        <div style={{
          background:"var(--dark)",borderRadius:20,padding:"44px 40px",
          position:"relative",overflow:"hidden",
        }}>
          {/* subtle grid */}
          <div style={{
            position:"absolute",inset:0,
            backgroundImage:"linear-gradient(rgba(124,90,191,.07) 1px,transparent 1px),linear-gradient(90deg,rgba(124,90,191,.07) 1px,transparent 1px)",
            backgroundSize:"32px 32px",
          }}/>
          <div style={{position:"relative",zIndex:1}}>
            <div style={{
              width:44,height:44,borderRadius:12,
              background:"rgba(124,90,191,.2)",border:"1px solid rgba(124,90,191,.3)",
              display:"flex",alignItems:"center",justifyContent:"center",
              marginBottom:28,
            }}>
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path d="M3 7c0-2.2 1.8-4 4-4h.5v3H7c-.6 0-1 .4-1 1v1h3v6H3V7ZM11 7c0-2.2 1.8-4 4-4h.5v3H15c-.6 0-1 .4-1 1v1h3v6h-6V7Z" fill="rgba(198,183,242,0.7)"/>
              </svg>
            </div>
            <p style={{fontFamily:"var(--serif)",fontSize:22,fontWeight:500,color:"rgba(255,255,255,.9)",lineHeight:1.55,marginBottom:28}}>
              Я открыла студию, потому что хотела место, где человек не чувствует себя чужим. Где тренировка — это диалог, а не команды.
            </p>
            <div style={{display:"flex",alignItems:"center",gap:14,paddingTop:24,borderTop:"1px solid rgba(255,255,255,.08)"}}>
              <div style={{
                width:44,height:44,borderRadius:"50%",overflow:"hidden",
                flexShrink:0,boxShadow:"0 0 0 2px rgba(198,183,242,.4)",
              }}>
                <svg width="44" height="44" viewBox="0 0 100 100" fill="none">
                  <rect width="100" height="100" fill="#1e1535"/>
                  <ellipse cx="50" cy="37" rx="27" ry="24" fill="#110a1a"/>
                  <ellipse cx="50" cy="56" rx="21" ry="25" fill="#c8936e"/>
                  <path d="M23 45 Q26 23 50 19 Q74 23 77 45 Q67 37 50 35 Q33 37 23 45Z" fill="#150b22"/>
                  <ellipse cx="25" cy="51" rx="7" ry="12" fill="#150b22"/>
                  <ellipse cx="75" cy="51" rx="7" ry="12" fill="#150b22"/>
                  <path d="M23 45 Q26 23 50 19 Q74 23 77 45" stroke="#c6b7f2" strokeWidth="0.8" opacity="0.5" fill="none"/>
                  <ellipse cx="50" cy="41" rx="19" ry="9" fill="#c8936e"/>
                  <ellipse cx="38" cy="54" rx="6.5" ry="4.5" fill="#08051a"/>
                  <ellipse cx="62" cy="54" rx="6.5" ry="4.5" fill="#08051a"/>
                  <circle cx="38" cy="54" r="3.8" fill="#9b7ee8"/>
                  <circle cx="62" cy="54" r="3.8" fill="#9b7ee8"/>
                  <circle cx="38" cy="54" r="2" fill="#1a0a3a"/>
                  <circle cx="62" cy="54" r="2" fill="#1a0a3a"/>
                  <circle cx="39.5" cy="52.2" r="1" fill="white" opacity="0.85"/>
                  <circle cx="63.5" cy="52.2" r="1" fill="white" opacity="0.85"/>
                  <path d="M8 100 L22 73 Q50 83 78 73 L92 100Z" fill="#120d1f"/>
                  <path d="M32 80 L50 76 L68 80" stroke="#c6b7f2" strokeWidth="0.7" opacity="0.4" fill="none"/>
                </svg>
              </div>
              <div>
                <div style={{fontSize:13,fontWeight:700,color:"rgba(255,255,255,.9)"}}>Наталья Захарова</div>
                <div style={{fontSize:11,color:"rgba(255,255,255,.35)",marginTop:2,letterSpacing:".04em"}}>Основательница · главный тренер · 17 лет</div>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>

    {/* ── DIRECTIONS ── */}
    <section id="directions" className="sec">
      <div className="sec-label">Направления</div>
      <h2 className="sec-h">10 форматов<br/>под любую цель</h2>
      <p className="sec-sub">Работаем с опытными специалистами по каждому направлению — вы занимаетесь с тем, кто разбирается именно в вашем запросе.</p>
      <div className="dir-wrap">
        {DIRECTIONS.map(d => <div className="dir-item" key={d}>{d}</div>)}
      </div>
    </section>

    {/* ── PROCESS ── */}
    <section id="process" className="process-band">
      <div className="process-inner">
        <div className="sec-label">Как работаем</div>
        <h2 className="sec-h">От первого звонка<br/>до результата</h2>
        <div className="process-steps">
          {[
            ["01","Знакомимся","Администратор уточняет ваши цели, состояние здоровья и ожидания — ещё до первой тренировки."],
            ["02","Составляем план","Программа создаётся под вас: с учётом физических данных, образа жизни и удобного расписания."],
            ["03","Тренируемся","Ведём карточку достижений. Раз в месяц программа корректируется по реальным результатам."],
            ["04","Наблюдаем рост","Уже через 4 недели вы замечаете изменения — и тренер видит их вместе с вами."],
          ].map(([n,t,d]) => (
            <div className="p-step" key={n}>
              <div className="p-n">{n}</div>
              <div className="p-t">{t}</div>
              <div className="p-d">{d}</div>
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* ── PRICING ── */}
    <section id="pricing" className="sec">
      <div className="sec-label">Стоимость</div>
      <h2 className="sec-h">Выберите<br/>формат</h2>
      <p className="sec-sub">Первое занятие — диагностическая тренировка. Тренер оценит ваши возможности и составит план.</p>
      <div className="pricing-grid">
        {PRICES.map(p => (
          <div className={`p-card${p.featured ? ' feat' : ''}`} key={p.label}>
            {p.featured && <div className="feat-tag">С ЭТОГО НАЧИНАЮТ</div>}
            <div className="p-card-label">{p.label}</div>
            <div className="p-card-amt">{p.amount}</div>
            <div className="p-card-note">{p.note}</div>
            <button className="p-card-btn" onClick={() => setOpen(true)}>Записаться</button>
          </div>
        ))}
      </div>
    </section>

    {/* ── CTA STRIP ── */}
    <div className="cta-strip">
      <h2>Первая тренировка —<br/>уже на этой неделе</h2>
      <div className="cta-strip-r">
        <div className="cta-ph">+7 (499) 992-76-77</div>
        <button className="btn-inv" onClick={() => setOpen(true)}>Записаться</button>
      </div>
    </div>

    {/* ── FOOTER ── */}
    <footer>
      <div>
        <div className="ft-brand">Superposition.pro</div>
        <div className="ft-info">
          Новинский бульвар, 7, офис 2<br/>
          м. Смоленская · м. Арбатская<br/>
          Ежедневно 8:00–22:00<br/>
          +7 (499) 992-76-77
        </div>
      </div>
      <div>
        <div className="ft-col-h">Студия</div>
        <div className="ft-links">
          {["О нас","Команда","Отзывы","Вакансии","FAQ"].map(l=><a href="#" key={l}>{l}</a>)}
        </div>
      </div>
      <div>
        <div className="ft-col-h">Документы</div>
        <div className="ft-links">
          {["Политика конфиденциальности","Публичная оферта","Согласие на обработку данных"].map(l=><a href="#" key={l}>{l}</a>)}
        </div>
      </div>
    </footer>
    <div className="ft-bottom">
      <span className="ft-copy">© 2025 ИП Захарова Наталья Евгеньевна · ИНН 380109749446</span>
      <span className="ft-copy">superposition.pro@gmail.com</span>
    </div>

    {/* ── CHAT WIDGET ── */}
    <div id="sp-bubble" className={open ? 'open' : ''}>
      <iframe src="/embed" allow="clipboard-write"/>
    </div>

    {tip && !open && <div id="sp-tip">💬 Спросите тренера</div>}

    <button id="sp-btn" aria-label="Открыть чат" onClick={() => setOpen(o => !o)}>
      {open
        ? <svg width="22" height="22" viewBox="0 0 22 22" fill="none"><path d="M5 5l12 12M17 5L5 17" stroke="#fff" strokeWidth="2.2" strokeLinecap="round"/></svg>
        : <>
            <svg width="27" height="27" viewBox="0 0 27 27" fill="none">
              <path d="M4 5a2 2 0 0 1 2-2h15a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H9.5L4 23V5Z" fill="white"/>
              <circle cx="9.5" cy="11.5" r="1.3" fill="#7c5abf"/>
              <circle cx="13.5" cy="11.5" r="1.3" fill="#7c5abf"/>
              <circle cx="17.5" cy="11.5" r="1.3" fill="#7c5abf"/>
            </svg>
            <div id="sp-dot"/>
          </>
      }
    </button>
  </>);
}
