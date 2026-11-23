export interface Chapter {
  step: string;
  title: string;
  /** ms */
  dur: number;
  accent: string;
}

export const CHAPTERS: Chapter[] = [
  { step: "STEP 01", title: "You Unlock Locally", dur: 8400, accent: "#1fbbd2" },
  { step: "STEP 02", title: "Protected Before Sync", dur: 9200, accent: "#1fbbd2" },
  { step: "STEP 03", title: "Safe-Deposit Storage", dur: 9200, accent: "#f39c12" },
  { step: "STEP 04", title: "Unlocked Anywhere You Sign In", dur: 9600, accent: "#f39c12" },
];

export const CH_START: number[] = CHAPTERS.reduce<number[]>((acc, c, i) => {
  acc.push(i === 0 ? 0 : acc[i - 1] + CHAPTERS[i - 1].dur);
  return acc;
}, []);

export const TOTAL = CHAPTERS.reduce((s, c) => s + c.dur, 0);

export function chapterAt(ms: number): number {
  for (let i = CHAPTERS.length - 1; i >= 0; i--) {
    if (ms >= CH_START[i]) return i;
  }
  return 0;
}

/** Video-style subtitle track: { at: ms, text } — last entry <= t is shown. */
export const CAPTIONS: { at: number; text: string }[] = [
  { at: CH_START[0] + 200, text: "You type your master password — it is used on this device only." },
  { at: CH_START[0] + 3400, text: "Your device stretches it into a cryptographic key. The password itself goes nowhere." },
  { at: CH_START[0] + 6000, text: "The vault unlocks right here in your device's memory." },
  { at: CH_START[1] + 300, text: "Before anything syncs, your device locks each item itself — real AES-256-GCM." },
  { at: CH_START[1] + 4200, text: "Even the item's title becomes ciphertext, plus a random IV and integrity tag." },
  { at: CH_START[1] + 7000, text: "Decryption is the exact same math in reverse — and it only happens on your device." },
  { at: CH_START[2] + 400, text: "Only the locked packet travels to the cloud." },
  { at: CH_START[2] + 3600, text: "If anyone opened our database — an attacker, or even us — this is all they would see." },
  { at: CH_START[2] + 6800, text: "Ciphertext without your key is just noise." },
  { at: CH_START[3] + 300, text: "On any device you prove it's you — fingerprint, Face ID, or master password." },
  { at: CH_START[3] + 3600, text: "The locked item comes down, decrypts in memory, and autofills the sign-in form." },
  { at: CH_START[3] + 7200, text: "When you're done it locks again — and wipes the key from memory." },
];

export function captionAt(ms: number): number {
  let idx = -1;
  for (let i = 0; i < CAPTIONS.length; i++) {
    if (CAPTIONS[i].at <= ms) idx = i;
  }
  return idx;
}

export const DEMO = {
  masterPw: "correct-horse-battery-42",
  site: "Northwind",
  siteUrl: "northwind.app/login",
  siteTab: "Northwind — Sign in",
  user: "jane@northmail.com",
  secret: "P@ssw0rd!Tr1cky",
  itemTitle: "Northwind",
};

/** Used until real WebCrypto output is ready (and as permanent fallback). */
export const FALLBACK = {
  cipherTitle: "g8Ks1vQp2mR4xT7yU9wE3aB6cD0fH==",
  cipherPw: "kR9vX2mQ8pL4sT7wY1aE6bN3cF0gH5jK9mP2rT8vW4xY==",
  ivHex: "a3f1c9e24b7d8012e5f6a9c3",
  tagHex: "7f2a9c4e1b6d8305f2a7c9e1b4d68f03",
  keyHex: "9f2c4a7e1b6d8305f2a7c9e1b4d68f039f2c4a7e1b6d8305f2a7c9e1b4d68f03",
  fillerRows: [
    "vQ2mX8pL4sT7wY1aE6bN3cF0gH5jK9mP=",
    "T7wY1aE6bN3cF0gH5jK9mP2rT8vW4xY=",
    "H5jK9mP2rT8vW4xY7aE6bN3cF0gQ2mX=",
  ],
  kdfLabel: "AES-256-GCM · demo",
};

export const fmtTime = (ms: number) => {
  const s = Math.max(0, Math.floor(ms / 1000));
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, "0")}`;
};
