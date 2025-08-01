import type { CardProps } from "@mui/material/Card";
import type { JSX } from "react";

/**
 * A custom card component that wraps children elements with a styled div.
 *
 * @param {CardProps} props - The properties for the card component.
 * @param {ReactNode} props.children - The content to be displayed inside the card.
 * @returns {JSX.Element} A styled card component.
 */
export function CardCustom({ children }: CardProps): JSX.Element {
  return (
    <div className="bg-[var(--light-color)] shadow rounded p-4 h-full">
      {children}
    </div>
  );
}
