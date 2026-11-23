# Comprehensive Analysis: Cyfer Password & Platform Secrets Manager
1. Executive Summary & Identity

  
Name: Cyfer (stylized as cyfer)

  
Developer / Ecosystem: ClickBit Australia (clickbit.com.au)

  
Core Classification: Zero-Knowledge Hybrid Password Manager & Platform Secrets Engine

  
Core Tagline: "Zero-knowledge password manager. The server stores ciphertext only; every key is derived and used in the browser."

  
Architecture Base: Next.js 16 (App Router with Turbopack), React 19, Tailwind CSS 4, PostgreSQL, Web Crypto API, Argon2id WebAssembly (hash-wasm), and Node.js 22+.

  
2. Who It Is For (Target Audience & Personas)

Cyfer is architected to eliminate the traditional divide between consumer password managers (which manage web logins but fail at developer workflows) and cloud KMS / secrets vaults (which manage infrastructure credentials but lack consumer autofill, browser extensions, and mobile apps).

+-------------------------------------------------------------------------------+
|                             CYFER TARGET AUDIENCE                             |
+-------------------+--------------------+--------------------+-----------------+
| SOFTWARE & DEVOPS | STARTUPS & SMBS    | AGENCIES & MSPS    | CONSUMERS &     |
| ENGINEERS         |                    |                    | FAMILIES        |
| * .env variables  | * SOC 2 compliance | * Client silos     | * 100% free     |
| * API & SSH keys  | * Level 2/3 MFA    | * Zero-knowledge   |   self-hosting  |
| * DB profiles     | * Immutable audits |   public links     | * Family shares |
| * CLI deployment  | * Safe offboarding | * Work/Life bounds | * Emergency kit |
+-------------------+--------------------+--------------------+-----------------+

  
Software Engineers, SREs & DevOps Teams:
  
  

  
Need to store, rotate, and deploy .env environment files, SSH private keys, cloud project configurations, and database credentials without exposing them in Git, Slack, or plain text.

  

  
Startups & High-Growth Tech Companies:
  
  

  
Require zero-trust compliance (SOC 2, ISO 27001, HIPAA) with strict authentication policies (enforced passkeys, phishing-resistant biometrics, automated offboarding, and audit streams).

  

  
Agencies, Consultancies & Managed Service Providers (MSPs):
  
  

  
Manage credentials for dozens of external clients and need cryptographic isolation between client environments, coupled with zero-knowledge expiring links to hand off credentials safely.

  

  
Security-Conscious Individuals & Families:
  
  

  
Privacy advocates who refuse proprietary, closed-source password managers that store decryption logic or keys on central cloud infrastructure.

  

  
3. Comprehensive Feature Breakdown
A. 11 Specialized Vault Item Schemas

Rather than forcing all data into generic "Login" or "Secure Note" templates, Cyfer provides 11 purpose-built cryptographic schemas:

