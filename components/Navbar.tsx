"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { 
  ChevronDown, 
  ShieldCheck, 
  Activity, 
  Sparkles, 
  Smartphone, 
  ArrowRightLeft, 
  Menu, 
  X, 
  ArrowRight,
  FolderHeart,
  Wrench
} from "lucide-react";
import { ThemeToggle } from "./ThemeToggle";

interface ProductPreview {
  title: string;
  badge: string;
  caption: string;
  image: string;
  alt: string;
}

const productPreviews: Record<string, ProductPreview> = {
  vault: {
    title: "Vault & Everyday Items",
    badge: "All Your Essentials",
    caption: "Passwords, payment cards, private notes, personal IDs, and Wi-Fi networks in one place.",
    image: "/images/sort-my-vault-modal.jpg",
    alt: "Cyfer Organize Vault",
  },
  health: {
    title: "Password Health Check",
    badge: "4 Clear Checks",
    caption: "Finds weak, reused, or leaked passwords automatically so you can fix them fast.",
    image: "/images/cyfer-reused-passwords.png",
    alt: "Cyfer Password Health Check",
  },
  sage: {
    title: "Sage Smart Assistant",
    badge: "Privacy First",
    caption: "Cleans up messy duplicates and sorts folders without ever reading your passwords.",
    image: "/images/cyfer-sage-assistant.png",
    alt: "Cyfer Sage Assistant",
  },
  apps: {
    title: "Works on Every Device",
    badge: "Fast Autofill",
    caption: "Instant autofill in Chrome, Firefox, Edge, iPhone, and Android with quick biometric unlock.",
    image: "/images/cyfer-dashboard.png",
    alt: "Cyfer Devices and Browsers",
  },
  import: {
    title: "Easy 1-Click Import",
    badge: "2-Min Switch",
    caption: "Safely bring in your saved passwords from Chrome, Apple, Bitwarden, or LastPass.",
    image: "/images/cyfer-tools-import.png",
    alt: "Cyfer Easy Import",
  },
};

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [megaMenuOpen, setMegaMenuOpen] = useState(false);
  const [hoveredProduct, setHoveredProduct] = useState<string>("vault");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 15);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMegaMenuOpen(false);
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  const handleMouseEnterProduct = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setMegaMenuOpen(true);
    }, 120);
  };

  const handleMouseLeaveProduct = () => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      setMegaMenuOpen(false);
    }, 200);
  };

  const activePreview = productPreviews[hoveredProduct] || productPreviews.vault;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || megaMenuOpen
          ? "bg-white/95 dark:bg-[#17283b]/95 backdrop-blur-xl border-b border-slate-200/80 dark:border-white/[0.1] py-3 shadow-lg dark:shadow-xl shadow-slate-900/5 dark:shadow-black/40"
          : "bg-transparent py-4 sm:py-5"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 group shrink-0" aria-label="Cyfer Home">
          <Image
            src="/images/cyfer-logo.png"
            alt="Cyfer Logo"
            width={36}
            height={36}
            className="w-9 h-9 object-contain rounded-xl group-hover:scale-105 transition-transform"
            priority
          />
          <span className="font-bold text-xl tracking-tight text-slate-900 dark:text-white">
            Cyfer
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden lg:flex items-center gap-1">
          {/* Product Mega Menu Trigger */}
          <div
            className="relative"
            onMouseEnter={handleMouseEnterProduct}
            onMouseLeave={handleMouseLeaveProduct}
          >
            <button
              type="button"
              onClick={() => setMegaMenuOpen(!megaMenuOpen)}
              className={`flex items-center gap-1 text-sm font-semibold px-3 py-2 rounded-lg transition-colors ${
                megaMenuOpen 
                  ? "text-[#0d8294] dark:text-[#1fbbd2] bg-slate-100 dark:bg-white/[0.08]" 
                  : "text-slate-800 hover:text-slate-950 hover:bg-slate-100/70 dark:text-slate-200 dark:hover:text-white dark:hover:bg-white/[0.06]"
              }`}
              aria-expanded={megaMenuOpen}
            >
              Product
              <ChevronDown className={`w-3.5 h-3.5 transition-transform duration-200 ${megaMenuOpen ? "rotate-180" : ""}`} />
            </button>
          </div>

          <Link
            href="/security"
            className="text-sm font-semibold text-slate-800 hover:text-slate-950 dark:text-slate-200 dark:hover:text-white px-3 py-2 rounded-lg hover:bg-slate-100/70 dark:hover:bg-white/[0.06] transition-colors"
          >
            Security
          </Link>
          <Link
            href="/pricing"
            className="text-sm font-semibold text-slate-800 hover:text-slate-950 dark:text-slate-200 dark:hover:text-white px-3 py-2 rounded-lg hover:bg-slate-100/70 dark:hover:bg-white/[0.06] transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="/compare"
            className="text-sm font-semibold text-slate-800 hover:text-slate-950 dark:text-slate-200 dark:hover:text-white px-3 py-2 rounded-lg hover:bg-slate-100/70 dark:hover:bg-white/[0.06] transition-colors"
          >
            Compare
          </Link>
        </nav>

        {/* Right Action Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <ThemeToggle />

          <Link
            href="/get-started"
            className="text-sm font-semibold text-slate-800 hover:text-slate-950 dark:text-slate-200 dark:hover:text-white px-3 py-2 transition-colors"
          >
            Sign in
          </Link>
          <Link
            href="/get-started"
            className="group flex items-center gap-2 text-sm font-bold text-[#17283b] bg-[#f39c12] hover:bg-[#d9880a] px-4 py-2 rounded-xl transition-all shadow-md shadow-[#f39c12]/20 hover:shadow-lg hover:shadow-[#f39c12]/35 active:scale-95"
          >
            Get Started Free
            <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
          </Link>
        </div>

        {/* Mobile controls (Theme Toggle + Hamburger) */}
        <div className="flex items-center gap-2 lg:hidden">
          <ThemeToggle />
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 rounded-xl text-slate-700 hover:text-slate-900 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-white dark:hover:bg-white/[0.08] transition-colors"
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Product Mega Menu Dropdown */}
      {megaMenuOpen && (
        <div
          onMouseEnter={() => {
            if (timeoutRef.current) clearTimeout(timeoutRef.current);
            setMegaMenuOpen(true);
          }}
          onMouseLeave={handleMouseLeaveProduct}
          className="absolute top-full left-0 right-0 bg-white/98 dark:bg-[#122030]/98 backdrop-blur-2xl border-b border-slate-200 dark:border-white/[0.12] shadow-2xl py-8 animate-in fade-in slide-in-from-top-2 duration-150"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-12 gap-8 items-stretch pb-6">
              {/* Left Column 1: Core Features */}
              <div className="col-span-4 space-y-1">
                <span className="text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400 block px-3 mb-2 font-bold">
                  Core Features
                </span>

                <Link
                  href="/product/vault"
                  onMouseEnter={() => setHoveredProduct("vault")}
                  onClick={() => setMegaMenuOpen(false)}
                  className={`block p-3 rounded-xl transition-all ${
                    hoveredProduct === "vault" 
                      ? "bg-slate-100 dark:bg-white/[0.06] border border-slate-200 dark:border-white/[0.1]" 
                      : "hover:bg-slate-50 dark:hover:bg-white/[0.03]"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-lg bg-[#1fbbd2]/15 text-[#0d8294] dark:text-[#1fbbd2]">
                      <FolderHeart className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-sm font-bold text-slate-900 dark:text-white">Vault &amp; Everyday Items</span>
                      <span className="block text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                        Logins, payment cards, notes, IDs &amp; Wi-Fi.
                      </span>
                    </div>
                  </div>
                </Link>

                <Link
                  href="/product/health"
                  onMouseEnter={() => setHoveredProduct("health")}
                  onClick={() => setMegaMenuOpen(false)}
                  className={`block p-3 rounded-xl transition-all ${
                    hoveredProduct === "health" 
                      ? "bg-slate-100 dark:bg-white/[0.06] border border-slate-200 dark:border-white/[0.1]" 
                      : "hover:bg-slate-50 dark:hover:bg-white/[0.03]"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-lg bg-[#1fbbd2]/15 text-[#0d8294] dark:text-[#1fbbd2]">
                      <Activity className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-sm font-bold text-slate-900 dark:text-white">Password Health Check</span>
                      <span className="block text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                        Flags weak, reused &amp; leaked passwords automatically.
                      </span>
                    </div>
                  </div>
                </Link>
              </div>

              {/* Middle Column 2: Smart Tools & Switching */}
              <div className="col-span-4 space-y-1">
                <span className="text-[11px] uppercase tracking-wider text-slate-500 dark:text-slate-400 block px-3 mb-2 font-bold">
                  Smart Tools &amp; Devices
                </span>

                <Link
                  href="/product/sage"
                  onMouseEnter={() => setHoveredProduct("sage")}
                  onClick={() => setMegaMenuOpen(false)}
                  className={`block p-3 rounded-xl transition-all ${
                    hoveredProduct === "sage" 
                      ? "bg-slate-100 dark:bg-white/[0.06] border border-slate-200 dark:border-white/[0.1]" 
                      : "hover:bg-slate-50 dark:hover:bg-white/[0.03]"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-lg bg-[#1fbbd2]/15 text-[#0d8294] dark:text-[#1fbbd2]">
                      <Sparkles className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-sm font-bold text-slate-900 dark:text-white">Sage Smart Assistant</span>
                      <span className="block text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                        Organizes folders cleanly without reading your passwords.
                      </span>
                    </div>
                  </div>
                </Link>

                <Link
                  href="/product/connected-apps"
                  onMouseEnter={() => setHoveredProduct("apps")}
                  onClick={() => setMegaMenuOpen(false)}
                  className={`block p-3 rounded-xl transition-all ${
                    hoveredProduct === "apps" 
                      ? "bg-slate-100 dark:bg-white/[0.06] border border-slate-200 dark:border-white/[0.1]" 
                      : "hover:bg-slate-50 dark:hover:bg-white/[0.03]"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-lg bg-[#1fbbd2]/15 text-[#0d8294] dark:text-[#1fbbd2]">
                      <Smartphone className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-sm font-bold text-slate-900 dark:text-white">Browser &amp; Mobile Apps</span>
                      <span className="block text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                        1-click autofill on Chrome, Firefox, Edge, iOS &amp; Android.
                      </span>
                    </div>
                  </div>
                </Link>

                <Link
                  href="/product/import"
                  onMouseEnter={() => setHoveredProduct("import")}
                  onClick={() => setMegaMenuOpen(false)}
                  className={`block p-3 rounded-xl transition-all ${
                    hoveredProduct === "import" 
                      ? "bg-slate-100 dark:bg-white/[0.06] border border-slate-200 dark:border-white/[0.1]" 
                      : "hover:bg-slate-50 dark:hover:bg-white/[0.03]"
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <div className="p-1.5 rounded-lg bg-[#1fbbd2]/15 text-[#0d8294] dark:text-[#1fbbd2]">
                      <ArrowRightLeft className="w-4 h-4" />
                    </div>
                    <div>
                      <span className="block text-sm font-bold text-slate-900 dark:text-white">Easy 1-Click Import</span>
                      <span className="block text-xs text-slate-600 dark:text-slate-300 mt-0.5">
                        Switch from Chrome, Apple, or Bitwarden in 2 minutes.
                      </span>
                    </div>
                  </div>
                </Link>
              </div>

              {/* Right Column 3: App Screenshot Mockup Preview */}
              <div className="col-span-4 rounded-2xl bg-slate-100 dark:bg-black/40 border border-slate-200 dark:border-white/[0.1] p-4 flex flex-col justify-between overflow-hidden shadow-inner">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-[10px] uppercase tracking-wider text-[#0d8294] dark:text-[#1fbbd2] bg-[#1fbbd2]/15 px-2.5 py-0.5 rounded-full font-bold">
                      {activePreview.badge}
                    </span>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Real App Preview</span>
                  </div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white mb-1">{activePreview.title}</h4>
                  <p className="text-xs text-slate-600 dark:text-slate-300 mb-3">{activePreview.caption}</p>
                </div>

                <div className="relative h-44 rounded-xl overflow-hidden border border-slate-300 dark:border-white/[0.1] bg-slate-200/50 dark:bg-[#0d1825] shadow-inner">
                  <Image
                    src={activePreview.image}
                    alt={activePreview.alt}
                    fill
                    className="object-contain p-2"
                    unoptimized
                  />
                </div>
              </div>
            </div>

            {/* Bottom Bar of Mega Menu */}
            <div className="pt-4 border-t border-slate-200 dark:border-white/[0.08] flex flex-wrap items-center justify-between text-xs text-slate-600 dark:text-slate-400 gap-3">
              <div className="flex flex-wrap items-center gap-4 sm:gap-6">
                <Link
                  href="/get-started"
                  onClick={() => setMegaMenuOpen(false)}
                  className="hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-1.5 text-slate-900 dark:text-white font-semibold"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1fbbd2]" />
                  Create free vault
                </Link>
                <Link
                  href="/security"
                  onClick={() => setMegaMenuOpen(false)}
                  className="hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <ShieldCheck className="w-3.5 h-3.5 text-[#0d8294] dark:text-[#1fbbd2]" />
                  How Privacy Works
                </Link>
                <Link
                  href="/tools"
                  onClick={() => setMegaMenuOpen(false)}
                  className="hover:text-slate-900 dark:hover:text-white transition-colors flex items-center gap-1.5"
                >
                  <Wrench className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" />
                  Free Password Generator
                </Link>
                <span className="flex items-center gap-1.5 text-[#0d8294] dark:text-[#1fbbd2] font-semibold">
                  <span>●</span> All Systems Operational &middot; 100% Private
                </span>
              </div>
              <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400">
                100% Private &middot; Unlocked Only By You
              </span>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-white dark:bg-[#17283b] border-t border-slate-200 dark:border-white/[0.1] px-5 py-6 mt-3 space-y-4 max-h-[85vh] overflow-y-auto shadow-2xl">
          <div className="flex flex-col space-y-2">
            <span className="text-xs uppercase text-slate-500 dark:text-slate-400 px-3 pt-2 font-bold">Product Features</span>
            <Link
              href="/product/vault"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium text-slate-800 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-white/[0.06]"
            >
              Vault &amp; Everyday Items
            </Link>
            <Link
              href="/product/health"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium text-slate-800 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-white/[0.06]"
            >
              Password Health Check
            </Link>
            <Link
              href="/product/sage"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium text-slate-800 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-white/[0.06]"
            >
              Sage Smart Assistant
            </Link>
            <Link
              href="/product/connected-apps"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium text-slate-800 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-white/[0.06]"
            >
              Browser &amp; Mobile Apps
            </Link>
            <Link
              href="/product/import"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium text-slate-800 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-white/[0.06]"
            >
              Easy 1-Click Import
            </Link>

            <span className="text-xs uppercase text-slate-500 dark:text-slate-400 px-3 pt-4 font-bold">Plans &amp; Privacy</span>
            <Link
              href="/security"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium text-slate-800 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-white/[0.06]"
            >
              How Privacy Works
            </Link>
            <Link
              href="/pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium text-slate-800 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-white/[0.06]"
            >
              Pricing Plans
            </Link>
            <Link
              href="/compare"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium text-slate-800 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-white/[0.06]"
            >
              Compare
            </Link>
            <Link
              href="/tools"
              onClick={() => setMobileMenuOpen(false)}
              className="text-sm font-medium text-slate-800 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white px-3 py-2 rounded-lg hover:bg-slate-100 dark:hover:bg-white/[0.06]"
            >
              Free Password Tools
            </Link>
          </div>

          <div className="pt-4 border-t border-slate-200 dark:border-white/[0.1] flex flex-col gap-3">
            <Link
              href="/get-started"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2.5 text-sm font-semibold text-slate-800 dark:text-slate-200 hover:text-slate-900 dark:hover:text-white rounded-xl border border-slate-300 dark:border-white/[0.15] bg-slate-100 dark:bg-white/[0.05]"
            >
              Sign in
            </Link>
            <Link
              href="/get-started"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-3 text-sm font-bold text-[#17283b] bg-[#f39c12] hover:bg-[#d9880a] rounded-xl shadow-md"
            >
              Get Started Free
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
