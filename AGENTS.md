# Project Notes

## Environment gotchas (Windows + OneDrive)

- **Never use `2>nul` in Git Bash** — it creates a real file named `nul` (reserved
  Windows device name) in the project root, which crashes Tailwind/Turbopack's
  project scan and breaks webpack asset emit. Use `2>/dev/null` in bash.
- **Node.js IPv6 stall**: `fetch`/`undici` happy-eyeballs hangs on this network
  (e.g. `next/font` Google Fonts downloads → ETIMEDOUT, build/dev failures).
  Fix: `NODE_OPTIONS="--no-network-family-autoselection --dns-result-order=ipv4first"`.
- **OneDrive dehydrates `.next` mid-build** (Files On-Demand removes local copies
  while webpack is emitting → ENOENT on manifests). `next.config.mjs` therefore
  sets `distDir` to `../../../AppData/Local/cyfer-next-build`; `tsconfig.json`
  excludes that dir from typechecking (generated `validator.ts` can't resolve
  `next/types.js` outside the project).
- **`NODE_PATH` required because distDir is outside the project**: without it,
  `next build` fails at "Collecting page data" with
  `Cannot find module 'react/jsx-runtime'` (Node resolves `node_modules` by
  walking up from the distDir, not the project). Set
  `NODE_PATH="C:\\Users\\refat\\OneDrive\\Desktop\\cyfer landing page\\node_modules"`
  for both `npm run build` and `npm run start`.

## Running

- `npm run build` (with the NODE_OPTIONS fix above), then `npm run start -- -p 5000`.
- Public preview: `cloudflared tunnel --url http://localhost:5000 --no-autoupdate`
  gives a temporary `*.trycloudflare.com` URL (changes each run; named tunnel
  requires `cloudflared login` + a Cloudflare account).
