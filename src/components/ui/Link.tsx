"use client";

import NextLink from "next/link";
import { ReactNode } from "react";

type LinkProps = {
  to?: string;
  href?: string;
  children: ReactNode;
  className?: string;
  [key: string]: unknown;
};

export default function Link({
  to,
  href,
  children,
  className = "",
  ...props
}: LinkProps) {
  const link = to || href || "";
  const isInternal = link && /^\/(?!\/)/.test(link);

  if (isInternal) {
    return (
      <NextLink href={link} className={className} {...props}>
        {children}
      </NextLink>
    );
  }

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={className}
      {...props}
    >
      {children}
    </a>
  );
}

