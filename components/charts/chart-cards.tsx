"use client";

import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface ChartDataPoint {
  label: string;
  value: number;
}

interface AreaChartCardProps {
  data: ChartDataPoint[];
  title?: string;
  color?: string;
}

export function AreaChartCard({ data, title, color = '#6366f1' }: AreaChartCardProps) {
  return (
    <div className="rounded-xl border bg-card p-6">
      {title && <h3 className="mb-4 font-semibold">{title}</h3>}
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={data}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis dataKey="label" className="text-xs" />
          <YAxis className="text-xs" />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="value"
            stroke={color}
            fill={color}
            fillOpacity={0.15}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}

interface BarChartCardProps {
  data: ChartDataPoint[];
  title?: string;
  color?: string;
}

export function BarChartCard({ data, title, color = '#8b5cf6' }: BarChartCardProps) {
  return (
    <div className="rounded-xl border bg-card p-6">
      {title && <h3 className="mb-4 font-semibold">{title}</h3>}
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
          <XAxis dataKey="label" className="text-xs" />
          <YAxis className="text-xs" />
          <Tooltip />
          <Bar dataKey="value" fill={color} radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
