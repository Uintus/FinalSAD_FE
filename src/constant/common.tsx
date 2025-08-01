import type { SelectChangeEvent } from "@mui/material/Select";
import type { SxProps, Theme } from "@mui/material/styles";
import type { ReactNode } from "react";
import { TbLayoutGrid } from "react-icons/tb";
import { TbShoppingBag } from "react-icons/tb";
import { TbShoppingCart } from "react-icons/tb";
import { TbSettings } from "react-icons/tb";

// items in handlebar
export const barItemList = [
  {
    label: "Dashboard",
    icon: <TbLayoutGrid />,
    url: "/dashboard",
  },
  {
    label: "Products",
    icon: <TbShoppingBag />,
    url: "/products",
  },
  {
    label: "Order List",
    icon: <TbShoppingCart />,
    url: "/orders",
  },
  {
    label: "Setting",
    icon: <TbSettings />,
    url: "/setting",
  },
];

// type of header component
export type HeaderProps = {
  headerText: string;
  headerContent?: ReactNode;
  children?: ReactNode;
};

// type of menu select component
export type MenuSelectCustomProps = {
  handleChange: (event: SelectChangeEvent<string>, child: React.ReactNode) => void;
  value: string;
  itemList: {id: string; name: string}[];
  sx?: SxProps<Theme>;
  label?: string;
  defaultValue?: string;
};

export interface ProductRow {
  name: string;
  price: number;
  category: string;
  quantity: number;
  amount: number;
}

export interface Column<T> {
  id: keyof T;
  label: string;
  icon?: ReactNode;
  minWidth?: number;
  align?: "right" | "left" | "center";
  format?: (value: T[keyof T]) => string;
}

export interface TableCustomProps<T> {
  columns: Column<T>[];
  rows: T[];
  onSort?: (columnId: string, direction: "asc" | "desc") => void;
}

export const DEFAULT_MENU_SELECT_VALUE = "-1";


