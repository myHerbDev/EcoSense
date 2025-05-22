"use client"

import { useState } from "react"
import { Download, Printer, Mail, Clock, Battery, Calendar, Lightbulb } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { recommendations } from "@/lib/utils"
import { UsageChart } from "@/components/usage-chart"
import { RecommendationsList } from "@/components/recommendations-list"
import { DataInputForm } from "@/components/data-input-form"
import { ScreenTimeChart } from "@/components/screen-time-chart"
import { EnergyConsumptionChart } from "@/components/energy-consumption-chart"
import { SustainabilityScoreChart } from "@/components/sustainability-score-chart"
import { TimeOfDayChart } from "@/components/time-of-day-chart"
import { ServerAIRecommendations } from "@/components/server-ai-recommendations"
import { RegistrationBanner } from "@/components/registration-banner"

// Define the type for our usage data
type UsageData = {
  screenTime: {
    daily: number
    weekly: number
    baseline: number
  }
  energyConsumption: {
    daily: number
    baseline: number
  }
  appUsage: Array<{
    name: string
    time: number
    percentage: number
  }>
  timeOfDay: Array<{
    time: string
    percentage: number
  }>
  sustainabilityScore: number
}

export function Dashboard() {
  // Add mock data for our charts
  const mockScreenTimeData = [
    { date: "Mon", screenTime: 5.2, average: 4.5 },
    { date: "Tue", screenTime: 4.8, average: 4.5 },
    { date: "Wed", screenTime: 5.5, average: 4.5 },
    { date: "Thu", screenTime: 4.9, average: 4.5 },
    { date: "Fri", screenTime: 6.2, average: 4.5 },
    { date: "Sat", screenTime: 7.1, average: 4.5 },
    { date: "Sun", screenTime: 6.5, average: 4.5 },
  ]

  const mockEnergyData = [
    { name: "Social Media", consumption: 0.35, average: 0.3 },
    { name: "Productivity", consumption: 0.15, average: 0.2 },
    { name: "Entertainment", consumption: 0.25, average: 0.15 },
    { name: "Other", consumption: 0.05, average: 0.05 },
  ]

  // Update the activeTab state to include a new "charts" tab
  const [activeTab, setActiveTab] = useState<"input" | "overview" | "recommendations" | "charts">("input")
  const [usageData, setUsageData] = useState<UsageData | null>(null)

  const handleFormSubmit = (formData: any) => {
    // Calculate percentages for app usage
    const totalAppTime =
      formData.socialMediaTime + formData.productivityTime + formData.entertainmentTime + formData.otherTime

    const appUsage = [
      {
        name: "Social Media",
        time: formData.socialMediaTime,
        percentage: Math.round((formData.socialMediaTime / totalAppTime) * 100),
      },
      {
        name: "Productivity",
        time: formData.productivityTime,
        percentage: Math.round((formData.productivityTime / totalAppTime) * 100),
      },
      {
        name: "Entertainment",
        time: formData.entertainmentTime,
        percentage: Math.round((formData.entertainmentTime / totalAppTime) * 100),
      },
      {
        name: "Other",
        time: formData.otherTime,
        percentage: Math.round((formData.otherTime / totalAppTime) * 100),
      },
    ]

    const timeOfDay = [
      { time: "Morning", percentage: formData.morningUsage },
      { time: "Afternoon", percentage: formData.afternoonUsage },
      { time: "Evening", percentage: formData.eveningUsage },
      { time: "Night", percentage: formData.nightUsage },
    ]

    // Calculate sustainability score based on usage patterns
    // This is a simplified calculation - in a real app, this would be more sophisticated
    const screenTimeScore = Math.max(0, 100 - (formData.dailyScreenTime / 4) * 25)
    const energyScore = Math.max(0, 100 - (formData.dailyEnergyConsumption / 0.6) * 25)
    const nightUsageScore = Math.max(0, 100 - (formData.nightUsage / 10) * 25)
    const sustainabilityScore = Math.round((screenTimeScore + energyScore + nightUsageScore) / 3)

    // Set the usage data
    setUsageData({
      screenTime: {
        daily: formData.dailyScreenTime,
        weekly: formData.weeklyScreenTime,
        baseline: 4, // Recommended daily limit
      },
      energyConsumption: {
        daily: formData.dailyEnergyConsumption,
        baseline: 0.6, // Average daily consumption
      },
      appUsage,
      timeOfDay,
      sustainabilityScore,
    })

    // Switch to the overview tab
    setActiveTab("overview")
  }

  const handleExportPDF = () => {
    // In a real app, this would generate and download a PDF
    alert("PDF export functionality would be implemented here")
  }

  const handlePrint = () => {
    window.print()
  }

  const handleShareEmail = () => {
    // In a real app, this would open an email sharing dialog
    window.location.href = `mailto:?subject=My EcoSense Sustainability Report&body=Check out my device usage sustainability report!`
  }

  return (
    <div className="container py-6 space-y-6">
      <div className="flex flex-col space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Your Sustainability Dashboard</h1>
        <p className="text-muted-foreground">
          Track your device usage and get personalized recommendations to reduce energy consumption.
        </p>
      </div>

      <RegistrationBanner />

      <div className="flex flex-wrap gap-2">
        <Button variant={activeTab === "input" ? "default" : "outline"} onClick={() => setActiveTab("input")}>
          Input Data
        </Button>
        <Button
          variant={activeTab === "overview" ? "default" : "outline"}
          onClick={() => setActiveTab("overview")}
          disabled={!usageData}
        >
          Overview
        </Button>
        <Button
          variant={activeTab === "recommendations" ? "default" : "outline"}
          onClick={() => setActiveTab("recommendations")}
          disabled={!usageData}
        >
          Recommendations
        </Button>
        <Button
          variant={activeTab === "charts" ? "default" : "outline"}
          onClick={() => setActiveTab("charts")}
          disabled={!usageData}
        >
          Charts & Analytics
        </Button>
        {usageData && (
          <div className="ml-auto flex flex-wrap gap-2">
            <Button variant="outline" size="sm" onClick={handleExportPDF}>
              <Download className="mr-2 h-4 w-4" />
              Export PDF
            </Button>
            <Button variant="outline" size="sm" onClick={handlePrint}>
              <Printer className="mr-2 h-4 w-4" />
              Print
            </Button>
            <Button variant="outline" size="sm" onClick={handleShareEmail}>
              <Mail className="mr-2 h-4 w-4" />
              Share
            </Button>
          </div>
        )}
      </div>

      {activeTab === "input" && <DataInputForm onSubmit={handleFormSubmit} />}

      {activeTab === "overview" && usageData && (
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Daily Screen Time</CardTitle>
              <Clock className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{usageData.screenTime.daily} hours</div>
              <p className="text-xs text-muted-foreground">
                {usageData.screenTime.daily > usageData.screenTime.baseline
                  ? `${((usageData.screenTime.daily / usageData.screenTime.baseline - 1) * 100).toFixed(0)}% above`
                  : `${((1 - usageData.screenTime.daily / usageData.screenTime.baseline) * 100).toFixed(0)}% below`}{" "}
                recommended
              </p>
              <div className="mt-4">
                <Progress
                  value={Math.min(100, (usageData.screenTime.daily / usageData.screenTime.baseline) * 100)}
                  className="h-2"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Energy Consumption</CardTitle>
              <Battery className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{usageData.energyConsumption.daily} kWh</div>
              <p className="text-xs text-muted-foreground">
                {usageData.energyConsumption.daily > usageData.energyConsumption.baseline
                  ? `${((usageData.energyConsumption.daily / usageData.energyConsumption.baseline - 1) * 100).toFixed(0)}% above`
                  : `${((1 - usageData.energyConsumption.daily / usageData.energyConsumption.baseline) * 100).toFixed(0)}% below`}{" "}
                average
              </p>
              <div className="mt-4">
                <Progress
                  value={Math.min(
                    100,
                    (usageData.energyConsumption.daily / usageData.energyConsumption.baseline) * 100,
                  )}
                  className="h-2"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Weekly Usage</CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{usageData.screenTime.weekly} hours</div>
              <p className="text-xs text-muted-foreground">
                {usageData.screenTime.weekly > usageData.screenTime.baseline * 7
                  ? `${((usageData.screenTime.weekly / (usageData.screenTime.baseline * 7) - 1) * 100).toFixed(0)}% above`
                  : `${((1 - usageData.screenTime.weekly / (usageData.screenTime.baseline * 7)) * 100).toFixed(0)}% below`}{" "}
                recommended
              </p>
              <div className="mt-4">
                <Progress
                  value={Math.min(100, (usageData.screenTime.weekly / (usageData.screenTime.baseline * 7)) * 100)}
                  className="h-2"
                />
              </div>
            </CardContent>
          </Card>

          <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Sustainability Score</CardTitle>
              <Lightbulb className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{usageData.sustainabilityScore}/100</div>
              <p className="text-xs text-muted-foreground">
                {usageData.sustainabilityScore >= 80
                  ? "Excellent"
                  : usageData.sustainabilityScore >= 60
                    ? "Good"
                    : usageData.sustainabilityScore >= 40
                      ? "Average"
                      : "Needs improvement"}
              </p>
              <div className="mt-4">
                <Progress value={usageData.sustainabilityScore} className="h-2" />
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle>App Usage Breakdown</CardTitle>
              <CardDescription>Time spent on different app categories</CardDescription>
            </CardHeader>
            <CardContent>
              <UsageChart data={usageData.appUsage} type="app" />
            </CardContent>
          </Card>

          <Card className="md:col-span-2 shadow-sm hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle>Usage by Time of Day</CardTitle>
              <CardDescription>When you use your device most</CardDescription>
            </CardHeader>
            <CardContent>
              <UsageChart data={usageData.timeOfDay} type="time" />
            </CardContent>
          </Card>
        </div>
      )}

      {activeTab === "recommendations" && usageData && <RecommendationsList recommendations={recommendations} />}

      {/* Replace AIRecommendations with ServerAIRecommendations in the charts tab */}
      {activeTab === "charts" && usageData && (
        <div className="space-y-6">
          <div className="grid gap-4 md:grid-cols-2">
            <ScreenTimeChart data={mockScreenTimeData} />
            <TimeOfDayChart
              data={usageData.timeOfDay.map((item) => ({
                ...item,
                average: item.percentage > 25 ? item.percentage - 10 : item.percentage + 5,
              }))}
            />
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <EnergyConsumptionChart data={mockEnergyData} />
            <SustainabilityScoreChart score={usageData.sustainabilityScore} />
          </div>

          <ServerAIRecommendations
            userData={{
              screenTime: usageData.screenTime.daily,
              energyConsumption: usageData.energyConsumption.daily,
              appUsage: usageData.appUsage,
              timeOfDay: usageData.timeOfDay,
            }}
          />
        </div>
      )}
    </div>
  )
}
