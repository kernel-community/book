"use client";

import { ReactNode } from "react";

type CTAProps = {
  children: ReactNode;
  className?: string;
};

export default function CTA({ children, className = "" }: CTAProps) {
  return (
    <div
      className={`p-6 w-full border-2 border-[#4B5B33] bg-green-50 mb-6 rounded-lg [&>*:only-child]:m-0 ${className}`}
    >
      {children}
    </div>
  );
}

