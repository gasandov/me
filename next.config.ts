import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  experimental: {
    // Optimize package imports for better tree-shaking
    optimizePackageImports: ["framer-motion"],
  },
};

export default withNextIntl(nextConfig);
