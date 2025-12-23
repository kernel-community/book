"use client";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "next/navigation";
import { MDXProvider } from "@mdx-js/react";
import DocNavbar from "@/components/nav/DocNavbar";
import Sidenav from "@/components/nav/Sidenav";
import Footer from "@/components/Footer";
import LanguageSelector from "@/components/nav/LanguageSelector";
import BlogIndex from "@/components/blog/BlogIndex";
import contentIndex from "@/data/content-index.json";
import { contentLoaders } from "@/data/content-loaders";
import { blogLoaders } from "@/data/blog-loaders";
import type { ContentEntry } from "@/utils/sidenav";
import { useMDXComponents } from "@/app/mdx-components";

export default function LocaleContentPage() {
  const params = useParams();
  const locale = (params?.locale as string) || "en";
  const slugParts = useMemo(() => (params?.slug as string[] | undefined) || [], [params?.slug]);

  const topSection = slugParts[0] || "start";
  const activePath = `/${[locale, ...slugParts].join("/") || `${locale}/start`}`;
  
  // Check if this is a blog route
  const isBlogRoute = topSection === "blog";

  const targetEntry = useMemo(() => {
    const desiredSlug =
      slugParts.length > 0 ? `/${locale}/${slugParts.join("/")}` : `/${locale}/start`;
    const exact = (contentIndex as ContentEntry[]).find((e) => e.slug === desiredSlug);
    if (exact) return exact;
    // Fallback to start index if not found
    return (contentIndex as ContentEntry[]).find(
      (e) => e.slug === `/${locale}/start`
    );
  }, [locale, slugParts]);

  const [MDXContent, setMDXContent] = useState<React.ComponentType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const mdxComponents = useMDXComponents({});

  useEffect(() => {
    // Skip loading for blog index page
    if (isBlogRoute && slugParts.length === 1) {
      return;
    }

    // Handle individual blog posts
    if (isBlogRoute && slugParts.length > 1) {
      const blogSlug = slugParts[1];
      let mounted = true;
      setError(null);
      setMDXContent(null);

      const loader = blogLoaders[blogSlug];
      if (!loader) {
        setError("Blog post not found.");
        return () => {
          mounted = false;
        };
      }

      loader()
        .then((mod) => {
          if (mounted) setMDXContent(() => mod.default);
        })
        .catch((err) => {
          console.error(err);
          if (mounted) setError("Failed to load blog post.");
        });

      return () => {
        mounted = false;
      };
    }

    // Handle regular content pages
    let mounted = true;
    setError(null);
    setMDXContent(null);

    if (!targetEntry) {
      setError("Content not found.");
      return () => {
        mounted = false;
      };
    }

    const loader = contentLoaders[targetEntry.slug];
    if (!loader) {
      setError("Content loader not found.");
      return () => {
        mounted = false;
      };
    }

    loader()
      .then((mod) => {
        if (mounted) setMDXContent(() => mod.default);
      })
      .catch((err) => {
        console.error(err);
        if (mounted) setError("Failed to load content.");
      });

    return () => {
      mounted = false;
    };
  }, [targetEntry, isBlogRoute, slugParts]);

  // Handle blog index page
  if (isBlogRoute && slugParts.length === 1) {
    return (
      <div className="min-h-screen flex flex-col">
        <DocNavbar
          onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          isMenuOpen={isMobileMenuOpen}
        />
        <div className="flex flex-1 overflow-x-hidden pt-[56px]">
          <main className="flex-1">
            <BlogIndex />
          </main>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <DocNavbar
        onMenuToggle={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        isMenuOpen={isMobileMenuOpen}
      />
      <div className="flex flex-1 overflow-x-hidden pt-[56px]">
        {!isBlogRoute && (
          <Sidenav
            currentTopSection={topSection}
            currentLocale={locale}
            activePath={activePath}
            isMobileMenuOpen={isMobileMenuOpen}
            onClose={() => setIsMobileMenuOpen(false)}
          />
        )}
        <div className="flex-1 flex flex-col md:flex-row">
          <main className={`flex-1 prose max-w-none ${isBlogRoute ? "p-6 md:p-12 md:mx-[200px]" : "p-6"} overflow-x-hidden`}>
            {/* Mobile: Language selector at top */}
            {!isBlogRoute && (
              <div className="md:hidden mb-6">
                <LanguageSelector
                  currentPath={activePath}
                  currentLocale={locale}
                />
              </div>
            )}
            {error && <p className="text-red-500">{error}</p>}
            {!error && !MDXContent && <p className="text-gray-500">Loading...</p>}
            {!error && MDXContent && (
              <MDXProvider components={mdxComponents}>
                <MDXContent />
              </MDXProvider>
            )}
          </main>
          {/* Desktop: Language selector on the right */}
          {!isBlogRoute && (
            <aside className="hidden md:block w-64 flex-shrink-0 pt-8 pr-6">
              <LanguageSelector
                currentPath={activePath}
                currentLocale={locale}
              />
            </aside>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

