"use client";

import { ReactNode, isValidElement } from "react";
import { AlertCircle, Lightbulb, Info } from "lucide-react";

type CalloutProps = {
  icon?: "warning" | "lightbulb" | "info" | string;
  variant?: "warning" | "primary" | "secondary";
  children?: ReactNode;
};

const iconMap = {
  warning: AlertCircle,
  lightbulb: Lightbulb,
  info: Info,
};

// Check if children contain a lightbulb emoji
const hasLightbulb = (children: ReactNode): boolean => {
  const checkNode = (node: ReactNode): boolean => {
    if (typeof node === "string") {
      return node.includes("💡");
    }
    if (isValidElement(node)) {
      if (node.props?.children) {
        return checkNode(node.props.children);
      }
    }
    if (Array.isArray(node)) {
      return node.some(checkNode);
    }
    return false;
  };
  return checkNode(children);
};

export default function Callout({ icon, variant, children }: CalloutProps) {
  const IconComponent = icon && iconMap[icon as keyof typeof iconMap];
  const containsLightbulb = hasLightbulb(children);
  
  // If lightbulb emoji is present, use primary green with white text
  // Otherwise default to light green with black text
  const isLightbulbVariant = containsLightbulb || icon === "lightbulb";
  const isWarning = variant === "warning";
  
  const bgColor = isWarning
    ? "bg-yellow-100"
    : variant === "secondary"
    ? "bg-gray-100"
    : isLightbulbVariant
    ? "bg-[#4B5B33]"
    : "bg-[#b5cd91]";
    
  const textColor = isWarning 
    ? "text-black" 
    : isLightbulbVariant 
    ? "text-white" 
    : "text-black";

  return (
    <div
      className={`flex px-6 py-7 mb-6 mt-6 w-full rounded-xl ${bgColor} ${textColor}`}
    >
      {IconComponent && (
        <IconComponent className="min-w-8 min-h-8 mr-2.5 flex-shrink-0" />
      )}
      <div
        className={`flex flex-col justify-center [&>*]:${textColor} [&>*:first-of-type]:mt-0 [&>*:only-child]:m-0`}
      >
        {children}
      </div>
    </div>
  );
}

