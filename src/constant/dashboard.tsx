import type { ReactNode } from "react";
import type { ProductRow } from "./common";

// response type of GET dashboard api
export type DashboardResponse = {
  summaryTotal: {
    totalSales: string;
    totalOrders: number;
    totalRevenue: string;
    fulfillmentRate: number;
    comparisons: {
      salesChange: number;
      ordersChange: number;
      revenueChange: number;
      fulfillmentRateChange: number;
    };
  };
  lineChartData: {
    label: string;
    total: number;
    avg: number;
  }[];
  pieChartData: {
    label: string;
    value: number;
  }[];
  barChartData: {
    label: string;
    total: number;
  }[];
};

// response type of GET top products api
export type TopProductsResponse = ProductRow[];

// query of top products
export const TOP_PRODUCTS_QUERY = {
  RANGE: "7",
  SORT: "desc",
  CATEGORY_ID: "",
};

// type of card component
export type CardProps = {
  children: ReactNode;
};

// filter options
export const FILTER_OPTIONS = [
  {
    id: "7",
    name: "Last 7 days",
  },
  {
    id: "02",
    name: "Month to date",
  },
  {
    id: "01",
    name: "Year to date",
  },
];

// data type change
export const DATA_DATE_CHANGE = {
  LAST_7_DAYS: "7",
  YEAR_TO_DATE: "01",
  MONTH_TO_DATE: "02",
};

// data type
export const DATA_TYPE = {
  MONEY: "money",
  RATE: "rate",
};

// type of line chart
export type LineChartCustomProps = {
  data: { label: string; avg: number; total: number }[];
  title?: string;
  name_avg: string;
  name_total: string;
};

// type of pie chart
export type PieChartCustomProps = {
  data: { name: string; value: number }[];
  title?: string;
};

// type of bar chart
export type BarChartCustomProps = {
  data: { label: string; total: number }[];
  title?: string;
};

// type of tooltip
export type TooltipPayload = ReadonlyArray<{ name: string; value: string }>;

// type of coordinate
export type Coordinate = {
  x: number;
  y: number;
};

// type of pie sector
export type PieSectorData = {
  percent?: number;
  name?: string | number;
  midAngle?: number;
  middleRadius?: number;
  tooltipPosition?: Coordinate;
  value?: number;
  paddingAngle?: number;
  dataKey?: string;
  payload?: { name: string; value: string };
  tooltipPayload?: ReadonlyArray<TooltipPayload>;
};

// type of geometry
export type GeometrySector = {
  cx: number;
  cy: number;
  innerRadius: number;
  outerRadius: number;
  startAngle: number;
  endAngle: number;
};

// type of pie label
export type PieLabelProps = PieSectorData &
  GeometrySector & {
    tooltipPayload?: { name: string; value: string };
  };

// type of order status
export const ORDER_STATUS_MAP: Record<string, string> = {
  "0": "Cancelled",
  "1": "Pending",
  "2": "Completed",
};

// Order status
export const ORDER_STATUS = {
  PENDING: '1',
  COMPLETED: '2',
  CANCELLED: '0',
};
