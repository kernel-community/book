"use client";

import { ReactNode } from "react";

type Heading2Props = {
  children?: ReactNode;
  className?: string;
  id?: string;
};

export default function Heading2({ children, className = "", id }: Heading2Props) {
  return (
    <h2
      id={id}
      className={`mb-6 mt-0 first:mt-0 block leading-normal text-3xl font-medium tracking-wide font-heading text-gray-900 ${className} [&>.anchor-link]:opacity-0 [&>.anchor-link]:text-gray-500 [&>.anchor-link]:text-xl [&>.anchor-link]:relative [&>.anchor-link]:left-2.5 [&>.anchor-link]:-top-1 [&:hover>.anchor-link]:opacity-100 [&>.anchor-link:hover]:opacity-100 [&>.anchor-link:hover]:text-[#4B5B33]`}
    >
      {children}
    </h2>
  );
}

