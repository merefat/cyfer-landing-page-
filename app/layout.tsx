import type { Metadata, Viewport } from "next";
import { Sora, Caveat } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CtaSection } from "@/components/CtaSection";

const sora = Sora({
  subsets: ["latin"],
  variable: "--font-sora",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

const caveat = Caveat({
  subsets: ["latin"],
  variable: "--font-caveat",
  display: "swap",
  weight: ["500", "600"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#17283b" },
  ],
};

export const metadata: Metadata = {
  title: "Cyfer | Calm, Private Password Manager for Everyday Life & Teams",
  description:
    "Save, autofill, and safely share your passwords, payment cards, Wi-Fi networks, and private notes across all your devices. Locked on your device—only you can open it.",
  keywords: [
    "password manager",
    "private vault",
    "autofill passwords",
    "family password sharing",
    "team password manager",
    "passkeys",
    "two-factor authenticator",
    "payment card autofill",
  ],
  authors: [{ name: "ClickBit Pty Ltd" }],
  icons: {
    icon: [
      { url: "/images/cyfer-logo.png", type: "image/png" },
      { url: "/favicon.ico" },
    ],
    apple: "/images/cyfer-logo.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html 
      lang="en-AU" 
      className={`${sora.variable} ${caveat.variable} scroll-smooth`}
      suppressHydrationWarning
    >
      <head>
        <meta name="color-scheme" content="light dark" />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var stored = localStorage.getItem('cyfer-theme');
                  var prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
                  var isDark = stored ? stored === 'dark' : prefersDark;
                  var root = document.documentElement;
                  if (isDark) {
                    root.classList.add('dark');
                    root.style.colorScheme = 'dark';
                  } else {
                    root.classList.remove('dark');
                    root.style.colorScheme = 'light';
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body className="bg-white dark:bg-[#111e2d] text-slate-900 dark:text-slate-100 min-h-screen flex flex-col antialiased selection:bg-[#1fbbd2] selection:text-[#17283b] font-sans">
        <a href="#main-content" className="visually-hidden">
          Skip to main content
        </a>
        <Navbar />
        <main id="main-content" className="flex-1">
          {children}
          <CtaSection />
        </main>
        <Footer />
      </body>
    </html>
  );
}
