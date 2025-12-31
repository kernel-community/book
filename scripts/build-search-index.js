const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const CONTENT_ROOT = path.join(process.cwd(), 'content');
const OUTPUT_PATH = path.join(process.cwd(), 'src', 'data', 'search-index.json');

// Simple markdown to text converter (removes markdown syntax)
const markdownToText = (markdown) => {
  return markdown
    // Remove frontmatter (already handled by gray-matter)
    // Remove code blocks
    .replace(/```[\s\S]*?```/g, '')
    // Remove inline code
    .replace(/`[^`]+`/g, '')
    // Remove images
    .replace(/!\[([^\]]*)\]\([^\)]+\)/g, '')
    // Remove links but keep text
    .replace(/\[([^\]]+)\]\([^\)]+\)/g, '$1')
    // Remove headers
    .replace(/^#{1,6}\s+/gm, '')
    // Remove bold/italic
    .replace(/\*\*([^\*]+)\*\*/g, '$1')
    .replace(/\*([^\*]+)\*/g, '$1')
    .replace(/__([^_]+)__/g, '$1')
    .replace(/_([^_]+)_/g, '$1')
    // Remove HTML tags
    .replace(/<[^>]+>/g, '')
    // Remove list markers
    .replace(/^[\s]*[-*+]\s+/gm, '')
    .replace(/^[\s]*\d+\.\s+/gm, '')
    // Remove blockquotes
    .replace(/^>\s+/gm, '')
    // Remove horizontal rules
    .replace(/^---+/gm, '')
    // Clean up whitespace
    .replace(/\n+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};

const mdxFiles = [];

const walk = (dir) => {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(fullPath);
    } else if (entry.isFile() && entry.name.endsWith('.mdx')) {
      mdxFiles.push(fullPath);
    }
  }
};

walk(CONTENT_ROOT);

const searchIndex = mdxFiles.map((filePath) => {
  const relativePath = path.relative(CONTENT_ROOT, filePath);
  const parts = relativePath.split(path.sep);
  const locale = parts[0];
  const topSection = parts[1] || null;

  const raw = fs.readFileSync(filePath, 'utf8');
  const parsed = matter(raw);

  const headingMatch = parsed.content.match(/^#\s+(.+)$/m);
  const derivedTitle =
    parsed.data.title ||
    (headingMatch ? headingMatch[1] : null) ||
    parts[parts.length - 1].replace(/(index)?\.mdx$/, '');

  const slugWithLocale =
    '/' +
    relativePath
      .replace(/\\/g, '/')
      .replace(/(index)?\.mdx$/, '')
      .replace(/\/$/, '');

  // Extract text content for search
  const textContent = markdownToText(parsed.content);
  
  // Get description from frontmatter if available
  const description = parsed.data.description || parsed.data.excerpt || '';

  return {
    locale,
    topSection,
    title: derivedTitle,
    slug: slugWithLocale,
    description,
    content: textContent.substring(0, 500), // Limit content length for index size
    path: relativePath,
  };
});

fs.mkdirSync(path.dirname(OUTPUT_PATH), { recursive: true });
fs.writeFileSync(OUTPUT_PATH, JSON.stringify(searchIndex, null, 2));

console.log(`Built search index with ${searchIndex.length} entries`);


