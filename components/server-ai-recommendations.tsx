import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Lightbulb } from "lucide-react"

type ServerAIRecommendationsProps = {
  userData: {
    screenTime: number
    energyConsumption: number
    appUsage: Array<{
      name: string
      time: number
      percentage: number
    }>
    timeOfDay: Array<{
      time: string
      percentage: number
    }>
  }
}

export function ServerAIRecommendations({ userData }: ServerAIRecommendationsProps) {
  // Generate recommendations based on the user data
  const generateRecommendations = () => {
    const recommendations = []

    // Screen time recommendations
    if (userData.screenTime > 4) {
      recommendations.push(`<li class="mb-4">
        <strong>Reduce Screen Time</strong>: Your daily screen time of ${userData.screenTime} hours is above the recommended limit. Consider setting app timers to reduce usage by 20%, which could save approximately ${(userData.energyConsumption * 0.2).toFixed(2)} kWh per day.
      </li>`)
    }

    // App usage recommendations
    const socialMediaApp = userData.appUsage.find((app) => app.name === "Social Media")
    if (socialMediaApp && socialMediaApp.percentage > 30) {
      recommendations.push(`<li class="mb-4">
        <strong>Limit Social Media Usage</strong>: Social media accounts for ${socialMediaApp.percentage}% of your screen time. Try setting a 30-minute daily limit on social media apps to reduce overall screen time and energy consumption.
      </li>`)
    }

    // Time of day recommendations
    const nightUsage = userData.timeOfDay.find((time) => time.time === "Night")
    if (nightUsage && nightUsage.percentage > 10) {
      recommendations.push(`<li class="mb-4">
        <strong>Reduce Night Usage</strong>: ${nightUsage.percentage}% of your device usage occurs at night. Using devices before bed can affect sleep quality and increase energy consumption. Try implementing a digital curfew 1 hour before bedtime.
      </li>`)
    }

    // Energy saving recommendations
    recommendations.push(`<li class="mb-4">
      <strong>Enable Dark Mode</strong>: Using dark mode on OLED screens can reduce power consumption by up to 30%. This could save approximately ${(userData.energyConsumption * 0.3).toFixed(2)} kWh per day.
    </li>`)

    recommendations.push(`<li class="mb-4">
      <strong>Optimize Video Streaming Quality</strong>: Lowering video streaming resolution when on mobile data can significantly reduce energy consumption and data usage. Try setting video quality to 720p instead of 1080p or 4K.
    </li>`)

    // Return at least 3 recommendations
    return recommendations.slice(0, 5).join("")
  }

  const recommendationsHtml = generateRecommendations()

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Lightbulb className="mr-2 h-5 w-5 text-primary" />
          Smart Recommendations
        </CardTitle>
        <CardDescription>Personalized sustainability tips based on your usage patterns</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="prose prose-sm dark:prose-invert max-w-none">
          <ul className="space-y-2" dangerouslySetInnerHTML={{ __html: recommendationsHtml }} />
        </div>
      </CardContent>
    </Card>
  )
}
