import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'standalone',
  sassOptions: {
    prependData: `@use "@/styles/variables.scss" as *; @use "@/styles/functions.scss" as func;`,
  },
};

export default nextConfig;