Item Type	Core Fields	Specialized Behaviors & Lifecycles
Login	Username, password, URLs, TOTP seed, custom fields, history.	Autofill, automated in-browser password changes, password history tracking.
Secure Note	Markdown title, multi-line encrypted body.	Sensitive documentation, recovery notes, private memos.
Payment Card	Cardholder, brand, number, expiry MM/YYYY, CVV, PIN.	Auto-brand detection, Luhn checksum validation, 60-day expiry warning alerts.
Identity	Names, company, email, phone, street, city, state, postal code, country, licence/ID.	Multi-line browser checkout and shipping form autofill.
Env / Secrets	KEY=value pairs, environment label (prod/staging).	One-click copy as .env, variable masking, file import/export.
API Key	Service name, key ID, private key (.pem/.p8), endpoint URL.	Issued secret lifecycle, length validation, rotation tracking.
SSH Key	Host, username, private key, public key, passphrase.	Generates OpenSSH-compatible SHA-256 key fingerprints.
Database	Engine (Postgres, MySQL, Mongo, Redis, SQL Server, etc.), host, port, credentials.	Generates and parses connection strings across 7 engines.
Wi-Fi Network	SSID, password, security protocol (WPA3, WPA2, WEP).	Validates WPA 8–63 character requirements.
Passkey	RP ID, RP name, username, credential ID, user handle, ECDSA P-256 key (COSE -7).	Functions as a native WebAuthn/FIDO2 hardware-emulated passkey bridge.
Project	Supabase, Firebase, Neon, Vercel bundles (anon keys, service-role keys, JWT secrets, DB passwords).	Grouped under account logins and mapped to specific cloud organizations.
B. Core Application Capabilities

  
Universal Secret History: Every update to a password, card number, or machine token archives the previous value into an encrypted history[] array with ISO timestamps.

  
Network Reach Intelligence: Automatically detects whether a host is on a Local Network (RFC 1918 LAN, .local, intranet) or the Public Internet, adjusting security alert levels accordingly.

  
Smart Vault Automation ("Sort My Vault"): A client-side heuristic engine that:
  
  

  
Tidies messy URLs (e.g., converts https://auth0.openai.com/u/login to OpenAI).

  
Files LAN equipment into Home network.

  
Moves university logins into Education.

  
Archives dead or throwaway temp-mail accounts into Old services.

  
Purges residual server build artifacts into the Trash.

  

  
"Work & Life" Smart Partitioning: Uses email rules and domain patterns to automatically bucket secrets into Personal, Work, Family & Friends, Clients, and Archive.

  
16 Topic Categories: Classifies items by industry and purpose (Banking & Finance, Government, Developer & Hosting, Shopping, Healthcare, Utilities, etc.).

  
Bulk Operations: Multi-select items to batch move, batch tag, favourite, convert types, or trash.

  
Soft-Delete Trash Bin: Retains deleted items for 30 days with one-click restore or permanent purge.

  
C. Security Auditing & 2FA Engine

  
Have I Been Pwned (HIBP) Breach Scanner: Uses client-side k-Anonymity (sending only the first 5 hex characters of the SHA-1 hash) with Add-Padding to prevent response length side-channel leaks.

  
Password Strength Analyzer: Computes entropy, identifies character classes, detects keyboard sequences, and flags dictionary words.

  
Production Exposure Scanner: Alerts when critical production secrets are reused in staging, test, or local environments.

  
Built-in RFC 6238 TOTP Authenticator: Supports SHA1, SHA256, SHA512, custom step intervals, and real-time circular countdown timers.

  
Password & Passphrase Generator: Cryptographically secure PRNG generating complex passwords or Diceware-style memorable passphrases.

  
D. Sharing & Public Zero-Knowledge Links

  
User-to-User Sharing: Wraps item keys directly to the recipient's public RSA-OAEP-3072 key (rsa1.*) with Read-Only or Can-Edit roles and optional 1, 7, or 30-day auto-expiry.

  
Public Share Links (/s/[id]#<key>):
  
  

  
Share secrets with non-Cyfer users.

  
The decryption key resides exclusively in the URL #fragment (never transmitted to the server).

  
512-byte ciphertext padding masks payload length.

  
Bot protection requires a manual click to prevent crawler previews from burning single-view links.

  

  
E. Sage: Privacy-Preserving AI Assistant

  
Zero-Knowledge LLM Interaction: Plaintext passwords, notes, and keys are never transmitted to model providers.

  
Client-Side Value Masking: Automatically sanitizes pastes and inputs on the device, converting secrets into {{vN}} and identifiers into {{uN}} placeholders before dispatch.

  
Tokenized Names: Hides item names as {{item:<id>}} by default.

  
Dump & Sort: Allows users to paste raw configuration dumps or messy credential blocks; Sage infers schemas, titles, and URLs, allowing users to review and save encrypted items locally.

  
Tidy Up / Optimise: Analyzes vault metadata to recommend cleanup, deduplication, and consolidation plans.

  
Cost Governance: Configurable monthly budget caps (default $4/mo), daily share splitting, and automatic 80% threshold warnings.

  
Model Tiers: Deterministic built-in heuristics 
→
→ local HMAC learned cache 
→
→ Claude 3.5 Haiku/MiniMax-M3 
→
→ Claude 3.5 Sonnet or self-hosted OpenAI-compatible local models.

  
F. Browser Extension (Chrome & Firefox MV3)

  
Autofill & Auto-Capture: Fills credentials, TOTP codes, payment cards, and identity profiles; detects and saves new logins or password changes across multi-step forms.

  
Payment Provider Iframe Injection: Securely injects into Stripe Elements, Braintree, Adyen, Square, and Checkout.com hosted iframes without leaking card details to the parent page.

  
Automated Password Changer: Resolves /.well-known/change-password, injects a floating Cyfer bar, generates a 24-character replacement, fills current and new fields, and commits only upon successful form submission.

  
Virtual Passkey Authenticator: Emulates a FIDO2 hardware authenticator in the browser, generating ECDSA P-256 credentials stored in the vault.

  
One-Click Web App Handoff: Securely unlocks the extension from the web dashboard using ephemeral public-key exchanges over postMessage.

  
G. Developer CLI & Headless Server Secrets

  
Standalone CLI (cyfer): Node 22+ binary that authenticates machine accounts locally and pushes secrets directly into encrypted team folders from CI/CD runners or ops servers (cyfer push).

  
Connected Server Apps (/api/apps): Headless microservices request secrets by name. Each request is authenticated using Ed25519 signatures (no static API tokens). Vault owners approve grants via the web dashboard, wrapping keys to the server app's RSA key.

  
Offline Resilience: Headless nodes cache encrypted payloads in a local 0600 file, enabling offline cold starts during network outages.

  
DockBit Auto-Rotation: Coordinates with DockBit infrastructure to execute scheduled secret rotations (30 to 365 days) and redeploy services automatically.

  
4. Security & Encryption Architecture
+--------------------------------------------------------------------------+
|                       CYFER CRYPTOGRAPHIC HIERARCHY                      |
+--------------------------------------------------------------------------+
               [Master Password] + [User Salt (16 bytes)]
                                    |
                           Argon2id KDF (WebAssembly)
                           (m=64MB, t=3, p=4)
                                    |
                              [masterKey]
                                    |
                          HKDF-SHA256 Derivation
                         /                      \
                        v                        v
                    [authKey]                 [encKey]
             (Argon2id hashed on server)  (Retained on client)
                                                 |
                                       AES-256-GCM Unwrap
                                                 v
                                             [userKey]
                                      (Root 32-byte Vault Key)
                                       /         |          \
                                      v          v           v
                                [Item Keys]  [RSA-3072]  [Passkey PRF]
                               (AES-256-GCM)  (Keypair)   (Hardware Wrap)
A. Mathematical & Cryptographic Specifications
Parameter	Specification	Purpose / Standard
Password KDF	Argon2id	
𝑚
=
65536
 KiB
m=65536 KiB (64 MB), 
𝑡
=
3
t=3 iterations, 
𝑝
=
4
p=4 parallelism lanes. RFC 9106 compliant. Resistant to GPU/ASIC cracking.
Key Derivation	HKDF-SHA256	RFC 5869 key expansion deriving independent authentication and encryption keys.
Symmetric Cipher	AES-256-GCM	Authenticated encryption with 96-bit (12-byte) random IV and 128-bit authentication tag. RFC 5116.
Symmetric Envelope	v1.<iv>.<ct+tag>	Versioned Base64URL envelope format for all items, folders, and payloads.
Asymmetric Cipher	RSA-OAEP-3072	3072-bit modulus, 
𝑒
=
65537
e=65537, SHA-256 hashing. Used for user sharing, team folders, and server app grants.
Asymmetric Envelope	rsa1.<ct>	Base64URL envelope wrapping 32-byte symmetric keys to RSA public keys.
Request Signatures	Ed25519	Pure EdDSA (RFC 8032) for machine-to-server request authentication.
Emergency Recovery	130-bit Entropy	26-character Base32 string (A–Z, 2–7) with uniform masking to prevent modulo bias.
Passkey Hardware	WebAuthn PRF	HMAC-secret / PRF extension wrapping the root userKey to hardware authenticators.
B. Route Guard Architecture

Every backend route handler is wrapped by strict TypeScript authorization stages:


  
publicRoute: Allow-listed unauthenticated endpoints (health, prelogin, WebAuthn challenge generation).

  
full (Default): Requires a valid session token and satisfied MFA/2FA.

  
mfa: Gated specifically to sessions awaiting second-factor verification.

  
app: Validates Ed25519 request signatures, timestamps (
±
5
 minutes
±5 minutes skew window), and body SHA-256 hashes.

  
integration: Dedicated Bearer token stage for infrastructure sync (DockBit).

  
Automated CI Validation: src/server/__tests__/routes-guarded.test.mts walks the entire AST of the src/app/api directory, automatically failing the build if any HTTP handler lacks guard wrapping.

  
5. Supported Platforms & Clients
+--------------------------------------------------------------------------+
|                         CYFER CLIENT ECOSYSTEM                           |
+--------------------------------------------------------------------------+
| 1. WEB APP         | Next.js 16 App Router, responsive desktop & mobile. |
| 2. EXTENSION       | Chrome, Edge, Brave, Arc, Opera, Firefox 128+ (MV3).|
| 3. CLI             | Standalone Node 22+ binary for Linux, macOS, Windows|
| 4. HEADLESS CLIENT | Single-file zero-dependency SDK: cyfer-app-client   |
| 5. MOBILE APP      | React Native / Expo (iOS & Android) with biometrics.|
| 6. DOCKER IMAGE    | Reproducible pinned build: ghcr.io/clickbitau/cyfer |
+--------------------------------------------------------------------------+

  
Web Dashboard: Full management UI, accessible from any modern browser with Web Crypto support.

  
Browser Extension (Manifest V3): Chromium and Firefox extensions with background service workers, shadow-DOM autofill overlays, and iframe bridges.

  
Command-Line Interface (cyfer): Standalone zero-dependency executable for automated build systems, developer laptops, and server administration.

  
App Client SDK (cyfer-app-client.mjs): Client library for Node.js backends to fetch and cache secrets dynamically.

  
Mobile Application (Expo / React Native): iOS and Android support with Secure Enclave / Keystore biometric storage, acting as the root security anchor.

  
Containerized Deployment: Docker and Docker Compose definitions with PostgreSQL advisory lock migrations.

  
6. Pricing & Licensing Model

Cyfer follows an open, transparent licensing model designed for self-hosters and businesses:

Tier	Deployment	Cost / Terms	Features Included
Self-Hosted Personal	Local Server / Docker / VPS	100% Free Forever	Unlimited personal vault items, all 11 schemas, browser extension, CLI, and mobile sync.
Self-Hosted Enterprise	On-Premise / Private Cloud	Single Installation License Key	Multi-tenant organizations, team RBAC, encrypted shared folders, sign-in policy gating, audit logs, and offboarding workflows.
ClickBit Hosted Cloud	Managed SaaS (pass.clickbit.com.au)	14-Day Free Trial	Full access to hosted infrastructure, automated backups, push notifications, and email relays.
Hosted Account Post-Trial	Managed SaaS	Subscription / License Key	Read-Only Grace Mode: If an account lacks a license, data is never deleted. Users can always view, copy, and export their secrets.
ClickBit Customers / Staff	Managed SaaS	Included Free	Complimentary cloud hosting for all active ClickBit clients and staff members.
7. What Makes Cyfer Different? (Competitive Advantages)
+-------------------+--------------------+--------------------+--------------------+
| FEATURE           | CYFER              | TRADITIONAL VAULTS | CLOUD SECRETS      |
|                   |                    | (1Password/Bitward)| (AWS Secrets/Vault)|
+-------------------+--------------------+--------------------+--------------------+
| Dual Audience     | Human + Machines   | Humans only        | Machines only      |
| Zero-Knowledge    | Full client crypto | Full client crypto | Provider has keys  |
| Machine Auth      | Ed25519 signatures | Static API tokens  | IAM / Tokens       |
| AI Assistant      | Zero-Knowledge AI  | None               | None               |
| Password Changer  | In-browser auto    | Deprecated / None  | None               |
| Public Sharing    | Key in URL hash    | Server-brokered    | Complex IAM        |
| Self-Hosting Cost | Free personal tier | Subscription       | Complex infra      |
+-------------------+--------------------+--------------------+--------------------+
1. Unified Human and Machine Secrets Engine

Traditional tools force organizations to manage passwords in consumer apps while storing server configs in cloud key-management services. Cyfer unites both in a single cryptographic model: engineers access web logins while production servers fetch API keys via signed Ed25519 requests.

2. Privacy-Preserving AI Assistant (Sage)

Sage brings AI productivity to credential management without compromising security. Secrets are scrubbed on the client and replaced with placeholders ({{vN}}). The LLM organizes unformatted text dumps, recommends vault hygiene, and generates structured items without ever seeing the underlying secrets.

3. Zero-Token Headless Server Delivery

Most secrets managers issue long-lived static bearer tokens to production servers, which become high-risk targets for leaks. Cyfer uses asymmetric Ed25519 request signing: servers authenticate requests with unique private keys, eliminating replayable bearer tokens.

4. Client-Driven Zero-Knowledge Public Links

When sharing a password with an external client or contractor, Cyfer places the AES decryption key in the browser URL #fragment. Because web browsers never transmit # fragments over HTTP, the Cyfer server cannot decrypt the shared data.

5. Automated In-Browser Password Changes

Using standard /.well-known/change-password routes, Cyfer coordinates the browser extension and web page to generate, fill, test, and save updated passwords in a single workflow.

6. Hardware-Bound Passwordless Architecture

By leveraging the WebAuthn PRF extension, Cyfer eliminates master passwords entirely for enrolled users. The root vault key is wrapped directly to hardware biometric sensors (Face ID, Touch ID, Windows Hello), establishing a phishing-resistant, passwordless workflow.

Cyfer Architecture & Feature Catalogue

Cyfer is a zero-knowledge password and platform secrets manager built with Next.js 16 (App Router), React 19, PostgreSQL, and client-side Web Crypto. The server only ever stores ciphertext; all encryption, key derivation, and decryption occur strictly on the user's client devices.

1. Zero-Knowledge Cryptography & Key Management
Zero-Knowledge Architecture: The database never receives plaintext passwords, keys, notes, or item names. All operations decrypt on the unlocked client device and re-encrypt before transmission.
Argon2id KDF: Derives a 32-byte masterKey from the user's master password and salt using WebAssembly (hash-wasm), with configurable memory (
𝑚
=
64
 MB
m=64 MB), time (
𝑡
=
3
t=3), and parallelism (
𝑝
=
4
p=4).
HKDF Key Separation: Splits the derived key into:
authKey: Sent to the server for authentication (stored server-side as an Argon2id hash).
encKey: Retained client-side to wrap the user's root vault key.
Key Hierarchy:
userKey: A random 32-byte AES-GCM key wrapping all personal items and the user's private key.
Per-Item Keys: Every vault item has its own unique 32-byte AES-256-GCM key, allowing granular sharing and key rotation without re-encrypting the whole vault.
RSA-OAEP-3072 Keypair: Stored per user (public key in plain, private key encrypted by userKey) for asymmetric person-to-person and app sharing.
Emergency Kit & Recovery Key:
Generates a 26-character Base32 emergency key (130-bit uniform entropy).
Generates a downloadable and printable PDF Emergency Kit (via jspdf) or plaintext file.
Allows full account recovery, resetting master passwords, and rotating recovery material.
WebAuthn PRF (Pseudo-Random Function) Extension:
Encrypts the vault key directly against hardware authenticator PRF outputs, enabling biometric master-password-free unlocking.
Ephemeral Device Approval Protocol:
Allows a locked device to request unlocking from an already-unlocked phone or computer.
Generates an ephemeral RSA-OAEP-3072 keypair, showing an 8-digit visual pairing code (1234 5678) verified by the approver before transferring the wrapped userKey.
2. Authentication, Identity & Sessions
Multiple Sign-In Modes:
Master Password Login: Prelogin salt retrieval + client Argon2id derivation.
Passwordless Login: Master-password-free authentication anchored to a registered phone (Face ID/fingerprint) or PRF-capable passkey.
Hardware Passkey (WebAuthn): Fingerprint/Face ID/Windows Hello/YubiKey.
Single Sign-On (SSO / OIDC): Integrated login with ClickBit, Google, and Apple.
Two-Step Verification (2FA / MFA):
Email Verification Codes: 6-digit one-time sign-in codes sent via SMTP (nodemailer) or ClickBit mail relay.
WebAuthn Security Keys / Passkeys: Hardware second-factor challenge.
Trusted Device Tokens: deviceToken saved on client to bypass repeated verification on trusted browsers.
Device Anchoring:
Uses the mobile app as a root security anchor (biometrics + push notifications).
Step-by-step checklist to migrate traditional password accounts to passwordless.
Auto-Lock & Device Security:
Configurable idle auto-lock timers (1m, 5m, 15m, 30m, 1h, 2h, 4h, or Never).
"Stay Unlocked on This Device": Retains the non-extractable CryptoKey in browser session storage across page reloads/tab navigation.
Remote Session Management: Tracks browser, OS, IP address, and last activity; supports terminating individual or all other active sessions.
Account Deletion: Full account purge requiring re-authentication confirmation, safely offboarding the user from shared folders and organisations.
3. Supported Vault Item Types

Cyfer supports 11 specialized item types, each with specific schemas, validation, and lifecycles:

Login: Username/email, password, multiple URLs, TOTP 2FA secret, custom fields, and password history.
Secure Note: Encrypted freeform markdown/notes.
Payment Card: Cardholder name, brand (auto-detected), card number (Luhn validated), expiry MM/YYYY, CVV/security code, and PIN. Includes card expiry warnings (within 60 days).
Identity: Full names, company, email, phone, multi-line addresses, city, state, postal code, country, and national ID/licence numbers.
Environment / Secrets (.env): Multi-variable KEY=value pairs with environment labels (production, staging, etc.) and .env format import/export.
API Key: Service name, API key ID, secret/private key (.pem/.p8), endpoint URL, and website URLs.
SSH Key: Host, username, private key, public key, passphrase, and automatic SHA256 fingerprint generation.
Database: Engine selection (PostgreSQL, MySQL, MariaDB, MongoDB, Redis, SQL Server, Other), host, port, DB name, username, password, and connection string generation.
Wi-Fi Network: SSID, password (with WPA 8–63 character enforcement), and security protocols (WPA3, WPA2, WEP, None).
Passkey: RP ID (domain), RP name, username, display name, credential ID, user handle, ECDSA P-256 private key (COSE -7 algorithm), and sign counter.
Project: Groups cloud backend infrastructure (Supabase, Firebase, Neon, Vercel) containing anon/publishable keys, service-role keys, JWT secrets, database passwords, and connection strings under an associated account login.
Common Item Capabilities
Password & Secret History: Automatically retains previous passwords, card numbers, or API keys with timestamps.
Custom Fields: Unlimited text or hidden/masked fields.
Tags & Favorites: Star items and tag them for quick access.
Network Reach Detection: Automatically classifies items as Local Network (LAN/intranet) or Public Internet, tailoring security alerts accordingly.
4. Vault Organization & Automation
Hierarchical Folders: Nested folder trees with drag-and-drop or picker-based organization.
"Sort My Vault" Engine:
Automatically reorganises vaults into Personal, Work › <Company>, Clients › <Client>, and Archive.
Tidies messy imported names (e.g., converts https://hpanel.hostinger.com (user@x) to Hostinger).
Identifies and groups Home Network devices, Education/University logins, and foreign accounts.
Files dead/closed services and throwaway/temp-mail logins into Archive › Old services.
Moves leftover server logs, backup files, and script fragments to Trash.
Dissolves redundant single-site folders into topic groupings.
"Work & Life" Partitioning:
Distinguishes personal items from work and client items based on email identity rules, corporate domains, and client service maps.
Encrypts preferences client-side before storing them in /api/account/prefs.
Automatic Topic Classification:
Categorizes items into 16 topics: Government, Banking & Finance, Shopping, Social, Email, Work Tools, Developer & Hosting, Streaming, Gaming, Travel, Utilities, Health, Education, Smart Home, Food & Delivery, Other.
Bulk Vault Operations:
Multi-select items to move folders (with automatic re-encryption for organisation folders), add tags, toggle favorites, recategorise item types, or move to trash.
Trash & Soft Delete:
30-day retention window before permanent purge, with individual restore, permanent delete, or one-click empty trash.
5. Vault Health, Security Auditing & Breach Scanner
Have I Been Pwned (HIBP) Breach Checking:
Implemented client-side using k-Anonymity: only the first 5 hex characters of the SHA-1 password hash are sent.
Utilizes Add-Padding to prevent response-length side-channel attacks.
Heuristic Strength Scoring:
Calculates entropy, character classes, repetitions, sequences, and dictionary word matches.
Vault Finding Categories:
Breached: Exposed in known data leaks.
Exposed: Critical production secrets reused in non-production/staging environments.
Reused: Identical passwords shared across multiple accounts.
Weak: Insufficient complexity or entropy.
Short: Machine API keys/tokens under 16 characters.
Old: Passwords unrotated for >180 days; API/SSH keys unrotated for >365 days.
Rotate: Items flagged for immediate rotation or overdue on a schedule.
Expired / Expiring: Payment cards that have expired or are expiring within 60 days.
Missing 2FA: Pinpoints known sites offering 2FA where the user has not configured TOTP or passkeys.
Finding Snoozing: Snooze specific warnings until a future date.
6. Generators & 2FA Engine
Password & Passphrase Generator:
Cryptographically secure PRNG (crypto.getRandomValues).
Custom character sets (uppercase, lowercase, numbers, symbols) and length sliders.
Diceware-style passphrase generation (e.g. correct-horse-battery-staple-42!).
Built-In TOTP Authenticator (RFC 6238):
Parses otpauth:// URIs and raw Base32 secret keys.
Supports SHA1, SHA256, and SHA512 with configurable step periods and digit counts.
Interactive circular countdown timer with automatic code regeneration and one-click copy.
7. Sharing & Public Links
Person-to-Person Encrypted Sharing:
Look up Cyfer users by email to retrieve their public RSA key.
Wraps the specific item key directly to the recipient's public key (rsa1.*).
Configurable roles: Read-Only vs. Can Edit.
Optional automatic expiry (1 day, 7 days, 30 days, or Never).
Zero-Knowledge Public Share Links (/s/[id]#<key>):
Share secrets with people who do not have a Cyfer account.
The decryption key resides exclusively in the browser URL #fragment (never transmitted to the server).
Field selection: choose exactly which fields, notes, or 2FA seeds to include in the snapshot.
Fixed-length ciphertext padding (512-byte blocks) to mask secret length.
Configurable lifetimes (1 hour, 1 day, 7 days) and single-view or multi-view options.
Bot protection: requires manual interaction to open, preventing preview bots from consuming one-time links.
8. Organizations, Teams & Enterprise Access
Multi-Tenant Organisations: Create and manage organisations with dedicated teams and members.
End-to-End Encrypted Shared Folders:
Folders use an independent symmetric encryption key wrapped to authorized team members.
Access roles: Use (autofill/copy only), Edit (create and modify items), and Manage (folder settings and access delegation).
Background key handoff: re-wraps folder keys for new team members.
Organization Sign-In Policies:
Level 0 (Standard): No specific requirements.
Level 1 (Two-Step): Mandates email code, passkey, or passwordless sign-in.
Level 2 (Phishing-Resistant): Mandates enrolled phone app or unlocking passkey.
Level 3 (Passwordless): Prohibits master passwords entirely.
Configurable grace periods (0–90 days). Non-compliant members are gated from shared organisation folders while retaining personal vault access.
Audit Trail & Activity Logging:
Logs all logins, password changes, secret reads, membership changes, and permission adjustments.
Filterable organisation activity feed with actor emails and event metadata.
Safe Member Offboarding:
Preview offboarding impact (owned items, folders, teams).
Reassigns vault items to another administrator and revokes access keys in a single transaction.
9. Connected Server Apps (/api/apps)
Headless Secret Delivery for Servers:
External servers and microservices (e.g. APIs, worker nodes) request secrets by name.
Client package: cli/appClient.mts (cyfer-app-client.mjs).
Cryptographic Mutual Trust:
App generates an RSA-OAEP-3072 encryption pair and an Ed25519 signing pair.
Connected via single-use pairing codes (cyferapp:1:<base64url>).
Every API request is signed with Ed25519 headers (Cyfer-App, Cyfer-Timestamp, Cyfer-Signature).
Browser-Approved Secret Grants:
Server requests a secret (e.g., DATABASE_URL).
The owner approves the request in the Cyfer web dashboard, wrapping the item key to the app's public key.
Secrets support ETag conditional caching (304 Not Modified).
Bulk Server Secret Importing:
Headless apps can push existing environment secrets into Cyfer encrypted to the owner's public key for one-click approval.
Offline Ciphertext Caching:
Apps can persist encrypted secrets in a 0600 cache file, allowing offline cold starts if the Cyfer server is temporarily unreachable.
10. Infrastructure Integrations (DockBit & Auto-Rotation)
DockBit Infrastructure Link:
Connects Cyfer with DockBit cloud deployments.
Displays deployment status, environment tags, and linked services.
Automated Key Rotation Schedules:
Configure recurring rotation intervals (30, 60, 90, 180, 365 days).
Background scheduler identifies due rotations and triggers DockBit redeployments.
Supports manual rotation triggers (--rotate "<reason>") from CLI or Web UI.
11. Sage AI Assistant (Zero-Knowledge LLM System)
Architecture: Operates under zero-knowledge guarantees; server-side Sage never sees raw secret values.
Privacy Protections:
Plaintext passwords, cards, keys, and notes are never sent to AI providers.
Item names are hidden by default and replaced with {{item:<id>}} tokens.
Client-side value masking: pastes and credentials are sanitized into {{vN}} (secrets) and {{uN}} (identifiers) before reaching the network.
Cost Controls & Request Ladder:
Built-in: Free, deterministic local parser for common queries.
Learned: Local replay of previously resolved queries.
Everyday Model: Cost-effective models (Claude 3.5 Haiku, MiniMax-M3).
Main Model: High-capability models (Claude 3.5 Sonnet or self-hosted OpenAI-compatible endpoints).
Monthly budget controls per account (default $4/mo), daily share splitting, and automatic 80% threshold warnings.
Core Sage Features:
Dump and Sort: Paste unformatted credentials, connection strings, or .env files; Sage extracts types and fields while keeping values local, producing an interactive review card before saving.
Vault Optimization ("Tidy Up"): Identifies duplicates, suggests folder structures, flags weak/stale passwords, and generates batched remediation plans.
Secret Revealer: Decrypts secrets onto interactive client cards with automatic 30-second clipboard clearing.
Decision Cards & Sage Blocks: Rich interactive UI components (Status, List, Decision, Choice, Plan, Meter, Compare, Result).
Persistent Memory: Stores user facts, profile notes, and standing instructions sealed with a server-side subkey.
Inter-App Agent Federation: Allows peer applications to query Sage via signed requests (/api/apps/sage/v1/ask) with hop limits and read-only constraints.
12. Browser Extension (Chromium & Firefox Manifest V3)
Cross-Browser Compatibility: Supports Chrome, Edge, Brave, Arc, Opera, and Firefox 128+.
Autofill Capabilities:
Automatically detects and fills logins, passwords, and 2FA TOTP codes.
Fills payment cards (holder name, card number, expiry formats, CVV).
Fills address and identity forms.
Payment-Provider Iframe Support:
Securely bridges into cross-origin checkout iframes (Stripe Elements, Braintree, Adyen, Square, Checkout.com) to fill hosted payment fields without exposing card data to the parent page.
Credential Capture & Save Offers:
Detects new logins, updated passwords, and payment card checkouts.
Generates strong passwords on focus for signup and password-change forms.
Remembers credentials across multi-step/email-first login screens.
Automated Website Password Change:
Resolves /.well-known/change-password.
Injects a floating Cyfer bar to autofill current and generated passwords, staging the new password locally until confirmed.
Native Passkey Management:
Acts as a FIDO2/WebAuthn virtual authenticator inside the browser to create, store, and assert passkeys for websites.
Web App Handoff:
One-click session unlocking between the Cyfer web dashboard and the extension via secure postMessage key exchange.
13. Cyfer Command-Line Interface (cyfer)
Headless Secret Management: A standalone Node 22+ CLI tool (cli/cyfer.mts) for servers, build pipelines, and developer machines.
Zero-Knowledge Machine Account: Unlocks the machine account locally and encrypts items before transmitting them to shared folders.
Core Commands:
cyfer register: Registers machine accounts and exports recovery keys.
cyfer login: Authenticates using password and email verification codes.
cyfer invites / cyfer accept: Accepts organization invitations.
cyfer folders: Lists accessible shared folders.
cyfer push: Pushes secrets from environment variables (--from-env), STDIN (--value-stdin), or .env files (--env-file) with merge or --replace flags.
cyfer push --rotate: Flags secrets as needing rotation with an explanation.
cyfer list: Lists items in a folder without revealing values.
cyfer whoami & cyfer logout: Session management.
Secure Local Storage: Stores tokens in ~/.config/cyfer/session.json (0600 permissions); master passwords can be passed via CYFER_PASSWORD_FILE or CYFER_PASSWORD.
14. Import & Export System
Supported Importers:
Bitwarden: JSON (unencrypted) and CSV.
1Password: 1PUX zip archives and CSV.
KeePass: KDBX 3 and KDBX 4 (AES, Argon2d, Argon2id, including keyfile support) and CSV.
Browser CSVs: Chrome, Firefox, Apple Keychain / Passwords.
Other Password Managers: LastPass, Passbolt, and Generic CSV formats.
Automatic format detection, duplicate identification, and folder preservation.
Supported Exporters:
Plain CSV: Includes all fields, folders, and TOTP seeds, with CSV formula injection mitigation (=, +, -, @).
Cyfer JSON: Unencrypted structured backup preserving folder hierarchies and favorites.
Encrypted Cyfer JSON: Encrypted with Argon2id and AES-256-GCM using a user-specified passphrase (
≥
12
≥12 characters).
15. Push Notifications, Deployment & Licensing
Push Notification Subsystem:
Integrates with Expo Push (APNs for iOS, FCM for Android).
Dispatches notifications for device unlock requests, new logins, item shares, and organization invites.
Self-Hosting & DevOps:
Dockerized deployment (Dockerfile, deploy/compose.yaml).
DockBit Marketplace package definition (deploy/dockbit-marketplace.yml).
Zero-downtime database migrations executed under PostgreSQL advisory locks (pg_advisory_lock).
Reproducible builds with pinned image digests.
Health check API (GET /api/health) reporting DB status, migration versions, and mail configuration.
Licensing System:
Built-in licensing engine supporting free personal tiers for self-hosted instances, trial periods, and cryptographic licence key verification for enterprise organizations.
Deep Technical Breakdown: Cyfer Architecture, Data Model & APIs
1. Complete API Route Matrix & Route Guard Architecture

Every route handler in Cyfer is strictly guarded by guarded(handler, { stage }) or explicitly registered via publicRoute(handler). An automated test (routes-guarded.test.mts) verifies that no unauthenticated or misconfigured routes reach production.

Guard Stages
publicRoute: Unauthenticated endpoint (strictly allow-listed).
full (Default): Requires an active session and satisfied 2FA / MFA.
mfa: For sessions waiting on a second-step challenge (passkey or emailed 6-digit code).
any: For session status and logout (accessible in both pending and fully authenticated states).
app: For connected servers and microservices; authenticated via Ed25519 signature headers (Cyfer-App, Cyfer-Timestamp, Cyfer-Signature).
integration: Authenticated with a Bearer integration token (DockBit cloud sync only).
Route Catalog
HTTP Method	Route	Guard Stage	Purpose
Authentication & Registration			
POST	/api/auth/prelogin	publicRoute	Fetches email salt & KDF params for Argon2id derivation
POST	/api/auth/login	publicRoute	Authenticates with authKey hash; returns session or sets MFA challenge
POST	/api/auth/login/email	mfa	Sends a 6-digit verification code to the registered email
POST	/api/auth/2fa/verify	mfa	Verifies submitted 6-digit email sign-in code
POST	/api/auth/login/passkey/options	publicRoute	Generates WebAuthn authentication options for passkey login
POST	/api/auth/login/passkey	publicRoute	Validates passkey signature and completes sign-in
POST	/api/auth/2fa/webauthn/options	mfa	WebAuthn challenge options for 2FA stage
POST	/api/auth/2fa/webauthn/verify	mfa	Verifies WebAuthn assertion for second factor
POST	/api/auth/register	publicRoute	Registers account with wrapped user key, recovery material & KDF
POST	/api/auth/register/email-code	publicRoute	Sends registration code to verify email address
POST	/api/auth/register/passkey-options	publicRoute	WebAuthn registration options for passwordless accounts
POST	/api/auth/recovery	publicRoute	Checks recovery auth key against stored Argon2id hash
POST	/api/auth/recovery/complete	publicRoute	Re-wraps userKey with a new master password and rotates recovery material
GET / POST	/api/auth/session	any	Checks current session state; extends activity timestamp
POST	/api/auth/logout	any	Destroys session token and clears __Host-cyfer_session cookie
POST	/api/auth/handoff	full	Issues an ephemeral session for the browser extension
GET	/api/auth/sso/providers	publicRoute	Lists active SSO/OIDC providers (ClickBit, Google, Apple)
GET	/api/auth/sso/[provider]/start	publicRoute	Starts OAuth/OIDC authorization flow with state and PKCE
GET / POST	/api/auth/sso/[provider]/callback	publicRoute	Handles OAuth redirect, verifies claims, and completes sign-in
POST	/api/auth/sso/native	publicRoute	Verifies native app Apple/Google identity tokens
GET	/api/auth/sso/pending	publicRoute	Checks status of asynchronous SSO flow
POST	/api/auth/verify-email	publicRoute	Verifies email address from link token
Account & Security Settings			
GET / PATCH / DELETE	/api/account	full	Reads account profile, updates settings, or deletes account
POST	/api/account/password	full	Updates master password and re-encrypts root userKey
POST	/api/account/passwordless	full	Transitions account to passwordless by verifying anchors
GET / PUT	/api/account/prefs	full	Reads and writes encrypted preferences (Work/Life partition rules)
GET	/api/account/security	full	Returns enrolled passkeys, trusted devices, phone anchors, and checklist
GET / DELETE	/api/account/sessions	full	Lists active sessions or revokes all other sessions
DELETE	/api/account/sessions/[id]	full	Revokes a specific session by ID
GET / DELETE	/api/account/devices	full	Lists or revokes trusted devices
POST	/api/account/passkeys/register-options	full	WebAuthn credential creation options
POST	/api/account/passkeys/register	full	Registers new passkey with PRF wrapped key
DELETE	/api/account/passkeys/[id]	full	Removes a passkey (enforces last-way-in safety checks)
POST	/api/account/passkeys/[id]/unlock	full	Updates passkey PRF wrapped user key
POST	/api/account/reauth/passkey	full	Issues high-security re-auth proof via passkey assertion
POST	/api/account/recovery-kit	full	Rotates emergency recovery key material
POST	/api/account/recovery-kit/confirm	full	Records user confirmation of saved emergency recovery key
POST	/api/account/verify-email/resend	full	Resends account verification email
POST	/api/account/unlock-requests	full	Posts device unlock request with ephemeral RSA public key
GET / POST / DELETE	/api/account/unlock-requests/[id]	full	Polls, approves (with wrapped key), or cancels unlock request
POST	/api/account/unlocked	full	Records that phone unlocked vault with biometrics (refreshes anchor)
POST / DELETE	/api/account/push	full	Registers or deregisters Expo push notification tokens
GET	/api/account/audit	full	Returns paginated audit log of security events
GET	/api/account/identities	full	Lists connected SSO identities
POST	/api/account/identities/connect	full	Links a new SSO identity to the current account
DELETE	/api/account/identities/[provider]	full	Unlinks an SSO identity
Vault Items & Folders			
GET	/api/vault	full	Fetches all encrypted items, folders, shared folders, and keys
POST	/api/vault/import-log	full	Audits a batch import operation
DELETE	/api/vault/trash	full	Empties all soft-deleted items permanently
POST	/api/items	full	Creates a new encrypted vault item
PATCH	/api/items/bulk	full	Batch moves, tags, or modifies items
GET / PUT / DELETE	/api/items/[id]	full	Reads ciphertext, updates encrypted payload, or trashes item
POST	/api/items/[id]/restore	full	Restores an item from the trash
GET	/api/items/[id]/key	full	Retrieves wrapped item key for a shared recipient
PATCH	/api/items/[id]/meta	full	Updates plaintext metadata (favorite, tags)
POST	/api/items/[id]/move	full	Moves item to personal or organization shared folder
POST / DELETE	/api/items/[id]/shares	full	Shares item with user by email or modifies share role
DELETE	/api/items/[id]/shares/[userId]	full	Revokes item share for a specific user
POST / GET	/api/items/[id]/links	full	Creates or lists public zero-knowledge share links
DELETE	/api/items/[id]/links/[linkId]	full	Revokes a public share link
GET	/api/links/[id]	publicRoute	Fetches ciphertext snapshot for public link /s/[id]#<key>
POST	/api/folders	full	Creates a personal folder
PATCH / DELETE	/api/folders/[id]	full	Renames/moves or deletes a personal folder
Organizations & Teams			
GET / POST	/api/orgs	full	Lists user's organisations or creates a new organisation
GET / PATCH / DELETE	/api/orgs/[orgId]	full	Gets details, renames, or deletes an organisation
POST	/api/orgs/[orgId]/accept	full	Accepts an organisation invitation
GET	/api/orgs/[orgId]/activity	full	Returns organisation audit event stream
PUT	/api/orgs/[orgId]/policy	full	Sets sign-in policy level (0–3) and grace days
POST	/api/orgs/[orgId]/members	full	Invites a new member by email
GET / PATCH / DELETE	/api/orgs/[orgId]/members/[userId]	full	Previews offboarding, updates role, or offboards member
POST	/api/orgs/[orgId]/teams	full	Creates a team
PATCH / DELETE	/api/orgs/[orgId]/teams/[teamId]	full	Updates team members or deletes team
POST	/api/orgs/[orgId]/folders	full	Creates a shared folder with encrypted name & wrapped key
PATCH / DELETE	/api/orgs/[orgId]/folders/[folderId]	full	Updates team access permissions or deletes shared folder
GET / POST	/api/orgs/[orgId]/folders/[folderId]/items	full	Lists or creates items inside an organisation shared folder
POST	/api/orgs/[orgId]/clickbit-staff	full	Marks org as ClickBit staff org; auto-invites staff
POST	/api/orgs/[orgId]/clickbit-staff/email	full	Dispatches staff invitation emails
POST	/api/orgs/keys	full	Hands over shared folder keys to newly added members
Connected Apps (/api/apps & /api/account/apps)			
POST	/api/apps/register	publicRoute	Registers headless app using one-time connect code
GET	/api/apps/owner-key	app	Retrieves owner's public key for encrypted secret imports
POST	/api/apps/requests	app	Requests access to a secret by name (MINIMAX_API_KEY)
GET	/api/apps/secrets	app	Lists secret statuses requested by the app
GET	/api/apps/secrets/[name]	app	Retrieves ciphertext and wrapped item key for secret
POST	/api/apps/imports	app	Pushes batch of encrypted secrets to vault owner
GET	/api/apps/imports/[id]	app	Checks status of a proposed secret import
GET / POST	/api/account/apps	full	Lists connected apps or creates a new connect code
GET / DELETE	/api/account/apps/[id]	full	Details an app or disconnects it
POST	/api/account/apps/[id]/secrets/[secretId]	full	Approves or declines an app secret request
POST	/api/account/apps/[id]/imports/[importId]	full	Approves or declines an app batch secret import
Sage AI Assistant			
GET / POST / DELETE	/api/sage/chat	full	Gets history, posts a question, or clears conversation
GET / PUT	/api/sage/settings	full	Gets or updates Sage settings, model keys, and budget
GET / POST	/api/sage/memory	full	Lists or stores facts and instructions
PATCH / DELETE	/api/sage/memory/[id]	full	Edits or deletes a memory fact
POST	/api/sage/actions/[id]	full	Submits approval, decline, or completion on action cards
POST	/api/sage/sort	full	Server-side dump-and-sort structuring for masked text
GET / PUT	/api/sage/roles	full	Organization owner/admin controls over Sage abilities
GET	/api/apps/sage/v1/card	app	Inter-app discovery card
POST	/api/apps/sage/v1/ask	app	Inter-app Sage question routing
POST	/api/apps/sage/v1/ask/confirm	app	Confirms an autonomous action from an external Sage
GET / POST	/api/apps/sage/v1/profile	app	Reads or appends profile notes across linked Sages
Integrations, Licensing & Health			
GET / POST	/api/account/integrations	full	Lists or creates integration links (DockBit)
PATCH / DELETE	/api/account/integrations/[id]	full	Updates or removes an integration
GET	/api/account/integrations/items	full	Lists secrets synced with external infrastructure
GET	/api/account/integrations/rotations	full	Rotation event history
POST	/api/account/integrations/schedules	full	Configures automated rotation schedules
GET	/api/integrations/dockbit/identity	integration	Verifies DockBit bearer token identity
PUT / DELETE	/api/integrations/dockbit/items/[externalRef]	integration	Ingests or deletes synced infrastructure secret
POST	/api/integrations/dockbit/rotation-requests	integration	Triggers a rotation cycle in DockBit
POST	/api/integrations/dockbit/rotation-requests/[id]/result	integration	Reports completion of a rotation cycle
GET / POST	/api/licence	full	Checks license status or activates license key
GET	/api/users/lookup	full	Looks up public encryption key for user email
GET	/api/health	publicRoute	Health check (runs SELECT 1, reports schema version and email status)
2. PostgreSQL Relational Schema Architecture

Cyfer's database schema is structured into 28 sequential migrations executed under PostgreSQL advisory lock (pg_advisory_lock(0x43796665724d6967)).

Table Specifications
1. Identity & Cryptographic Anchors
users:
Primary record: id (UUID), email (unique, lowercase), email_verified (boolean), created_at.
Public Cryptography: public_key (SPKI base64 RSA-3072 public key), protected_private_key (AES-GCM encrypted PKCS#8 private key envelope).
Recovery Material: recovery_wrapped_user_key (AES-GCM wrapped userKey by recovery key), recovery_auth_hash (Argon2id hash of recoveryAuth), recovery_confirmed_at.
credentials:
Master Password KDF: user_id, kdf (JSON: {kdf: 'argon2id', m, t, p}), salt (base64 16 bytes), auth_hash (Argon2id hash of authKey), protected_user_key (AES-GCM wrapped userKey by encKey).
Passkeys (passkeys table): credential_id (Base64URL), public_key, counter, rp_id, wrapped_user_key (wrapped by WebAuthn PRF output), wrap_salt.
trusted_devices:
token_hash (SHA-256 of client device token), device_name, client (web/extension/mobile), last_seen_at.
sessions:
token_hash, user_id, mfa_satisfied (boolean), client_type, ip, user_agent, created_at, expires_at.
unlock_requests:
Cross-device approval: id, user_id, public_key (ephemeral RSA-3072), wrapped_user_key (populated by approver), code (8-digit verification code), expires_at (10 minutes).
2. Vault Storage & Hierarchy
items:
id (UUID), user_id (owner), folder_id (nullable), org_folder_id (nullable, for shared items).
Encrypted Payload: data_enc (versioned AES-GCM envelope v1.<iv>.<ct> containing title, URLs, credentials, custom fields, history, notes).
Cryptographic Key: key_enc (item key wrapped by owner's userKey or organisation folder key).
Metadata (Server-visible plaintext): version (optimistic locking), favorite (boolean), tags (text array), meta (DockBit external sync references), deleted_at (soft-delete timestamp).
folders:
id, user_id, name, parent_id (nested hierarchy support), created_at.
item_access:
Granular person-to-person shares: item_id, user_id, role (read or edit), key_enc (rsa1.<ct> wrapped item key), expires_at (nullable expiration timestamp).
share_links:
Public anonymous links: id, item_id, data_enc (AES-GCM snapshot encrypted with 32-byte key held in URL hash), expires_at, max_views, view_count.
3. Organisations & Team RBAC
organizations:
id, name, sign_in_policy_level (0 = Standard, 1 = Two-Step, 2 = Phone/Passkey, 3 = Passwordless), policy_grace_days, policy_set_at.
organization_members:
org_id, user_id, role (owner, admin, member), status (invited, active), created_at.
org_teams & org_team_members:
Teams defined within an organisation; members mapped by user_id.
org_folders:
Encrypted shared folders: id, org_id, name_enc (AES-GCM folder name), created_by.
org_folder_keys:
Dynamic key handoff: folder_id, user_id, key_enc (rsa1.<ct> folder key wrapped to member's public key).
org_folder_access:
Maps team_id to folder_id with roles: use (read/autofill), edit (write items), or manage (administer folder).
4. Connected Server Apps
apps:
Headless server instances: id, user_id, name, enc_public_key (RSA-3072 SPKI), sign_public_key (Ed25519 SPKI), key_fingerprint, status (active, revoked).
app_secrets:
Secret access grants: app_id, name (e.g. DATABASE_URL), item_id, version, wrapped_key (rsa1.<ct> item key wrapped to app's RSA key), last_fetched_at, fetch_count.
app_requests:
Pending access requests: app_id, name, reason, status (pending, approved, declined, revoked).
app_imports:
Staged server imports: id, app_id, reason, ciphertext (items encrypted to owner's public key), status (pending, approved, declined, superseded).
5. Sage AI Subsystem
sage_settings:
Configuration: user_id, share_names (boolean, default false), allow_app_asks (boolean), monthly_budget_usd (default $4.00), anthropic_key_sealed, openai_endpoint_sealed, openai_key_sealed.
sage_conversations & sage_messages:
Chat transcripts: role, text_sealed (encrypted with server subkey cyfer-server-sage-v1), blocks_sealed, created_at.
sage_facts:
User memory store: user_id, kind (fact, profile), text_sealed, source (app name if created by peer).
sage_usage:
Metering per request: request_id, tier, tokens_in, tokens_out, tokens_cache_read, tokens_cache_write, cost_usd.
sage_actions:
Pending action cards: user_id, action_id, type, target, payload, status (pending, confirmed, declined).
3. Cryptographic Envelope & Key Wrapping Formats
+-------------------------------------------------------------------------+
|                  CYFER ENVELOPE ENCODING SCHEMES                        |
+-------------------------------------------------------------------------+
1. Symmetric AES-256-GCM Envelope (Used for items, folders, envelopes)
   Format:
   +-------+---+--------------------------+---+--------------------------+
   |  v1   | . |  12-byte IV (Base64URL)  | . | Ciphertext + Tag (B64URL)|
   +-------+---+--------------------------+---+--------------------------+
2. Asymmetric RSA-OAEP-3072 Key Wrap (Used for sharing, apps, approvals)
   Format:
   +-------+---+---------------------------------------------------------+
   | rsa1  | . |  384-byte RSA-OAEP-SHA256 Encrypted Key (Base64URL)     |
   +-------+---+---------------------------------------------------------+
3. Public Web Share URL Format
   Format:
   https://<domain>/s/<uuid>#<32-byte-base64url-aes-key>
                            ^-------------------------^
                            Fragment: Never sent to server!
4. Platform Capabilities Across Clients
Feature / Capability	Web Dashboard	Browser Extension	Mobile App	CLI Tool (cyfer)	Headless Client (appClient)
Zero-Knowledge Decryption	Yes	Yes	Yes	Yes	Yes
All 11 Item Types	Full Editor	View / Search	Full Editor	Env, API, Secrets	Env, API, Secrets
In-Page Form Autofill	—	Yes	—	—	—
Payment Provider Iframe Fill	—	Yes (Stripe, etc.)	—	—	—
Website Password Changer	Trigger only	Executes on page	—	—	—
Virtual Passkey Authenticator	Manage only	Full (Bridge/FIDO2)	—	—	—
Smart Vault Organiser	Yes	—	Yes	—	—
HIBP Breach Scanning	Yes	—	Yes	—	—
TOTP Authenticator Codes	Yes (Display)	Yes (Autofill)	Yes (Display)	—	—
Sage AI Assistant Chat	Yes	—	Chat & Voice	—	Inter-agent only
Dump & Sort Raw Importer	Yes	—	Yes	—	—
Offline Vault Caching	Session storage	Session storage	Secure Enclave	~/.config/cyfer	0600 cache file
Cross-Device Approval	Approver	Requester	Approver/Anchor	Requester	—
Push Platform Secrets (push)	Manual	—	—	Yes (Env/Stdin/File)	Yes (importSecrets)
Automated Rotation Scheduling	Yes	—	View only	Flag (--rotate)	—
Organisation Policies & RBAC	Admin/Manage	Enforced	Enforced	Member accept	—
run the porject in localhost 

The Cyfer project is now up and running locally!

Access Details
Web Application: http://localhost:5000
Login Page: http://localhost:5000/login
Registration Page: http://localhost:5000/register
Health Check API: http://localhost:5000/api/health
Service Status
Server Engine: Next.js 16.3.0 with Turbopack
PostgreSQL: Connected on port 5432 (cyfer database)
Migrations Status: All 28 migrations active and applied
Health API Response:
json
{
  "status": "ok",
  "db": "up",
  "migration": 28,
  "email": "off"
}
just give me the feature of cyfer . give me the list 
1. Zero-Knowledge Cryptography & Key Architecture
Client-side encryption only: Server stores ciphertext only; values and names are encrypted/decrypted in the client.
Argon2id Key Derivation: Master key derived via WebAssembly (hash-wasm).
HKDF Key Separation: Separates authKey (for server authentication) from encKey (for local encryption).
Multi-tier key hierarchy: Root userKey wraps individual per-item AES-256-GCM keys.
Per-user RSA-OAEP-3072 keypairs: Asymmetric keys for secure user-to-user and app sharing.
Emergency Kit: 26-character Base32 recovery key with downloadable PDF/text emergency kit.
WebAuthn PRF Extension: Wraps vault keys with biometric hardware passkeys (master-password-free unlocking).
Device-to-device approval: Unlock locked devices from an active phone/desktop using an ephemeral 8-digit visual code.
2. Supported Vault Item Types (11 Types)
Logins: Username/email, password, URLs, TOTP 2FA secret, and password history.
Secure Notes: Encrypted markdown/text notes.
Payment Cards: Cardholder, brand auto-detection, Luhn validation, expiry dates, CVV, and PIN.
Identities: Full name, company, email, phone, multi-line addresses, and ID/licence numbers.
Environment / Secrets (.env): Key-value pairs with environment tags (production, staging).
API Keys: Service name, key ID, private key files (.pem/.p8), and endpoint URLs.
SSH Keys: Host, username, private/public keys, passphrase, and SHA-256 fingerprint generation.
Databases: PostgreSQL, MySQL, MariaDB, MongoDB, Redis, SQL Server with auto connection string generator.
Wi-Fi Networks: SSID, password (WPA 8–63 char validation), and protocol options (WPA3/WPA2/WEP).
Passkeys: Virtual FIDO2/WebAuthn passkeys (ECDSA P-256 / COSE -7).
Projects: Cloud backend infrastructure bundles (Supabase, Firebase, Neon, Vercel).
3. Authentication & Sessions
Authentication modes: Master password, Passwordless (mobile biometrics or passkeys), and SSO/OIDC (ClickBit, Google, Apple).
Two-step verification (2FA): 6-digit email sign-in codes and WebAuthn security keys.
Device anchoring: Uses the mobile app as a root security anchor.
Auto-lock controls: Idle timer (1m to 4h, or Never).
"Stay Unlocked on This Device": Retains non-extractable session keys in browser memory across reloads.
Session manager: View and remotely revoke active sessions by IP, browser, and device.
Trusted device tokens: Remembers trusted devices to bypass repeated verification codes.
4. Vault Organization & Smart Management
Nested folders: Unlimited hierarchy for organizing items.
"Sort My Vault": Automated cleanup tool that tidies naming, groups home network devices, university logins, and archives dead services.
"Work & Life" separation: Partitions secrets into Personal, Work, Family & Friends, Clients, and Archive based on email rules.
Topic classification: Categorizes items across 16 topics (Banking, Shopping, Streaming, Dev, etc.).
Bulk actions: Move folders, batch tag, favourite/unfavourite, recategorise, or trash items.
Trash & Soft-delete: 30-day retention with restore, permanent purge, or empty trash.
Network reach indicator: Tags items as Local Network (LAN) vs. Public Internet.
5. Health, Auditing & Breach Scanning
HIBP Breach Scanner: Client-side k-Anonymity breach checking with response padding.
Password strength scoring: Heuristic entropy calculation and pattern detection.
Health alerts: Weak passwords, reused credentials, old/stale secrets (>180/365 days), and short API keys (<16 chars).
Environment exposure check: Flags production secrets reused in staging or dev environments.
Card expiry alerts: Warns when payment cards are expiring within 60 days.
Missing 2FA alerts: Detects accounts on known sites that lack 2FA setup.
Finding snoozing: Temporarily mute specific security warnings.
6. Password Generator & 2FA Engine
Password/Passphrase generator: Configurable character sets, lengths, and Diceware passphrases.
Built-in TOTP authenticator (RFC 6238): Supports SHA1, SHA256, SHA512, custom intervals, and real-time countdown timer.
7. Sharing & Public Links
User-to-user sharing: Encrypts item keys directly to recipient public keys (Read-only or Edit).
Expiring shares: Automatically revokes access after 1, 7, or 30 days.
Public zero-knowledge share links (/s/[id]#<key>): Share secrets with non-Cyfer users where the decryption key lives solely in the URL #fragment.
Link security: Granular field picking, bot-protection button, view counts, and padded ciphertexts.
8. Organizations & Teams
Multi-tenant organisations: Manage members with Owner, Admin, and Member roles.
Encrypted shared folders: Independent folder keys re-wrapped to team members.
Folder permissions: Use (autofill/copy), Edit (modify items), and Manage (access delegation).
Sign-in policies: Enforce Two-step (Level 1), Phishing-resistant/Passkey (Level 2), or Passwordless (Level 3) with grace periods.
Organisation audit log: Real-time stream of all team and member activities.
Safe offboarding: Reassigns owned items and revokes folder keys upon member departure.
9. Connected Server Apps (/api/apps)
Headless secret delivery: External servers and microservices fetch secrets by name via API.
Ed25519 request signing: Zero-trust signed headers (Cyfer-App, Cyfer-Timestamp, Cyfer-Signature).
Web approvals: Vault owners approve secret requests in the browser, wrapping keys to the app's RSA key.
Secret importing: Servers can push batches of .env secrets into Cyfer for one-click approval.
Offline cache file: Headless client supports secure 0600 local caching for offline resiliency.
10. Infrastructure Integrations (DockBit & Auto-Rotation)
DockBit cloud link: Syncs infrastructure services, databases, and environment variables.
Scheduled secret rotation: Configurable intervals (30, 60, 90, 180, 365 days).
Automated rotation requests: Triggers DockBit to rotate provider keys and redeploy services.
Manual rotation flag: Mark credentials as needing rotation with reason tracking.
11. Sage AI Assistant
Zero-knowledge assistant: Never sees or sends plaintext secrets to LLM providers.
Client-side value masking: Replaces passwords and emails with {{vN}} and {{uN}} placeholders before sending to models.
Tokenized names: Hides item names as {{item:<id>}} by default.
Dump & Sort: Paste unformatted credentials, text, or .env blocks; Sage formats them for client-side review and save.
Tidy Up / Optimise: Generates cleanup and deduplication plans.
Secret revealer: Displays decrypted secrets on interactive cards with 30-second clipboard clearing.
Tiered routing & budget caps: Built-in heuristics -> learned cache -> Claude 3.5 Haiku/Sonnet with monthly budget limits.
12. Browser Extension (Chrome & Firefox MV3)
In-page autofill: Fills logins, passwords, TOTP codes, cards, and addresses.
Payment iframe fill: Safely injects into Stripe, Braintree, Adyen, and Square checkout iframes.
Credential capture: Prompts to save new logins or update changed passwords.
Password change on website: Automates changing passwords via /.well-known/change-password.
FIDO2 Passkey provider: Acts as a virtual WebAuthn authenticator for websites.
Web app handoff: 1-click extension unlock and sync from the Cyfer web dashboard.
13. Command-Line Interface (cyfer CLI)
Server secret deployment: Standalone Node CLI for ops servers and CI/CD pipelines.
Client-side encryption: Machine account encrypts secrets locally before pushing to Cyfer shared folders.
Commands: register, login, push (from env, stdin, or file), list, invites, accept, folders, and --rotate.
14. Import & Export Ecosystem
Import formats: Bitwarden (JSON/CSV), 1Password (1PUX/CSV), KeePass (KDBX 3/4 + keyfiles/CSV), LastPass, Passbolt, Chrome, Firefox, Apple Passwords, and Generic CSV.
Export formats: Plain CSV (with spreadsheet formula injection protection), Cyfer JSON, and Encrypted Cyfer JSON (Argon2id + AES-256-GCM).
15. Deployment & System Features
Docker containerization: Production-ready Dockerfile and compose.yaml.
Zero-downtime migrations: Plain SQL migrations applied under PostgreSQL advisory locks.
Push notifications: Expo push integration for device unlock requests and security alerts.
System health endpoint: /api/health reports database status, schema migration version, and email status.
Licensing engine: Self-hosted free personal vaults with cryptographic enterprise license validation.
run the project in loclahost 

The project is running on localhost!

Access Links
Web Application: http://localhost:5000
Login: http://localhost:5000/login
Registration: http://localhost:5000/register
Health API: http://localhost:5000/api/health
Service Status
PostgreSQL: Running on port 5432 (cyfer database)
Next.js Dev Server: Running on port 5000 (Next.js 16.3 with Turbopack)
Migrations: All 28 migrations applied
Health Check:
json
{
  "status": "ok",
  "db": "up",
  "migration": 28,