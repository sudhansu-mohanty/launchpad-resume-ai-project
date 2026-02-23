/** @type {import('next').NextConfig} */

// When building on GitHub Actions, assets must be served from the repo sub-path.
// Locally this is left empty so `npm run dev` continues to work at localhost:3000.
const isGitHubPages = process.env.GITHUB_ACTIONS === "true";

const nextConfig = {
  output: "export",
  ...(isGitHubPages && {
    basePath: "/launchpad-resume-ai-project",
    assetPrefix: "/launchpad-resume-ai-project",
  }),
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
