"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

interface Heading {
  id: string;
  text: string;
  level: number;
}

const TableOfContents = () => {
  const [headings, setHeadings] = useState<Heading[]>([]);
  const pathname = usePathname();

  const extractHeadings = () => {
    // Find the main content area
    const mainContent = document.querySelector("main.prose");
    
    if (!mainContent) {
      setHeadings([]);
      return;
    }

    // Find all headings (h1-h4) within the main content
    const headingElements = mainContent.querySelectorAll("h1, h2, h3, h4");
    
    const extractedHeadings: Heading[] = [];
    
    headingElements.forEach((element) => {
      const id = element.id;
      // Get text content, excluding anchor links
      let text = "";
      // Clone the element to avoid modifying the original
      const clone = element.cloneNode(true) as HTMLElement;
      // Remove anchor links from the clone
      clone.querySelectorAll("a.anchor-link, .anchor-link").forEach((link) => link.remove());
      text = clone.textContent?.trim() || "";
      const tagName = element.tagName.toLowerCase();
      const level = parseInt(tagName.substring(1), 10);
      
      // Only include headings that have an ID and text
      if (id && text) {
        extractedHeadings.push({ id, text, level });
      }
    });

    setHeadings(extractedHeadings);
  };

  useEffect(() => {
    // Initial extraction
    extractHeadings();

    // Use MutationObserver to watch for DOM changes (when content loads)
    const observer = new MutationObserver(() => {
      extractHeadings();
    });

    // Observe the main content area for changes
    const mainContent = document.querySelector("main.prose");
    if (mainContent) {
      observer.observe(mainContent, {
        childList: true,
        subtree: true,
      });
    }

    // Also re-extract after a short delay to catch async content
    const timeoutId = setTimeout(extractHeadings, 500);

    return () => {
      observer.disconnect();
      clearTimeout(timeoutId);
    };
  }, [pathname]);

  // Don't render if there are no headings
  if (headings.length === 0) {
    return null;
  }

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      // Account for fixed navbar (56px height)
      const navbarHeight = 56;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navbarHeight;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
      
      // Update URL hash without triggering scroll
      window.history.pushState(null, "", `#${id}`);
    }
  };

  return (
    <div className="w-full">
      <h3 className="text-sm font-semibold text-gray-900 mb-3 uppercase tracking-wide">
        On this page
      </h3>
      <nav className="space-y-3">
        {headings.map((heading) => {
          const indentClass = {
            1: "pl-0",
            2: "pl-3",
            3: "pl-6",
            4: "pl-9",
          }[heading.level] || "pl-0";

          return (
            <Link
              key={heading.id}
              href={`#${heading.id}`}
              onClick={(e) => handleClick(e, heading.id)}
              className={`block text-sm text-gray-600 hover:text-[#4B5B33] transition-colors py-1 ${indentClass}`}
            >
              {heading.text}
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default TableOfContents;

