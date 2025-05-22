import { MobileNav } from "@/components/mobile-nav"
import { ServerAIRecommendations } from "@/components/server-ai-recommendations"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { mockUsageData } from "@/lib/utils"

export default function AIRecommendationsPage() {
  return (
    <main className="min-h-screen bg-background">
      <MobileNav />
      <div className="container py-6 space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">AI Sustainability Recommendations</h1>
          <p className="text-muted-foreground">
            Get personalized AI-powered recommendations to reduce your digital carbon footprint
          </p>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>How It Works</CardTitle>
            <CardDescription>Our AI analyzes your usage patterns to provide tailored recommendations</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="flex flex-col items-center text-center p-4">
                <div className="bg-primary/10 p-3 rounded-full mb-3">
                  <span className="text-2xl">1</span>
                </div>
                <h3 className="font-medium mb-1">Data Analysis</h3>
                <p className="text-sm text-muted-foreground">
                  Our AI analyzes your device usage patterns and energy consumption
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-4">
                <div className="bg-primary/10 p-3 rounded-full mb-3">
                  <span className="text-2xl">2</span>
                </div>
                <h3 className="font-medium mb-1">Pattern Recognition</h3>
                <p className="text-sm text-muted-foreground">
                  The AI identifies opportunities for reducing your digital carbon footprint
                </p>
              </div>
              <div className="flex flex-col items-center text-center p-4">
                <div className="bg-primary/10 p-3 rounded-full mb-3">
                  <span className="text-2xl">3</span>
                </div>
                <h3 className="font-medium mb-1">Personalized Recommendations</h3>
                <p className="text-sm text-muted-foreground">
                  You receive tailored recommendations based on your specific usage habits
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        <ServerAIRecommendations
          userData={{
            screenTime: mockUsageData.screenTime.daily,
            energyConsumption: mockUsageData.energyConsumption.daily,
            appUsage: mockUsageData.appUsage,
            timeOfDay: mockUsageData.timeOfDay,
          }}
        />
      </div>
    </main>
  )
}
