"use client";

import { ReactNode } from "react";

type CodeProps = {
  children: ReactNode;
};

export default function Code({ children }: CodeProps) {
  return (
    <pre className="inline-block whitespace-pre-wrap break-all m-0">
      <code className="text-gray-800 bg-gray-100 text-base font-normal font-mono p-1 px-2 mt-0 rounded w-full">
        {children}
      </code>
    </pre>
  );
}



