"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import type { BlogPost } from "@/utils/blog";

type RecommendedPostsProps = {
  recommendPaths: string[];
};

export default function RecommendedPosts({ recommendPaths }: RecommendedPostsProps) {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!recommendPaths || recommendPaths.length === 0) {
      setLoading(false);
      return;
    }

    // Extract slugs from paths like "blogPosts/en/blog/Editorial/what-is-privacy"
    // The slug is the last part after splitting by "/"
    const slugs = recommendPaths.map((path) => {
      const parts = path.split("/");
      return parts[parts.length - 1];
    });

    // Fetch all blog posts and filter by slugs
    fetch("/api/blog")
      .then((res) => res.json())
      .then((allPosts: BlogPost[]) => {
        const recommended = allPosts.filter((post) => slugs.includes(post.slug));
        setPosts(recommended);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching recommended posts:", err);
        setLoading(false);
      });
  }, [recommendPaths]);

  if (loading || posts.length === 0) {
    return null;
  }

  return (
    <div className="mt-16 pt-8 border-t border-gray-200">
      <h2 className="text-2xl font-bold mb-6">Related Posts</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/en/blog/${post.slug}`}
            className="block group hover:opacity-90 transition-opacity no-underline"
          >
            <article className="bg-white border border-gray-200 rounded-lg overflow-hidden h-full flex flex-col hover:shadow-lg transition-shadow">
              {post.image && (
                <div className="w-full h-48 relative overflow-hidden bg-gray-100">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
              )}
              <div className="p-4 flex-1 flex flex-col">
                {post.authors.length > 0 && (
                  <p className="text-sm text-gray-500 mb-2 font-bold">
                    {post.authors.join(", ")}
                  </p>
                )}
                {post.description && (
                  <p className="text-gray-700 text-sm line-clamp-3 font-normal">
                    {post.description}
                  </p>
                )}
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}

