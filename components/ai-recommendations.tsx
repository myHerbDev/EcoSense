"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Lightbulb, RefreshCw, ThumbsUp, ThumbsDown, AlertCircle, Zap, Clock, Battery } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { generateGroqRecommendations } from "@/app/actions/groq-actions"

type AIRecommendationsProps = {
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

export function AIRecommendations({ userData }: AIRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<string>("")
  const [isLoading, setIsLoading] = useState(false)
  const [feedback, setFeedback] = useState<"liked" | "disliked" | null>(null)
  const [customPrompt, setCustomPrompt] = useState("")
  const [showCustomPrompt, setShowCustomPrompt] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [activeCategory, setActiveCategory] = useState<string>("general")

  const generateRecommendations = async (customInput?: string) => {
    setIsLoading(true)
    setError(null)

    try {
      // Create a prompt based on user data
      const prompt =
        customInput ||
        `
        Based on the following user data, provide 3-5 personalized recommendations to reduce digital carbon footprint:
        
        Daily screen time: ${userData.screenTime} hours
        Daily energy consumption: ${userData.energyConsumption} kWh
        
        App usage breakdown:
        ${userData.appUsage.map((app) => `- ${app.name}: ${app.time} hours (${app.percentage}%)`).join("\n")}
        
        Usage by time of day:
        ${userData.timeOfDay.map((time) => `- ${time.time}: ${time.percentage}%`).join("\n")}
        
        Category: ${activeCategory}
        
        Format your response as a bulleted list of actionable recommendations with brief explanations.
      `

      const result = await generateGroqRecommendations(prompt)

      if (result.success) {
        setRecommendations(result.recommendations || "")
      } else {
        setError(result.error || "Failed to generate recommendations")
        setRecommendations(result.fallbackRecommendations || "")
      }
    } catch (error) {
      console.error("Error generating recommendations:", error)
      setError("An unexpected error occurred. Please try again later.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCategoryChange = (category: string) => {
    setActiveCategory(category)
    if (recommendations) {
      generateRecommendations(`
        Based on the following user data, provide 3-5 personalized recommendations to reduce digital carbon footprint, 
        focusing specifically on ${category} strategies:
        
        Daily screen time: ${userData.screenTime} hours
        Daily energy consumption: ${userData.energyConsumption} kWh
        
        App usage breakdown:
        ${userData.appUsage.map((app) => `- ${app.name}: ${app.time} hours (${app.percentage}%)`).join("\n")}
        
        Usage by time of day:
        ${userData.timeOfDay.map((time) => `- ${time.time}: ${time.percentage}%`).join("\n")}
        
        Format your response as a bulleted list of actionable recommendations with brief explanations.
      `)
    }
  }

  return (
    <Card className="shadow-sm">
      <CardHeader>
        <CardTitle className="flex items-center">
          <Lightbulb className="mr-2 h-5 w-5 text-primary" />
          AI-Powered Recommendations
        </CardTitle>
        <CardDescription>Get personalized sustainability tips based on your usage patterns</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <Alert variant="warning" className="mb-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Warning</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="general" value={activeCategory} onValueChange={handleCategoryChange} className="w-full">
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="general" className="flex items-center">
              <Lightbulb className="mr-2 h-4 w-4" />
              General
            </TabsTrigger>
            <TabsTrigger value="screen-time" className="flex items-center">
              <Clock className="mr-2 h-4 w-4" />
              Screen Time
            </TabsTrigger>
            <TabsTrigger value="energy" className="flex items-center">
              <Zap className="mr-2 h-4 w-4" />
              Energy
            </TabsTrigger>
            <TabsTrigger value="hardware" className="flex items-center">
              <Battery className="mr-2 h-4 w-4" />
              Hardware
            </TabsTrigger>
          </TabsList>

          {!recommendations && !isLoading ? (
            <div className="flex flex-col items-center justify-center p-6 text-center">
              <Lightbulb className="h-12 w-12 text-primary mb-4" />
              <h3 className="text-lg font-medium mb-2">Get AI-Powered Recommendations</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Our AI will analyze your usage patterns and provide personalized recommendations to reduce your digital
                carbon footprint.
              </p>
              <Button onClick={() => generateRecommendations()}>Generate Recommendations</Button>
            </div>
          ) : isLoading ? (
            <div className="flex flex-col items-center justify-center p-6">
              <RefreshCw className="h-8 w-8 text-primary animate-spin mb-4" />
              <p className="text-sm text-muted-foreground">Analyzing your data and generating recommendations...</p>
            </div>
          ) : (
            <>
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <div className="whitespace-pre-line">{recommendations}</div>
              </div>

              <div className="flex items-center justify-between pt-4">
                <div className="flex space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setFeedback("liked")}
                    className={feedback === "liked" ? "bg-primary/10" : ""}
                  >
                    <ThumbsUp className="h-4 w-4 mr-1" />
                    Helpful
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setFeedback("disliked")}
                    className={feedback === "disliked" ? "bg-primary/10" : ""}
                  >
                    <ThumbsDown className="h-4 w-4 mr-1" />
                    Not Helpful
                  </Button>
                </div>
                <Button variant="ghost" size="sm" onClick={() => setShowCustomPrompt(!showCustomPrompt)}>
                  {showCustomPrompt ? "Hide Custom Prompt" : "Custom Prompt"}
                </Button>
              </div>

              {showCustomPrompt && (
                <div className="space-y-2 mt-4">
                  <Textarea
                    placeholder="Ask a specific question about reducing your digital carbon footprint..."
                    value={customPrompt}
                    onChange={(e) => setCustomPrompt(e.target.value)}
                    className="min-h-[100px]"
                  />
                  <Button
                    onClick={() => generateRecommendations(customPrompt)}
                    disabled={!customPrompt.trim() || isLoading}
                  >
                    {isLoading ? (
                      <>
                        <RefreshCw className="mr-2 h-4 w-4 animate-spin" />
                        Processing...
                      </>
                    ) : (
                      "Submit Custom Prompt"
                    )}
                  </Button>
                </div>
              )}
            </>
          )}
        </Tabs>
      </CardContent>
      <CardFooter className="flex justify-end">
        {recommendations && !isLoading && (
          <Button variant="outline" size="sm" onClick={() => generateRecommendations()} className="flex items-center">
            <RefreshCw className="h-4 w-4 mr-1" />
            Regenerate
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
