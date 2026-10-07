import { createFileRoute } from "@tanstack/react-router";
import { sendLeadCapi } from "@/lib/meta-capi.functions";
import duduMascot from "@/assets/dudu-mascot.png";
import lpCover from "@/assets/lp-cover.jpg";

// ===== Configurações fáceis de trocar =====
const TELEGRAM_LINK = "https://t.me/dudufaisca";
const POSTER_URL = ""; // URL absoluta do poster 9:16 (1080x1920). Vazio = usa a arte de slots padrão.
const GROUP_NAME = "Dudu Faísca";
const HERO_BG = POSTER_URL || lpCover;

const TITLE = "Dudu Faísca · Grupo VIP";
const DESC = "Entre no grupo VIP Dudu Faísca e acompanhe os conteúdos em primeira mão.";

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

// Dispara o evento "Lead" no clique do CTA: via Meta Pixel (navegador)
// e via API de Conversões (servidor), com o mesmo eventId para deduplicar.
function trackLead() {
  const w = window as unknown as { fbq?: (...a: unknown[]) => void };
  const eventId =
    typeof crypto !== "undefined" && "randomUUID" in crypto
      ? crypto.randomUUID()
      : `${Date.now()}-${Math.random().toString(36).slice(2, 12)}`;
  if (typeof w.fbq === "function")
    w.fbq("track", "Lead", {}, { eventID: eventId });
  const fbp = document.cookie.match(/_fbp=([^;]+)/)?.[1];
  sendLeadCapi({
    data: { eventId, fbp, sourceUrl: window.location.href },
  }).catch(() => {});
}

const COINS = [
  { left: "4%", delay: 0, dur: 2.2 }, { left: "14%", delay: 0.5, dur: 2.6 },
  { left: "24%", delay: 1.1, dur: 2.3 }, { left: "33%", delay: 0.2, dur: 2.8 },
  { left: "42%", delay: 0.8, dur: 2.1 }, { left: "50%", delay: 1.4, dur: 2.7 },
  { left: "58%", delay: 0.4, dur: 2.4 }, { left: "67%", delay: 1.0, dur: 2.9 },
  { left: "76%", delay: 0.1, dur: 2.2 }, { left: "85%", delay: 0.7, dur: 2.5 },
  { left: "94%", delay: 1.3, dur: 2.3 }, { left: "9%", delay: 1.7, dur: 2.6 },
  { left: "47%", delay: 1.9, dur: 2.4 }, { left: "72%", delay: 1.6, dur: 2.8 },
];

type Sym = "seven" | "cherry" | "lemon" | "bell" | "diamond" | "star";
// Posições 0 e 19 precisam ser "seven" para o giro em loop parar sempre no jackpot.
const STRIP: Sym[] = ["seven", "cherry", "lemon", "bell", "diamond", "star", "cherry", "seven", "lemon", "diamond", "star", "bell", "cherry", "diamond", "seven", "star", "bell", "cherry", "diamond", "seven"];

