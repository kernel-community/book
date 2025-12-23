import { NextResponse, type NextRequest } from "next/server";

const COUNTRY_LOCALE_MAP: Record<string, string> = {
  US: "en",
  GB: "en",
  CA: "en",
  AU: "en",
  FR: "fr",
  DE: "en",
  ES: "en",
  PT: "en",
};

const DEFAULT_LOCALE = "en";

function getLocaleFromCountry(country?: string | null): string {
  if (!country) return DEFAULT_LOCALE;
  const upper = country.toUpperCase();
  return COUNTRY_LOCALE_MAP[upper] || DEFAULT_LOCALE;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip next internals and assets
  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/static") ||
    pathname.startsWith("/fonts") ||
    pathname.startsWith("/images") ||
    pathname.match(/\.(png|jpg|jpeg|gif|svg|ico|webp|css|js|map)$/)
  ) {
    return NextResponse.next();
  }

  const pathSegments = pathname.split("/").filter(Boolean);
  const hasLocale = pathSegments[0]?.length === 2; // e.g. /en/...

  if (!hasLocale) {
    const country = request.headers.get("x-vercel-ip-country") || request.cookies.get("locale")?.value;
    const locale = getLocaleFromCountry(country);

    const url = request.nextUrl.clone();
    url.pathname = `/${locale}${pathname}` || `/${locale}`;

    const response = NextResponse.redirect(url);
    response.cookies.set("locale", locale, { path: "/" });
    return response;
  }

  // If locale is present, let the request continue
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|static|fonts|images).*)"],
};

