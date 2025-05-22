import { MobileNav } from "@/components/mobile-nav"
import { AIChat } from "@/components/ai-chat"
import { AIRecommendations } from "@/components/ai-recommendations"
import { SustainableServices } from "@/components/sustainable-services"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { mockUsageData } from "@/lib/utils"
import { MessageSquare, Lightbulb, Users } from "lucide-react"
import { Footer } from "@/components/footer"
import { cookies } from "next/headers"
import { PaymentType } from "@/types/payment"

export default function AIAdvisorPage() {
  // Check if user has paid
  const paymentStatus = cookies().get("paymentStatus")?.value
  const paymentType = cookies().get("paymentType")?.value as PaymentType | undefined

  return (
    <main className="min-h-screen bg-background flex flex-col">
      <MobileNav />
      <div className="flex-grow">
        <div className="container py-6 space-y-6">
          <div className="flex flex-col space-y-2">
            <h1 className="text-3xl font-bold tracking-tight">AI Sustainability Advisor</h1>
            <p className="text-muted-foreground">
              Get personalized AI-powered recommendations and connect with sustainability experts
            </p>

            {paymentStatus === "paid" && (
              <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-300 mt-2 self-start">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="mr-1 h-3 w-3"
                >
                  <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                  <polyline points="22 4 12 14.01 9 11.01"></polyline>
                </svg>
                {paymentType === PaymentType.SUBSCRIPTION ? "Premium Subscription" : "Premium Access"}
              </div>
            )}
          </div>

          <Tabs defaultValue="recommendations" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="recommendations" className="flex items-center">
                <Lightbulb className="mr-2 h-4 w-4" />
                Smart Recommendations
              </TabsTrigger>
              <TabsTrigger value="chat" className="flex items-center">
                <MessageSquare className="mr-2 h-4 w-4" />
                AI Chat Assistant
              </TabsTrigger>
              <TabsTrigger value="services" className="flex items-center">
                <Users className="mr-2 h-4 w-4" />
                Sustainable Services
              </TabsTrigger>
            </TabsList>

            <TabsContent value="recommendations" className="mt-6">
              <Card className="mb-6">
                <CardHeader>
                  <CardTitle>How It Works</CardTitle>
                  <CardDescription>
                    Our AI analyzes your usage patterns to provide tailored recommendations
                  </CardDescription>
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

              <AIRecommendations
                userData={{
                  screenTime: mockUsageData.screenTime.daily,
                  energyConsumption: mockUsageData.energyConsumption.daily,
                  appUsage: mockUsageData.appUsage,
                  timeOfDay: mockUsageData.timeOfDay,
                }}
              />
            </TabsContent>

            <TabsContent value="chat" className="mt-6">
              <AIChat
                userData={{
                  screenTime: mockUsageData.screenTime.daily,
                  energyConsumption: mockUsageData.energyConsumption.daily,
                  appUsage: mockUsageData.appUsage,
                  timeOfDay: mockUsageData.timeOfDay,
                }}
              />
            </TabsContent>

            <TabsContent value="services" className="mt-6">
              <SustainableServices />
            </TabsContent>
          </Tabs>
        </div>
      </div>
      <Footer />
    </main>
  )
}
