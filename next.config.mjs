import createMDX from "@next/mdx";
import remarkFrontmatter from "remark-frontmatter";
import remarkMdxFrontmatter from "remark-mdx-frontmatter";

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkFrontmatter, remarkMdxFrontmatter],
    rehypePlugins: [],
  },
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ["ts", "tsx", "mdx"],
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        "porto/internal": false,
      };
    }
    return config;
  },
  images: {
    remotePatterns: [
      {
        protocol: "http",
        hostname:"127.0.0.1",
        port: "3000"
      },
      {
        protocol: "http",
        hostname:"localhost",
        port: "3000"
      },
      {
        protocol: "https",
        hostname:"kbx-landing.vercel.app",
      }
    ]
  },
  async redirects() {
    return [
      {
        source: "/:path(.*)", // Match all paths except root
        has: [
          {
            type: "query",
            key: "path",
            value: ".+",
          },
        ], 
        destination: "https://read.kernel.community/:path*",
        permanent: true, 
      },
    ];
  },
};

export default withMDX(nextConfig);
