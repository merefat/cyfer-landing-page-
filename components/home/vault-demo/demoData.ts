import { type LucideIcon,
  CreditCard,
  FileText,
  Fingerprint,
  Lock,
  UserCheck,
  Wifi,
} from "lucide-react";

/* ============================ geometry ============================ */

export interface Rect {
  x: number;
  y: number;
  w: number;
  h: number;
}

/** A real text input inside a modal screenshot (image px). */
export interface VaultField {
  key: string;
  rect: Rect;
  text: string;
  masked?: boolean;
}

/** White dialog card bounds of a modal screenshot (image px, measured). */
export interface VaultModalSpec {
  kind: "modal";
  src: string;
  imgW: number;
  imgH: number;
  card: Rect;
  /** The "What do you want to store?" tile to highlight first (image px). */
  tile?: Rect;
  fields: VaultField[];
}

export interface VaultDashSpec {
  kind: "dash";
  /** horizontal crop position 0..1 (0 = left, 1 = right) */
  pos: number;
  /** optional highlight ring, in dashboard image px */
  ring?: Rect;
}

/* ============================ site pages ============================ */

export type PageKey =
  | "idle"
  | "login"
  | "checkout"
  | "shipping"
  | "wifi"
  | "note"
  | "passkey";

export interface SiteField {
  key: string;
  label: string;
  value: string;
  masked?: boolean;
  ph?: string;
}

export interface SiteSpec {
  page: PageKey;
  url: string;
  tab: string;
  flow: "autofill" | "popup" | "passkey";
  fields: SiteField[];
  btn: string;
  ok: string;
}

export type Accent = "cyan" | "amber";
export const ACCENT: Record<Accent, string> = {
  cyan: "#1fbbd2",
  amber: "#f39c12",
};

export interface ItemDef {
  id: string;
  name: string;
  desc: string;
  icon: LucideIcon;
  accent: Accent;
  vault: VaultModalSpec | VaultDashSpec;
  site: SiteSpec;
}

export const DASH_IMG = "/images/cyfer-dashboard.png";
export const DASH_W = 1024;
export const DASH_H = 485;

/** The real app's top search box (dashboard image px). */
export const DASH_SEARCH: Rect = { x: 146, y: 5, w: 226, h: 22 };
/** "Add a passkey" button inside the getting-started card (image px). */
export const DASH_PASSKEY_BTN: Rect = { x: 930, y: 110, w: 84, h: 34 };
/** Painted content region for the Find step (image px). */
export const DASH_CONTENT: Rect = { x: 140, y: 44, w: 874, h: 438 };

const CHOOSER = {
  login: { x: 66, y: 103, w: 130, h: 93 },
  note: { x: 204, y: 103, w: 130, h: 93 },
  card: { x: 342, y: 103, w: 130, h: 93 },
  identity: { x: 66, y: 199, w: 130, h: 93 },
  wifi: { x: 342, y: 306, w: 130, h: 93 },
} as const;

