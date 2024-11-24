/**
 * Run `build` or `dev` with `SKIP_ENV_VALIDATION` to skip env validation. This is especially useful
 * for Docker builds.
 */
await import("./src/env.js");

/** @type {import('next').NextConfig} */
const config = {
  images: {
    domains: ["picsum.photos"], // Add the hostname here
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

    return config;
  },
};

export default config;
