export type ContentEntry = {
  locale: string;
  topSection: string | null;
  title: string;
  slug: string;
  rawSlug: string;
  slugPart: string;
  order: number | null;
  path: string;
};

export type SidenavItem = {
  title: string;
  slug: string;
  slugPart: string;
  order: number | null;
  items?: SidenavItem[];
};


const titleCase = (str: string) =>
  str
    .split(' ')
    .map((word) => (word ? word[0].toUpperCase() + word.slice(1) : ''))
    .join(' ');

const normalizeTitle = (slugPart: string) =>
  titleCase(slugPart.replace(/-|_|\\./g, ' '));

const sortItems = (items: SidenavItem[]) =>
  items.sort((a, b) => {
    if (a.order === null && b.order !== null) return 1;
    if (a.order !== null && b.order === null) return -1;
    if (a.order === null && b.order === null) return a.title.localeCompare(b.title);
    if (a.order === b.order) return a.title.localeCompare(b.title);
    return (a.order ?? 0) - (b.order ?? 0);
  });

const makeSidenavObjects = (
  entries: ContentEntry[],
  locale: string,
  topSection: string
) =>
  entries
    .filter(
      (entry) =>
        entry.locale === locale &&
        entry.topSection === topSection &&
        entry.slug.startsWith(`/${locale}/${topSection}/`)
    )
    .map((entry) => ({
      title: entry.title || normalizeTitle(entry.slugPart),
      slug: entry.slug,
      rawSlug: entry.rawSlug,
      slugPart: entry.slugPart,
      order: entry.order ?? null,
    }));

export function buildSidenavTree(
  entries: ContentEntry[],
  currentTopSection: string,
  currentLocale = 'en',
  defaultLocale = 'en'
) {
  const defaultLocaleFiles = makeSidenavObjects(entries, defaultLocale, currentTopSection);
  const currentLocaleFiles =
    defaultLocale !== currentLocale
      ? makeSidenavObjects(entries, currentLocale, currentTopSection)
      : [];

  const editableLocaleFiles = [...currentLocaleFiles];

  const mergedLocaleFiles =
    currentLocaleFiles.length === 0
      ? defaultLocaleFiles
      : defaultLocaleFiles
          .map((file) => {
            const findLocalizedFile = currentLocaleFiles.find((el, index) => {
              const match = el.rawSlug === file.rawSlug;
              if (match) editableLocaleFiles.splice(index, 1);
              return match;
            });
            return findLocalizedFile ?? file;
          })
          .concat(editableLocaleFiles);

  const sidenavData = mergedLocaleFiles.reduce(
    (accu, { title, slug, rawSlug, order }) => {
      const parts = rawSlug.split('/');
      let { items: prevItems } = accu;
      const slicedParts = parts.slice(1, -1);

      for (const part of slicedParts) {
        let tmp = prevItems.find(({ slugPart }) => slugPart === part);
        if (!tmp) {
          tmp = {
            slugPart: part,
            title: normalizeTitle(part),
            items: [],
            slug: `/${currentLocale}/${currentTopSection}`,
            order: null,
          };
          prevItems.push(tmp);
        }
        if (!tmp.items) tmp.items = [];
        prevItems = sortItems(tmp.items);
      }

      const leafPart = parts[parts.length - 1];
      const existingItem = prevItems.find(({ slugPart }) => slugPart === leafPart);

      if (existingItem) {
        existingItem.slug = slug;
        existingItem.title = title;
        existingItem.order = order;
      } else {
        prevItems.push({
          slugPart: leafPart,
          slug,
          items: [],
          title,
          order,
        });
        sortItems(prevItems);
      }

      return accu;
    },
    { items: [] as SidenavItem[] }
  );

  return { sidenavData };
}

