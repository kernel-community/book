"use client";

import { ReactNode } from "react";
import Box from "./Box";

type FlexProps = {
  children?: ReactNode;
  className?: string;
  sx?: Record<string, unknown>;
  as?: keyof JSX.IntrinsicElements;
  [key: string]: unknown;
};

export default function Flex({
  children,
  className = "",
  sx,
  as,
  ...props
}: FlexProps) {
  return (
    <Box
      as={as}
      className={`flex ${className}`}
      sx={{ display: "flex", ...sx }}
      {...props}
    >
      {children}
    </Box>
  );
}

