import React from "react";
import type { Metadata } from "next";
import { SageAssistantSection } from "@/components/home/SageAssistantSection";

export const metadata: Metadata = {
  title: "Sage Smart Vault Assistant | Cyfer",
  description:
    "Sage organizes messy logins, finds duplicates, and tidies your folders cleanly—without ever seeing your actual passwords or private notes.",
};

export default function ProductSagePage() {
  return (
    <div className="py-24 sm:py-28 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <SageAssistantSection />
    </div>
  );
}
