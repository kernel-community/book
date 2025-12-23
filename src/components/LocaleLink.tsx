"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode, AnchorHTMLAttributes } from "react";
import { getInitialLocale, isLocalePrefixed, prefixLocale } from "@/utils/locale";

type LocaleLinkProps = {
  href?: string;
  children?: ReactNode;
  locale?: string;
  className?: string;
} & AnchorHTMLAttributes<HTMLAnchorElement>;

const isExternal = (href: string) =>
  href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:");

export default function LocaleLink({
  href = "",
  children,
  locale,
  className = "",
  ...rest
}: LocaleLinkProps) {
  const pathname = usePathname();
  const currentLocale = locale || getInitialLocale(pathname);

  // Leave external links untouched
  if (href && isExternal(href)) {
    return (
      <a href={href} className={className} {...rest}>
        {children}
      </a>
    );
  }

  // Already localized?
  if (isLocalePrefixed(href, currentLocale)) {
    return (
      <Link href={href} className={className} {...rest}>
        {children}
      </Link>
    );
  }

  // Root-relative: prefix with locale
  const localizedHref = prefixLocale(href, currentLocale);

  return (
    <Link href={localizedHref} className={className} {...rest}>
      {children}
    </Link>
  );
}

