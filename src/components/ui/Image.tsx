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
    /* eslint-disable-next-line @next/next/no-img-element */
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

