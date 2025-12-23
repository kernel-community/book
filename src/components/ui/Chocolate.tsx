"use client";

import { Children, ReactNode } from "react";

type ChocolateProps = {
  children: ReactNode;
};

export default function Chocolate({ children }: ChocolateProps) {
  const childrenArray = Children.toArray(children);

  const getGridCols = () => {
    if (childrenArray.length === 1) return "grid-cols-1";
    if (childrenArray.length === 2 || childrenArray.length === 4)
      return "grid-cols-1 md:grid-cols-2";
    return "grid-cols-1 md:grid-cols-3";
  };

  return (
    <div
      className={`grid gap-4 ${getGridCols()} mb-4 [&>*>*>*>img]:w-full [&>*>*>*>img]:h-full [&>*>*>*>img]:object-cover [&>*>*>*>img]:object-center`}
    >
      {children}
    </div>
  );
}

