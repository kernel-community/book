"use client";

import { ReactNode } from "react";

type Heading5Props = {
  children?: ReactNode;
  className?: string;
  id?: string;
};

export default function Heading5({ children, className = "", id }: Heading5Props) {
  return (
    <h5
      id={id}
      className={`mb-6 mt-6 block text-xl font-normal leading-normal ${className} [&>.anchor-link]:opacity-0 [&>.anchor-link]:text-gray-500 [&>.anchor-link]:text-2xl [&>.anchor-link]:relative [&>.anchor-link]:left-2.5 [&>.anchor-link]:-top-2 [&:hover>.anchor-link]:opacity-100 [&>.anchor-link:hover]:opacity-100 [&>.anchor-link:hover]:text-[#4B5B33]`}
    >
      {children}
    </h5>
  );
}

