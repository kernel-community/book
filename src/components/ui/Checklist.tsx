"use client";

import { Children, ReactNode } from "react";

type ChecklistProps = {
  children: ReactNode;
};

export default function Checklist({ children }: ChecklistProps) {
  const childrenArray = Children.toArray(children);

  return (
    <ul className="list-none p-8 mb-6 flex flex-col border border-gray-300 bg-white rounded">
      {childrenArray.map((child, index) => (
        <li
          key={`checklist-child-${index}`}
          className="mb-6 text-gray-600 last:mb-0 flex"
        >
          <div className="w-6 h-6 bg-white rounded border border-gray-600 mr-3.5 flex-shrink-0"></div>
          <div className="flex-1 [&>*:only-child]:m-0 [&>*:only-child>*]:m-0">
            {child}
          </div>
        </li>
      ))}
    </ul>
  );
}

