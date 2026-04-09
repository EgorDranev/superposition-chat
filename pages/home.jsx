import Head from "next/head";
import { useState, useEffect } from "react";

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [widgetOpen, setWidgetOpen] = useState(false);
  const [tooltipVisible, setTooltipVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setTooltipVisible(true), 1800);
    const t2 = setTimeout(() => setTooltipVisible(false), 5000);
    return () => { clearTimeout(t); clearTimeout(t2); };
  }, []);

  const directions = [
    { name: "Пилатес", desc: "Укрепление пресса, спины и осанки" },
    { name: "Йога в гамаках", desc: "Растяжка и гибкость в антигравити" },
    { name: "Функциональные", desc: "Сила и выносливость для жизни" },
    { name: "ЛФК-занятия", desc: "Восстановление после травм" },
    { name: "Боди-балет", desc: "Балетные движения для стройности" },
    { name: "Силовые", desc: "Набор мышц и коррекция фигуры" },
    { name: "Стретчинг", desc: "Гибкость и расслабление" },
    { name: "Фитнес-танцы", desc: "Ритм, кардио и уверенность" },
    { name: "Плиометрика", desc: "Скорость и взрывная сила" },
    { name: "Интервальные", desc: "Жиросжигание и выносливость" },
  ];

  const steps = [
    { n: "01", title: "Узнаём ваши цели", text: "Администратор свяжется с вами перед первой тренировкой, чтобы узнать ваши ожидания и состояние здоровья." },
    { n: "02", title: "Разрабатываем план", text: "Составляем программу, которая гармонично вписывается в ваш график — с учётом работы, семьи и личного времени." },
    { n: "03", title: "Тренируемся и корректируем", text: "Ведём карточку достижений. Раз в месяц план пересматривается под ваши реальные результаты." },
    { n: "04", title: "Наслаждаемся результатом", text: "Вы чувствуете изменения уже через 4 недели регулярных занятий." },
  ];

  const benefits = [
    { icon: "🔒", title: "Приватный зал", text: "Вы занимаетесь без посторонних с личным тренером — полная конфиденциальность." },
    { icon: "🎯", title: "10 направлений", text: "Пилатес, йога, танцы, силовые, ЛФК — всё в одной студии." },
    { icon: "📋", title: "Индивидуальный план", text: "Программа составляется под ваши цели, физические данные и образ жизни." },
    { icon: "📅", title: "Удобный график", text: "Занятия с 8:00 до 22:00 — выбирайте удобное время без стресса." },
    { icon: "📍", title: "Центр Москвы", text: "Новинский бульвар, 7 — рядом с метро Смоленская и Арбатская." },
    { icon: "✨", title: "Всё включено", text: "Душ, полотенца, вода, чай, кофе — приходите и занимайтесь." },
  ];

  const prices = [
    { label: "Индивидуально", price: "5 000 ₽", sub: "55 минут · только вы и тренер", cta: "Записаться", featured: false },
    { label: "Диагностическая", price: "4 000 ₽", sub: "Первое занятие — знакомство со студией", cta: "Записаться", featured: true },
    { label: "В паре", price: "3 500 ₽", sub: "С другом или партнёром", cta: "Записаться", featured: false },
    { label: "Онлайн", price: "5 000 ₽", sub: "Живая тренировка по видеосвязи", cta: "Записаться", featured: false },
  ];

  return (
    <>
      <Head>
        <title>Superposition.pro — Студия персональных тренировок в Москве</title>
        <meta name="viewport" content="width=device-width, initial-scale=1"/>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link href="https://fonts.googleapis.com/css2?family=Manrope:wght@400;500;600;700;800&display=swap" rel="stylesheet"/>
      </Head>

      <style>{`
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
        :root {
          --bg: #eceaf2;
          --white: #ffffff;
          --purple: #7c5abf;
          --purple-light: #ede9f8;
          --purple-mid: #b49de0;
          --dark: #1a1a2e;
          --text: #2d2b3d;
          --muted: #6b6682;
          --border: rgba(0,0,0,0.08);
          --font: 'Manrope', sans-serif;
          --radius: 16px;
        }
        body { font-family: var(--font); background: var(--bg); color: var(--text); -webkit-font-smoothing: antialiased; }
        a { text-decoration: none; color: inherit; }
        button { font-family: var(--font); cursor: pointer; }

        /* ── Topbar ── */
        .topbar { background: var(--purple-light); padding: 8px 24px; display: flex; align-items: center; justify-content: space-between; font-size: 12px; color: var(--muted); }
        .topbar-socials { display: flex; gap: 12px; }
        .topbar-socials a { color: var(--purple); font-weight: 600; font-size: 12px; }

        /* ── Nav ── */
        nav { background: var(--white); padding: 0 32px; display: flex; align-items: center; height: 72px; gap: 24px; border-bottom: 1px solid var(--border); position: sticky; top: 0; z-index: 100; }
        .nav-logo { display: flex; align-items: center; gap: 10px; }
        .nav-logo-icon { width: 38px; height: 38px; }
        .nav-logo-text { font-size: 13px; font-weight: 800; letter-spacing: 0.06em; color: var(--dark); line-height: 1.2; }
        .nav-logo-sub { font-size: 10px; font-weight: 500; color: var(--muted); display: block; }
        .nav-links { display: flex; gap: 4px; margin-left: 16px; }
        .nav-pill { padding: 8px 16px; border-radius: 20px; border: 1px solid var(--border); font-size: 13px; font-weight: 500; color: var(--text); background: transparent; transition: all .15s; }
        .nav-pill:hover { background: var(--purple-light); border-color: var(--purple-mid); color: var(--purple); }
        .nav-meta { margin-left: auto; display: flex; align-items: center; gap: 20px; font-size: 13px; }
        .nav-rating { font-weight: 600; color: var(--dark); }
        .nav-phone { font-weight: 700; color: var(--purple); font-size: 14px; }
        .nav-cta { background: var(--purple); color: white; padding: 10px 22px; border-radius: 24px; border: none; font-size: 13px; font-weight: 600; transition: opacity .15s; }
        .nav-cta:hover { opacity: .88; }

        /* ── Hero ── */
        .hero { background: var(--white); border-radius: var(--radius); margin: 20px 24px 0; padding: 56px 48px; display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: center; box-shadow: 0 2px 16px rgba(0,0,0,0.06); }
        .hero-tag { display: inline-block; background: var(--purple-light); color: var(--purple); font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; padding: 5px 12px; border-radius: 20px; margin-bottom: 20px; }
        .hero h1 { font-size: 42px; font-weight: 800; line-height: 1.15; color: var(--dark); margin-bottom: 20px; }
        .hero h1 em { color: var(--purple); font-style: normal; }
        .hero-desc { font-size: 15px; color: var(--muted); line-height: 1.7; margin-bottom: 32px; }
        .hero-bullets { display: flex; flex-direction: column; gap: 10px; margin-bottom: 36px; }
        .hero-bullet { display: flex; align-items: center; gap: 10px; font-size: 14px; font-weight: 500; color: var(--text); }
        .hero-bullet::before { content: ''; width: 7px; height: 7px; border-radius: 50%; background: var(--purple); flex-shrink: 0; }
        .hero-ctas { display: flex; gap: 12px; align-items: center; }
        .btn-primary { background: var(--purple); color: white; padding: 14px 28px; border-radius: 28px; border: none; font-size: 14px; font-weight: 700; transition: opacity .15s; }
        .btn-primary:hover { opacity: .88; }
        .btn-ghost { background: transparent; border: 1.5px solid var(--border); color: var(--text); padding: 13px 22px; border-radius: 28px; font-size: 14px; font-weight: 600; transition: all .15s; }
        .btn-ghost:hover { border-color: var(--purple); color: var(--purple); }
        .hero-image { border-radius: 14px; overflow: hidden; background: linear-gradient(135deg, #d4c8f0 0%, #f0ecf8 100%); height: 420px; display: flex; align-items: center; justify-content: center; position: relative; }
        .hero-image-placeholder { text-align: center; }
        .hero-image-icon { font-size: 80px; opacity: 0.4; }
        .hero-stats { display: flex; gap: 24px; margin-top: 32px; }
        .hero-stat { }
        .hero-stat-num { font-size: 28px; font-weight: 800; color: var(--dark); }
        .hero-stat-label { font-size: 11px; color: var(--muted); font-weight: 500; margin-top: 2px; }

        /* ── Section wrapper ── */
        .section { padding: 64px 24px; }
        .section-title { font-size: 28px; font-weight: 800; color: var(--dark); text-align: center; text-transform: uppercase; letter-spacing: 0.04em; margin-bottom: 8px; }
        .section-sub { text-align: center; color: var(--muted); font-size: 15px; margin-bottom: 40px; }

        /* ── Directions grid ── */
        .directions-grid { display: grid; grid-template-columns: repeat(5, 1fr); gap: 12px; }
        .direction-card { background: var(--white); border-radius: 12px; padding: 18px 16px; border: 1px solid var(--border); transition: all .2s; cursor: pointer; }
        .direction-card:hover { border-color: var(--purple-mid); background: var(--purple-light); transform: translateY(-2px); box-shadow: 0 4px 16px rgba(124,90,191,0.12); }
        .direction-name { font-size: 13px; font-weight: 700; color: var(--dark); margin-bottom: 5px; }
        .direction-desc { font-size: 11.5px; color: var(--muted); line-height: 1.45; }

        /* ── Steps ── */
        .steps-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 20px; }
        .step-card { background: var(--white); border-radius: var(--radius); padding: 28px 22px; border: 1px solid var(--border); }
        .step-num { font-size: 36px; font-weight: 800; color: var(--purple-mid); opacity: 0.5; margin-bottom: 14px; }
        .step-title { font-size: 15px; font-weight: 700; color: var(--dark); margin-bottom: 10px; }
        .step-text { font-size: 13px; color: var(--muted); line-height: 1.6; }

        /* ── Benefits ── */
        .benefits-section { background: var(--dark); padding: 64px 24px; }
        .benefits-section .section-title { color: white; }
        .benefits-section .section-sub { color: rgba(255,255,255,0.5); }
        .benefits-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 20px; max-width: 1100px; margin: 0 auto; }
        .benefit-card { background: rgba(255,255,255,0.05); border-radius: var(--radius); padding: 28px 24px; border: 1px solid rgba(255,255,255,0.08); }
        .benefit-icon { font-size: 28px; margin-bottom: 14px; }
        .benefit-title { font-size: 15px; font-weight: 700; color: white; margin-bottom: 8px; }
        .benefit-text { font-size: 13px; color: rgba(255,255,255,0.55); line-height: 1.6; }

        /* ── Prices ── */
        .prices-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 16px; max-width: 1100px; margin: 0 auto; }
        .price-card { background: var(--white); border-radius: var(--radius); padding: 28px 22px; border: 1px solid var(--border); text-align: center; transition: transform .2s; }
        .price-card.featured { border-color: var(--purple); border-width: 2px; position: relative; }
        .price-card:hover { transform: translateY(-3px); box-shadow: 0 8px 24px rgba(0,0,0,0.08); }
        .price-badge { position: absolute; top: -13px; left: 50%; transform: translateX(-50%); background: var(--purple); color: white; font-size: 10px; font-weight: 700; padding: 4px 12px; border-radius: 20px; letter-spacing: 0.06em; white-space: nowrap; }
        .price-label { font-size: 13px; font-weight: 600; color: var(--muted); text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 12px; }
        .price-amount { font-size: 32px; font-weight: 800; color: var(--dark); margin-bottom: 8px; }
        .price-sub { font-size: 12px; color: var(--muted); margin-bottom: 24px; line-height: 1.5; }
        .price-btn { width: 100%; background: var(--purple); color: white; padding: 12px; border-radius: 24px; border: none; font-size: 13px; font-weight: 700; transition: opacity .15s; }
        .price-btn:hover { opacity: .88; }

        /* ── CTA Banner ── */
        .cta-banner { background: var(--purple); border-radius: var(--radius); margin: 0 24px 64px; padding: 52px 48px; display: flex; align-items: center; justify-content: space-between; }
        .cta-banner h2 { font-size: 30px; font-weight: 800; color: white; max-width: 520px; line-height: 1.3; }
        .cta-banner-right { display: flex; flex-direction: column; align-items: flex-end; gap: 10px; }
        .cta-banner-phone { color: rgba(255,255,255,0.8); font-size: 22px; font-weight: 700; }
        .btn-white { background: white; color: var(--purple); padding: 14px 32px; border-radius: 28px; border: none; font-size: 14px; font-weight: 700; transition: opacity .15s; }
        .btn-white:hover { opacity: .92; }

        /* ── Footer ── */
        footer { background: var(--dark); padding: 48px 32px 32px; }
        .footer-grid { display: grid; grid-template-columns: 2fr 1fr 1fr 1fr; gap: 40px; margin-bottom: 40px; max-width: 1100px; margin: 0 auto 40px; }
        .footer-brand { font-size: 16px; font-weight: 800; color: white; letter-spacing: 0.06em; margin-bottom: 10px; }
        .footer-addr { font-size: 13px; color: rgba(255,255,255,0.45); line-height: 1.7; }
        .footer-col-title { font-size: 11px; font-weight: 700; color: rgba(255,255,255,0.35); text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 14px; }
        .footer-links { display: flex; flex-direction: column; gap: 8px; }
        .footer-links a { font-size: 13px; color: rgba(255,255,255,0.55); transition: color .15s; }
        .footer-links a:hover { color: white; }
        .footer-bottom { border-top: 1px solid rgba(255,255,255,0.06); padding-top: 20px; display: flex; align-items: center; justify-content: space-between; max-width: 1100px; margin: 0 auto; }
        .footer-copy { font-size: 12px; color: rgba(255,255,255,0.25); }

        /* ── Widget ── */
        #sp-btn { position: fixed; bottom: 24px; right: 24px; z-index: 9999; width: 62px; height: 62px; border-radius: 50%; background: var(--purple); border: none; cursor: pointer; box-shadow: 0 4px 20px rgba(124,90,191,0.45); display: flex; align-items: center; justify-content: center; transition: transform .2s, box-shadow .2s; }
        #sp-btn:hover { transform: scale(1.07); box-shadow: 0 6px 28px rgba(124,90,191,0.55); }
        #sp-bubble { position: fixed; bottom: 100px; right: 24px; z-index: 9998; width: 390px; height: 620px; max-height: calc(100vh - 120px); border-radius: 18px; overflow: hidden; box-shadow: 0 8px 48px rgba(28,20,50,0.22); border: 1px solid rgba(124,90,191,0.18); opacity: 0; pointer-events: none; transform: translateY(14px) scale(0.97); transition: opacity .22s ease, transform .22s ease; }
        #sp-bubble.open { opacity: 1; pointer-events: all; transform: translateY(0) scale(1); }
        #sp-bubble iframe { width: 100%; height: 100%; border: none; display: block; }
        #sp-badge { position: absolute; top: 0; right: 0; width: 15px; height: 15px; border-radius: 50%; background: #2ea86b; border: 2.5px solid white; }
        #sp-tooltip { position: fixed; bottom: 100px; right: 96px; z-index: 9997; background: var(--dark); color: white; font-family: var(--font); font-size: 13px; padding: 10px 16px; border-radius: 10px; white-space: nowrap; box-shadow: 0 4px 16px rgba(0,0,0,0.2); pointer-events: none; transition: opacity .3s; }
        #sp-tooltip::after { content: ''; position: absolute; right: -6px; top: 50%; transform: translateY(-50%); border: 6px solid transparent; border-right: none; border-left-color: var(--dark); }

        @media(max-width:768px) {
          .hero { grid-template-columns: 1fr; padding: 32px 24px; margin: 12px; }
          .hero-image { display: none; }
          .hero h1 { font-size: 28px; }
          .directions-grid { grid-template-columns: repeat(2, 1fr); }
          .steps-grid { grid-template-columns: repeat(2, 1fr); }
          .benefits-grid { grid-template-columns: 1fr; }
          .prices-grid { grid-template-columns: repeat(2, 1fr); }
          .cta-banner { flex-direction: column; gap: 24px; text-align: center; }
          .cta-banner-right { align-items: center; }
          nav .nav-links, nav .nav-meta { display: none; }
          #sp-bubble { width: calc(100vw - 20px); right: 10px; }
          .footer-grid { grid-template-columns: 1fr 1fr; }
        }
      `}</style>

      {/* Topbar */}
      <div className="topbar">
        <span>📍 Москва, Новинский бульвар, д. 7</span>
        <div className="topbar-socials">
          <span>Подписывайтесь на нас:</span>
          <a href="https://t.me/superpositionpro">Telegram</a>
          <a href="https://www.youtube.com/@superpositionpro">YouTube</a>
        </div>
      </div>

      {/* Nav */}
      <nav>
        <div className="nav-logo">
          <svg className="nav-logo-icon" viewBox="0 0 38 38" fill="none">
            <rect width="38" height="38" rx="8" fill="#ede9f8"/>
            <path d="M19 8L30 14.5V24.5L19 31L8 24.5V14.5L19 8Z" fill="#7c5abf" opacity="0.15"/>
            <path d="M19 8L30 14.5V24.5L19 31L8 24.5V14.5L19 8Z" stroke="#7c5abf" strokeWidth="1.5" fill="none"/>
            <circle cx="19" cy="19.5" r="3" fill="#7c5abf"/>
            <circle cx="19" cy="12" r="1.5" fill="#7c5abf" opacity="0.5"/>
            <circle cx="25.2" cy="15.7" r="1.5" fill="#7c5abf" opacity="0.5"/>
            <circle cx="25.2" cy="23.2" r="1.5" fill="#7c5abf" opacity="0.5"/>
            <circle cx="19" cy="27" r="1.5" fill="#7c5abf" opacity="0.5"/>
            <circle cx="12.8" cy="23.2" r="1.5" fill="#7c5abf" opacity="0.5"/>
            <circle cx="12.8" cy="15.7" r="1.5" fill="#7c5abf" opacity="0.5"/>
          </svg>
          <div>
            <div className="nav-logo-text">SUPERPOSITION.PRO</div>
            <span className="nav-logo-sub">17 лет проводим персональные тренировки</span>
          </div>
        </div>
        <div className="nav-links">
          <button className="nav-pill">Форматы ▾</button>
          <button className="nav-pill">Направления ▾</button>
          <button className="nav-pill">Стоимость</button>
          <button className="nav-pill">Отзывы ⭐ 4.8</button>
        </div>
        <div className="nav-meta">
          <div>
            <div style={{fontSize:11,color:'#6b6682'}}>Звоните с 8:00 до 22:00</div>
            <a className="nav-phone" href="tel:+74999927677">+7 (499) 992-76-77</a>
          </div>
          <button className="nav-cta" onClick={() => setWidgetOpen(true)}>Онлайн-запись</button>
        </div>
      </nav>

      {/* Hero */}
      <section className="hero">
        <div>
          <span className="hero-tag">Персональные тренировки · Центр Москвы</span>
          <h1>Студия, где<br/><em>результат</em><br/>гарантирован</h1>
          <p className="hero-desc">Тренируйтесь в приватном зале с опытным тренером по индивидуальной программе — без шума и без посторонних.</p>
          <div className="hero-bullets">
            <div className="hero-bullet">Приватный зал без посторонних — полная конфиденциальность</div>
            <div className="hero-bullet">Индивидуальный план занятий под ваши цели</div>
            <div className="hero-bullet">10 направлений тренировок под ваш образ жизни</div>
          </div>
          <div className="hero-ctas">
            <button className="btn-primary" onClick={() => setWidgetOpen(true)}>Записаться на тренировку</button>
            <button className="btn-ghost">Узнать стоимость</button>
          </div>
          <div className="hero-stats">
            <div className="hero-stat">
              <div className="hero-stat-num">17</div>
              <div className="hero-stat-label">лет работы</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-num">300+</div>
              <div className="hero-stat-label">клиентов</div>
            </div>
            <div className="hero-stat">
              <div className="hero-stat-num">4.8 ⭐</div>
              <div className="hero-stat-label">средний рейтинг</div>
            </div>
          </div>
        </div>
        <div className="hero-image">
          <div className="hero-image-placeholder">
            <div className="hero-image-icon">🤸‍♀️</div>
            <div style={{fontSize:13,color:'#9b87d8',marginTop:12,fontWeight:600}}>Superposition.pro</div>
          </div>
        </div>
      </section>

      {/* Directions */}
      <section className="section" style={{maxWidth:1148,margin:'0 auto'}}>
        <div className="section-title">10 направлений тренировок</div>
        <div className="section-sub">под ваш образ жизни и цели</div>
        <div className="directions-grid">
          {directions.map((d, i) => (
            <div className="direction-card" key={i}>
              <div className="direction-name">{d.name}</div>
              <div className="direction-desc">{d.desc}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Steps */}
      <section className="section" style={{background:'var(--white)',padding:'64px 32px'}}>
        <div style={{maxWidth:1100,margin:'0 auto'}}>
          <div className="section-title">Программа тренировок</div>
          <div className="section-sub">с учётом вашей цели — шаг за шагом</div>
          <div className="steps-grid">
            {steps.map((s, i) => (
              <div className="step-card" key={i}>
                <div className="step-num">{s.n}.</div>
                <div className="step-title">{s.title}</div>
                <div className="step-text">{s.text}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits */}
      <section className="benefits-section">
        <div className="section-title">Почему клиенты выбирают нас</div>
        <div className="section-sub" style={{color:'rgba(255,255,255,0.45)'}}>за что студия получила 4.8 из 5</div>
        <div className="benefits-grid">
          {benefits.map((b, i) => (
            <div className="benefit-card" key={i}>
              <div className="benefit-icon">{b.icon}</div>
              <div className="benefit-title">{b.title}</div>
              <div className="benefit-text">{b.text}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Prices */}
      <section className="section" style={{maxWidth:1148,margin:'0 auto'}}>
        <div className="section-title">Стоимость</div>
        <div className="section-sub">Выбирайте формат, который вам подходит</div>
        <div className="prices-grid">
          {prices.map((p, i) => (
            <div className={`price-card${p.featured ? ' featured' : ''}`} key={i}>
              {p.featured && <div className="price-badge">ПЕРВОЕ ЗАНЯТИЕ</div>}
              <div className="price-label">{p.label}</div>
              <div className="price-amount">{p.price}</div>
              <div className="price-sub">{p.sub}</div>
              <button className="price-btn" onClick={() => setWidgetOpen(true)}>{p.cta}</button>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Banner */}
      <div className="cta-banner">
        <h2>Запишитесь на тренировку.<br/>Первое посещение — 4 000 ₽</h2>
        <div className="cta-banner-right">
          <div className="cta-banner-phone">+7 (499) 992-76-77</div>
          <button className="btn-white" onClick={() => setWidgetOpen(true)}>Записаться</button>
        </div>
      </div>

      {/* Footer */}
      <footer>
        <div className="footer-grid">
          <div>
            <div className="footer-brand">SUPERPOSITION.PRO</div>
            <div className="footer-addr">
              Новинский бульвар, 7, офис 2<br/>
              м. Смоленская, м. Арбатская<br/>
              Ежедневно 8:00–22:00<br/>
              superposition.pro@gmail.com
            </div>
          </div>
          <div>
            <div className="footer-col-title">Направления</div>
            <div className="footer-links">
              {["Пилатес","Йога в гамаках","Боди-балет","Силовые","ЛФК"].map(l => <a key={l} href="#">{l}</a>)}
            </div>
          </div>
          <div>
            <div className="footer-col-title">Форматы</div>
            <div className="footer-links">
              {["Персональные","Групповые","Онлайн","Парные"].map(l => <a key={l} href="#">{l}</a>)}
            </div>
          </div>
          <div>
            <div className="footer-col-title">Студия</div>
            <div className="footer-links">
              {["О нас","Команда","Отзывы","Стоимость","FAQ","Вакансии"].map(l => <a key={l} href="#">{l}</a>)}
            </div>
          </div>
        </div>
        <div className="footer-bottom">
          <div className="footer-copy">© 2025 ИП Захарова Наталья Евгеньевна · ИНН 380109749446</div>
          <div className="footer-copy">Политика конфиденциальности · Публичная оферта</div>
        </div>
      </footer>

      {/* ── Floating chat widget ── */}
      <div id="sp-bubble" className={widgetOpen ? 'open' : ''}>
        <iframe src="/embed" allow="clipboard-write"/>
      </div>

      {tooltipVisible && !widgetOpen && (
        <div id="sp-tooltip">💬 Спросите тренера</div>
      )}

      <button id="sp-btn" aria-label="Открыть чат" onClick={() => setWidgetOpen(o => !o)}>
        {widgetOpen ? (
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
            <path d="M5 5l12 12M17 5L5 17" stroke="white" strokeWidth="2.2" strokeLinecap="round"/>
          </svg>
        ) : (
          <>
            <svg width="26" height="26" viewBox="0 0 26 26" fill="none">
              <path d="M4 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v11a2 2 0 0 1-2 2H9l-5 4V5Z" fill="white"/>
              <circle cx="9" cy="11" r="1.2" fill="#7c5abf"/>
              <circle cx="13" cy="11" r="1.2" fill="#7c5abf"/>
              <circle cx="17" cy="11" r="1.2" fill="#7c5abf"/>
            </svg>
            <div id="sp-badge"/>
          </>
        )}
      </button>
    </>
  );
}
