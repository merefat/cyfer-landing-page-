"use client";

import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  CheckCircle2,
  Download,
  KeyRound,
  RefreshCw,
  TriangleAlert,
} from "lucide-react";
import { CodeBlock } from "./CodeBlock";
import { WhereToRun, Hint } from "./WhereToRun";
import { DnsChecker } from "./DnsChecker";
import { STEP_NAMES, SAFETY_CHECKLIST } from "./installSteps";

const DOMAIN_RE = /^[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)+$/i;
const IP_RE = /^\d{1,3}(\.\d{1,3}){3}$/;

function b64(n: number) {
  const b = crypto.getRandomValues(new Uint8Array(n));
  let s = "";
  b.forEach((x) => (s += String.fromCharCode(x)));
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}

function hex(n: number) {
  return Array.from(crypto.getRandomValues(new Uint8Array(n)))
    .map((x) => x.toString(16).padStart(2, "0"))
    .join("");
}

const TXT = "text-[#17283b]/85 dark:text-white/80";
const MUT = "text-[#17283b]/70 dark:text-white/60";

function SeeBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-4 rounded-xl border border-emerald-600/40 bg-emerald-500/[0.08] px-4 py-3">
      <div className="text-[10px] font-bold tracking-[0.14em] text-emerald-700 dark:text-emerald-400 mb-1.5">
        YOU SHOULD SEE
      </div>
      <div className="font-mono text-[12px] leading-relaxed text-[#17283b] dark:text-white/85 whitespace-pre-wrap">
        {children}
      </div>
    </div>
  );
}

function FixBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-3 rounded-xl border border-[#f39c12]/45 bg-[#f39c12]/[0.09] px-4 py-3">
      <div className="text-[10px] font-bold tracking-[0.14em] text-[#a36207] dark:text-[#f39c12] mb-1">
        IF IT DIDN&apos;T WORK
      </div>
      <div className={`text-[12.5px] leading-relaxed ${TXT}`}>{children}</div>
    </div>
  );
}

function WarnBox({ children }: { children: React.ReactNode }) {
  return (
    <div className="mt-4 rounded-xl border border-red-500/45 bg-red-500/[0.07] px-4 py-3 flex items-start gap-2.5">
      <TriangleAlert className="h-4 w-4 mt-0.5 shrink-0 text-red-600 dark:text-red-400" />
      <div className={`text-[12.5px] leading-relaxed ${TXT}`}>{children}</div>
    </div>
  );
}

function P({ children }: { children: React.ReactNode }) {
  return <p className={`text-[13.5px] leading-relaxed ${TXT} mt-3`}>{children}</p>;
}

function SubHead({ children }: { children: React.ReactNode }) {
  return (
    <h4 className="text-[13px] font-bold text-[#17283b] dark:text-white mt-5 first:mt-0">
      {children}
    </h4>
  );
}

