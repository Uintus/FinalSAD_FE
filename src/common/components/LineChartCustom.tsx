import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import type { LineChartCustomProps } from "../../constant/dashboard";

export default function LineChartCustom({ data }: LineChartCustomProps) {
  return (
    <div className="relative h-full">
      <p className="text-[20px] font-bold text-[var(--text-color)] absolute left-4">
        Revenue
      </p>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={500}
          height={300}
          data={data}
          margin={{
            top: 5,
            right: 30,
            bottom: 5,
            left: -5,
          }}
          className={`no_outline`}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis
            dataKey="name"
            stroke="#b8b9bc"
            tick={{ fill: "#b8b9bc" }}
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
          <Tooltip
            content={({ payload, label }) => {
              if (!payload || !payload.length) return null;

              const sorted = [...payload].sort((a) => {
                return a.name === "Revenue" ? -1 : 1;
              });

              return (
                <div
                  style={{
                    backgroundColor: "white",
                    border: "1px solid #ccc",
                    padding: 10,
                  }}
                >
                  <p className="text-[16px] font-[500]">{label}</p>
                  {sorted.map((entry, index) => (
                    <p
                      key={index}
                      style={{ color: entry.color }}
                      className="text-[14px] font-[400]"
                    >
                      {entry.name} :{" "}
                      <span className="font-[500]">{entry.value}</span>
                    </p>
                  ))}
                </div>
              );
            }}
          />

          <Legend
            verticalAlign="top"
            align="center"
            wrapperStyle={{
              paddingTop: "0px",
              paddingBottom: "20px",
            }}
          />
          <Line
            type="monotone"
            dataKey="pv"
            name="Revenue"
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Line
            type="monotone"
            dataKey="uv"
            name="Avg.Revenue"
            stroke="#82ca9d"
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
