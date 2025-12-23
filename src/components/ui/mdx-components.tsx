import type { MDXComponents } from "mdx/types";
import * as UI from "./index";
import Heading1 from "./heading/Heading1";
import Heading2 from "./heading/Heading2";
import Heading3 from "./heading/Heading3";
import Heading4 from "./heading/Heading4";
import Heading5 from "./heading/Heading5";
import Heading6 from "./heading/Heading5"; // Use Heading5 style for h6

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Map standard MDX heading elements to our custom components
    h1: Heading1,
    h2: Heading2,
    h3: Heading3,
    h4: Heading4,
    h5: Heading5,
    h6: Heading6,
    // Include all other UI components
    ...UI,
    // Allow overrides
    ...components,
  };
}
