"use client"

import { Bar, BarChart, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltipContent } from "@/components/ui/chart"

type EnergyConsumptionChartProps = {
  data: Array<{
    name: string
    consumption: number
    average?: number
  }>
  title?: string
  description?: string
}

export function EnergyConsumptionChart({
  data,
  title = "Energy Consumption",
  description = "Energy usage by device or app category",
}: EnergyConsumptionChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            consumption: {
              label: "Energy Consumption",
              color: "hsl(var(--chart-1))",
            },
            average: {
              label: "Average User",
              color: "hsl(var(--chart-2))",
            },
          }}
          className="h-[300px]"
        >
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis unit="kWh" />
              <Tooltip content={<ChartTooltipContent />} />
              <Legend />
              <Bar dataKey="consumption" fill="var(--color-consumption)" radius={[4, 4, 0, 0]} />
              {data[0]?.average !== undefined && (
                <Bar dataKey="average" fill="var(--color-average)" radius={[4, 4, 0, 0]} />
              )}
            </BarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