export default function InstallGuide() {
  const [step, setStep] = useState(0);
  const [done, setDone] = useState<Set<number>>(new Set());
  const [domain, setDomain] = useState("");
  const [ip, setIp] = useState("");
  const [key1, setKey1] = useState("");
  const [key2, setKey2] = useState("");
  const [checked, setChecked] = useState<Set<number>>(new Set());
  const [adv, setAdv] = useState<"docker" | "nodocker">("docker");


  const validDomain = DOMAIN_RE.test(domain.trim());
  const validIp = IP_RE.test(ip.trim());
  const d = domain.trim() || "vault.example.com";
  const ipD = ip.trim() || "SERVER-IP";
  const parts = domain.trim().split(".");
  const sub = parts.length > 2 ? parts.slice(0, -2).join(".") : "@";
  const total = STEP_NAMES.length;
  const keysReady = key1.length > 0;

  useEffect(() => {
    const m = window.location.hash.match(/step-(\d+)/);
    if (m) {
      const n = Math.min(Math.max(parseInt(m[1], 10), 1), total);
      setStep(n - 1);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const go = (n: number) => {
    const next = Math.min(Math.max(n, 0), total - 1);
    setStep(next);
    window.history.replaceState(null, "", `#step-${next + 1}`);
  };

  const next = () => {
    setDone((s) => new Set(s).add(step));
    go(step + 1);
  };

  const genKeys = () => {
    setKey1(b64(32));
    setKey2(hex(24));
  };

  const envText = `CYFER_SERVER_KEY=${key1 || "your-server-key"}
POSTGRES_PASSWORD=${key2 || "your-database-password"}
CYFER_DOMAIN=${d}
CYFER_TRUSTED_PROXY_HOPS=1`;

  const envCmd = `mkdir -p cyfer && cd cyfer
cat > .env <<'EOF'
${envText}
EOF`;

  const composeCmd = `cat > compose.yaml <<'EOF'
services:
  app:
    image: ghcr.io/clickbitau/cyfer:latest
    restart: unless-stopped
    ports:
      - "127.0.0.1:3000:3000"
    env_file: .env
    environment:
      DATABASE_URL: postgresql://cyfer:\${POSTGRES_PASSWORD}@db:5432/cyfer
      NEXT_PUBLIC_APP_URL: https://\${CYFER_DOMAIN}
      RP_ID: \${CYFER_DOMAIN}
    depends_on:
      - db
  db:
    image: postgres:16-alpine
    restart: unless-stopped
    environment:
      POSTGRES_USER: cyfer
      POSTGRES_PASSWORD: \${POSTGRES_PASSWORD}
      POSTGRES_DB: cyfer
    volumes:
      - cyfer-db:/var/lib/postgresql/data
volumes:
  cyfer-db:
EOF
docker compose up -d`;

  const caddyfile = `${d} {
    reverse_proxy localhost:3000
}`;

  const downloadEnv = () => {
    const blob = new Blob([envText + "\n"], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = ".env";
    a.click();
    URL.revokeObjectURL(a.href);
  };

  const renderStep = () => {
    switch (step) {
      case 0:
        return (
          <div>
            <P>
              Installing Cyfer means typing commands — but <b>not on your own
              computer</b>. You work in two places, and every instruction is
              labelled with the place it belongs in.
            </P>
            <WhereToRun />
            <P>
              No &quot;Run as administrator&quot; needed on your PC — on the
              server you are already{" "}
              <Hint word="root" tip="The administrator account on a Linux server. Commands just work." />.
            </P>
            <SubHead>Before you start, you need</SubHead>
            <div className="mt-3 grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {[
                ["A Linux server", "Or ~$5/month to rent one — next step."],
                ["A domain name", "Or ~$10/year to buy one — step 4."],
                ["About 20 minutes", "Plus waiting time for the domain."],
              ].map(([t, s]) => (
                <div
                  key={t}
                  className="rounded-lg border border-[#17283b]/15 dark:border-white/[0.12] bg-white/70 dark:bg-white/[0.05] px-3.5 py-3"
                >
                  <div className="text-[12.5px] font-bold text-[#17283b] dark:text-white">{t}</div>
                  <div className={`text-[11.5px] ${MUT} mt-1 leading-relaxed`}>{s}</div>
                </div>
              ))}
            </div>
          </div>
        );

      case 1:
        return (
          <div>
            <P>
              A <Hint word="server" tip="Also called a VPS — a slice of a big computer in a data centre that you rent." /> is
              a small always-on computer you rent (~$5/month). It runs Cyfer so
              your vault works even when your laptop is off.
            </P>
            <P>
              Sign up with any <Hint word="VPS provider" tip="Companies that rent servers — e.g. Hetzner, DigitalOcean, Vultr, OVH, Linode." /> and
              create a server with:
            </P>
            <ul className="mt-3 space-y-2">
              {[
                ["Operating system", "Ubuntu 24.04 LTS"],
                ["Size", "Smallest plan — 1 GB works, 2 GB comfortable"],
                ["Region", "Closest to you"],
                ["Login", "Root password (easiest) or SSH key"],
              ].map(([t, s]) => (
                <li key={t} className={`flex items-start gap-2.5 text-[13px] leading-relaxed ${TXT}`}>
                  <CheckCircle2 className="h-4 w-4 mt-0.5 shrink-0 text-[#0d8294] dark:text-[#1fbbd2]" />
                  <span><b className="text-[#17283b] dark:text-white">{t}:</b> {s}</span>
                </li>
              ))}
            </ul>
            <P>
              After ~1 minute the dashboard shows a <b>public IP</b> like{" "}
              <code className="font-mono text-[12px] bg-[#17283b]/[0.09] dark:bg-white/[0.12] px-1 rounded">203.0.113.10</code>{" "}
              (also in the welcome email). <b>Type it into the
              &quot;Server IP&quot; box above</b> — every command fills itself
              in.
            </P>
            <FixBox>
              Can&apos;t find the IP? Look for &quot;Servers&quot;,
              &quot;Droplets&quot; or &quot;Instances&quot; in the provider
              dashboard.
            </FixBox>
          </div>
        );

      case 2:
        return (
          <div>
            <SubHead>Open a terminal on your computer</SubHead>
            <ul className="mt-3 space-y-2">
              {[
                ["Windows", "Windows key → type Terminal → Enter"],
                ["Mac", "Cmd + Space → type Terminal → Enter"],
                ["Linux", "Your usual terminal app"],
              ].map(([t, s]) => (
                <li key={t} className={`flex items-start gap-2.5 text-[13px] leading-relaxed ${TXT}`}>
                  <span className="shrink-0 mt-0.5 px-1.5 py-0.5 rounded bg-[#17283b]/[0.09] dark:bg-white/[0.12] text-[10.5px] font-bold text-[#17283b] dark:text-white">{t}</span>
                  <span>{s}</span>
                </li>
              ))}
            </ul>
            <P>
              Paste this line and press Enter —{" "}
              <Hint word="SSH" tip="Secure Shell — the standard, encrypted way to control a remote computer by typing." /> opens
              a remote control session:
            </P>
            <CodeBlock
              where="pc"
              label="in the terminal you just opened"
              code={`ssh root@${ipD}`}
            />
            <SeeBox>
{`Are you sure you want to continue connecting (yes/no)?  ->  yes
root@${ipD}'s password:   <- type it (you won't see it!) + Enter

root@vault:~#   <- you're in! Everything now happens ON THE SERVER.`}
            </SeeBox>
            <WarnBox>
              <b>Typing the password shows nothing — not even dots.</b> Type it
              (or right-click to paste) and press Enter.
            </WarnBox>
            <FixBox>
              &quot;Permission denied&quot; → wrong password, try again.
              &quot;Timed out&quot; → server still starting, wait a minute.
            </FixBox>
            <SubHead>Install Docker on the server</SubHead>
            <P>
              <Hint word="Docker" tip="Runs apps in ready-made boxes so Cyfer installs the same way on every server." /> runs
              Cyfer. Paste into the <b>same SSH window</b> (the one showing{" "}
              <code className="font-mono text-[12px] bg-[#17283b]/[0.09] dark:bg-white/[0.12] px-1 rounded">root@...:~#</code>):
            </P>
            <CodeBlock
              where="server"
              code={`curl -fsSL https://get.docker.com | sh
docker --version`}
            />
            <SeeBox>{`Docker version 27.x.x, build ...`}</SeeBox>
            <FixBox>
              &quot;command not found&quot; → type{" "}
              <code className="font-mono text-[12px]">exit</code>, ssh in again,
              retry. Not root → add{" "}
              <code className="font-mono text-[12px]">sudo</code> in front.
            </FixBox>
          </div>
        );

      case 3:
        return (
          <div>
            <P>
              A <Hint word="domain" tip="The name people type to reach a website — rented from a registrar for ~$10/year." /> is
              your vault&apos;s address instead of the IP numbers. Buy any name
              from a <Hint word="registrar" tip="A company that sells domain names — Namecheap, Cloudflare, Porkbun, GoDaddy…" /> —
              a <Hint word="subdomain" tip="A prefix on your domain, like vault.example.com. Keeps the main domain free." /> like{" "}
              <code className="font-mono text-[12px] bg-[#17283b]/[0.09] dark:bg-white/[0.12] px-1 rounded">vault.example.com</code>{" "}
              is the usual choice. Type it in the box above.
            </P>
            <WarnBox>
              Pick the domain once and <b>don&apos;t change it later</b> —
              passkeys are locked to the exact address.
            </WarnBox>
            <SubHead>Point it at your server</SubHead>
            <P>
              On <b>your registrar&apos;s website</b> (not the server), open the
              domain&apos;s <b>DNS settings</b> and add a record:
            </P>
            <div className="mt-3 overflow-x-auto rounded-xl border border-[#17283b]/15 dark:border-white/[0.12]">
              <table className="w-full text-[12.5px]">
                <thead>
                  <tr className="bg-[#17283b]/[0.07] dark:bg-white/[0.08] text-left">
                    <th className="px-3.5 py-2 font-bold text-[#17283b] dark:text-white">Field</th>
                    <th className="px-3.5 py-2 font-bold text-[#17283b] dark:text-white">What to enter</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#17283b]/[0.1] dark:divide-white/[0.1]">
                  {[
                    ["Type", "A"],
                    ["Name / Host", sub === "@" ? "@ (the domain itself)" : `${sub}  (forms ${d})`],
                    ["Value / Points to", ipD],
                    ["TTL", "Automatic or 300"],
                  ].map(([k, v]) => (
                    <tr key={k}>
                      <td className={`px-3.5 py-2 font-semibold ${TXT}`}>{k}</td>
                      <td className="px-3.5 py-2 font-mono text-[12px] font-semibold text-[#0a6b7a] dark:text-[#1fbbd2]">{v}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <P>
              That <Hint word="A record" tip="The simplest DNS record: 'this name lives at this IP address'. Nothing more." /> is
              a signpost — <i>name → server</i>. It can take minutes to a few
              hours to go live.
            </P>
            <SubHead>Check it worked</SubHead>
            <DnsChecker domain={domain.trim()} ip={ip.trim()} validDomain={validDomain} />
            {!validIp && (
              <p className={`mt-2 text-[11.5px] font-semibold ${MUT}`}>
                Tip: fill the &quot;Server IP&quot; box above so the checker
                confirms it points to <i>your</i> server.
              </p>
            )}
          </div>
        );

      case 4:
        return (
          <div>
            <P>
              HTTPS (the padlock) is <b>required</b> — passkeys refuse to work
              without it. <Hint word="Caddy" tip="A small web server that gets and renews the HTTPS certificate automatically. Configure once, forget it." /> does
              it for free. Everything here goes in the <b>SSH window</b>.
            </P>
            <SubHead>1 · Open ports 80 and 443</SubHead>
            <CodeBlock where="server" code={`sudo ufw allow 80,443/tcp`} />
            <FixBox>
              Provider dashboards often have their own &quot;Firewall&quot;
              page — allow TCP 80 + 443 there too.
            </FixBox>
            <SubHead>2 · Install Caddy</SubHead>
            <CodeBlock where="server" code={`sudo apt update && sudo apt install -y caddy`} />
            <SubHead>3 · Tell Caddy your domain</SubHead>
            <P>Open the config file:</P>
            <CodeBlock where="server" code={`sudo nano /etc/caddy/Caddyfile`} />
            <P>Delete everything inside, paste this (your domain is already in):</P>
            <CodeBlock where="file" label="/etc/caddy/Caddyfile" code={caddyfile} />
            <P>
              Save: <b>Ctrl+O</b>, <b>Enter</b>, then <b>Ctrl+X</b>. Meaning:{" "}
              <i>&quot;visitors to {d} → the app on port 3000, with automatic
              HTTPS.&quot;</i>
            </P>
            <SubHead>4 · Apply</SubHead>
            <CodeBlock
              where="server"
              code={`sudo systemctl reload caddy
systemctl is-active caddy`}
            />
            <SeeBox>{`active`}</SeeBox>
            <FixBox>
              A certificate error later = domain not pointing here yet, or ports
              still closed.
            </FixBox>
          </div>
        );

      case 5:
        return (
          <div>
            <P>
              Cyfer needs three settings in a file called{" "}
              <code className="font-mono text-[12px] bg-[#17283b]/[0.09] dark:bg-white/[0.12] px-1 rounded">.env</code>:
            </P>
            <ul className="mt-3 space-y-2">
              {[
                ["CYFER_SERVER_KEY", "locks everyone's two-factor codes — keep forever"],
                ["POSTGRES_PASSWORD", "password for the database"],
                ["CYFER_DOMAIN", "your vault's address"],
              ].map(([k, s]) => (
                <li key={k} className={`flex items-start gap-2.5 text-[13px] leading-relaxed ${TXT}`}>
                  <KeyRound className="h-4 w-4 mt-0.5 shrink-0 text-[#b8770a] dark:text-[#f39c12]" />
                  <span><code className="font-mono text-[12px] font-semibold text-[#17283b] dark:text-white">{k}</code> — {s}</span>
                </li>
              ))}
            </ul>
            <SubHead>1 · Generate the secrets</SubHead>
            <P>
              Made <b>in this browser</b> — nothing is sent anywhere.
            </P>
            <div className="mt-3 flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={genKeys}
                className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-[12.5px] font-bold bg-[#1fbbd2] text-[#0b2434] hover:bg-[#35cbdf] transition-colors"
              >
                {keysReady ? <RefreshCw className="h-4 w-4" /> : <KeyRound className="h-4 w-4" />}
                {keysReady ? "Generate new keys" : "Generate my keys"}
              </button>
              <button
                type="button"
                onClick={downloadEnv}
                disabled={!keysReady}
                className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-[12.5px] font-bold border border-[#17283b]/25 dark:border-white/[0.2] text-[#17283b] dark:text-white hover:bg-[#17283b]/[0.06] dark:hover:bg-white/[0.08] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Download className="h-4 w-4" />
                Download .env
              </button>
              {keysReady && (
                <span className="text-[11.5px] font-bold text-emerald-700 dark:text-emerald-400">
                  Keys ready — block below is filled in.
                </span>
              )}
            </div>
            <SubHead>2 · Create the file on the server</SubHead>
            <P>
              Paste this whole block into the <b>SSH window</b> — it makes a{" "}
              <code className="font-mono text-[12px] bg-[#17283b]/[0.09] dark:bg-white/[0.12] px-1 rounded">cyfer</code>{" "}
              folder and writes the file:
            </P>
            <CodeBlock where="server" label="paste the whole block" code={envCmd} />
            {!keysReady && (
              <p className="mt-2 text-[11.5px] font-bold text-[#a36207] dark:text-[#f39c12]">
                Press &quot;Generate my keys&quot; first — the block still has
                placeholders.
              </p>
            )}
            <P>
              Or use the downloaded file: run the{" "}
              <code className="font-mono text-[12px]">mkdir -p cyfer && cd cyfer</code>{" "}
              part on the server, then from <b>your computer</b>:
            </P>
            <CodeBlock
              where="pc"
              label="where you downloaded .env"
              code={`scp .env root@${ipD}:~/cyfer/.env`}
            />
            <SeeBox>
{`cat .env  ->  your 4 lines:
CYFER_SERVER_KEY=•••
POSTGRES_PASSWORD=•••
CYFER_DOMAIN=${d}
CYFER_TRUSTED_PROXY_HOPS=1`}
            </SeeBox>
            <WarnBox>
              <b>Back up CYFER_SERVER_KEY together with the database.</b>{" "}
              Restoring one without the other breaks all two-factor codes.
            </WarnBox>
          </div>
        );

      case 6:
        return (
          <div>
            <P>
              <Hint word="Docker Compose" tip="Reads one recipe file and runs everything in it — here: the Cyfer app plus its database, with data stored in a persistent volume." /> runs
              the app <i>and</i> the database from one recipe file. Still in the{" "}
              <code className="font-mono text-[12px] bg-[#17283b]/[0.09] dark:bg-white/[0.12] px-1 rounded">cyfer</code>{" "}
              folder, paste this whole block — it writes the recipe and starts
              everything:
            </P>
            <CodeBlock where="server" label="paste the whole block" code={composeCmd} />
            <p className={`mt-2 text-[11.5px] font-semibold ${MUT}`}>
              Reference template for Cyfer&apos;s Docker image — if a compose
              file ships with your download, use that instead.
            </p>
            <SeeBox>
{`[+] Running 3/3
 ✔ Network cyfer_default  Created
 ✔ Container cyfer-db-1   Started
 ✔ Container cyfer-app-1  Started`}
            </SeeBox>
            <P>First start takes ~1 minute. Check any time:</P>
            <CodeBlock where="server" code={`docker compose ps`} />
            <SeeBox>
{`NAME           STATUS
cyfer-app-1    running
cyfer-db-1     running`}
            </SeeBox>
            <details className="mt-4 rounded-xl border border-[#17283b]/15 dark:border-white/[0.12] bg-white/70 dark:bg-white/[0.04] px-4 py-3">
              <summary className="cursor-pointer text-[12.5px] font-bold text-[#17283b] dark:text-white/80">
                Advanced: build from source, or run without Docker
              </summary>
              <div className="mt-3 flex gap-2">
                {(
                  [
                    ["docker", "Build from source"],
                    ["nodocker", "No Docker"],
                  ] as const
                ).map(([k, l]) => (
                  <button
                    key={k}
                    type="button"
                    onClick={() => setAdv(k)}
                    className={`px-3 py-1.5 rounded-md text-[11.5px] font-bold border transition-colors ${
                      adv === k
                        ? "bg-[#17283b] dark:bg-white/[0.15] text-white border-[#17283b] dark:border-white/[0.25]"
                        : "border-[#17283b]/20 dark:border-white/[0.2] text-[#17283b]/75 dark:text-white/60 hover:bg-[#17283b]/[0.06]"
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
              {adv === "docker" ? (
                <div>
                  <CodeBlock
                    where="server"
                    label="from a clone of the Cyfer repository"
                    code={`docker build --build-arg CYFER_SERVER=https://${d} -t cyfer-app .
docker run -d -p 127.0.0.1:3000:3000 --env-file .env cyfer-app`}
                  />
                  <p className="mt-2 text-[11.5px] leading-relaxed font-semibold text-[#a36207] dark:text-[#f39c12]">
                    Runs the app alone — you still need PostgreSQL and a
                    DATABASE_URL in .env. Compose above provides both.
                  </p>
                </div>
              ) : (
                <div>
                  <CodeBlock
                    where="server"
                    label="for developers — from a clone of the Cyfer repository"
                    code={`npm ci
npm run build
npm run start`}
                  />
                  <p className={`mt-2 text-[11.5px] leading-relaxed font-semibold ${MUT}`}>
                    Needs Node.js 20+, PostgreSQL, and DATABASE_URL,
                    CYFER_SERVER_KEY, NEXT_PUBLIC_APP_URL, RP_ID in .env. The
                    app listens on port 3000 — the Caddyfile already points
                    there.
                  </p>
                </div>
              )}
            </details>
          </div>
        );

      case 7:
        return (
          <div>
            <P>
              From <b>any</b> computer, ask Cyfer&apos;s health check:
            </P>
            <CodeBlock
              where="pc"
              label="any terminal, or paste the URL in a browser"
              code={`curl https://${d}/api/health`}
            />
            <SeeBox>
{`{"status":"ok","db":"up","migration":7,"email":"off"}`}
            </SeeBox>
            <P>
              Then open <b>https://{d}</b>, create the first account, and{" "}
              <b>save the Emergency Kit</b> it offers — the only way back in if
              you forget the master password.
            </P>
            <P>
              When apps or the browser extension ask for a server, enter{" "}
              <b>https://{d}</b>.
            </P>
            <FixBox>
              Blank page? Wait a minute — the first start runs database setup.
              Watch on the server:{" "}
              <code className="font-mono text-[12px]">cd ~/cyfer && docker compose logs -f</code>{" "}
              (Ctrl+C to stop).
            </FixBox>
          </div>
        );

      case 8:
        return (
          <div>
            <P>
              Four habits that keep a self-hosted vault safe — tick each as you
              set it up:
            </P>
            <div className="mt-4 space-y-2.5">
              {SAFETY_CHECKLIST.map((item, i) => {
                const on = checked.has(i);
                return (
                  <button
                    key={i}
                    type="button"
                    onClick={() =>
                      setChecked((s) => {
                        const n = new Set(s);
                        if (n.has(i)) n.delete(i);
                        else n.add(i);
                        return n;
                      })
                    }
                    className={`w-full flex items-start gap-3 rounded-xl border px-4 py-3 text-left transition-colors ${
                      on
                        ? "border-emerald-600/50 bg-emerald-500/[0.08]"
                        : "border-[#17283b]/20 dark:border-white/[0.15] bg-white/70 dark:bg-white/[0.05] hover:border-[#1fbbd2]/60"
                    }`}
                  >
                    <span
                      className={`mt-0.5 shrink-0 rounded border flex items-center justify-center transition-colors ${
                        on
                          ? "bg-emerald-600 border-emerald-600 text-white"
                          : "border-[#17283b]/40 dark:border-white/40 text-transparent"
                      }`}
                      style={{ width: 18, height: 18 }}
                    >
                      <Check className="h-3 w-3" />
                    </span>
                    <span className={`text-[12.5px] leading-relaxed ${TXT}`}>
                      {item}
                    </span>
                  </button>
                );
              })}
            </div>
            {checked.size === SAFETY_CHECKLIST.length && (
              <div className="mt-4 rounded-xl border border-emerald-600/50 bg-emerald-500/[0.1] px-4 py-3.5 text-[13px] font-bold text-emerald-800 dark:text-emerald-400 flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 shrink-0" />
                All set — your vault is yours alone.
              </div>
            )}
            <P>
              <b>Update later:</b>{" "}
              <code className="font-mono text-[12px] bg-[#17283b]/[0.09] dark:bg-white/[0.12] px-1 rounded">cd ~/cyfer && docker compose pull && docker compose up -d</code>{" "}
              — your data stays untouched.
            </P>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div>
      {/* global inputs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-2">
        <label className="block">
          <span className="text-[11px] font-bold tracking-wide text-[#17283b]/80 dark:text-white/70">
            YOUR DOMAIN <span className="font-semibold">(the address you chose or bought)</span>
          </span>
          <input
            type="text"
            value={domain}
            onChange={(e) => setDomain(e.target.value)}
            placeholder="vault.example.com"
            spellCheck={false}
            autoComplete="off"
            className={`mt-1 w-full rounded-xl border px-4 py-3 font-mono text-[13px] bg-white dark:bg-[#0b1220]/70 text-[#17283b] dark:text-white placeholder:text-[#17283b]/45 dark:placeholder:text-white/35 outline-none transition-colors focus:border-[#1fbbd2] ${
              domain && !validDomain
                ? "border-red-500"
                : "border-[#17283b]/25 dark:border-white/[0.2]"
            }`}
          />
          {domain && !validDomain && (
            <span className="text-[11px] font-bold text-red-600 dark:text-red-400 mt-1 block">
              Not a domain — something like vault.example.com
            </span>
          )}
        </label>
        <label className="block">
          <span className="text-[11px] font-bold tracking-wide text-[#17283b]/80 dark:text-white/70">
            SERVER IP <span className="font-semibold">(from your provider&apos;s dashboard)</span>
          </span>
          <input
            type="text"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            placeholder="203.0.113.10"
            spellCheck={false}
            autoComplete="off"
            className={`mt-1 w-full rounded-xl border px-4 py-3 font-mono text-[13px] bg-white dark:bg-[#0b1220]/70 text-[#17283b] dark:text-white placeholder:text-[#17283b]/45 dark:placeholder:text-white/35 outline-none transition-colors focus:border-[#1fbbd2] ${
              ip && !validIp
                ? "border-red-500"
                : "border-[#17283b]/25 dark:border-white/[0.2]"
            }`}
          />
          {ip && !validIp && (
            <span className="text-[11px] font-bold text-red-600 dark:text-red-400 mt-1 block">
              An IP is four numbers with dots, like 203.0.113.10
            </span>
          )}
        </label>
      </div>
      <p className={`text-[12px] font-semibold ${MUT} mb-6`}>
        Fill these in once — every command below writes itself. Nothing leaves
        this page.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-[210px_minmax(0,1fr)] gap-6">
        {/* rail */}
        <nav aria-label="Install steps" className="lg:sticky lg:top-24 self-start min-w-0">
          <div className="hidden lg:block mb-4">
            <div className="h-1.5 rounded-full bg-[#17283b]/[0.12] dark:bg-white/[0.12] overflow-hidden">
              <div
                className="h-full rounded-full bg-[#1fbbd2] transition-all duration-500"
                style={{ width: `${(done.size / total) * 100}%` }}
              />
            </div>
            <div className={`mt-1.5 text-[11px] font-bold ${MUT}`}>
              {done.size} of {total} done
            </div>
          </div>
          <ol className="flex lg:flex-col gap-1.5 overflow-x-auto pb-1 lg:pb-0">
            {STEP_NAMES.map((name, i) => {
              const active = i === step;
              const finished = done.has(i);
              return (
                <li key={name} className="shrink-0">
                  <button
                    type="button"
                    onClick={() => go(i)}
                    aria-current={active ? "step" : undefined}
                    className={`w-full flex items-center gap-2.5 rounded-lg px-3 py-2 text-left text-[12.5px] font-semibold transition-colors ${
                      active
                        ? "bg-[#17283b] text-white dark:bg-[#1fbbd2] dark:text-[#0b2434]"
                        : "text-[#17283b]/75 dark:text-white/65 hover:bg-[#17283b]/[0.08] dark:hover:bg-white/[0.08]"
                    }`}
                  >
                    <span
                      className={`h-5 w-5 shrink-0 rounded-full border flex items-center justify-center text-[10px] font-bold ${
                        finished
                          ? "bg-emerald-600 border-emerald-600 text-white"
                          : active
                            ? "border-white/60 dark:border-[#0b2434]/60"
                            : "border-[#17283b]/35 dark:border-white/35"
                      }`}
                    >
                      {finished ? <Check className="h-3 w-3" /> : i + 1}
                    </span>
                    {name}
                  </button>
                </li>
              );
            })}
          </ol>
        </nav>

        {/* panel */}
        <div className="min-w-0">
          <div
            id="install-step-panel"
            aria-live="polite"
            className="rounded-2xl border border-[#17283b]/15 dark:border-white/[0.12] bg-white dark:bg-white/[0.04] shadow-sm p-5 sm:p-7 min-h-[300px]"
          >
            <div className="text-[10px] font-bold tracking-[0.18em] text-[#0d8294] dark:text-[#1fbbd2] mb-1">
              STEP {step + 1} OF {total}
            </div>
            <h3 className="text-lg sm:text-xl font-bold text-[#17283b] dark:text-white mb-1">
              {STEP_NAMES[step] === "Basics" && "Before you type anything"}
              {STEP_NAMES[step] === "Server" && "Get a server"}
              {STEP_NAMES[step] === "Connect" && "Connect & install Docker"}
              {STEP_NAMES[step] === "Domain" && "Give it a name"}
              {STEP_NAMES[step] === "HTTPS" && "Turn on the padlock"}
              {STEP_NAMES[step] === "Keys" && "Make the secret keys"}
              {STEP_NAMES[step] === "Start" && "Start Cyfer"}
              {STEP_NAMES[step] === "Check" && "Check it works"}
              {STEP_NAMES[step] === "Safe" && "Keep it safe"}
            </h3>
            {renderStep()}

            <div className="mt-7 pt-5 border-t border-[#17283b]/[0.12] dark:border-white/[0.1] flex items-center justify-between gap-3">
              <button
                type="button"
                onClick={() => go(step - 1)}
                disabled={step === 0}
                className="inline-flex items-center gap-2 rounded-lg px-4 py-2.5 text-[12.5px] font-bold text-[#17283b]/80 dark:text-white/70 border border-[#17283b]/25 dark:border-white/[0.2] hover:bg-[#17283b]/[0.06] dark:hover:bg-white/[0.08] transition-colors disabled:opacity-0 disabled:pointer-events-none"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </button>
              {step < total - 1 ? (
                <button
                  type="button"
                  onClick={next}
                  className="inline-flex items-center gap-2 rounded-lg px-5 py-2.5 text-[12.5px] font-bold bg-[#1fbbd2] text-[#0b2434] hover:bg-[#35cbdf] transition-colors"
                >
                  I did this — next
                  <ArrowRight className="h-4 w-4" />
                </button>
              ) : (
                <span className="text-[12px] font-bold text-emerald-700 dark:text-emerald-400">
                  End of the guide
                </span>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
