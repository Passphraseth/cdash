/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  env: {
    WORKSPACE_PATH: process.env.WORKSPACE_PATH || '/home/ubuntu/clawd',
  }
}

module.exports = nextConfig