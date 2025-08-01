import { Cell, Legend, Pie, PieChart, ResponsiveContainer } from "recharts";
import type { PieLabelProps } from "recharts/types/polar/Pie";
import type { PieChartCustomProps } from "../../constant/dashboard";

const RADIAN = Math.PI / 180;
const COLORS = ["#492a9a", "#00C49F", "#FFBB28", "#FF8042"];

/**
 * Render a customized label for a pie chart slice.
 *
 * @param {object} props The props of the label, including:
 *   - cx: The x-coordinate of the center of the pie chart.
 *   - cy: The y-coordinate of the center of the pie chart.
 *   - midAngle: The angle of the slice in radians.
 *   - innerRadius: The inner radius of the pie chart.
 *   - outerRadius: The outer radius of the pie chart.
 *   - percent: The percentage of the slice.
 * @returns {ReactElement} The React element for the label.
 */
const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
}: PieLabelProps) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-(midAngle ?? 0) * RADIAN);
  const y = cy + radius * Math.sin(-(midAngle ?? 0) * RADIAN);

  // The label is a text element with the following properties:
  //   - x: The x-coordinate of the label.
  //   - y: The y-coordinate of the label.
  //   - fill: The color of the label, which is white.
  //   - textAnchor: The anchor point of the label, which is the start or end
  //     of the label depending on whether the label is on the right or left
  //     of the pie chart.
  //   - dominantBaseline: The baseline of the label, which is the central
  //     baseline.
  return (
    <text
      x={x}
      y={y}
      fill="white"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
    >
      {/* The label text is the percentage of the slice, rounded to the nearest integer. */}
      {`${((percent ?? 1) * 100).toFixed(0)}%`}
    </text>
  );
};


export default function PieChartCustom({ data, title }: PieChartCustomProps) {
  return (
    <div className="relative flex- flex-col  h-full" >
      <p className="text-[20px] font-bold text-[var(--text-color)] absolute left-4">
        {title}
      </p>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomizedLabel}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
            className={`no_outline`}
          >
            {data.map((entry, index) => (
              <Cell
                key={`cell-${entry.name}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
