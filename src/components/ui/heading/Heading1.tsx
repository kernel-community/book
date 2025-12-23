"use client";

import { ReactNode } from "react";

type Heading1Props = {
  children?: ReactNode;
  className?: string;
  id?: string;
};

export default function Heading1({ children, className = "", id }: Heading1Props) {
  return (
    <h1
      id={id}
      className={`mb-6 mt-0 first:mt-0 block leading-normal text-5xl tracking-wide font-medium font-heading text-gray-900 ${className} [&>.anchor-link]:opacity-0 [&>.anchor-link]:text-gray-500 [&>.anchor-link]:text-2xl [&>.anchor-link]:relative [&>.anchor-link]:left-2.5 [&>.anchor-link]:-top-1.5 [&:hover>.anchor-link]:opacity-100 [&>.anchor-link:hover]:opacity-100 [&>.anchor-link:hover]:text-[#4B5B33]`}
    >
      {children}
    </h1>
  );
}

