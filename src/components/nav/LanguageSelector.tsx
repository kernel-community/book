"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import Select from "@/components/ui/Select";
import LocaleLink from "@/components/LocaleLink";
import contentIndex from "@/data/content-index.json";
import type { ContentEntry } from "@/utils/sidenav";

const LOCALE_FLAGS: Record<string, string> = {
  cn: "🇨🇳",
  en: "🇬🇧",
  es: "🇪🇸",
  fr: "🇫🇷",
  pr: "🇵🇹",
};

const LOCALE_NAMES: Record<string, string> = {
  cn: "中文",
  en: "English",
  es: "Español",
  fr: "Français",
  pr: "Português",
};

type LanguageSelectorProps = {
  currentPath: string;
  currentLocale: string;
};

const LanguageSelector = ({ currentPath, currentLocale }: LanguageSelectorProps) => {
  const router = useRouter();

  // Find the current page's rawSlug (without locale)
  const currentEntry = useMemo(() => {
    return (contentIndex as ContentEntry[]).find(
      (entry) => entry.slug === currentPath
    );
  }, [currentPath]);

  // Find all translations of this page (including current)
  const allTranslations = useMemo(() => {
    if (!currentEntry) return [];

    const rawSlug = currentEntry.rawSlug;
    const translations = (contentIndex as ContentEntry[]).filter(
      (entry) => entry.rawSlug === rawSlug
    );

    return translations;
  }, [currentEntry]);

  // If no translations available (or only one), don't render
  if (allTranslations.length <= 1) {
    return null;
  }

  // Get available languages (excluding current for display)
  const availableTranslations = allTranslations.filter(
    (entry) => entry.locale !== currentLocale
  );

  // Create options for the select dropdown (include all translations)
  const options = allTranslations.map((entry) => ({
    value: entry.slug,
    label: `${LOCALE_FLAGS[entry.locale] || ""} ${LOCALE_NAMES[entry.locale] || entry.locale}`,
  }));

  const currentOption = options.find((opt) => opt.value === currentPath) || options[0];

  const handleChange = (selectedOption: unknown) => {
    const option = selectedOption as { value: string } | null;
    if (option && option.value !== currentPath) {
      router.push(option.value);
    }
  };

  // Get available languages (excluding current for flag display)
  const availableLanguages = availableTranslations.map((entry) => entry.locale);

  return (
    <div className="w-full">
      <div className="mb-3">
        <Select
          isSearchable={false}
          options={options}
          onChange={handleChange}
          value={currentOption}
          aria-label="Page Language Selector"
          className="w-full"
        />
      </div>

      <div className="text-sm text-gray-700 mb-2">
        {availableLanguages.length > 0 && (
          <>
            Available in {availableLanguages.length} other language
            {availableLanguages.length > 1 ? "s" : ""}:
          </>
        )}
      </div>

      {availableLanguages.length > 0 && (
        <div className="text-2xl mb-3 tracking-widest flex gap-2">
          {availableLanguages.map((loc) => {
            const translation = availableTranslations.find((t) => t.locale === loc);
            if (!translation) return null;
            return (
              <a
                key={loc}
                href={translation.slug}
                className="hover:opacity-70 transition-opacity cursor-pointer"
                aria-label={`Switch to ${LOCALE_NAMES[loc] || loc}`}
              >
                {LOCALE_FLAGS[loc] || loc}
              </a>
            );
          })}
        </div>
      )}

      <div className="text-xs text-gray-600 leading-normal">
        Need another language?{" "}
        <LocaleLink
          href="/guiding/writers/translation"
          className="text-[#4B5B33] font-medium hover:underline"
        >
          Join translation team
        </LocaleLink>
      </div>
    </div>
  );
};

export default LanguageSelector;

