/**
 * Guided demo scene data.
 * All coordinates are in IMAGE PIXELS of the referenced screenshot.
 * The stage renders the base screen at 1024x485 design px. Modal
 * screenshots are full-window captures; only their white dialog card
 * (`card` rect) is shown, scaled to MODAL_H design px (see HeroDemo).
 */

/** rect in image px (cards, click targets, highlight rings, typed-text boxes) */
export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}
/** point in image px */
export interface Pt {
  x: number;
  y: number;
}

export interface ImgSpec {
  src: string;
  w: number;
  h: number;
  /** Capture scale of the app UI in this screenshot (app px -> image px). */
  ui: number;
}

export const IMGS = {
  dashboard: { src: "/images/cyfer-dashboard.png", w: 1024, h: 485, ui: 0.49 },
  apps: { src: "/images/cyfer-connected-apps.png", w: 1024, h: 487, ui: 0.49 },
  chooser: { src: "/images/what-to-store-modal.png", w: 590, h: 550, ui: 1 },
  login: { src: "/images/new-login-modal.png", w: 795, h: 876, ui: 1 },
  loginScroll: { src: "/images/new-login-modal-scrolled.png", w: 710, h: 861, ui: 1 },
  card: { src: "/images/new-card-modal.png", w: 761, h: 881, ui: 1 },
  cardScroll: { src: "/images/new-card-modal-scrolled.png", w: 731, h: 850, ui: 1 },
  wifi: { src: "/images/new-wifi-modal.png", w: 857, h: 852, ui: 1 },
} as const satisfies Record<string, ImgSpec>;

export type ImgKey = keyof typeof IMGS;

/**
 * White dialog card bounds in image px — the modal screenshots are
 * full-window captures that include their own dimmed backdrop, which we
 * crop away. Base screens have no entry here.
 */
export const MODAL_CARDS: Partial<Record<ImgKey, Rect>> = {
  chooser: { x: 45, y: 27, w: 448, h: 493 },
  login: { x: 60, y: 24, w: 671, h: 815 },
  loginScroll: { x: 11, y: 18, w: 671, h: 815 },
  card: { x: 53, y: 27, w: 671, h: 815 },
  cardScroll: { x: 45, y: 27, w: 671, h: 815 },
  wifi: { x: 112, y: 23, w: 671, h: 815 },
};

export type Step =
  | { t: "wait"; ms: number }
  | { t: "cap"; text: string }
  | { t: "screen"; img: ImgKey }
  | { t: "modal"; img: ImgKey | null }
  | { t: "move"; p: Pt; on?: "base" | "modal"; ms?: number }
  | { t: "click"; target: Rect; on?: "base" | "modal"; ms?: number }
  | { t: "type"; box: Rect; field: string; text: string; on?: "base" | "modal"; cps?: number }
  | { t: "fill"; box: Rect; field: string; text: string; on?: "base" | "modal" }
  | { t: "zoom"; k: number; at?: Pt; on?: "base" | "modal" }
  | { t: "cursor"; show: boolean };

export interface Scene {
  id: string;
  title: string;
  steps: Step[];
}

// ---- shared hotspots (measured from the screenshots) -------------------

const DASH = {
  newItem: { x: 610, y: 5, w: 67, h: 21 },
  twoFaRow: { x: 3, y: 114, w: 117, h: 19 },
};

const CHOOSER = {
  loginTile: { x: 66, y: 103, w: 130, h: 93 },
  cardTile: { x: 342, y: 103, w: 130, h: 93 },
  wifiTile: { x: 342, y: 306, w: 130, h: 93 },
  /** Dialog centre — zoom target so the whole chooser stays visible. */
  center: { x: 269, y: 273 },
};

const LOGIN = {
  nameBox: { x: 81, y: 123, w: 622, h: 42 },
  userBox: { x: 81, y: 203, w: 622, h: 42 },
  passBox: { x: 81, y: 283, w: 534, h: 42 },
  genBtn: { x: 665, y: 283, w: 38, h: 42 },
  webBox: { x: 81, y: 363, w: 578, h: 42 },
  seedBox: { x: 81, y: 493, w: 578, h: 42 },
  /** Focus point that keeps the top three fields in view while zoomed. */
  topFields: { x: 396, y: 244 },
  /** Focus point for the authenticator-seed section. */
  seedFocus: { x: 400, y: 514 },
};

const LOGIN_SCROLL = {
  save: { x: 588, y: 778, w: 66, h: 42 },
};

