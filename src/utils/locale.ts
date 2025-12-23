const DEFAULT_LOCALE = "en";

export const isLocalePrefixed = (href: string, locale?: string) => {
  if (!href.startsWith("/")) return false;
  const seg = href.split("/").filter(Boolean)[0];
  return locale ? seg === locale : seg.length === 2;
};

export const prefixLocale = (href: string, locale: string) => {
  if (!href.startsWith("/")) return href;
  if (isLocalePrefixed(href, locale)) return href;
  const normalized = href.startsWith("/") ? href : `/${href}`;
  return `/${locale}${normalized}`;
};

export const getLocaleFromPath = (pathname: string | null | undefined): string | null => {
  if (!pathname) return null;
  const seg = pathname.split("/").filter(Boolean)[0];
  return seg && seg.length === 2 ? seg : null;
};

// Client-side only: get locale from pathname or cookie
export const getInitialLocale = (pathname: string | null | undefined): string => {
  const fromPath = getLocaleFromPath(pathname);
  if (fromPath) return fromPath;
  
  // Try to get from cookie (client-side only)
  if (typeof document !== "undefined") {
    const cookies = document.cookie.split(";");
    const localeCookie = cookies.find((c) => c.trim().startsWith("locale="));
    if (localeCookie) {
      const locale = localeCookie.split("=")[1]?.trim();
      if (locale) return locale;
    }
  }
  
  return DEFAULT_LOCALE;
};

