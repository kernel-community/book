"use client";

import { ReactNode } from "react";

type AlignerProps = {
  children: ReactNode;
  center?: boolean;
  right?: boolean;
  bottom?: boolean;
  yCenter?: boolean;
  xCenter?: boolean;
  className?: string;
  sx?: Record<string, unknown>;
};

export default function Aligner({
  children,
  center,
  right,
  bottom,
  yCenter,
  xCenter,
  className = "",
  sx,
}: AlignerProps) {
  const getJustifyContent = () => {
    if (right) return "justify-end";
    if (xCenter || center) return "justify-center";
    return "";
  };

  const getAlignItems = () => {
    if (bottom) return "items-end";
    if (yCenter || center) return "items-center";
    return "";
  };

  // Convert sx prop to Tailwind classes if provided
  const sxClasses = sx
    ? Object.entries(sx)
        .map(([key, value]) => {
          if (key === "mb" && value === "1rem") return "mb-4";
          if (key === "mb" && typeof value === "number") {
            const spacingMap: Record<number, string> = {
              1: "mb-1",
              2: "mb-2",
              3: "mb-3",
              4: "mb-4",
              6: "mb-6",
              8: "mb-8",
            };
            return spacingMap[value] || "";
          }
          return "";
        })
        .filter(Boolean)
        .join(" ")
    : "";

  const justifyClass = getJustifyContent();
  const alignClass = getAlignItems();

  return (
    <div
      className={`flex mb-4 ${justifyClass} ${alignClass} ${sxClasses} ${className}`.trim()}
    >
      {children}
    </div>
  );
}