const CARD = {
  nameBox: { x: 74, y: 126, w: 622, h: 42 },
  holderBox: { x: 74, y: 206, w: 622, h: 42 },
  brandBox: { x: 74, y: 286, w: 622, h: 42 },
  numberBox: { x: 74, y: 366, w: 578, h: 42 },
  topFields: { x: 380, y: 250 },
};

const CARD_SCROLL = {
  save: { x: 622, y: 787, w: 66, h: 42 },
};

const WIFI = {
  nameBox: { x: 133, y: 122, w: 622, h: 42 },
  ssidBox: { x: 133, y: 202, w: 622, h: 42 },
  passBox: { x: 133, y: 282, w: 534, h: 42 },
  topFields: { x: 428, y: 220 },
};

const APPS = {
  row: { x: 10, y: 367, w: 116, h: 19 },
  nameBox: { x: 803, y: 240, w: 192, h: 23 },
  connectBtn: { x: 804, y: 267, w: 109, h: 21 },
};

// ---- scenes -------------------------------------------------------------

export const SCENES: Scene[] = [
  {
    id: "save-login",
    title: "Save a password",
    steps: [
      { t: "screen", img: "dashboard" },
      { t: "modal", img: null },
      { t: "zoom", k: 1 },
      { t: "cursor", show: true },
      { t: "cap", text: "1. Click “+ New item” to add something to your vault." },
      { t: "move", p: { x: 512, y: 250 }, ms: 600 },
      { t: "click", target: DASH.newItem, ms: 1400 },
      { t: "modal", img: "chooser" },
      { t: "zoom", k: 1.55, at: CHOOSER.center },
      { t: "cap", text: "2. Choose “Login”." },
      { t: "wait", ms: 600 },
      { t: "click", target: CHOOSER.loginTile, ms: 1300 },
      { t: "modal", img: "login" },
      { t: "zoom", k: 1.55, at: LOGIN.topFields },
      { t: "cap", text: "3. Fill in the login — name and username." },
      { t: "type", box: LOGIN.nameBox, field: "s1-name", text: "My email login" },
      { t: "type", box: LOGIN.userBox, field: "s1-user", text: "alex@example.com" },
      { t: "cap", text: "4. Let Cyfer generate a strong password." },
      { t: "click", target: LOGIN.genBtn, ms: 1200 },
      { t: "fill", box: LOGIN.passBox, field: "s1-pass", text: "••••••••••••••" },
      { t: "type", box: LOGIN.webBox, field: "s1-web", text: "example.com" },
      { t: "cap", text: "5. Scroll down and press Save." },
      { t: "modal", img: "loginScroll" },
      { t: "zoom", k: 1.5, at: { x: 620, y: 798 } },
      { t: "wait", ms: 700 },
      { t: "click", target: LOGIN_SCROLL.save, ms: 1300 },
      { t: "modal", img: null },
      { t: "zoom", k: 1 },
      { t: "cap", text: "Done — the login is locked inside your vault." },
      { t: "wait", ms: 1400 },
    ],
  },
  {
    id: "github-2fa",
    title: "GitHub with 2-step code",
    steps: [
      { t: "screen", img: "dashboard" },
      { t: "cap", text: "1. New item → Login, for your GitHub account." },
      { t: "click", target: DASH.newItem, ms: 1400 },
      { t: "modal", img: "chooser" },
      { t: "zoom", k: 1.55, at: CHOOSER.center },
      { t: "wait", ms: 500 },
      { t: "click", target: CHOOSER.loginTile, ms: 1200 },
      { t: "modal", img: "login" },
      { t: "zoom", k: 1.55, at: LOGIN.topFields },
      { t: "type", box: LOGIN.nameBox, field: "s2-name", text: "GitHub" },
      { t: "type", box: LOGIN.userBox, field: "s2-user", text: "alex-dev" },
      { t: "click", target: LOGIN.genBtn, ms: 1100 },
      { t: "fill", box: LOGIN.passBox, field: "s2-pass", text: "••••••••••••••" },
      { t: "type", box: LOGIN.webBox, field: "s2-web", text: "github.com" },
      { t: "zoom", k: 1.55, at: LOGIN.seedFocus },
      { t: "cap", text: "2. Paste GitHub’s two-factor setup key here." },
      { t: "type", box: LOGIN.seedBox, field: "s2-seed", text: "otpauth://totp/github:alex", cps: 9 },
      { t: "cap", text: "Cyfer then shows the live 6-digit code — no separate app needed." },
      { t: "modal", img: "loginScroll" },
      { t: "zoom", k: 1.5, at: { x: 620, y: 798 } },
      { t: "wait", ms: 1100 },
      { t: "click", target: LOGIN_SCROLL.save, ms: 1300 },
      { t: "modal", img: null },
      { t: "zoom", k: 1 },
      { t: "cap", text: "3. All your live codes sit under “2FA codes”." },
      { t: "click", target: DASH.twoFaRow, ms: 1300 },
      { t: "wait", ms: 1200 },
    ],
  },
  {
    id: "connect-app",
    title: "Connect an app",
    steps: [
      { t: "screen", img: "dashboard" },
      { t: "modal", img: null },
      { t: "zoom", k: 1 },
      { t: "cursor", show: true },
      { t: "cap", text: "1. Scroll the sidebar and open “Connected apps”." },
      { t: "move", p: { x: 62, y: 300 }, ms: 900 },
      { t: "move", p: { x: 62, y: 445 }, ms: 650 },
      { t: "screen", img: "apps" },
      { t: "wait", ms: 450 },
      { t: "click", target: APPS.row, ms: 1000 },
      { t: "cap", text: "2. Type the app’s name." },
      { t: "type", box: APPS.nameBox, on: "base", field: "s3-app", text: "ci-server" },
      { t: "cap", text: "3. Press “Create connect code” — the app gets a code, never your key." },
      { t: "click", target: APPS.connectBtn, ms: 1400 },
      { t: "wait", ms: 1600 },
    ],
  },
  {
    id: "save-card",
    title: "Save a card",
    steps: [
      { t: "screen", img: "dashboard" },
      { t: "modal", img: null },
      { t: "zoom", k: 1 },
      { t: "cursor", show: true },
      { t: "cap", text: "1. New item → Card." },
      { t: "click", target: DASH.newItem, ms: 1400 },
      { t: "modal", img: "chooser" },
      { t: "zoom", k: 1.55, at: CHOOSER.center },
      { t: "wait", ms: 500 },
      { t: "click", target: CHOOSER.cardTile, ms: 1200 },
      { t: "modal", img: "card" },
      { t: "zoom", k: 1.55, at: CARD.topFields },
      { t: "type", box: CARD.nameBox, field: "s4-name", text: "Everyday Visa" },
      { t: "type", box: CARD.holderBox, field: "s4-holder", text: "Alex Example" },
      { t: "type", box: CARD.brandBox, field: "s4-brand", text: "Visa" },
      { t: "type", box: CARD.numberBox, field: "s4-number", text: "4242 4242 4242 4242", cps: 8 },
      { t: "cap", text: "2. Save it — autofill handles checkout." },
      { t: "modal", img: "cardScroll" },
      { t: "zoom", k: 1.5, at: { x: 654, y: 807 } },
      { t: "wait", ms: 900 },
      { t: "click", target: CARD_SCROLL.save, ms: 1300 },
      { t: "modal", img: null },
      { t: "zoom", k: 1 },
      { t: "wait", ms: 1200 },
    ],
  },
  {
    id: "save-wifi",
    title: "Save Wi-Fi",
    steps: [
      { t: "screen", img: "dashboard" },
      { t: "modal", img: null },
      { t: "zoom", k: 1 },
      { t: "cursor", show: true },
      { t: "cap", text: "1. New item → Wi-Fi." },
      { t: "click", target: DASH.newItem, ms: 1400 },
      { t: "modal", img: "chooser" },
      { t: "zoom", k: 1.55, at: CHOOSER.center },
      { t: "wait", ms: 500 },
      { t: "click", target: CHOOSER.wifiTile, ms: 1200 },
      { t: "modal", img: "wifi" },
      { t: "zoom", k: 1.5, at: WIFI.topFields },
      { t: "type", box: WIFI.nameBox, field: "s5-name", text: "Home Wi-Fi" },
      { t: "type", box: WIFI.ssidBox, field: "s5-ssid", text: "HomeNet-5G" },
      { t: "type", box: WIFI.passBox, field: "s5-pass", text: "Correct-Horse-2026", cps: 8 },
      { t: "cap", text: "Passwords, cards, Wi-Fi — everything in one locked vault." },
      { t: "wait", ms: 2200 },
      { t: "modal", img: null },
      { t: "zoom", k: 1 },
      { t: "cursor", show: false },
      { t: "cap", text: "Replaying…" },
      { t: "wait", ms: 1200 },
    ],
  },
];
