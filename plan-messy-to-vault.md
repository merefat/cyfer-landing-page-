# Plan: Replace "What You Can Store" Section with the "Messy Notes → Vault" Interactive Demo

## Goal
Replace the current hub-and-spoke card grid (left cards / shield hub / right cards) in
`components/home/ElevenItemTypes.tsx` with a React/Next.js port of the reference file
`Cyfer – From messy notes to a vault.html` — a self-playing 3-step demo:

1. **Messy notes** — sticky notes scattered over a "desk" surface, vault empty.
2. **Store & fill** — pick an item type; it saves into the vault, then autofills a mock website.
3. **Find it** — live search inside the vault with filter chips, result detail, copy-to-clipboard.

Per user decisions: **full auto-play port**, **real per-item screenshots** in the center vault
panel, and it ships on **both** `/` (home) and `/product/vault`.

## Design translation (reference → site)

| Reference | This site |
|---|---|
| `--navy:#0f1d3d`, `--teal:#1fb8cd`, `--amber:#f4a21f` | `#17283b`, `#1fbbd2`, `#f39c12` (existing tokens) |
| Sora body + Caveat sticky notes | Sora already loaded; add `Caveat` via `next/font/google` in `app/layout.tsx` for the handwritten notes (builds already work with next/font + the NODE_OPTIONS fix in AGENTS.md) |
| Light/dark via CSS vars | Site `dark:` Tailwind variants; surfaces `white`/`#0c1826`, page `#111e2d` |
| Plain HTML/CSS | React + `motion/react` (already used in this file), `lucide-react` icons |

Header: keep the existing badge + "Purpose-built for your daily life. / Never cram info into
messy notes." title. Update the lead line toward the reference copy ("Watch Cyfer take a pile of
scribbles, fill your logins for you, then find anything in a few keystrokes — it plays by itself,
or take over any time."). Keep the gradient divider + bottom `/product/vault` link pill.

## Real images used in the center "vault" panel

| Demo state | Image (already in `public/images/`) |
|---|---|
| Messy / empty vault | `cyfer-dashboard.png` — literally shows "Your vault is empty" |
| Find-it step | `cyfer-dashboard.png` — real search bar; coded results overlay sits under it |
| Login | `new-login-modal.png` |
| Payment card | `new-card-modal.png` |
| Identity | `new-identity-modal.png` (or `new-identity-modal-middle.png`) |
| Wi-Fi | `new-wifi-modal.png` |
| Secure note | `new-secure-note-modal.png` |
| Passkey | `cyfer-dashboard.png` — its getting-started card contains the real "Add a passkey" row (no passkey modal screenshot exists) |

The images are tall app-window shots (~740–860 × ~780–880 px). The center panel is an
overflow-hidden app-window frame (traffic dots + "Cyfer vault" title bar + status chip). During
"Saving…" the screenshot pans vertically (`translateY`) to reveal fields; status flips to
"Saved and encrypted". `next/image` with `fill` + `object-cover` + transform on a wrapper.

The **right "site sheet" stays code-built** — it simulates third-party sites (login form,
checkout, shipping form, Wi-Fi join, passkey prompt, item detail) so the typing/autofill
choreography from the reference is preserved there.

## File changes

### 1. NEW `components/home/MessyToVaultDemo.tsx` (~700–800 lines)
Ports the reference markup, data, and state machine:

- **Data ported verbatim**: `S` (6 items with icon, accent, typed fields, target-site
  definition), `NOTES` (8 sticky-note texts), `IT` (12 searchable items), `CH` (filter chips),
  desktop/mobile note positions.
- **`StepRail`** — 3 buttons, animated top underline (motion `layoutId`), step numbers cyan,
  `aria-pressed`.
- **`NotesPile`** — 8 absolutely-positioned sticky notes (amber / cyan / lined-white variants,
  tape strip, Caveat font, `--r` rotation). In `org`/`find` mode they animate
  `translate(dx,dy) scale(.15)` toward the vault center, computed from live rects like the
  reference (`getBoundingClientRect` of pile vs panel, recalc on resize).
- **`ItemDock`** — left column of 6 buttons; active = white surface + 4px accent left-bar +
  revealed description. Becomes a horizontal scroll row < 900px (port reference media query).
