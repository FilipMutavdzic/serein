import createMDX from '@next/mdx';
const withMDX = createMDX({ extension: /\.mdx?$/ });

const nextConfig = withMDX({
  pageExtensions: ['ts', 'tsx', 'md', 'mdx'],
  headers: async () => [
    { source: '/sw.js', headers: [
      { key: 'Cache-Control', value: 'no-cache' },
      { key: 'Service-Worker-Allowed', value: '/' },
    ]},
    { source: '/(.*)', headers: [
      { key: 'X-Content-Type-Options', value: 'nosniff' },
      { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
    ]},
  ],
  experimental: { mdxRs: true },
});
export default nextConfig;
