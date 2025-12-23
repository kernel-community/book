"use client";

import { Children, ReactNode } from "react";

type ProcessProps = {
  children: ReactNode;
};

export default function Process({ children }: ProcessProps) {
  const childrenArray = Children.toArray(children);

  return (
    <>
      <style>{`
        .process-content-wrapper.prose p,
        .process-content-wrapper p {
          margin-top: 1.5rem !important;
        }
      `}</style>
      <div className="mt-8 mb-8">
        {childrenArray.map((child, index) => (
          <div key={`process-child-${index}`} className="flex flex-row items-center">
            <div className="text-2xl font-medium w-10 min-w-10 h-10 leading-10 flex-shrink-0 rounded-full text-white text-center bg-[#4B5B33] flex items-center justify-center">
              {index + 1}
            </div>
            <div className="ml-3 border-b border-gray-300 w-full pb-8 process-content-wrapper">
              {child}
            </div>
          </div>
        ))}
      </div>
    </>
  );
}

