"use client";

import { Children, ReactNode } from "react";

type CategoriesProps = {
  children: ReactNode;
  minBoxSize?: string;
};

export default function Categories({
  children,
  minBoxSize = "321px",
}: CategoriesProps) {
  const childrenArray = Children.toArray(children);

  const getColumnWidth = () => {
    if (childrenArray.length === 1) {
      return `minmax(${minBoxSize}, 1fr)`;
    }
    if (childrenArray.length === 2 || childrenArray.length === 4) {
      return `minmax(${minBoxSize}, 1fr) minmax(${minBoxSize}, 1fr)`;
    }
    return `minmax(${minBoxSize}, 1fr) minmax(${minBoxSize}, 1fr) minmax(${minBoxSize}, 1fr)`;
  };

  const childElementStyles =
    "relative items-center min-h-[260px] border border-gray-300 bg-white p-5 px-8 rounded [&>*>div]:text-gray-600 [&>*>div]:mb-2 [&>*>div:nth-of-type(2)>a]:font-medium [&>*>div:nth-of-type(2)>a]:text-2xl [&>*>div:nth-of-type(3)>a]:font-medium [&>*>div:nth-of-type(3)>a]:text-2xl [&>*>.statusBanner:first-of-type]:absolute [&>*>.statusBanner:first-of-type]:max-w-[65.29%] [&>*>.statusBanner:first-of-type]:text-white [&>*>.statusBanner:first-of-type]:right-4 [&>*>.statusBanner:first-of-type]:top-4 [&>*>.statusBanner:first-of-type]:w-auto [&>*>*:only-child]:m-0 [&>*>svg:first-of-type]:w-16 [&>*>svg:first-of-type]:h-auto [&>*>svg:nth-of-type(2)]:w-16 [&>*>svg:nth-of-type(2)]:h-auto";

  if (childrenArray.length > 4 && childrenArray.length % 3 !== 0) {
    return (
      <div className="flex items-center justify-center w-[107.58%] -ml-[calc(7.58%/2)] flex-row flex-wrap">
        {childrenArray.map((child, index) => (
          <div
            key={`category-child-${index}`}
            className={`${childElementStyles} ${
              index % 3 !== 2 ? "mr-4" : ""
            } mb-5 max-w-[calc(33%-8px)]`}
            style={{ minWidth: minBoxSize }}
          >
            {child}
          </div>
        ))}
      </div>
    );
  }

  return (
    <div
      className="grid gap-5 gap-x-4 mx-auto w-[107.58%] -ml-[calc(7.58%/2)] mb-17"
      style={{ gridTemplateColumns: getColumnWidth() }}
    >
      {childrenArray.map((child, index) => (
        <div key={`category-child-${index}`} className={`flex ${childElementStyles}`}>
          {child}
        </div>
      ))}
    </div>
  );
}


