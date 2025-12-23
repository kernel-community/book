"use client";

import { ReactNode } from "react";

type BoxProps = {
  children?: ReactNode;
  className?: string;
  sx?: Record<string, unknown>;
  as?: keyof JSX.IntrinsicElements;
  [key: string]: unknown;
};

// Convert theme-ui sx prop values to Tailwind classes
const sxToTailwind = (sx: Record<string, unknown>): string => {
  const classes: string[] = [];

  Object.entries(sx).forEach(([key, value]) => {
    if (value === undefined || value === null) return;

    // Display
    if (key === "display") {
      if (value === "flex") classes.push("flex");
      if (value === "block") classes.push("block");
      if (value === "inline") classes.push("inline");
      if (value === "inline-block") classes.push("inline-block");
      if (value === "grid") classes.push("grid");
    }

    // Flexbox
    if (key === "flexDirection") {
      if (value === "row") classes.push("flex-row");
      if (value === "column") classes.push("flex-col");
    }
    if (key === "justifyContent") {
      if (value === "center") classes.push("justify-center");
      if (value === "space-between") classes.push("justify-between");
      if (value === "flex-start") classes.push("justify-start");
      if (value === "flex-end") classes.push("justify-end");
    }
    if (key === "alignItems") {
      if (value === "center") classes.push("items-center");
      if (value === "flex-start") classes.push("items-start");
      if (value === "flex-end") classes.push("items-end");
    }

    // Spacing (theme-ui uses numbers, we'll map common ones)
    if (
      key === "p" ||
      key === "px" ||
      key === "py" ||
      key === "pt" ||
      key === "pb" ||
      key === "pl" ||
      key === "pr" ||
      key === "m" ||
      key === "mx" ||
      key === "my" ||
      key === "mt" ||
      key === "mb" ||
      key === "ml" ||
      key === "mr"
    ) {
      const spacingMap: Record<number, string> = {
        1: "0.25rem", 2: "0.5rem", 3: "0.75rem", 4: "1rem",
        5: "1.25rem", 6: "1.5rem", 8: "2rem", 12: "3rem", 16: "4rem", 24: "6rem"
      };
      if (typeof value === "number" && spacingMap[value]) {
        const spacing = spacingMap[value];
        if (key === "p") classes.push(`p-[${spacing}]`);
        if (key === "px") classes.push(`px-[${spacing}]`);
        if (key === "py") classes.push(`py-[${spacing}]`);
        if (key === "pt") classes.push(`pt-[${spacing}]`);
        if (key === "pb") classes.push(`pb-[${spacing}]`);
        if (key === "pl") classes.push(`pl-[${spacing}]`);
        if (key === "pr") classes.push(`pr-[${spacing}]`);
        if (key === "m") classes.push(`m-[${spacing}]`);
        if (key === "mx") classes.push(`mx-[${spacing}]`);
        if (key === "my") classes.push(`my-[${spacing}]`);
        if (key === "mt") classes.push(`mt-[${spacing}]`);
        if (key === "mb") classes.push(`mb-[${spacing}]`);
        if (key === "ml") classes.push(`ml-[${spacing}]`);
        if (key === "mr") classes.push(`mr-[${spacing}]`);
      } else if (typeof value === "string") {
        // Handle string values like "24px"
        if (key === "p") classes.push(`p-[${value}]`);
        if (key === "px") classes.push(`px-[${value}]`);
        if (key === "py") classes.push(`py-[${value}]`);
        if (key === "pt") classes.push(`pt-[${value}]`);
        if (key === "pb") classes.push(`pb-[${value}]`);
        if (key === "pl") classes.push(`pl-[${value}]`);
        if (key === "pr") classes.push(`pr-[${value}]`);
        if (key === "m") classes.push(`m-[${value}]`);
        if (key === "mx") classes.push(`mx-[${value}]`);
        if (key === "my") classes.push(`my-[${value}]`);
        if (key === "mt") classes.push(`mt-[${value}]`);
        if (key === "mb") classes.push(`mb-[${value}]`);
        if (key === "ml") classes.push(`ml-[${value}]`);
        if (key === "mr") classes.push(`mr-[${value}]`);
      }
    }

    // Width/Height
    if (key === "width") {
      if (value === "100%") classes.push("w-full");
      else if (typeof value === "string") {
        classes.push(`w-[${value}]`);
      }
    }
    if (key === "height" && value === "100%") classes.push("h-full");
    if (key === "maxWidth") {
      if (value === "100%") classes.push("max-w-full");
      else if (typeof value === "string") classes.push(`max-w-[${value}]`);
    }
    if (key === "overflow") {
      if (value === "hidden") classes.push("overflow-hidden");
      if (value === "auto") classes.push("overflow-auto");
      if (value === "scroll") classes.push("overflow-scroll");
    }

    // Primary color only
    if (key === "bg" || key === "backgroundColor") {
      if (value === "primary" || value === "primaryMuted") {
        classes.push("bg-[#4B5B33]");
      }
    }

    // Border
    if (key === "border" && value) classes.push("border");
    if (key === "borderColor") {
      if (value === "muted") classes.push("border-gray-300");
      if (value === "primary") classes.push("border-[#4B5B33]");
    }
    if (key === "borderRadius") {
      if (value === "12px" || value === 3) classes.push("rounded-xl");
      if (value === "4px" || value === 1) classes.push("rounded");
    }
  });

  return classes.join(" ");
};

export default function Box({
  children,
  className = "",
  sx,
  as: Component = "div",
  ...props
}: BoxProps) {
  const sxClasses = sx ? sxToTailwind(sx) : "";

  return (
    <Component className={`box-component ${className} ${sxClasses}`.trim()} {...props}>
      {children}
    </Component>
  );
}
