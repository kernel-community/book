"use client";

import NextImage from "next/image";

type ImageProps = {
  src: string;
  alt?: string;
  className?: string;
  width?: number;
  height?: number;
  [key: string]: unknown;
};

export default function Image({
  src,
  alt = "",
  className = "",
  width,
  height,
  ...props
}: ImageProps) {
  // Handle external URLs
  if (src.startsWith("http")) {
    return (
      <img
        src={src}
        alt={alt}
        className={className}
        width={width}
        height={height}
        {...props}
      />
    );
  }

  return (
    <NextImage
      src={src}
      alt={alt}
      width={width || 800}
      height={height || 600}
      className={className}
      {...props}
    />
  );
}

