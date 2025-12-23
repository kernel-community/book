"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import LogoImage from "../../../public/logo.png";
import { getInitialLocale, prefixLocale } from "@/utils/locale";
import SearchBar from "./SearchBar";

const NAV_ITEMS = [
  { label: "start", href: "/start" },
  { label: "learn", href: "/learn" },
  { label: "build", href: "/build" },
  { label: "converse", href: "/conversation" },
  { label: "tokens", href: "/tokens" },
  { label: "blog", href: "/blog" },
  { label: "koans", href: "/koans" },
  { label: "resources", href: "/resources" },
  { label: "library", href: "https://library.kernel.community", external: true },
];

const Logo = () => {
  return (
    <Image
      src={LogoImage}
      alt="Kernel Logo"
      style={{ objectFit: "cover" }}
      height={1300}
      width={1200}
      unoptimized
    />
  );
};

type DocNavbarProps = {
  onMenuToggle?: () => void;
  isMenuOpen?: boolean;
};

export default function DocNavbar({ onMenuToggle, isMenuOpen = false }: DocNavbarProps) {
  const pathname = usePathname() || "";
  const currentLocale = getInitialLocale(pathname);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 w-full backdrop-blur-[80.20px] py-[12px] px-[24px] flex items-center gap-4 border-2 bg-white/70">
      {/* Logo on the left */}
      <Link href="/" className="sm:w-9 w-6 flex-shrink-0">
        <Logo />
      </Link>
      
      {/* Nav items centered on desktop/iPad - hidden on mobile */}
      <div className="hidden md:flex gap-6 text-base font-medium flex-1 justify-center">
        {NAV_ITEMS.map((item) => {
          const active = !item.external && pathname.startsWith(item.href);
          
          if (item.external) {
            return (
              <a
                key={item.href}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                className={`capitalize hover:underline ${active ? "text-black" : "text-gray-600"}`}
              >
                {item.label}
              </a>
            );
          }
          
          return (
            <Link
              key={item.href}
              href={prefixLocale(item.href, currentLocale)}
              className={`capitalize hover:underline ${active ? "text-black" : "text-gray-600"}`}
            >
              {item.label}
            </Link>
          );
        })}
      </div>
      
      {/* Search bar - top right on desktop, middle on mobile */}
      <div className="hidden md:block">
        <SearchBar />
      </div>
      
      {/* Mobile layout: Search bar in middle, hamburger on right */}
      <div className="md:hidden flex items-center gap-2 flex-1">
        <div className="flex-1 max-w-md mx-auto">
          <SearchBar />
        </div>
        <button
          onClick={onMenuToggle}
          className="flex items-center justify-center w-8 h-8 flex-shrink-0"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
    </nav>
  );
}

