"use client";

import { Children, ReactNode } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

type ListProps = {
  children: ReactNode;
};

const ListElement = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <div className={`px-2 py-6 min-h-[60px] border-t border-gray-300 flex flex-col items-start [&>*>*:only-child]:font-normal [&>*>*:only-child]:text-lg [&>*>*:only-child]:text-gray-600 [&>*>*:only-child]:leading-normal [&>*>*:only-child]:mb-0 [&>*>*:not(:only-child):nth-of-type(1)]:mb-2 [&>*>*:not(:only-child):nth-of-type(1)]:font-normal [&>*>*:not(:only-child):nth-of-type(1)]:text-lg [&>*>*:not(:only-child):nth-of-type(1)]:text-gray-600 [&>*>*:not(:nth-of-type(1))]:font-normal [&>*>*:not(:nth-of-type(1))]:text-base [&>*>*:not(:nth-of-type(1))]:text-gray-600 ${className}`}>
    {children}
  </div>
);

const AdvancedListElement = ({
  childData,
  linkData,
}: {
  childData: { heading?: ReactNode; _children?: ReactNode };
  linkData: { href?: string; to?: string; children?: ReactNode; [key: string]: unknown } | null;
}) => {
  const ListEl = ({ children, className = "" }: { children?: ReactNode; className?: string }) => (
    <ListElement className={className}>
      {children ? (
        <div className="flex flex-row w-full">
          {children}
          <div className="flex flex-col items-start flex-1 group-hover:text-[#4B5B33] [&>*:only-child]:font-normal [&>*:only-child]:text-lg [&>*:only-child]:text-gray-600 [&>*:only-child]:leading-normal [&>*:not(:nth-of-type(1))]:font-normal [&>*:not(:nth-of-type(1))]:text-base [&>*:not(:nth-of-type(1))]:text-gray-600 [&>*:only-child]:mb-0 [&>*:only-child>*:last-child]:mb-0 group-hover:[&_p]:text-[#4B5B33] group-hover:[&_h1]:text-[#4B5B33] group-hover:[&_h2]:text-[#4B5B33] group-hover:[&_h3]:text-[#4B5B33] group-hover:[&_h4]:text-[#4B5B33] group-hover:[&_h5]:text-[#4B5B33] group-hover:[&_h6]:text-[#4B5B33] group-hover:[&_span]:text-[#4B5B33] group-hover:[&_p]:underline group-hover:[&_h1]:underline group-hover:[&_h2]:underline group-hover:[&_h3]:underline group-hover:[&_h4]:underline group-hover:[&_h5]:underline group-hover:[&_h6]:underline group-hover:[&_span]:underline">
            {childData.heading && (
              <div className="m-0 [&>*]:m-0 [&>*]:mb-2 [&>*]:leading-normal">
                {childData.heading}
              </div>
            )}
            <div className="w-full [&>*:only-child]:mb-0">{childData._children}</div>
          </div>
        </div>
      ) : (
        <div className="w-full group-hover:text-[#4B5B33] [&>*:only-child]:mb-0 [&>*:only-child>*:last-child]:mb-0 group-hover:[&_p]:text-[#4B5B33] group-hover:[&_h1]:text-[#4B5B33] group-hover:[&_h2]:text-[#4B5B33] group-hover:[&_h3]:text-[#4B5B33] group-hover:[&_h4]:text-[#4B5B33] group-hover:[&_h5]:text-[#4B5B33] group-hover:[&_h6]:text-[#4B5B33] group-hover:[&_span]:text-[#4B5B33] group-hover:[&_p]:underline group-hover:[&_h1]:underline group-hover:[&_h2]:underline group-hover:[&_h3]:underline group-hover:[&_h4]:underline group-hover:[&_h5]:underline group-hover:[&_h6]:underline group-hover:[&_span]:underline">
          {childData.heading && (
            <div className="p-0 mb-2 [&_p]:font-normal [&_p]:text-lg [&_p]:text-gray-900 [&_p]:leading-normal [&_ol,&_ul]:p-0 [&_ol,&_ul]:pl-3 [&_ol,&_ul]:m-0 m-0 [&>*]:m-0 [&>*]:leading-normal">
              {childData.heading}
            </div>
          )}
          <div className="w-full font-normal text-base text-gray-600 [&>*:only-child]:mb-0">
            {childData._children}
          </div>
        </div>
      )}
    </ListElement>
  );

  if (linkData !== null && linkData.href) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { children: _unused, ...linkProps } = linkData;
    const href = linkProps.href || linkProps.to;

    if (href && /^\/(?!\/)/.test(href)) {
      return (
        <Link
          href={href}
          className="group block w-full transition-all duration-100 [&>*]:w-full"
        >
          <ListEl className="group-hover:bg-[#b5cd91] group-hover:[&_*]:text-[#4B5B33] group-hover:[&_p]:underline group-hover:[&_span]:underline group-hover:[&_div]:underline transition-colors duration-100">
            <ArrowRight className="mr-7 ml-1.5 w-5 h-5 flex-shrink-0 group-hover:text-[#4B5B33]" />
          </ListEl>
        </Link>
      );
    }

    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="group block w-full transition-all duration-100 [&>*]:w-full"
      >
        <ListEl className="group-hover:bg-[#b5cd91] group-hover:[&_*]:text-[#4B5B33] group-hover:[&_*]:underline transition-colors duration-100">
          <ArrowRight className="mr-7 ml-1.5 w-5 h-5 flex-shrink-0 group-hover:text-[#4B5B33]" />
        </ListEl>
      </a>
    );
  }

  return <ListEl />;
};

