import type { MDXComponents } from "mdx/types";
import * as UI from "@/components/ui";
import Heading1 from "@/components/ui/heading/Heading1";
import Heading2 from "@/components/ui/heading/Heading2";
import Heading3 from "@/components/ui/heading/Heading3";
import Heading4 from "@/components/ui/heading/Heading4";
import Heading5 from "@/components/ui/heading/Heading5";
import { Fellows, Projects } from "@/components/Featured";
import LocaleLink from "@/components/LocaleLink";
import Callout from "@/components/ui/Callout";
import HonourConnector from "@/components/honour/HonourConnector";

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // Map standard MDX heading elements to our custom components
    h1: Heading1,
    h2: Heading2,
    h3: Heading3,
    h4: Heading4,
    h5: Heading5,
    h6: Heading5, // Use Heading5 style for h6
    // Map blockquotes to Callout component
    blockquote: Callout,
    // Localized links
    a: LocaleLink,
    // Include all other UI components
    ...UI,
    // Add Fellows and Projects components
    Fellows,
    Projects,
    // Add Honour connector for money-speech page
    HonourConnector,
    // Allow overrides
    ...components,
  };
}
