/** @type {import('next').NextConfig} */
const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1];
const githubPagesBasePath = process.env.GITHUB_PAGES === 'true' && repositoryName ? `/${repositoryName}` : '';
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? githubPagesBasePath;

const nextConfig = {
  output: 'export',
  images: { unoptimized: true },
  trailingSlash: true,
  basePath: basePath || undefined,
  assetPrefix: basePath || undefined,
  outputFileTracingRoot: process.cwd(),
};

export default nextConfig;