export default function List({ children }: ListProps) {
  const childrenArray = Children.toArray(children);

  const childListLinkRenderCheck = (child: unknown, index: number) => {
    // Type guard for React elements with props
    if (typeof child !== 'object' || child === null || !('props' in child)) {
      return <ListElement key={`list-element-${index}`}>{child as ReactNode}</ListElement>;
    }

    const childElement = child as { props?: { mdxType?: string; children?: unknown; [key: string]: unknown } };
    
    // Type guard for nested children with props (for MDLink case)
    const hasNestedProps = (children: unknown): children is { props?: { mdxType?: string; children?: unknown } } => {
      return typeof children === 'object' && children !== null && 'props' in children;
    };

    const childProps = childElement.props;
    if (!childProps) {
      return <ListElement key={`list-element-${index}`}>{child as ReactNode}</ListElement>;
    }

    const nestedChild = hasNestedProps(childProps.children) ? childProps.children : null;
    const isMDLink = childProps.mdxType === "p" && nestedChild?.props?.mdxType === "a";

    if (
      childProps.mdxType === "Box" ||
      childProps.mdxType === "Link" ||
      childProps.mdxType === "a" ||
      isMDLink
    ) {
      const boxChildren = childProps.children && (typeof childProps.children === 'object' || typeof childProps.children === 'string' || typeof childProps.children === 'number') 
        ? Children.toArray(childProps.children as ReactNode) 
        : [];
      const isLink = childProps.mdxType === "Link" || childProps.mdxType === "a";

      const childData: { heading?: ReactNode; _children?: ReactNode } = {};
      let linkData: { href?: string; to?: string; children?: ReactNode; [key: string]: unknown } | null = isLink ? { 
        ...childProps, 
        children: childProps.children as ReactNode | undefined 
      } : null;

      if (isMDLink && nestedChild) {
        childData.heading = nestedChild.props?.children as ReactNode;
        linkData = { 
          ...nestedChild.props, 
          children: nestedChild.props?.children as ReactNode | undefined 
        };
      } else {
        if (boxChildren.length > 1) {
          childData.heading = boxChildren[0];
          childData._children = boxChildren.slice(1, boxChildren.length);
        } else if (boxChildren.length === 1) {
          childData._children = boxChildren[0];
        }
      }

      return (
        <AdvancedListElement
          key={`list-element-${index}`}
          childData={childData}
          linkData={linkData}
        />
      );
    }

    return <ListElement key={`list-element-${index}`}>{child as ReactNode}</ListElement>;
  };

  return (
    <div className="[&>*:last-child]:mb-4">
      {childrenArray.map((child, index) => childListLinkRenderCheck(child, index))}
    </div>
  );
}

