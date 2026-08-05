import rss from '@astrojs/rss';

const posts = Object.values(import.meta.glob('./blog/*.md', { eager: true }));

export function GET(context) {
  return rss({
    title: 'nhan tran',
    description: 'Network engineering, tooling, and what things cost.',
    site: context.site,
    items: posts
      .sort((a, b) => b.frontmatter.date.localeCompare(a.frontmatter.date))
      .map((p) => ({
        title: p.frontmatter.title,
        description: p.frontmatter.description ?? '',
        link: p.url,
      })),
  });
}
