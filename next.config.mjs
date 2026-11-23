import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: __dirname,
  // Keep build output outside OneDrive — Files On-Demand dehydrates `.next` mid-build.
  // Windows-only: on macOS this path resolves outside the project and breaks the build.
  ...(process.platform === "win32"
    ? { distDir: "../../../AppData/Local/cyfer-next-build" }
    : {}),
  images: {
    unoptimized: true,
  },
};

export default nextConfig;

