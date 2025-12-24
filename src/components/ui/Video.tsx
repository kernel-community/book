"use client";

type VideoProps = {
  src: string;
  className?: string;
  [key: string]: unknown;
};

export default function Video({ src, className = "", ...props }: VideoProps) {
  return (
    <div className={`video-component w-full aspect-video mb-4 ${className}`}>
      <iframe
        src={src}
        className="w-full h-full"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        {...props}
      />
    </div>
  );
}

