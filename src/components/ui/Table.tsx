"use client";

import { ReactNode } from "react";

type TableProps = {
  children: ReactNode;
};

export default function Table({ children }: TableProps) {
  return (
    <table className="border-collapse text-base text-left [&_td]:text-gray-600 [&_td]:border [&_td]:border-gray-300 [&_td]:py-3 [&_td]:px-6 [&_th]:text-gray-900 [&_th]:not-italic [&_th]:font-semibold [&_th]:border [&_th]:border-gray-300 [&_th]:py-3 [&_th]:px-6">
      {children}
    </table>
  );
}

