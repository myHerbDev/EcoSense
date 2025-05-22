"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { UsageChart } from "@/components/usage-chart"
import { TrendChart } from "@/components/trend-chart"
import { ComparisonChart } from "@/components/comparison-chart"
import { ImpactMetrics } from "@/components/impact-metrics"
import { mockHistoricalData, mockComparisonData, mockImpactData } from "@/lib/analytics-data"
import { Download, Share2, Calendar } from "lucide-react"
import { ScreenTimeChart } from "@/components/screen-time-chart"
import { EnergyConsumptionChart } from "@/components/energy-consumption-chart"
import { TimeOfDayChart } from "@/components/time-of-day-chart"
import { SustainabilityScoreChart } from "@/components/sustainability-score-chart"

export function AnalyticsDashboard() {
  const [timeRange, setTimeRange] = useState<"week" | "month" | "year">("week")
  const [dataType, setDataType] = useState<"screenTime" | "energy" | "appUsage" | "timeOfDay">("screenTime")

  return (
    <div className="container py-6 space-y-6">
      <div className="flex flex-col space-y-2">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold tracking-tight">Analytics Dashboard</h1>
          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
            <Button variant="outline" size="sm">
              <Share2 className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
        </div>
        <p className="text-muted-foreground">
          Detailed insights into your device usage patterns and environmental impact.
        </p>
        <p className="text-xs text-muted-foreground italic">
          by myHerb (DevSphere project for open source sustainability development hub)
        </p>
      </div>

      <div className="flex flex-col md:flex-row justify-between gap-4">
        <Tabs defaultValue="trends" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="trends">Trends</TabsTrigger>
            <TabsTrigger value="comparison">Comparisons</TabsTrigger>
            <TabsTrigger value="impact">Environmental Impact</TabsTrigger>
            <TabsTrigger value="insights">Insights</TabsTrigger>
          </TabsList>

          <div className="flex justify-between items-center mt-4 mb-2">
            <div className="flex items-center space-x-2">
              <Calendar className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Time Range:</span>
              <Select value={timeRange} onValueChange={(value: "week" | "month" | "year") => setTimeRange(value)}>
                <SelectTrigger className="w-[120px]">
                  <SelectValue placeholder="Select range" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="week">Past Week</SelectItem>
                  <SelectItem value="month">Past Month</SelectItem>
                  <SelectItem value="year">Past Year</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium">Data Type:</span>
              <Select
                value={dataType}
                onValueChange={(value: "screenTime" | "energy" | "appUsage" | "timeOfDay") => setDataType(value)}
              >
                <SelectTrigger className="w-[150px]">
                  <SelectValue placeholder="Select data" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="screenTime">Screen Time</SelectItem>
                  <SelectItem value="energy">Energy Usage</SelectItem>
                  <SelectItem value="appUsage">App Usage</SelectItem>
                  <SelectItem value="timeOfDay">Time of Day</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <TabsContent value="trends" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Usage Trends</CardTitle>
                <CardDescription>See how your usage patterns have changed over time</CardDescription>
              </CardHeader>
              <CardContent>
                <TrendChart data={mockHistoricalData[timeRange][dataType]} dataType={dataType} timeRange={timeRange} />
              </CardContent>

              <div className="grid gap-4 md:grid-cols-2 mt-4">
                <ScreenTimeChart
                  data={mockHistoricalData[timeRange].screenTime.map((item) => ({
                    date: item.date,
                    screenTime: item.value,
                    average: item.value * 0.9,
                  }))}
                />

                <EnergyConsumptionChart
                  data={[
                    { name: "Social Media", consumption: 0.35, average: 0.3 },
                    { name: "Productivity", consumption: 0.15, average: 0.2 },
                    { name: "Entertainment", consumption: 0.25, average: 0.15 },
                    { name: "Other", consumption: 0.05, average: 0.05 },
                  ]}
                  title="Energy by Category"
                  description="Energy consumption by app category"
                />
              </div>
            </Card>

            <div className="grid gap-4 md:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Daily Patterns</CardTitle>
                  <CardDescription>Your usage throughout the day</CardDescription>
                </CardHeader>
                <CardContent>
                  <UsageChart data={mockHistoricalData.dailyPatterns} type="time" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Weekly Patterns</CardTitle>
                  <CardDescription>Your usage throughout the week</CardDescription>
                </CardHeader>
                <CardContent>
                  <UsageChart
                    data={mockHistoricalData.weeklyPatterns.map((item) => ({
                      name: item.day,
                      time: item.hours,
                      percentage: Math.round(
                        (item.hours / mockHistoricalData.weeklyPatterns.reduce((sum, i) => sum + i.hours, 0)) * 100,
                      ),
                    }))}
                    type="app"
                  />
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="comparison" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Comparison with Average Users</CardTitle>
                <CardDescription>See how your usage compares to others in your demographic</CardDescription>
              </CardHeader>
              <CardContent>
                <ComparisonChart data={mockComparisonData[dataType]} dataType={dataType} />
              </CardContent>

              <div className="grid gap-4 md:grid-cols-2 mt-4">
                <TimeOfDayChart
                  data={mockHistoricalData.dailyPatterns.map((item) => ({
                    time: item.time,
                    percentage: item.percentage,
                    average: item.percentage > 25 ? item.percentage - 10 : item.percentage + 5,
                  }))}
                />

                <SustainabilityScoreChart
                  score={68}
                  title="Overall Sustainability"
                  description="Your sustainability score out of 100"
                />
              </div>
            </Card>

            <div className="grid gap-4 md:grid-cols-3">
              {mockComparisonData.metrics.map((metric, index) => (
                <Card key={index}>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-sm font-medium">{metric.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{metric.value}</div>
                    <p className={`text-xs ${metric.change > 0 ? "text-green-500" : "text-red-500"}`}>
                      {metric.change > 0 ? "↑" : "↓"} {Math.abs(metric.change)}% compared to average
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          <TabsContent value="impact" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Environmental Impact</CardTitle>
                <CardDescription>Understand the environmental consequences of your digital habits</CardDescription>
              </CardHeader>
              <CardContent>
                <ImpactMetrics data={mockImpactData} />
              </CardContent>
              <CardFooter>
                <p className="text-sm text-muted-foreground">
                  Data based on industry-standard calculations for device energy consumption and carbon emissions.
                </p>
              </CardFooter>
            </Card>
          </TabsContent>

          <TabsContent value="insights" className="space-y-4">
            <Card>
              <CardHeader>
                <CardTitle>Key Insights</CardTitle>
                <CardDescription>AI-powered analysis of your usage patterns</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {mockHistoricalData.insights.map((insight, index) => (
                  <div key={index} className="border-l-4 border-primary pl-4 py-2">
                    <h3 className="font-medium">{insight.title}</h3>
                    <p className="text-sm text-muted-foreground">{insight.description}</p>
                  </div>
                ))}
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  Generate More Insights
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}
