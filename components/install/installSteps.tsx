export const STEP_NAMES = [
  "Basics",
  "Server",
  "Connect",
  "Domain",
  "HTTPS",
  "Keys",
  "Start",
  "Check",
  "Safe",
] as const;

export const SAFETY_CHECKLIST = [
  "Database backup is scheduled (the cyfer-db volume holds all your data)",
  "CYFER_SERVER_KEY is saved in your vault's Emergency Kit — never change it",
  "Your domain auto-renews so the address never expires",
  "The server installs security updates automatically",
] as const;

export const TROUBLESHOOTING: { q: string; a: string }[] = [
  {
    q: "The website won't open at all",
    a: "Usually DNS. Re-run 'Check my domain' in the Domain step — it must say 'Points to your server'. If it does, wait a few more minutes and try https:// your domain in a private window.",
  },
  {
    q: "I see a certificate / 'not secure' warning",
    a: "Caddy could not get the HTTPS certificate. Almost always: ports 80 and 443 are closed (open them in your provider's firewall panel too, not just ufw), or the domain does not point to this server yet.",
  },
  {
    q: "It says 'docker: command not found' or 'permission denied'",
    a: "Install finished but your session needs a refresh — type exit, connect again with ssh, and retry. If you are not logged in as root, put sudo in front of docker commands.",
  },
  {
    q: "I can't paste into the terminal window",
    a: "Use right-click, or Ctrl+Shift+V (not Ctrl+V). On Windows Terminal, Ctrl+V works if you enable it in Settings.",
  },
  {
    q: "docker compose says the .env file or variables are missing",
    a: "The .env file must sit in the same folder as compose.yaml. Run cat .env — you should see 4 lines. If not, redo the Keys step inside the cyfer folder.",
  },
  {
    q: "The health check answers but the page is blank or errors",
    a: "Give it a minute — the first start runs database setup. Watch progress with: docker compose logs -f (press Ctrl+C to stop watching).",
  },
];
