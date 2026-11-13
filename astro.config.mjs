// @ts-check
import { defineConfig } from 'astro/config';
import react from '@astrojs/react';

// Static output works on Vercel with no adapter.
// After you know your domain, add:  site: 'https://your-domain.com'
export default defineConfig({
  integrations: [react()],
});
