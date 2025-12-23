"use client";

import Link from "next/link";
import Image from "next/image";
import type { BlogPost } from "@/utils/blog";
import { useEffect, useState } from "react";

export default function BlogIndex() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch blog posts on client side
    fetch("/api/blog")
      .then((res) => res.json())
      .then((data) => {
        setPosts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching blog posts:", err);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-6 py-12 md:mx-[200px]">
        <h1 className="text-4xl font-bold mb-8">Blog</h1>
        <p className="text-gray-600">Loading posts...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 md:mx-[200px]">
      <h1 className="text-4xl font-bold mb-12">Blog</h1>
      
      <div className="space-y-8">
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/en/blog/${post.slug}`}
            className="block group hover:opacity-90 transition-opacity"
          >
            <article className="border-b border-gray-200 pb-8 last:border-b-0">
              <div className="flex flex-col md:flex-row gap-6">
                {post.image && (
                  <div className="flex-shrink-0 w-full md:w-64 h-48 relative overflow-hidden rounded-lg bg-gray-100">
                    <Image
                      src={post.image}
                      alt={post.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, 256px"
                    />
                  </div>
                )}
                <div className="flex-1">
                  <h2 className="text-2xl font-bold mb-2 group-hover:text-[#4B5B33] transition-colors">
                    {post.title}
                  </h2>
                  {post.description && (
                    <p className="text-gray-600 mb-4 line-clamp-2">
                      {post.description}
                    </p>
                  )}
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    {post.authors.length > 0 && (
                      <span>
                        By {post.authors.join(", ")}
                      </span>
                    )}
                    {post.date && (
                      <span>
                        {new Date(post.date).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </article>
          </Link>
        ))}
      </div>
    </div>
  );
}

