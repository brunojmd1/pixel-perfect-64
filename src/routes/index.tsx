import { createFileRoute } from "@tanstack/react-router";

// ===== Configurações fáceis de trocar =====
const WHATSAPP_LINK = "https://chat.whatsapp.com/SEU-CODIGO-AQUI";
const POSTER_URL = ""; // URL absoluta do poster 9:16 (1080x1920). Vazio = fundo temático.
const GROUP_NAME = "[Nome do Grupo]";
const OWNER = "[Seu nome ou marca]";
const EMAIL = "seu-email@exemplo.com";

const TITLE = "Duduknal · Grupo VIP";
const DESC = "Entre no grupo VIP do Duduknal e acompanhe os conteúdos em primeira mão.";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      ...(POSTER_URL
        ? [
            { property: "og:image", content: POSTER_URL },
            { name: "twitter:image", content: POSTER_URL },
          ]
        : []),
    ],
  }),
  component: Index,
});

function trackContact() {
  const w = window as unknown as { fbq?: (...a: unknown[]) => void };
  if (typeof w.fbq === "function") w.fbq("track", "Contact");
}

const REEL_SYMBOLS = ["7️⃣", "🍒", "🍋", "🔔", "💎", "⭐", "🍒", "7️⃣", "🍋", "💎", "⭐", "🔔", "🍒", "💎", "7️⃣", "⭐", "🔔", "🍒", "💎", "7️⃣"];
const COINS = [
  { left: "4%", delay: 0, dur: 2.2 }, { left: "14%", delay: 0.5, dur: 2.6 },
  { left: "24%", delay: 1.1, dur: 2.3 }, { left: "33%", delay: 0.2, dur: 2.8 },
  { left: "42%", delay: 0.8, dur: 2.1 }, { left: "50%", delay: 1.4, dur: 2.7 },
  { left: "58%", delay: 0.4, dur: 2.4 }, { left: "67%", delay: 1.0, dur: 2.9 },
  { left: "76%", delay: 0.1, dur: 2.2 }, { left: "85%", delay: 0.7, dur: 2.5 },
  { left: "94%", delay: 1.3, dur: 2.3 }, { left: "9%", delay: 1.7, dur: 2.6 },
  { left: "47%", delay: 1.9, dur: 2.4 }, { left: "72%", delay: 1.6, dur: 2.8 },
];

const SlotMachine = () => (
  <div className="lp-slots" aria-hidden="true">
    <div className="lp-slots__machine">
      <div className="lp-slots__reel"><div className="lp-slots__strip lp-slots__strip--a">{REEL_SYMBOLS.map((s, i) => <span key={i}>{s}</span>)}</div></div>
      <div className="lp-slots__reel"><div className="lp-slots__strip lp-slots__strip--b">{REEL_SYMBOLS.map((s, i) => <span key={i}>{s}</span>)}</div></div>
      <div className="lp-slots__reel"><div className="lp-slots__strip lp-slots__strip--c">{REEL_SYMBOLS.map((s, i) => <span key={i}>{s}</span>)}</div></div>
    </div>
    <div className="lp-slots__coins">
      {COINS.map((c, i) => (
        <span key={i} className="lp-coin" style={{ left: c.left, animationDelay: `${c.delay}s`, animationDuration: `${c.dur}s` }}>🪙</span>
      ))}
    </div>
  </div>
);

const Chevron = () => (
  <svg viewBox="0 0 28 16" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3 3l11 10L25 3" />
  </svg>
);

function Index() {
  return (
    <main>
      <section className="lp-hero" aria-label="Duduknal Grupo VIP — participe agora do grupo no WhatsApp">
        {POSTER_URL && <div className="lp-hero__art" style={{ backgroundImage: `url(${POSTER_URL})` }} aria-hidden="true" />}
        <div className="lp-hero__overlay" aria-hidden="true" />
        <div className="lp-hero__content">
          <p className="lp-eyebrow">Grupo VIP</p>
          <h1 className="lp-title">Duduknal</h1>
          <p className="lp-sub">Participe agora</p>
          <div className="lp-arrows" aria-hidden="true">
            <Chevron />
            <Chevron />
            <Chevron />
          </div>
        </div>
      </section>

      <footer className="lp-footer">
        <div className="lp-footer__inner">
          <p className="lp-tag">Informações da comunidade</p>
          <h2>Duduknal &amp; {GROUP_NAME}</h2>
          <p>O grupo {GROUP_NAME} no WhatsApp é administrado por Duduknal. Esta página apresenta o acesso ao convite desse grupo.</p>
          <p>Ao tocar em "Acessar grupo VIP", você abre o convite no WhatsApp. Confira o nome do grupo antes de decidir participar. Abrir o convite não confirma sua entrada.</p>
          <p className="lp-label">Responsável por esta página</p>
          <p className="lp-value">{OWNER}</p>
          <p className="lp-label">Contato e privacidade</p>
          <p className="lp-value"><a href={`mailto:${EMAIL}`}>{EMAIL}</a></p>

          <details className="lp-policy">
            <summary>Política de Privacidade</summary>
            <div className="lp-policy__body">
              <h3>Como esta página usa dados</h3>
              <p>{OWNER} é o responsável pelo tratamento dos dados desta página.</p>
              <p>Em visitas vindas de anúncios, o Meta Pixel e a API de Conversões da Meta podem registrar a visualização da página e o clique para o WhatsApp.</p>
              <p>Esses dados podem incluir a URL e seus parâmetros, data e horário, endereço IP, informações do navegador e identificadores de visitante ou de clique.</p>
              <p>Esta página não pede seu telefone nem seu e-mail e não lê mensagens do WhatsApp.</p>
              <p>Cookies podem guardar esses identificadores por até 90 dias. Saiba mais na <a href="https://www.facebook.com/privacy/policy/" target="_blank" rel="noopener noreferrer">Política de Privacidade da Meta</a>.</p>
              <p>Para solicitar acesso ou exclusão dos seus dados, escreva para <a href={`mailto:${EMAIL}`}>{EMAIL}</a>.</p>
            </div>
          </details>
        </div>
      </footer>

      <div className="lp-cta-bar">
        <a className="lp-btn" href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" onClick={trackContact}>
          <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M17.47 14.38c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.49-1.77-1.66-2.07-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.48s1.07 2.88 1.21 3.08c.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35zM12.05 21.79h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.9-9.88 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.89 9.88zm8.41-18.3A11.8 11.8 0 0 0 12.05 0C5.5 0 .16 5.34.16 11.89c0 2.1.55 4.14 1.59 5.95L.06 24l6.3-1.65a11.88 11.88 0 0 0 5.68 1.45h.01c6.55 0 11.89-5.34 11.89-11.89 0-3.18-1.24-6.17-3.48-8.42z" />
          </svg>
          Acessar grupo VIP
        </a>
      </div>
    </main>
  );
}
