import type { ReactNode } from "react";
import { isPlaceholder } from "@/data/site";

interface SafeLinkProps {
  href: string;
  children: ReactNode;
  className?: string;
  label: string;
  download?: boolean;
  newTab?: boolean;
}

export function SafeLink({ href, children, className, label, download = false, newTab = false }: SafeLinkProps) {
  if (isPlaceholder(href)) {
    return null;
  }
  return <a href={href} className={className} download={download || undefined} target={newTab ? "_blank" : undefined} rel={newTab ? "noopener noreferrer" : undefined} aria-label={label}>{children}</a>;
}
