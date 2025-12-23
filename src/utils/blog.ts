import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export type BlogPost = {
  slug: string;
  title: string;
  authors: string[];
  description: string;
  date: string;
  image?: string;
  keywords?: string[];
};

const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

export function getAllBlogPosts(): BlogPost[] {
  if (!fs.existsSync(BLOG_DIR)) {
    return [];
  }

  const files = fs.readdirSync(BLOG_DIR);
  const posts: BlogPost[] = [];

  for (const file of files) {
    if (!file.endsWith('.mdx')) continue;

    const filePath = path.join(BLOG_DIR, file);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data } = matter(fileContents);

    const slug = file.replace(/\.mdx$/, '');

    posts.push({
      slug,
      title: data.title || slug,
      authors: Array.isArray(data.authors) ? data.authors : data.authors ? [data.authors] : [],
      description: data.description || '',
      date: data.date || '',
      image: data.image,
      keywords: data.keywords,
    });
  }

  // Sort by date, latest first
  return posts.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return dateB - dateA; // Descending order (newest first)
  });
}

