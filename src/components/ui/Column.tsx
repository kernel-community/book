"use client";

import { Children, ReactNode } from "react";

type ColumnProps = {
  children: ReactNode;
  sx?: { gap?: string };
};

export default function Column({ children, sx }: ColumnProps) {
  const childrenArray = Children.toArray(children);
  const gap = sx?.gap || "24px";

  const containerStyles =
    "rounded-xl text-gray-900 px-7 py-2.5 shadow-md border border-gray-300 [&>*:only-child]:m-0 [&>*:only-child>*]:m-0";

  const desktopCols = childrenArray.length > 1 ? "md:grid-cols-2" : "md:grid-cols-1";

  return (
    <div className={`grid gap-6 mb-4 grid-cols-1 ${desktopCols}`} style={{ gap }}>
      {childrenArray.map((child, index) => {
        // Type guard for React elements with props
        if (typeof child === 'object' && child !== null && 'props' in child) {
          const childElement = child as { props?: { children?: ReactNode } };
          const childProps = childElement.props?.children;
          const childChildren = childProps ? Children.toArray(childProps) : [];
          if (
            typeof childProps !== "string" &&
            childChildren.length > 0
          ) {
            const headerElement = childChildren[0];
            const childElements = childChildren.slice(1);

            return (
              <div
                key={`column-child-element-${index}`}
                className="rounded-xl overflow-hidden shadow-md border border-gray-300 bg-gray-50"
              >
                <div className="text-white bg-[#4B5B33] pt-4 pb-2 px-7 [&>*:only-child]:m-0 [&>*:only-child>*]:m-0">
                  {headerElement}
                </div>
                <div className="px-7 pt-3 pb-7 text-gray-900 [&>*:only-child]:m-0 [&>*:last-child]:m-0">
                  {childElements}
                </div>
              </div>
            );
          }
        }

        return (
          <div key={`column-child-element-${index}`} className={containerStyles}>
            {child}
          </div>
        );
      })}
    </div>
  );
}
