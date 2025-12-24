import { ReactNode } from 'react';

/**
 * Converts a string to a URL-friendly slug
 * Used for generating anchor IDs from heading text
 */
export function slugify(text: string): string {
  return text
    .toString()
    .toLowerCase()
    .trim()
    // Remove special characters
    .replace(/[^\w\s-]/g, '')
    // Replace spaces and underscores with hyphens
    .replace(/[\s_]+/g, '-')
    // Remove multiple consecutive hyphens
    .replace(/-+/g, '-')
    // Remove leading/trailing hyphens
    .replace(/^-+|-+$/g, '');
}

/**
 * Extracts text content from React children
 */
export function getTextFromChildren(children: ReactNode): string {
  if (typeof children === 'string') {
    return children;
  }
  if (typeof children === 'number') {
    return String(children);
  }
  if (Array.isArray(children)) {
    return children.map(getTextFromChildren).join('');
  }
  if (children && typeof children === 'object' && 'props' in children) {
    return getTextFromChildren((children as { props: { children?: ReactNode } }).props.children);
  }
  return '';
}

