"use client";

import { ReactNode } from "react";
import { slugify, getTextFromChildren } from "@/utils/slugify";
import Link from "next/link";

type Heading3Props = {
  children?: ReactNode;
  className?: string;
  id?: string;
};

export default function Heading3({ children, className = "", id }: Heading3Props) {
  // Generate ID from children text if not provided
  const headingId = id || (children ? slugify(getTextFromChildren(children)) : undefined);
  
  return (
    <h3
      id={headingId}
      className={`mb-6 mt-6 block leading-normal text-2xl font-medium tracking-wide font-heading text-gray-900 ${className} [&>.anchor-link]:opacity-0 [&>.anchor-link]:text-gray-500 [&>.anchor-link]:text-lg [&>.anchor-link]:relative [&>.anchor-link]:left-2.5 [&>.anchor-link]:-top-0.75 [&:hover>.anchor-link]:opacity-100 [&>.anchor-link:hover]:opacity-100 [&>.anchor-link:hover]:text-[#4B5B33]`}
    >
      {children}
      {headingId && (
        <Link
          href={`#${headingId}`}
          className="anchor-link ml-2 no-underline"
          aria-label={`Link to ${getTextFromChildren(children)}`}
        >
          #
        </Link>
      )}
    </h3>
  );
}

