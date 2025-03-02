/**
 * A simple utility to conditionally join class names together
 */
export function cn(...classes: (string | undefined | null | false)[]) {
  return classes.filter(Boolean).join(" ");
} 