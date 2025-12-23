"use client";

import { ReactNode } from "react";

type Heading3Props = {
  children?: ReactNode;
  className?: string;
  id?: string;
};

export default function Heading3({ children, className = "", id }: Heading3Props) {
  return (
    <h3
      id={id}
      className={`mb-6 mt-6 block leading-normal text-2xl font-medium tracking-wide font-heading text-gray-900 ${className} [&>.anchor-link]:opacity-0 [&>.anchor-link]:text-gray-500 [&>.anchor-link]:text-lg [&>.anchor-link]:relative [&>.anchor-link]:left-2.5 [&>.anchor-link]:-top-0.75 [&:hover>.anchor-link]:opacity-100 [&>.anchor-link:hover]:opacity-100 [&>.anchor-link:hover]:text-[#4B5B33]`}
    >
      {children}
    </h3>
  );
}

