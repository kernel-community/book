"use client";

import { Children, ReactNode } from "react";

type ToutProps = {
  children: ReactNode;
};

export default function Tout({ children }: ToutProps) {
  const childrenArray = Children.toArray(children);
  const isGrid = childrenArray.length > 1;

  const ToutElement = ({ children }: { children: ReactNode }) => (
    <div
      className={`bg-[#4B5B33] text-white rounded-xl border border-gray-300 shadow-md ${
        !isGrid ? "mb-6" : ""
      } p-4 [&>*:only-child]:m-0 [&>*:last-child]:m-0 [&>*>*:last-child]:m-0 [&_h2]:mb-3 [&_p:not(:last-child)]:mb-2`}
    >
      {children}
    </div>
  );

  if (isGrid) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6 auto-rows-min">
        {childrenArray.map((child, index) => (
          <ToutElement key={`tout-child-${index}`}>{child}</ToutElement>
        ))}
      </div>
    );
  }

  return <ToutElement>{children}</ToutElement>;
}

