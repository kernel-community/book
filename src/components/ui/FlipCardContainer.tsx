"use client";

import { useState, useEffect } from "react";
import FlipCard from "./FlipCard";
import { cardData } from "./cardData";

export default function FlipCardContainer() {
  const [windowSize, setWindowSize] = useState<{ width?: number }>({
    width: undefined,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({
        width: window.innerWidth,
      });
    }

    window.addEventListener("resize", handleResize);
    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const gridStyles =
    (windowSize.width ?? 0) >= 640
      ? "grid grid-cols-3 gap-4 w-full mx-auto"
      : "grid grid-cols-1 gap-2 w-full max-w-[75%] mx-auto";

  return (
    <div className="w-full flex flex-col items-center p-3 py-1">
      <div className={gridStyles}>
        {cardData.map((card, index) => (
          <FlipCard key={index} {...card} />
        ))}
      </div>
    </div>
  );
}