- **`VaultPanel`** — center app-window frame wrapping the real screenshots; modes:
  - `messy` → dashboard image + "Nothing stored yet" caption chip.
  - `org` → per-item modal image with pan + status text ("Saving…" → "Saved and encrypted").
    Small coded overlay only where the reference needs it (e.g. TOTP countdown ring chip on the
    login item).
  - `find` → dashboard image + coded search field / chips / results overlay anchored under the
    screenshot's search bar; `mark` highlighting, "N of 12 items" status.
- **`SiteSheet`** — right tilted "paper" card (rotate −0.6°, hard offset shadow in the active
  accent): URL bar, heading, labelled inputs that get typed + focused, pressable button,
  sliding success overlay ("✓ Signed in" etc.), fingerprint circle + pulse for passkey,
  idle/empty states per mode.
- **`useVaultDemo` orchestration** — direct port of the reference's async flow:
  generation token `T` to cancel stale chains, `sleep(ms, t)`, `type(el, txt, masked, t)`
  type-writer, `pick(i)` → notes fly in → type fields → autofill sheet → advance to next item →
  `findDemo()` (types "wifi"/"door"/"visa", selects, copy flash) → loop back to `messy`.
  `userTook()` pauses auto-play for 9 s after any click; `prefers-reduced-motion` collapses all
  sleeps to ~10 ms. Implemented with `useRef`s + async functions, timers cleaned in
  `useEffect` unmount.
- **Replay button** ("Replay autofill" / "Replay search"), hidden in messy mode — same as ref.
- **Dark mode + responsive + a11y**: `aria-live` on the vault panel, `aria-pressed`/`aria-current`
  states, focus-visible rings, `MotionConfig reducedMotion="user"` (already wraps the section),
  grid collapses to single column < 900 px.

### 2. EDIT `components/home/ElevenItemTypes.tsx`
- Replace the "3-Column Hub-and-Spoke Grid" block (`leftItems`/`rightItems` columns +
  `VaultShieldHub`) with `<MessyToVaultDemo />`.
- Keep: header block, bottom `/product/vault` link pill, and the entire
  `includeInteractiveDemos` block (Sort-My-Vault button + Smart & Secure cards) — needed by
  `/product/vault`.
- Keep `hideHeader` behaviour (vault page passes it).
- Delete now-dead code: `VaultHubCard`, `VaultShieldHub`, `ItemDef`, item arrays, accent
  objects, `expandedId`/`hoveredId` state, unused lucide imports.

### 3. EDIT `app/layout.tsx`
- Add `Caveat` (`weights: ["500","600"]`, `variable: "--font-caveat"`) alongside Sora for the
  sticky notes. Fallback: Sora italic if the font download is a problem (AGENTS.md documents the
  NODE_OPTIONS fix that makes Google Fonts fetch work here).

### 4. EDIT `app/globals.css` (small additions only if needed)
- Dotted-desk background utility for the stage (`radial-gradient` dots — port `.stage` rule),
  TOTP `cd` ring keyframe, note-tape pseudo styling — most styles stay as Tailwind classes in
  the component; CSS file only gets what can't be expressed inline cleanly.

## Build & verify (per AGENTS.md gotchas)
```
NODE_OPTIONS="--no-network-family-autoselection --dns-result-order=ipv4first" \
NODE_PATH="C:\Users\refat\OneDrive\Desktop\cyfer landing page\node_modules" \
npm run build
npm run start -- -p 5000
```
Check: homepage section auto-plays messy → 6 items → find → loop; clicking rail/dock/notes
pauses auto-play; dark mode contrast; mobile layout < 900 px; `/product/vault` still renders
header-less demo + interactive extras; no `2>nul` artifacts; reduced-motion honoured.

## Notes / trade-offs
- The screenshot the user pasted is of the *current* section, so it isn't usable as vault
  imagery — the real app screenshots in `public/images/` are used instead (matching the chosen
  "per-item modal shots" option).
- Type-writer effect can't happen *inside* a static screenshot, so "saving" is conveyed via the
  pan + status chip, and all live typing stays in the code-built site sheet / search overlay —
  this preserves the reference's storytelling while using real product UI for the vault itself.
- Roughly: 1 new component file, 2 small edits, reuse of 7 existing images. No new deps beyond
  the Caveat font (via next/font, no package install).
