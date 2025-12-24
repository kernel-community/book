"use client";

type SoundProps = {
  src: string;
  title?: string;
};

// This sound component is a basic recreation of what the remark-gatsby-video plugin creates.
// We inline the allowances and styles as needed, but this can be used for anything that can be embed into an iframe.
const Sound = ({ src, title }: SoundProps) => {
  return (
    <div className="relative h-0 overflow-hidden mb-4 pb-[40%] md:pb-[20%] lg:pb-[10%]">
      <iframe
        src={src}
        title={title || "Inlined Iframe Video"}
        allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        className="absolute top-0 left-0 w-full h-full border-0"
      />
    </div>
  );
};

export default Sound;
