import { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const nextConfig: NextConfig = {};

const withNextIntl = createNextIntlPlugin({
  experimental: {
    createMessagesDeclaration: [
      "./messages/en.json",
      "./messages/de.json",
      "./messages/es.json",
      "./messages/ja.json",
    ],
  },
});
export default withNextIntl(nextConfig);
