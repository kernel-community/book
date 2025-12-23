"use client";

import { ReactNode } from "react";

type StatusBannerProps = {
  warning?: boolean;
  sticky?: boolean;
  children: ReactNode;
  hideSpacer?: boolean;
  variant?: "warning" | "primary" | "success" | "successAlt";
};

export default function StatusBanner({
  warning,
  sticky,
  children,
  hideSpacer,
  variant,
}: StatusBannerProps) {
  const variantKey = variant || (warning ? "warning" : null) || "primary";

  const bgColor =
    variantKey === "warning"
      ? "bg-yellow-100"
      : variantKey === "success"
      ? "bg-green-100"
      : variantKey === "successAlt"
      ? "bg-green-50"
      : "bg-[#4B5B33]";

  const textColor =
    variantKey === "warning" || variantKey === "successAlt"
      ? "text-black"
      : variantKey === "primary"
      ? "text-white"
      : "text-gray-900";

  const BannerElement = () => (
    <div
      className={`px-6 py-2 relative overflow-hidden ${bgColor} rounded-xl ${textColor} text-base tracking-wide mb-3 w-full [&>*:last-child]:mb-0 [&_a]:underline [&_a]:${textColor} [&_a.active]:${textColor} [&_a:hover]:${textColor} [&_a:hover>svg]:${textColor}`}
    >
      {children}
    </div>
  );

  if (sticky) {
    return (
      <div className="w-full [&>*]:z-[100]">
        {!hideSpacer && <div className="h-6"></div>}
        <div className="sticky top-0 shadow-md">
          <BannerElement />
        </div>
        {!hideSpacer && <div className="h-6"></div>}
      </div>
    );
  }

  return <BannerElement />;
}

