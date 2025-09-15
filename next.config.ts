const { withContentlayer } = require('next-contentlayer2');
const isProd = process.env.NODE_ENV === "production";
console.log(isProd ? "生产环境" : "开发环境");

const nextConfig = {
  /* config options here */
  output: "export", // 关键：导出静态 HTML
  images: { unoptimized: true }, // 禁用 next/image 优化，否则会报错
  basePath: isProd ? "/blog" : "", // 如果仓库名是 blog
  assetPrefix: isProd ? "/blog/" : "",
};

module.exports = withContentlayer(nextConfig)