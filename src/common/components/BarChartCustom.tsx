import { BarChart, Bar, ResponsiveContainer, XAxis, YAxis } from "recharts";
import type { BarChartCustomProps } from "../../constant/dashboard";

const BarChartCustom = ({ data }: BarChartCustomProps) => {
  return (
    <div className="relative flex- flex-col  h-full">
      <p className="text-[20px] font-bold text-[var(--text-color)] absolute left-4">
        Revenue by Product Category
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
          {/* Trục X - hiển thị tên (label) */}
          <XAxis
            dataKey="name"
            stroke="#b8b9bc"
            tick={{ fill: "#b8b9bc" }}
            axisLine={{ stroke: "#b8b9bc" }}
            tickLine={{ stroke: "#b8b9bc" }}
            className="text-[12px]"
          />

          {/* Trục Y - hiển thị giá trị số */}
          <YAxis
            stroke="#b8b9bc"
            tick={{ fill: "#212728" }}
            axisLine={{ stroke: "#b8b9bc" }}
            tickLine={{ stroke: "#b8b9bc" }}
            className="text-[12px]"
          />
          <Bar dataKey="uv" fill="#8884d8" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartCustom;
