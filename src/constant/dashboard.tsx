import type { ReactNode } from "react";

// response type of GET dashboard api
export type DashboardGetResponse = {
  data: number;
  labels: string;
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
    id: "07",
    name: "Year to date",
  },
];

// data status change
export const DATA_STATUS_CHANGE = {
  INCREASE: "1",
  DECREASE: "-1",
};

// data type change
export const DATA_DATE_CHANGE = {
  MONTH: "01",
  WEEK: "7",
};

// data type
export const DATA_TYPE = {
  MONEY: "money",
  RATE: "rate",
};

// type of line chart
export type LineChartCustomProps = {
  data: { name: string; pv: number; uv: number }[];
};

// type of pie chart
export type PieChartCustomProps = {
  data: { name: string; value: number }[];
};

// type of bar chart
export type BarChartCustomProps = {
  data: { name: string; uv: number }[];
}

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
