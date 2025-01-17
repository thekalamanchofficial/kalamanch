/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import('next').NextConfig} */
const config = {
  images: {
    remotePatterns: [
      {
        hostname: "picsum.photos",
      },
      {
        hostname: "img.clerk.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/myfeed",
        permanent: true, // Set to true if this is a permanent redirect
      },
    ];
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    config.resolve.fallback = {
      ...config.resolve.fallback,
      net: false,
      os: false,
      child_process: false,
      fs: false,
      "fs/promises": false,
      tls: false,
      dns: false,
      "timers/promises": false,
    };

    return config;
  },
};

export default config;
