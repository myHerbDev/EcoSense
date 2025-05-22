"use client"

import { RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar, ResponsiveContainer, Legend } from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer } from "@/components/ui/chart"

type TimeOfDayChartProps = {
  data: Array<{
    time: string
    percentage: number
    average?: number
  }>
  title?: string
  description?: string
}

export function TimeOfDayChart({
  data,
  title = "Usage by Time of Day",
  description = "When you use your devices most",
}: TimeOfDayChartProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>
        <ChartContainer
          config={{
            percentage: {
              label: "Your Usage",
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
            <RadarChart cx="50%" cy="50%" outerRadius="80%" data={data}>
              <PolarGrid />
              <PolarAngleAxis dataKey="time" />
              <PolarRadiusAxis angle={30} domain={[0, "auto"]} />
              <Radar
                name="Your Usage"
                dataKey="percentage"
                stroke="var(--color-percentage)"
                fill="var(--color-percentage)"
                fillOpacity={0.6}
              />
              {data[0]?.average !== undefined && (
                <Radar
                  name="Average User"
                  dataKey="average"
                  stroke="var(--color-average)"
                  fill="var(--color-average)"
                  fillOpacity={0.6}
                />
              )}
              <Legend />
            </RadarChart>
          </ResponsiveContainer>
        </ChartContainer>
      </CardContent>
    </Card>
  )
}
