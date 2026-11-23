"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ChevronDown, HelpCircle } from "lucide-react";

interface FaqItem {
  question: string;
  answer: React.ReactNode;
}

const faqs: FaqItem[] = [
  {
    question: "Is Cyfer really zero-knowledge down to the item names?",
    answer: "Yes. Most password managers only encrypt the password or secret field, leaving item titles, URLs, and folder structures unencrypted on their servers. Cyfer encrypts item titles, notes, custom fields, tags, and secret payloads locally on your device using separate AES-256-GCM keys. The Cyfer server stores only base64 ciphertext blobs, salts, and nonces.",
  },
  {
    question: "How do servers fetch secrets without Cyfer seeing the values?",
    answer: "Through Cyfer's 'Apps & Approvals' architecture. When an application on your server requests a secret, it sends an Ed25519-signed request. You approve the request in your Cyfer browser session. The value is re-encrypted on your client machine directly to the server's public key. Cyfer's cloud backend acts as an encrypted pipe and never holds the decryption key.",
  },
  {
    question: "What is Sage AI, and how are secrets kept safe from the AI model?",
    answer: "Sage is Cyfer's intelligent vault assistant. Before any query or prompt is sent to an LLM, a client-side tokenizer runs in browser RAM and replaces all passwords, API tokens, and emails with masked placeholders (such as {{v1}}, {{token_1}}, {{u1}}). The model answers using the placeholders, and your local client re-maps them into readable strings. The AI model never sees your real credentials.",
  },
  {
    question: "How does the breach check work without sending my passwords to a third party?",
    answer: "Cyfer implements mathematical k-anonymity. Your device computes the SHA-1 hash of your password locally and sends only the first 5 characters of that hash. The breach API returns a list of all hash suffixes matching those 5 characters. Your device then checks locally in RAM if your full hash is present in the list. The remaining 35 characters of your hash never leave your computer.",
  },
  {
    question: "Can I self-host Cyfer on my own server?",
    answer: (
      <>
        Yes. We offer an official Docker Compose deployment that runs the
        complete Cyfer API and database containers on your own virtual private
        server, bare metal, or Kubernetes cluster. Self-hosted personal vaults
        are 100% free forever.{" "}
        <Link
          href="/install"
          className="font-semibold text-[#0d8294] dark:text-[#1fbbd2] underline underline-offset-2 hover:opacity-80"
        >
          See the step-by-step install guide
        </Link>
        .
      </>
    ),
  },
  {
    question: "What happens if I lose my master password?",
    answer: "Because Cyfer is mathematically zero-knowledge, our engineering team does not possess a master decryption backdoor. However, during onboarding, Cyfer generates a printable 26-character Emergency Recovery Kit. As long as you keep your Emergency Kit in a safe place, you can always recover your vault even if you forget your master password.",
  },
  {
    question: "What does 'A weak router password does not bury a weak AWS one' mean?",
    answer: "Cyfer's health engine understands network topology. Logins that work from the public internet (such as AWS root accounts, GitHub tokens, or cloud databases) are judged strictly with high urgency. Credentials tagged for local offline networks (such as 192.168.1.1 home routers or local Docker test databases) are classified as informational so that critical cloud risks are never buried.",
  },
  {
    question: "Can I import my data from 1Password, Bitwarden, or KeePass?",
    answer: "Yes. Cyfer supports importing from 9 sources: Bitwarden (.json), 1Password (.1pux, .csv), KeePass (.kdbx), LastPass, Passbolt, Chrome, Firefox, Apple Passwords, and custom CSV. The import file is opened and parsed directly inside your browser tab; your device encrypts every item before anything is sent.",
  },
  {
    question: "How do Passkeys with WebAuthn PRF work in Cyfer?",
    answer: "Unlike basic websites that only use passkeys for web login, Cyfer leverages the W3C WebAuthn PRF (Pseudo-Random Function) extension. Your biometric hardware (Touch ID, Windows Hello, or YubiKey) derives an encryption root directly inside hardware security chips, allowing instant zero-knowledge decryption without typing a master password.",
  },
  {
    question: "What are the shared folder permissions: Use, Edit, and Manage?",
    answer: "'Use' allows a team member to autofill credentials or inject them into apps without viewing the raw plaintext in the UI. 'Edit' allows updating credentials and custom variables. 'Manage' gives folder administration rights, such as adding or removing team members and deleting the folder.",
  },
  {
    question: "How does secret rotation with DockBit work?",
    answer: "You can configure rotation schedules from 30 to 365 days. When linked with DockBit, secrets rotate automatically via API triggers and the new encrypted value is saved back into your Cyfer vault without downtime or manual copy-pasting.",
  },
  {
    question: "Does Cyfer track user activity or use third-party cookies?",
    answer: "No. Cyfer uses privacy-first, cookieless analytics. We never sell user data, run third-party advertising trackers, or inspect user telemetry. Your trust is our product.",
  },
];

export function FaqSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section className="py-24 bg-[#070D17] relative" id="faq">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-[#00A896]/10 border border-[#00A896]/20 text-[#00A896] text-xs font-semibold uppercase tracking-wider mb-4">
            <HelpCircle className="w-3.5 h-3.5" />
            Frequently Asked Questions
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Clear answers to technical questions.
          </h2>
          <p className="mt-4 text-base text-slate-600 dark:text-slate-300">
            Everything you need to know about Cyfer&apos;s cryptographic model, server isolation, and data governance.
          </p>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="glass-l2 rounded-2xl border border-slate-200 dark:border-white/[0.08] overflow-hidden transition-colors"
              >
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 hover:bg-white/[0.02] transition-colors"
                  aria-expanded={isOpen}
                >
                  <span className="text-sm sm:text-base font-bold text-slate-900 dark:text-white tracking-tight">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-500 dark:text-slate-400 shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-[#00A896]" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed border-t border-white/[0.04] pt-3">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

