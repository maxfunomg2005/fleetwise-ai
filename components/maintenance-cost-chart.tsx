"use client"

import { Bar, BarChart, CartesianGrid, ResponsiveContainer, XAxis, YAxis } from "recharts"

import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"

const data = [
  {
    name: "Jan",
    total: 18500,
  },
  {
    name: "Feb",
    total: 22000,
  },
  {
    name: "Mar",
    total: 16800,
  },
  {
    name: "Apr",
    total: 19500,
  },
  {
    name: "May",
    total: 24200,
  },
  {
    name: "Jun",
    total: 21000,
  },
]

export function MaintenanceCostChart() {
  return (
    <ChartContainer
      config={{
        total: {
          label: "Maintenance Cost",
          color: "hsl(var(--chart-1))",
        },
      }}
      className="h-[300px]"
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" vertical={false} />
          <XAxis dataKey="name" tickLine={false} axisLine={false} padding={{ left: 20, right: 20 }} />
          <YAxis tickLine={false} axisLine={false} tickFormatter={(value) => `$${value / 1000}k`} />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="total" radius={[4, 4, 0, 0]} className="fill-[var(--color-total)]" />
        </BarChart>
      </ResponsiveContainer>
    </ChartContainer>
  )
}
