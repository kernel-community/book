"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Search, X } from "lucide-react";
import searchIndex from "@/data/search-index.json";
import { getInitialLocale } from "@/utils/locale";
import { usePathname } from "next/navigation";

type SearchResult = {
  locale: string;
  topSection: string;
  title: string;
  slug: string;
  description: string;
  content: string;
};

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = getInitialLocale(pathname);

  // Simple search function
  const search = (searchQuery: string) => {
    if (!searchQuery.trim()) {
      setResults([]);
      return;
    }

    const queryLower = searchQuery.toLowerCase().trim();
    const queryWords = queryLower.split(/\s+/);

    const scoredResults = (searchIndex as SearchResult[])
      .filter((item) => item.locale === currentLocale) // Filter by current locale
      .map((item) => {
        const titleLower = item.title.toLowerCase();
        const contentLower = item.content.toLowerCase();
        const descriptionLower = (item.description || "").toLowerCase();
        const topSectionLower = (item.topSection || "").toLowerCase();

        let score = 0;

        // Exact title match gets highest score
        if (titleLower === queryLower) {
          score += 1000;
        } else if (titleLower.includes(queryLower)) {
          score += 500;
        }

        // Title word matches
        queryWords.forEach((word) => {
          if (titleLower.includes(word)) {
            score += 100;
          }
        });

        // Description matches
        if (descriptionLower.includes(queryLower)) {
          score += 50;
        }
        queryWords.forEach((word) => {
          if (descriptionLower.includes(word)) {
            score += 25;
          }
        });

        // Content matches
        if (contentLower.includes(queryLower)) {
          score += 10;
        }
        queryWords.forEach((word) => {
          if (contentLower.includes(word)) {
            score += 5;
          }
        });

        // Top section matches
        if (topSectionLower.includes(queryLower)) {
          score += 30;
        }

        return { ...item, score };
      })
      .filter((item) => item.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 10)
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      .map(({ score, ...item }) => item);

    setResults(scoredResults);
  };

  useEffect(() => {
    if (query) {
      search(query);
    } else {
      setResults([]);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [query, currentLocale]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen || results.length === 0) return;

      if (e.key === "ArrowDown") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev < results.length - 1 ? prev + 1 : prev));
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        setSelectedIndex((prev) => (prev > 0 ? prev - 1 : 0));
      } else if (e.key === "Enter" && results[selectedIndex]) {
        e.preventDefault();
        handleSelectResult(results[selectedIndex]);
      } else if (e.key === "Escape") {
        setIsOpen(false);
        setQuery("");
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      return () => document.removeEventListener("keydown", handleKeyDown);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, results, selectedIndex]);

  const handleSelectResult = (result: SearchResult) => {
    router.push(result.slug);
    setQuery("");
    setIsOpen(false);
    setSelectedIndex(0);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
    setIsOpen(true);
    setSelectedIndex(0);
  };

  const handleInputFocus = () => {
    if (results.length > 0) {
      setIsOpen(true);
    }
  };

  const clearSearch = () => {
    setQuery("");
    setResults([]);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  return (
    <div ref={searchRef} className="relative flex-1 md:flex-none md:w-64">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-4 h-4" />
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={handleInputChange}
          onFocus={handleInputFocus}
          placeholder="Search..."
          className="w-full pl-10 pr-10 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#4B5B33] focus:border-transparent"
        />
        {query && (
          <button
            onClick={clearSearch}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            aria-label="Clear search"
          >
            <X size={16} />
          </button>
        )}
      </div>

      {/* Results dropdown */}
      {isOpen && results.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {results.map((result, index) => (
            <button
              key={result.slug}
              onClick={() => handleSelectResult(result)}
              className={`w-full text-left px-4 py-3 hover:bg-gray-50 transition-colors ${
                index === selectedIndex ? "bg-gray-50" : ""
              } ${index !== results.length - 1 ? "border-b border-gray-100" : ""}`}
            >
              <div className="font-semibold text-sm text-gray-900 mb-1">
                {result.title}
              </div>
              {result.description && (
                <div className="text-xs text-gray-600 mb-1 line-clamp-1">
                  {result.description}
                </div>
              )}
              <div className="text-xs text-gray-500 capitalize">
                {result.topSection}
              </div>
            </button>
          ))}
        </div>
      )}

      {/* No results */}
      {isOpen && query && results.length === 0 && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-50 p-4 text-sm text-gray-500 text-center">
          No results found
        </div>
      )}
    </div>
  );
};

export default SearchBar;

