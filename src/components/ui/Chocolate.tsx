"use client";

import { Children, ReactNode } from "react";

type ChocolateProps = {
  children: ReactNode;
  sx?: Record<string, unknown>;
};

export default function Chocolate({ children, sx }: ChocolateProps) {
  const childrenArray = Children.toArray(children);

  const getGridCols = () => {
    if (childrenArray.length === 1) return "grid-cols-1";
    if (childrenArray.length === 2 || childrenArray.length === 4)
      return "grid-cols-1 md:grid-cols-2";
    return "grid-cols-1 md:grid-cols-3";
  };

  const marginBottom = sx?.marginBottom ? `mb-[${sx.marginBottom}]` : "mb-6";

  return (
    <div
      className={`grid gap-6 ${getGridCols()} ${marginBottom} [&>*>*>*>img]:w-full [&>*>*>*>img]:h-full [&>*>*>*>img]:object-cover [&>*>*>*>img]:object-center`}
    >
      {children}
    </div>
  );
}

