import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  env: {
    baseUrl: process.env.BASE_URL || 'http://localhost:3000',
    enableFeedback: process.env.ENABLE_FEEDBACK ?? 'true',
    enableAuthentication: process.env.ENABLE_AUTHENTICATION ?? 'true',
    enableAgentSelect: process.env.ENABLE_AGENT_SELECT ?? 'true',
  },
};

export default nextConfig;
