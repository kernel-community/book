"use client";

import Heading1 from "./Heading1";
import Heading2 from "./Heading2";
import Heading3 from "./Heading3";
import Heading4 from "./Heading4";
import Heading5 from "./Heading5";

type HeadingProps = {
  level?: 1 | 2 | 3 | 4 | 5;
  children: React.ReactNode;
  className?: string;
  id?: string;
};

export default function Heading({ level = 1, ...props }: HeadingProps) {
  switch (level) {
    case 5:
      return <Heading5 {...props} />;
    case 4:
      return <Heading4 {...props} />;
    case 3:
      return <Heading3 {...props} />;
    case 2:
      return <Heading2 {...props} />;
    default:
      return <Heading1 {...props} />;
  }
}