export const ITEMS: ItemDef[] = [
  {
    id: "login",
    name: "Logins & Passwords",
    desc: "Usernames, passwords and a built-in 30-second code.",
    icon: Lock,
    accent: "cyan",
    vault: {
      kind: "modal",
      src: "/images/new-login-modal.png",
      imgW: 795,
      imgH: 876,
      card: { x: 60, y: 24, w: 671, h: 815 },
      tile: CHOOSER.login,
      fields: [
        { key: "name", rect: { x: 81, y: 123, w: 622, h: 42 }, text: "Northwind" },
        { key: "user", rect: { x: 81, y: 203, w: 622, h: 42 }, text: "aisha.rahman@mail.com" },
        { key: "pass", rect: { x: 81, y: 283, w: 534, h: 42 }, text: "Tr0ub4dor&3xK", masked: true },
        { key: "web", rect: { x: 81, y: 363, w: 578, h: 42 }, text: "northwind.app" },
      ],
    },
    site: {
      page: "login",
      url: "northwind.app/login",
      tab: "Northwind — Sign in",
      flow: "autofill",
      fields: [
        { key: "email", label: "Email", value: "aisha.rahman@mail.com", ph: "you@example.com" },
        { key: "pass", label: "Password", value: "Tr0ub4dor&3xK", masked: true, ph: "Password" },
        { key: "code", label: "2-step code", value: "482913", ph: "6-digit code" },
      ],
      btn: "Sign in",
      ok: "Signed in",
    },
  },
  {
    id: "card",
    name: "Payment Cards",
    desc: "Cards with safe checkout autofill and PIN storage.",
    icon: CreditCard,
    accent: "amber",
    vault: {
      kind: "modal",
      src: "/images/new-card-modal.png",
      imgW: 761,
      imgH: 881,
      card: { x: 53, y: 27, w: 671, h: 815 },
      tile: CHOOSER.card,
      fields: [
        { key: "name", rect: { x: 74, y: 126, w: 622, h: 42 }, text: "Everyday Visa" },
        { key: "holder", rect: { x: 74, y: 206, w: 622, h: 42 }, text: "Aisha Rahman" },
        { key: "brand", rect: { x: 74, y: 286, w: 622, h: 42 }, text: "Visa" },
        { key: "num", rect: { x: 74, y: 366, w: 578, h: 42 }, text: "4539 8821 0044 4417" },
      ],
    },
    site: {
      page: "checkout",
      url: "shop.example.com/checkout",
      tab: "Checkout — Shop Example",
      flow: "autofill",
      fields: [
        { key: "holder", label: "Name on card", value: "Aisha Rahman", ph: "Full name" },
        { key: "num", label: "Card number", value: "4539 8821 0044 4417", ph: "1234 5678 9012 3456" },
        { key: "exp", label: "Expiry", value: "09 / 28", ph: "MM / YY" },
      ],
      btn: "Pay $42.00",
      ok: "Payment complete",
    },
  },
  {
    id: "identity",
    name: "Personal Identities",
    desc: "Names, addresses, phone numbers, licences and passports.",
    icon: UserCheck,
    accent: "cyan",
    vault: {
      kind: "modal",
      src: "/images/new-identity-modal.png",
      imgW: 737,
      imgH: 847,
      card: { x: 50, y: 14, w: 670, h: 817 },
      tile: CHOOSER.identity,
      fields: [
        { key: "name", rect: { x: 71, y: 118, w: 620, h: 42 }, text: "Home address" },
        { key: "first", rect: { x: 71, y: 200, w: 620, h: 42 }, text: "Aisha" },
        { key: "last", rect: { x: 71, y: 282, w: 620, h: 42 }, text: "Rahman" },
        { key: "email", rect: { x: 71, y: 446, w: 620, h: 42 }, text: "aisha.rahman@mail.com" },
      ],
    },
    site: {
      page: "shipping",
      url: "store.example.com/shipping",
      tab: "Store Example — Shipping",
      flow: "autofill",
      fields: [
        { key: "name", label: "Full name", value: "Aisha Rahman", ph: "Full name" },
        { key: "addr", label: "Address", value: "14 Park Rd, Hurstville", ph: "Street address" },
        { key: "phone", label: "Phone", value: "+61 412 345 678", ph: "Phone" },
      ],
      btn: "Ship here",
      ok: "Order placed",
    },
  },
  {
    id: "wifi",
    name: "Wi-Fi Networks",
    desc: "Home, office and guest network names and passwords.",
    icon: Wifi,
    accent: "amber",
    vault: {
      kind: "modal",
      src: "/images/new-wifi-modal.png",
      imgW: 857,
      imgH: 852,
      card: { x: 112, y: 23, w: 671, h: 815 },
      tile: CHOOSER.wifi,
      fields: [
        { key: "name", rect: { x: 133, y: 122, w: 622, h: 42 }, text: "Home Wi-Fi" },
        { key: "ssid", rect: { x: 133, y: 202, w: 622, h: 42 }, text: "Home-5G" },
        { key: "pass", rect: { x: 133, y: 282, w: 534, h: 42 }, text: "blue-pot-7731", masked: true },
      ],
    },
    site: {
      page: "wifi",
      url: "192.168.1.1/wireless",
      tab: "Nexus Router — Wireless",
      flow: "autofill",
      fields: [
        { key: "ssid", label: "Network name (SSID)", value: "Home-5G", ph: "SSID" },
        { key: "pass", label: "WPA3 password", value: "blue-pot-7731", masked: true, ph: "Password" },
      ],
      btn: "Apply & connect",
      ok: "Connected to Home-5G",
    },
  },
  {
    id: "note",
    name: "Secure Notes",
    desc: "Door codes, lockbox PINs and private documents.",
    icon: FileText,
    accent: "cyan",
    vault: {
      kind: "modal",
      src: "/images/new-secure-note-modal.png",
      imgW: 822,
      imgH: 782,
      card: { x: 75, y: 37, w: 670, h: 711 },
      tile: CHOOSER.note,
      fields: [
        { key: "name", rect: { x: 96, y: 136, w: 628, h: 44 }, text: "Door alarm" },
        { key: "note", rect: { x: 96, y: 230, w: 628, h: 70 }, text: "Code 7731. Spare key under the blue pot." },
      ],
    },
    site: {
      page: "note",
      url: "homelock.local/keypad",
      tab: "HomeLock — Door keypad",
      flow: "popup",
      fields: [{ key: "pin", label: "Door PIN", value: "7731", masked: true, ph: "Enter PIN" }],
      btn: "Unlock",
      ok: "Door unlocked",
    },
  },
  {
    id: "passkey",
    name: "Passkeys",
    desc: "Sign in without a password on supported sites.",
    icon: Fingerprint,
    accent: "amber",
    vault: { kind: "dash", pos: 0.75, ring: DASH_PASSKEY_BTN },
    site: {
      page: "passkey",
      url: "northwind.app/login",
      tab: "Northwind — Welcome",
      flow: "passkey",
      fields: [],
      btn: "Sign in with passkey",
      ok: "Signed in, no password",
    },
  },
];

