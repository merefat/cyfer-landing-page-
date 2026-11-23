import React from "react";
import { Hero } from "@/components/home/Hero";
import { ElevenItemTypes } from "@/components/home/ElevenItemTypes";
import { HomeHighlightsSection } from "@/components/home/HomeHighlightsSection";
import { MobileAppsSection } from "@/components/home/MobileAppsSection";
import { DesktopDownloadSection } from "@/components/home/DesktopDownloadSection";
import { InstallSection } from "@/components/install/InstallSection";

export default function HomePage() {
  return (
    <div className="relative">
      {/* 1. Hero & Personal Vault Preview */}
      <Hero />

      {/* 2. Purpose-Built Everyday Item Types (6 Real Everyday Templates) */}
      <ElevenItemTypes />

      {/* 3. About the App: iOS & Android Store Badges */}
      <MobileAppsSection />

      {/* 4. Desktop Downloads: Windows, macOS & Linux */}
      <DesktopDownloadSection />

      {/* 5. Install Cyfer on Your Own Server */}
      <InstallSection />

      {/* 6. Final CTA — try the password tool, then get started */}
      <HomeHighlightsSection />
    </div>
  );
}
