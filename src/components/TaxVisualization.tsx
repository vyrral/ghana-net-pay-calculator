
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

interface TaxVisualizationProps {
  results: {
    gross: number;
    ssnit: number;
    tier2: number;
    incomeTax: number;
    netIncome: number;
  };
}

const COLORS = {
  netIncome: "#8B5CF6", // Purple for take-home
  incomeTax: "#EF4444", // Red for tax
  ssnit: "#3B82F6", // Blue for SSNIT
  tier2: "#10B981", // Green for Tier 2
};

const ghcFormat = (n: number) => `GH₵ ${n.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}`;

const TaxVisualization: React.FC<TaxVisualizationProps> = ({ results }) => {
  // Only show visualization if there's income to visualize
  if (results.gross <= 0) {
    return null;
  }

  const data = [
    {
      name: "Take-home Salary",
      value: results.netIncome,
      color: COLORS.netIncome,
      percentage: ((results.netIncome / results.gross) * 100).toFixed(1)
    },
    {
      name: "Income Tax",
      value: results.incomeTax,
      color: COLORS.incomeTax,
      percentage: ((results.incomeTax / results.gross) * 100).toFixed(1)
    },
    {
      name: "SSNIT (Tier 1)",
      value: results.ssnit,
      color: COLORS.ssnit,
      percentage: ((results.ssnit / results.gross) * 100).toFixed(1)
    },
    {
      name: "Pension (Tier 2)",
      value: results.tier2,
      color: COLORS.tier2,
      percentage: ((results.tier2 / results.gross) * 100).toFixed(1)
    },
  ].filter(item => item.value > 0);

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-800">{data.name}</p>
          <p className="text-purple-700 font-bold">{ghcFormat(data.value)}</p>
          <p className="text-sm text-gray-600">{data.percentage}% of gross</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="w-full mt-6 p-4 bg-gray-50 rounded-lg border">
      <h3 className="text-lg font-semibold text-gray-800 text-center mb-4">
        Salary Breakdown Visualization
      </h3>
      <div className="h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={40}
              outerRadius={80}
              paddingAngle={2}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip content={<CustomTooltip />} />
            <Legend 
              wrapperStyle={{ fontSize: '12px' }}
              formatter={(value, entry: any) => (
                <span style={{ color: entry.color }}>{value}</span>
              )}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
        {data.map((item, index) => (
          <div key={index} className="flex items-center gap-2">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: item.color }}
            />
            <span className="text-gray-600">{item.name}: {item.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TaxVisualization;
