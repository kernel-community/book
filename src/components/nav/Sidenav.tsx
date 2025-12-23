"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronRight, ArrowLeft } from "lucide-react";
import { useState } from "react";
import contentIndex from "@/data/content-index.json";
import { buildSidenavTree, type SidenavItem } from "@/utils/sidenav";
import { useMemo } from "react";
import { getInitialLocale, prefixLocale } from "@/utils/locale";

const NAV_ITEMS = [
  { label: "start", href: "/start" },
  { label: "learn", href: "/learn" },
  { label: "build", href: "/build" },
  { label: "converse", href: "/conversation" },
  { label: "tokens", href: "/tokens" },
  { label: "koans", href: "/koans" },
  { label: "blog", href: "/blog" },
  { label: "resources", href: "/resources" },
  { label: "library", href: "https://library.kernel.community", external: true },
];

type Props = {
  currentTopSection: string;
  currentLocale?: string;
  activePath?: string;
  isMobileMenuOpen?: boolean;
  onClose?: () => void;
};

const renderItems = (items: SidenavItem[], activePath: string, isTopLevel = false) => {
  return (
    <ul className={`${isTopLevel ? "space-y-4" : "space-y-3"}`}>
      {items.map((item) => {
        const hasChildren = !!item.items && item.items.length > 0;
        const isActive = activePath.startsWith(item.slug);

        if (hasChildren) {
          // Top level items are always expanded, bigger, and not collapsible
          if (isTopLevel) {
            return (
              <li key={item.slug}>
                <Link
                  href={item.slug}
                  className={`text-lg font-bold py-2 block hover:underline ${isActive ? "text-[#4B5B33]" : ""}`}
                >
                  {item.title}
                </Link>
                <div className="ml-4 mt-2">
                  {item.items && renderItems(item.items, activePath, false)}
                </div>
              </li>
            );
          }
          
          // Nested items are collapsible
          return (
            <li key={item.slug}>
              <details open={isActive} className="group">
                <summary className="cursor-pointer select-none font-bold text-base py-2 flex items-center justify-between list-none [&::-webkit-details-marker]:hidden">
                  <Link 
                    href={item.slug} 
                    className="hover:underline flex-1"
                    onClick={(e) => e.stopPropagation()}
                  >
                    {item.title}
                  </Link>
                  <ChevronRight 
                    className="w-5 h-5 transition-transform duration-200 flex-shrink-0 group-open:rotate-90"
                  />
                </summary>
                <div className="ml-4 mt-2">
                  {item.items && renderItems(item.items, activePath, false)}
                </div>
              </details>
            </li>
          );
        }

        return (
          <li key={item.slug}>
            <Link
              href={item.slug}
              className={`font-bold text-base py-2 block hover:underline ${isActive ? "text-[#4B5B33]" : ""}`}
            >
              {item.title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
};

export default function Sidenav({
  currentTopSection,
  currentLocale = "en",
  activePath = "",
  isMobileMenuOpen = false,
  onClose,
}: Props) {
  const pathname = usePathname();
  const resolvedPath = activePath || pathname || "";
  const [showTopNav, setShowTopNav] = useState(false);
  const locale = currentLocale || getInitialLocale(pathname);

  const { sidenavData } = useMemo(
    () =>
      buildSidenavTree(
        contentIndex,
        currentTopSection,
        currentLocale,
        "en"
      ),
    [currentLocale, currentTopSection]
  );

  // Filter out items where slugPart matches topSection (these are intermediate nodes created during tree building)
  // Keep items that have children (like "module-0") even if their slugPart might match
  const filteredItems = sidenavData.items.filter((item) => {
    // Always keep items with children (they're real groupings)
    if (item.items && item.items.length > 0) return true;
    // Filter out items where slugPart matches the topSection name
    return item.slugPart !== currentTopSection;
  });

  const handleGoBack = () => {
    setShowTopNav(true);
  };

  const handleNavItemClick = () => {
    setShowTopNav(false);
    onClose?.();
  };

  return (
    <>
      {/* Mobile overlay */}
      {isMobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 bg-black/50 z-40"
          onClick={onClose}
        />
      )}

      {/* Desktop sidebar */}
      <aside className="hidden md:block w-72 pr-6 pl-6 pt-8 border-r border-gray-300 min-h-full">
        {renderItems(filteredItems, resolvedPath, true)}
      </aside>

      {/* Mobile sidebar */}
      <aside
        className={`md:hidden fixed top-[56px] left-0 bottom-0 w-80 bg-white z-50 shadow-lg transform transition-transform duration-300 ease-in-out overflow-y-auto flex flex-col ${
          isMobileMenuOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex-1 p-6 overflow-y-auto">
          {showTopNav ? (
            <>
              {/* Top-level navigation items */}
              <button
                onClick={() => setShowTopNav(false)}
                className="mb-6 flex items-center gap-2 text-base font-bold text-gray-700 hover:text-[#4B5B33]"
              >
                <ArrowLeft size={20} />
                Back to {currentTopSection}
              </button>
              <ul className="space-y-4">
                {NAV_ITEMS.map((item) => {
                  const active = !item.external && pathname.startsWith(item.href);
                  
                  if (item.external) {
                    return (
                      <li key={item.href}>
                        <a
                          href={item.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`text-lg font-bold py-2 block hover:underline capitalize ${
                            active ? "text-[#4B5B33]" : "text-gray-700"
                          }`}
                          onClick={handleNavItemClick}
                        >
                          {item.label}
                        </a>
                      </li>
                    );
                  }
                  
                  return (
                    <li key={item.href}>
                      <Link
                        href={prefixLocale(item.href, locale)}
                        className={`text-lg font-bold py-2 block hover:underline capitalize ${
                          active ? "text-[#4B5B33]" : "text-gray-700"
                        }`}
                        onClick={handleNavItemClick}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </>
          ) : (
            <>
              {/* Go Back button */}
              <button
                onClick={handleGoBack}
                className="mb-6 flex items-center gap-2 text-base font-bold text-gray-700 hover:text-[#4B5B33]"
              >
                <ArrowLeft size={20} />
                Go Back
              </button>
              {/* Current section navigation */}
              {renderItems(filteredItems, resolvedPath, true)}
            </>
          )}
        </div>
      </aside>
    </>
  );
}

