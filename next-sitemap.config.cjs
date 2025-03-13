/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://kalamanch.org",
  generateRobotsTxt: true,
  sitemapSize: 5000,
  exclude: ["/myfeed"],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: "*",
        allow: ["/", "/about", "/contactUs"],
        disallow: ["/myfeed"],
      },
    ],
  },
};
