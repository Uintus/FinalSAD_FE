import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis } from "recharts";
import type { BarChartCustomProps } from "../../constant/dashboard";

const BarChartCustom = ({ data, title }: BarChartCustomProps) => {
  return (
    <div className="relative flex- flex-col  h-full">
      <p className="text-[20px] font-bold text-[var(--text-color)] absolute left-4">
        {title}
      </p>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          data={data}
          margin={{
            top: 50,
            right: 30,
            bottom: -10,
            left: -5,
          }}
          className={`no_outline`}
        >
          <XAxis
            dataKey="label"
            stroke="#b8b9bc"
            tick={{ fill: "#212728", fontSize: 14, fontWeight: 500 }}
            axisLine={{ stroke: "#b8b9bc" }}
            tickLine={{ stroke: "#b8b9bc" }}
            className="text-[12px]"
          />

          <YAxis
            stroke="#b8b9bc"
            tick={{ fill: "#212728" }}
            axisLine={{ stroke: "#b8b9bc" }}
            tickLine={{ stroke: "#b8b9bc" }}
            className="text-[12px]"
          />
          <Bar dataKey="total" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartCustom;
