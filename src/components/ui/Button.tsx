"use client";

import Link from "next/link";
import { ReactNode } from "react";
import { ArrowRight } from "lucide-react";
import { usePathname } from "next/navigation";
import { getInitialLocale, isLocalePrefixed, prefixLocale } from "@/utils/locale";

type ButtonProps = {
  to?: string;
  href?: string;
  variant?: "primary" | "secondary" | "outline" | "text";
  secondary?: boolean;
  outline?: boolean;
  text?: boolean;
  small?: boolean;
  disabled?: boolean;
  children: ReactNode;
  icon?: ReactNode;
  hideExternalIcon?: boolean;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void;
  type?: "primary" | "secondary";
};

export default function Button({
  to,
  href,
  variant,
  secondary,
  outline,
  text,
  small,
  disabled,
  children,
  icon,
  hideExternalIcon,
  className = "",
  onClick,
  type,
}: ButtonProps) {
  const link = to || href;
  const isInternal = link && /^\/(?!\/)/.test(link);
  const showIcon = icon || (!isInternal && !hideExternalIcon && !small);
  const pathname = usePathname();
  const currentLocale = getInitialLocale(pathname);

  const localize = (target?: string) => {
    if (!target) return target;
    if (!target.startsWith("/")) return target;
    if (isLocalePrefixed(target, currentLocale)) return target;
    return prefixLocale(target, currentLocale);
  };

  const baseClasses = `inline-flex items-center font-bold ${
    small ? "text-sm px-3 py-1.5" : "px-4 py-3"
  } rounded-full transition-colors ${disabled ? "opacity-50 cursor-not-allowed" : ""}`;

  const variantClasses =
    variant === "secondary" || secondary || type === "secondary"
      ? "bg-gray-200 text-gray-900 hover:bg-gray-300"
      : outline
      ? "border-2 border-[#4B5B33] text-[#4B5B33] hover:bg-[#4B5B33]/10"
      : text
      ? "text-[#4B5B33] hover:underline"
      : "bg-[#4B5B33] text-white hover:bg-[#4B5B33]/90";

  const buttonContent = (
    <>
      {showIcon && icon && <span className="mr-2">{icon}</span>}
      <span>{children}</span>
      {showIcon && !icon && !isInternal && (
        <ArrowRight className="ml-2 w-5 h-5" />
      )}
    </>
  );

  if (!link) {
    return (
      <button
        className={`${baseClasses} ${variantClasses} ${className}`}
        disabled={disabled}
        onClick={onClick}
      >
        {buttonContent}
      </button>
    );
  }

  if (isInternal) {
    // If href is "#" and onClick is provided, render as button
    if (link === "#" && onClick) {
      return (
        <button
          className={`${baseClasses} ${variantClasses} ${className} ${
            disabled ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={disabled}
          onClick={onClick}
        >
          {buttonContent}
        </button>
      );
    }
    return (
      <Link
        href={localize(link) || "#"}
        className={`${baseClasses} ${variantClasses} ${className} ${
          disabled ? "pointer-events-none" : ""
        }`}
        onClick={onClick}
      >
        {buttonContent}
      </Link>
    );
  }

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className={`${baseClasses} ${variantClasses} ${className} ${
        disabled ? "pointer-events-none" : ""
      }`}
    >
      {buttonContent}
    </a>
  );
}

