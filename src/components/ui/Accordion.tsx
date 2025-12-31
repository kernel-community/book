"use client";

import { useState, Children, ReactNode } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

type AccordionProps = {
  children: ReactNode;
  defaultOpen?: boolean;
  openIcon?: ReactNode;
  closeIcon?: ReactNode;
};

export default function Accordion({
  children,
  defaultOpen = false,
}: AccordionProps) {
  const [expanded, setExpanded] = useState(defaultOpen);
  const childrenArray = Children.toArray(children);
  const header = childrenArray[0];
  const content = childrenArray.slice(1);

  return (
    <div className="border-b border-gray-300 bg-white">
      <div
        className="flex justify-between items-start cursor-pointer relative px-3 py-2.5"
        onClick={() => setExpanded(!expanded)}
      >
        <div className="pr-3 [&>*:only-child]:m-0">{header}</div>
        <div className="relative top-1">
          {expanded ? (
            <ChevronUp className="w-5 h-5 text-gray-600" />
          ) : (
            <ChevronDown className="w-5 h-5 text-gray-500" />
          )}
        </div>
      </div>
      {expanded && (
        <div className="pb-6 px-3 text-base text-gray-600 [&>*:only-child]:m-0">
          {content}
        </div>
      )}
    </div>
  );
}