/* ============================ shared demo data ============================ */

export const NOTES = [
  "netflix pw: dog123??",
  "card 4539… exp 09/28",
  "wifi pass is on the fridge",
  "door code 7731 (?)",
  "bank pin = mum’s birthday",
  "passport no. in the drawer",
  "login: aisha@mail, same as always",
  "amazon pw?? ask Sam",
];

export const PW: Array<[number, number, number]> = [
  [2, 5, -5],
  [27, 52, 4],
  [52, 6, -3],
  [76, 50, 5],
  [75, 4, 4],
  [3, 54, -5],
  [26, 6, 3],
  [51, 54, -4],
];
export const PN: Array<[number, number, number]> = [
  [2, 2, -5],
  [52, 5, 4],
  [4, 22, -3],
  [50, 32, 5],
  [2, 46, 4],
  [52, 57, -5],
  [4, 70, 3],
  [50, 80, -4],
];

/** Searchable vault items for the Find step: [ITEMS index, title, subtitle] */
export const IT: Array<[number, string, string]> = [
  [0, "Northwind", "aisha.rahman@mail.com"],
  [0, "Netflix", "aisha.rahman@mail.com"],
  [0, "Commonwealth Bank", "aisha.rahman"],
  [1, "Visa ending 4417", "Aisha Rahman"],
  [1, "Amex Qantas", "Expires 03/29"],
  [2, "Home address", "14 Park Rd, Hurstville"],
  [2, "Passport", "Aisha Rahman"],
  [3, "Home-5G", "WPA3"],
  [3, "Office guest", "WPA2"],
  [4, "Door alarm", "Code and spare key"],
  [4, "Shed lockbox", "PIN"],
  [5, "Northwind passkey", "Fingerprint"],
];
export const CH = ["All", "Logins", "Cards", "IDs", "Wi-Fi", "Notes", "Passkeys"];

export const nz = (x: string) => x.toLowerCase().replace(/[^a-z0-9]/g, "");
