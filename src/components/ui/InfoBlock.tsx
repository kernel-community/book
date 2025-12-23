"use client";

import { Children, ReactNode } from "react";

type InfoBlockProps = {
  children: ReactNode;
};

export default function InfoBlock({ children }: InfoBlockProps) {
  const childrenArray = Children.toArray(children);
  const hasImage = childrenArray.some((child) => {
    if (typeof child === 'object' && child !== null && 'props' in child) {
      const childElement = child as { props?: { mdxType?: string; children?: unknown } };
      return (
        childElement?.props?.mdxType === "Image" ||
        (childElement?.props?.children &&
          !Array.isArray(childElement.props.children) &&
          typeof childElement.props.children === 'object' &&
          childElement.props.children !== null &&
          'props' in childElement.props.children &&
          (childElement.props.children as { props?: { mdxType?: string } })?.props?.mdxType === "img")
      );
    }
    return false;
  });

  return (
    <div
      className={`flex justify-center items-center flex-col md:flex-row w-full px-5 md:px-[2%] py-15 md:py-18 my-6 ${
        hasImage ? "" : "text-center"
      }`}
    >
      {childrenArray.map((child, index) => (
        <div
          key={index}
          className={`w-full md:w-1/2 min-w-0 md:min-w-[300px] mb-0 ${
            hasImage ? "" : "mx-auto"
          } ${
            index === 0
              ? `min-w-0 md:min-w-[250px] ${hasImage ? "mr-0 md:mr-[4%]" : ""}`
              : ""
          } ${
            index === childrenArray.length - 1
              ? `min-w-0 md:min-w-[250px] ${hasImage ? "ml-0 md:ml-[4%]" : ""}`
              : ""
          }`}
        >
          {child}
        </div>
      ))}
      <style jsx>{`
        div :global(img) {
          height: 100%;
          width: 90%;
          object-fit: cover;
          object-position: center;
          order: -1;
        }
        @media (min-width: 640px) {
          div :global(img) {
            width: 50%;
            order: 0;
          }
        }
      `}</style>
    </div>
  );
}

