"use client";

import { ReactNode } from "react";

type SubtitleProps = {
  children: ReactNode;
  className?: string;
  id?: string;
};

export default function Subtitle({ children, className = "", id }: SubtitleProps) {
  return (
    <h3
      id={id}
      className={`mb-3 block leading-normal text-lg font-medium tracking-wide font-sans text-gray-600 mt-4 mb-4 ${className} [&>.anchor-link]:opacity-0 [&>.anchor-link]:text-gray-500 [&>.anchor-link]:text-lg [&>.anchor-link]:relative [&>.anchor-link]:left-2.5 [&>.anchor-link]:-top-0.75 [&:hover>.anchor-link]:opacity-100 [&>.anchor-link:hover]:opacity-100 [&>.anchor-link:hover]:text-[#4B5B33]`}
    >
      {children}
    </h3>
  );
}


