import type { CardProps } from "@mui/material/Card";

export function CardCustom({children}: CardProps) {
    return(<div className="bg-[var(--light-color)] shadow rounded p-4 h-full">{children}</div>) ;
}