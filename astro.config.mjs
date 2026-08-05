import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://caubanhan.github.io',
  markdown: {
    // code blocks match the page instead of shipping a dark IDE theme
    shikiConfig: { theme: 'github-light', wrap: true },
  },
});
