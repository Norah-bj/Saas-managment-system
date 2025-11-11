import React from "react";
import { PieChart, Pie, Cell, Legend, Tooltip, ResponsiveContainer } from "recharts";

export const CHWPieChart = ({ data = [] }) => {
  const defaultData = [
    { name: "Active CHWs", value: 8, color: "#0066FF" },
    { name: "Inactive CHWs", value: 2, color: "#001F4D" },
  ];

  const chartData = data.length > 0 ? data : defaultData;
  const COLORS = chartData.map((item) => item.color);

  const renderCustomLabel = (entry) => {
    return `${entry.value}`;
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      const { name, value } = payload[0].payload;
      const total = chartData.reduce((sum, item) => sum + item.value, 0);
      const percentage = ((value / total) * 100).toFixed(1);
      return (
        <div className="bg-white p-2 rounded border border-gray-300 shadow-lg">
          <p className="text-sm font-semibold text-gray-900">{name}</p>
          <p className="text-sm text-gray-700">Count: {value}</p>
          <p className="text-sm text-gray-700">Percentage: {percentage}%</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full h-full flex items-center justify-center bg-white rounded-lg p-6">
      <ResponsiveContainer width="100%" height={300}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={renderCustomLabel}
            outerRadius={100}
            fill="#8884d8"
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
          <Legend
            verticalAlign="bottom"
            height={36}
            formatter={(value, entry) => (
              <span className="[font-family:'Poppins',Helvetica] font-normal text-sm text-gray-700">
                {value}
              </span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};