const Sym = ({ kind }: { kind: Sym }) => {
  switch (kind) {
    case "seven":
      return (
        <svg viewBox="0 0 40 40">
          <text x="20" y="32" textAnchor="middle" fontSize="32" fontWeight="900" fontFamily="Anton, sans-serif" fill="#f2d98d" stroke="#8a6a25" strokeWidth="1.2">7</text>
        </svg>
      );
    case "cherry":
      return (
        <svg viewBox="0 0 40 40">
          <path d="M20 5 C16 11 13 16 13 22" stroke="#2f9e63" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <path d="M20 5 C24 11 28 15 28 20" stroke="#2f9e63" strokeWidth="2.5" fill="none" strokeLinecap="round" />
          <circle cx="13" cy="28" r="7" fill="#e0313c" />
          <circle cx="28" cy="26" r="6.5" fill="#c8242f" />
          <circle cx="10.5" cy="25.5" r="2" fill="#ff9aa0" opacity=".85" />
        </svg>
      );
    case "lemon":
      return (
        <svg viewBox="0 0 40 40">
          <ellipse cx="20" cy="23" rx="12" ry="8.5" fill="#f7d537" transform="rotate(-18 20 23)" />
          <ellipse cx="20" cy="23" rx="12" ry="8.5" fill="none" stroke="#d9b41f" strokeWidth="1.5" transform="rotate(-18 20 23)" />
          <circle cx="14" cy="20" r="2" fill="#fce990" opacity=".9" />
        </svg>
      );
    case "bell":
      return (
        <svg viewBox="0 0 40 40">
          <path d="M20 8c-6 0-9 5-9 10 0 6-2 8-4 10h26c-2-2-4-4-4-10 0-5-3-10-9-10z" fill="#f0c548" stroke="#c9992b" strokeWidth="1.2" />
          <circle cx="20" cy="31.5" r="3" fill="#c9992b" />
          <circle cx="20" cy="6.5" r="2.5" fill="#c9992b" />
        </svg>
      );
    case "diamond":
      return (
        <svg viewBox="0 0 40 40">
          <polygon points="20,5 33,15 20,35 7,15" fill="#4fd8ab" />
          <polygon points="20,5 27,15 20,35 13,15" fill="#8ff0d1" />
          <polygon points="7,15 33,15" fill="none" stroke="#2ea881" strokeWidth="1.2" />
        </svg>
      );
    case "star":
      return (
        <svg viewBox="0 0 40 40">
          <polygon points="20,4 24.7,14.6 36,15.8 27.6,23.5 30,35 20,29 10,35 12.4,23.5 4,15.8 15.3,14.6" fill="#f2c94c" stroke="#c9992b" strokeWidth="1.2" />
        </svg>
      );
  }
};

const SlotMachine = () => (
  <div className="lp-slots" aria-hidden="true">
    <div className="lp-slots__machine">
      <div className="lp-slots__reel"><div className="lp-slots__strip lp-slots__strip--a">{STRIP.map((s, i) => <span key={i}><Sym kind={s} /></span>)}</div></div>
      <div className="lp-slots__reel"><div className="lp-slots__strip lp-slots__strip--b">{STRIP.map((s, i) => <span key={i}><Sym kind={s} /></span>)}</div></div>
      <div className="lp-slots__reel"><div className="lp-slots__strip lp-slots__strip--c">{STRIP.map((s, i) => <span key={i}><Sym kind={s} /></span>)}</div></div>
    </div>
    <div className="lp-slots__coins">
      {COINS.map((c, i) => (
        <span key={i} className="lp-coin" style={{ left: c.left, animationDelay: `${c.delay}s`, animationDuration: `${c.dur}s` }} />
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
      <section className="lp-hero" aria-label="Dudu Faísca Grupo VIP — participe agora do grupo no Telegram">
        <div className="lp-hero__art" style={{ backgroundImage: `url(${HERO_BG})` }} aria-hidden="true" />
        <div className="lp-hero__overlay" aria-hidden="true" />
        <div className="lp-hero__content">
          <div className="lp-dudu" aria-hidden="true">
            <span className="lp-dudu__ring" />
            <img src={duduMascot} alt="" className="lp-dudu__img" />
          </div>
          <SlotMachine />
          <p className="lp-eyebrow">Grupo VIP</p>
          <h1 className="lp-title">Dudu Faísca</h1>
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
          <h2>{GROUP_NAME}</h2>
          <p>O grupo {GROUP_NAME} no Telegram é um grupo VIP de conteúdos. Esta página apresenta o acesso ao convite desse grupo.</p>
          <p>Ao tocar em "Acessar grupo VIP", você abre o convite no Telegram. Confira o nome do grupo antes de decidir participar. Abrir o convite não confirma sua entrada.</p>

          <details className="lp-policy">
            <summary>Política de Privacidade</summary>
            <div className="lp-policy__body">
              <h3>Como esta página usa dados</h3>
              <p>Em visitas vindas de anúncios, o Meta Pixel e a API de Conversões da Meta podem registrar a visualização da página e o clique no botão para entrar no grupo.</p>
              <p>Esses dados podem incluir a URL e seus parâmetros, data e horário, endereço IP, informações do navegador e identificadores de visitante ou de clique.</p>
              <p>Esta página não pede seu telefone nem seu e-mail e não lê mensagens do Telegram.</p>
              <p>Cookies podem guardar esses identificadores por até 90 dias. Saiba mais na <a href="https://www.facebook.com/privacy/policy/" target="_blank" rel="noopener noreferrer">Política de Privacidade da Meta</a>.</p>
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
