"use client";

import { useState } from "react";
import Link from "next/link";
import { RotateCcw } from "lucide-react";

type FlipCardProps = {
  link: string;
  title: string;
  emoji: string;
  personalInquiry?: string | null;
  personalInquiryLink?: string;
  webInquiry?: string | null;
  webInquiryLink?: string;
  backLinks?: Array<{ link: string; title: string }>;
};

export default function FlipCard({
  link,
  title,
  emoji,
  personalInquiry = null,
  personalInquiryLink = "",
  webInquiry = null,
  webInquiryLink = "",
  backLinks = [],
}: FlipCardProps) {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div className="perspective-1000 w-full h-[345px]">
      <div
        className={`relative w-full h-full transition-transform duration-600 preserve-3d ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        {/* FRONT */}
        <div className="backface-hidden preserve-3d rounded-md shadow-lg border-2 border-gray-200 absolute inset-0 bg-white">
          <button
            type="button"
            aria-label="Flip card"
            aria-pressed={isFlipped}
            className="absolute top-2 right-2 p-1.5 rounded-full bg-transparent border-none cursor-pointer hover:bg-gray-200"
            onClick={() => setIsFlipped(true)}
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          <div className="text-center font-black text-2xl p-8 border-b-2 border-gray-200 h-[175px]">
            <Link href={link} className="no-underline text-inherit">
              {emoji} {title}
            </Link>
          </div>

          <div className="grid grid-cols-2 h-[170px] border-r border-gray-200">
            {personalInquiry && (
              <div className="p-8 text-center border-r border-gray-200">
                <div className="text-sm mb-6">Personal</div>
                <Link
                  href={personalInquiryLink}
                  className="font-semibold text-sm no-underline text-inherit"
                >
                  {personalInquiry}
                </Link>
              </div>
            )}
            {webInquiry && (
              <div className="p-8 text-center">
                <div className="text-sm mb-6">Web3</div>
                <Link
                  href={webInquiryLink}
                  className="font-semibold text-sm no-underline text-inherit"
                >
                  {webInquiry}
                </Link>
              </div>
            )}
          </div>
        </div>

        {/* BACK */}
        <div className="backface-hidden preserve-3d rounded-md shadow-lg border-2 border-gray-200 absolute inset-0 bg-gray-100 rotate-y-180 p-4 pb-1">
          <button
            type="button"
            aria-label="Flip card back to front"
            aria-pressed={!isFlipped}
            className="absolute top-2 right-2 p-1.5 rounded-full bg-transparent border-none cursor-pointer hover:bg-gray-300"
            onClick={() => setIsFlipped(false)}
          >
            <RotateCcw className="w-5 h-5" />
          </button>

          <div className="text-center font-black text-2xl mt-2 mb-4">
            Extended Reading
          </div>
          <ul className="list-disc list-inside px-4">
            {backLinks.map((item, index) => (
              <li key={index} className="my-2">
                <Link
                  href={item.link}
                  className="text-blue-600 underline no-underline"
                >
                  {item.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <style jsx>{`
        .perspective-1000 {
          perspective: 1000px;
        }
        .preserve-3d {
          transform-style: preserve-3d;
        }
        .backface-hidden {
          backface-visibility: hidden;
        }
        .rotate-y-180 {
          transform: rotateY(180deg);
        }
        .duration-600 {
          transition-duration: 0.6s;
        }
      `}</style>
    </div>
  );
}



