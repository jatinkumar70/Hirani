/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://www.bnbmehomes.com/",
  generateRobotsTxt: true, // (optional)
  exclude: ["/account", "/payment/*", "/mkt1", "/mkt2", "/mkt3"],
  // ...other options
};
